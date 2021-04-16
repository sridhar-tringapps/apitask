//-------------------------------------------------------------------------------------------------------------------------------------------
// SHOW DATA
$(window).on("load", function() 
{
  tkn=sessionStorage.getItem('uniquetoken')
  tkn2 = sessionStorage.getItem('ID')

  console.log("getting id",tkn2)
  view(tkn2);
  function view(btn1) 
  {
    btn = btn1;
    function showdata(temp)
    {
      var show_data = '';
      var u = '';
      u = temp;
      id = u.id
      show_data += '<ul>'
      show_data += '<label>'+'User ID : '+' '+id+ '</label><br/>'
      show_data += '<label>'+'User Name : '+' '+u.name+ '</label><br/>'
      show_data += '<label>'+'User Email : '+' '+u.email+ '</label><br/>'
      show_data += '<label>'+'User Phone : '+' '+u.phone+ '</label><br/>'
      show_data += '<span>' + '<button type="button" class="btn btn-info" id="button1" onclick="edit('+id+')" data-id="{{id}}" > Edit</button> ' + '</span>'
      show_data += '<span>' +'<button type="button" class="btn btn-primary" id="backbtn" onclick="back()"> Back</button>'+ '</span>'
      show_data += '</ul>'
      console.log("success",temp);
      $('#showtable').append(show_data);
    }
    $.ajax ({
      type: "GET",
      datatype: 'JSON',
      url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables/"+tkn2,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer "+tkn
        },
      success: function(temp) 
      {
        showdata(temp);
      }
    });
  }
});

//-------------------------------------------------------------------------------------------------------------------------------------------
//  EDIT
function edit(id)
{
  tkn=sessionStorage.getItem('uniquetoken')
  tkn2=sessionStorage.getItem('ID')
  $(".form").addClass("display1");
  userid=id;
  $save=$(".savebtn");
  $cancel=$(".cancelbtn");
  $cancel.html('<button type="button" class="btn btn-primary" onclick="cancel()">Cancel</button>');
  $save.html('<button type="button" class="btn btn-success" onclick="save('+userid+')">Save</button>');

  console.log("getting from edit",tkn2)
  $.ajax({
    type:"GET",
    datatype: 'JSON',
    url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables/"+tkn2,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer "+tkn
      },
    success: function(temp)
    {
      editdata(temp);
    }
    
  });

  function editdata(temp)
  {
    var show_data='';
    var u = '';
    u = temp;
    console.log(u);
    id=u.id,
    name=u.name,
    email=u.email,
    phone=u.phone
    console.log("edit data",id,email,name,phone);
    $("#id").val(id);
    $("#name").val(name);
    $("#email").val(email);
    $("#phone").val(phone)
  }
}


//-------------------------------------------------------------------------------------------------------------------------------------------
//  SAVE
function save(id)
{
  tkn=sessionStorage.getItem('uniquetoken')
  tkn2=sessionStorage.getItem('ID')
  u_id=id;
  $form=$(".form")
  var user=
  {
    id: $form.find('input#id').val(),
    name: $form.find('input#name').val(),
    email: $form.find('input#email').val(),
    phone: $form.find('input#phone').val(),
  }
  console.log("getting from data",user)

  console.log("getting from save",tkn2)
  $.ajax({
    type:"PUT",
    datatype: 'JSON',
    url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables/"+tkn2,
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer "+tkn
      },
    data:user,
    success:function(temp)
    {
      location.reload();
      display(temp);
      $(".form").removeClass("display1");
      $(".form").addClass("display2");
    },
    error: function()
    {
      alert("error updating order")
    }
  });

  function display(temp)
  {
    var show_data='';
    var u = '';
    u= temp;
    id=u.id
    show_data += '<ul>'
    show_data += '<li>'+'user id      : '+' '+u.id+ '</li>'
    show_data += '<li>'+'user name    : ' +''+u.name+ '</li>'
    show_data += '<li>' +'user email  : ' +''+u.email+ '</li>'
    show_data += '<li>' +'user phone  : ' +''+u.phone+ '</li><br/>'
    show_data += '<span>' +'<button type="button" class="btn btn-primary" id="button1" onclick="edit('+id+')" data-id="{{id}}"> Edit</button>  '+ '<span>'
    show_data += '<span>' +'<button type="button" class="btn btn-primary" id="button1" onclick="back()"> Back</button>'+ '</span>'
    show_data += '</ul>'
    $('#showtable').html(show_data);
  }
}


function back()
{
  window.location.href="sample.html"
}

function cancel()
{
  $(".form").removeClass("display1");
  $(".form").addClass("display2");
}
