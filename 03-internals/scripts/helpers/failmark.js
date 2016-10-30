var chalk = require('chalk');

/**
 * Adds mark check symbol
 */
function addFailMark() {
    'use strict';

    process.stdout.write(chalk.red(' ✗'));
}

module.exports = addFailMark;