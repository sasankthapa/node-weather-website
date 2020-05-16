const request=require('request')
const https=require('https')

const forecast = (longitude,lalitude,callback) =>{

    const URL=`http://api.weatherstack.com/current?access_key=6bcb6a6dc08e1f294d6d00dbf640a9af&query=${longitude},${lalitude}`

    request({ url:URL,json:true },(error,{body})=> {
        if(error){
            callback("Unable to contact request, check internet connection",undefined)
        }else if(body.error){
            callback("Unable to find location, retry",undefined);
        }else{
            callback(undefined,`It is currently ${body.current.temperature} degrees out with ${body.current.precip}% chance of humidity`);
        }
    })
}

module.exports=forecast