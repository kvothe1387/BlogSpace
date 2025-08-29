fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then(response => response.json())
  .then(data => {

    // limit to first 5 items
    const postArr = data.slice(0, 5)
    let html = ""

    for (let i = 0; i < postArr.length; i++) {
      const post = postArr[i]
      html += `
        <article class="post">
          <span class="post-number">Post #${i + 1}</span>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </article>
      `
    }
    document.getElementById('blog-list').innerHTML = html
  })

// Get the form element
const form = document.querySelector('form')

// Listen for submit event on the form
form.addEventListener('submit', function (e) {
  // prevent the form from refreshing the page
  e.preventDefault()

  // get the values from the form inputs
  const postTitle = document.getElementById('post-title').value
  const postBody = document.getElementById('post-body').value

  // create an object with title & body properties
  const postObject = {
    title: postTitle,
    body: postBody
  };

  // log the object to console
  console.log(postObject)
})