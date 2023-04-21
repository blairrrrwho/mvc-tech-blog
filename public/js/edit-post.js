console.log("ready to edit a post");

// async function editFormHandler(event) {
//   event.preventDefault();

//   const title = document.querySelector('input[name="post-title"]').value;
//   const post_body = document.querySelector('input[name="post-content"]').value;
//   const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];

//   const response = await fetch(`/api/post/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify({
//       title,
//       post_body,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     document.location.replace(`/dashboard/edit/${id}`);
//   } else {
//     alert(response.statusText);
//   }
// }

// document
//   .querySelector('.edit-post-form')
//   .addEventListener('submit', editFormHandler);




  const editButtonHandler = async (event) => {
    if (event.target.hasAttribute("edit-id")) {
      const id = event.target.getAttribute("edit-id");
  
      const response = await fetch(`/api/post/${id}`, {
        method: "PUT",
      });
  
      if (response.ok) {
        document.location.replace("/edit-post");
      } else {
        alert("Failed to edit post");
      }
    }
  };
  
  document
    .querySelector(".edit-post-form")
    .addEventListener("submit", editButtonHandler);
  



// const title = document.querySelector('.post-title').value.trim();
// const post_body = document.querySelector('post-content').value.trim();

// const editFormHandler = async (event) => {
//   event.preventDefault();

//   const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];

//   if (title && post_body) {
//     const response = await fetch(`/api/post/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         title: title,
//         post_body: post_body,
//       }),
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/dashboard/');
//     } else {
//       alert('Failed to edit post');
//     }
//   }
// }

// document
//   .querySelector('.edit-post-form')
//   .addEventListener('submit', editFormHandler);