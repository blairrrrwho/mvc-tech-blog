console.log("ready to edit my post");

async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const post_body = document.querySelector('input[name="post-content"]').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);




// const title = document.querySelector('#post-title').value.trim();
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





//   console.log("ready to update post");

// const updatebtn = document.querySelectorAll(".updatebtn");
// console.log(updatebtn);

// for (let update of updatebtn) {
//   update.addEventListener("click", async (e) => {
//     e.preventDefault();

//     update.style.cssText = "display: none";
//     resolveData(e.target.id);
//   });
// }

// const resolveData = (eventID) => {
//   const updateBtn = document.getElementById(eventID);
//   const parent = updateBtn.parentNode;
//   const form = parent.querySelector(".updateform");
//   form.style.display = "block";

//   const newBtn = form.querySelector(".inputUpdateFields");

//   newBtn.addEventListener("click", async () => {
//     const post_sub = form.querySelector("#updatepostsub").value;
//     const post_descr = form.querySelector("#updatepostdescr").value;
//     const post_id = eventID;

//     await fetch("/api/dashboard", {
//       method: "PUT",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         post_sub: post_sub,
//         post_descr: post_descr,
//         post_id: post_id,
//       }),
//     }).then((res) => {
//       console.log(res);
//       if (res.status == 200) {
//         window.location.href = "/dashboard";
//       }
//     });
//   });
// };