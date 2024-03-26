const net = require("net");
const fs = require("fs");

const { makeReq } = require("./lib/req");
const { makeResponse, redirect, sendFile } = require("./lib/res");
const static = require("./lib/static");

const users = [];

const getMessage = ({ header: { method, path }, body }) => {
  let message = "";

  if (method == "GET") {
    if (static[path] != undefined) {
      const body = fs.readFileSync(static[path]);
      if (static[path].indexOf(".js") > 0) {
        message = makeResponse("text/javascript", body);
      } else if (static[path].indexOf(".css") > 0) {
        message = makeResponse("text/css", body);
      } else if (static[path].indexOf(".png") > 0) {
        message = sendFile("image/png", body);
      } else if (static[path].indexOf(".jpg") > 0) {
        message = sendFile("image/jpeg", body);
      } else {
        message = makeResponse("text/html", body);
      }
    }
  } else if (method == "POST") {
    console.log(path);
    if (path == "/") {
      message = makeResponse(
        "application/json",
        JSON.stringify(
          users
            .map((item, idx) => ({
              headline: item.headline,
              posttext: item.posttext,
              idx,
            }))
            .reverse()
            .slice((body.page - 1) * body.count, body.page * body.count)
        )
      );
    } else if (path == "/write") {
      users.push(body);
      message = redirect();
    } else if (path == "/post") {
      message = redirect();
    }
  }
  return message;
};

const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = makeReq(data);
    // console.log(req.header);
    // console.log(req.header);

    client.write(getMessage(req));
    client.end();
  });
});

server.on("error", (err) => {
  console.log(err);
});

server.listen(3000, "127.0.0.1", () => {
  console.log("server open of 3000 port");
});
