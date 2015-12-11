package model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;

import javax.imageio.metadata.IIOMetadataNode;

import org.apache.lucene.*;
import org.apache.lucene.analysis.*;
import org.apache.lucene.analysis.standard.*;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.xml.*;
import org.apache.lucene.search.*;
import org.apache.lucene.store.FSDirectory;
import org.w3c.dom.Element;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Date;
import java.util.HashMap;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.store.FSDirectory;


public class SearchModel extends Observable implements ISearchModel {

	// A List of stopWords.
	List<String> stopWords;

	// Search Results
	List<Map<String, String>> searchResults;

	IndexReader reader; // Object for reading the index directory.
	IndexSearcher searcher; // Searcher Object
	Analyzer analyzer; // Analyzer

	QueryBuilder coreParser;

	String index;

	public SearchModel() throws IOException {

		index = "test_index/"; //update in indexer

		searchResults = new ArrayList<Map<String, String>>();

		/*stopWords = new ArrayList<String>();
		reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		searcher = new IndexSearcher(reader);
		analyzer = new StandardAnalyzer();*/

	}

	/**
	 * A (probably) temporary method for creating the index. This will likely
	 * be removed in the final build. 
	 */
	@Override
	public void initialise() {
		Indexer indexer = new Indexer(index);
	}
	/**
	 * This demonstrates a typical paging search scenario, where the search engine presents 
	 * pages of size n to the user. The user can then go to the next page if interested in
	 * the next hits.
	 * 
	 * When the query is executed for the first time, then only enough results are collected
	 * to fill 5 result pages. If the user wants to page beyond this limit, then the query
	 * is executed another time and all hits are collected.
	 * 
	 */
	public void doPagingSearch(BufferedReader in, IndexSearcher searcher, Query query, 
			int hitsPerPage, boolean raw, boolean interactive) throws IOException {

		// Collect enough docs to show 5 pages
		TopDocs results = searcher.search(query, 5 * hitsPerPage);
		ScoreDoc[] hits = results.scoreDocs;


		int numTotalHits = results.totalHits;
		System.out.println(numTotalHits + " total matching documents");

		int start = 0;
		int end = Math.min(numTotalHits, hitsPerPage);
		for (int i = start; i < end; i++) {
			Document doc = searcher.doc(hits[i].doc);
			String path = doc.get("path");
			if (path != null) {
				Map<String, String> resultMap = new HashMap<String, String>();
				resultMap.put("Path", path);
				//resultMap.put("Modified", doc.get("modified").toString());
				searchResults.add(resultMap);
			}
		}
		while (true) {
			if (end > hits.length) {
				System.out.println("Only results 1 - " + hits.length +" of " + numTotalHits + " total matching documents collected.");
				System.out.println("Collect more (y/n) ?");
				String line = in.readLine();
				if (line.length() == 0 || line.charAt(0) == 'n') {
					break;
				}

				hits = searcher.search(query, numTotalHits).scoreDocs;
			}

			end = Math.min(hits.length, start + hitsPerPage);

			for (int i = start; i < end; i++) {
				if (raw) {                              // output raw format
					System.out.println("doc="+hits[i].doc+" score="+hits[i].score);
					continue;
				}

				Document doc = searcher.doc(hits[i].doc);
				String path = doc.get("path");
				if (path != null) {
					System.out.println((i+1) + ". " + path);
					String title = doc.get("title");
					if (title != null) {
						System.out.println("   Title: " + doc.get("title"));
					}
				} else {
					System.out.println((i+1) + ". " + "No path for this document");
				}

			}

			if (!interactive || end == 0) {
				break;
			}

			if (numTotalHits >= end) {
				boolean quit = false;
				while (true) {
					System.out.print("Press ");
					if (start - hitsPerPage >= 0) {
						System.out.print("(p)revious page, ");  
					}
					if (start + hitsPerPage < numTotalHits) {
						System.out.print("(n)ext page, ");
					}
					System.out.println("(q)uit or enter number to jump to a page.");

					String line = in.readLine();
					if (line.length() == 0 || line.charAt(0)=='q') {
						quit = true;
						break;
					}
					if (line.charAt(0) == 'p') {
						start = Math.max(0, start - hitsPerPage);
						break;
					} else if (line.charAt(0) == 'n') {
						if (start + hitsPerPage < numTotalHits) {
							start+=hitsPerPage;
						}
						break;
					} else {
						int page = Integer.parseInt(line);
						if ((page - 1) * hitsPerPage < numTotalHits) {
							start = (page - 1) * hitsPerPage;
							break;
						} else {
							System.out.println("No such page");
						}
					}
				}
				if (quit) break;
				end = Math.min(numTotalHits, start + hitsPerPage);
			}
		}
	}

