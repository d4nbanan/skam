if(!localStorage.token){
    location.replace('/login');
}

document.querySelector('.e-mail .text').innerText = localStorage.email;

let balance;

const getBalance = async () => {
    const response = await sendRequest('GET', '/api/getUser');
    const data = await response.json();

    document.querySelector('.balance').innerText = data.wallet + " RUB";
    balance = data.wallet;
    document.querySelector('.name .string').innerText = data.fullName;
}
getBalance();

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




document.querySelectorAll('.method_item').forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.method_item.selected').classList.remove('selected');
        btn.classList.add('selected');
    }
})

document.querySelector('#send').onclick = async() => {
    const address = document.querySelector('#address').value;
    const amount = Number(document.querySelector('#amount').value);

    if(amount > balance){
        document.querySelector('.notice').classList.add('error', 'active');
        document.querySelector('.notice').innerText = "Недостаточно средств на счете";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active', 'error');
            document.querySelector('.notice').innerText = "";
        }, 5000);

        return;
    }

    if(amount < 100 || amount > 100000){
        document.querySelector('.notice').classList.add('error', 'active');
        document.querySelector('.notice').innerText = "Сумма должна быть больше 100 и меньше 100000";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active', 'error');
            document.querySelector('.notice').innerText = "";
        }, 5000);

        return;
    }

    if(!address){
        return;
    }

    const response = await sendRequest('POST', '/api/withdraw', {
        amount,
        method: document.querySelector('.method_item.selected').id,
        address
    });

    const data = await response.json();


    if(response.status === 200){
        document.querySelector('.notice').classList.add('active');
        document.querySelector('.notice').innerText = "Транзакция инициализирована и обрабатывается. Сумма спишется с вашего личного счета после обработки";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active');
            document.querySelector('.notice').innerText = "";
        }, 5000);

        if(document.querySelector('.idTransaction')){
            document.querySelector('.idTransaction').remove();
        }

        const transaction = document.createElement('div');
        transaction.classList.add('text', 'idTransaction');
        transaction.innerHTML = `Идентификатор транзакции<br><div class="transaction">${data.code}</div>`;

        document.querySelector('.details').append(transaction);
    } else {
        document.querySelector('.notice').classList.add('error', 'active');
        document.querySelector('.notice').innerText = "Неизвестная ошибка";

        setTimeout(() => {
            document.querySelector('.notice').classList.remove('active', 'error');
            document.querySelector('.notice').innerText = "";
        }, 5000);
    }
}
