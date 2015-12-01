package view;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
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
import model.ISearchModel;
import model.SearchModel;

public class MainWindowLogic implements IMainWindowLogic, Observer, Initializable {
	
	@FXML
	private Button btnSearch;
	@FXML
	private TextField txtSearchTerm;
	
	ISearchModel model;
	
	public MainWindowLogic() {
		
		URI indexDirectory = null;
		try {
			indexDirectory = new URI("/Users/James/index");
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		try {
			model = new SearchModel(indexDirectory);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		txtSearchTerm = new TextField();
	}
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
		
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
