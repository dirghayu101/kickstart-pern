const { v4: createReservationID } = require("uuid");
const bcrypt = require("bcryptjs");
const databaseConnection = require("./connection");

const spaceAndSeatID = {
    'Conference-Room': 10000,
    'Cubicle': 20000,
    'Hot-Seat': 30000,
    'Private-Office': 40000
}

const checkTable = async () => {}

module.exports.populateTable = async (spaceName, numberOfSeats) => {
    let startID = spaceAndSeatID[spaceName]
    let endID = startID + numberOfSeats
    while(startID <= endID){
        let script = `INSERT INTO public."${spaceName}"("seatID", "isBookedBoolean") VALUES (${startID}, false);`
        try{
            await databaseConnection.query(script)
        } catch(error){
            console.log(error)
        }
        startID += 1
    }
}

