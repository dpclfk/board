const getBoard = async () => {
  try {
    const usersRess = await fetch("http://localhost:3000", {
      method: "post",
      mode: "no-cors",
    });

    console.log(usersRess + "123");
    const usersDataB = await usersRess.text();
    console.log(usersDataB + "123");
    const userArrB = JSON.parse(usersDataB);
    console.log(userArrB + "123");
    const nowPostHeadlineElem = document.getElementById("now-post-headline");

    nowPostHeadlineElem.innerHTML = "";
    userArrB.forEach((item) => {
      nowPostHeadlineElem.innerHTML += `<div>${item.title}</div>`;
    });
  } catch (err) {
    console.error(err);
  }
};

getBoard();
