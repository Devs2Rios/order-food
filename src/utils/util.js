export const toCamelCase = str => {
    return str
        .toLowerCase()
        .split(' ')
        .map((el, i) => (i > 0 ? `${el[0].toUpperCase()}${el.slice(1)}` : el))
        .join('');
};
