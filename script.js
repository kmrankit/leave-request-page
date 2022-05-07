//calender
const date = new Date();
let startDate;
let endDate;

const renderCalender = () => {

    date.setDate(1);

    const monthDays = document.querySelector('.days');

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 1).getDay();

    const nextDays = 7 - lastDayIndex;

    const firstDayIndex = date.getDay();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    document.querySelector(".current-date h1").innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;

    document.querySelector('.current-date p').innerHTML = new Date().toDateString();

    if (date.getMonth() != new Date().getMonth()) {
        document.querySelector('.current-date p').classList.add('today');
    } else {
        document.querySelector('.current-date p').classList.remove('today');
    }

    let days = "";

    for (let x = firstDayIndex; x > 0; --x) {
        days += `<div class = prev-date>${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && new Date().getFullYear() === date.getFullYear()) {
            days += `<div class = 'today active-date'>${i}</div>`;
        } else if ((i < new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) || (date.getMonth() < new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) || date.getFullYear() < new Date().getFullYear()) {
            days += `<div class = prev-date>${i}</div>`;
        } else if ((endDate != undefined && startDate != undefined && i >= startDate.getDate() && i <= endDate.getDate()) && date.getMonth() >= startDate.getMonth() && date.getFullYear() >= startDate.getFullYear() && date.getMonth() <= endDate.getMonth() && date.getFullYear() <= endDate.getFullYear()) {
            days += `<div class = 'active-date start-date'>${i}</div>`;
        } else if (startDate != undefined && i === startDate.getDate() && date.getMonth() === startDate.getMonth() && date.getFullYear() === startDate.getFullYear()) {
            days += `<div class = 'active-date start-date'>${i}</div>`;
        } else {
            days += `<div class = active-date>${i}</div>`;
        }
    }

    for (let j = 1; j <= nextDays; ++j) {
        days += `<div class = next-month-date>${j}</div>`;
    }

    monthDays.innerHTML = days;

    let activeDates = document.querySelectorAll('.active-date');

    for (let clickedIndex = 0; clickedIndex < activeDates.length; ++clickedIndex) {
        activeDates[clickedIndex].addEventListener('click', () => {
            let tempDate = new Date();
            tempDate.setDate(activeDates[clickedIndex].innerHTML);
            tempDate.setMonth(date.getMonth());
            tempDate.setFullYear(date.getFullYear());
            if (startDate === undefined || (startDate != undefined && endDate != undefined)) {
                startDate = tempDate;
                if (document.querySelector('.start-date') != null)
                    document.querySelector('.start-date').classList.remove('start-date');
                if (document.querySelector('.end-date') != null)
                    document.querySelector('.end-date').classList.remove('end-date');
                activeDates[clickedIndex].classList.add('start-date');
                document.getElementById('date-range').innerText = `${months[startDate.getMonth()]} ${startDate.getDate()}`;
                endDate = undefined;
                renderCalender();
            } else if ((tempDate.getDate() < startDate.getDate() && tempDate.getMonth() === startDate.getMonth() && tempDate.getFullYear() === startDate.getFullYear()) || (tempDate.getMonth() < startDate.getMonth() && tempDate.getFullYear() === startDate.getFullYear()) || tempDate.getFullYear() < startDate.getFullYear()) {
                alert("end date can't be less than start date");
            } else if (endDate === undefined) {
                endDate = tempDate;
                activeDates[clickedIndex].classList.add('end-date');
                document.getElementById('date-range').innerText = `${months[startDate.getMonth()]} ${startDate.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}`;
                renderCalender();
            }
            if (startDate !== undefined && endDate !== undefined) {
                document.getElementById('date-range').innerText = `${months[startDate.getMonth()]} ${startDate.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}`;
            } 
        });
    }

}

renderCalender();

document.querySelector('.next').addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalender();
});

document.querySelector('.prev').addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalender();
});

