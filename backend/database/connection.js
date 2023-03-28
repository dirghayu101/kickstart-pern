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

const conString = 'postgres://nzrcdxpb:hcxHjqx-eeoF7KMNWGpbAYp7WeT-dFKa@snuffleupagus.db.elephantsql.com/nzrcdxpb'

const client = new pg.Client(conString);

module.exports = client