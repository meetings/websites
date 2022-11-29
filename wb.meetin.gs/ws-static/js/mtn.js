$(document).ready(function() {
	$(".features-show").colorbox({width:"900px", height:"820px", inline:true, href:"#features-container"});
	$.getFeed({
       url: '/ws-static/feed_proxy.php',
       success: function(feed) {

            var html = '';

            for(var i = 0; i < feed.items.length && i < 2; i++) {

                var item = feed.items[i];

                html += ''
                + '<a class="blog-link" href="'
                + item.link
                + '">'
                + item.title
                + ' &raquo;</a>'
                + '';
            }

            $('#feeditems').append(html);
			$('.blog-link').first().addClass('first-blog-link');			
       }
   });
	$.getFeed({
       url: '/ws-static/tweet_proxy.php',
       success: function(feed) {
			
            var html = '';

            for(var i = 0; i < feed.items.length && i < 1; i++) {

                var item = feed.items[i];

                html += ''
                + '<a class="tweet-link" href="'
                + item.link
                + '">'
                + item.title
                + '</a>'
                + '';
            }
			
			//html = html.replace('meetin_gs:','<a href="http://twitter.com/meetin_gs" target="_blank"></a>');
            $('#latest-tweet').append(html);
       }
   });
});