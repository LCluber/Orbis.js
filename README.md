## Synopsis

[Orbis.js](http://orbisjs.lcluber.com) is a lazy loader written in TypeScript.

## Motivation

The main purpose of this library is to provide a simple way to load assets only when needed instead of loading everything when the main page loads.

## Installation

### npm

```bash
$ npm i @lcluber/orbisjs
```

### Yarn

```bash
$ yarn add @lcluber/orbisjs
```

## Usage

### ES6

```javascript
import { Group } from "@lcluber/orbisjs";
```

### IIFE

```html
<script src="node-modules/@lcluber/orbisjs/dist/orbis.iife.min.js"></script>
```

```javascript
var loader = new Orbis.Loader(
  list,
  "../public/assets/",
  "progressBar",
  "progressText"
);

function loadAssets() {
  loader.launch().then(function() {
    console.log("complete");
    console.log(loader.getList("sounds"));
    console.log(loader.getAsset("sound3.mp3"));
  });
}
```

## API Reference

```javascript
// Log levels from @lcluber Mouette.js logger library
type LevelName = "info" | "trace" | "warn" | "error" | "off";
log.setLogLevel(name: LevelName): LevelName {}
log.getLogLevel(): LevelName {}
```

## Contributors

There is still a lot of work to do on this project and I would be glad to get all the help you can provide.
To contribute you can clone the project on **[GitHub](https://github.com/LCluber/Orbis.js)** and see **NOTICE.md** for detailed installation walkthrough of the project.

## License

MIT License

Copyright (c) 2011 Ludovic CLUBER

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
