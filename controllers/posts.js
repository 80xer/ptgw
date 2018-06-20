let paths = {};

function route(path) {
  if (!paths[path]) paths[path] = {};

  let endpoint = paths[path];

  const post = func => {
    endpoint.post = func;
    return routeMember;
  };

  const get = func => {
    endpoint.get = func;
    return routeMember;
  };

  const routeMember = {
    post,
    get
  };

  return routeMember;
}

route.run = (method, pathname, params, cb) => {
  return paths[pathname][method.toLowerCase()](params, cb);
};

route("/posts/name").get(inquiryName);
route("/posts")
  .post(register)
  .get(inquiry);

exports.onRequest = function(res, method, pathname, params, cb) {
  // switch (method) {
  //   case "POST":
  //     return register(method, pathname, params, response => {
  //       process.nextTick(cb, res, response);
  //     });
  //   case "GET":
  //     return inquiry(method, pathname, params, response => {
  //       process.nextTick(cb, res, response);
  //     });
  //   default:
  //     return process.nextTick(cb, res, null);
  // }
  return route.run(method, pathname, params, response => {
    process.nextTick(cb, res, response);
  });
};

function register(params, cb) {
  let response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success",
    results: "register ok"
  };

  cb(response);
}

function inquiry(params, cb) {
  let response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success",
    results: "inquiry ok "
  };

  cb(response);
}

function inquiryName(params, cb) {
  let response = {
    key: params.key,
    errorcode: 0,
    errormessage: "success",
    results: "inquiry name ok "
  };

  cb(response);
}
