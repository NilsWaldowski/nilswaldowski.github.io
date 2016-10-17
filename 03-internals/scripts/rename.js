#!/usr/bin/env node

var chalk = require('chalk'),
    prompt = require('prompt'),
    replace = require('replace-in-file'),
    interval,
    oldProjectName,
    newProjectName,
    async = require('async'),
    step = 1;

/**
 * Async Install Process Steps
 */
(function() {
    'use strict';

    async.series([

        // STEP 1
        function(callback) {

            getUserReady(function() {
                clearInterval(interval);
                callback(null);
                step++;
            });
        },

        // STEP 3
        function(callback) {

            getOldProjectName(function() {
                setTimeout(function() {
                    clearInterval(interval);
                    callback(null);
                    step++;
                }, 1000);
            });
        },

        // STEP 3
        function(callback) {

            getNewProjectName(function() {
                setTimeout(function() {
                    clearInterval(interval);
                    callback(null);
                    step++;
                }, 1000);
            });
        }
    ],
    // optional callback
    function(err, results) {
        // results is now equal to ['one', 'two']
    });

}());

/**
 * STEP 1
 * @param callback
 */
function getUserReady(callback) {
    'use strict';

    var message = 'This script will help you to rename the project (e.g. gm7_sitepackage to myproject_sitepackage). ' +
        '\nIts renaming the TYPO3 "xXx_sitepackage" extension path and has impact on paths \nwithin your ' +
        'Patternlab Setup, JS and SCSS Files!';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdout.write('\n');
    process.stdout.write(chalk.blue.bold(message));

    callback();
}


/**
 * Step 2 - get project shortcut and replace in gm7_sitepackage paths
 * @param callback
 */
function getOldProjectName(callback) {
    'use strict';

    var message = 'Step ' + step + ': What is the shortcut for your project right now ' +
        '(what is your sitepackage named)?\n',
        promptOptions;

    process.stdout.write('\n\n');
    process.stdout.write(chalk.blue.bold(message));

    // change prompt defaults
    prompt.message = '';
    prompt.delimiter = '';

    // options for user prompt
    promptOptions = {
        properties: {
            name: {
                pattern: /\b\w[a-z,0-9]{2,5}\b/,
                description: chalk.yellow('Old Project Shortcut (whitout "_sitepackage"):'),
                message: chalk.red('Shortcut must be only letters and numbers, lowercase and has 2 to 5 characters'),
                required: true
            }
        }
    };

    // start prompt process
    prompt.start();

    // Get project name properties from the user
    prompt.get(promptOptions, function(err, result) {
        oldProjectName = result.name;
        callback();
    });
}


/**
 * Step 3 - get new project shortcut and replace old _sitepackage paths
 * @param callback
 */
function getNewProjectName(callback) {
    'use strict';

    var message = 'Step ' + step + ': Set the project shortcut! This will be used to rename the ' +
        '\nTYPO3 "gm7_sitepackage" extension path and has impact  on \npathes within your ' +
        'Patternlab Setup, JS and SCSS Files!\n',
        promptOptions,
        regExNewName = new RegExp(oldProjectName + '_sitepackage', 'g');

    process.stdout.write('\n');
    process.stdout.write(chalk.blue.bold(message));

    // options for user prompt
    promptOptions = {
        properties: {
            name: {
                pattern: /\b\w[a-z,0-9]{2,5}\b/,
                description: chalk.yellow('New Project Shortcut (whitout "_sitepackage"):'),
                message: chalk.red('Shortcut must be only letters and numbers, lowercase and has 2 to 5 characters'),
                required: true
            }
        }
    };

    // start prompt process
    prompt.start();

    // Get project name properties from the user
    prompt.get(promptOptions, function(err, result) {
        var userInput = result.name;
        newProjectName = userInput.toLowerCase();

        // replace options for path replacement (gm7_sitepackage --> [user Input]_sitepackage)
        replace({
            files: [
                './03-internals/gulp/config/dirs_typo3.json',
                './patternlab-config.json',
                './02-patternlab/source/**/*.json',
                './02-patternlab/source/**/*.mustache',
                './01-src/javascript/**/*.js',
                './01-src/javascript-core/**/*.js',
                './01-src/stylesheets/**/*.scss'
            ],
            replace: regExNewName,
            with: newProjectName + '_sitepackage',

            //Specify if empty/invalid file paths are allowed, defaults to false.
            //If set to true these paths will fail silently and no error will be thrown.
            allowEmptyPaths: true

        }, function(error, changedFiles) {

            if (error) {
                return console.error('Error occurred:', error);
                //process.stdout.write(chalk.red('\nNO files modified (\"gm7_sitepackage\" not found!)'));
            }

            // display what was changed after a small delay
            setTimeout(function() {
                // process write what files are changed (where path replacement took place)
                process.stdout.write(chalk.green('\nModified files:'));
                process.stdout.write(chalk.green('\n' + changedFiles.join(',\n')));
                process.stdout.write(chalk.green('\n\n'));

                callback();
            }, 1500);
        });
    });
}
