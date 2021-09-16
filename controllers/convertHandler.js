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

    result = parseFloat(result.toFixed(5));
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

    if (result === 'l') {
      result = 'L';
    }

    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const UnitsDict = {
      'gal': 'L',
      'L': 'gal',
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
      'L': 'liters',
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
      'L': 0.264172,
      'mi': 1.60934,
      'km': 0.62137274,
      'lbs': 0.453592,
      'kg': 2.20462442
    };
    
    let result = parseFloat((initNum * CovnertRatios[initUnit]).toFixed(5));

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
