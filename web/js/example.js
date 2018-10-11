
var loader             = new Orbis.Loader();
var button             = Wee.Dom.findById('launcher');
Mouette.Logger.prototype.level = 'error';

function loadAssets(){
  button.disabled = true;
  loader.launch('../public/assets.json', '../public/assets/','progressBar', 'progressText').then(
    function(){
      console.log('complete');
      console.log(loader.getList('textures'));
      console.log(loader.getAsset('texture1.png'));
    }
  );
}
