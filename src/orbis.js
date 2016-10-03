/**
* @namespace
*/
var ORBIS = {

  /**
  * @author Ludovic Cluber <http://www.lcluber.com/contact>
  * @file Asynchronous assets loader library.
  * @version 0.2.0
  * @copyright (c) 2011 Ludovic Cluber

  * @license
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in all
  * copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  */

  revision: '0.2.0',

  assets: {}, //data from the assets file
  assetsPath      : '',
  requests        : {}, //requests list
  requestsLength  : 0,
  sentRequests    : 0,
  onProgress      : function(){},
  onComplete      : function(){},
  progress        : {},
  pending         : 0,

  tick             : 0,
  maxPending       : 0,
  defaultMaxPending: 6,
  defaultTick      : 100,

  logs             : {},

  /**
  * Create a new loader.
  * @since 0.2.0
  * @method
  * @param {function} onProgress The name of your onProgress callback function.
  * @param {function} onComplete The name of your onComplete callback function.
  * @param {integer} [tick = 100] The timeout between two requests.
  * @param {integer} [maxPending = 6] The maximum pending requests. Once reached new requests will not start before a previous one completes. Six being the maximum on most browsers.
  * @returns {Loader}  The new Loader
  */
  create : function(onProgress, onComplete, tick, maxPending) {
    var _this = Object.create(this);
    _this.onProgress = onProgress;
    _this.onComplete = onComplete;
    _this.progress   = ORBIS.Progress.create();
    _this.logs       = ORBIS.Logger.create();
    _this.setTick(tick);
    _this.setMaxPending(maxPending);
    return _this;
  },

  /**
  * Start the loader.
  * @since 0.2.0
  * @method
  * @param {string} assetsFilePath The path of your assets config file.
  * @param {string} assetsPath The path of the folder containing all the assets.
  */
  launch : function( assetsFilePath, assetsPath ){
    this.progress.init();
    this.logs.init();
    this.assetsPath = ORBIS.Utils.removeTrailingSlash(assetsPath);
    //check if assets file exists
    // if(){
    //
    // }
    //check if assetsFile already loaded
    if( this.assets.fsm && this.assets.fsm.getStatus() === 'success' ){
      this.logs.add( assetsFilePath + ' already loaded.');
      this.onAssetsFileLoaded('success', this.assets.response, this);
    }else{
      this.logs.add('create request for ' + assetsFilePath);
      this.assets = ORBIS.Request.create( assetsFilePath, 'file', '', this.onAssetsFileLoaded, this );
      if(this.assets)
        this.assets.send();
      else
        this.logs.add('!! the config file must be of type "file"');
    }
  },

  onAssetsFileLoaded : function(status, response, _this){
    if (status == 'success'){
      _this.logs.add('parsing asset file');
      _this.requestsLength = 0;
      _this.sentRequests = 0;
      for (var property in response.json){
        if ( response.json.hasOwnProperty(property) ){
          var type   = response.json[property];
          var files  = type.files;
          var folder = type.folder ? type.folder + '/' : '';
          for (var i = 0 ; i < files.length ; i++){
            var asset = files[i];
            var file = asset.hasOwnProperty('file') ? asset.file : asset;
            var path = _this.assetsPath + '/' + folder + file;
            //errors
            if(_this.getAsset(file)){
              _this.logs.add( path + ' already loaded.');
              continue;
            }
            var request = ORBIS.Request.create( path, '', asset, _this.onFileLoaded, _this );
            if (typeof request.file === 'string'){
              _this.logs.add(request.file);
              continue;
            }
            _this.logs.add('create request for ' + path);
            _this.requests[file] = request;
            _this.requestsLength++;
          }
        }
      }
      _this.logs.add(_this.requestsLength + ' requests to perform');
      _this.sendRequest();
    }else
      _this.logs.add('!! error during config file AJAX request');
  },

  sendRequest : function(){
    if( this.pending < this.maxPending){
      var nextProperty = Object.keys(this.requests)[this.sentRequests];
      if (this.getAsset(nextProperty) || this.requests[nextProperty].send() == 'error')
        this.updateProgress( 0, this.getAsset(nextProperty).response );
      this.pending++;
      this.sentRequests++;

    }

    if (this.sentRequests < this.requestsLength){
      var _this = this;
      setTimeout( function(){
        _this.loadAnotherFile(_this);
      }, this.tick );
    }
  },

  loadAnotherFile : function(_this){ //start loading
    _this.sendRequest();
  },

  //callback
  onFileLoaded : function(success, response, _this){ //called when a file is loaded
    _this.updateProgress(success, response);
  },

  updateProgress : function(success, response){ //called when a file is cached
    var progress = this.progress.update(success, this.requestsLength);

    if(this.pending > 0)
      this.pending--;

    this.logs.add('progress ' + this.progress.target + '%');
    this.onProgress( this.progress.percentage, response );
    if (!progress){
      this.logs.add('loading complete');
      this.onComplete( this.getLogs() );
    }

  },

  /**
  * Get the list of a type of assets.
  * @since 0.1.0
  * @method
  * @param {string} property The name of a type of assets given in the assets file.
  * @returns {array}  the list of assets as an array or an error message if property not found
  */
  getList : function(property){
    if( this.assets.response.json.hasOwnProperty(property) ){
      var array  = [];
      var assets = this.assets.response.json[property].files;
      for( var i = 0 ; i < assets.length ; i++ )
        array.push(this.getAsset(assets[i]));
      return array;
    }
    return 'property not found';
  },

  /**
  * Get an asset by name
  * @since 0.1.0
  * @method
  * @param {string} name The name of the asset you need.
  * @returns {asset}  The asset you asked for or an error message if no asset with this name found
  */
  getAsset : function(name){
    if( this.requests[name] && this.requests[name].fsm.getStatus() === 'success' )
      return this.requests[name];
    else
      return false;
  },

  /**
  * Get the interval between two requests in millisecond .
  * @since 0.2.0
  * @method
  * @returns {integer}  The value of the loader tick
  */
  getTick : function(){
    return this.tick;
  },

  /**
  * Set the interval between two requests in milliseconds.
  * @since 0.2.0
  * @method
  * @param {integer} [tick = 100] The timeout between each requests in milliseconds.
  */
  setTick : function(tick){
    this.tick = ORBIS.Utils.valueValidation(tick)?ORBIS.Utils.valueValidation(tick):this.defaultTick;
  },

  /**
  * Get the maximum number of simultaneous pending requests the loader can handle.
  * @since 0.2.0
  * @method
  * @returns {integer}  The maximum number of simultaneous AJAX requests
  */
  getMaxPending : function(){
    return this.maxPending;
  },

  /**
  * Set the maximum number of simultaneous pending requests the loader can handle. Once reached new requests will not start before a previous request completes. Six being the maximum on most browsers.
  * @since 0.2.0
  * @method
  * @param {integer} [max = 6] The maximum number of simultaneous pending requests the loader can handle.
  */
  setMaxPending : function(max){
    this.maxPending = ORBIS.Utils.valueValidation(max)?ORBIS.Utils.valueValidation(max):this.defaultMaxPending;
  },

  /**
  * get the logs of the loader in order to monitor it.
  * @since 0.2.0
  * @method
  * @returns {string}  The logs
  */
  getLogs : function(){
    return this.logs.get();
  }


};
