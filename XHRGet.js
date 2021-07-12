import json from './assets/db.json'
console.log('JSON', json)

// FETCH
window.addEventListener('DOMContentLoaded', () => {
    function req() {
        const request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:3000/people')
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send()

        const overlay = document.querySelector('.overlay')
        request.addEventListener('readystatechange', () => {
            // request.addEventListener('load', () => {
            if (request.readyState === 4 && request.status === 200) {
                //     if (request.status === 200) {
                overlay.style.display = 'none'
                let data = JSON.parse(request.response)
                createCards(data)
            } else {
                overlay.style.display = 'flex'
            }
        })
        this.remove()
        overlay.remove()
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

// readystatechange - срабатывает каждый раз, когда меняется стадия запроса readyState
// load - только тогда, когда readyState === 4