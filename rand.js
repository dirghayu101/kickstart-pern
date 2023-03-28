const bcrypt = require("bcryptjs");

async function getEncryptedPassword() {
  let encryptedPassword = await bcrypt.hash("adminPASSWORD", 10);
  console.log(encryptedPassword);
}

getEncryptedPassword()// username for now is kickstart-admin

;
