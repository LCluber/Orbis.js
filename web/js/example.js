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
      { name: "texture3.png" },
      { name: "texture4.png" },
      { name: "texture5.png" },
      { name: "texture6.png" },
      { name: "texture7.png" }
    ]
  },
  meshes: {
    folder: "meshes",
    files: [{ name: "mesh1.json" }, { name: "mesh2.txt" }]
  },
  cameras: {
    folder: "cameras",
    files: [{ name: "cam1.txt" }]
  },
  lights: {
    folder: "lights",
    files: [{ name: "light1.txt" }]
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
        name: "sprite3.png",
        params: {
          texSize: [540, 30],
          frameSize: [30, 30]
        }
      },
      {
        name: "sprite4.png",
        params: {
          texSize: [540, 30],
          frameSize: [30, 30]
        }
      },
      {
        name: "sprite5.png",
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
      },
      {
        name: "sound4.mp3",
        params: {
          volume: 0.7,
          loop: 0,
          type: 0
        }
      }
    ]
  }
};

var loader = new Orbis.Loader(
  list,
  "../public/assets/",
  "progressBar",
  "progressText"
);
var button = Wee.Dom.findById("launcher");

function loadAssets() {
  button.disabled = true;
  loader.start().then(function(response) {
    console.log("complete");
    console.log(response);
    console.log(loader.getList("sounds"));
    console.log(loader.getAsset("shader1.txt"));
    console.log(loader.getContent("shader1.txt"));
    button.disabled = false;
  });
}
