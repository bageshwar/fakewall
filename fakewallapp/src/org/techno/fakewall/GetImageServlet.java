package org.techno.fakewall;

import java.io.DataInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
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

public class GetImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	private static final Logger logger = Logger.getLogger(GetImageServlet.class.getName());

	private static final String LOG_HOST = "Remote Host %s requested image";

	private static final String LOG_HEADER = "Header %s : %s";

	/**
	 * The set of IP Facebook uses to fetch content. IP addresses fetched from
	 * whois. TODO: verify in a different geographical location.
	 * */
	private static final int[][] range = new int[][] { { 69, 171, 224, 0 }, { 69, 171, 255, 255 } };

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		String remoteHost = request.getRemoteHost();
		logger.info(String.format(LOG_HOST, remoteHost));

		// Someone is trying to act smart, or maybe facebook is using a
		// different ip range
		
		if (!validHost(remoteHost))
			return;
				
		try {
			String path = request.getParameter("path");
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
			
			if (type != null && "jpg".equalsIgnoreCase(type)) {
				response.setContentType("image/jpg");
				Image output = ImageUtils.getInstance().getJPEGAutoImage(imageBytes);
				out.write(output.getImageData());

			} else {
				response.setContentType("image/png");
				out.write(imageBytes);
			}
						
			
			/*
			 * byte data[] = new byte[8 * 1024]; int ret = 0; while ((ret =
			 * in.read(data)) != -1) { out.write(data); }
			 */

			in.close();
			readChannel.close();
			out.close();
		} catch (Exception e) {
			// this covers file not found exceptions also.
			e.printStackTrace();
			response.sendError(500);
		}
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

	/**
	 * Converting signed byte array to unsigned int array.
	 * */
	private int[] getTranslatedIntBytes(byte[] address) {
		int[] ret = new int[4];
		for (int i = 0; i < 4; i++) {
			ret[i] = address[i] > 0 ? address[i] : address[i] + 256;
		}
		return ret;
	}

	/**
	 * Returns if the host who requested the image is from the facebook nw.
	 * TFBNET3.
	 * @see http://whois.arin.net/rest/nets;q=69.171.224.2?showDetails=true&showARIN=false&ext=netref2
	 * */
	private boolean validHost(String host) throws UnknownHostException {
		int[] ip = getTranslatedIntBytes(InetAddress.getByName(host).getAddress());
		// check range
		boolean invalid = false;

		for (int i = 0; i < 4; i++) {
			if (!(ip[i] >= range[0][i] && ip[i] <= range[1][i]))
				invalid = true;
		}
		return !invalid;
	}

}
