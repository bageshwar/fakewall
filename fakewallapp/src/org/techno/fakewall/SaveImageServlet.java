package org.techno.fakewall;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class SaveImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {

		String image=request.getParameter("image");
		request.getSession().setAttribute("image", image.substring(image.indexOf("base64,") + 7));
		

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
