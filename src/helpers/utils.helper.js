require("dotenv").config();

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} not set.`);
  }

  return value;
};

const isset = (accessor) => {
  try {
    return typeof accessor() !== "undefined";
  } catch (e) {
    return false;
  }
};

const empty = (accessor) => {
  if (typeof data == "number" || typeof data == "boolean") {
    return false;
  }

  if (typeof data == "undefined" || data === null) {
    return true;
  }

  if (typeof data.length != "undefined") {
    return data.length == 0;
  }

  let count = 0;

  for (let i in data) {
    if (data.hasOwnProperty(i)) {
      count++;
    }
  }

  return count == 0;
};

module.exports = {
  env,
  isset,
  empty,
};
