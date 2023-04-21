// async function deleteFormHandler(event) {
//   event.preventDefault();

//   const id = window.location.toString().split('/')[
//     window.location.toString().split('/').length - 1
//   ];

//   const response = await fetch(`/api/post/${id}`, {
//     method: 'DELETE',
//     body: JSON.stringify({
//       post_id: id,
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     document.location.replace('/dashboard/');
//   } else {
//     alert(response.statusText);
//   }
// }


// document
//   .querySelector('.delete-post-btn')
//   .addEventListener('click', deleteFormHandler);

const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#post-name').value.trim();
  const description = document.querySelector('#post-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title: name,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);