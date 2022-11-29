/*global window, moment, countryCodeToName, angular */
/*jshint unused:false*/
function loginMagic(){
  if ( ! localStorage.getItem('magic') ) {
    var p = window.prompt("What's the magic word?");
    localStorage.setItem('magic', p );
  }
}

function logoutMagic() {
  localStorage.removeItem('magic');
  window.location.reload();
}

function getMagic(){
  if ( ! localStorage.getItem('magic') ) {
    loginMagic();
  }
  return localStorage.getItem('magic');
}

function getSQLUrl( sql_type, sql_query, args, args2 ){
  var url = 'https://meetingstats.dicole.net/query.jsonp.php';
  url += '?secret='+getMagic();
  url += '&'+sql_type+'='+encodeURIComponent(sql_query);
  var arr=[];
  if(typeof args != 'undefined'){arr.push(args)};
  if(typeof args2 != 'undefined'){arr.push(args2)};
  if(arr.length > 0){
    url += '&args='+encodeURIComponent(JSON.stringify(arr));
  }
  return url;
}

function isValidUrl( url ){
  return (/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(url);
}

function humanizeDate(utcSecondsString){
  var utc = utcSecondsString*1000;
  var date = moment(utc);
  if( utc===0 || !date.isValid() ){
    return utcSecondsString;
  }
  return date.format("YYYY-MM-DD H:mm:ss");
}

function getQueryVariable(variable){
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0,l=vars.length;i<l;i++) {
    var pair = vars[i].split("=");
    if(pair[0] === variable){
      return pair[1];
    }
  }
  return(false);
}

function humanizeSubscription(utcSecondsString){
  var utc = utcSecondsString*1;
  var date = moment(utc*1000);
  if( utc===0 || utcSecondsString===null ){
    return "-";
  }
  if( utc === 1 ){
    return "Started manually";
  }
  if( !date.isValid() ){
    return utcSecondsString;
  }
  return date.format("YYYY-MM-DD H:mm:ss");
}

function getSubscriptionStatus(start,end){
  if( start===0 || start==="0" || start===null || !start){
    return "Not started";
  }
  if( end===0 || end==="0" || end===null || !end ){
    return "Never expires";
  }
  var utc = end*1000;
  var now = new Date().getTime();
  if( now < utc ){
    return "Active";
  }
  return "Expired";
}

function countryFlagHtml(countryCode){
  if(countryCode){
    countryCode_lc = countryCode.toLowerCase();
    var name = countryCodeToName(countryCode_lc);
    if(name === ""){
      name = countryCode;
    }
    return '<img src="/_img/lib/famfamfam_flag_icons/png/'+countryCode_lc+'.png" alt="'+countryCode+'" title="'+countryCode+'"> '+name;
  }
  return "";
}




loginMagic();


var app = angular.module('myApp', []);

app.directive('navi', function(){
  return {
    restrict: 'E',
    scope: {
      active: '@'
    },
    controller: function($scope){
      $scope.navi_items= [
        {
          type:"link",
          name:"Home",
          url:"/admin/"
        },
        {
          type:"link",
          name:"Users",
          url:"/admin/users/"
        },
        {
          type:"link",
          name:"Domains",
          url:"/admin/domains/"
        },
        {
          type:"link",
          name:"Schedulings",
          url:"/admin/schedulings/"
        },
        {
          type:"dropdown",
          name:"Tasks",
          url:"/admin/tasks/",
          children:[
            {
              type:"link",
              name:"Target users",
              url:"/admin/tasks/target/"
            },
            {type:"divider"},
            {
              type:"link",
              name:"Transactions",
              url:"/admin/tasks/transactions/"
            }
          ]
        },
        {
          type:"link",
          name:"SwipeToMeet",
          url:"/admin/swipetomeet/users/"
        },

      ];
    },
    templateUrl: '/admin/_include/navbar.html'

  };
});
