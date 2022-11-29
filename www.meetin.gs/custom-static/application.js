
$(document).bind("mobileinit", function(){
  $.mobile.ajaxEnabled = true;
  $.mobile.buttonMarkup.hoverDelay = 100;
$(function() {
   /* $.getJSON('http://dev.meetin.gs/meetings_jsonp/user_is_logged_in?callback=?', function(data) {
    if(data.result == 1 ) {
        AG.GUI.alert("Error", "Already loggedin");
    }
    else{
        $('#title').html('Login');
        $('#squrre').fadeOut('fast',function(){
            $('input').on('focus',function(e){
                $(this).val('');
            });
            var lf = $('#loginform').fadeIn();
            $('#loginbutton').on('click',function(e){
                 $.getJSON('http://dev.meetin.gs/meetings_jsonp/login?callback=?', { login_login_name: $('#lname').val() , login_password: $('#lpassword').val() }, function(data) {
                     if(data.error){
                            AG.GUI.alert("Error", data.error.message);
                     }
                     else if(data.success){
                        window.location = data.result.url_after_post;
                     }
                 });
            });
        });
    }
});*/
});


