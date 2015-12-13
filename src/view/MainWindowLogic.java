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
import javafx.beans.property.ListProperty;
import javafx.beans.property.ListPropertyBase;
import javafx.beans.property.SimpleListProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Node;
import javafx.scene.control.Button;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TabPane;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.scene.control.Toggle;
import javafx.scene.control.ToggleGroup;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;
import javafx.scene.layout.Priority;
import javafx.scene.layout.StackPane;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
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
	private ImageView imgView;
	
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
	@FXML
	private TabPane tabResults;
	@FXML
	private GridPane gridPane;
	
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
		
		tabResults = new TabPane();
		
		radBtnGroup = new ToggleGroup();
		
		gridPane = new GridPane();
		
		
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
	
		gridPane.getChildren().clear(); // Clear the Grid of images		
		txtSearchTerm.clear(); // Clear the search box
		
		List<Map<String, List<String>>> searchResults = model.getSearchResults(); // Get the searchResults structure
		
		ObservableList<Result> data = FXCollections.observableArrayList();
		int columnIndex = 0 ;
		int rowIndex = 0;
		//gridPane.setConstraints(txtResultsDisplay, 1, 1);
		//gridPane.getChildren().add(txtResultsDisplay);
		ColumnConstraints column1 = new ColumnConstraints(175, 175, 175);
		column1.setHalignment(HPos.CENTER);
		ColumnConstraints column2 = new ColumnConstraints(175, 175, 175);
		column2.setHalignment(HPos.CENTER);
		ColumnConstraints column3 = new ColumnConstraints(175, 175, 175);
		column3.setHalignment(HPos.CENTER);
		ColumnConstraints column4 = new ColumnConstraints(175, 175, 175);
		column4.setHalignment(HPos.CENTER);
		ColumnConstraints column5 = new ColumnConstraints(175, 175, 175);
		column5.setHalignment(HPos.CENTER);
		ColumnConstraints column6 = new ColumnConstraints(175, 175, 175);
		column6.setHalignment(HPos.CENTER);
		gridPane.setHgap(20);
	    gridPane.setVgap(20);
	    gridPane.setPadding(new Insets(10, 60, 10, 60));
	    


		gridPane.getColumnConstraints().addAll(column1, column2, column3, column4);
		    
		    
		for (Map<String, List<String>> result : searchResults) {
			for (String s : result.keySet()) {
				if (s.equals("imageSources")) {
					for (String r : result.get(s)) {
				        try {
				        	Image img = null;
				        	img = new Image(r);
				        	ImageView imgView = new ImageView(img);
					        imgView.setFitWidth(175);
					        imgView.setPreserveRatio(true);
					        imgView.setSmooth(true);
					        imgView.setCache(true);
					        System.out.println("columnIndex: " + columnIndex);
					        System.out.println("rowIndex: " + rowIndex);

					        gridPane.add(imgView, columnIndex, rowIndex);
				        
					        columnIndex++;
					        if (columnIndex == 6) {
					        	columnIndex = 0;
					        	rowIndex++;
					        }
				        } catch (Exception e) {
				        	e.printStackTrace();
				        }
					}
				} else {
					txtResultsDisplay.appendText(s + " ");
					for (String r : result.get(s)) {
						txtResultsDisplay.appendText(r + " ");
					}	
					txtResultsDisplay.appendText(newLine);
				}
			}
		}
	}

	@Override
	public String getSearchTerm() {
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
