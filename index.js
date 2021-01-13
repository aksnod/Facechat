const express=require('express');
const port=8000;

const app=express();

// routing the Express
app.use('/', require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set('views','./views');







app.listen(port,function(err){
    if(err)
    {
        console.log('error at runinng server', err);
        return;
    }
    console.log('Server Start Successfully: ${port}');
});