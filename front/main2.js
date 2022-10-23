if(!localStorage.token){
    location.replace('/login');
}

document.querySelector('.e-mail .text').innerText = localStorage.email;



document.querySelectorAll('.instruments .box').forEach(box => {
    box.onclick = async () => {
        document.querySelector('.instruments .box.chosen').classList.remove('chosen');
        box.classList.add('chosen');

        const options = {
            "width": 980,
            "height": 610,
            "symbol": box.id,
            "interval": "15",
            "timezone": "Europe/Moscow",
            "theme": "dark",
            "style": "1",
            "locale": "ru",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_legend": true,
            "allow_symbol_change": true,
            "container_id": "tradingview_0a660"
        }

        document.querySelector('.currency-chart .top .left .top').innerText = box.id.split(':')[1];

        new TradingView.widget(options);
    }
})

document.querySelector('.e-mail').onclick = e => {
    document.querySelector('.top_menu').classList.toggle('active');
    e.stopPropagation();
}
document.querySelector('.top_menu').onclick = e => {
    e.stopPropagation();
}

document.onclick = () => {
    document.querySelector('.top_menu').classList.remove('active');
}

document.querySelector('#exit').onclick = () => {
    localStorage.clear();
    location.reload();
}