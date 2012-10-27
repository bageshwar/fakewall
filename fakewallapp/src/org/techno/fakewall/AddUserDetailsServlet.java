package org.techno.fakewall;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AddUserDetailsServlet extends HttpServlet {
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5099428285876186326L;

	private static final Logger logger = Logger.getLogger(AddUserDetailsServlet.class.getName());
	
	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {		
		
		Object access_token=request.getSession().getAttribute("access_token");
		
		if(access_token!=null){
			//only allow logged-in users to update their user details
			String first_name=request.getParameter("user[first_name]");
			String id=request.getParameter("user[id]");
			request.getSession().setAttribute("first_name", first_name);
			request.getSession().setAttribute("id",id);
			
		}

	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}

}
