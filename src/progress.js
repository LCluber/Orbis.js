ORBIS.Progress = {
  rate       : 0.0,
  percentage : 0,
  success    : 0,
  error      : 0,
  total      : 0,

  create : function(){
    var _this = Object.create(this);
    return _this;
  },

  init : function(){
    this.rate       = 0.0;
    this.percentage = 0;
    this.success    = 0;
    this.error      = 0;
    this.total      = 0;
  },

  update : function( success, totalRequests ){

    if (success)
      this.onSuccess();
    else
      this.onError();

    this.total++;
    this.rate = totalRequests ? this.total / totalRequests : 1 ;
    this.percentage = Math.round(this.rate * 100);

    return this.checkComplete();
  },

  onSuccess : function(){
    this.success++;
  },

  onError : function(){
    this.error++;
  },

  checkComplete : function(){
    if(this.rate >= 1)//if done
      return false; //completed
    return true;
  }
};
