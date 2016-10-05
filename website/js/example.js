
var loader             = ORBIS.create(updateProgress, animateProgress, complete, 0, 0);
var button             = findById('launcher');
var progressBar        = findById('progressBar');
var progressPercentage = findById('progressPercentage');
var progressFile       = findById('progressFile');
var progressConsole    = findById('progressConsole');

function loadAssets(){
  button.disabled = true;
  progressConsole.innerHTML = '';
  loader.launch('../public/assets.json', '../public/assets/');
}

function updateProgress( progress, file ) {
  progressConsole.innerHTML   += progress + '% / ' + file.name + '<br/>';
  progressPercentage.innerHTML = progress + '%';
  progressFile.innerHTML       = file.name;
}

function animateProgress(percentage){
  progressBar.value = percentage;
}

function complete( logs ) {
  console.log(logs);
  progressFile.innerHTML     = 'loading complete';
  progressConsole.innerHTML += 'loading complete<br/>You can check logs in the console.';
  //button.disabled = false;
}

function findById( id ) {
  return document.getElementById(id);
}
