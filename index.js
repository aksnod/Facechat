const express=require('express');
const port=8000;

const app=express();

app.listen(port,function(err){
    if(err)
    {
        console.log('error at runinng server', err);
        return;
    }
    console.log('Server Start Successfully: ${port}');
});