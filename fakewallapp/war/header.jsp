<%
boolean loggedIn = session.getAttribute("access_token") != null;
%>
<div id="masthead">
	<span id="appheader"><b><a href="/?login=y">Fake Wall App</a></b></span> <span id="header-links"><a
		href="/about.jsp">About</a> | <a href="/help.jsp">Help</a> | <a href="/privacy.jsp">Privacy</a>
		<%-- <%if(loggedIn){ %> | <a href="history.jsp">My Fake Walls</a><%} %> --%>
		</span>
		
	<%
		//check if user is logged in.
		if (loggedIn) {
			String first_name = session.getAttribute("first_name") == null ? "User" : session.getAttribute(
					"first_name").toString();
			String id = session.getAttribute("id") == null ? "1" : session.getAttribute("id").toString();//default to pic#1
	%>
	<a href="https://www.facebook.com/"> <span id="user"><%=first_name%></span><img style="display: inline"
		src="proxy?url=https://graph.facebook.com/<%=id%>/picture" id="user-dp" /></a>
	<%
		} else {
	%>
	<a href="/?login=y"> <span id="user">Login</span><img style="display: none" src="resources/dp.jpg" id="user-dp" /></a>
	<%
		}
	%>
</div>