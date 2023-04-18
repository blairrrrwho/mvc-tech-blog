// async function commentFormHandler(event) {
//   event.preventDefault();

//   const comment_body = document
//     .querySelector('textarea[name="comment-body"]')
//     .value.trim();

//   const post_id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];

//   if (comment_body) {
//     const response = await fetch('/api/comments', {
//       method: 'POST',
//       body: JSON.stringify({
//         post_id,
//         comment_body,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

// document
//   .querySelector('.comment-form')
//   .addEventListener('submit', commentFormHandler);

console.log("ready to post a comment to a post");

const newCommentBtn = document.getElementById("comment");

newCommentBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const comment_body = document.getElementById("comment-name").value;

  console.log(comment_body);

  const url = window.location.href;
  const data = url.split("/");
  const post_id = data[data.length - 1];
  const user_id = data[data.length - 1];

  console.log(post_id);

  await fetch("/api/comment", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_body: comment_body,
      post_id: post_id,
      // user_id: user_id,
    }),
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      window.location.href = `/post/${post_id}`;
    }
  });
});