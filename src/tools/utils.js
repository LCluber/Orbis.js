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

  isJSON : function(str){
    var json = str.replace(/(\r\n|\n|\r|\t)/gm, '');
    try {
      json = JSON.parse(str);
    } catch (e) {
      return false;
    }
    return json;
  },

  isFunction : function(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

};
