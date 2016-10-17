var fs   = require('fs');

/**
 * Check if files are present in the given path
 */
function checkForFile(file, callback) {
    'use strict';

    fs.access(file, fs.F_OK, function(err) {
        if (!err) {
            callback(true);
        } else {
            callback(false, err);
        }
    });
}

module.exports = checkForFile;