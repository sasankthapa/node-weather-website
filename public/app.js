const weatherForm=document.querySelector('form')
const inputEle=document.querySelector('input')
const message1=document.querySelector('p#message1')
const message2=document.querySelector('p#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=inputEle.value
    message1.innerHTML='Loading...'
    message2.innerHTML=''
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then(data=>{
            if(data.error){
                message1.innerHTML=''
                message2.innerHTML=data.error
                return 
            }
            message1.innerHTML=data.location
            message2.innerHTML=data.forecastData
        })
    })

    console.log(location);
})
