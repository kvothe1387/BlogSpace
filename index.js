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