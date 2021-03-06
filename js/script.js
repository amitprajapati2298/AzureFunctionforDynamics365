$('.btn-send').click(function() {

  //Initialing the Loading using Sweet Alert
  Swal.fire({
      title: "Submitting...",
      text: "Posting Data to Dynamics 365",
      showConfirmButton: false,
      onOpen: () => {
          Swal.showLoading();
      },
      allowOutsideClick: false
  });

  //Assign values from the HTML form to JS Variable
  var firstname = $('#contact-first-name').val();
  var lastname = $('#contact-last-name').val();
  var companyname = $('#contact-company-name').val();
  var email = $('#contact-email').val();
  var subject = $('#contact-subject').val();
  var message = $('#contact-msg').val();

  //Adding data to validation array to validation is any data is empty
  var validationArray = [firstname, lastname, companyname, email, subject, message];
  var isValid = true;

  //Validating data is "" or emptystring
  validationArray.forEach(item => {
      if (item === "") {
          isValid = false;
      }
  })

  //If All data is present
  if (isValid) {
      //Creating payload for Post Request
      var payload = {
          'firstname': firstname,
          'lastname': lastname,
          'companyname': companyname,
          'email': email,
          'subject': subject,
          'message': message
      };

      //Declaring the Azure Function URL in costant
      const AzureFunctionURL = "https://crmazurefunction.azurewebsites.net/api/SendResponse";

      //Creating Ajax Request to post data to Dynamics 365
      $.ajax({
          type: "POST",
          url: AzureFunctionURL,
          data: JSON.stringify(payload),
          success: function(data) {
              //If Record is created in Dynamics 365
              if (data.StatusCode == 200) {
                  Swal.fire({
                      title: "Finished!",
                      icon: "success",
                      text: "Case is created in Dynamics 365. Our Sales team will connect with you in 2-3 business days",
                      onOpen: () => {
                          Swal.hideLoading();
                      },
                      showConfirmButton: false,
                  });
              }
              location.reload();
          },
          error: function(data) {
              //If any error while processing the data
              Swal.fire({
                  title: "Error",
                  icon: "error",
                  text: "Azure Function: Internal Server Error",
                  footer: "<a href='https://www.linkedin.com/in/amitprajapati22/'>Contact Admin</a>",
                  onOpen: () => {
                      Swal.hideLoading();
                  },
                  showConfirmButton: false,
              });
              location.reload();
          }
      });
  }else{
    Swal.fire({
      title: "Error",
      icon: "error",
      text: "Please Enter all the details",
      onOpen: () => {
          Swal.hideLoading();
      },
      showConfirmButton: false,
  });
  }

})