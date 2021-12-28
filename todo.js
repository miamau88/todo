// 3회차 과제
// 1. 리스트 출력되도록 코드 수정
// 2. 삭제 버튼 클릭하면 배열에서 삭제, 목록에서도 제거
// 3. add 버튼 누르면 항목 추가 (id 1씩 증가)

fetch("http://localhost:5000/todos") // 1
  .then((res) => res.json())
  .then((res) => {
    todos = res;
    list();
    check();
  });

let todos = [];

// 1 -> 2 -> 3

// list(); // 2

function list() {
  console.log(todos);
  //기존 배열 리스트 추가
  const ul = document.querySelector("ul");
  const li = document.querySelector("li");

  // check();
  const todoMap = (todoslist) => {
    // 변수명 수정 필요
    return `<li class='todo-list ${
      todoslist.completed !== "false" ? "completed" : ""
    }' data-id="${todoslist.id}">
          <div class="checkBox"><input type='checkbox' id='chkList${
            todoslist.id
          }'
          ${todoslist.completed !== "false" ? "checked" : ""}>
          <label for='chkList${todoslist.id}'></label></div>
          <div class="todo-title">${todoslist.title}</div>
          <button class="btndel">x</button></li>`;
  };
  // ul.innerHTML = todos.map(todoMap).join("");
  ul.innerHTML = todos.map(todoMap).join("");
  const btnDel = document.querySelectorAll(".btndel");
  // 삭제`
  for (let i = 0; i < btnDel.length; i++) {
    btnDel[i].addEventListener("click", (e) => {
      const id = e.target.parentNode.dataset.id;
      console.log(id);
      fetch(`http://localhost:5000/todos/1/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          todos.splice(i, 1);
          e.target.parentNode.remove();
          console.log(todos);
          // alert("삭제되었습니다");
          // setTimeout(() => {
          //   location.reload();
          // }, 500);
        })
        .catch((err) => alert(err));
    });
  }
} /* list end */

function check() {
  const check = document.querySelectorAll("input[type='checkbox']");
  for (let i = 0; i < check.length; i++) {
    check[i].addEventListener("click", (e) => {
      // const eli = e.target.parentNode.parentNode
      const eli = e.target.closest("li");
      // e.target.closest('찾을 요소')
      // if (true) { // 스코프
      // }
      //   debugger

      const completed = todos[i].completed == "true" ? "false" : "true";
      fetch(`http://localhost:5000/todos/${todos[i].userId}/${todos[i].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ completed: `${completed}` }),
      })
        .then(() => {
          if (check[i].checked !== true) {
            eli.classList.remove("completed");
            todos[i].completed = "false";
            console.log(todos[i].completed);
            return;
          }
          eli.classList.add("completed");
          todos[i].completed = "true";
        })
        .catch((err) => alert(err));

      // check[i].checked == true
      //   ? (a[i].innerText = `체크완료` )
      //   : (a[i].innerText = `미확인`);
      console.log(todos[i].completed);
    });
  }
} /* chetck end */

// 이벤트위임
document.querySelector("#add-btn").addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    const input = document.querySelector(".todo-txtInput");
    let id = todos.length !== 0 ? Number(todos[todos.length - 1].id) + 1 : 1;

    // input.value == 0
    //   ? alert("내용을 입력하세요")
    //   : todos.push({ id: id, title: input.value, completed: 0 });
    if (input.value == 0) {
      // return 은 다음 코드가 실행되는걸 막아줍니다.
      return alert("내용을 입력하세요");
    }
    fetch(`http://localhost:5000/todos/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ title: input.value }),
    })
      .then((res) => res.json())
      .then((res) => {
        todos.push({ id: id, title: input.value, completed: "false" });
        //   if (res == 'success') {
        //     alert('suc')
        //     setTimeout(() => {
        //       location.reload();
        //     }, 500);
        //   }if(res =='fail') {
        //     alert('123아니야')
        list();
        check();
        //     setTimeout(() => {
        //       location.reload();
        //     }, 500);
        //   }
        // })
      })
      .catch((err) => alert(err));
  }
});

// 4회차 과제
// input에 값이 없을 때 예외처리
// completed 값이 1이면 완료한거니 글자를 회색으로 처리 (class 이용)
// li에 체크박스 추가
