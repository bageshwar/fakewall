package org.techno.fakewall;

import java.io.DataInputStream;
import java.io.IOException;
import java.nio.channels.Channels;
import java.util.Enumeration;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.techno.fakewall.utils.ImageUtils;

import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileReadChannel;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;
import com.google.appengine.api.images.Image;

public class DownloadImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	private static final Logger logger = Logger.getLogger(DownloadImageServlet.class.getName());

	private static final String LOG_HOST = "Remote Host %s requested image";

	private static final String LOG_HEADER = "Header %s : %s";

	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String remoteHost = request.getRemoteHost();
		logger.info(String.format(LOG_HOST, remoteHost));

		// Someone is trying to act smart, or maybe facebook is using a
		// different ip range
		/*
		 * if (!validHost(remoteHost)) return;
		 */
		//TODO: Uncomment the above validation.
		
		try {
			String path = request.getSession().getAttribute("path")==null?null: 
				request.getSession().getAttribute("path").toString();
			// logHTTPHeaders(request); 
			
			if (path == null) {
				logger.severe("Get Image requested without any path");				
				return;
			}
			FileService fileService = FileServiceFactory.getFileService();
			AppEngineFile file = new AppEngineFile(path);

			FileReadChannel readChannel = fileService.openReadChannel(file, false);

			DataInputStream in = new DataInputStream(Channels.newInputStream(readChannel));

			ServletOutputStream out = response.getOutputStream();

			byte[] imageBytes = IOUtils.toByteArray(in);

			String type = request.getParameter("type");
			setHeaders(response,type);
			
			if (type != null && "jpg".equalsIgnoreCase(type)) {
				response.setContentType("image/jpg");
				Image output = ImageUtils.getInstance().getJPEGAutoImage(imageBytes);
				out.write(output.getImageData());

			} else {
				response.setContentType("image/png");
				out.write(imageBytes);
			}
						
			//Delete the file since it has been downloaded once.
			/*try {
				fileService.delete(file);
			} catch (Exception e) {
				logger.severe(e.getMessage());
			}*/
			
			in.close();
			readChannel.close();
			out.close();
		} catch (Exception e) {
			// this covers file not found exceptions also.
			e.printStackTrace();
			response.sendError(500);
		}
	}

	/**
	 * Set headers for popup
	 * */
	private void setHeaders(HttpServletResponse response,String type) {
		
		response.setHeader("Expires", "0");
		response.addHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
		//response.addHeader("Cache-Control", "private");
				
		response.setHeader("Content-Disposition", "attachment; filename=\"fakewallimage."+type+"\";");
		response.setHeader("Content-Transfer-Encoding", "binary");
		
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

	/**
	 * Log the headers
	 * */
	@SuppressWarnings("unused")
	private void logHTTPHeaders(HttpServletRequest request) {
		@SuppressWarnings("rawtypes")
		Enumeration headers = request.getHeaderNames();
		while (headers.hasMoreElements()) {
			String header = headers.nextElement().toString();
			logger.info(String.format(LOG_HEADER, header, request.getHeader(header)));
		}
	}
	
}
