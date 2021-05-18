//옵션 추가
const add_textbox = () => {
    const box = document.getElementById("box");
    const newP = document.createElement('p');
    newP.innerHTML = "<input type='text'> <input type='button' value='삭제' onclick='remove(this)'>";
    box.appendChild(newP);
}
const remove = (obj) => {
    document.getElementById('box').removeChild(obj.parentNode);
}

