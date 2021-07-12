import json from './assets/db.json'
console.log('JSON', json)

// FETCH POST
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')

    function req(event) {
        event.preventDefault()

        let formData = new FormData(form)
        formData.append('id', Math.random())
        let obj = Object.fromEntries(formData.entries())

        getResource('http://localhost:3000/people', obj)
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
    }

    async function getResource(url, data) {
        const res = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            throw new Error(`Could not fetch: ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    form.addEventListener('submit', (event) => req(event), { once: true })
})