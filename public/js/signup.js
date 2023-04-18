const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const bio = document.querySelector('#github-signup').value.trim();


  if (name && email && password && bio)  {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, bio }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Something is wrong with your credintials");
    }
  }
};
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);