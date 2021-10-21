/**
 * 회원가입화면 JS
 * 
 */

/*
 * [중복검사] 버튼 클릭 시 - ID 중복 검사
 */
$(document).ready(function() {
   $("#addrTb").on('dblclick', 'tbody tr', function() {
      var zipcode = $($(this).children()[0]).text();
      var addr = $($(this).children()[1]).text();
      $("#memZip").val(zipcode);
      $("#memAdd1").val(addr);
      $("#zipModal").modal("hide");
   });
});

function duplicateId() {
	var id = document.getElementById('userId').value;
	var idValue = id.trim().length;

	// ajax 처리
	// 1.입력된 값이 있는지 확인
	// 2.입력된 값이 형식에 맞는지
	// -영문 소문자는 반드시 포함하고, 영문 소문자와 숫자의 조합으로 4~12 글자

	// 3.DB에서 중복된게 있는지
	var param = {
		userId : $("#userId").val(),
		flag : "CHKID"
	};
	console.log(param);
	$.ajax({
		url : "/jqueryPJ/MemberServlet",
		type : "post",
		data : param,
		dataType : "json",
		success : function(data) {
			console.log(data);
			// data ==> {resultCnt: 0}
			if (idValue < 1) {
				$("#userIdSpan").text("ID를 입력해주세요");
				return false;
			}
			if (idValue < 4 || idValue > 12) {
				$("#userIdSpan").text("ID는 4~12자 형식에 맞춰주세요");
				return false;
			}
			var idReg = /^[a-z][a-zA-Z0-9]{3,11}$/;
			if (!(idReg.test(id))) {
				return false;
			}
			if (data.resultCnt == 0) {
				$("#userIdSpan").text($("#userId").val() + "는 사용가능한 ID입니다.");
				$("#userIdSpan").addClass("text-success");
			} else {
				alert("이미 사용중인 ID입니다.");
				$("#userId").focus();
				$("#userIdSpan").text("이미 사용중인 ID입니다.");
				$("#userIdSpan").addClass("text-warning");
			}
		},
		error : function(xhr) {
			console.log(xhr);
			alert("오류입니다. 관리자에게 문의하세요.");
		}
	});
}

/*
 * [저장] 버튼 클릭 시 - 회원정보 저장
 */
function save() {

	var name = document.getElementById('userName').value;
	var password = document.getElementById('userPwd').value;
	var birth = document.getElementById('userBirth').value;
	var phone = document.getElementById('userHp').value;
	var emailAd = document.getElementById('userEmail').value;

	var nameValue = name.trim().length;
	var pwValue = password.trim().length;
	var birthValue = birth.trim().length;
	var phoneValue = phone.trim().length;
	var emailAdValue = emailAd.trim().length

			$.ajax({
				url : "/jqueryPJ/MemberServlet",
				type : "post",
				data : $("#fm").serialize(),
				dataType : "json",
				success : function(data) {
				
				var cnt = 0;
				while(true){
					
					if (nameValue < 1) {
						$("#userNameSpan").text("이름을 입력해주세요");
					}
					if (nameValue < 2 || nameValue > 5) {
						$("#userNameSpan").text("이름은 2 ~ 5자 사이로 입력해주세요.");
					}
					var nameReg = /^[가-힣]{2,5}$/;
					if (!(nameReg.test(name))) {
						$("#userNameSpan").text("이름 형식 오류");
					}

					if (birthValue < 1) {
						$("#userBirthSpan").text("생일 입력 해주세요");
					}

					if (pwValue < 1) {
						$("#userPasswordSpan").text("비밀번호를 입력해주세요 (8~12) 영문 대소문자 특수기호 숫자를 다 넣어 조합해주세요.");
					}
					if (pwValue < 8 || pwValue > 12) {
						$("#userPasswordSpan").text("비밀번호는 8 ~ 12자 사이로 입력해주세요.");
					}
					var pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{7,11}$/;
					if (!(pwReg.test(password))) {
						$("#userPasswordSpan").text("비밀번호 형식오류");
					}

					if (phoneValue < 1) {
						$("#userHpSpan").text("휴대폰 번호 입력를 입력해주세요 ");
					}
					var phoneReg = /^\d{3}-\d{4}-\d{4}$/;
					;
					if (!(phoneReg.test(phone))) {
						$("#userHpSpan").text("휴대폰 번호 형식오류 ");
					}

					if (emailAdValue < 1) {
						$("#userEmailSpan").text("이메일 입력 해주세요 ");
					}
					var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
					if (!(emailReg.test(emailAd))) {
						$("#userEmailSpan").text("이메일 형식 오류  ");
						return true;
					}							
				}
					alert("저장성공")
					
				},
				error : function(xhr) {
				}

			});
}

/*
 * [취소] 버튼 클릭 시 - 회원목록(이전)화면으로 돌아가기
 * */
function cancel() {

}

/*
 * 우편번호 모달 창 [검색] 버튼 클릭 시 - 우편번호 목록 조회
 * */
function srchAddrList(){
    // ajax
    var param = {
          dong : $("#dong").val()
       
    };
    console.log(dong);
    console.log(param);
    $.ajax({
       url: "/jqueryPJ/ZipServlet"
       ,type: "post"
       ,data: param
       ,dataType: "json"
       ,success: function(data){
          console.log(data);
          makeTable(data);
       }
       ,error: function(xhr){
          console.log(xhr);
          alert("오류입니다. 관리자에게 문의하세요.");
       }
    });
    
    function makeTable(data){
       $("#addrTb tbody").empty();
       var strHtml = "";
       
       for(var i=0 ; i<data.length ; i++){
          
          var zipcode = data[i].zipcode;
          var sido = data[i].sido;
          var gugun = data[i].gugun;
          var dong = data[i].dong;
          var bunji = data[i].bunji;
          console.log(bunji);
          if(bunji == "null") {
             bunji = "";
          }
          
          strHtml += "<tr>"
                + "<td>" + zipcode + "</td>"
                + "<td>" + sido + gugun + dong + bunji + "</td>"
                + "</tr>";
       }
       
       if(data.length == 0){
          strHtml = "<tr>"
                 + '<td colspan="2">검색 결과가 없습니다.</td>'
                 + "</tr>";
       }
       
       $("#addrTb tbody").html(strHtml);
    }
}