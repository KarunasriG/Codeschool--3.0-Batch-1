if (localStorage.getItem("token")) {
  location.href = "./dashboard.html";
}
function login() {
  let email = $("#email").val();
  let password = $("#password").val();
  console.log(email);
  validateEmail();
  validatePassword();

  // Do the validation

  $.ajax({
    url: "http://localhost/blog/api/login.php",
    method: "POST",
    data: {
      email,
      password,
    },
    success: (response) => {
      try {
        console.log(response);
        response = JSON.parse(response);

        if (!response.status) {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
          });
        } else {
          {
            Swal.fire({
              title: "Congrats!",
              text: response.message,
              icon: "success",
            });
            localStorage.setItem("token", response.data.token);
            location.href = "./blogpage.html";
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    error: (response) => {
      console.log(response);
    },
  });
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
