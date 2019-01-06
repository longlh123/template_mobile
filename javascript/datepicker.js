var DatePicker = function(divId){

	//Luu dia chi ID
	this.divId = divId;

	//Tháng, bắt đầu từ tháng một
	this.Months = [
		'Tháng 1',
		'Tháng 2',
		'Tháng 3',
		'Tháng 4',
		'Tháng 5',
		'Tháng 6',
		'Tháng 7',
		'Tháng 8',
		'Tháng 9',
		'Tháng 10',
		'Tháng 11',
		'Tháng 12'
	];

	//Set mặc định tháng, năm hiện hành
	var d = new Date();

	this.currMonth = d.getMonth(); //0-11
	this.currYear = d.getFullYear();
	this.currDate = d.getDate(); //1-31
}

DatePicker.prototype.showDatePicker = function(){

	var html = '<div class="datepicker">';
	html += '<select id="day">';
	html += '<option value="0">--</option>';

	for(var i = 1; i <= 31; i++)
	{
		html += '<option value="' + i + '">' + i + '</option>';
	}

	html += '</select>'
	html += '<div class="arrow"></div>';
	html += '</div>';
	html += ' / ';
	html += '<div class="datepicker">';
	html += '<select id="month">'
	html += '<option value="0">--</option>';

	for(var i = 0; i < 11; i++)
	{
		html += '<option value="' + i + '">' + this.Months[i] + '</option>';
	}

	html += '</select>'
	html += '<div class="arrow"></div>';
	html += '</div>';
	html += ' / ';
	html += '<div class="datepicker">';
	html += '<select id="year">'
	html += '<option value="0">--</option>';

	for(var i = this.currYear - 100; i <= this.currYear; i++)
	{
		html += '<option value="' + i + '">' + i + '</option>';
	}

	html += '</select>'
	html += '<div class="arrow"></div>';
	html += '</div>';

	document.getElementById(this.divId).innerHTML = html;
};

window.onload = function(){

	var d = new DatePicker("datepicker");
	d.showDatePicker();
}



