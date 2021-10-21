<%@page import="java.util.List"%>
<%@page import="java.util.ArrayList"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Insert title here</title>
	<script type="text/javascript">
	$(document).ready(function() {
		
	});
	</script>
</head>
<% 
request.setCharacterEncoding("UTF-8");

String userName = (String)request.getAttribute("name");
String userAge = (String)request.getAttribute("age");
System.out.println(userName);
System.out.println(userAge);

String userName1 = (String)request.getParameter("name");
String userAge1 = (String)request.getParameter("age");
System.out.println(userName1);
System.out.println(userAge1);

//--------------비교--------------
//getParameter() -set메소드가 없음.	= 'string 리턴'
//getAttribute() - set메소드가 있음 	= setAttribute("~")를 사용해야 get할 수 있음. 'object' 리턴.
%>
<body>
	<p>로그인 : <span id="userName">홍길동</span>님</p>
	<h1>Welcome to the Web Programming!</h1>
	<br>
	<p>
		언제든지 오셔서 질문이 있으시면 올려주세요! <em>환영합니다!!!</em>
	</p>
	<h2>내용</h2>
	<p>HTML5, CSS3, Javascript, jQuery, SQL, JSP, ...</p>
	<h2>기간</h2>
	<p>2021.03.10~2021.10.21</p>
	<h2>장소</h2>
	<p>대덕인재개발원</p>
</body>
</html>