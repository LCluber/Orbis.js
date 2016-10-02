ORBIS.Logger = {
  logs      : '',

  create : function(){
    var _this = Object.create(this);
    return _this;
  },

  init : function(){
    this.logs = '';
  },

  get : function(){
    return this.logs;
  },

  add : function(log){
    this.logs += log + '\n';
  }

};
