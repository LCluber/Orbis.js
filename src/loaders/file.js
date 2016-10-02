ORBIS.LoadFile = function (path, onComplete, _this){
  var resp  = {};
  resp.src  = path;
  resp.name = ORBIS.Utils.getFileName(path);
  resp.data = '';
  resp.json = '';

  ORBIS.AjaxRequest(path, true, 1, function(response){
    if(response){
      resp.data = response;
      resp.json = ORBIS.Utils.isJSON(response);
    }
    onComplete( response ? 1 : 0, _this );
  });

  return resp;
};
