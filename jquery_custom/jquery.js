$(document).ready(function(){
	
	$('input[type=radio]').change(function(){

		var n = $(this).attr('name');

		switch(n)
		{
			case 'ref':
				$(this).parent().parent().next().val("");
				break;
		}
	});
});