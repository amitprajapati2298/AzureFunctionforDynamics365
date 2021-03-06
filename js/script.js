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
  const AzureFunctionURL = "http://localhost:7071/api/SendResponse";
  $.ajax({
    type: "POST",
    url: AzureFunctionURL,
    data: JSON.stringify(payload),
    success: function(data){
      if(data.StatusCode == 200){
        alert("Message Posted to Dynamics")
      }
    },
    error:function(data){
      alert("Azure Function Internal Server Error");
    }
  });
})