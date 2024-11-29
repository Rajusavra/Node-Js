const express=require('express')

const port=8000

const app=express()

app.set('view engine' ,'ejs')

app.use(express.urlencoded());

app.use('/',require('./routes/indexroutes'))

const db=require('./config/db')

const path=require('path')


app.use('/uploads',express.static(path.join(__dirname,'uploads')))


app.listen(port,(err)=>{
    if (err) {
        console.log(err);
    }

    console.log('server is runing at ${port}');
    
})