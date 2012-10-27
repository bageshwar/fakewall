package org.techno.fakewall;

import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;

import com.google.appengine.repackaged.com.google.common.util.Base64;

public class FileEchoServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	private static final Logger logger = Logger.getLogger(FileEchoServlet.class.getName());

	private static final String OUTPUT = "{\"success\":true,\"data\":\"data:image/png;base64,%s\"}";

	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {

		Object access_token = request.getSession().getAttribute("access_token");
		
		//permit the upload service only to logged in users.
		if (access_token != null) {
			InputStream reader = request.getInputStream();
			byte data[] = new byte[64 * 1024]; // 64K
			String dec = "";

			// THIS COULD fail for very large files.
			dec = Base64.encode(IOUtils.toByteArray(reader));

			logger.info("ECHO Message Length: " + dec.length());

			resp.setContentType("application/javascript");
			resp.getWriter().write(String.format(OUTPUT, dec));

		}
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
