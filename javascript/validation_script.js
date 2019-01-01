function isPhoneNumber(){
	var phone = document.getElementById('txt_mobile_refuse').value;

	var str_regexp = "^[0-9]{6,10}$";

	var obj_regexp = new RegExp(str_regexp);

	if(obj_regexp.test(phone))
	{
		return true;	
	}

	return false;
}

function isMobiPhoneNumber(){
	

	var phone = document.getElementById('txt_mobile_refuse').value;

	var str_regexp = "0((3[2-9]|5[2,6,8,9]|7[0,6-9]|8[1-6,8,9]|9[0-9])|(12[0-9]|16[2-9]|18[6,8]|199))[0-9]{7}$";

	var obj_regexp = new RegExp(str_regexp);

	if(obj_regexp.test(phone))
	{
		return true;	
	}

	return false;
}

