const { v4: createUserId } = require("uuid");
const bcrypt = require("bcryptjs");
const databaseConnection = require("./connection");

module.exports.insertUser = async (req) => {
  const {
    password: plainTextPassword,
    firstName,
    lastName,
    phoneNumber,
    mailID,
    gender,
  } = req.body;
  const userID = createUserId();
  const password = await bcrypt.hash(plainTextPassword, 10);
  const insertQuery = `INSERT INTO public."User"( "userID", "phoneNumber", "mailID", "firstName", "lastName", password, gender)  VALUES ('${userID}', ${phoneNumber},'${mailID}', '${firstName}', '${lastName}', '${password}', '${gender}')`;
  try {
    await databaseConnection.query(insertQuery);
  } catch (error) {
    console.log(error);
    return false;
  } finally {
    databaseConnection.end;
  }
  req.userID = userID;
  return true;
};

module.exports.findUser = async (req) => {
  let mailID = req.body.mailID;
  const getQuery = `SELECT  "userID", "mailID", password
	FROM public."User" WHERE "mailID"='${mailID}'`;
  let result;
  try {
    const { rows } = await databaseConnection.query(getQuery);
    result = rows;
  } catch (error) {
    result = error;
  }
  databaseConnection.end;
  return result;
};

module.exports.getUserByID = async (userID) => {
  const getQuery = `SELECT  "userID", "mailID", password
	FROM public."User" WHERE "userID"='${userID}'`;
  let result;
  try {
    const { rows } = await databaseConnection.query(getQuery);
    result = rows;
  } catch (error) {
    result = error;
  }
  databaseConnection.end;
  return result;
};

module.exports.updatePassword = async (userID, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const updatePasswordQuery = `UPDATE public."User" SET password='${hashedPassword}' WHERE "userID" = '${userID}'`;
  let result;
  try {
    result = await databaseConnection.query(updatePasswordQuery);
  } catch (error) {
    console.log(error);
  }
  databaseConnection.end;
  return result;
};

module.exports.updateUserInformationRequest = async (req) => {
  const { firstName, lastName, phoneNumber, gender } = req.body;
  const userID = req.query.id || req.user[0].userID 
  const updateScript = `UPDATE public."User"
	SET  "phoneNumber"='${phoneNumber}', "firstName"='${firstName}', "lastName"='${lastName}', gender='${gender}'
	WHERE "userID" = '${userID}'`;
  let result;
  try {
    result = await databaseConnection.query(updateScript);
  } catch (error) {
    console.log(error);
  }
  databaseConnection.end;
  return result;
};

// Reset password table insertion request
module.exports.insertResetPasswordToken = async (req) => {
  const userID = req.user[0].userID
  const {ResetPasswordToken, ResetPasswordExpire} = req.resetTokenInfo
  const insertScript = `INSERT INTO public."Reset-Password"(
    "userID", "resetPasswordToken", "resetPasswordExpire")
    VALUES ('${userID}', '${ResetPasswordToken}', '${ResetPasswordExpire}');`
    let result
  try {
    result = await databaseConnection.query(insertScript)
  } catch (error) {
    console.log(error)
  }
  databaseConnection.end
  return result
}

module.exports.RemoveTimedOutEntries = async () => {
  let currentTime = Date.now()
  const deleteScript = `DELETE FROM public."Reset-Password" WHERE "resetPasswordExpire" < '${currentTime}'`
  let result
  try {
    result = await databaseConnection.query(deleteScript)
  } catch (error) {
    console.log(error)
  }
  databaseConnection.end
  return result
}

// Reset password delete tuple request
module.exports.deleteResetToken = async (userID) => {
  const deleteScript = `DELETE FROM public."Reset-Password" WHERE "userID" = '${userID}';`
  let result
  try {
    result = await databaseConnection.query(deleteScript)
  } catch (error) {
    console.log(error)
  }
  databaseConnection.end
  return result
}

// Find user with ResetPasswordToken
module.exports.findUserWithResetPasswordToken = async (resetPasswordToken) => {
  const selectScript = `SELECT "userID", "resetPasswordToken","resetPasswordExpire" FROM public."Reset-Password" WHERE "resetPasswordToken"='${resetPasswordToken}';`
  let result
  try {
    const { rows } = await databaseConnection.query(selectScript);
    result = rows;
  } catch (error) {
    console.log(error)
  }
  databaseConnection.end
  return result
}

