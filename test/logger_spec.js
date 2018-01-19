"use strict";

const logger = require('../src/logger');
const colors = require('colors');
const chai  = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);


// sinon.assertCalledWith(mySpy, "foo");
describe('logger', () => {

    before(() => {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
    });

    afterEach(() => {
        console.log.restore();
        console.error.restore();
    });

    describe('.error()', () => {
        it('should log if the LOG_LEVEL is error or higher', () => {
            const logCallCount = console.log.callCount
            const errorCallCount = console.error.callCount
            
            process.env.LOG_LEVEL = 'nothing';
            logger.error('one');
            expect(console.error.callCount).to.equal(errorCallCount);

            process.env.LOG_LEVEL = 'error';
            logger.error('two');
            expect(console.error.callCount).to.equal(errorCallCount + 1);
            expect(console.error.args[0][0]).to.equal(colors.red('two'));

            process.env.LOG_LEVEL = 'warn';
            logger.error('three');
            expect(console.error.callCount).to.equal(errorCallCount + 2);
            expect(console.error.args[1][0]).to.equal(colors.red('three'));

            process.env.LOG_LEVEL = 'info';
            logger.error('four');
            expect(console.error.callCount).to.equal(errorCallCount + 3);
            expect(console.error.args[2][0]).to.equal(colors.red('four'));

            process.env.LOG_LEVEL = 'trace';
            logger.error('five');
            expect(console.error.callCount).to.equal(errorCallCount + 4);
            expect(console.error.args[3][0]).to.equal(colors.red('five'));

            expect(console.log.callCount).to.equal(logCallCount); // never uses console.log
        });
    });

    describe('.warn()', () => {
        it('should log if the LOG_LEVEL is warn or higher', () => {
            const logCallCount = console.log.callCount
            const errorCallCount = console.error.callCount

            process.env.LOG_LEVEL = 'nothing';
            logger.warn('one');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'error';
            logger.warn('two');
            expect(console.log.callCount).to.equal(logCallCount + 1);
            expect(console.log.args[0][0]).to.equal(colors.yellow('two'));

            process.env.LOG_LEVEL = 'warn';
            logger.warn('three');
            expect(console.log.callCount).to.equal(logCallCount + 2);
            expect(console.log.args[1][0]).to.equal(colors.yellow('three'));

            process.env.LOG_LEVEL = 'info';
            logger.warn('four');
            expect(console.log.callCount).to.equal(logCallCount + 3);
            expect(console.log.args[2][0]).to.equal(colors.yellow('four'));

            process.env.LOG_LEVEL = 'trace';
            logger.warn('five');
            expect(console.log.callCount).to.equal(logCallCount + 4);
            expect(console.log.args[3][0]).to.equal(colors.yellow('five'));

            expect(errorCallCount).to.equal(0); // never uses console.error





            // process.env.LOG_LEVEL = 'nothing';
            // logger.warn('one');
            // expect(consoleSpy).not.toHaveBeenCalled();

            // process.env.LOG_LEVEL = 'error';
            // logger.warn('two');
            // expect(consoleSpy).not.toHaveBeenCalled();

            // process.env.LOG_LEVEL = 'warn';
            // logger.warn('three');
            // expect(consoleSpy).toHaveBeenCalledWith(colors.yellow('three'));

            // process.env.LOG_LEVEL = 'info';
            // logger.warn('four');
            // expect(consoleSpy).toHaveBeenCalledWith(colors.yellow('four'));

            // process.env.LOG_LEVEL = 'trace';
            // logger.warn('five');
            // expect(consoleSpy).toHaveBeenCalledWith(colors.yellow('five'));
        });
    });

    describe('.info()', () => {
        it('should log if the LOG_LEVEL is warn or higher', () => {
            process.env.LOG_LEVEL = 'nothing';
            logger.info('one');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'error';
            logger.info('two');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'warn';
            logger.info('three');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'info';
            logger.info('four');
            expect(consoleSpy).toHaveBeenCalledWith(colors.blue('four'));

            process.env.LOG_LEVEL = 'trace';
            logger.info('five');
            expect(consoleSpy).toHaveBeenCalledWith(colors.blue('five'));
        });
    });

    describe('.trace()', () => {
        it('should log if the LOG_LEVEL is warn or higher', () => {
            process.env.LOG_LEVEL = 'nothing';
            logger.trace('one');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'error';
            logger.trace('two');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'warn';
            logger.trace('three');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'info';
            logger.trace('four');
            expect(consoleSpy).not.toHaveBeenCalled();

            process.env.LOG_LEVEL = 'trace';
            logger.trace('five');
            expect(consoleSpy).toHaveBeenCalledWith(colors.grey('five'));
        });
    });

});
