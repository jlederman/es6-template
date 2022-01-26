export const apiFetch = async () => {
    let url = `${API_URL}` + 'api'
    let response = await fetch(url);
    let json = await response.json();
    return json.data;
}

export const apiPost = async(data) => {
    let url = `${API_URL}` + 'post';

    let postResponse = await fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data
        })
    })
    return postResponse;

}