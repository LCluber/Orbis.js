ORBIS.AjaxRequest = function(url, async, noCache, callback) {

  var http = new XMLHttpRequest();

  if (noCache)
    url += '?cache=' + (new Date()).getTime();

  http.open('GET', url, async);
  http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      callback(this.responseText);
  };
  http.send();

};
