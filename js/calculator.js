let calculator = document.querySelector('.calculator');

let btn = document.querySelector('.btn')

let numbeCostr = calculator.querySelector('.number__cost');
let rangeCost = calculator.querySelector('.range__cost');

let numberFirst = calculator.querySelector('.number__first');
let rangeFirst = calculator.querySelector('.range__first');

let numberTerm = calculator.querySelector('.number__term');
let rangeTerm = calculator.querySelector('.range__term');

let inTotal = calculator.querySelector('.inTotal');
let monthly = calculator.querySelector('.monthly');

let elemPercent = calculator.querySelector('.percent')

let initial = 3500000       //Стоимость автомобиля
let percent = 35            //Первоначальный взнос в %
let percentRubles = 1225000 //Первоначальный взнос в рублях
let term = 30               //Срок лизинга(мес.)
//Процентная ставка фиксированная = 3.5%

let monthPay = 123695;
let inTotalOne = 4935843;

calculator.addEventListener('input', function (event) {
    let target = event.target
    if (target.classList.contains('number__cost')) {
        if (target.value < 1000000 || target.value > 6000000) return
        rangeCost.value = target.value
        initial = target.value;
        percentRubles = initial / 100 * percent
        numberFirst.value = Math.round(initial / 100 * percent)
    } else if (target.classList.contains('range__cost')) {
        numbeCostr.value = target.value
        initial = target.value;
        percentRubles = initial / 100 * percent
        numberFirst.value = Math.round(initial / 100 * percent)
    };
    if (target.classList.contains('number__first')) {
        let check = target.value * 100 / initial
        if (check < 30 || check > 60) return
        percentRubles = target.value
        percent = check
        rangeFirst.value = check
    } else if (target.classList.contains('range__first')) {
        percent = target.value
        percentRubles = Math.round(initial / 100 * target.value)
        numberFirst.value = percentRubles
    };
    if (target.classList.contains('number__term')) {
        if (target.value < 1 || target.value > 60) return
        term = target.value
        rangeTerm.value = term
    } else if (target.classList.contains('range__term')) {
        term = target.value
        numberTerm.value = term
    }
    //(Стоимость автомобиля - Первоначальный взнос) * ((Процентная ставка * (1 +
    // Процентная ставка)^Срок кредита в месяцах) / ((1 + Процентная ставка)^Срок
    // кредита в месяцах - 1)) 
    monthPay = (initial - percentRubles) * ((0.035 * Math.pow((1 + 0.035), term)) / (Math.pow((1 + 0.035), term) - 1));
    monthly.innerHTML = Math.round(monthPay) + " ₽"

    // Первоначальный взнос + Срок кредита в месяцах * Ежемесячный платеж
    inTotalOne = percentRubles + term * monthPay
    inTotal.innerHTML = Math.round(inTotalOne) + " ₽"

    elemPercent.innerHTML = percent + "%"
})

btn.onclick =(()=>{
    alert(`Ваша заявка принята к расмотрению. Сумма договора лизинга ${Math.round(inTotalOne)} ₽, ежемесячный платеж ${Math.round(monthPay)} ₽`);
    })
    