const getUsers = async () => {
  try {
    const usersRes = await fetch("http://localhost:3000", {
      method: "post",
      mode: "no-cors",
    });
    const usersData = await usersRes.text();
    const userArr = JSON.parse(usersData);
    console.log(userArr);
    // const userArr = JSON.parse(
    //   await (await fetch("http://localhost:3000/list")).text()
    // );
    const today = new Date();
    const postCommonElem = document.getElementById("post-common");
    userArr.forEach((item) => {
      postCommonElem.innerHTML +=
        '<li class="post-list-li">' +
        '<div class="post-type-number">' +
        item.idx +
        "</div>" +
        '<div class="post-type-head">' +
        item.headline +
        "</div>" +
        '<div class="utvg post-type-utvg">' +
        '<div class="post-type-user">작성자</div>' +
        `<div class="post-type-time">` +
        "작성시간" +
        `</div>` +
        '<div class="post-type-view">조회수</div>' +
        '<div class="post-type-like">추천수</div>' +
        "</div>" +
        "</li>";
    });
  } catch (err) {
    console.error(err);
  }
};

getUsers();
