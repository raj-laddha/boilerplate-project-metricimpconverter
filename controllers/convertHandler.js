function ConvertHandler() {

  this.getNum = function(input) {

    if ((/^\s+$/).test(input)) {
      return 'invalid number';
    }

    let result;
    const NumRegex = /^(([0-9]+\.?[0-9]*)|([0-9]*\.[0-9]+))(\/(([0-9]+\.?[0-9]*)|([0-9]*\.[0-9]+)))?$/;
    const NumUnitRegex = /^(([0-9]+\.?[0-9]*)|([0-9]*\.[0-9]+))(\/(([0-9]+\.?[0-9]*)|([0-9]*\.[0-9]+)))?[a-zA-Z]+/;
    const UnitRegex = /^[a-zA-Z]+$/;

    if (!input || UnitRegex.test(input)) {
      return 1;
    } else if (NumRegex.test(input) || NumUnitRegex.test(input)) {
      let charIndex = input.search(/[a-zA-Z]/);
      let number = charIndex === -1 ? input.slice() : input.slice(0, charIndex);
      result = eval(number);

      if (!result || result === Infinity) {
        return 'invalid number';
      }
    } else {
      return 'invalid number';
    }

    return result;
  };
  
  this.getUnit = function(input) {
    const ValidUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    let result;
    let modified = input.toLowerCase();
    let index = modified.search(/[a-z]+$/);
    
    if (index < 0) {
      return 'invalid unit';
    }

    let unit = modified.slice(index);
    
    if (ValidUnits.includes(unit)) {
      result = unit;
    } else {
      result = 'invalid unit';
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const UnitsDict = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };

    let result = UnitsDict[initUnit];
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    const NameDict = {
      'gal': 'gallons',
      'l': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };

    let result = NameDict[unit];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const CovnertRatios = {
      'gal': 3.78541,
      'l': 0.264172,
      'mi': 1.60934,
      'km': 0.621371,
      'lbs': 0.453592,
      'kg': 2.20462
    };
    
    let result = (initNum * CovnertRatios[initUnit]).toFixed(5);

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
