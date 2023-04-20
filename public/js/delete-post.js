console.log("ready to delete a post");

const name = document.querySelector('#post-name').value.trim();
const description = document.querySelector('#post-desc').value.trim();

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