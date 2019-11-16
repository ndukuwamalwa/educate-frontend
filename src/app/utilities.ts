import { PRINT } from './constants';

export function createQuery(options = {}): string {
    const keys = Object.keys(options);
    let query: string[] = [];
    for (let key of keys) {
        query.push(`${key}=${options[key]}`);
    }
    return query.join('&');
}

export function back() {
    window.history.back();
}

export function getDayOfTheWeek(dateString: string): string {
    const date = new Date(dateString);
    const day: number = date.getDay();
    switch (day) {
        case 0: return "Sunday"
        case 1: return "Monday"
        case 2: return "Tuesday"
        case 3: return "Wednesday"
        case 4: return "Thursday"
        case 5: return "Friday"
        case 6: return "Saturday"
    }
}

export function getDatesBetween(startDateString: string, endDateString: string): string[] {
    const start = new Date(startDateString);
    const end = new Date(endDateString);
    const dates: string[] = [];
    const isLeapYear = (year: number) => {  
        if ((year % 4) === 0) return true;
        return false;
    };
    const monthEndDay: { month: number, day: number }[] = [
        {
            month: 1,
            day: 31
        },
        {
            month: 2,
            day: 28
        },
        {
            month: 3,
            day: 31
        },
        {
            month: 4,
            day: 30
        },
        {
            month: 5,
            day: 31
        },
        {
            month: 6,
            day: 30
        },
        {
            month: 7,
            day: 31
        },
        {
            month: 8,
            day: 31
        },
        {
            month: 9,
            day: 30
        },
        {
            month: 10,
            day: 31
        },
        {
            month: 11,
            day: 30,
        },
        {
            month: 12,
            day: 31
        }
    ];
    if (start.valueOf() > end.valueOf()) {
        return [];
    }
    const numOfDays = Math.ceil((end.valueOf() - start.valueOf()) / 86400000);
    const partsStartDate = startDateString.split('-');
    const partsEndDate = endDateString.split('-');
    //Add the first date 
    dates.push(startDateString);
    let currentDate: string[] = partsStartDate;
    for (let i = 1; i <= numOfDays; i++) {
        let year = +currentDate[0];
        let month = +currentDate[1];
        let day = +currentDate[2];
        let endDay = monthEndDay.find(val => val.month === month).day;
        if (isLeapYear(year) && (month === 2)) {
            endDay = 29;
        }
        if ((day + 1) < endDay) {
            day += 1;
        } else if ((day + 1) === endDay) {
            day = endDay;
        } else {
            day = 1;
            if ((month + 1) > 12) {
                month = 1;
                year += 1;
            } else {
                month += 1;
            }
        }
        let newYear = `${year}`;
        let newMonth = `${month}`;
        let newDay = `${day}`;
        currentDate = [newYear, newMonth, newDay];
        //Make sure date formating is correct
        if (+newDay < 10) {
            newDay = `0${newDay}`
        }
        if (+newMonth < 10) {
            newMonth = `0${newMonth}`;
        }
        dates.push(`${newYear}-${newMonth}-${newDay}`);
    }

    return dates;
}

export function printUrlWithToken(urlPart: string): string {
    if (!urlPart.startsWith('/')) {
        urlPart = `/${urlPart}`;
    }
    const token = window.sessionStorage.getItem('token');
    let url: string = `${PRINT}${urlPart}`;
    if (url.includes('?')) {
        url = `${url}&token=${token}`;
    } else {
        url = `${url}?token=${token}`;
    }
    return url;
}