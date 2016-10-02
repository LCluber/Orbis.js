ORBIS.Request = {
  file     : {},
  response : {},
  fsm      : {},
  callback : {
    method : function(){},
    scope  : {}
  },
  json     : {},

  loaders : {
    file  : 'LoadFile',
    image : 'LoadImage',
    sound : 'LoadSound'
  },

  logs : {},

  create : function( filePath, validType, additionalInfo, callbackMethod, callbackScope ){
    var _this = Object.create(this);
    //_this.createFile( filePath, validType );
    _this.logs = callbackScope.logs;
    _this.createFile( filePath, validType );
    if( typeof this.file === 'string' ){
      return this.file;
    }
    _this.createCallback( callbackMethod, callbackScope );
    _this.createFSM();
    _this.addInfo(additionalInfo);

    return _this;
  },

  createFile : function( filePath, validType ){
    this.file = ORBIS.File.create( filePath, validType );
  },

  createCallback : function(callbackMethod, callbackScope){
    this.callback = {};
    this.callback.method = callbackMethod;
    this.callback.scope  = callbackScope;
  },

  createFSM : function(){
    this.fsm = TAIPAN.create([
                  { name: 'send',    from: 'idle',    to: 'pending' },
                  { name: 'success', from: 'pending', to: 'success' },
                  { name: 'error',   from: 'pending', to: 'error'   }
                ]);
  },

  addInfo : function(additionalInfo){
    if( additionalInfo.hasOwnProperty('file') ){
      this.json = {};
      for( var property in additionalInfo ){
        if( additionalInfo.hasOwnProperty(property) && property !== 'file' )
          this.json[property] = additionalInfo[property];
      }
    }
  },

  send : function(){
    this.logs.add('send ' + this.file.getName() + ', Status ' + this.fsm.getStatus());
    this.fsm.send();
    if (this.file.getType())
      this.response = ORBIS[this.loaders[this.file.getType()]]( this.file.path, this.onComplete, this );
    else {
      this.fsm.error();
      this.logs.add('!! invalid file type. Cannot load ' + this.file.path + '. Status ' + this.fsm.getStatus());
    }
    return this.fsm.getStatus();
  },

  onComplete : function(success, _this){
    var event = false;
    if (success)
      event = _this.fsm.success();
    else {
      event = _this.fsm.error();
      _this.logs.add('!! error during AJAX request for : ' + _this.file.path + '.');
    }
    if (event){
      _this.logs.add('complete ' + _this.file.getName() + '. Status ' + _this.fsm.getStatus());
      _this.callback.method(_this.fsm.getStatus(), _this.response, _this.callback.scope);
    }
  }

};
