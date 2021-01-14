const express=require('express');
const port=8000;
const app=express();
const expressLayout=require('express-ejs-layouts');

const db=require('./config/mongoose');

//include static file
app.use(express.static('./assets'));


app.use(expressLayout);

//extract style and script from subpages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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