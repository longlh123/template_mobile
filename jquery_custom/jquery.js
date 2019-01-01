$(document).ready(function(){
	
	$('input[type=checkbox]').change(function(){

		var n = $(this).attr('name');

		switch(n)
		{
			case 'ref':
				var $txt_group = $(this).parent().parent();
				
				$txt_group.children().each(function(){

					switch($(this).prop('class'))
					{
						case 'txt_refuse':
							$(this).val("");
							break;
					}
				});
				break;
		}
	});

	$('input[type=text]').change(function(){
		
		var txt = $(this).attr('class');

		switch(txt)
		{
			case 'txt_refuse':
				var $txt_group = $(this).parent();

				if($(this).val().length > 0)
				{
					$txt_group.children('.chk').children('.chk_refuse').prop('checked', false);		
				}
				break;
		}
	});

	$('input[type=text]').blur(function(){

		var $txt_group = $(this).parent();

		var ischecked = false;

		$txt_group.children().each(function(){

			if($(this).prop('class') === 'chk')
			{
				$(this).children().each(function(){

					if($(this).prop('class') === 'chk_refuse')
					{
						ischecked = $(this).prop('checked');
					}
				});
			}
			else if($(this).prop('class') == 'error')
			{
				$(this).remove();				
			}
		});

		if(!ischecked)
		{
			var str_regexp = "";

			var t = $(this).val();

			switch($txt_group.prop('id'))
			{
				case 'phone':
					str_regexp =  "^[0-9]{6,10}$";
					break;
				case 'mobiphone':
					str_regexp =  "0((3[2-9]|5[2,6,8,9]|7[0,6-9]|8[1-6,8,9]|9[0-9])|(12[0-9]|16[2-9]|18[6,8]|199))[0-9]{7}$";
					break;
			}

			var objRegExp = new RegExp(str_regexp);

			if(!objRegExp.test(t))
			{
				$(this).val("");
				$(this).parent().append("<span class='error'>Số điện thoại không đúng.</span>");
				$(this).focus();
			}
		}
	});

	$('select').change(function(){

		var $grp_select = $(this).parent().parent();

		$grp_select.children().each(function(){

			if($(this).prop('class') == 'error')
			{
				$(this).remove();				
			}
		});

		switch($(this).prop('id'))
		{
			case 'sel_provinces':
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui long chon Tinh/ Thanh Pho.</span>");

					$('#sel_districts').val('0');
					$('#sel_districts').attr('disabled', 'disabled');

					$('#sel_wards').val('0');
					$('#sel_wards').attr('disabled', 'disabled');
				}
				else
				{
					$('#sel_districts').removeAttr('disabled');
				}
				break;
			case 'sel_districts':
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui long chon Quan/ Huyen.</span>");
					$('#sel_wards').val('0');
					$('#sel_wards').attr('disabled', 'disabled');
				}
				else
				{
					$('#sel_wards').removeAttr('disabled');
				}
				break;
			case 'sel_wards':
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui long chon Phuong/ Xa.</span>");
				}
				break;
			default:
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui long chon cau tra loi.</span>");
				}
				break;
		}

		




	});





});