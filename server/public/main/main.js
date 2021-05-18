var counter = 1;
setInterval(function(){
    document.getElementById('radio'+counter).checked = true;
    counter++;
    if(counter >4){
        counter = 1;
    }
}, 5000);

function login() {
    const form =document.login_form;
    form.submit();
}

function logout() {
    const form = document.logout_form;
    form.submit();
}