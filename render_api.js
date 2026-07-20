const https = require('https');

function api(method, pathExtra, body) {
  return new Promise(function(resolve, reject){
    var K = process.env.RENDER_API_KEY || '';
    var S = process.env.RENDER_SERVICE_ID || '';
    var data = body ? JSON.stringify(body) : '';
    var opts = {
      hostname: 'api.render.com',
      path: '/v1/services/' + S + pathExtra,
      method: method,
      headers: {
        Authorization: 'Bearer ' + K,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    var req = https.request(opts, function(res){
      var raw = '';
      res.on('data', function(c){ raw += c; });
      res.on('end', function(){
        var parsed = {};
        try { parsed = JSON.parse(raw); } catch(_){}
        resolve({
          ok: res.statusCode >= 200 && res.statusCode < 300,
          status: res.statusCode,
          raw: raw,
          json: function(){ return parsed; }
        });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

module.exports = {
  ligar:    function(){ return api('POST', '/resume'); },
  desligar: function(){ return api('POST', '/suspend'); },
  reiniciar:function(){ return api('POST', '/deploys', { clearCache: 'do_not_clear' }); },
  status:   function(){ return api('GET', ''); }
};
