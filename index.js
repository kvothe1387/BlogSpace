fetch('https://apis.scrimba.com/jsonplaceholder/posts')
  .then(response => response.json())
  .then(data => {
    // limit to first 5 items
    const firstFivePosts = data.slice(0, 5)

    console.log(firstFivePosts)
  })