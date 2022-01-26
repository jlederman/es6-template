import { fetchIt } from '../index'
let chunk = []
export const set = (id, k, v, h) => {
    let data = { id: id, k: k, v: v, h: h }
    JSON.stringify(data);
    chunk.push(data)
    localStorage.data = JSON.stringify(chunk);
}

export const setDefault = () => {
    fetchIt()
}