require("dotenv").config();

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} not set.`);
  }

  return value;
}

const capitalize = (string) => {
  return string
    .replace(/(_|-)/g, " ")
    .trim()
    .replace(/\w\S*/g, function (str) {
      return str.charAt(0).toUpperCase() + str.substr(1);
    })
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
}

const sorted = (data, dir) => {
  return data.sort((a, b) => {
    const aStat = fs.statSync(`${dir}/${a}`);
    const bStat = fs.statSync(`${dir}/${b}`);

    return (new Date(bStat.birthtime).getTime() - new Date(aStat.birthtime).getTime());
  });
}

const range = (begin, end, interval = 1) => {
  for (let i = begin; i < end; i += interval) {
    return i;
  }
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
 
const isArray = (data) => {
  return Array.isArray(data)
}

const isObject = (data) => {
  return typeof data === "object" && !isArray(data)
}

const isBycryptedHash = (string) => {
  return /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9./]{53}$/.test(string)
}

module.exports = {
  env,
  capitalize,
  sorted,
  range,
  random,
  isArray,
  isObject,
  isBycryptedHash
};