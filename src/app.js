const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('../utils/geocode')
const forecast=require('../utils/forecast')

const app=express()
const port= process.env.PORT || 3000

//create paths for express configs
const expresspath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials/')

//setup static directory to serve
app.use(express.static(expresspath))

//setup handlebars engine and views extension
app.set('views',viewspath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:"Wather app",
        name:"asdfsa",
        age:20
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"about",
        message:"about this thing",
        name:"Sasank"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"help",
        message:"helping this thing",
        name:"Sasank"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Could not find address"
        })
    }

    geocode(req.query.address, (error,{center:[longitude,latitude]=[],location}={}) =>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            } 
            return res.send({
                location,
                forecastData
            })
        })
    })
})

//app.com
//app.com/about
//port 80 is for 

app.get('/help/*',(req,res)=>{
    res.render('404error',{
        errorMessage:"Help article not found.",
        name:"Sasank"
    })
})

app.get('*',(req,res)=>{
    res.render('404error',{
        errorMessage:"404 error. Page not found.",
        name:"Sasank"
    })
})

app.listen(port,()=> console.log(`server isa listening on ${port}`))