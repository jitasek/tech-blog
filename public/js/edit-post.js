const editPost = async (postId, postTitle, postContent) => {
  let res = await fetch("/api/posts/" + postId, {
    method: "PUT",
    body: JSON.stringify({
      id: parseInt(postId),
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
    alert("Something went wrong while updating the post on server sideΩ");
  }
};

let editPostBtn = document.getElementById("edit-post");
editPostBtn.addEventListener("click", (e) => {
  let postTitle = document.getElementById("post-title").value.trim();
  let postContent = document.getElementById("post-content").value.trim();
  let postId = document.getElementById("post-id").textContent.trim();
  //Check post title is not empty
  if (postTitle.length === 0) {
    // show error
    alert("Title cannot be empty");
    return;
  }
  // Check if post content is not empty
  editPost(postId, postTitle, postContent);
});
