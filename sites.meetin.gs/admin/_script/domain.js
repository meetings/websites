/*jshint -W069 */
/* exported ShowTooltip, HideTooltip, init */
/* global getSQLUrl, console, d3, getQueryVariable, alert, loadWeekMap, isValidUrl, app */


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// User invite tree
var query_domain = getQueryVariable("domain");

var domain_url = getSQLUrl('sql','domain_stats',query_domain);


app.controller('DomainController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  $http({
    method: 'JSONP',
    url: domain_url + '&callback=JSON_CALLBACK'
  }).success(function(dataInput) {
    var data = dataInput[0];

    $window.document.title = 'Domain: @' + data.domain;

    $scope.domain = data.domain;
    $scope.domain_img_url = 'http://free.pagepeeker.com/v2/thumbs.php?size=m&url='+encodeURIComponent(data.domain);
    // $scope.domain_img_url = '';

    if(isValidUrl('http://'+data.domain)){
      $scope.domain_url = 'http://'+data.domain;
    }
    // $scope.domain_url

    $scope.stats = {};
    $scope.stats.users                  = data.users;
    $scope.stats.meetings_created       = data.meetings_created;
    $scope.stats.real_meetings_created  = data.real_meetings_created;
    $scope.stats.invites_sent           = data.invites_sent;
    $scope.stats.ios_users              = data.ios_users;
    $scope.stats.tos_accepted           = data.tos_accepted;
    $scope.stats.subscription_freemium  = data.subscription_freemium;
    $scope.stats.subscription_trial     = data.subscription_trial;
    $scope.stats.subscription_user      = data.subscription_user;
    $scope.stats.subscription_company   = data.subscription_company;
    $scope.stats.subscription_sponsored = data.subscription_sponsored;
    $scope.stats.meet_me                = data.meet_me;
    $scope.stats.appdirect              = data.appdirect;
    $scope.stats.quickmeet              = data.quickmeet;

    if(data.real_meetings_created<5000){
      loadWeekMap();
    }else{
      $('#loadWeekMap').on('click',function(){
        loadWeekMap();
      });
    }

  }).error(function() {
    alert("Some error occurred in stats data");
  });


}]);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// User invite tree

function initTree(treeData){

  var containerName = "#tree";

  function visit(parent, visitFn, childrenFn) {
    if (!parent) {return;}
    visitFn(parent);

    var children = childrenFn(parent);
    parent.offspringCount = 0;
    if (children) {
      var count = children.length;
      parent.childCount = count;
      parent.offspringCount = count;
      for (var i = 0; i < count; i++) {
        visit(children[i], visitFn, childrenFn);
        parent.offspringCount += children[i].offspringCount;
      }
      if(parent.children){
        parent.children.sort(function(a,b){
          if(a.offspringCount>b.offspringCount){
            return -1;
          }
          if(a.offspringCount<b.offspringCount){
            return 1;
          }
          if(a.internal && !b.internal){
            return -1;
          }
          if(!a.internal && b.internal){
            return 1;
          }
          return 0;
        });
      }
    }
  }

  // Calculate total nodes, max label length
  var totalNodes = 0;
  var maxLabelLength = 0;
  visit(treeData, function(d){
      totalNodes++;
      maxLabelLength = Math.max(d.name.length, maxLabelLength);
  }, function(d){
      return d.children && d.children.length > 0 ? d.children : null;
  });

  // size of the diagram
  var size = { width:$(containerName).outerWidth(), height: totalNodes * 15};

  // ************** Generate the tree diagram  *****************
  var margin = {top: 20, right: 120, bottom: 20, left: 0};
  // var width = 1140 - margin.right - margin.left;
  // var height = 1500 - margin.top - margin.bottom;
  var width = size.width;
  var height = size.height;

  var i = 0;

  var nodeRadius= 5;

  var tree = d3.layout.tree()
   .size([height, width]);

  var diagonal = d3.svg.diagonal()
   .projection(function(d) { return [d.y, d.x]; });

  var svg = d3.select(containerName).append("svg")
   .attr("width", width + margin.right + margin.left)
   .attr("height", height + margin.top + margin.bottom)
    .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");




  function update(source) {

    // Compute the new tree layout.
    var nodes = tree.nodes(source).reverse();
    var links = tree.links(nodes);

    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    // Declare the nodes
    var node = svg.selectAll("g.node")
     .data(nodes, function(d) { return d.id || (d.id = ++i); });

    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
     .attr("class", function(d){
      return "node depth_"+d.depth;
     })
     .attr("transform", function(d) {
      return "translate(" + d.y + "," + d.x + ")"; })
     .attr("title", function(d){return d.title;})
     .on("click", function(d) { navigate(d); });

    nodeEnter.append("circle")
     .attr("r", nodeRadius)
     .attr("class",function(d){
      if(!d.internal){
        return "external";
      }
     });

    nodeEnter.append("text")
     .attr("x", function(d) {
      return d.children || d._children ? -13 : 13; })
     .attr("dy", ".35em")
     .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start"; })
     .text(function(d) { return d.name; })
     .style("fill-opacity", 1);

    // Declare the links
    var link = svg.selectAll("path.link")
     .data(links, function(d) { return d.target.id; });

    // Enter the links.
    link.enter().insert("path", "g")
     .attr("class", function(d){
      return "link src_depth_"+d.source.depth;
     })
     .attr("d", diagonal);

    nodeEnter.append("title").text(function(d) { d.title = (d.title)?d.title:""; return d.title; });

  }

  function navigate(d) {
    window.location = "/admin/users/user/?id="+d.id;
  }


  var root = treeData;

  update(root);
}


