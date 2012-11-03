package org.techno.fakewall;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.techno.fakewall.utils.ImageUtils;

import com.google.appengine.api.images.Image;
import com.google.appengine.repackaged.com.google.common.util.Base64;
import com.google.apphosting.api.ApiProxy.ApiDeadlineExceededException;

/**
 * This class expects an image to be uploaded from a client.
 * This image is resized to 50X50 and re-touched using the Google API.
 * The returned image is PNG.
 * */
public class FileEchoServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	private static final Logger logger = Logger.getLogger(FileEchoServlet.class.getName());

	private static final String OUTPUT = "{\"success\":true,\"data\":\"data:image/png;base64,%s\"}";
	private static final String ERROR_JSON = "{\"success\":false}";

	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {

		Object access_token = request.getSession().getAttribute("access_token");

		// permit the upload service only to logged in users.
		if (access_token != null) {
			InputStream reader = request.getInputStream();

			String fileName = request.getParameter("qqfile");
			String dec = "";

			byte[] imageBytes = IOUtils.toByteArray(reader);
			resp.setContentType("application/javascript");
			try {
				Image output = ImageUtils.getInstance().get50X50AutoImage(imageBytes);

				// THIS COULD fail for very large files.
				dec = Base64.encode(output.getImageData());
				logger.info("ECHO Message Length: " + dec.length());				
				resp.getWriter().write(String.format(OUTPUT, dec));

			} catch (Exception e) {
				resp.getWriter().write(ERROR_JSON);
			}

		} else {
			logger.warning("Echo Service invoked without a valid session");
		}
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
