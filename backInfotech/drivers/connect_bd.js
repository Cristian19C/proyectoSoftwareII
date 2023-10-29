const mongoose = require('mongoose')

const URLMONGO = process.env.URLMONGO

const options={
    useNewUrlParser : true,
    useUnifiedTopology: true
}

mongoose.connect(URLMONGO, options).then(()=>{
    console.log('Successfully connected to the database');
}).catch((error)=>{
    console.log('Error connected to the database', error);
})