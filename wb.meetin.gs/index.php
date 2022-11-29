<html>
<head>
<link type="text/css" media="all" rel="stylesheet" href="/css/main.css" />	
<script type="text/javascript" src="https://www.google.com/jsapi?key=ABQIAAAAlREXMutgGA6EjDZxRADmPxShNixMuw_IBEr3iXZib2hKZ5QaWRSP-YM35K6My8-bJmrUnF2xBvOSYQ"></script>
<script type="text/javascript">
google.load('feeds', '1');
google.load('dojo', '1.6.0');
google.load('jquery', "1.5.1"); // LOLZ =)
</script>

<script type="text/javascript" src="/js/highcharts.js"></script>
<script type="text/javascript" src="/js/charts.js"></script>
<script type="text/javascript" src="http://highcharts.com/js/modules/funnel.src.js"></script>
<script type="text/javascript" src="http://twitter-friends-widget.googlecode.com/files/jquery.twitter-friends-1.0.min.js"></script>
<script>
var live_chart;
var user_chart;
var x = 0;
var y = 0;

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});


$(document).ready(function() {
	
	$('#twitter-stats').twitterFriends({
       username:'meetin_gs'
	   ,header:'<a href=\'_tp_\'><img src=\'_ti_\'/></a><h2>_fo_ Twitter Followers</h2>'
	   ,user_animate:'width'
	   ,users:10
	   ,user_image:32
    });
   
	update_rss_counts();
	$( '#somestats, #liveusers, #userstats, #weeklyevents, #dailyevents, #weeklyusers, #dailyusers, #eventscumulative, #userscumulative, #funnel' ).fadeIn('slow');   
});

function update_rss_counts() {
    update_rss_count( "http://feeds.feedburner.com/meetin_gs", 'blog_days' );
    update_rss_count( "http://twitter.com/statuses/user_timeline/252745045.rss", 'twit_days' );
    update_rss_count( "http://getsatisfaction.com/meetings/topics.rss?sort=recently_created", 'gets_days' );
}

function update_rss_count( url, id ) {
    var feed = new google.feeds.Feed(url);
    feed.setNumEntries(1);
    feed.load( function( result ) {
        var res = '?';
        if ( result.feed && result.feed.entries && result.feed.entries.length > 0 ) {
            var entry = result.feed.entries.pop();
            var elapsed = new Date().getTime() - new Date(entry.publishedDate).getTime();
            res = Math.floor( elapsed / 1000 / 60 / 60 / 24 );
        }
        dojo.byId( id ).innerHTML = res;
		
		// set colors
		var color;
		if(res > 10) color = "red";
		else if(res > 4) color = "yellow";
		else color = "green";
		var boxid = id + '_box';
		$('#'+boxid).removeClass('box-bg').addClass(color);
		
    } );
}

</script>
</head>
<body>
<div id="wrapper">
	<div id="header-wrapper">
		<div id="header-bg" class="box-bg">
			<div id="header-inset" class="box-inset">
				<div id="twitter-stats">

				</div>
				<div id="wb-title">
					<h1>Meetin.gs Dashboard</h1>
					<a href="http://swixapp.com/analytics/public/15281/reporting/" target="_blank" style="color:#fff;">More stats by Swix</a>
				</div>
				<div id="facebook-stats">
					Facebook Fans: <?php
					$page_id = "182909251746386";
					$xml = @simplexml_load_file("http://api.facebook.com/restserver.php?method=facebook.fql.query&query=SELECT%20fan_count%20FROM%20page%20WHERE%20page_id=".$page_id."") or die ("fail");
					$fans = $xml->page->fan_count;
					print number_format($fans);
					?>
				</div>
			</div>
		</div>
	</div>
<div><a href="http://chartbeat.com/dashboard/?url=meetin.gs&k=x">CHARTBEAT DASHBOARD</a></div>
	<div id="live-users-box" class="box-bg">
		<div id="liveusers" style="display:none;" class="box-inset">
		
		</div>
	</div>
	
	<div id="user-stats-box" class="box-bg">
		<div id="userstats" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="some-stats-box" class="box-bg">
		<div id="somestats" style="display:none;" class="box-inset">	
			<div id="blog_days_box" class="monitor-block box-bg" style="margin-bottom:15px;">
				<span class="monitor-title">Last blog post</span>
				<span id="blog_days" class="monitor-value"></span>
				<span class="monitor-subtitle">days ago</span>
			</div>
			<div id="twit_days_box" class="monitor-block box-bg" style="margin-bottom:15px;">
				<span class="monitor-title">Last tweet</span>
				<span id="twit_days" class="monitor-value"></span>
				<span class="monitor-subtitle">days ago</span>
			</div>
			<div id="gets_days_box" class="monitor-block box-bg">
				<span class="monitor-title">Last GS ticket</span>
				<span id="gets_days" class="monitor-value"></span>
				<span class="monitor-subtitle">days ago</span>
			</div>
		</div>
	</div>
<!--	
	<div id="events-weekly-box" class="box-bg">
		<div id="weeklyevents" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="events-daily-box" class="box-bg">
		<div id="dailyevents" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="users-weekly-box" class="box-bg">
		<div id="weeklyusers" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="users-daily-box" class="box-bg">
		<div id="dailyusers" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="users-daily-box" class="box-bg">
		<div id="eventscumulative" style="display:none;" class="box-inset">
			
		</div>	
	</div>
	
	<div id="users-daily-box" class="box-bg">
		<div id="userscumulative" style="display:none;" class="box-inset">
			
		</div>	
    </div>
-->
    <div>
<a href="#" class="js_mode" x-data='cumulative'>cumulative</a>
<a href="#" class="js_mode" x-data='point'>point</a>
<a href="#" class="js_type" x-data='day'>day</a>
<a href="#" class="js_type" x-data='week'>week</a>
<a href="#" class="js_type" x-data='month'>month</a>
</div>
	<div id="chart-graph-box" class="box-bg" style="float:left; width:1200px">
        <div id="chart" class="box-inset">
        </div>
    </div>
<!--
    <div id="monthly-graph-box" class="box-bg" style="float:left; width:380px">
        <div id="monthly" class="box-inset">
        </div>
    </div>
	<div id="weekly-graph-box" class="box-bg" style="float:left; width:380px">
        <div id="weekly" class="box-inset">
        </div>
    </div>
	<div id="combined-graph-box" class="box-bg" style="float:left; width:380px">
        <div id="combined" class="box-inset">
        </div>
    </div>
-->
	<div id="funnel-x-chart-box" class="box-bg" style="float:left; width:1200px">
        <div id="funnel" class="box-inset">
            
        </div>
	</div>
</div>
</body>
</html>
