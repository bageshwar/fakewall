package org.techno.fakewall;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.repackaged.com.google.common.util.Base64;
import com.google.appengine.repackaged.com.google.common.util.Base64DecoderException;

public class GetImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		// String image=request.getParameter("image");
		// request.getSession().setAttribute("image", image);

		// response.setCharacterEncoding("base64");
		// response.setContentLength(image.length());
		// response.getWriter().write("data:image/png;base64,"+image);
		try {
			String image = (String) request.getSession().getAttribute("image");
			
			byte data[] = Base64.decode(image);
			response.setContentLength(data.length);
			response.setContentType("image/png");
			response.getOutputStream().write(data);
			response.getOutputStream().close();

		} catch (Base64DecoderException e) {

			e.printStackTrace();
		}

	}

	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
