const net = require("net");
const { makeReq } = require("./lib/req");
const { makeResponse, redirect } = require("./lib/res");

const html = `<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>게시판</title>
  <link rel="stylesheet" href="board.css" />
</head>
<body>
  <div id="width-size">
    <div id="header">
      <div id="home-favorites">
        <button>Home</button>
        <button>즐겨찾기</button>
      </div>
      <div id="search">
        <div id="search-type">글 제목</div>
        <div id="search-box">검색어를 입력하세요</div>
        <button>Q</button>
      </div>
    </div>
    <div id="main">
      <div id="left-menu">
        <ol>
          <li>공지사항</li>
          <li>자유게시판</li>
          <li>게시판1</li>
          <li>게시판2</li>
          <li>게시판3</li>
        </ol>
      </div>
      <div id="post">
        <div id="post-main" class="none">
          <div id="post-header">
            <div id="now-board">공지사항</div>
            <div id="show-post">
              보여줄 글 갯수 <span id="show-number">20</span>개
            </div>
          </div>
          <div id="post-list">
            <div id="post-list-header">
              <div class="post-type-number">번호</div>
              <div class="post-type-head">글 제목</div>
              <div class="post-type-utvg">
                <div class="post-type-user">작성자</div>
                <div class="post-type-time">작성일자</div>
                <div class="post-type-view">조회수</div>
                <div class="post-type-like">추천수</div>
              </div>
            </div>
            <div id="post-notice">
              <ol>
              </ol>
            </div>
            <div id="post-common">
              <ol>
              </ol>
            </div>
          </div>
          <div class="flex-center">
            <div id="post-page">
              <div id="pre">이전</div>
              <div id="post-page1">1</div>
              <div id="post-page2">2</div>
              <div id="post-page3">3</div>
              <div id="post-page4">4</div>
              <div id="post-page5">5</div>
              <div id="next">다음</div>
            </div>
          </div>
          <div id="new-post-button">
            <button id="new-post-write">글 쓰기</button>
          </div>
        </div>
        <form action="http://localhost:3000" method="post">
        <div id="new-post" class="">
          <div id="new-post-contents">
            <div id="new-post-head">
              <div id="new-post-board">게시판을 선택해주세요</div>
              <div id="new-post-header">
                <div>
                <input type="text" name="headline" placeholder="HeadLine" />
                </div>
              </div>
            </div>
            <div id="new-post-main">
              <div id="new-post-file">
                <div>이미지첨부</div>
                <div>파일첨부</div>
                <div>영상첨부</div>
                <div>링크첨부</div>
              </div>
              <div id="new-post-text-type">
                <div>글자 모양</div>
                <div>글자 크기</div>
                <div>글자 색상</div>
                <div>글자 배경</div>
                <div>글자 기울기</div>
                <div>글자 굵게</div>
                <div>글자 밑줄</div>
              </div>
              <div id="new-post-text">
                <div>
                <input type="text" name="posttext" placeholder="PostText" />
                </div>
              </div>
            </div>
          </div>
          <div id="new-post-create">
            <button>글 작성</button>
          </div>
        </div>
        </form>
        <div id="now-post" class="none">
          <div id="now-post-header">
            <div id="now-post-top">
              <div>현재게시판</div>
              <button>즐겨찾기</button>
            </div>
            <div id="now-post-headline">
              <div>대충 제목</div>
            </div>
            <div id="now-post-user-at">
              <div>사용자명여덟글자</div>
              <div>작성 시간</div>
            </div>
          </div>
          <div id="now-post-body">
            <div id="now-post-contents">
              <div>대충 내용</div>
            </div>
            <div id="now-post-bottom">
              <!-- <button id="now-post-favorites">즐겨찾기</button> -->
              <button id="now-post-like">좋아요</button>
              <button id="now-post-hate">싫어요</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
  const getUsers = async () => {
    try {
      console.log('시작했어')
      const usersRes = await fetch("http://localhost:3000/list", {
        mode: "no-cors",
      });
      const usersData = await usersRes.text();
      const userArr = JSON.parse(usersData);
      console.log(userArr);
      const postCommonElem = document.getElementById('post-common')
      userArr.forEach(item=>{
        postCommonElem.innerHTML += 
        '<li class="post-list-li">' + 
        '<div class="post-type-number">' + '공지' + 
        '</div>' + '<div class="post-type-head">' + item.headline + '</div>' + 
        '<div class="utvg post-type-utvg">' + 
        '<div class="post-type-user">작성자</div>' + 
        '<div class="post-type-time">작성일자</div>' + 
        '<div class="post-type-view">조회수</div>' + 
        '<div class="post-type-like">추천수</div>' + 
        '</div>' + 
        '</li>'
      })
      // const userArr = JSON.parse(
      //   await (await fetch("http://localhost:3000/list")).text()
      // );
    } catch (err) {
      console.error(err);
    }
  };
  getUsers();
  console.log('언제뜨니?')
</script>
</body>
</html>

`;

const users = [];

const getMessage = ({ header: { method, path }, body }) => {
  let message = "";
  if (method == "GET") {
    if (path == "/") message = makeResponse("text/html", html);
    else if (path == "/list")
      message = makeResponse("application/json", JSON.stringify(users));
  } else if (method == "POST") {
    if (path == "/") {
      users.push(body);
      message = redirect();
    }
  }
  return message;
};

const server = net.createServer((client) => {
  client.on("data", (data) => {
    const req = makeReq(data);
    console.log(req.header);
    console.log(req.header);

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
