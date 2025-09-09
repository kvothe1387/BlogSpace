let posts = []
const titleInput = document.getElementById('post-title')
const bodyInput = document.getElementById('post-body')

// Function To Render a Single Post or Array of Posts 
function renderPosts(postData, prepend = false) {
  // Handle Both Single Post & Array of Posts
  const postsToRender = Array.isArray(postData) ? postData : [postData]

  let html = ""
  postsToRender.forEach((post, index) => {
    // For initial load, use sequential numbering
    // For new posts, use "New Post" label
    const postLabel = prepend ? "New Post" : `Post #${posts.length - postsToRender.length + index + 1}`

    html += `
      <article class="post">
          <span class="post-number">${postLabel}</span>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </article>
    `;
  })

  const blogList = document.getElementById('blog-list')

  if (prepend) {
    // Add New Post To The Beginning
    blogList.insertAdjacentHTML("afterbegin", html)
  } else {
    // Replace All Content (for intital load)
    blogList.innerHTML = html
  }
}

// Initial Fetch & Render
fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then(response => response.json())
  .then(data => {
    // Store First 5 Items & Render Them
    posts = data.slice(0, 5)
    renderPosts(posts)
  })
  .catch(error => {
    console.error('Error fetching posts:', error)
    document.getElementById('blog-list').innerHTML = '<p>Error loading posts. Please try again later.</p>'
  })

// Form Submission Handler 
document.getElementById("new-post").addEventListener("submit", function (e) {
  e.preventDefault()
  // Get Form Values
  const postTitle = titleInput.value
  const postBody = bodyInput.value

  // Validate Inputs
  if (!postTitle.trim() || !postBody.trim()) {
    alert('Please fill in both title and body fields.')
    return;
  }

  // Create New Post Object
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
      // Add To Posts Array & Render
      posts.unshift(data) // Add To Beginning Of Array
      renderPosts(data, true) // Render Single Post, Prepended

      // Clear The Form Out
      titleInput.value = ''
      bodyInput.value = ''
    })
    .catch(error => {
      console.error('Error Ceating Post:', error)
      alert('Failed To Create Post, Please Try Again')
    })
})





