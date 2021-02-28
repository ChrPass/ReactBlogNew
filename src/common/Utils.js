export const toShortDate = (date) => {
    if (date) {
        let theDate = new Date(date);
        return [theDate.getDate(),  theDate.getMonth() + 1, theDate.getFullYear()].join("/");
    }
    return "";
}