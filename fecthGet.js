import json from './assets/db.json'
console.log('JSON', json)

// FETCH
window.addEventListener('DOMContentLoaded', () => {
    function req() {
        getResource('http://localhost:3000/people')
            .then((data) => createCards(data))
            .catch((error) => console.error(error))

        this.remove()
        overlay.remove()
    }

    async function getResource(url) {
        const res = await fetch(`${url}`)
        if (!res.ok) {
            throw new Error(`Could not fetch: ${url}, status: ${res.status}`)
        }
        return await res.json()
    }

    function createCards(response) {
        response.forEach((item) => {
            let card = document.createElement('div')
            card.classList.add('card')
            let icon
            if (item.sex === 'male') {
                icon = 'assets/icons/mars.png'
            } else {
                icon = 'assets/icons/female.png'
            }
            card.innerHTML = `
                <img src="${item.photo}" alt="${item.surname}">
                <div class="name">${item.name} ${item.surname}</div>
                <div class="gender">
                    <img src="${icon}" alt="nale">
                </div>
                <div class="age">${item.age}</div>
            `
            document.querySelector('#app').appendChild(card)
        })
    }
    document.querySelector('#btn').addEventListener('click', req, { once: true })
})