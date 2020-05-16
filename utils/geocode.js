const request=require('request')

const geocode = (address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FzYW5rZnJvbW5lcGFsIiwiYSI6ImNrYTV4dGptbTAxd2Eycmx5cTRqdXJxYTMifQ.loKEB-ecIyA6_2DJ1isepQ&limit=1`
    request({url:url,json:true},(error,{body} )=>{
        if(error){
            callback('unable to connect to weather service',undefined);
        }else if(body.features.length==0){
            callback('unable to locate this place.',undefined)
        }else{
            callback(undefined,{center:body.features[0].center,location:body.features[0].place_name});
        }
    });
}

module.exports=geocode;