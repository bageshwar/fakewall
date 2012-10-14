package org.techno.fakewall;

import java.io.DataInputStream;
import java.io.IOException;
import java.nio.channels.Channels;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileReadChannel;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;

public class GetImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try{
		String path = request.getParameter("path");
		FileService fileService = FileServiceFactory.getFileService();
		AppEngineFile file = new AppEngineFile(path);
		FileReadChannel readChannel = fileService.openReadChannel(file, false);

		DataInputStream in = new DataInputStream(Channels.newInputStream(readChannel));
		response.setContentType("image/png");

		ServletOutputStream out = response.getOutputStream();
		byte data[] = new byte[8 * 1024];
		int ret = 0;
		while ((ret = in.read(data)) != -1) {
			out.write(data);
			// System.out.println(ret);
		}

		in.close();
		readChannel.close();
		out.close();
		}catch(Exception e){
			e.printStackTrace();
			response.sendError(500);
		}
	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
