package view;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.List;
import java.util.Map;
import java.util.Observable;
import java.util.Observer;
import java.util.ResourceBundle;

import controller.RadioButtonController;
import controller.RunIndexController;
import controller.SearchController;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Button;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.Toggle;
import javafx.scene.control.ToggleGroup;
import javafx.scene.control.cell.PropertyValueFactory;
import model.ISearchModel;
import model.SearchModel;

public class MainWindowLogic implements IMainWindowLogic, Observer, Initializable {
	
	@FXML
	private Button btnSearch;
	@FXML
	private Button btnInitialise;
	@FXML
	private TextField txtSearchTerm;
	@FXML
	private TableView<Result> resultsTable;
	@FXML
	private TextArea txtResultsDisplay;
	
	@FXML
	private ToggleGroup radBtnGroup;
	@FXML
	private RadioButton radImage;
	@FXML
	private RadioButton radVideo;
	@FXML
	private RadioButton radTitle;
	@FXML
	private RadioButton radBody;
	
	ISearchModel model;
	EventHandler<ActionEvent> sc;
	EventHandler<ActionEvent> ric;
	EventHandler<ActionEvent> rbc;
	
	
	public MainWindowLogic() throws URISyntaxException, IOException {	
		
		model = new SearchModel();
		model.addObservers((Observer) this);
		
		// Controllers
		sc = new SearchController<ActionEvent>(model, this);
		ric = new RunIndexController<ActionEvent>(model);
		rbc = new RadioButtonController(this);
		
		txtSearchTerm = new TextField();
		resultsTable = new TableView<Result>();
		txtResultsDisplay = new TextArea();
		
		radBtnGroup = new ToggleGroup();
		
		radImage = new RadioButton();
		radImage.setToggleGroup(radBtnGroup);
		radVideo = new RadioButton();
		radVideo.setToggleGroup(radBtnGroup);
		radTitle = new RadioButton();
		radTitle.setToggleGroup(radBtnGroup);
		radBody = new RadioButton();
		radBody.setToggleGroup(radBtnGroup);
		radBody.setSelected(true);
		
	}
	
	@Override
	public void initialize(URL location, ResourceBundle resources) {
		
        btnSearch.setOnAction(sc);
        btnInitialise.setOnAction(ric);
        
        radBody.setOnAction(rbc);
        radImage.setOnAction(rbc);
        radTitle.setOnAction(rbc);
        radVideo.setOnAction(rbc);
   
        
        
	}

	@Override
	public void update(Observable o, Object arg) {
		
		String newLine = System.getProperty("line.separator");
		
		txtSearchTerm.clear();
		System.out.println("in update");
		List<Map<String, String>> searchResults = model.getSearchResults();
		System.out.println("searchResults: " + searchResults.toString());
		ObservableList<Result> data = FXCollections.observableArrayList();
		for (Map<String, String> result : searchResults) {
			for (String s : result.keySet()) {
				System.out.println("s: " + s);
				txtResultsDisplay.appendText(s + " " + result.get(s));
				txtResultsDisplay.appendText(newLine);
				//Result r = new Result(s, result.get(s));
				//data.add(r);
			}
		}
		resultsTable.setItems(data);
	}

	@Override
	public String getSearchTerm() {
		// TODO Auto-generated method stub
		String text = txtSearchTerm.getText().toString();

		return text;
	}
	
	class Result {
		
		SimpleStringProperty field;
		SimpleStringProperty value;
		
		public Result(String field, String value) {
			this.field = new SimpleStringProperty(field);
			this.value = new SimpleStringProperty(value);
		}
	}

	@Override
	public String getSearchType() {
		if (radImage.isSelected()) {
			return "radImage";
		} else if (radBody.isSelected()) {
			return "radBody";
		} else if (radTitle.isSelected()) {
			return "radTitle";
		} else if (radVideo.isSelected()) {
			return "radVideo";
		}
		return "null";
		
	}

	@Override
	public void setUnselected(String clickedButton) {
		switch (clickedButton) {
			case "radImage":
				radTitle.setSelected(false);
				radBody.setSelected(false);
				radVideo.setSelected(false);
				radImage.setSelected(true);
				break;
			case "radTitle":
				radVideo.setSelected(false);
				radBody.setSelected(false);
				radImage.setSelected(false);
				radTitle.setSelected(true);
				break;
			case "radBody":
				radTitle.setSelected(false);
				radVideo.setSelected(false);
				radImage.setSelected(false);
				radBody.setSelected(true);
				break;
			case "radVideo":
				radTitle.setSelected(false);
				radBody.setSelected(false);
				radImage.setSelected(false);
				radVideo.setSelected(true);
				break;
		}
		
	}

}
