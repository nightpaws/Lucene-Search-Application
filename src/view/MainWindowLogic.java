package view;

import java.net.URL;
import java.util.Observable;
import java.util.Observer;
import java.util.ResourceBundle;

import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;

public class MainWindowLogic implements IMainWindowLogic, Observer, Initializable {
	
	@FXML
	private Button btnSearch;
	@FXML
	private TextField txtSearchTerm;
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		txtSearchTerm = new TextField();
		// TODO Auto-generated method stub
        btnSearch.setOnAction(new EventHandler<ActionEvent>() {

	        @Override
	        public void handle(ActionEvent event) {
	            System.out.println("That was easy, wasn't it?");
	            System.out.println("Text: " + getSearchTerm());
	            
	        }
	        
        });
		
	}

	@Override
	public void update(Observable o, Object arg) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getSearchTerm() {
		// TODO Auto-generated method stub
		String text = txtSearchTerm.getText().toString();
		System.out.println(text);
		return text;
	}

}
