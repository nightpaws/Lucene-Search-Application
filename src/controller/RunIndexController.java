package controller;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import model.ISearchModel;

public class RunIndexController<ActionEvent> implements EventHandler {
	
	ISearchModel model;
	
	public RunIndexController(ISearchModel argModel) {
		model = argModel;
	}
	
	@Override
	public void handle(Event event) {
		//System.out.println(event.getSource().toString());
		//Button button = (Button) event.getSource();
		//System.out.println("BUTTON ID: " + button.getId());

		model.initialise();
		
	}


}
