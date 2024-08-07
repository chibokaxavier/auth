const bcrypt = require("bcrypt");
const hashData = async (data, saltRounds = 10) => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw error;
  }
};
const verifyHashedData = async (hashed, unhashed) => {
  try {
    const match = bcrypt.compare(hashed, unhashed);
    return match;
  } catch (error) {
    throw error;
  }
};
module.exports = { hashData, verifyHashedData };
