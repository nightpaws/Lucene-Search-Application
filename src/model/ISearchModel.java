package model;

import org.apache.lucene.queryparser.xml.ParserException;

public interface ISearchModel {

	// Classic 'search by content' like google does. Searches the <body> of the document.
	public void contentSearch(String searchTerm) throws ParserException;
	
	// Searches img tags
	public void imageSearch(String searchTerm);
	
	// Can implement later if there's time.
	public void videoSearch(String searchTerm);
	
	// Searches Title tags.
	public void titleSearch(String searchTerm);
}
