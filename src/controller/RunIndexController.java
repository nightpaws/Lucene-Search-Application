package controller;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.Initializable;
import model.ISearchModel;

public class RunIndexController<ActionEvent> implements EventHandler {
	
	ISearchModel model;
	
	public RunIndexController(ISearchModel argModel) {
		model = argModel;
	}
	
	@Override
	public void handle(Event event) {
		
		model.initialise();
		
	}


}
