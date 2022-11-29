
var attach = function() {

    var hide_timeout = false;

    var show_error = function( message, delay ) {
        if ( hide_timeout ) {
            clearTimeout( hide_timeout );
            hide_timeout = false;
        }

        var error_container = $('#claim_error');
        var error_text_container = $('#claim_error_span');

        error_text_container.text( message );
        error_container.show();

        if ( delay ) {
            hide_timeout = setTimeout( function() { error_container.hide() }, delay );
        }
    };

    if ( typeof($) != 'undefined' || typeof(jQuery) != 'undefined' ) {
        if(!$) var $ = jQuery;
        $('#claim_button').on('click', function(e) {
            e.preventDefault();

            var meet_me_url = $('#claim_try').val();

            if ( ! meet_me_url ) {
                return show_error("The URL must not be empty!", 5000 );
            }

            if ( ! /^(.{3,})$/.test( meet_me_url ) ) {
                return show_error("The URL must contain at least 3 characters!", 5000 );
            }

            if ( ! /[a-zA-Z]/.test( meet_me_url ) ) {
                return show_error("The URL must contain at least one alphabetical character!", 5000 );
            }

            if ( ! /^([a-zA-Z0-9\.\_]+)$/.test( meet_me_url ) ) {
                return show_error("The URL can contain only letters, numbers, underscores (_) and dots (.)!", 5000 );
            }

            var target_host = 'https://meetin.gs';
            var api_host = '/apigw';

            $.ajax( {
                type : 'get',
                url : target_host + api_host + '/v1/users?user_fragment=' + decodeURIComponent( meet_me_url ),
                success : function( response ) {
                    return show_error("Unfortunately this address is already taken. Try another one!", 10000 );
                },
                error : function( a, b, error ) {
                    if ( error && error == 'Not Found' ) {
                        window.location = target_host + '/meetings/wizard?meet_me_url=' + decodeURIComponent( meet_me_url );
                    }
                    else {
                        return show_error("Oops! An unexpected error occured. Please try again!", 10000 );
                    }
                }
            } );
        } );

        // Login if loggedin
        if(window.location.href === 'http://www.meetin.gs/' || window.location.href === 'https://www.meetin.gs/' ){
            $.getJSON('https://meetin.gs/meetings_jsonp/user_is_logged_in?callback=?', function(data) {
                if( window.location.hash && ( window.location.hash === '#frontpage' || window.location.hash === '#whitelist'|| window.location.hash === '#startups' || window.mobileredirect ) ) return;
                if(data.result == 1 ) {
                    window.location = 'https://meetin.gs/meetings/login/';
                    $('body').css('background', 'none').html('<h1 style="color:#027BB3; margin-top:100px; font-size:46px; text-align:center;">Loading your Meetin.gs...</h1>');
                }
            });
        }

    }
    else {
        setTimeout( attach, 100 );
    }
};

attach();

//Reading cookies
function getCookie(c_name){
 var i,x,y,ARRcookies=document.cookie.split(";");
 for (i=0;i<ARRcookies.length;i++){
     x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
     y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
     x=x.replace(/^s+|s+$/g,"");
     if (x==c_name){
         return unescape(y);
     }
 }
 return false;
}

//Redirect mobiles
(function(a,b){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
        if( (window.location.href === 'http://www.meetin.gs/' || window.location.href === 'https://www.meetin.gs/') && getCookie('nomobile') != '1' ){
            window.mobileredirect = true;
            window.location=b;
        }
    }
})(navigator.userAgent||navigator.vendor||window.opera,'https://m.meetin.gs');

