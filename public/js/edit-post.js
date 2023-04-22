console.log("ready to edit a post");

const editButtonHandler = async (event) => {
  if (event.target.hasAttribute("edit-id")) {
    const id = event.target.getAttribute("edit-id");

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('input[name="post-content"]').value.trim();
  

    const response = await fetch(`/api/post/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_body
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
  .querySelector(".edit-post-form")
  .addEventListener("submit", editButtonHandler);
