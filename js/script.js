$('.btn-send').click(function(){
  debugger;
  var firstname = $('#contact-first-name').val();
  var lastname = $('#contact-last-name').val();
  var companyname = $('#contact-company-name').val();
  var email = $('#contact-email').val();
  var subject = $('#contact-subject').val();
  var message = $('#contact-msg').val();
  var payload = {
    'firstname':firstname,
    'lastname':lastname,
    'companyname':companyname,
    'email':email,
    'subject':subject,
    'message':message
  };
  const AzureFunctionURL = "https://crmazurefunction.azurewebsites.net/api/SendResponse";
  $.ajax({
    type: "POST",
    url: AzureFunctionURL,
    data: payload,
    success: function(data){
      console.log(data);
    },
    error:function(data){
      console.log(data);
    }
  });
})