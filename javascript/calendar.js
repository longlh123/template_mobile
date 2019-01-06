var Calendar = function(divId){

	//Lưu div ID
	this.divId = divId;

	//Ngày trong tuần, bắt đầu từ chủ nhật
	this.DayOfWeeks = [
		'CN',
		'T2',
		'T3',
		'T4',
		'T5',
		'T6',
		'T7'
	];

	//Tháng, bắt đầu từ tháng một
	this.Months = [
		'Tháng Một',
		'Tháng Hai',
		'Tháng Ba',
		'Tháng Tư',
		'Tháng Năm',
		'Tháng Sáu',
		'Tháng Bảy',
		'Tháng Tám',
		'Tháng Chín',
		'Tháng Mười',
		'Tháng Mười Một',
		'Tháng Mười Hai'
	];

	//Set mặc định tháng, năm hiện hành
	var d = new Date();

	this.currMonth = d.getMonth(); //0-11
	this.currYear = d.getFullYear();
	this.currDate = d.getDate(); //1-31
}

//Goes to next Month
Calendar.prototype.nextMonth = function(){

	if(this.currMonth === 11){
		this.currMonth = 0;
		this.currYear += 1;
	}
	else
	{
		this.currMonth += 1;
	}

	this.showcurr();
};

//Goes to previous Month
Calendar.prototype.previousMonth = function(){

	if(this.currMonth === 0){
		this.currMonth = 11;
		this.currYear -= 1;
	}
	else
	{
		this.currMonth -= 1;
	}

	this.showcurr();
};

//Show current Month
Calendar.prototype.showcurr = function(){

	this.showMonth(this.currYear, this.currMonth);
};

//Show month(year, month)
Calendar.prototype.showMonth = function(y, m){

	var d = new Date();
	var firstDayOfMonth = new Date(y, m, 1).getDay(); 
	var lastDayOfMonth = new Date(y, m + 1, 0).getDate();
	var lastDayOfLastMonth = m === 0 ? new Date(y - 1, 12, 0).getDate() : new Date(y, m, 0).getDate();

	var html = '<table>';

	html += '<thead><tr>';
	html += '<td colspan="7">' + this.Months[m] + ' - ' + y + '</td>';
	html += '</tr></thead>';

	html += '<tr class="days">';

	for(var i = 0; i < this.DayOfWeeks.length; i++)
	{
		html += '<td>' + this.DayOfWeeks[i] + '</td>'
	}

	html += '</tr>';

	var i = 1;

	do
	{
		var dow = new Date(y, m, i).getDay();

		//Neu la ngay chu nhat thi bat dau voi dong moi
		if(dow === 0)
		{
			html += '<tr>';
		}
		//Neu khong phai la ngay chu nhat 
		//Thi se viet nhung ngay cuoi cung cua thang truoc
		else if(i === 1)
		{
			html += '<tr>';

			var k = lastDayOfLastMonth - firstDayOfMonth + 1;

			for(var j = 0; j < firstDayOfMonth; j++)
			{
				html += '<td class="not-current">' + k + '</td>';
				k++;
			}
		}

		var chk = new Date();
		var chkY = chk.getFullYear();
		var chkM = chk.getMonth();

		if(chkY === this.currYear && chkM === this.currMonth && i === this.currDate)
		{
			html += '<td class="today">' + i + '</td>'
		}
		else
		{
			html += '<td class="normal">' + i + '</td>'	
		}

		//Ney la thu bay thi ket thuc hang
		if(dow === 6)
		{
			html += '</tr>';	
		}
		//Neu khong phai thu bay nhung la ngay cuoi cung cua thang duoc chon
		//Thi se viet cac ngay tiep theo cua thang toi
		else if(i === lastDayOfLastMonth)
		{
			var k = 1;

			for(dow; dow < 6; dow++)
			{
				html += '<td class="not-current">' + k + '</td>';
				k++;
			}
		}

		i++;

	}while(i <= lastDayOfLastMonth);

	html += '</table>'; 

	document.getElementById(this.divId).innerHTML = html;
};

//On Load of the window
window.onload = function(){

	var c = new Calendar("divCal");
	c.showcurr();

	document.getElementById("btncalprev").onclick = function(){

		c.previousMonth();
	};

	document.getElementById("btncalnext").onclick = function(){

		c.nextMonth();
	};
}





