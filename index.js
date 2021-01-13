const express=require('express');
const port=8000;

const app=express();

// routing the Express
app.use('/', require('./routes'));


















app.listen(port,function(err){
    if(err)
    {
        console.log('error at runinng server', err);
        return;
    }
    console.log('Server Start Successfully: ${port}');
});