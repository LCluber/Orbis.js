ORBIS.LoadSound = function (path, onComplete, _this){
    var snd = new Audio();
    snd.src = path;
    snd.name = ORBIS.Utils.getFileName(path);

    snd.addEventListener("canplaythrough", function(){
      // snd.removeEventListener("canplay", function(){});
      // snd.removeEventListener("error", function(){});
      onComplete(1, _this);
    }, false);

    snd.addEventListener("canplay", function(){
      // snd.removeEventListener("canplaythrough", function(){});
      // snd.removeEventListener("error", function(){});
      onComplete(1, _this);
    }, false);

    snd.addEventListener("error", function failed(/*e*/){
      // audio playback failed - show a message saying why
      // to get the source of the audio element use $(this).src
      // switch (e.target.error.code) {
      //     case e.target.error.MEDIA_ERR_ABORTED:
      //         alert('You aborted the audio playback.');
      //         break;
      //     case e.target.error.MEDIA_ERR_NETWORK:
      //         alert('A network error caused the audio download to fail.');
      //         break;
      //     case e.target.error.MEDIA_ERR_DECODE:
      //         alert('The audio playback was aborted due to a corruption problem or because the audio used features your browser did not support.');
      //         break;
      //     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      //         alert('The audio audio not be loaded, either because the server or network failed or because the format is not supported.');
      //         break;
      //     default:
      //         alert('An unknown error occurred.');
      //         break;
      // }
      onComplete(0, _this);
    }, false);

    return snd;
};
