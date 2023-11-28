// alert("helloo");
if (localStorage.getItem("token")) {
  location.href = "./blogpage.html";
}
function validateForm() {
  validateUsername();
  validateEmail();
  validatePassword();
  validateCPassword();
}

function register() {
  let username = $("#username").val();
  let email = $("#email").val();
  let password = $("#password").val();

  validateForm();

  $.ajax({
    url: "http://localhost/Blog/api/register.php",
    method: "POST",
    data: {
      username,
      email,
      password,
    },
    success: (response) => {
      response = JSON.parse(response);
      if (!response.status) {
        // alert(response.message);
        Swal.fire({
          title: "Error!",
          text: response.message,
          icon: "error",
        });

        return false;
      }

      Swal.fire({
        title: "Good job!",
        text: response.message,
        icon: "success",
      });
      location.href = "./login.html";
    },
    error: (response) => {
      console.log(response);
    },
  });
}

//Username Validations

function validateUsername() {
  var username = document.getElementById("Username").value;

  var namestr = /^[A-Za-z ]+$/;
  document.getElementById("username-Error").innerHTML = "";
  if (username === "") {
    document.getElementById("username-Error").innerHTML =
      "Username is required";
    return false;
  }
  if (username != "" && namestr.test(username) == false) {
    document.getElementById("username-Error").style.display = "block";
    document.getElementById("username-Error").innerHTML =
      "Name must be alphabets only";
    return false;
  } else {
    document.getElementById("username-Error").style.display = "none";
  }
}

//Email validations

function validateEmail() {
  var email = document.getElementById("email").value;
  document.getElementById("email-Error").innerHTML = "";
  var str = /^[\w\+\'\.-]+@[\w\'\.-]+\.[a-zA-Z]{2,}$/;
  if (email === "") {
    document.getElementById("email-Error").innerHTML = "Email is required";
    return false;
  }
  if (email != "" && str.test(email) == false) {
    // document.getElementById("email-Error").style.display = "block";
    document.getElementById("email-Error").innerHTML = "Invalid Email id";
    return false;
  }
}

//Password validations
function validatePassword() {
  var password = document.getElementById("password").value;

  document.getElementById("password-Error").innerHTML = "";
  var strongpass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,}$/;
  if (password === "") {
    document.getElementById("password-Error").innerHTML =
      "Password is required";
    return false;
  }

  if (password != "" && strongpass.test(password) == false) {
    document.getElementById("password-Error").style.display = "block";
    document.getElementById("password-Error").innerHTML =
      "Password must contain:<br> At least 7 characters <br>At least 1 number<br> At least 1 lowercase character (a-z)<br> At least 1 uppercase character (A-Z)<br> At least 1 special character (! @ # $)";
    return false;
  }
}

//Confirm Password
function validateCPassword() {
  var password = document.getElementById("password").value;
  var cpassword = document.getElementById("cpassword").value;

  document.getElementById("cpassword-Error").innerHTML = "";
  if (cpassword == "") {
    document.getElementById("cpassword-Error").innerHTML =
      "Confirm your Password";
    return false;
  }
  if (cpassword != "" && password != cpassword) {
    document.getElementById("cpassword-Error").style.display = "block";
    document.getElementById("cpassword-Error").innerHTML =
      "Password doesnot match";
    return false;
  }
  if (password == cpassword) {
    document.getElementById("cpasswordError").style.display = "none";
  }
}
