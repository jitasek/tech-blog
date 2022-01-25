//console.log("Running dashboard.js");

const deletePost = async (id) => {
  let res = await fetch("/api/posts/" + id, {
    method: "DELETE",
  });
  if (res.status === 200) {
    // Post deleted successfully so now go to the dashboard
    document.location.replace("/dashboard");
    //const data = await res.json();
    //console.log(data);
  } else {
    alert("Something went wrong while creating a post on server sideΩ");
  }
};

const updatePost = (id) => {
  document.location.replace("/dashboard/post/edit/" + id);
};
