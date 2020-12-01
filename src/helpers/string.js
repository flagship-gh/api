const lodash = require("lodash");

function SetDescription(description) {
  return lodash
    .chain(description)
    .split(". ")
    .map(lodash.trim)
    .map(lodash.toLower)
    .map(lodash.capitalize)
    .join(". ")
    .value();
}

function SetName(name){
  return lodash
    .chain(name)
    .toLower()
    .startCase()
    .value()
}

function SetMail(email){
  return lodash
    .chain(email)
    .lowerCase()
    .startCase()
    .value()
}

function SetPermission(permission){
  return lodash
    .chain(permission)
    .lowerCase()
    .startCase()
    .value()
}

function SetPhone(phone){
   return lodash
     .chain(phone)
     .slice(-9)
     .join("")
     .padStart(12,"233")
     .value()
}

function GenerateCode(length = 6){
   return lodash
     .chain("9")
     .repeat(length)
     .parseInt()
     .random()
     .padStart(length,"0")
     .value()
}

module.exports = {
    SetDescription,
    SetPhone,
    SetMail,
    SetName,
    GenerateCode,
    SetPermission
}
