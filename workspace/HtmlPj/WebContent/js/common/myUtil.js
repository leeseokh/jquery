/**
*
*/

/**
빈값인지 확인하는 함수
return true/false
val : 값(문자열)
ex) isEmpty("홍길동")
**/
		function isEmpty(val){
			val = val.trim();
			if(val == null || val.length == 0){
				return true;
			}
			return false;
		}
		
		function checkValue(obj, strName) {
			//		var obj = document.getElementById(strId);
					if(isEmpty(obj.value)){
						alert(strName + "은(는) 필수입력 항목입니다.");
						obj.focus();
						return false;
					}
					return true;
				}
		
		function checkValueLength(strId, strName, min, max){
			var val = document.getElementById(strId).value;
		
			if(val.length < min || val.length > max){
				alert(strName + "은(는) " + min + "자 이상, " + max + "자 이하로 입력 가능합니다." );
				document.getElementById(strId).focus();
				return false;
			}
			return true;
		}