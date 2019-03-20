const express = require ('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require ('path');

//inicializar
const app   = express();

//configuracion servidor de express
app.set('port', process.env.PORT || 4000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine','.hbs');
//middlewares funciones q se ejecutan por cda peticion al servidor
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//variables globales
app.use((req,res,next)=>{
    next();
});

//rutas url servidor
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));

//archivos publicos
app.use(express.static(path.join(__dirname,'public')));

//inciar  servidor
app.listen(app.get('port') ,()=>{
    console.log('server on port',app.get('port'))
});