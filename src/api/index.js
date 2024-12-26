export const request = async (api, data) => {
    const response = await fetch(`http://127.0.0.1:8000/${api}`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}