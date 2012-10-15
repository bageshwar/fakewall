package org.techno.fakewall;

import java.io.IOException;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;

/**
 * 
 * Sends back Random text. Part of the fun stuff.
 * 
 * @author Bageshwar
 * */
public class RandomTextServlet extends HttpServlet {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3495763991577008300L;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try {
			String c = request.getParameter("i");
			int count = 5;
			try {
				if (c != null)
					count = Integer.parseInt(c);
			} catch (Exception e) {
			}
			;

			// TODO: do something actual Random here

			//@formatter:off
		String[] randomSentences=new String[]{
				"Brown Forests",
				"Chilly Powder",
				"Polar Bear",
				"Blu Ray Disks",
				"Six Feet Under",
				"Tom and Jerry",
				"Fuel Low",
				"Judgement Day",
				"Shining Armour",
				"To Live!",
				"Wicket keeper"
		};
		//@formatter:on

			Set<Integer> randomNumbers = new HashSet<Integer>();

			Random r = new Random();
			while (randomNumbers.size() < count)
				randomNumbers.add(r.nextInt(randomSentences.length));

			String[] t = new String[count];
			int idx=0;
			for(int i:randomNumbers)
				t[idx++]=randomSentences[i];
			JSONArray json = new JSONArray(t);
			json.write(response.getWriter());
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
