<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Insert title here</title>
	<style type="text/css">
		#td1, #td2 {
			text-align:right;

		}
		table, h1{
			width:270px;
			height:150px;
			margin:auto;
			text-align: center;
		}
	</style>
</head>
<body>
	<form action="id_do" method="post">
		<h1>아이디 찾기</h1>
		<table border="1">
			<tbody>
				<tr>
					<td id="td1">
						이&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 름: <input type="text" name="mem_name" required="required" placeholder="이름">
					</td>
				</tr>
				<tr>
					<td id="td2">
						전화번호: <input type="text" name="mem_tel" required="required" placeholder="전화번호">
					</td>
				</tr>
			</tbody>
			<tfoot>
            <tr>
               <td align="center" colspan="2">
                  <input type="submit" value="입력">
               </td>
            </tr>
         </tfoot>
		</table>
	
	</form>
	   <!-- error에 대한 처리 -->
   <%if(request.getParameter("error") != null){ %>
   <h6><font color="red">해당하는 정보로 아이디를 찾지 못했습니다</font></h6>
   <%} %>
</body>
</html>