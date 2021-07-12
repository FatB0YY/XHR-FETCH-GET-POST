import json from './assets/db.json'
console.log('JSON', json)

// XHR POST
window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form')

    function req(event) {
        event.preventDefault()
        let formData = new FormData(form)
        formData.append('id', Math.random())
        let obj = Object.fromEntries(formData.entries())
        let json = JSON.stringify(obj)

        const request = new XMLHttpRequest()
        request.open('POST', 'http://localhost:3000/people')
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
        request.send(json)

        const overlay = document.querySelector('.overlay')
        request.addEventListener('readystatechange', () => {
            // request.addEventListener('load', () => {
            if (request.readyState === 4 && request.status === 200) {
                //     if (request.status === 200) {
                overlay.style.display = 'none'
                let data = JSON.parse(request.response)
                console.log(data)
            } else {
                overlay.style.display = 'flex'
            }
        })
        overlay.remove()
    }

    form.addEventListener('submit', (event) => req(event), { once: true })
})

// readystatechange - срабатывает каждый раз, когда меняется стадия запроса readyState
// load - только тогда, когда readyState === 4