#!/usr/bin/env node

var shell = require('shelljs'),
    exec = require('child_process').exec,
    chalk = require('chalk'),
    fs = require('fs'),
    animateProgress = require('./helpers/progress'),
    addCheckMark = require('./helpers/checkmark'),
    addFailMark = require('./helpers/failmark'),
    checkForFile = require('./helpers/checkForFile'),
    prompt = require('prompt'),
    replace = require('replace-in-file'),
    interval,
    projectName,
    async = require('async'),
    newProject = false,
    typo3Project = true,
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
                setTimeout(function() {
                    clearInterval(interval);
                    callback(null);
                    step++;
                }, 2000);
            });
        },

        // STEP 2
        function(callback) {

            projectType(function() {
                setTimeout(function() {
                    clearInterval(interval);
                    callback(null);
                    step++;
                }, 1000);
            });
        },

        // STEP 3
        function(callback) {

            if (newProject === true) {
                checkTypo3Project(function() {
                    setTimeout(function() {
                        clearInterval(interval);
                        callback(null);
                        step++;
                    }, 1000);
                });
            } else {
                callback(null);
            }
        },

        // STEP 4
        function(callback) {

            if (newProject === true && typo3Project === true) {
                getProjectName(function() {
                    setTimeout(function() {
                        clearInterval(interval);
                        callback(null);
                        step++;
                    }, 1000);
                });
            } else {
                callback(null);
            }
        },

        // STEP 5
        function(callback) {

            if (newProject === true) {
                useScssFramework(function() {
                    setTimeout(function() {
                        clearInterval(interval);
                        callback(null);
                        step++;
                    }, 1000);
                });
            } else {
                callback(null);
            }
        },

        // STEP 6
        function(callback) {

            if (newProject === true) {
                cleanRepo(function() {
                    setTimeout(function() {
                        clearInterval(interval);
                        callback(null);
                        step++;
                    }, 1000);
                });
            } else {
                callback(null);
            }
        },

        // STEP 7
        function(callback) {

            installNpmDeps(function() {
                setTimeout(function() {
                    clearInterval(interval);
                    callback(null);
                    step++;
                }, 1000);
            });
        },

        // STEP 8
        function(callback) {

            installBowerDeps(function() {
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

    var message = 'Lets start this ship! Make yourself ready';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdout.write('\n');
    interval = animateProgress(chalk.blue.bold(message));
    process.stdout.write(chalk.blue.bold(message + '... '));

    callback();
}

/**
 * Step 2 - get the project type (new vs. established project)
 * @param callback
 */
function projectType(callback) {
    'use strict';

    var message = 'Step ' + step + ': Are you creating a completely new project ' +
        'and consequently a new Git repository?\n',
        promptOptions;

    process.stdout.write('\n\n');
    process.stdout.write(chalk.blue.bold(message));

    // change prompt defaults
    prompt.message = '';
    prompt.delimiter = '';

    // options for user prompt
    promptOptions = {
        properties: {
            bool: {
                pattern: /^(?:y\b|n\b)/,
                description: chalk.yellow('New Project? (Please answer with y/n):'),
                message: chalk.red('Only y/n will be accepted!'),
                required: true
            }
        }
    };

    // start prompt process
    prompt.start();

    // Get project name properties from the user
    prompt.get(promptOptions, function(err, result) {
        var userInput = result.bool;

        if (userInput === 'y') {
            newProject = true;
            // process write what happend because of the decision
            process.stdout.write(chalk.yellow('\nAs you create a new project we will delete the Patternlab ' +
                '\ngit directory in the process and keep asking your some more questions... '));

        } else {
            // process write what happend because of the decision
            process.stdout.write(chalk.yellow('\nAs you are working on a established project we will just build ' +
                '\nyour local Patternlab and stop bothering you!'));
        }

        setTimeout(function() {
            callback();
        }, 200);
    });
}

/**
 * Step 3 - Check if we build a TYPO3 Project (results in different gulp/config/dirs.json)
 * @param callback
 */
function checkTypo3Project(callback) {
    'use strict';

    var message = 'Step ' + step + ': Do you build a TYPO3 Project? If so we will build a ' +
        'TYPO3 specific path environment\n',
        promptOptions,
        regExPath = new RegExp('/typo3conf/ext/gm7_sitepackage/Resources/Public/_Default/', 'g');

    process.stdout.write('\n\n');
    process.stdout.write(chalk.blue.bold(message));

    // change prompt defaults
    prompt.message = '';
    prompt.delimiter = '';

    // options for user prompt
    promptOptions = {
        properties: {
            bool: {
                pattern: /^(?:y\b|n\b)/,
                description: chalk.yellow('TYPO3 Project? (Please answer with y/n):'),
                message: chalk.red('Only y/n will be accepted!'),
                required: true
            }
        }
    };

    // start prompt process
    prompt.start();

    // Get project name properties from the user
    prompt.get(promptOptions, function(err, result) {
        var userInput = result.bool;

        if (userInput !== 'y') {

            typo3Project = false;

            // replace dirs_typo3.json when this build isn't a TYPO3 project
            replace({
                files: [
                    './gulpfile.js'
                ],
                replace: /dirs_typo3.json/g,
                with: 'dirs.json',

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
                    process.stdout.write(chalk.green('Modified files:'));
                    process.stdout.write(chalk.green('\n' + changedFiles.join(',\n')));

                    //callback();
                }, 1500);
            });

            replace({
                files: [
                    './02-patternlab/source/**/*.json',
                    './01-src/javascript/_config.js'
                ],
                replace: regExPath,
                with: '/dist/',

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
                    process.stdout.write(chalk.green('Modified files:'));
                    process.stdout.write(chalk.green('\n' + changedFiles.join(',\n')));

                    callback();
                }, 1500);
            });

        } else {
            // display what was changed after a small delay
            setTimeout(function() {
                callback();
            }, 500);
        }
    });
}

