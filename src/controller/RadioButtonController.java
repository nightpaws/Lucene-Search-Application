package controller;

import javafx.event.Event;
import javafx.event.EventHandler;
import javafx.scene.control.RadioButton;
import view.IMainWindowLogic;
import view.MainWindowLogic;

public class RadioButtonController implements EventHandler{
	
	IMainWindowLogic view;
	
	public RadioButtonController(MainWindowLogic argView) {
		view = argView;
	}
	
	@Override
	public void handle(Event event) {
		// TODO Auto-generated method stub
		RadioButton radioButton = (RadioButton) event.getSource();
		String clickedButton = radioButton.getId();
		
		switch (clickedButton) {
			case "radImage":
				view.setUnselected(clickedButton);
				break;
			case "radTitle":
				view.setUnselected(clickedButton);
				break;
			case "radBody":
				view.setUnselected(clickedButton);
				break;
			case "radVideo":
				view.setUnselected(clickedButton);
				break;
		}
		
	}
 
}
