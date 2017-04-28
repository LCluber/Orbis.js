ORBIS.Utils = {
  getFileName : function(path){
    return path ? path.replace(/^.*[\\\/]/, '') : false;
    //var filename = path.split('/').pop();
    //return filename.split('.').shift();
  },

  removeTrailingSlash : function(path){
    return path ? path.replace(/\/+$/, '') : false;
  },

  valueValidation : function(value){
    return isNaN(value) ? 0 : Math.abs(Math.round(value));
  },
  
  clamp : function ( x, min, max ) {
    return Math.min(Math.max(x,min),max);
    //return ( x < min ) ? min : ( ( x > max ) ? max : x );
  },

  isJSON : function(str){
    var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');
    try {
      json = JSON.parse(str);
    } catch (e) {
      return e;
    }
    return json;
  },

  isFunction : function(func) {
    var getType = {};
    return func && getType.toString.call(func) === '[object Function]';
  },

  isObject : function(object){
    return ( object !== null && ( this.isFunction(object) || typeof object === 'object' ) );
  }

};
