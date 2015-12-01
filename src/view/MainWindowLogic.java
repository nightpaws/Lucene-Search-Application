package view;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Observable;
import java.util.Observer;
import java.util.ResourceBundle;

import controller.RunIndexController;
import controller.SearchController;
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
	private Button btnInitialise;
	@FXML
	private TextField txtSearchTerm;
	
	ISearchModel model;
	EventHandler<ActionEvent> sc;
	EventHandler<ActionEvent> ric;
	
	
	public MainWindowLogic() throws URISyntaxException, IOException {	
		
		
		
		model = new SearchModel();
		// Controllers
		sc = new SearchController<ActionEvent>(model, this);
		ric = new RunIndexController<ActionEvent>(model);
		txtSearchTerm = new TextField();
	}
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
        btnSearch.setOnAction(sc);
        
        btnInitialise.setOnAction(ric);
		
	}

	@Override
	public void update(Observable o, Object arg) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getSearchTerm() {
		// TODO Auto-generated method stub
		String text = txtSearchTerm.getText().toString();

		return text;
	}

}
