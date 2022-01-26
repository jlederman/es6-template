export const createLi = (x) => {
    return Object.assign(document.createElement('li'), { innerText: x })
};

export const createUl = (id, classList) => {
    return Object.assign(document.createElement('ul'), { id: id, classList: classList })
}

export const createButton = (id, classList, text) => {
    return Object.assign(document.createElement('button'), {id: id, classList: classList, innerText: text})
}