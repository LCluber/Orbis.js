## Version 1.0.7 (June 19th 2020)

- Update Aias.js to version 2.7.1
- Update Type6.js to version 2.0.1

## [1.0.6](https://github.com/LCluber/Orbis.js/compare/v1.0.5...v1.0.6) (2020-01-04)

### Bug Fixes

- **dependencies:** update @cluber/\* dependencies ([34bd901](https://github.com/LCluber/Orbis.js/commit/34bd90102ddcd1cce460cc1481bce91b6e235325))

## [1.0.5](https://github.com/LCluber/Orbis.js/compare/v1.0.4...v1.0.5) (2020-01-04)

### Bug Fixes

- **typings:** fix Loader assets list typings ([3a66425](https://github.com/LCluber/Orbis.js/commit/3a66425cb6b4b678304b754cbb9eb9b3e88e2422))

## [1.0.4](https://github.com/LCluber/Orbis.js/compare/v1.0.3...v1.0.4) (2020-01-03)

### Bug Fixes

- **declaration:** fix declaration file imports ([2a0ae51](https://github.com/LCluber/Orbis.js/commit/2a0ae513b3a516eeff6c188812c66f7132d77d9a))

## [1.0.3](https://github.com/LCluber/Orbis.js/compare/v1.0.2...v1.0.3) (2020-01-02)

### Bug Fixes

- **readme:** update readme.md with improved angular service example ([ab066d9](https://github.com/LCluber/Orbis.js/commit/ab066d97f0b7016b0e11513c71e8b5a6c8cc5f48))

## [1.0.2](https://github.com/LCluber/Orbis.js/compare/v1.0.1...v1.0.2) (2020-01-02)

### Bug Fixes

- **typing:** improve typing with better interfaces for Angular ([181f728](https://github.com/LCluber/Orbis.js/commit/181f728fca642a309b1e795b9f8e6ce1f71dd4ab))

## [1.0.1](https://github.com/LCluber/Orbis.js/compare/v1.0.0...v1.0.1) (2020-01-01)

### Bug Fixes

- **asset:** fix optional parameters of Asset type ([cd21bc7](https://github.com/LCluber/Orbis.js/commit/cd21bc7a62ee5cbfb854e73978f13289ed9d4350))

# [1.0.0](https://github.com/LCluber/Orbis.js/compare/v0.9.2...v1.0.0) (2020-01-01)

### Features

- **loader:** add getContent() method ([daa1bc2](https://github.com/LCluber/Orbis.js/commit/daa1bc2efbc5fda6ec1f3264d1c7a0010a6356c2))

### BREAKING CHANGES

- **loader:** change Loader.launch() to Loader.start()

## [0.9.2](https://github.com/LCluber/Orbis.js/compare/v0.9.1...v0.9.2) (2019-10-05)

### Bug Fixes

- **aiasjs:** updated aias.js library for better audio context handling ([5abf7e4](https://github.com/LCluber/Orbis.js/commit/5abf7e4))

## [0.9.1](https://github.com/LCluber/Orbis.js/compare/v0.9.0...v0.9.1) (2019-10-05)

### Bug Fixes

- **audiobuffer:** can load audio buffer on safari ([0c65244](https://github.com/LCluber/Orbis.js/commit/0c65244))

# [0.9.0](https://github.com/LCluber/Orbis.js/compare/v0.8.2...v0.9.0) (2019-09-29)

### Features

- **asset:** improved asset structure ([3b8ee35](https://github.com/LCluber/Orbis.js/commit/3b8ee35))
- **errors:** better error handling for sound loader ([1297cb2](https://github.com/LCluber/Orbis.js/commit/1297cb2))
- **logger:** added setloglevel and getloglevel methods ([e190541](https://github.com/LCluber/Orbis.js/commit/e190541))
- **sound:** load sound as audiobuffer instead of audioelement ([fa064b7](https://github.com/LCluber/Orbis.js/commit/fa064b7))

## [0.8.2](https://github.com/LCluber/Orbis.js/compare/v0.8.1...v0.8.2) (2019-08-31)

### Bug Fixes

- **sound:** added stalled event listener to sound loader ([facd150](https://github.com/LCluber/Orbis.js/commit/facd150))

## [0.8.1](https://github.com/LCluber/Orbis.js/compare/v0.8.0...v0.8.1) (2019-08-18)

### Bug Fixes

- **dist:** fixed dist forlder ([708766d](https://github.com/LCluber/Orbis.js/commit/708766d))

## Version 0.8.0 (August 17th 2019)

- Added resetProgress() method.
- Updated dependencies.

## Version 0.7.2 (July 6th 2019)

- Updated Weejs to 0.3.0.
- image, sound and file loaders included in the library.

## Version 0.7.1 (June 29th 2019)

- Updated Mouette logger for log groups management.

## Version 0.7.0 (June 22th 2019)

- Easier progress bar integration.
- Fixed declaration file.

## Version 0.6.1 (June 13th 2019)

- Better management of assets already loaded.

## Version 0.6.0 (December 28th 2018)

- Assets list parameter of launch() method is an object instead of a json file.
- Library is lighter and faster.

## Version 0.5.4 (December 09th 2018)

- Updated package.js dependencies.

## Version 0.5.3 (October 12th 2018)

- Orbis.js published on NPM at @lcluber/orbisjs.
- Updated README.md with NPM installation procedure.

## Version 0.5.2 (July 22th 2018)

- Library exported as ES6 and IIFE modules instead of UMD.
- ORBIS namespace becomes Orbis

## Version 0.5.1 (July 5th 2018)

- Documentation automatically generated in /doc folder
- Typedoc and grunt-typedoc added in devDependencies
- New "typedoc" task in Gruntfile.js
- Typescript upgraded to version 2.9.2
- INSTALL.md becomes NOTICE.md and RELEASE_NOTES.md becomes CHANGELOG.md

## Version 0.5.0 (May 23th 2018)

- Library is written in TypeScript
- Use Promises instead of callbacks

## Version 0.4.10 (July 2nd 2017)

- added bower.json for bower users
- Manage dependencies with bower

## Version 0.4.9 (April 28th 2017)

- Added glsl file extension
- isJson() utils function now returns the error message on error

## Version 0.4.8 (April 2nd 2017)

- Added support for FrameRat.js version 0.2.7

## Version 0.4.7 (February 19th 2017)

- FrameRat.js dependency is built separately into the dist/dependencies/ folder instead of being directly inserted into the distribution Orbis.js and Orbis.min.js files

Version 0.4.6 (January 30th 2017)

---

- Updated FrameRat.js dependency to version 0.2.5

Version 0.4.5 (January 28th 2017)

---

- Updated FrameRat.js dependency to version 0.2.4

## Version 0.4.4 (January 14th 2017)

- added setProgressSpeed() method

## Version 0.4.3 (October 16th 2016)

- getList() returns successfully loaded files only

## Version 0.4.2 (October 15th 2016)

- updated FrameRat.js to version 0.2.1 for better performances

## Version 0.4.1 (October 13th 2016)

- getAsset and getList now return false if the parameter does not exist

## Version 0.4.0 (October 9th 2016)

- New scope feature. Gives the ability to set a scope for onProgress, onAnimate and onComplete callbacks. Useful when using Orbis.js into a class.
- setTimeout for requests sending now uses bind function to set the scope
- added isObject utility function to test the scope in parameter

## Version 0.3.0 (October 7th 2016)

- New animation feature :
- Added **FrameRat.js** library
- Added OnAnimate callback returning animated progress if needed
- Callback functions checked
- Updated example on the website

## Version 0.2.0 (September 21st 2016)

- Updated for open source release on [GitHub](https://github.com/LCluber/Orbis.js)
- Code reworked
- Dedicated website
- Documentation
- Examples

## Version 0.1.0 (December 1st 2011)

- initial version
