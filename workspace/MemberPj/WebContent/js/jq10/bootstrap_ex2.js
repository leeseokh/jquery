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
      url : "/MemberPj/MemberServlet",
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

//이름
$(document).on("propertychange change keyup paste input", "#userName",
      function() {
         var nameReg = /^[가-힣]{2,5}$/;
         if ($("#userName").val().match(nameReg)) {
            $("#userNameSpan").html("사용 가능합니다.");
         } else {
            $("#userNameSpan").html("2~5자 형식에 맞춰 작성해주세요");
         }
      });
//생일
$(document).on("propertychange change keyup paste input", "#userBirth",
      function() {
         var userbirth = $("#userBirth").val();
         // 10살이상만 가입가능
         var now = new Date();
         var currentYear = now.getFullYear();
         var birthYear = userbirth.substr(0, 4);
         birthYear = (currentYear - birthYear) + 1;

         if (birthYear < 10 || userbirth == "") {
            document.getElementById("userBirth").focus();
            $("#userBirthSpan").text("10세 이상부터 가입 가능합니다.");
            num++;
         } else {
            $("#userBirthSpan").text("");
         }

      });
//패스워드
$(document).on("propertychange change keyup paste input", "#userPwd", 
      function() {
         var pwReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{7,11}$/;
         if($("#userPwd").val().match(pwReg)){
            $("#userPasswordSpan").html("사용 가능합니다.");
         }else{
            $("#userPasswordSpan").html("비밀번호를 입력해주세요 (8~12) 영문 대소문자 특수기호 숫자를 다 넣어 조합해주세요.");   
         }
      });
//폰번호
$(document).on("propertychange change keyup paste input", "#userHp",
      function() {
         var phoneReg = /^\d{3}-\d{4}-\d{4}$/;
         if ($("#userHp").val().match(phoneReg)) {
              $("#userHpSpan").html("사용 가능합니다.");
         }else{
            $("#userHpSpan").html("휴대폰 번호형식 오류입니다.");
         }
      });
//이메일
$(document).on("propertychange change keyup paste input", "#userEmail", 
      function() {
         var emailReg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
         if($("#userEmail").val().match(emailReg)){
            $("#userEmailSpan").html("사용 가능합니다.");
         }else{
            $("#userEmailSpan").html("이메일  번호형식 오류입니다.");   
         }
      });



/*
 * [저장] 버튼 클릭 시 - 회원정보 저장
 */
function save() {
   
      
}

/*
 * [취소] 버튼 클릭 시 - 회원목록(이전)화면으로 돌아가기
 * */
function cancel() {

}

/*
 * 우편번호 모달 창 [검색] 버튼 클릭 시 - 우편번호 목록 조회
 * */
function srchAddrList() {
   // ajax
   var param = {
      dong : $("#dong").val()

   };
   console.log(dong);
   console.log(param);
   $.ajax({
      url : "/MemberPj/ZipServlet",
      type : "post",
      data : param,
      dataType : "json",
      success : function(data) {
         makeTable(data);
      },
      error : function(xhr) {
         alert("오류입니다. 관리자에게 문의하세요.");
      }
   });

   function makeTable(data) {
      $("#addrTb tbody").empty();
      var strHtml = "";

      for (var i = 0; i < data.length; i++) {

         var zipcode = data[i].zipcode;
         var sido = data[i].sido;
         var gugun = data[i].gugun;
         var dong = data[i].dong;
         var bunji = data[i].bunji;
         console.log(bunji);
         if (bunji == "null") {
            bunji = "";
         }

         strHtml += "<tr>" + "<td>" + zipcode + "</td>" + "<td>" + sido
               + gugun + dong + bunji + "</td>" + "</tr>";
      }

      if (data.length == 0) {
         strHtml = "<tr>" + '<td colspan="2">검색 결과가 없습니다.</td>' + "</tr>";
      }

      $("#addrTb tbody").html(strHtml);
   }
}