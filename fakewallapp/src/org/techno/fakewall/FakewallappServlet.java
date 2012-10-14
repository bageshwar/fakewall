package org.techno.fakewall;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class FakewallappServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {
		/*
		 * resp.setContentType("text/plain");
		 * resp.getWriter().println("Hello, world");
		 */

		/*try {

			String code = request.getParameter("code");
			String image = request.getParameter("image");
			
		
			
			PostMethod filePost = new PostMethod("https://graph.facebook.com/me/photos");
		    filePost.getParams().setBooleanParameter(HttpMethodParams.USE_EXPECT_CONTINUE, false);
		    try {
		      println("Uploading " + file.getName() + " to 'https://graph.facebook.com/me/photos'");
		      Part[] parts = [new FilePart('source', file.getName(), file), new StringPart('access_token', "${facebookData.access_token}"), new StringPart('message', 'some message')]
		      filePost.setRequestEntity(new MultipartRequestEntity(parts, filePost.getParams()));
		      HttpClient client = new HttpClient();
		      client.getHttpConnectionManager().getParams().setConnectionTimeout(5000);
		      int status = client.executeMethod(filePost);
		      if (status == HttpStatus.SC_OK) {
		        println("Upload complete, response=" + filePost.getResponseBodyAsString());
		      } else {
		        println("Upload failed, response=" + HttpStatus.getStatusText(status));
		        // Create response
		        StringBuilder notificationsSendResponse = new StringBuilder();
		        byte[] byteArrayNotifications = new byte[4096];
		        for (int n; (n = filePost.getResponseBodyAsStream().read(byteArrayNotifications)) != -1;) {
		          notificationsSendResponse.append(new String(byteArrayNotifications, 0, n));
		        }
		        String notificationInfo = notificationsSendResponse.toString();
		      }
		    } catch (Exception ex) {
		      println("ERROR: " + ex.getClass().getName() + " " + ex.getMessage());
		      ex.printStackTrace();
		    } finally {
		      filePost.releaseConnection();
		    }*/
		
		upload1(request,resp);
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
	}
	
	private void upload1(HttpServletRequest request, HttpServletResponse resp){
		
		String code = request.getParameter("code");
		String image = request.getParameter("image");
		try{
		String urlParameters = "access_token="+code+"&message=FakeWallApp&source="+image;
		
		URL url = new URL("https://graph.facebook.com/me/photos"); 
		HttpURLConnection connection = (HttpURLConnection) url.openConnection();           
		connection.setDoOutput(true);
		connection.setDoInput(true);
		connection.setInstanceFollowRedirects(false); 
		connection.setRequestMethod("POST"); 
		connection.setRequestProperty("Content-Type", "multipart/form-data"); 
		connection.setRequestProperty("charset", "utf-8");
		connection.setRequestProperty("Content-Length", "" + Integer.toString(urlParameters.getBytes().length));
		connection.setUseCaches (false);

		DataOutputStream wr = new DataOutputStream(connection.getOutputStream ());
		wr.writeBytes(urlParameters);
		wr.flush();
		wr.close();
		
		BufferedReader bin  =  new BufferedReader(new InputStreamReader(connection.getInputStream()));
		String temp;
		String o = null;
		while((temp=bin.readLine()) != null){
			o+=temp;
			System.out.println(temp);
		}
		connection.disconnect();
		request.setAttribute("o", o);

		request.getRequestDispatcher("uploaded.jsp").forward(request, resp);

	} catch (ServletException e) {

		e.printStackTrace();
	} catch (MalformedURLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	}
}
