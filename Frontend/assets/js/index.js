$("#submit").on("click",function(){
    $div=$("#div");
    var user = 
    {
      email: $div.find('input.email').val(),
      password: $div.find('input.password').val(),
    }
    console.log(user)
  
    function jwt(token)
    {
      jwttoken = token;
      console.log("token",jwttoken)
      sessionStorage.setItem("uniquetoken",jwttoken)
      tkn=sessionStorage.getItem('uniquetoken'),
      console.log("tkn",tkn)
      $.ajax({
        url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorisation": "Bearer "+tkn
        },
        type:"GET",
        datatype: 'JSON',
        success: function (temp){
          console.log(temp.data)
          window.location.href="sample.html?t="+tkn;
        },
        error: function(temp)
        {
          console.log(temp.token)
        }
      });
    }
    $.ajax({
      type:"POST",
      datatype: 'JSON',
      url: "https://lit-hamlet-80953.herokuapp.com/authenticate",
      data:user,
      success: function(temp){
        console.log(temp.auth_token);
        token = temp.auth_token;
        jwt(token);
      }
    });
  });