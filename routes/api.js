'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;

    if (!input) {
      return res.send('Could not find any input in the query');
    }

    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    }

    if (initNum === 'invalid number') {
      return res.send(initNum);
    }

    if (initUnit === 'invalid unit') {
      return res.send(initUnit);
    }

    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit, returnUnit,
      string: string
    });

  });

};
