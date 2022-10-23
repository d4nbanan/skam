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

let transactions = [];

const loadTransactions = async () => {
    const response = await sendRequest('GET', '/api/getTransactions');
    const data = await response.json();

    const response2 = await sendRequest('GET', '/api/getUser');
    const data2 = await response2.json();

    document.querySelector('#fullName').value = data2.fullName;
    document.querySelector('#number').value = data2.number.replace('+', '');

    document.querySelectorAll('.account_field').forEach(item => {
        item.onchange = async () => {
            const response = await sendRequest('POST', '/api/changeUser', {
                fullName: document.querySelector('#fullName').value,
                number: document.querySelector('#number').value
            });
        }
    })

    data.forEach(item => {
        const transaction = document.createElement('div');
        transaction.classList.add('transaction_item');

        var dateObj = new Date(item.createdAt);
        var month = dateObj.getMonth() + 1; var day = dateObj.getDate(); var year = dateObj.getFullYear();
        const newdate = day + "/" + month + "/" + year;

        transaction.innerHTML = `
            <div class="top">
                <div class="date">${newdate}</div>
                <div class="code">${item.code}</div>
            </div>
            <div class="bottom">
                ${item.address ? '<div class="method">' + item.address + '</div>' : ""}
                <div class="amount">${item.amount}</div>
                <div class="type">${item.type}</div>
            </div>
        `;

        if(item.done){
            transaction.style.borderBottom = "2px solid #27c965";
        }

        document.querySelector('.transactions').append(transaction);
    })
}

const laodData = async () => {
    if(localStorage.role === "admin"){
        try {
            document.querySelector('.details').innerHTML = "";
            document.querySelector('.details').style.padding = "16px";
            document.querySelector('.wrapper .right .title').innerText = "Админ панель";
            document.querySelector('.wrapper .left').remove();
        } catch (err) {
            console.log("Reloaded")
        }

        const transactions = document.createElement('div');
        transactions.classList.add('transactions');
        document.querySelector('.details').append(transactions);

        const response = await sendRequest('GET', '/api/getAllTransactions');
        const data = await response.json();

        data.forEach(item => {
            const transaction = document.createElement('div');
            transaction.classList.add('transaction_item');

            var dateObj = new Date(item.createdAt);
            var month = dateObj.getMonth() + 1; var day = dateObj.getDate(); var year = dateObj.getFullYear();
            const newdate = day + "/" + month + "/" + year;

            transaction.innerHTML = `
                <div class="top">
                    <div class="date">${newdate}</div>
                    <div class="code">${item.code}</div>
                </div>
                <div class="bottom">
                    ${item.address ? '<div class="method">' + item.address + '</div>' : ""}
                    <div class="amount">${item.amount}</div>
                    <div class="type">${item.type}</div>
                </div>
                <div class="bottom2">
                    <div class="user">id юзера: ${item.user}</div>
                    <div id="confirm">Подтвердить</div>
                </div>
            `;

            transaction.querySelector('#confirm').onclick = async () => {
                const response = await sendRequest("POST", '/api/confirmTransaction', {
                    code: item.code
                })

                if(response.status === 200){
                    laodData();
                }
            }

            if(item.done){
                transaction.querySelector('#confirm').remove();

                transaction.style.borderBottom = "2px solid #27c965";
            }

            document.querySelector('.transactions').append(transaction);
        })

    } else {
        loadTransactions();
    }
}

laodData();





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
