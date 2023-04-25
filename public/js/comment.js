console.log("ready to comment on a post");

async function commentFormHandler(event) {
  event.preventDefault();

  const comment_body = document.querySelector("#comment-body").value.trim();
  const post_id = window.location.href.split("/").pop();

  if (comment_body && post_id) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        comment_body,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#commentBtn")
  .addEventListener("click", commentFormHandler);