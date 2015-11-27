package model;

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
	
	private String removeStopwords(String searchTerm) {
		String newSearchTerm = null;
		
		return newSearchTerm;
	}

}
