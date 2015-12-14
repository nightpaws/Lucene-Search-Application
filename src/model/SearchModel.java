package model;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
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
import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
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
	
	// The index to be searched
	String index;

	// Search Results
	List<Map<String, List<String>>> searchResults;

	IndexReader reader; // Object for reading the index directory.
	IndexSearcher searcher; // Searcher Object
	Analyzer analyzer; // Analyzer

	QueryBuilder coreParser;


	public SearchModel() throws IOException {

		index = "test_index";

		searchResults = new ArrayList<Map<String, List<String>>>();

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


	@Override
	public void imageSearch(String searchTerm) throws IOException, ParseException {
		clearSearch();
		String field = "imageContent";
		String queries = null;
		int repeat = 0;
		boolean raw = false;
		String queryString = null;
		int hitsPerPage = 10;

		IndexReader reader = DirectoryReader.open(FSDirectory.open(Paths.get(index)));
		IndexSearcher searcher = new IndexSearcher(reader);
		Analyzer analyzer = new StandardAnalyzer();

		String line = searchTerm;

		BufferedReader in = new BufferedReader(new InputStreamReader(System.in, StandardCharsets.UTF_8));
		QueryParser parser = new QueryParser(field, analyzer);

		line = line.trim();

		String newLine = "*"+line+"*";
		Query query = new WildcardQuery(new Term(field, newLine));
		
		/*if (repeat > 0) {                           // repeat & time as benchmark
			Date start = new Date();
			for (int i = 0; i < repeat; i++) {
				searcher.search(query, 100);
			}
			Date end = new Date();
			System.out.println("Time: "+(end.getTime()-start.getTime())+"ms");
		}*/
			
		// Search the pages..
		doPagingSearch(in, searcher, query, hitsPerPage, raw, queries == null && queryString == null);
			
		// Get Images from Page..
		getImagesFromSearch(line);
		
		reader.close();
		setChanged();
		notifyObservers();
	}
	
	/**
	 * Following a successful search, this method parses each document returned from
	 * the search and adds the 'src' attribute of image elements that caused the
	 * document to be matched to the searchResults Map. 
	 * @param line
	 * @throws IOException
	 */
	private void getImagesFromSearch(String line) throws IOException {
		
		for (Map<String, List<String>> m : searchResults) {
			String file = m.get("Path").get(0);
			List<String> imageSources = new ArrayList<String>();
			BufferedReader br = new BufferedReader(new FileReader(file));
			org.jsoup.nodes.Document htmldoc;
			try {
				StringBuilder sb = new StringBuilder();
				String fileLine = br.readLine();
				while (fileLine != null) {
				    sb.append(fileLine);
				    sb.append(" ");
				    fileLine = br.readLine();
				}
				htmldoc = Jsoup.parse(sb.toString());
			} finally {
				br.close();
			}
		
			// Get the img elements
			Elements images = htmldoc.getElementsByTag("img");
			
			// Get All the img elements in this document that match the search term
			for (org.jsoup.nodes.Element el : images) {
				if (el.attr("src").contains(line)) {
					if (imageSources.contains(el.attr("src")) == false) {
						imageSources.add(el.attr("src"));
					}
				} else if (el.attr("alt").contains(line)) {
					if (imageSources.contains(el.attr("src")) == false) {
						imageSources.add(el.attr("src"));
					}
				}
			}
			m.put("imageSources", imageSources);
		}
		
		
	}

	@Override
	public void videoSearch(String searchTerm) throws IOException, ParseException {
		clearSearch();
		
		String field = "videoContent";
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
			
			// Do the Search..
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
	public void bodySearch(String searchTerm) throws IOException, ParseException {
		clearSearch();
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
		clearSearch();
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

			if (repeat > 0) {                           // repeat & time as benchmark
				Date start = new Date();
				for (int i = 0; i < repeat; i++) {
					searcher.search(query, 100);
				}
				Date end = new Date();
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
	public void generalSearch(String searchTerm) throws IOException, ParseException {
		clearSearch();
		String field = "generalContent";

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
	public List<Map<String, List<String>>> getSearchResults() {
		return searchResults;
	}

	@Override
	public void addObservers(Observer o) {
		super.addObserver(o);	
	}
	
	private void clearSearch() {
		searchResults.clear();
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
	private void doPagingSearch(BufferedReader in, IndexSearcher searcher, Query query, 
			int hitsPerPage, boolean raw, boolean interactive) throws IOException {

		// Collect enough docs to show 5 pages
		TopDocs results = searcher.search(query, 5 * hitsPerPage);
		ScoreDoc[] hits = results.scoreDocs;


		int numTotalHits = results.totalHits;
		System.out.println(numTotalHits + " total matching documents");

		int start = 0;
		int end = numTotalHits;
		for (int i = start; i < end; i++) {
			Document doc = searcher.doc(hits[i].doc);
			String path = doc.get("path");
			if (path != null) {
				Map<String, List<String>> resultMap = new HashMap<String, List<String>>();
				resultMap.put("Path", new ArrayList<String>());
				resultMap.get("Path").add(path);
				//resultMap.put("Modified", doc.get("modified").toString());
				searchResults.add(resultMap);
			}
		}
	}
}
