/*let createCommentBtn = document.getElementById("create-comment");
createCommentBtn.addEventListener("click", (e) => {
  let commentText = document.getElementById("comment-text").value.trim();

  //Check comment text is not empty
  if (commentText.length === 0) {
    // show error
    alert("Comment cannot be empty");
    return;
  }

  createComment(commentText);
});
*/

async function postComment(postId) {
  let commentText = document.getElementById("comment-text").value.trim();
  //Check comment text is not empty
  if (commentText.length === 0) {
    // show error
    alert("Comment cannot be empty");
    return;
  }
  let res = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      commentText,
      postId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 200) {
    // Comment created successfully -> go to the dashboard
    document.location.replace("/dashboard/post/" + postId);
  } else {
    alert("Something went wrong while creating a comment on server side");
  }
}
