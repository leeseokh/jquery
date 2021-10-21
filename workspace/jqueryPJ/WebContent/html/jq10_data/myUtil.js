function format(type, val) {
	if(val){
		return;
	}
	if(type == "DATE"){
		
		if(val.length !=8){
			return val
		}
		//20200603, 19200603
		val = val.substr(0, 4) + "-" + val.substr(4, 2) + "-" + val.substr(6);
		//2020-06-03, 1920-06-03
	}
	return val;
}