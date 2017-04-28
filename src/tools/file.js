ORBIS.File = {
  path      : '',
  directory : '',
  name      : '',
  extension : '',
  type      : '',

  extensions : {
    file  : ['txt', 'text', 'json', 'glsl', 'babylon'],
    image : ['png','jpg', 'jpeg', 'gif'],
    sound : ['mp3', 'ogg', 'wav']
  },

  create : function(path, validType){
    var _this = Object.create(this);
    _this.path = path;
    _this.extractExtension();
    var isExtensionValid = _this.checkExtension(validType);
    if ( isExtensionValid === true){
      _this.extractDirectory();
      _this.extractName();
      return _this;
    }
    return isExtensionValid;

  },

  getPath : function(){
    return this.path;
  },
  getName : function(){
    return this.name;
  },
  getExtension : function(){
    return this.extension;
  },
  getType : function(){
    return this.type;
  },

  extractName : function(){
    this.name = this.path ? this.path.replace(/^.*[\\\/]/, '') : false;
    //var filename = path.split('/').pop();
    //return filename.split('.').shift();
  },
  extractDirectory : function(){
    this.directory = this.path ? this.path.replace(/[^\\\/]*$/, '') : false;
  },
  extractExtension : function(){
    this.extension = this.path ? this.path.split('.').pop() : false;
  },

  checkExtension : function(validType){
    for (var property in this.extensions) {
      if (this.extensions.hasOwnProperty(property)){
        if(!validType || validType == property){
          for ( var i = 0 ; i < this.extensions[property].length ; i++ ){
            if( this.extensions[property][i] == this.extension ){
              this.type = property;
              return true;
            }
          }
        }
      }
    }
    return 'Invalid file extension for "' + this.path + '"';
  },
};
