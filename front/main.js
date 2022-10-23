const borderTexts = ["Быстрое пополнение и вывод средств", "Комисия 0% для граждан РФ", "Помощь аналитика"];

window.onload = () => {
    const cont = document.querySelector('#border');
    let iteration = 0;
    setInterval(() => {
        cont.classList.add('left');

        setTimeout(() => {
            document.querySelector('.variable .text').innerText = borderTexts[iteration % borderTexts.length];
            iteration++;
            cont.classList.remove('left');
        }, 1000);
    }, 6000);
}

document.querySelectorAll('.nav p').forEach(btn => {
    btn.onclick = () => {
        window.scrollTo({
            top: document.querySelector(`.${btn.id}`).getBoundingClientRect().top,
            behavior: 'smooth'
          });
    }
})

document.querySelectorAll('.prices__container .navigation .nav').forEach(btn => {
    btn.onclick = () => {
        document.querySelector(`.prices__container .selected`).classList.remove('selected');
        btn.classList.add('selected');

        document.querySelector(`.prices__container .picked`).classList.remove('picked');
        document.querySelector(`.prices__container .${btn.id}`).classList.add('picked');
    }
})