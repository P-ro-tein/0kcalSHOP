function changeIframe(url) {
    document.getElementByLd("change_frame").src = url;
}

var ct = 1;
function add_option()
{
	ct++;
	var div1 = document.createElement('div');
	div1.id = ct;


    var delLink = '<button type="button" onclick="delIt('+ ct +')">Del</button></div>';
	div1.innerHTML = document.getElementById('newlinktpl').innerHTML + delLink;
	
    document.getElementById('newlink').appendChild(div1);

}

function delIt(eleId)
{
	d = document;
	var ele = d.getElementById(eleId);
	var parentEle = d.getElementById('newlink');
	parentEle.removeChild(ele);
}