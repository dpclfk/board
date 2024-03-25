const fs = require("fs");
const path = require("path");

const staticObj = {};

const rootPath = path.join(__dirname, "../");

console.log(rootPath);

const find = (currPath) => {
  const directory = fs.readdirSync(currPath);
  console.log(directory);

  directory.forEach((currPathName) => {
    // console.log(currPathName);
    const findPath = path.join(currPath, currPathName);
    const isFile = fs.statSync(findPath).isFile();
    // console.log(isFile);
    if (isFile) {
      // staticObj[findPath.replace(rootPath, "")] = findPath;
      staticObj[findPath.slice(rootPath.length)] = findPath;
      staticObj[findPath.slice(rootPath.length).replace("index.html", "")] =
        findPath;
      // console.log(findPath);
    } else {
      find(findPath);
    }
  });
};
find(rootPath);
console.log(staticObj);

module.exports = staticObj;
