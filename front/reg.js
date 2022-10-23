document.querySelector('#reg_btn').onclick = async (e) => {
    e.preventDefault();
    const emailRegexp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    const passRegexp = new RegExp(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/);
    
    const fullName = document.querySelector('#fullName');
    const number = document.querySelector('#number');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');

    if(!emailRegexp.test(email.value)){
        email.style.border = "1px solid #ff352e";
        email.oninput = () => {
            if(emailRegexp.test(email.value)){
                email.style.border = null;
            }
        }
        return;
    }
    if(!passRegexp.test(password.value)){
        password.style.border = "1px solid #ff352e";
        password.oninput = () => {
            if(passRegexp.test(password.value)){
                password.style.border = null;
            }
        }
        return;
    }
    if(fullName.value.split(" ") < 2){
        fullName.style.border = "1px solid #ff352e";
        fullName.oninput = () => {
            if(fullName.value.split(" ").length >= 2){
                fullName.style.border = null;
            }
        }
        return;
    }
    if(number.value.length < 11){
        number.style.border = "1px solid #ff352e";
        number.oninput = () => {
            if(number.value.length >= 11){
                number.style.border = null;
            }
        }
        return;
    }

    
    const response = await sendRequest('POST', '/api/registration', {
        fullName: fullName.value,
        number: number.value,
        password: password.value,
        email: email.value
    });

    const data = await response.json();

    if(response.status === 200){
        alert("Ссылка для подтверждения отправлена на указанный адрес электронной почты");
    } else {
        alert("Неизвестная ошибка");
    }
}