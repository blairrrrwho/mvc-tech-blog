console.log("ready to comment on a post");

async function commentFormHandler(event) {
  event.preventDefault();

  const comment_body = document.querySelector
    ('input[name="comment-body"]').value.trim();


  if (comment_body) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        comment_body
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('.new-comment-form')
  .addEventListener('submit', commentFormHandler);



  
// const newCommentBtn = document.getElementById("commentBtn");

// newCommentBtn.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   const comment_body = document.getElementById("comment-body").value.trim();

//   console.log(comment_body);

//   const url = window.location.href;
//   const data = url.split("/");
//   const post_id = data[data.length - 1];
//   const user_id = data[data.length - 1];

//   const response = await fetch("/api/comment", {
//     method: "POST",
//     body: JSON.stringify({
//       comment_body,
//     }),
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },

//   }).then((res) => {
//     console.log(res);
//     if (res.status == 200) {
//       window.location.href = `/post/${post_id}`;
//     }
//   });
// });