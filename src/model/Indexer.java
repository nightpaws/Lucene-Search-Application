package model;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.LongField;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig.OpenMode;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.Term;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.select.Elements;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Indexer {

	public Indexer(String docs) {
		/** Index all text files under a directory. */
		String usage = "java org.apache.lucene.demo.IndexFiles" + " [-index INDEX_PATH] [-docs DOCS_PATH] [-update]\n\n"
				+ "This indexes the documents in DOCS_PATH, creating a Lucene index"
				+ "in INDEX_PATH that can be searched with SearchFiles";
		String indexPath = "test_index/"; // update in search model too
		// String docsPath = "test_pages/";
		String docsPath = "test_pages_full/";
		boolean create = true;

		if (docsPath == null) {
			System.err.println("Usage: " + usage);
			System.exit(1);
		}

		final Path docDir = Paths.get(docsPath);
		if (!Files.isReadable(docDir)) {
			System.out.println("Document directory '" + docDir.toAbsolutePath()
					+ "' does not exist or is not readable, please check the path");
			System.exit(1);
		}

		Date start = new Date();
		try {
			System.out.println("Indexing to directory '" + indexPath + "'...");

			Directory dir = FSDirectory.open(Paths.get(indexPath));
			Analyzer analyzer = new StandardAnalyzer(new BufferedReader(new FileReader("./Resources/stop-word-list.txt")));
			IndexWriterConfig iwc = new IndexWriterConfig(analyzer);

			if (create) {
				// Create a new index in the directory, removing any
				// previously indexed documents:
				iwc.setOpenMode(OpenMode.CREATE);
			} else {
				// Add new documents to an existing index:
				iwc.setOpenMode(OpenMode.CREATE_OR_APPEND);
			}

			// Optional: for better indexing performance, if you
			// are indexing many documents, increase the RAM
			// buffer. But if you do this, increase the max heap
			// size to the JVM (eg add -Xmx512m or -Xmx1g):
			//
			// iwc.setRAMBufferSizeMB(256.0);

			IndexWriter writer = new IndexWriter(dir, iwc);
			indexDocs(writer, docDir);

			// NOTE: if you want to maximize search performance,
			// you can optionally call forceMerge here. This can be
			// a terribly costly operation, so generally it's only
			// worth it when your index is relatively static (ie
			// you're done adding documents to it):
			//
			// writer.forceMerge(1);

			writer.close();

			Date end = new Date();
			System.out.println(end.getTime() - start.getTime() + " total milliseconds");

		} catch (IOException e) {
			System.out.println(" caught a " + e.getClass() + "\n with message: " + e.getMessage());
		}
	}

	public static void extractImage() throws IOException {
		// EXTRACT IMAGE CONTENT
		String websiteURL = "www.example.com/index.html";

		org.jsoup.nodes.Document docu = Jsoup.connect(websiteURL).get();

		Elements image = docu.getElementsByTag("img");

		for (Element element : image) {
			String src = element.absUrl("src");
			if (src != null) {
				System.out.println("Image Found!");
				System.out.println("src attribute is : " + src);
			} else {
				System.out.println("No Image Located!");
				System.out.println("Cannot print src attribute");
			}

		}
	}

	public static void getImages(String url) {

	}

	/**
	 * Indexes the given file using the given writer, or if a directory is
	 * given, recurses over files and directories found under the given
	 * directory.
	 * 
	 * NOTE: This method indexes one document per input file. This is slow. For
	 * good throughput, put multiple documents into your input file(s). An
	 * example of this is in the benchmark module, which can create "line doc"
	 * files, one document per line, using the <a href=
	 * "../../../../../contrib-benchmark/org/apache/lucene/benchmark/byTask/tasks/WriteLineDocTask.html"
	 * >WriteLineDocTask</a>.
	 * 
	 * @param writer
	 *            Writer to the index where the given file/dir info will be
	 *            stored
	 * @param path
	 *            The file to index, or the directory to recurse into to find
	 *            files to index
	 * @throws IOException
	 *             If there is a low-level I/O error
	 */
	static void indexDocs(final IndexWriter writer, Path path) throws IOException {
		if (Files.isDirectory(path)) {
			Files.walkFileTree(path, new SimpleFileVisitor<Path>() {
				@Override
				public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
					try {
						indexDoc(writer, file, attrs.lastModifiedTime().toMillis());
					} catch (IOException ignore) {
						// don't index files that can't be read.
					}
					return FileVisitResult.CONTINUE;
				}
			});
		} else {
			indexDoc(writer, path, Files.getLastModifiedTime(path).toMillis());
		}
	}

	/** Indexes a single document */
	static void indexDoc(IndexWriter writer, Path file, long lastModified) throws IOException {
		try (InputStream stream = Files.newInputStream(file)) {
			// make a new, empty document
			Document doc = new Document();

			// READ THE CONTENT OF THE FILE INTO A STRING
			String fileContent = "";
			String sCurrentLine;
			BufferedReader br = new BufferedReader(new InputStreamReader(stream, StandardCharsets.UTF_8));
			while ((sCurrentLine = br.readLine()) != null) {
				fileContent = fileContent + " " + sCurrentLine;
			}
			br.close();

			// Jsoup Document object holding the html document
			org.jsoup.nodes.Document htmldoc = Jsoup.parse(fileContent);

			// Add the path of the file to the pathField
			Field pathField = new StringField("path", file.toString(), Field.Store.YES);
			doc.add(pathField);

			// Add last-modified date to 'modified' field
			doc.add(new LongField("modified", lastModified, Field.Store.NO));

			// ADD <BODY> OF DOCUMENT TO FIELD bodyContent (Uses JSoup).
			String bodyContent = htmldoc.body().text();
			doc.add(new TextField("bodyContent", bodyContent, Field.Store.NO));

			// Add content of image elements to imageContent field
			Elements images = htmldoc.getElementsByTag("img");
			String imageContent = "";
			for (Element el : images) {
				imageContent += el.attr("src") + " " + el.attr("alt");
			}
			doc.add(new TextField("imageContent", imageContent, Field.Store.NO));

			// Add content of title element to titleContent field
			Elements titles = htmldoc.getElementsByTag("title");
			String titleContent = "";
			String titlePass = null;
			if (titles != null) {
				for (Element el : titles) {
					titleContent += el.text();
				}
			}
			if (titleContent.toLowerCase().contains("youtube") || (titleContent.toLowerCase().contains("vimeo")
					|| titleContent.toLowerCase().contains("dailymotion"))) {
				titlePass = titleContent;
			}

			doc.add(new TextField("titleContent", titleContent, Field.Store.NO));

			// Add content of video elements to videoContent field
			Elements videos = htmldoc.getElementsByTag("video");
			String videoContent;
			if (titlePass != null)
				videoContent = titlePass;
			else
				videoContent = "";

			for (Element el : videos) {
				Elements childNodes = el.children();
				videoContent += el.attr("title") + " " + el.attr("alt") + " " + el.attr("lang") + " " + el.attr("src");
				for (Element e : childNodes) {
					videoContent += e.attr("title") + " " + e.attr("alt") + " " + e.attr("lang") + " " + e.attr("src");
				}
			}
			doc.add(new TextField("videoContent", videoContent, Field.Store.NO));

			// Add body, title and keywords meta-tag content to generalContent
			// field
			Elements metaTags = htmldoc.getElementsByTag("meta");
			String keywordContent = "";
			String descriptionContent = "";

			for (Element el : metaTags) {
				if (el.attr("name").equals("keywords")) {
					keywordContent += el.attr("content");
				} else if (el.attr("name").equals("description")) {
					descriptionContent += el.attr("description");
				}

				Elements childNodes = el.children();
				videoContent += el.attr("title") + " " + el.attr("alt") + " " + el.attr("lang") + " " + el.attr("src");
				for (Element e : childNodes) {
					videoContent += e.attr("title") + " " + e.attr("alt") + " " + e.attr("lang") + " " + e.attr("src");
				}
			}
			String generalContent = bodyContent + keywordContent + descriptionContent;
			doc.add(new TextField("generalContent", generalContent, Field.Store.NO));

			if (writer.getConfig().getOpenMode() == OpenMode.CREATE) {
				// New index, so we just add the document (no old document can
				// be there):
				// System.out.println("adding " + file);
				writer.addDocument(doc);
			} else {
				// Existing index (an old copy of this document may have been
				// indexed) so
				// we use updateDocument instead to replace the old one matching
				// the exact
				// path, if present:
				// System.out.println("updating " + file);
				writer.updateDocument(new Term("path", file.toString()), doc);
			}
		}

	}
}
