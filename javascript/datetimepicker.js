var DateTimePicker = function(divId, divClass){

	//Lưu div ID
	this.divId = divId;
	this.divClass = divClass;

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

DateTimePicker.prototype.show = function(){

	var html = "<label for='" + this.divId + "_txt'>CONTENT</label><input type='text' id='" + this.divId + "_txt' class='dtp_txt' placeholder='' required>";
	html += "<div id='" + this.divId + "_container' class='dtp_container'>"
	html += "<button id='" + this.divId + "_btncalprev' class='btncalprev' type='button'>Prev</button>";
    html += "<button id='" + this.divId + "_btncalnext' class='btncalnext' type='button'>Next</button>";
    html += "<div id='" + this.divId + "_calendar'><div></div>";

	document.getElementById(this.divId).innerHTML = html;
};

//Goes to next Month
DateTimePicker.prototype.nextMonth = function(id_con){
	
	if(this.currMonth === 11){
		this.currMonth = 0;
		this.currYear += 1;
	}
	else
	{
		this.currMonth += 1;
	}

	this.showDTP(id_con);
};

//Goes to previous Month
DateTimePicker.prototype.previousMonth = function(id_con){
	
	if(this.currMonth === 0){
		this.currMonth = 11;
		this.currYear -= 1;
	}
	else
	{
		this.currMonth -= 1;
	}

	this.showDTP(id_con);
};

//Show current Month
DateTimePicker.prototype.showDTP = function(id_con){

	this.showMonth(id_con, this.currYear, this.currMonth);

	document.getElementById(this.divId + "_month").onchange = function(){

		this.currMonth = this.value;
		this.currYear = document.getElementById(this.divId + "_year").value;

		this.showDTP(this.divId + "_calendar");
	};

	document.getElementById(this.divId + "_year").onchange = function(){

		console.log(this.divId + "_year");
		this.currMonth = this.value;
		this.currYear = document.getElementById(this.divId + "_year").value;

		this.showDTP(this.divId + "_calendar");
	};
};

//Show month(year, month)
DateTimePicker.prototype.showMonth = function(id_con, y, m){

	var d = new Date();
	var firstDayOfMonth = new Date(y, m, 1).getDay(); 
	var lastDayOfMonth = new Date(y, m + 1, 0).getDate();
	var lastDayOfLastMonth = m === 0 ? new Date(y - 1, 12, 0).getDate() : new Date(y, m + 1, 0).getDate();

	var html = '<table>';

	html += '<thead><tr>';
	html += '<td colspan="7">';
	
	html += '<select id="' + this.divId + '_month">'
	
	for(var i = 0; i <= 11; i++)
	{
		if(i == m)
		{
			html += '<option value="' + i + '" selected="selected">' + this.Months[i] + '</option>';
		}
		else
		{
			html += '<option value="' + i + '">' + this.Months[i] + '</option>';	
		}
	}

	html += '</select>'
	
	html += '<select id="' + this.divId + '_year">'
	
	for(var i = 1900; i <= this.currYear; i++)
	{
		if(i == y)
		{
			html += '<option value="' + i + '" selected="selected">' + i + '</option>';
		}
		else
		{
			html += '<option value="' + i + '">' + i + '</option>';	
		}
	}

	html += '</select>'

	html += '</td>';
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
			html += '<td class="today" id="' + this.divId + "=" + (i >= 1 && i <= 9 ? "0" : "") + i + "/" + ((m + 1) >= 1 && (m + 1) <= 9 ? "0" : "") + (m + 1) + "/" + y + '">' + i + '</td>'
		}
		else
		{
			html += '<td class="normal" id="' + this.divId + "=" + (i >= 1 && i <= 9 ? "0" : "") + i + "/" + ((m + 1) >= 1 && (m + 1) <= 9 ? "0" : "") + (m + 1) + "/" + y + '">' + i + '</td>'	
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

	document.getElementById(id_con).innerHTML = html;
};



//On Load of the window
window.onload = function(){

	var arr_dtps = [];
	var dtps = document.getElementsByClassName("datetimepicker");

	for(var i = 0; i < dtps.length; i++)
	{
		var id = "dtp_" + (i + 1);

		var dtp = new DateTimePicker(id, "datetimepicker");
		
		arr_dtps.push(dtp);
	}

	arr_dtps.forEach(function(dtp){

		dtp.show();
		
		document.getElementById(dtp.divId + "_txt").onkeypress = function(){

			return false;
		};

		document.getElementById(dtp.divId + "_txt").onblur = function(){

			if(this.value.length == 0)
			{
				var d = new Date();

				var ngay = (d.getDate() >= 1 && d.getDate() <= 9 ? "0" : "") + d.getDate();
				var thang = (d.getMonth() + 1 >= 1 && d.getMonth() + 1 <= 9 ? "0" : "") + (d.getMonth() + 1);
				
				this.value = ngay + "/" + thang + "/" + d.getFullYear();

				var x = document.getElementById(dtp.divId + "_container");

				x.style.display = "none";
			}
		};

		document.getElementById(dtp.divId + "_txt").onfocus = function(){

			dtp.showDTP(dtp.divId + "_calendar");

			var x = document.getElementById(dtp.divId + "_container");

			x.style.display = "block";

			var days = document.getElementsByClassName('normal');

			for(var i = 0; i < days.length; i++)
			{
				var day = document.getElementById(days[i].id);

				day.onclick = function(){

					document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

					var x = document.getElementById(this.id.split('=')[0] + "_container");

					x.style.display = "none";
				};
			}

			var days = document.getElementsByClassName('today');

			for(var i = 0; i < days.length; i++)
			{
				var day = document.getElementById(days[i].id);

				day.onclick = function(){

					document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

					var x = document.getElementById(this.id.split('=')[0] + "_container");

					x.style.display = "none";
				};
			}

			/*
			document.getElementById(dtp.divId + "_month").onchange = function(){

				dtp.currMonth = this.value;
				dtp.currYear = document.getElementById(dtp.divId + "_year").value;

				dtp.showDTP(dtp.divId + "_calendar");
			};

			document.getElementById(dtp.divId + "_year").onchange = function(){

				dtp.currMonth = this.value;
				dtp.currYear = document.getElementById(dtp.divId + "_year").value;

				dtp.showDTP(dtp.divId + "_calendar");
			};
			*/
			document.getElementById(dtp.divId + "_btncalprev").onclick = function(){

				dtp.previousMonth(dtp.divId + "_calendar");

				var days = document.getElementsByClassName('normal');

				for(var i = 0; i < days.length; i++)
				{
					var day = document.getElementById(days[i].id);

					day.onclick = function(){

						document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

						var x = document.getElementById(this.id.split('=')[0] + "_container");

						x.style.display = "none";
					};
				}

				var days = document.getElementsByClassName('today');

				for(var i = 0; i < days.length; i++)
				{
					var day = document.getElementById(days[i].id);

					day.onclick = function(){

						document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

						var x = document.getElementById(this.id.split('=')[0] + "_container");

						x.style.display = "none";
					};
				}
			};

			document.getElementById(dtp.divId + "_btncalnext").onclick = function(){

				dtp.nextMonth(dtp.divId + "_calendar");

				var days = document.getElementsByClassName('normal');

				for(var i = 0; i < days.length; i++)
				{
					var day = document.getElementById(days[i].id);

					day.onclick = function(){

						document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

						var x = document.getElementById(this.id.split('=')[0] + "_container");

						x.style.display = "none";
					};
				}

				var days = document.getElementsByClassName('today');

				for(var i = 0; i < days.length; i++)
				{
					var day = document.getElementById(days[i].id);

					day.onclick = function(){

						document.getElementById(this.id.split('=')[0] + "_txt").value = this.id.split('=')[1];

						var x = document.getElementById(this.id.split('=')[0] + "_container");

						x.style.display = "none";
					};
				}
			};
		};


	});	
};





