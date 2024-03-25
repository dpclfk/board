const net = require("net");
const fs = require("fs");

const { makeReq } = require("./lib/req");
const { makeResponse, redirect } = require("./lib/res");
const static = require("./lib/static");

const users = [];

const getMessage = ({ header: { method, path }, body }) => {
  let message = "";
  console.log(static);
  console.log(static[path] + "서버 스태틱패치");
  console.log(method + "서버 메소드");
  console.log(path + "서버패치");

  if (method == "GET") {
    console.log(static[path]);
    if (static[path] != undefined) {
      const body = fs.readFileSync(static[path], { encoding: "utf8" });
      message = makeResponse("text/html", body);
    }
  } else if (method == "POST") {
    if (path == "/") {
      message = makeResponse(
        "application/json",
        JSON.stringify(users.map((item, idx) => ({ id: item.id, idx })))
      );
    } else if (path == "/write") {
      users.push(body);
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
