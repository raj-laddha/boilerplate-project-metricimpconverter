const { expect } = require('chai');
const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    
    test('read a whole number input', () => {
        let input = '23kg';
        assert.equal(convertHandler.getNum(input), 23, 'expected to be 23');
    });

    test('read a decimal number input', () => {
        let input = '0.23mi';
        assert.equal(convertHandler.getNum(input), 0.23, 'expected to be 0.23');
    });

    test('read a fractional input', () => {
        let input = '1/2l';
        assert.equal(convertHandler.getNum(input), 1/2, 'expected to be equal to 1/2');
    });

    test('read a fractional input with decimal', () => {
        let input = '1.23/0.2lbs';
        assert.equal(convertHandler.getNum(input), 1.23/0.2, 'expected to be equal to 1.23/0.2');
    });

    test('return an error on double fraction', () => {
        let input = '3/2/3kg';
        assert.equal(convertHandler.getNum(input), 'invalid number', 'expected to be invalid number');
    });

    test('default to 1 with no numeric value', () => {
        let input = 'mi';
        assert.equal(convertHandler.getNum(input), 1, 'expected to be 1');
    });

    suite('Read valid input unit', () => {
        let input;

        test('read mi', () => {
            input = '23mi';
            assert.equal(convertHandler.getUnit(input), 'mi', 'expected ' + convertHandler.getUnit(input) + ' to be mi');
        });

        test('read km', () => {
            input = 'km';
            assert.equal(convertHandler.getUnit(input), 'km', 'expected ' + convertHandler.getUnit(input) + ' to be km');
        });

        test('read gal', () => {
            input = '23.23gal';
            assert.equal(convertHandler.getUnit(input), 'gal', 'expected ' + convertHandler.getUnit(input) + ' to be gal');
        });

        test('read l', () => {
            input = '1/23l';
            assert.equal(convertHandler.getUnit(input), 'l', 'expected ' + convertHandler.getUnit(input) + ' to be l');
        });

        test('read lbs', () => {
            input = '2.2/3.4lbs';
            assert.equal(convertHandler.getUnit(input), 'lbs', 'expected ' + convertHandler.getUnit(input) + ' to be lbs');
        });

        test('read kg', () => {
            input = '2.kg';
            assert.equal(convertHandler.getUnit(input), 'kg', 'expected ' + convertHandler.getUnit(input) + ' to be kg');
        });
    });

    suite('Return invalid unit', () => {
        let input;

        test('read invalid unit', () => {
            input = '23df';
            assert.equal(convertHandler.getUnit(input), 'invalid unit', 'expected ' + convertHandler.getUnit(input) + ' to be invalid unit');
        });

        test('no unit', () => {
            input = '23';
            assert.equal(convertHandler.getUnit(input), 'invalid unit', 'expected ' + convertHandler.getUnit(input) + ' to be invalid unit');
        });
    });

    suite('Return unit for valid input unit', () => {
        let input;

        test('read mi', () => {
            input = 'mi';
            assert.equal(convertHandler.getReturnUnit(input), 'km', 'expected ' + convertHandler.getReturnUnit(input) + ' to be km');
        });

        test('read km', () => {
            input = 'km';
            assert.equal(convertHandler.getReturnUnit(input), 'mi', 'expected ' + convertHandler.getReturnUnit(input) + ' to be mi');
        });

        test('read gal', () => {
            input = 'gal';
            assert.equal(convertHandler.getReturnUnit(input), 'L', 'expected ' + convertHandler.getReturnUnit(input) + ' to be L');
        });

        test('read l', () => {
            input = 'l';
            assert.equal(convertHandler.getReturnUnit(input), 'gal', 'expected ' + convertHandler.getReturnUnit(input) + ' to be gal');
        });

        test('read lbs', () => {
            input = 'lbs';
            assert.equal(convertHandler.getReturnUnit(input), 'kg', 'expected ' + convertHandler.getReturnUnit(input) + ' to be kg');
        });

        test('read kg', () => {
            input = 'kg';
            assert.equal(convertHandler.getReturnUnit(input), 'lbs', 'expected ' + convertHandler.getReturnUnit(input) + ' to be lbs');
        });
    });

    suite('Return spell out unit', () => {
        let input;

        test('read mi', () => {
            input = 'mi';
            assert.equal(convertHandler.spellOutUnit(input), 'miles', 'expected ' + convertHandler.spellOutUnit(input) + ' to be miles');
        });

        test('read km', () => {
            input = 'km';
            assert.equal(convertHandler.spellOutUnit(input), 'kilometers', 'expected ' + convertHandler.spellOutUnit(input) + ' to be kilometers');
        });

        test('read gal', () => {
            input = 'gal';
            assert.equal(convertHandler.spellOutUnit(input), 'gallons', 'expected ' + convertHandler.spellOutUnit(input) + ' to be gallons');
        });

        test('read l', () => {
            input = 'l';
            assert.equal(convertHandler.spellOutUnit(input), 'liters', 'expected ' + convertHandler.spellOutUnit(input) + ' to be liters');
        });

        test('read lbs', () => {
            input = 'lbs';
            assert.equal(convertHandler.spellOutUnit(input), 'pounds', 'expected ' + convertHandler.spellOutUnit(input) + ' to be pounds');
        });

        test('read kg', () => {
            input = 'kg';
            assert.equal(convertHandler.spellOutUnit(input), 'kilograms', 'expected ' + convertHandler.spellOutUnit(input) + ' to be kilograms');
        });
    });

    suite('Convertions', () => {
        test('convert mi', () => {
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934, 'expected ' + convertHandler.convert(1, 'mi') + ' to be 1.60934');
        });

        test('convert km', () => {
            assert.equal(convertHandler.convert(1, 'km'), 0.62137, 'expected ' + convertHandler.convert(1, 'km') + ' to be 0.621371');
        });

        test('convert gal', () => {
            assert.equal(convertHandler.convert(1, 'gal'), 3.78541, 'expected ' + convertHandler.convert(1, 'gal') + ' to be 3.78541');
        });

        test('convert l', () => {
            assert.equal(convertHandler.convert(1, 'l'), 0.26417, 'expected ' + convertHandler.convert(1, 'l') + ' to be 0.264172');
        });

        test('convert lbs', () => {
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, 'expected ' + convertHandler.convert(1, 'lbs') + ' to be 0.453592');
        });

        test('convert kg', () => {
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462, 'expected ' + convertHandler.convert(1, 'kg') + ' to be 2.20462');
        });
    });

});