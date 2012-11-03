/**
 * 
 */
package org.techno.fakewall.utils;

import java.util.logging.Logger;

import com.google.appengine.api.images.Image;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.Transform;
import com.google.apphosting.api.ApiProxy.ApiDeadlineExceededException;

/**
 * This class contains utility methods for image transformation. These
 * transformations are useful to resize the user uploaded image, as well as
 * transform the user posted image.
 * 
 * @author Bageshwar
 * 
 */
public class ImageUtils {

	private static final Logger logger = Logger.getLogger(ImageUtils.class.getName());
	
	private static final String RESIZE_LOG_MESSAGE="Resize complete for 50X50: %s/%s bytes in %dms";

	private ImagesService imagesService = null;

	private static ImageUtils instance;

	static {
		instance = new ImageUtils();

	}

	private ImageUtils() {
		imagesService = ImagesServiceFactory.getImagesService();
	}

	/**
	 * Resizes and retouches the passed image.
	 * */
	public Image get50X50AutoImage(byte[] imageBytes)throws ApiDeadlineExceededException {
				
		long startTime=System.currentTimeMillis();
		Image input = ImagesServiceFactory.makeImage(imageBytes);
		Image output = imagesService.applyTransform(get50X50Transform(), input);//, ImagesService.OutputEncoding.JPEG);
		long duration=System.currentTimeMillis()-startTime;
		logger.info(String.format(RESIZE_LOG_MESSAGE,imageBytes.length,output.getImageData().length,duration));
		
		return output;

	}

	public static ImageUtils getInstance() {
		return instance;
	}

	/**
	 * Returns a Composite Transform which resizes the image to 50X50 and
	 * applies "I am feeling Lucky" filter to it.
	 * */
	private Transform get50X50Transform() {
		Transform resize = ImagesServiceFactory.makeResize(50, 50,false);
		Transform auto = ImagesServiceFactory.makeImFeelingLucky();
		return ImagesServiceFactory.makeCompositeTransform().concatenate(resize).concatenate(auto);

	}

	/**
	 * @return The image is retouched and re-encoded in JPG.
	 * */
	public Image getJPEGAutoImage(byte[] imageBytes) {

		Transform auto = ImagesServiceFactory.makeImFeelingLucky();
		Image input = ImagesServiceFactory.makeImage(imageBytes);
		Image output = imagesService.applyTransform(auto, input, ImagesService.OutputEncoding.JPEG);
		return output;
	}
}