function getTitle(id,first_name,last_name,email){
  var title = "#";
  title += id;
  title += (first_name)?" "+first_name:"";
  title += (last_name)?" "+last_name:"";
  title += (email)?" <"+email+">":"";
  return title;
}

function getName(first_name, last_name, email){
  if(first_name && last_name){
    return first_name +" "+last_name;
  }
  if(first_name){
    return first_name;
  }
  if(last_name){
    return last_name;
  }
  return email;
}

function getUser(data,internal){
  var user = {};
  user = {};
  user.name = getName(data["first_name"],data["last_name"],data["email_orig"]);
  user.id = data["user_id"];
  user.hasInvited = [];
  user.children = [];
  user.data = data;
  user.internal = internal;
  user.title = getTitle(user.id, data["first_name"],data["last_name"],data["email_orig"]);
  return user;
}

function solveChildren(users){
  var external_users = {};
  for(var id in users){
    if(users[id].data.inviter_id && users[id].data.inviter_id !== "0"){
      if(users[users[id].data.inviter_id]){
        users[users[id].data.inviter_id].hasInvited.push(id);
      }else{
        var d = {
          user_id: users[id].data.inviter_id,
          first_name: users[id].data.inviter_name
        };
        external_users[users[id].data.inviter_id] = getUser(d,false);
        external_users[users[id].data.inviter_id].hasInvited.push(id);
      }
    }
  }
  for(id in external_users){
    users[id] = external_users[id];
  }
}

function getChildrenRecursive(arr,users){
  var children = [];
  if(arr.length>0){
    for(var i=0,l=arr.length;i<l;i++){
      if(users[arr[i]]){
        users[arr[i]].children = getChildrenRecursive(users[arr[i]].hasInvited,users);
        children.push(users[arr[i]]);
      }else{
        console.error(arr[i],"was not found");
      }
    }
  }
  return children;
}

function buildTree(users){
  var tree = [];
  for(var id in users){
    if(!users[id].data.inviter_id || users[id].data.inviter_id === "0"){
      users[id].children = getChildrenRecursive(users[id].hasInvited,users);
      tree.push(users[id]);
    }
  }
  return {name:"/",children:tree};
}



function filterTree(tree){
  var removeArr = [];
  for(var i=0,l=tree.children.length;i<l;i++){
    if(tree.children[i].children.length===0){
      removeArr.push(i);
    }
  }
  for(i=removeArr.length;i>0;i--){
    tree.children.splice(removeArr[i-1],1);
  }
}

function drawGraph(data){

  var users = {};
  for(var i=0,l=data.length;i<l;i++){
    var id = data[i]["user_id"];
    users[id] = getUser(data[i],true);
  }

  solveChildren(users);
  var tree = buildTree(users);

  filterTree(tree);

  initTree(tree);
}








/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Domain user listing and user tree data init

var domain_users_url = getSQLUrl('sql','domain_users',query_domain);


$(document).ready( function () {

  var maxEmailLength = 53;

  function prepareData(data){
    $('#global_regex').prop('checked', $('#users').DataTable().settings()[0].oSavedState.search.regex );

    for ( var i=0, ien=data.length ; i<ien ; i++ ) {
      data[i]["user_id"] = data[i]["id"];
      if(data[i]["id"]){
        data[i]["id"] = '<a href="../../users/user/?id='+data[i]["id"]+'">'+data[i]["id"]+'</a>';
      }
      data[i]["email_orig"] = data[i]["email"];
      if(data[i]["email"]){
        if(data[i]["email"].length>maxEmailLength){
          data[i]["email"] = data[i]["email"].substring(0,maxEmailLength);
        }
      }

    }
    drawGraph(data);
    return data;
  }

  function addEmailEllipses(data, type, full){
    var title ="";
    if(full.email_orig.length > maxEmailLength-3){
      title = full.email_orig;
    }
    return '<span class="col_ellipses" title="'+title+'">'+data+'</span>';
  }

  //var table =
  $('#users').DataTable({
      "order":[0,'asc'],
      "lengthMenu": [[10, 25, 50, 100, 250, 500, 1000, -1], [10, 25, 50, 100, 250, 500, 1000, "All"]],
      "dom": 'T<"clear">lCfrtip',
      "sAjaxDataProp":"",
      "deferRender": true,
      "stateSave": true,
      // "bAutoWidth": false,
      "ajax": function(data, callback){
        $.ajax(
          domain_users_url,
          {
            "dataType": "jsonp",
            "success": function(data){
              callback(prepareData(data));
            }
          }
        );
      },


      columnDefs: [
        {  mData: "id",            title: 'ID',            targets: 0 },
        {  mData: "email",         title: 'Email',         targets: 1, sClass: "td_email", mRender: addEmailEllipses },
        {  mData: "first_name",    title: 'First name',    targets: 2 },
        {  mData: "last_name",     title: 'Last name',     targets: 3 },
        {  mData: "title",         title: 'Title',         targets: 4 },
        {  mData: "organization",  title: 'Organization',  targets: 5 },
        {  visible: false,         targets: [] },
        {  orderable: false,       targets: [] },
      ],

    });


});