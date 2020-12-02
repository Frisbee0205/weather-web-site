//const { response } = require("express")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
//                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location

                messageTwo.textContent = ( 'Weather : ' + data.forecast.description + ' Temp : ' + data.forecast.temperature )
//                console.log(data.location)
                messageThree.textContent = ( 'latitude : ' + data.forecast.latitude + '; longitude : ' + data.forecast.longitude)
                console.log(data.forecast)
//                console.log(data.address)
            }
         })   
    })
})