const {v4: createUserId} = require("uuid");
const bcrypt = require('bcryptjs')
const databaseConnection = require('./connection')
const catchAsyncError = require('../middleware/catchAsyncError');
const client = require("./connection");

module.exports.insertUser = async (req) => {
    const {password: plainTextPassword, firstName, lastName, phoneNumber, mailID, gender} = req.body
    const userID = createUserId()
    const password = await bcrypt.hash(plainTextPassword, 10)
    const insertQuery = `INSERT INTO public."User"( "userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender)  VALUES ('${userID}', ${phoneNumber},'${mailID}', '${firstName}', '${lastName}', '${password}', '${gender}')`
    try {
        await databaseConnection.query(insertQuery)
    } catch (error) {
        console.log(error)
        return false
    } finally{
        client.end
    }
    req.userID = userID
    return true
}

module.exports.findUser = async (req) => {
    let mailID = req.body.mailID
    const getQuery = `SELECT  "userID", "mailID", password
	FROM public."User" WHERE "mailID"='${mailID}'`;
    let result
    try{
        const {rows} = await databaseConnection.query(getQuery)
        result = rows

    } catch(error){
        result = error
    }
    client.end
    return result
}

module.exports.getUserByID = async(userID) => {
    const getQuery = `SELECT  "userID", "mailID", password
	FROM public."User" WHERE "userID"='${userID}'`;
    let result
    try{
        const {rows} = await databaseConnection.query(getQuery)
        result = rows
    } catch(error){
        result = error
    }
    client.end
    return result
}



