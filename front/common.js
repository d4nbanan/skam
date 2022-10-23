const sendRequest = async (type, url, data="", isJson=true) => {
    const headers = {};
    if(localStorage.token){
        headers['Authorization'] = `Bearer ${localStorage.token}`;
    }
    console.log(localStorage.token)

    if(isJson){
        headers['Content-Type'] = 'application/json'
    }

    const send = async () => {
        let response;
        if(type.toUpperCase() === "GET"){
            response = await fetch(location.origin + url, {
                method: type.toUpperCase(),
                headers: headers
            });
        } else {
            response = await fetch(url, {
                method: type.toUpperCase(),
                headers: headers,
                body: isJson ? JSON.stringify(data) : data
            });
        }
        return response;
    }

    const response = await send();
    if(response.status === 401){
        const data = await response.json();
        
    }

    return response;
}

const setAuthData = () => {

}

if(localStorage.token){
    if(new Date().getTime() >= localStorage.expires){
        localStorage.clear();
        // document.querySelector('header .right_menu .loginBtn').classList.add('active');
        if(document.querySelector('.nonauthorized_btns')){
            document.querySelector('.nonauthorized_btns').style.display = "none";
        }
    } else {
        if(location.pathname === "/" || location.pathname === "/crypto-pro.html"){
            location.replace("/trade");
        }
        setAuthData();
    }
} else {
    localStorage.clear();
    // document.querySelector('header .right_menu .loginBtn').classList.add('active');
}