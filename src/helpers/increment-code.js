const times = require("lodash/times");

const Template = {
  Shops: `SH-000`,
};

function IncrementCode(code) {
  let __code = times(code.length, (i) => code.toUpperCase().charCodeAt(i));
  for (let i = __code.length - 1; i >= 0; i--) {
    if (__code[i] + 1 == 58) {
      __code[i] = 48;
    } else if (__code[i] + 1 == 91) {
      __code[i] = 65;
    } else {
      __code[i] += 1;
      break;
    }
  }
  return String.fromCharCode(...__code);
}

async function GenerateCode(model, filter = {}) {
  return new Promise(async function (resolve, reject) {
    await model
      .findOne({ ...filter })
      .sort({ code: -1 })
      .then(function (doc) {
        let code = doc ? IncrementCode(doc.code) : Template[model.modelName];
        resolve(code);
      })
      .catch(reject);
  });
}

module.exports = {
  IncrementCode,
  GenerateCode,
};
