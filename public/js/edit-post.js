console.log("ready to edit a post");

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute("edit-id")) {
    const id = event.target.getAttribute("edit-id");

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('input[name="post-content"]').value.trim();
    // const edit_id = window.location.href.split("/").pop();
  //   const post_id = window.location.toString().split('/')[
  //     window.location.toString().split('/').length - 1
  // ];

    const response = await fetch(`/api/post/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_body,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to edit post");
    }
  }
};

document
  .querySelector("#saveBtn")
  .addEventListener("submit", editButtonHandler);

