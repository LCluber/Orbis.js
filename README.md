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

### html

```html
<div id="progressPanel">
  <button
    id="launcher"
    type="button"
    class="btn btn-default"
    onclick="loadAssets()"
  >
    LOAD ASSETS
  </button>
  <div id="progressText">Loading</div>
  <div id="progressBar">
    <div id="progressBarNumber">0</div>
    <div id="progressBarPercentage"></div>
  </div>
</div>
```

### assets object

```javascript
//example of assets to load :
var list = {
  shaders: {
    folder: "shaders",
    files: [
      { name: "shader1.txt" },
      { name: "shader2.txt" },
      { name: "shader3.txt" }
    ]
  },
  materials: {
    folder: "materials",
    files: [
      { name: "material1.txt" },
      { name: "material2.txt" },
      { name: "material3.doc" }
    ]
  },
  textures: {
    folder: "textures",
    files: [
      { name: "texture1.png" },
      { name: "texture2.png" },
      { name: "texture3.png" }
    ]
  },
  meshes: {
    folder: "meshes",
    files: [{ name: "mesh1.json" }, { name: "mesh2.json" }]
  },
  sprites: {
    folder: "sprites",
    files: [
      {
        name: "sprite1.png",
        params: {
          texSize: [124, 70],
          frameSize: [62, 70]
        }
      },
      {
        name: "sprite2.png",
        params: {
          texSize: [540, 30],
          frameSize: [30, 30]
        }
      },
      {
        name: "sprite3.png",
        params: {
          texSize: [540, 30],
          frameSize: [30, 30]
        }
      }
    ]
  },
  sounds: {
    folder: "sounds",
    files: [
      {
        name: "sound1.mp3",
        params: {
          volume: 0.2,
          loop: 0,
          type: 0
        }
      },
      {
        name: "sound2.mp3",
        params: {
          volume: 0.3,
          loop: 0,
          type: 0
        }
      },
      {
        name: "sound3.mp3",
        params: {
          volume: 0.7,
          loop: 0,
          type: 0
        }
      }
    ]
  }
};
```

### ES6

```javascript
import { Loader } from "@lcluber/orbisjs";

let loader = new Loader(
  list,
  "../public/assets/",
  "progressBar",
  "progressText"
);

function loadAssets() {
  loader.launch().then(() => {
    console.log("complete");
    console.log(loader.getList("sounds"));
    console.log(loader.getAsset("sound3.mp3"));
  });
}
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

interface Assets {
  [key: string]: {
    folder: string;
    files: Asset[];
  };
}

interface Asset {
  name: string;
  params: {
    [key: string]: string | number | boolean | Array<string | number | boolean>;
  };
  xhr?: XHR;
}

class XHR {
  path: string;
  extension: string;
  type: string;
  response: Object | HTMLImageElement | AudioBuffer | string | null;
}

class Loader(
  assets: Assets,
  assetsPath: string,
  progressBarId: string,
  progressTextId: string
);

loader.launch(): Promise<void> {}
loader.getAsset(name: string): Asset | false {}
loader.getList(type: string): Asset[] | false {}

loader.resetProgress(): void;

// Log levels from @lcluber Mouette.js logger library
type LevelName = "info" | "trace" | "warn" | "error" | "off";
loader.setLogLevel(name: LevelName): LevelName {}
loader.getLogLevel(): LevelName {}

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
