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
import { Loader, IResponse } from "@lcluber/orbisjs";

let loader = new Loader(
  list,
  "../public/assets/",
  "progressBar",
  "progressText"
);

function loadAssets() {
  loader.start().then((response: IResponse) => {
    console.log(response.message);
    if (response.success) {
      console.log(loader.getList("sounds"));
      console.log(loader.getAsset("sound3.mp3"));
      console.log(loader.getContent("sound3.mp3"));
    }
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
  loader.start().then(function(response) {
    console.log(response.message);
    if (response.success) {
      console.log(loader.getList("sounds"));
      console.log(loader.getAsset("sound3.mp3"));
      console.log(loader.getContent("sound3.mp3"));
    }
  });
}
```

### ANGULAR

Example of a service to load several assets when needed.

```javascript
import { Injectable } from '@angular/core';
import { Loader, IAssets, IResponse } from "@lcluber/orbisjs";

@Injectable({
  providedIn: 'root'
})
export class AssetsLoaderService {

  list: IAssets = {
    shaders: {
      folder: "shader",
      files: [
        { name: "vertex.glsl" },
        { name: "fragment.glsl" }
      ]
    }
  };

  loader: Loader = new Loader(
    this.list,
    '../assets/',
    null,
    null
  );

  constructor() { }

  public load(): Promise<boolean> {
    return this.loader.start().then((response: IResponse) => {
      console.log("complete");
      return response.success;
    });
  }

  public get vertexShader(): Object | HTMLImageElement | AudioBuffer | string | null | false {
    return this.loader.getContent("vertex.glsl");
  }

  public get fragmentShader(): Object | HTMLImageElement | AudioBuffer | string | null | false {
    return this.loader.getContent("fragment.glsl");
  }
}

```

## API Reference

```javascript

// the structure of loader.start() promise response.
interface IResponse {
  success: boolean,
  message: string
};

interface IAssets {
  [key: string]: { // type
    folder: string;
    files: IAsset[];
  };
}

interface IAsset {
  name: string;
  params?: IParams | null;
}

interface IParams {
  [key: string]: string | number | boolean | Array<string | number | boolean>;
}

class Asset implements IAsset {
    name: string;
    params: IParams | null;
    xhr: XHR | null;
    isValid: boolean;
}

class XHR {
    path: string;
    extension: string;
    type: string;
    response: Object | HTMLImageElement | AudioBuffer | string | null;
    request: Request;

class Loader(
  assets: IAssets,
  assetsPath: string,
  progressBarId?: string,
  progressTextId?: string
);

// Starts loading the assets
loader.start(): Promise<IResponse> {}
// Returns the asset object
loader.getAsset(name: string): Asset | false {}
// Returns only the response of the xhr request.
loader.getContent(name: string): Object | HTMLImageElement | AudioBuffer | string | null | false {}
// Returns a list of assets by type
loader.getList(type: string): Asset[] | false {}

// Reset the progress bar before starting a new loading process
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