	@Override
	public void contentSearch(String searchTerm) {
		// TODO Auto-generated method stub
		QueryBuilder coreParser = new CoreParser(searchTerm, analyzer);
		Element element = new IIOMetadataNode("title");
		try {
			coreParser.getQuery(element);
		} catch (ParserException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void imageSearch(String searchTerm) throws IOException, ParseException {
		
		// 
		String index = "test_index";
		String field = "imageContent";
		String queries = null;
		int repeat = 0;
		boolean raw = false;
		String queryString = null;
		int hitsPerPage = 10;

		IndexReader reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		IndexSearcher searcher = new IndexSearcher(reader);
		Analyzer analyzer = new StandardAnalyzer();

		queryString = searchTerm;

		BufferedReader in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		QueryParser parser = new QueryParser(field, analyzer);

		while (true) {
			if (queries == null && queryString == null) {                        // prompt the user
				System.out.println("Enter query: ");
			}

			String line = queryString != null ? queryString : in.readLine();

			if (line == null || line.length() == -1) {
				break;
			}

			line = line.trim();
			try {
				if (line.length() == 0) {
					break;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			line = "*"+line+"*";
			//Query query = parser.parse(line);
			Query query = new WildcardQuery(new Term(field, line));
			System.out.println("Searching for: " + query.toString(field));

			if (repeat > 0) {                           // repeat & time as benchmark
				Date start = new Date();
				for (int i = 0; i < repeat; i++) {
					searcher.search(query, 100);
				}
				Date end = new Date();
				System.out.println("Time: "+(end.getTime()-start.getTime())+"ms");
			}

			doPagingSearch(in, searcher, query, hitsPerPage, raw, queries == null && queryString == null);

			if (queryString != null) {
				break;
			}
		}
		reader.close();

	}

	@Override
	public void videoSearch(String searchTerm) throws IOException, ParseException {
		/**
		 * Currently a clone of title search
		 */
		String index = "test_index";
		String field = "titleContent";
		String queries = null;
		int repeat = 0;
		boolean raw = false;
		String queryString = null;
		int hitsPerPage = 10;

		IndexReader reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		IndexSearcher searcher = new IndexSearcher(reader);
		Analyzer analyzer = new StandardAnalyzer();

		queryString = searchTerm;

		BufferedReader in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		QueryParser parser = new QueryParser(field, analyzer);

		while (true) {
			if (queries == null && queryString == null) {                        // prompt the user
				System.out.println("Enter query: ");
			}

			String line = queryString != null ? queryString : in.readLine();

			if (line == null || line.length() == -1) {
				break;
			}

			line = line.trim();
			try {
				if (line.length() == 0) {
					break;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			Query query = parser.parse(line);
			System.out.println("Searching for: " + query.toString(field));

			if (repeat > 0) {                           // repeat & time as benchmark
				Date start = new Date();
				for (int i = 0; i < repeat; i++) {
					searcher.search(query, 100);
				}
				Date end = new Date();
				System.out.println("Time: "+(end.getTime()-start.getTime())+"ms");
			}

			doPagingSearch(in, searcher, query, hitsPerPage, raw, queries == null && queryString == null);

			if (queryString != null) {
				break;
			}
		}
		reader.close();

	}
	
	@Override
	public void bodySearch(String searchTerm) throws IOException, ParseException {
		String index = "test_index";
		String field = "bodyContent";

		String queries = null;
		int repeat = 0;
		boolean raw = false;
		String queryString = null;
		int hitsPerPage = 10;

		IndexReader reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		IndexSearcher searcher = new IndexSearcher(reader);
		Analyzer analyzer = new StandardAnalyzer();

		queryString = searchTerm;

		BufferedReader in = null;
		if (queries != null) {
			in = Files.newBufferedReader(Paths.get(queries), StandardCharsets.UTF_8);
		} else {
			in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		}
		QueryParser parser = new QueryParser(field, analyzer);
		while (true) {
			if (queries == null && queryString == null) {                        // prompt the user
				System.out.println("Enter query: ");
			}

			String line = queryString != null ? queryString : in.readLine();

			if (line == null || line.length() == -1) {
				break;
			}

			line = line.trim();
			try {
				if (line.length() == 0) {
					break;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			line = line+"*";
			//Query query = parser.parse(line);
			Query query = new WildcardQuery(new Term(field, line));
			System.out.println("Searching for: " + query.toString(field));

			if (repeat > 0) {                           // repeat & time as benchmark
				Date start = new Date();
				for (int i = 0; i < repeat; i++) {
					searcher.search(query, 100);
				}
				Date end = new Date();
				System.out.println("Time: "+(end.getTime()-start.getTime())+"ms");
			}

			doPagingSearch(in, searcher, query, hitsPerPage, raw, queries == null && queryString == null);

			if (queryString != null) {
				break;
			}
		}
		reader.close();
		setChanged();
		notifyObservers();
		
	}

	@Override
	public void titleSearch(String searchTerm) throws IOException, ParseException {


		String index = "test_index";
		String field = "titleContent";

		String queries = null;
		int repeat = 0;
		boolean raw = false;
		String queryString = null;
		int hitsPerPage = 10;

		IndexReader reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		IndexSearcher searcher = new IndexSearcher(reader);
		Analyzer analyzer = new StandardAnalyzer();

		queryString = searchTerm;

		BufferedReader in = null;
		if (queries != null) {
			in = Files.newBufferedReader(Paths.get(queries), StandardCharsets.UTF_8);
		} else {
			in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		}
		QueryParser parser = new QueryParser(field, analyzer);
		while (true) {
			if (queries == null && queryString == null) {                        // prompt the user
				System.out.println("Enter query: ");
			}

			String line = queryString != null ? queryString : in.readLine();

			if (line == null || line.length() == -1) {
				break;
			}

			line = line.trim();
			try {
				if (line.length() == 0) {
					break;
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			line = line+"*";
			//Query query = parser.parse(line);
			Query query = new WildcardQuery(new Term(field, line));
			System.out.println("Searching for: " + query.toString(field));

			if (repeat > 0) {                           // repeat & time as benchmark
				Date start = new Date();
				for (int i = 0; i < repeat; i++) {
					searcher.search(query, 100);
				}
				Date end = new Date();
				System.out.println("Time: "+(end.getTime()-start.getTime())+"ms");
			}

			doPagingSearch(in, searcher, query, hitsPerPage, raw, queries == null && queryString == null);

			if (queryString != null) {
				break;
			}
		}
		reader.close();
		setChanged();
		notifyObservers();
	}


	private void removeStopwords(String searchTerm) { // note: code adapted from http://stackoverflow.com/questions/27685839/removing-stopwords-from-a-string-in-java
		int k=0;
		ArrayList<String> wordsList = new ArrayList<String>();
		String currentLine;
		String[] stopwords = new String[175];

		//adds words from text file to array
		try{
			FileReader fr=new FileReader("stopwords.txt");
			BufferedReader br= new BufferedReader(fr);
			while ((currentLine = br.readLine()) != null){
				stopwords[k]=currentLine;
				k++;
			}
			String s= searchTerm;
			StringBuilder builder = new StringBuilder(s);
			String[] words = builder.toString().split("\\s"); // words in searchterm
			for (String word : words){
				wordsList.add(word);
			}
			for(int i = 0; i < wordsList.size(); i++){
				for(int j = 0; j < k; j++){
					if(stopwords[j].contains(wordsList.get(i).toLowerCase())){
						wordsList.set(i, "");
						break;
					}
				}
			}
		}

		catch(Exception e){
			System.out.println(e);
		}

	}

	@Override
	public List<Map<String, String>> getSearchResults() {

		return searchResults;
	}

	@Override
	public void addObservers(Observer o) {
		super.addObserver(o);	
	}



}
