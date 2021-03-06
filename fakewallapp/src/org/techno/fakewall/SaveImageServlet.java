package org.techno.fakewall;

import java.io.DataOutputStream;
import java.io.IOException;
import java.nio.channels.Channels;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import com.google.appengine.api.files.AppEngineFile;
import com.google.appengine.api.files.FileService;
import com.google.appengine.api.files.FileServiceFactory;
import com.google.appengine.api.files.FileWriteChannel;
import com.google.appengine.repackaged.com.google.common.util.Base64;
import com.google.appengine.repackaged.com.google.common.util.Base64DecoderException;

/**
 * Saves the image to FileService
 * */
public class SaveImageServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;
	
	private static final String UPLOAD_MESSAGE="User %s, ID=%s, Token=%s uploaded image %s";
	
	private static final Logger logger = Logger.getLogger(SaveImageServlet.class.getName());

	public void doPost(HttpServletRequest request, HttpServletResponse resp) throws IOException {

		//restricted to anonymous users.
		if(request.getSession().getAttribute("access_token")==null){
			return;
		}else {
			//access_token is present, see if its still valid
			if (request.getSession().getAttribute("expires_in")!=null && 
					(Long) (request.getSession().getAttribute("expires_in")) < System.currentTimeMillis()){
				//session has expired, invalidate;
				
				request.getSession().removeAttribute("expires_in");
				request.getSession().removeAttribute("access_token");
				resp.setStatus(409, "Access Token has expired");
			}
		}
		
		
		try {
			String image = request.getParameter("image");
			
			if(image==null){
				logger.severe("Save image called with no image data");
				return;
			}
			//simply die
			image = image.substring(image.indexOf("base64,") + 7);
			
			String userid=request.getParameter("user[id]");
			String username=request.getParameter("user[name]");		
			
			//simply die
			if(userid==null || username==null){
				logger.severe("Save Image called with no User data");
				//return;
				//TODO: uncomment the above.
			}
			
			// String token=

			FileService fileService = FileServiceFactory.getFileService();
			AppEngineFile file = fileService.createNewBlobFile("image/png");

			boolean lock = true;
			FileWriteChannel writeChannel = fileService.openWriteChannel(file, lock);

			DataOutputStream out = new DataOutputStream(Channels.newOutputStream(writeChannel));

			byte data[];

			data = Base64.decode(image);

			out.write(data);

			// Close without finalizing and save the file path for writing later
			out.close();
			String path = file.getFullPath();

			writeChannel.closeFinally();
			
			logger.info(String.format(UPLOAD_MESSAGE,username,userid,
					request.getSession().getAttribute("access_token").toString(),path));
			
			
			request.setAttribute("path",path);
			
			//add this to session also, to facilitate downloading of the image.
			request.getSession().setAttribute("path", path);
			
			//request.getSession().setAttribute("image", image.substring(image.indexOf("base64,") + 7));
			request.getRequestDispatcher("upload.jsp").forward(request, resp);
			
		} catch (Base64DecoderException e) {
			
			e.printStackTrace();
		} catch (ServletException e) {
			
			e.printStackTrace();
		}
	}

	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/plain");
		resp.getWriter().println("Not Supported");
		
	}

}
