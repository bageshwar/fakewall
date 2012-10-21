package org.techno.fakewall;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * Matches for all the urls: /opengraph/*
 * This is required because facebook does not create duplicate updates
 * if the action is for the same url.
 * 
 * @author Bageshwar
 * */
public class OpenGraphServlet extends HttpServlet {



	/**
	 * 
	 */
	private static final long serialVersionUID = 855042298899382414L;
	
	private static final Logger logger = Logger.getLogger(OpenGraphServlet.class.getName());

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

		try {
			request.setAttribute("url", request.getRequestURI());			
			request.getRequestDispatcher("/about.jsp").forward(request, response);
		} catch (ServletException e) {
			
			e.printStackTrace();
		}
	}
}
