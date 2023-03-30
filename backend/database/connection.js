// const {Client} = require('pg')

// const dbObject = {
//     host: 'localhost',
//     user:  'postgres',
//     port: 5432,
//     password: '618903',
//     database: 'Kickstart-MERN-Database'
// }

// const client = new Client(dbObject)


// module.exports = client

// NOTE: New one starts here.
const pg = require('pg')

const conString = 'postgres://vavxxosh:Qf-QS7FWwoQTplUPX0zJrzzaPfKUH6uV@tiny.db.elephantsql.com/vavxxosh'

const client = new pg.Client(conString);

module.exports = client