const makeDate = (date: Date | string) => {
    if (typeof date === 'string') date = new Date(date);
    return date;
};

export const sameDay = (date1: Date | string, date2: Date | string) => {
    date1 = makeDate(date1);
    date2 = makeDate(date2);
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth()
    );
};
