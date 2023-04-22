console.log("ready to comment on a post");

function commentFormHandler(event) {
  event.preventDefault();
  console.log(event);

  const comment_body = document.querySelector("#comment-body").value.trim();
  const post_id = window.location.href.split("/").pop();

  if (comment_body && post_id) {
    const response = fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment_body,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

      document.location.reload();
  }
}

document
  .querySelector("#commentBtn")
  .addEventListener("click", commentFormHandler);