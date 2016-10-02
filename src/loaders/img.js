ORBIS.LoadImage = function ( path, onComplete, _this ){
    var img  = new Image();
    img.src  = path;
    img.name = ORBIS.Utils.getFileName(path);
    /*img.onload = function(){
        onComplete();
    };*/
    img.addEventListener("load", function(){
        onComplete(1,  _this);
    }, false);

    img.addEventListener("error", function(){
        onComplete(0, _this);
    }, false);

    return img;
};
