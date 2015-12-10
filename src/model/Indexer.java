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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Date;
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
			Analyzer analyzer = new StandardAnalyzer();
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
			
			//System.out.println(Jsoup.parse(fileContent).text());

			// Add the path of the file as a field named "path". Use a
			// field that is indexed (i.e. searchable), but don't tokenize
			// the field into separate words and don't index term frequency
			// or positional information:
			Field pathField = new StringField("path", file.toString(), Field.Store.YES);
			doc.add(pathField);

			// Add the last modified date of the file a field named "modified".
			// Use a LongField that is indexed (i.e. efficiently filterable with
			// NumericRangeFilter). This indexes to milli-second resolution,
			// which
			// is often too fine. You could instead create a number based on
			// year/month/day/hour/minutes/seconds, down the resolution you
			// require.
			// For example the long value 2011021714 would mean
			// February 17, 2011, 2-3 PM.
			doc.add(new LongField("modified", lastModified, Field.Store.NO));

			// ADD <BODY> OF DOCUMENT TO FIELD bodyContent (Uses JSoup).
			org.jsoup.nodes.Document htmldoc = Jsoup.parse(fileContent);
			String bodyContent = htmldoc.body().text();
			System.out.println("bodyContent: " + bodyContent);
			doc.add(new TextField("bodyContent", bodyContent, Field.Store.NO));

			/*// EXTRACT THE STRING BETWEEN THE <TITLE> ELEMENT
			try {
				String titleContent = fileContent.substring(fileContent.indexOf("<title>") + 7,
						fileContent.indexOf("</title>"));
				//System.out.println(titleContent);
				doc.add(new TextField("titleContent", titleContent, Field.Store.NO));
			} catch (IndexOutOfBoundsException e) {
				//System.out.println("No Title Found"); // debug line
			}*/

			/*
			 * BEGIN <VIDEO></VIDEO> ELEMENT EXTRACTION
			 

			String videoContent = null;
			Pattern src = Pattern.compile("src\\s*=\\s*\"(.+?)\"");
//			src\s*=\s*"(.+?)"
			// Start by making this easier to work with

			try {
				String vidSubstring = fileContent.substring(fileContent.indexOf("<video") + 6,
						fileContent.indexOf("</video>"));
				ArrayList<String> vidTags = new ArrayList<String>();

				// parse content between <video> elements
				if (vidSubstring.contains("title=")) { // video has title
					vidTags.add(vidSubstring.substring(vidSubstring.indexOf("title=\""),
							vidSubstring.indexOf("\"", vidSubstring.indexOf("title=\""))));
				}
				if (vidSubstring.contains("lang=")) {// video specifies
														// language
					vidTags.add(vidSubstring.substring(vidSubstring.indexOf("lang=\""),
							vidSubstring.indexOf("\"", vidSubstring.indexOf("lang=\""))));
				}
				if (vidSubstring.contains("alt=")) {// video has alternate
														// description
					vidTags.add(vidSubstring.substring(vidSubstring.indexOf("alt=\""),
							vidSubstring.indexOf("\"", vidSubstring.indexOf("alt=\""))));
				}
				if (vidSubstring.contains("src=")) {// video url, search for
														// strings
//					vidTags.add(vidSubstring.substring(vidSubstring.indexOf("src=\""),
//							vidSubstring.indexOf("\"", vidSubstring.indexOf("src=\""))));
				
					//attempting to get the content from the space between src=" and "
					Matcher m = src.matcher(vidSubstring);
					while (m.find()) {
					  System.err.println(m.group(1));
					}
					
					// src https://url.com/folder/deconstruction/goesHere.mp4

					// try and look at separating words further if possible.
					// else sort other side
				}

				for (String s : vidTags) {
					videoContent = videoContent + s + " ";
				}

				if (videoContent != null) {
					System.out.println("VideoContent: " + videoContent);
					doc.add(new TextField("videoContent", videoContent, Field.Store.NO));

				}
			} catch (IndexOutOfBoundsException e) {
				System.out.println("File does not contain video"); // debug line
			}
			
			 * END OF <VIDEO></VIDEO> ELEMENT EXTRACTION
			 */

			if (writer.getConfig().getOpenMode() == OpenMode.CREATE) {
				// New index, so we just add the document (no old document can
				// be there):
				//System.out.println("adding " + file);
				writer.addDocument(doc);
			} else {
				// Existing index (an old copy of this document may have been
				// indexed) so
				// we use updateDocument instead to replace the old one matching
				// the exact
				// path, if present:
				//System.out.println("updating " + file);
				writer.updateDocument(new Term("path", file.toString()), doc);
			}
		}

	}
}
