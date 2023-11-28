$(document).ready(function () {
  console.log("Hello Blogs");

  getblog();
});

function addBlog() {
  let title = $("#title").val();
  let description = $("#description").val();
  let image = $("#image").val();
  let formdata = $("#addBlog");
  console.log("Yeah Working");
  console.log(title);
  console.log(description);

  $.ajax({
    url: "http://localhost/Blog/api/addBlog.php",
    method: "POST",
    data: {
      title,
      description,
      image,
    },
    success: function (response) {
      console.log(response);
      formdata[0].reset();
      getblog();
    },
    error: function (response) {
      console.log(response);
    },
  });
}
function getblog() {
  $.ajax({
    url: "http://localhost/Blog/api/getBlogs.php",
    method: "GET",
    success: function (data) {
      console.log("Getting Blogs");
      $(".row").html(data);
    },
    error: function (response) {
      console.log(response);
    },
  });
}
