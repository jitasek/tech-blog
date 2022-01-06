const createPost = async (postTitle, postContent) => {
  let res = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({
      title: postTitle,
      content: postContent,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    // Post created successfully so now go to the dashboard
    document.location.replace("/dashboard");
    //const data = await res.json();
    //console.log(data);
  } else {
    alert("Something went wrong while creating a post on server sideΩ");
  }
};

let createPostBtn = document.getElementById("create-post");
createPostBtn.addEventListener("click", (e) => {
  let postTitle = document.getElementById("post-title").value.trim();
  let postContent = document.getElementById("post-content").value.trim();
  //Check post title is not empty
  if (postTitle.length === 0) {
    // show error
    alert("Title cannot be empty");
    return;
  }
  // Check if post content is not empty

  createPost(postTitle, postContent);
});
