const express = require('express')
// const { auth,requiresAuth } = require('express-openid-connect');
const app = express()
const cors = require('cors')
// const { swaggerUi, specs } = require('./swagger')
require('dotenv').config()



app.set('PORT', process.env.PORT)
app.use(express.json())
app.use(cors())
// app.use(auth(config));

app.listen(app.get('PORT'), ()=>{
    console.log(`Server listen to port: ${app.get('PORT')}` );
})
require('./drivers/connect_bd')



app.use('/users',require('./routes/user'))