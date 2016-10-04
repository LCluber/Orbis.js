ORBIS.Progress = {
  rate       : 0.0,
  percentage : 0.0,
  target     : 0,
  speed      : 40,//pixels per seconds
  success    : 0,
  error      : 0,
  total      : 0,
  animation  : {},
  onAnimate  : function(){},

  create : function(onAnimate){
    var _this = Object.create(this);
    _this.animation = FRAMERAT.create(_this.animate);
    _this.onAnimate = onAnimate;
    return _this;
  },

  init : function(){
    this.rate       = 0.0;
    this.percentage = 0;
    this.target     = 0;
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
    this.target = Math.round(this.rate * 100);
    this.animation.play(this);

    return this.checkComplete();
  },

  // startAnimation : function(){
  //
  //   this.animation.start();
  // },

  animate : function(){
    //if (this.percentage < this.target){
      this.percentage += this.speed * this.animation.second;
      if (this.percentage >= this.target){
        this.percentage = this.target;
        this.animation.stop();
      }else
        this.animation.newFrame(this);
    //}
    this.onAnimate(this.percentage);
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
