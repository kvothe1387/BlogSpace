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

document.getElementById("new-post").addEventListener("submit", function (e) {
  e.preventDefault()
  // get the values from the form inputs
  const postTitle = document.getElementById('post-title').value
  const postBody = document.getElementById('post-body').value
  // create an object with title & body properties
  const newPost = {
    title: postTitle,
    body: postBody
  }
  const options = {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json"
    }
  }

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then(respone => respone.json())
    .then(data => {
      // Insert new post at the top of the blog list
      document.getElementById('blog-list').insertAdjacentHTML("afterbegin", `
        <article class="post">
          <span class="post-number">New Post</span>
          <h3>${data.title}</h3>
          <p>${data.body}</p>
        </article>
      `)
    })

})





