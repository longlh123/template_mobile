
(function($){

	$.fn.templateSelectTag = function($this, url_json, title){

		var id;
		id = '';

		switch($this.prop('id'))
		{
			case 'provinces':
				id = 'sel_provinces'
				break;
			case 'districts':
				id = 'sel_districts'
				break;
			case 'wards':
				id = 'sel_wards'
				break;
		}

		$this.empty();
		$this.append('<div class="txt_content">' + title.toUpperCase() + '</div>');
		$this.append('<div class="sel">' +
						'<select ' + (id.length === 0 ? '' : 'id =' + id) + ' class="sel_select">' +
						'	<option value="0">Chọn ' + title + '</option>' + 
						'</select>' +
						'<div class="sel_arrow"></div>' +
					'</div>');

		
		$.getJSON(url_json, function(data){

			$.each(data, function(key, entry){

				$('#' + id).append('<option value="' + key + '">' + data[key]["name_with_type"] + '</option>');
			});
		});
	};

})(jQuery);

$(document).ready(function(){
	
	$.fn.templateSelectTag($('#provinces'), '../json/tinh_tp.json', 'Tỉnh/ Thành Phố');

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

	$('body').on('change', '.sel_select', function(){

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
					$grp_select.append("<span class='error'>Vui lòng chọn Tỉnh/ Thành Phố.</span>");	

					$('#districts').empty();
					$('#wards').empty();
				}
				else
				{
					$.fn.templateSelectTag($('#districts'), '../json/quan-huyen/' + $(this).val() + '.json', 'Quận/ Huyện');
				}
				break;
			case 'sel_districts':
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui lòng chọn Quận/ Huyện.</span>");
					
					$('#wards').empty();
				}
				else
				{
					$.fn.templateSelectTag($('#wards'), '../json/xa-phuong/' + $(this).val() + '.json', 'Phường/ Xã');
				}
				break;
			case 'sel_wards':
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui lòng chọn Phường/ Xã.</span>");
				}
				break;
			default:
				if($(this).val() === '0')
				{
					$grp_select.append("<span class='error'>Vui lòng chọn câu trả lời.</span>");
				}
				break;
		}
	});

		




});