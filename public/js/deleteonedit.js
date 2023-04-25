// console.log(ready to delete post on edit form);


// async function deleteFormHandler(event) {
//     event.preventDefault();

//     const post_id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1
//     ];

//     const response = await fetch(`/dashboard/edit/${post_id}`, {
//         method: 'DELETE'
//     });

//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert(response.statusText);
//     }
// }

// document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);