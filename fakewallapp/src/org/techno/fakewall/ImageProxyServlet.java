package org.techno.fakewall;

import java.io.DataInputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * Proxy service to fetch images from facebook.
 * 
 * @author Bageshwar
 * */
public class ImageProxyServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4325317644737320706L;

	private static final Logger logger = Logger.getLogger(ImageProxyServlet.class.getName());
	
	/**
	 * Always returns a demo image, useful for testing.
	 * @throws IOException 
	 * @throws ServletException 
	 * */
	private void serveLocalDemoImage(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {		
		request.getRequestDispatcher("/resources/icon-32x32.png").forward(request, response);
	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String urlString = request.getParameter("url");

		logger.info("URL: " + urlString);

		if (urlString == null)
			return;

		//TODO: Remove the below code
		if("127.0.0.1".equals(request.getRemoteAddr())){
			try {
				serveLocalDemoImage(request, response);
			} catch (ServletException e) {				
				e.printStackTrace();
			}
			return;
		}
		
		urlString = urlString.replace("https", "http"); // to decrease overhead
		try {
			URL url = new URL(urlString);
			HttpURLConnection connection = (HttpURLConnection) url.openConnection();
			connection.setConnectTimeout(60000);
			connection.setReadTimeout(60000);
			connection.connect();
			String contentType = connection.getContentType();

			if (!contentType.contains("image")) // TODO: More strict check
												// required here.
				return;

			response.setContentType(contentType);
			response.setContentLength(connection.getContentLength());
			DataInputStream reader = new DataInputStream(connection.getInputStream());
			@SuppressWarnings("unused")
			int c = 0;
			byte[] data = new byte[4 * 1024];
			while ((c = reader.read(data)) != -1) {
				response.getOutputStream().write(data);
			}
			reader.close();
			response.getOutputStream().close();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
