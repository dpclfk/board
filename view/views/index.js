// const showNumber = document.getElementById("show-number").innerHTML;

let page = 1;
let count = 4;

// console.log(showNumber / 4);
// console.log(item.length);

const getUsers = async () => {
  try {
    const usersRes = await fetch("http://localhost:3000", {
      method: "post",
      mode: "no-cors",
      body: `page=${page}&count=${count}`,
    });
    console.log(usersRes);

    const usersData = await usersRes.text();
    console.log(usersData);

    const userArr = JSON.parse(usersData);
    console.log(userArr);

    // const userArr = JSON.parse(
    //   await (await fetch("http://localhost:3000/list")).text()
    // );

    const postCommonOlElem = document.getElementById("post-common-ol");

    postCommonOlElem.innerHTML = "";
    // nowPostHeadline.innerHTML = "";
    userArr.forEach((item) => {
      postCommonOlElem.innerHTML +=
        `<li class="post-list-li" id="post-number${item.idx + 1}">` +
        `<div class="post-type-number">${item.idx + 1}</div>` +
        `<div class="post-type-head"><a href="/board/?${item.idx + 1}">${
          item.title
        }</a></div>` +
        `<div class="utvg post-type-utvg">` +
        `<div class="post-type-user">${item.id}</div>` +
        `<div class="post-type-time">${item.createdAt}</div>` +
        `<div class="post-type-view">조회수</div>` +
        `<div class="post-type-like">추천수</div>` +
        `</div>` +
        `</li>`;
    });
  } catch (err) {
    console.error(err);
  }
};

getUsers();

const getpage = async () => {
  try {
    const pageCount = 5;

    const pagingElem = document.getElementById("paging");

    for (let i = 0; i < pageCount; ++i) {
      const tempLi = document.createElement("li");
      tempLi.innerHTML = i + 1;
      tempLi.onclick = () => {
        page = i + 1;
        getUsers();
      };
      pagingElem.append(tempLi);
    }
  } catch (arr) {
    console.log(arr);
  }
};

getpage();
