$(document).ready(function () {
  $(".form1").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      message: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      name: {
        required: "Please enter your name",
        minlength: "Name must be at least 2 characters"
      },
      email: {
        required: "Please enter your email",
        email: "Enter a valid email address"
      },
      message: {
        required: "Please enter a message",
        minlength: "Message must be at least 10 characters"
      }
    },
    errorClass: "error-text",
    submitHandler: function (form, e) {
      const name = $("input[name='name']").val().trim();
      const email = $("input[name='email']").val().trim();
      const message = $("textarea[name='message']").val().trim();

      const data = {
        data: {
          name,
          email,
          message
        }
      };

      $("#btnText").addClass("d-none");
      $("#btnLoader").removeClass("d-none");
      $("#submitbtn").attr("disabled", true);
      $("#alertBox").slideUp();

      fetch("https://sheetdb.io/api/v1/kf6c54eewi1u2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(json => {
          $(".form1")[0].reset();
          showAlert("✅ Message sent successfully!", "success");
        })
        .catch(error => {
          console.error("Error:", error);
          showAlert("❌ Failed to send message. Please try again.", "danger");
        })
        .finally(() => {
          $("#btnText").removeClass("d-none");
          $("#btnLoader").addClass("d-none");
          $("#submitbtn").attr("disabled", false);
        });
    }
  });

  function showAlert(message, type) {
    $("#alertBox")
      .html(`<div class="alert alert-${type}" role="alert">${message}</div>`)
      .hide()
      .slideDown()
      .delay(3000)
      .slideUp();
  }
});
