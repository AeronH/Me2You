export function formatDate(date: string) {
    const newDate = new Date(date);
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();
    const year = newDate.getUTCFullYear();
    return `${month}/${day}/${year}`;
}
