// Chartbeats
var _sf_async_config={uid:20347,domain:"meetin.gs"};
(function(){
  function loadChartbeat() {
    window._sf_endpt=(new Date()).getTime();
    var e = document.createElement('script');
    e.setAttribute('language', 'javascript');
    e.setAttribute('type', 'text/javascript');
    e.setAttribute('src',
       (("https:" == document.location.protocol) ? "https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/" : "http://static.chartbeat.com/") +
       "js/chartbeat.js");
    document.body.appendChild(e);
  }
  var oldonload = window.onload;
  window.onload = (typeof window.onload != 'function') ?
     loadChartbeat : function() { oldonload(); loadChartbeat(); };
})();


var feedback_widget_options = {};

feedback_widget_options.display = "overlay";
feedback_widget_options.company = "meetings";
feedback_widget_options.placement = "left";
feedback_widget_options.color = "#222";
feedback_widget_options.style = "idea";
//var feedback_widget = new GSFN.feedback_widget(feedback_widget_options);

// Login if loggedin
var squrre = $('<img />').attr('src', '/ws-static/img/squrre.png').css('margin-top', '45px');
$.getJSON('http://meetin.gs/meetings_jsonp/user_is_logged_in?callback=?', function(data) {
    if( window.location.hash && ( window.location.hash === '#frontpage' || window.location.hash === '#whitelist'|| window.location.hash === '#startups' || window.mobileredirect ) ) return;
    if(data.result == 1 ) {
        window.location = 'http://meetin.gs/meetings/login/';
        $('body').css('background', 'none').html('<h1 style="color:#027BB3; margin-top:100px; font-size:46px">Loading your Meetin.gs...</h1>');
        $('body').append( squrre );
    }
});

$(document).ready(function() {
    // Startups
    $('#we-love-startups-wrap').hover(function(){
        $('#we-love-startups-glow').fadeIn();
    }, function(){
       $('#we-love-startups-glow').fadeOut();
    });
    $('#we-love-startups-wrap').click(function(){
        $.colorbox({inline:true, href:'#startups-popup', width:'600px'});
    });

    // Show startups if hash set
    if( window.location.hash && window.location.hash === '#startups' ){
        $.colorbox({inline:true, href:'#startups-popup', width:'600px'});
    }

    // Show whitelist if hash set
    if( window.location.hash && window.location.hash === '#whitelist' ){
        $.colorbox({href:"/ws-static/whitelist.html"});
    }


    // Rotate text
    var slogan = $('#changing-slogan');
    var options = ["like a rockstar","like a guru","like a boss","or go home", "like an expert"];
    var max = options.length;
    var cur = 1;
    setInterval( function(){
        if(cur == max) cur = 0;
        slogan.fadeOut(100, function(){
            slogan.html(options[cur]).fadeIn(100);
            cur = cur + 1;
        });
    }, 8000);

    $('#submit-startup').click(function(e){
        e.preventDefault();
        var data = $('#startups-form').serialize();
        var wrapper = $('#startup-submit-wrapper');
        var button = $('#submit-startup');
        var error = $('<p class="error" style="display:none;">Hey, did you remember to fill all the fields?</p>');
        var success = $('<p class="success" style="display:none;">Great, your now on our VIP startup-list! Be sure to follow trough the meeting wizard to activate your Meetin.gs Pro account.</p>');
        $.post('/ws-static/form_proc.php', data, function(response){
            if(response != 'error'){
                button.fadeOut('fast',function(){
                    wrapper.append(success);
                    success.fadeIn();
                    setTimeout(function(){
                        $.colorbox.close();
                        window.location =  "http://meetin.gs/meetings/wizard";
                    },4000);
                });
            }
            else{
                button.fadeOut('fast',function(){
                    wrapper.append(error);
                    error.fadeIn();
                    setTimeout(function(){ error.fadeOut('fast', function(){ button.fadeIn(); }); }, 3000 );
                });
            }
        });
    });

	$("#blog-bg h2, #blog-bg p").hover(
	  function () {
	    $("#blog-bg").addClass("hover-state");
	  },
	  function () {
	    $("#blog-bg").removeClass("hover-state");
	  }
	);

	$('#show-video').colorbox({html:'<iframe src="http://player.vimeo.com/video/29406548?title=0&amp;byline=0&amp;color=34b5d7&amp;autoplay=1" width="800" height="450" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'});
	$('#show-video2').colorbox({html:'<iframe src="http://player.vimeo.com/video/29406548?title=0&amp;byline=0&amp;color=34b5d7&amp;autoplay=1" width="800" height="450" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'});
	$('.guide').click(function(e){
	    $('#show-video').click();
	});
	var timeout;
    $("#js_email").focus(function(e){
        this.value = '';
        clearTimeout(timeout);
        $("#js_email").css('color', '#7f7e7e');
    });

    $("#js_email").blur(function(e){
        if(this.value == this.defaultValue || this.value == ''){
           this.value = this.defaultValue;
        }
    });

	// Create meeting
	$("#js_create").click(function(e){
	    e.preventDefault();
	    var email_field = $("#js_email");
	    var email = email_field.val();
        var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if(email.search(emailRegEx) == -1){
            email_field.val('Invalid Email');
            email_field.css('color', 'red');
            timeout = setTimeout( function(){
                email_field.val(email);
                email_field.css('color', '#7f7e7e');
            } ,3000);
            return;
        }
        else{
            var form = $('<form id="create_meeting_form" method="post" action="http://meetin.gs/meetings/new_meeting"><input type="hidden" name="email" value="'+email+'"/></form>')
            $("body").append(form);
            $("#create_meeting_form").submit();
        }

	});

	$('#js_email').keypress(function(e) {
        if(e.which == 13) {
            jQuery(this).blur();
            jQuery('#js_create').focus().click();
        }
    });


});
