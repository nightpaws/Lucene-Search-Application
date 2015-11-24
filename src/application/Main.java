package application;

import java.util.logging.Level;
import java.util.logging.Logger;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.stage.Stage;
import javafx.scene.Scene;
import javafx.scene.control.TabPane;
import javafx.scene.layout.Pane;

public class Main extends Application {
	@Override
	public void start(Stage primaryStage) {
		try {
			TabPane page = (TabPane) FXMLLoader.load(Main.class.getResource("../view/mainWindow.fxml"));
			Scene scene = new Scene(page);
			
			scene.getStylesheets().add("view/style.css");
			
			primaryStage.setScene(scene);
			primaryStage.setTitle("Lucene Search Group Project");
			primaryStage.show();
		} catch (Exception ex) {
			Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
		}
	}

	public static void main(String[] args) {
		launch(args);
	}
}
