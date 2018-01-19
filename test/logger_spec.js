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

    beforeEach(() => {
        sinon.spy(console, 'log');
        sinon.spy(console, 'error');
    });

    afterEach(() => {
        console.log.restore();
        console.error.restore();
    });

    describe('.error()', () => {
        it('should log if the LOG_LEVEL is error or higher', () => {
            const logCallCount = console.log.callCount || 0;
            const errorCallCount = console.error.callCount || 0;
            
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
            const logCallCount = console.log.callCount || 0;
            const errorCallCount = console.error.callCount || 0;

            process.env.LOG_LEVEL = 'nothing';
            logger.warn('one');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'error';
            logger.warn('two');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'warn';
            logger.warn('three');
            expect(console.log.callCount).to.equal(logCallCount + 1);
            expect(console.log.args[0][0]).to.equal(colors.yellow('three'));

            process.env.LOG_LEVEL = 'info';
            logger.warn('four');
            expect(console.log.callCount).to.equal(logCallCount + 2);
            expect(console.log.args[1][0]).to.equal(colors.yellow('four'));

            process.env.LOG_LEVEL = 'trace';
            logger.warn('five');
            expect(console.log.callCount).to.equal(logCallCount + 3);
            expect(console.log.args[2][0]).to.equal(colors.yellow('five'));

            expect(errorCallCount).to.equal(0); // never uses console.error
        });
    });

    describe('.info()', () => {
        it('should log if the LOG_LEVEL is info or higher', () => {
            const logCallCount = console.log.callCount || 0;
            const errorCallCount = console.error.callCount || 0;

            process.env.LOG_LEVEL = 'nothing';
            logger.info('one');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'error';
            logger.info('two');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'warn';
            logger.info('three');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'info';
            logger.info('four');
            expect(console.log.callCount).to.equal(logCallCount + 1);
            expect(console.log.args[0][0]).to.equal(colors.blue('four'));

            process.env.LOG_LEVEL = 'trace';
            logger.info('five');
            expect(console.log.callCount).to.equal(logCallCount + 2);
            expect(console.log.args[1][0]).to.equal(colors.blue('five'));

            expect(errorCallCount).to.equal(0); // never uses console.error
        });
    });

    describe('.trace()', () => {
        it('should log if the LOG_LEVEL is warn or higher', () => {
            const logCallCount = console.log.callCount || 0;
            const errorCallCount = console.error.callCount || 0;

            process.env.LOG_LEVEL = 'nothing';
            logger.trace('one');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'error';
            logger.trace('two');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'warn';
            logger.trace('three');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'info';
            logger.trace('four');
            expect(console.log.callCount).to.equal(logCallCount);

            process.env.LOG_LEVEL = 'trace';
            logger.trace('five');
            expect(console.log.callCount).to.equal(logCallCount + 1);
            expect(console.log.args[0][0]).to.equal(colors.grey('five'));

            expect(errorCallCount).to.equal(0); // never uses console.error
        });
    });

});
