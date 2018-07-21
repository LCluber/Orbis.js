import {File,Check}  from 'weejs';
import {Logger}      from 'mouettejs';

import {Asset}       from './asset';
import {Request}     from './request';
import {Progress}    from './progress';

export type ValidExtensions = {
  file  : Array<string>;
  img   : Array<string>;
  sound : Array<string>;
}

export type Default = {
  maxPending : number;
  tick       : number;
}

export class Loader {

  assets             : Object; //data from the assets file
  progress           : Progress;
  //assetsPath: string;
  // requests        : {}, //requests list

  // sentRequests    : 0,
  // onProgress         : Function;
  // onComplete         : Function;
  pendingRequests    : number;

  tick               : number;
  maxPendingRequests : number;
  default            : Default;

  // logs             : {},
  validExtensions : ValidExtensions;

  constructor() {

    this.default = {
      maxPending : 6,
      tick       : 100
    };

    this.validExtensions = {
      file  : ['txt', 'text', 'json', 'glsl', 'babylon'],
      img   : ['png','jpg', 'jpeg', 'gif'],
      sound : ['mp3', 'ogg', 'wav']
    };

    // if (Check.isFunction(onProgress)) {
    //   this.onProgress = onProgress;
    // }
    //else
      //_this.logs.add('onProgress parameter is not a function');

    // if (Check.isFunction(onComplete)) {
    //   this.onComplete = onComplete;
    // }
      //_this.logs.add('onComplete parameter is not a function');

    this.pendingRequests    = 0;
    this.tick               = this.default.tick;
    this.maxPendingRequests = this.default.maxPending;

  }

  // public setTick(duration: number): void {
  //   this.tick.duration = duration;
  // }
  //
  // public setMaxPendingRequests(maxPendingRequests: number): void {
  //   this.maxPendingRequests = maxPendingRequests;
  // }

  public getAsset(name: string): Asset|false {
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        for (let file of this.assets[property].files) {
          if (file.name == name) {
            return file;
          }
        }
      }
    }
    return false;
  }

  public getList (type: string): Array<Asset>|false {
    if (this.assets.hasOwnProperty(type)) {
      return this.assets[type].files;
    }
    return false;
  }

  public launch( configFilePath: string, assetsPath: string, progressBarId: string, progressTextId: string, ): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      let request = new Request();
      let extension = File.getExtension(configFilePath);
      let type = this.getAssetType(extension);
      if (type === 'file') {
        return request.send(configFilePath, type).then(
          (response: string) => {
            if (response) {
              let json = Check.isJSON(response as string);
              if (json) {
                this.assets = json;
                let nbAssets = this.createAssets(File.removeTrailingSlash(assetsPath));
                if(nbAssets) {
                  this.progress = new Progress(progressBarId, progressTextId, nbAssets);
                  let intervalID = setInterval(() => {
                    this.sendRequest();
                    let percentage = this.progress.updateBar(this.tick);
                    if (percentage === 100) {
                      clearInterval(intervalID);
                      resolve();
                    }
                  }, this.tick);
                }else{
                  reject('!! nothing to load here');
                }
              }
            }
          }
        ).catch(
          (err) => {
            Logger.error(configFilePath + ' : ' + err.message);
            console.log('error', err.message);
          }
        );
      }else{
        reject('!! the config file must be of type "file"');
      }
    //this.logs.add('!! the config file must be of type "file"');
    });
  }

  private getAssetType(extension: string): string|false {
    for (let property in this.validExtensions) {
      if (this.validExtensions.hasOwnProperty(property)) {
        if (File.checkExtension(extension, this.validExtensions[property])) {
          return property;
        }
      }
    }
    return false
  }

  private createAssets(path:string): number {
    let nbAssets: number = 0;
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        let type   = this.assets[property];
        let folder = type.folder ? type.folder + '/' : '';
        for (let file of type.files) {
          if (file.hasOwnProperty('name')) {
            let extension = File.getExtension(file.name);
            let type = this.getAssetType(extension);
            if(type) {
              file.asset = new Asset(path + '/' + folder, file.name, extension, type);
              nbAssets++;
            }
          }
        }
      }
    }
    return nbAssets;
    //   _this.logs.add(_this.requestsLength + ' requests to perform');
    //   _this.sendRequest();
    // }else
    //   _this.logs.add('!! error during config file AJAX request');
  }

  private sendRequest(): boolean {

    if (this.pendingRequests < this.maxPendingRequests) {
      let nextAsset = this.getNextAssetToLoad();
      if (nextAsset) {
        nextAsset.sendRequest().then((response) => {
          // if(response) {
          this.pendingRequests--;
          this.progress.update(response);
          //this.achievedRequests++;
          //
        });
        return true;
      }
      return false;
    }

  }

  private getNextAssetToLoad(): Asset|false {
    for (let property in this.assets) {
      if (this.assets.hasOwnProperty(property)) {
        let type = this.assets[property];
        for (let file of type.files) {
          if (file.hasOwnProperty('asset') && !file.asset.isRequestSent()) {
            return file.asset;
          }
        }
      }
    }
    return false;
  }


  // /**
  // * Set the scope used by onProgress, onAnimate, onComplete callbacks.
  // * @since 0.4.0
  // * @method
  // * @param {object} The scope of the callbacks.
  // */
  // setScope : function(scope){
  //   if ( ORBIS.Utils.isObject(scope) ){
  //     this.onProgress = this.onProgress.bind(scope);
  //     this.progress.onAnimate = this.progress.onAnimate.bind(scope);
  //     this.onComplete = this.onComplete.bind(scope);
  //   }else
  //     return false;
  // },



  // /**
  // * Set the maximum number of simultaneous pending requests the loader can handle. Once reached new requests will not start before a previous request completes. Six being the maximum on most browsers.
  // * @since 0.2.0
  // * @method
  // * @param {integer} [max = 6] The maximum number of simultaneous pending requests the loader can handle.
  // */
  // setMaxPending : function(max){
  //   this.maxPendingRequests = ORBIS.Utils.valueValidation(max)?ORBIS.Utils.valueValidation(max):this.defaultMaxPending;
  // },
  //
  // /**

  // /**
  // * set the speed of the progress bar in pixels per seconds.
  // * @since 0.4.4
  // * @method
  // * @param {integer} [speed = 10] an integer between 10 and 100.
  // * @returns {string} return the speed
  // */
  // setProgressSpeed : function( speed ){
  //   this.progress.speed = TYPE6.MathUtils.clamp( ORBIS.Utils.valueValidation( speed ), 10, 100 );
  //   return this.progress.speed;
  // }


}
