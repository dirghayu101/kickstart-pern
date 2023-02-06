const {Client} = require('pg')

const dbObject = {
    host: 'localhost',
    user:  'postgres',
    port: 5432,
    password: '618903',
    database: 'Kickstart-MERN-Database'
}

const client = new Client(dbObject)


module.exports = client