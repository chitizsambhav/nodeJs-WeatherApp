const formElement = document.querySelector('form')

const inputElement = document.querySelector('input')



formElement.addEventListener('submit', (e)=>{
    e.preventDefault()
    const address = inputElement.value
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(address)
    const messageOne = document.querySelector('#message-1')
    messageOne.textContent = 'Loading.....'
    const messageTwo = document.querySelector('#message-2')
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = 'The weather forecast for today at ' + data.location + ' is '+ data.forecast
            messageTwo.textContent = 'The current temperature is ' + data.curr_temp + ' degrees celsius and it feels like ' + data.feels_like + ' degress celsius.' 
        }
        
    })
})
})