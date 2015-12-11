package controller;

import java.io.IOException;
import java.net.URL;
import java.util.ResourceBundle;

import org.apache.lucene.queryparser.classic.ParseException;

import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.Initializable;
import model.ISearchModel;
import view.IMainWindowLogic;
import view.MainWindowLogic;

public class SearchController<ActionEvent> implements EventHandler {
	
	ISearchModel model;
	IMainWindowLogic view;
	
	public SearchController(ISearchModel argModel, MainWindowLogic argView) {
		model = argModel;
		view = argView;
	}
	
	@Override
	public void handle(Event event) {
		String searchTerm = view.getSearchTerm();
		try {
			String searchType = view.getSearchType();
			System.out.println("searchType: " + searchType);
			if (searchType == "radImage") {
				System.out.println("searchType: 1");
				model.imageSearch(searchTerm);
			} else if (searchType == "radTitle") {
				System.out.println("searchType: 2");
				model.titleSearch(searchTerm);
			} else if (searchType == "radBody") {
				System.out.println("searchType: 3");
				model.bodySearch(searchTerm);
			} else if (searchType == "radVideo") {
				System.out.println("searchType: 4");
				model.videoSearch(searchTerm);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