/**
 * Step 4 - get project shortcut and replace in gm7_sitepackage paths
 * @param callback
 */
function getProjectName(callback) {
    'use strict';

    var message = 'Step ' + step + ': Set the project shortcut! This will be used to rename the ' +
        'TYPO3 "gm7_sitepackage" \nextension path and has impact on pathes within your ' +
        'Patternlab Setup, JS and SCSS Files!\n',
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
                description: chalk.yellow('Project Shortcut:'),
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
        projectName = userInput.toLowerCase();

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
            replace: /gm7_sitepackage/g,
            with: projectName + '_sitepackage',

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
                process.stdout.write(chalk.green('Modified files:'));
                process.stdout.write(chalk.green('\n' + changedFiles.join(',\n')));

                callback();
            }, 1500);
        });
    });
}

/**
 * Step 5
 * @param callback
 */
function useScssFramework(callback) {
    'use strict';

    var message = 'Step ' + step + ': Do you want to use the full CSS-Framework (Grid and a lot of Utilities)? ' +
        '\nBe aware that this will add round about 20.000 lines of compiled CSS-Code. If you use \nit right, you ' +
        'don\'t need much additional CSS apart from that.\n',
        promptOptions,
        regExPath = new RegExp('"use-framework": true,', 'g');

    process.stdout.write('\n\n');
    process.stdout.write(chalk.blue.bold(message));

    // change prompt defaults
    prompt.message = '';
    prompt.delimiter = '';

    // options for user prompt
    promptOptions = {
        properties: {
            bool: {
                pattern: /^(?:y\b|n\b)/,
                description: chalk.yellow('Use CSS-Framework? (Please answer with y/n):'),
                message: chalk.red('Only y/n will be accepted!'),
                required: true
            }
        }
    };

    // start prompt process
    prompt.start();

    // Get project name properties from the user
    prompt.get(promptOptions, function(err, result) {
        var userInput = result.bool;

        if (userInput !== 'y') {

            // rename stylesheet-framework dir (added underscore prefix - could be used later by renaming manually)
            fs.rename('01-src/stylesheets-framework', '01-src/_stylesheets-framework', function(err) {
                if (err) {
                    //throw err;
                }

                setTimeout(function() {
                    process.stdout.write(chalk.green('Renamed Directories:'));
                    process.stdout.write(chalk.green('\n01-src/stylesheets-framework\n'));
                }, 1500);
            });

            // rename utility pattern dir (added underscore prefix - could be used later by renaming manually)
            fs.rename('02-patternlab/source/_patterns/01-utilities',
                '02-patternlab/source/_patterns/_01-utilities', function(err) {
                    if (err) {
                        //throw err;
                    }

                    setTimeout(function() {
                        process.stdout.write(chalk.green('Renamed Directories:'));
                        process.stdout.write(chalk.green('\n02-patternlab/source/01-utilities\n'));
                    }, 1500);
                }
            );

            // set "use-framework: true" in data.json to false
            replace({
                files: [
                    './02-patternlab/source/_data/data.json'
                ],
                replace: regExPath,
                with: '"use-framework": false,',

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
                    process.stdout.write(chalk.green('Modified files:'));
                    process.stdout.write(chalk.green('\n' + changedFiles.join(',\n')));

                    callback();
                }, 1500);
            });

        } else {
            // display what was changed after a small delay
            setTimeout(function() {
                callback();
            }, 500);
        }
    });
}

/**
 * Step 6 -Clean gm7 git repo
 * @param callback
 */
function cleanRepo(callback) {
    'use strict';

    var message = 'Step ' + step + ': Cleaning old repository)';

    clearInterval(interval);

    // process write what is the next step
    process.stdout.write('\n\n');
    interval = animateProgress(chalk.blue.bold(message));
    process.stdout.write(chalk.blue.bold(message + '... '));

    shell.rm('-rf', '.git/');

    setTimeout(function() {
        addCheckMark(callback);
    }, 1500);
}

/**
 * Step 7 - Install NPM Dependencies
 * @param callback
 */
function installNpmDeps(callback) {
    'use strict';

    var message = 'Step ' + step + ': Installing node.js dependencies (This might take a while)';

    clearInterval(interval);

    // process write what is the next step
    process.stdout.write('\n\n');
    interval = animateProgress(chalk.blue.bold(message));
    process.stdout.write(chalk.blue.bold(message + '... '));

    exec('npm install', addCheckMark.bind(null, callback));
}

/**
 * Step 8 - Install Bower Dependencies
 * @param callback
 */
function installBowerDeps(callback) {
    'use strict';

    var message = 'Step ' + step + ': Installing Bower dependencies';

    // process write what is the next step
    process.stdout.write('\n\n');
    interval = animateProgress(chalk.blue.bold(message));
    process.stdout.write(chalk.blue.bold(message + '...'));

    checkForFile('bower.json', function(callback, err) {
        clearInterval(interval);

        if (callback) {

            installBower(function(error) {
                if (error) {
                    process.stdout.write(error);
                }

                process.stdout.write('\n');
                process.exit(0);
            });

        } else {
            addFailMark();
            process.stdout.write(chalk.red('\nERROR MESSAGE: ' + err + '\n'));
            process.exit(0);
        }
    });
}

function installBower(callback) {
    'use strict';

    exec('node_modules/bower/bin/bower install', addCheckMark.bind(null, callback));
}
