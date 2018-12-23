$(document).ready(function(){
	
	$('input[type=checkbox]').change(function(){

		var n = $(this).attr('name');

		switch(n)
		{
			case 'ref':
				var $txt_group = $(this).parent().parent();

				$txt_group.children('.txt_refuse').val("");
				break;
		}
	});

	$('input[type=text]').change(function(){
		
		var txt_classname = $(this).attr('class');

		switch(txt_classname)
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


});