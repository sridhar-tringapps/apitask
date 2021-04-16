$(window).on("load",function() {
  tkn=sessionStorage.getItem('uniquetoken')


  function showdata(tables){
    $("#div").removeClass("display1");
    $("#div").addClass("display2");
    var table_data = '';
    console.log(tables);
    $.each(tables, function(i, table) {
      btn1 = table.id
      table_data += '<tr>'
      table_data += '<td>' + btn1 + '</td>'
      table_data += '<td>' + table.name + '</td>'
      table_data += '<td>' + table.email + '</td>'
      table_data += '<td>' + table.phone + '</td>'
      table_data += '<td>' +'<button type="button" class="btn btn-primary" value=' + table.id + ' onclick="items(value)" > Show </button>'+ '</td>'
      table_data += '<td>' +'<button type="button" class="btn btn-danger" value=' + table.id + ' onclick="destroy(value)"  > Delete</button> ' + '</td>'
      table_data += '</tr>'
    });

    $('#listtable').append(table_data);
  }

  $.ajax({
    type:'GET',
    datatype:'JSON',
    url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer "+tkn
      },
      success: function(tables){
        showdata(tables);
      },
      error: function(){
        alert("Not authorised");
      }
  });
});

//-------------------------------------------------------------------------------------------------------------------------------------------
//  SHOW BUTTON
function items(id)
{
  table_id= id;
  sessionStorage.setItem("ID",table_id)
  window.location.href = "show.html"; 
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//  DESTROY
function destroy(id)
{
  user_id = id;
  console.log("getting data",user_id)
  $.ajax ({
    type: "DELETE",
    datatype: 'JSON',
    url: "https://lit-hamlet-80953.herokuapp.com/api/v1/tables/"+$(this).attr("user_id"),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer "+tkn
      },
    success: function(users)
    {
      console.log("getting",users)
      temp=users;
      $(temp).remove();
      window.location.reload();
    }
  });
}

//-------------------------------------------------------------------------------------------------------------------------------------------
//  LOGOUT
function logout(page){
  window.location.href = "index.html";
  sessionStorage.clear();
}