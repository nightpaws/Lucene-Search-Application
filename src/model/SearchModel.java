package model;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.metadata.IIOMetadataNode;

import org.apache.lucene.*;
import org.apache.lucene.analysis.*;
import org.apache.lucene.analysis.standard.*;
import org.apache.lucene.index.*;
import org.apache.lucene.queryparser.xml.*;
import org.apache.lucene.search.*;
import org.apache.lucene.store.FSDirectory;
import org.w3c.dom.Element;
 
public class SearchModel implements ISearchModel {
	
	// A List of stopWords.
	List<String> stopWords;
	
	
	IndexReader reader; // Object for reading the index directory.
	IndexSearcher searcher; // Searcher Object
	Analyzer analyzer; // Analyzer
	
	QueryBuilder coreParser;


	
	public SearchModel(URI indexDirectory) throws IOException {
		
		stopWords = new ArrayList<String>();
		reader = DirectoryReader.open(FSDirectory.open(Paths.get(indexDirectory)));
		searcher = new IndexSearcher(reader);
		analyzer = new StandardAnalyzer();
		
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
	public void imageSearch(String searchTerm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void videoSearch(String searchTerm) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void titleSearch(String searchTerm) {
		// TODO Auto-generated method stub
		
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

}
