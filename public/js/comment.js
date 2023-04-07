console.log("ready to post a comment to a post");

const newCommentBtn = document.getElementById("newComment");

newCommentBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const comment_body = document.getElementById("comment").value;

  console.log(comment_body);

  const url = window.location.href;
  const data = url.split("/");
  const post_id = data[data.length - 1];

  console.log(post_id);

  await fetch("/api/newcomment", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment_body: comment_body,
      post_id: post_id,
    }),
  }).then((res) => {
    console.log(res);
    if (res.status == 200) {
      window.location.href = `/post/${post_id}`;
    }
  });
});