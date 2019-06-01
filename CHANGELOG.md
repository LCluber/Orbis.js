Version 0.6.1 (May 14th 2019)
-----------------------------
 * Better management of assets already loaded.

Version 0.6.0 (December 28th 2018)
-----------------------------
 * Assets list parameter of launch() method is an object instead of a json file.
 * Library is lighter and faster.

Version 0.5.4 (December 09th 2018)
-----------------------------
 * Updated package.js dependencies.

Version 0.5.3 (October 12th 2018)
-----------------------------
 * Orbis.js published on NPM at @lcluber/orbisjs.
 * Updated README.md with NPM installation procedure.

Version 0.5.2 (July 22th 2018)
------------------------------
 * Library exported as ES6 and IIFE modules instead of UMD.
 * ORBIS namespace becomes Orbis

Version 0.5.1 (July 5th 2018)
------------------------------
 * Documentation automatically generated in /doc folder
 * Typedoc and grunt-typedoc added in devDependencies
 * New "typedoc" task in Gruntfile.js
 * Typescript upgraded to version 2.9.2
 * INSTALL.md becomes NOTICE.md and RELEASE_NOTES.md becomes CHANGELOG.md

 Version 0.5.0 (May 23th 2018)
------------------------------
 * Library is written in TypeScript
 * Use Promises instead of callbacks

Version 0.4.10 (July 2nd 2017)
------------------------------
 * added bower.json for bower users
 * Manage dependencies with bower

Version 0.4.9 (April 28th 2017)
------------------------------
 * Added glsl file extension
 * isJson() utils function now returns the error message on error

Version 0.4.8 (April 2nd 2017)
------------------------------
 * Added support for FrameRat.js version 0.2.7

Version 0.4.7 (February 19th 2017)
------------------------------
 * FrameRat.js dependency is built separately into the dist/dependencies/ folder instead of being directly inserted into the distribution Orbis.js and Orbis.min.js files

Version 0.4.6 (January 30th 2017)
 ------------------------------
 * Updated FrameRat.js dependency to version 0.2.5

Version 0.4.5 (January 28th 2017)
 ------------------------------
 * Updated FrameRat.js dependency to version 0.2.4

Version 0.4.4 (January 14th 2017)
------------------------------
 * added setProgressSpeed() method

Version 0.4.3 (October 16th 2016)
------------------------------
 * getList() returns successfully loaded files only

Version 0.4.2 (October 15th 2016)
------------------------------
 * updated FrameRat.js to version 0.2.1 for better performances

Version 0.4.1 (October 13th 2016)
------------------------------
 * getAsset and getList now return false if the parameter does not exist

Version 0.4.0 (October 9th 2016)
------------------------------
 * New scope feature. Gives the ability to set a scope for onProgress, onAnimate and onComplete callbacks. Useful when using Orbis.js into a class.
 * setTimeout for requests sending now uses bind function to set the scope
 * added isObject utility function to test the scope in parameter

Version 0.3.0 (October 7th 2016)
------------------------------
 * New animation feature :
  * Added **FrameRat.js** library
  * Added OnAnimate callback returning animated progress if needed
 * Callback functions checked
 * Updated example on the website

Version 0.2.0 (September 21st 2016)
------------------------------
 * Updated for open source release on [GitHub](https://github.com/LCluber/Orbis.js)
 * Code reworked
 * Dedicated website
 * Documentation
 * Examples

Version 0.1.0 (December 1st 2011)
-----------------------------
 * initial version
