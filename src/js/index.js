import { apiFetch, apiPost } from './modules/fetch.js';
import { log } from './modules/log';
import { paintIt } from './modules/colors.js';
import { createLi, createUl, createButton } from './modules/elementCreators.js';
import { set, setDefault } from './modules/localstorage';
import '../css/main.less';

const loadIt = async () => {
    if (localStorage.length === 0) {
        setDefault();
    } else {
        let ls = JSON.parse(localStorage.data)
        for (let i of ls) {
            lsItem.append(
                createLi(`localstorage key:  ${i.k}`),
                createLi(`localstorage value:  ${i.v}`),
                createLi(`localstorage hash:  ${i.h}`),
            )
        }
    }
}
export const fetchIt = async (i) => {
    await apiFetch().then((res) => {
        let hash = res.results.hash;
        let value = res.results.value;
        let key = res.results.key;
        let fetchId = i;
        set(fetchId, key, value, hash);
        let apiResult = res;
        return apiResult;
    }).then((apiResult) => {
        log({ api: apiResult.results, sql: apiResult.sqlResult })
        lsItem.append(createLi(`api key: ${apiResult.results.key}`));
        lsItem.append(createLi(`api value: ${apiResult.results.value}`));
        lsItem.append(createLi(`api hash: ${apiResult.results.hash}`));
        lsElement.replaceChildren(lsItem);
    }).then(() => {
        loadIt();
    }).then(() => {
        paintIt()
    })
}
fetchIt()
export const postIt = async(ls) => {
    try {
        let json;
        await apiPost(ls.data).then((response) => {
            json = response.json();
            return json;
        }).then((json) => {
            console.log(json);
        })

    } catch (error) {
        return log([error, ls.data[0].k, ls.data[0].v, ls.data[0].h])
    }
}

let lsElement = createUl(`list`, `test`);
let lsItem = createLi(``);
let postButton = createButton('post', 'button', 'Write It');
postButton.addEventListener('click', () => {
    postIt({ data: JSON.parse(localStorage.data) });
});
data.insertAdjacentElement("afterBegin", lsElement)
data.insertAdjacentElement("beforeEnd", postButton)