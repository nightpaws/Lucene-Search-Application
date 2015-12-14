package model;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Observer;

import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.xml.ParserException;

public interface ISearchModel  {

	
	// Searches img tags
	public void imageSearch(String searchTerm) throws IOException, ParseException;
	
	// Can implement later if there's time.
	public void videoSearch(String searchTerm) throws IOException, ParseException;
	
	// Searches Title tags.
	public void titleSearch(String searchTerm) throws IOException, ParseException;
	
	// Search Body Tags
	public void bodySearch(String searchTerm) throws IOException, ParseException;
	
	// General Search: Meta (Keywords, Description), Body, Title
	public void generalSearch(String searchTerm) throws IOException, ParseException;
	
	// Initialise the model
	public void initialise();
	
	public List<Map<String, List<String>>> getSearchResults();
	
	public void addObservers(Observer o);

	
	
}
