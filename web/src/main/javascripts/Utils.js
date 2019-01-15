import request from 'browser-request';

let Utils = {
  request : function(opts) {
    let cb = opts.callback;
    var method = opts.method || 'POST';
    var ropts = {
      url: opts.url,
      method: method
    };
    if (opts.data != null) {
      if (method == "POST") {
        ropts.form = opts.data;
      } else {
        ropts.qs = opts.data;
      }
    }
    request(ropts, (error, response, body)=> {
      let res = {success: false, error: "An error occurred."};
      let status = -1;
      if (response && response.statusCode) {
        status = response.statusCode;
      }
      if (error) {
        res.error = error;
      } else {
        try {
          res = JSON.parse(body);
        } catch (err) {
          res = {success: false, error: "Response could not be parsed."};
        }
      }
      if (cb) {
        cb(res, status);
      }
    });
  }
};

export default Utils;
