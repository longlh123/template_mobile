function getElementsByClassName(class_name)
{
	var found = [];
	var elements = document.getElementsByTagName("*");
	for(var i = 0; i < elements.length; i++)
	{
		var names = elements[i].className.split(' ');

		for(var j = 0; j < names.length; j++)
		{
			if(names[j] == class_name)
			{
				found.push(elements[i]);
			}
		}
	}
	return found;
}

function HasScroll()
{
	if(content.scrollTop + content.clientHeight != content.scrollHeight)
	{
		btn_prev.disabled = true;
		btn_prev.style.opacity = "0.5";
	}
	else
	{
		btn_prev.disabled = false;
		btn_prev.style.opacity = "1";
	}
}

var chrome = navigator.userAgent.indexOf('Chrome') > -1;
var exploser = navigator.userAgent.indexOf('MSIE') > -1;
var firefox = navigator.userAgent.indexOf('Firefox') > -1;
var safari = navigator.userAgent.indexOf('Safari') > -1;
var camino = navigator.userAgent.indexOf('Camino') > -1;
var opera = navigator.userAgent.indexOf('Opera') > -1;

if((chrome) && (safari)) safari = false;
if((chrome) && (opera)) chrome = false;

var content = getElementsByClassName('content')[0];
var btn_prev = document.getElementById('btnPrev');

if(content.scrollTop + content.clientHeight == content.scrollHeight)
{
	btn_prev.disabled = false;
	btn_prev.style.opacity = "1";
}
else
{
	btn_prev.disabled = true;
	btn_prev.style.opacity = "0.5";
}

if(!content.addEventListener)
{
	content.attachEvent('onscroll', HasScroll);
}
else
{
	content.addEventListener('scroll', HasScroll);
}





