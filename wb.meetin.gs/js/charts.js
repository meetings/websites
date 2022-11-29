chart_type = 'day';
chart_mode = 'cumulative';

$(document).ready(function() {
	var funnel_chart, live_chart, user_events_chart, user_chart, events_by_week, events_by_month, users_by_week, users_by_month, events_by_month_cumulative, user_by_month_cumulative;
	var devmode = $.getUrlVar('dev');
	var jsonpurl = "http://staging.meetin.gs/meetings_jsonp/usage_stats";
	if(devmode) jsonpurl = "http://dev.meetin.gs/meetings_jsonp/usage_stats";
	
	$.ajax({
		url : jsonpurl,
		dataType : "jsonp" ,
		success : function(ret){

            // we need defaults at least for this
            $.each(
                {
                    'users_who_have_used_on_at_least_n_days_this_month' : {},
                },
                function ( key, def ) {
                    if ( ! ret.site_stats[ key ] ) {
                        ret.site_stats[ key ] = def;
                    }
                }
            );

            var funnels = [
                {
                    name : 'Used last month / all',
                    value : ret.site_stats.users_who_have_used_on_at_least_n_days_this_month[1],
                    base : ret.site_stats.total_users
                },       
                {
                    name : 'Participant in meetings / all',
                    value : ret.site_stats.total_participated,
                    base : ret.site_stats.total_users
                },       
                {
                    name : 'TOS accepted / all',
                    value : ret.site_stats.funnel_total_users,
                    base : ret.site_stats.total_users
                },
                {
                    name : 'Logged in / TOS accepted',
                    value : ret.site_stats.funnel_logged_in,
                    base : ret.site_stats.funnel_total_users
                },         
                {
                    name : 'Participant in meetings / TOS accepted',
                    value : ret.site_stats.funnel_participated,
                    base : ret.site_stats.funnel_total_users
                },       
                {
                    name : 'Meeting created / TOS accepted',
                    value : ret.site_stats.funnel_event_created,
                    base : ret.site_stats.funnel_total_users
                },

                {
                    name : 'Logged in / TOS accepted',
                    value : ret.site_stats.funnel_logged_in,
                    base : ret.site_stats.funnel_total_users
                },       

                {
                    name : 'Friend invite sent / TOS accepted',
                    value : ret.site_stats.funnel_beta_invite_sent,
                    base : ret.site_stats.funnel_total_users
                },
    
                {
                    name : 'Meeting invite sent / TOS accepted',
                    value : ret.site_stats.funnel_meeting_invite_sent,
                    base : ret.site_stats.funnel_total_users
                },
    
                {
                    name : 'Used this month / TOS accepted',
                    value : ret.site_stats.funnel_used_this_month,
                    base : ret.site_stats.funnel_total_users
                },
    
                {
                    name : 'User is PRO / TOS accepted',
                    value : ret.site_stats.funnel_is_pro,
                    base : ret.site_stats.funnel_total_users
                },
    
                {
                    name : 'User is Paid PRO / TOS accepted',
                    value : ret.site_stats.funnel_is_paid,
                    base : ret.site_stats.funnel_total_users
                },
    
                {
                    name : 'Participant in meetings / NON-TOS user',
                    value : ret.site_stats.total_participated - ret.site_stats.funnel_participated,
                    base : ret.site_stats.total_users - ret.site_stats.funnel_total_users
                },

                {
                    name : 'Logged in / Participant NON-TOS user',
                    value : ret.site_stats.total_participated_and_visited - ret.site_stats.funnel_participated_and_visited,
                    base : ret.site_stats.total_participated - ret.site_stats.funnel_participated
                }
            ];


            function form_point_array( a, n ) {
                var days = [];
                for ( var d in a ) {
                    days.push( d );
                }
                days = days.sort();
                var r = [];
                dojo.forEach( days, function( day ) {
                    r.push( [ parseInt(day),  a[day] ? parseInt(a[day]) : 0 ] );
                } );
                return r;
            }

            function form_cumulative_array( a, n ) {
                a = form_point_array( a );
                var sum = 0;
                var r = [];
                dojo.forEach( a, function(i) {
                    sum += i[1] ? parseInt(i[1]) : 0;
                    r.push( [ i[0], sum ] );
                } );
                return r;
            }

            now = new Date().getTime();
            pointstart = now - 1000*60*60*24*210;
            weeklyzoompointstart = now - 1000*60*60*24*105;

            function draw_chart() {
                chart = ( chart_mode == 'cumulative' ) ? new Highcharts.Chart({
                    chart: { renderTo: 'chart', zoomType: 'x' },
                    title: { text : chart_type  + ' ' + chart_mode + ' counts' },
                    xAxis: { type: 'datetime' },
                    plotOptions : { line : { marker: { enabled : false, } } },
                    series : [
                        { name : 'created users', data : form_cumulative_array(ret.site_stats['new_users_by_'+chart_type]) },
                        { name : 'first visits', data : form_cumulative_array(ret.site_stats['first_visits_by_'+chart_type]) },
                        { name : 'tos accepts', data : form_cumulative_array(ret.site_stats['new_tos_users_by_'+chart_type]) },
                        { name : 'created meetings', data : form_cumulative_array(ret.site_stats['user_events_by_'+chart_type]) },
                    ]
                } )
                : new Highcharts.Chart({
                    chart: { renderTo: 'chart', zoomType: 'x' },
                    title: { text : chart_type  + ' ' + chart_mode + ' counts' },
                    xAxis: { type: 'datetime' },
                    plotOptions : { line : { marker: { enabled : false, } } },
                    series : [
                        { name : 'created users', data : form_point_array(ret.site_stats['new_users_by_'+chart_type]) },
                        { name : 'first visits', data : form_point_array(ret.site_stats['first_visits_by_'+chart_type]) },
                        { name : 'tos accepts', data : form_point_array(ret.site_stats['new_tos_users_by_'+chart_type]) },
                        { name : 'created meetings', data : form_point_array(ret.site_stats['user_events_by_'+chart_type]) },
                    ]
                } ); 
            }

            draw_chart();

            dojo.query('.js_mode').forEach( function( node ) {
                dojo.connect( node, 'onclick', function(e) {
                    dojo.stopEvent(e);
                    chart_mode = dojo.attr( node, 'x-data');
                    draw_chart();
                } );
            } );
			
            dojo.query('.js_type').forEach( function( node ) {
                dojo.connect( node, 'onclick', function(e) {
                    dojo.stopEvent(e);
                    chart_type = dojo.attr( node, 'x-data');
                    draw_chart();
                } );
            } );
			
			user_pie = new Highcharts.Chart({
		      chart: {
				height: 350,
				width: 550,
		         renderTo: 'userstats',
				 backgroundColor: 'transparent',
		         plotBackgroundColor: 'transparent',
		         plotBorderWidth: null,
		         plotShadow: false
		      },
		      title: {
		         text: 'User Statistics (users '+(ret.site_stats.total_users) +' / meetings '+ret.site_stats.total_events+')',
				style: {color: '#ffffff'},
		      },
		      tooltip: {
		         formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ Math.round(this.y);
		         }
		      },
		      plotOptions: {
		         pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		               enabled: true,
		               color: '#fff',
		               connectorColor: '#fff',
		               formatter: function() {
		                  return '<b>'+ this.point.name +'</b>:<br/> '+ Math.round(this.y/ret.site_stats.total_users*100) + ' %';
		               }
		            }
		         }
		      },
		       series: [{
		         type: 'pie',
		         name: 'Activity',
		         data: [
		            { 
						name : 'User with no activity', 
					  	y :  ret.site_stats.total_users - ret.site_stats.users_who_have_used_on_at_least_n_days["1"],
					},
		            { 
						name : 'User with single day of activity',
		 				y :  ret.site_stats.users_who_have_used_on_at_least_n_days["1"] -
							ret.site_stats.users_who_have_used_on_at_least_n_days["2"],
					},
		            {
		               name: 'User with 2-5 days of activity',    
		               y : ret.site_stats.users_who_have_used_on_at_least_n_days["2"] -
							ret.site_stats.users_who_have_used_on_at_least_n_days["6"],
		            },
                    {
		               name: 'User with > 5 days of activity',    
		               y : ret.site_stats.users_who_have_used_on_at_least_n_days["6"],
		            }
		         ]
		      }]
		   });

           var generated_labels = [];
           var generated_good = [];
           var generated_bad = [];
           for (var i = 0; i < funnels.length; i++ ) {
            var f = funnels[i];
            var pgood = Math.ceil( f.value / f.base * 100 );
            var pbad = 100 - pgood;
            generated_labels.push( f.name + " ( " + f.value + "/"+ f.base + ")" );
            generated_good.push( pgood );
            generated_bad.push( pbad );
           }
		   funnel = new Highcharts.Chart({
              chart: {
                 renderTo: 'funnel',
                 defaultSeriesType: 'bar',
                 height: 500,
  				 width: 1200,
  				 backgroundColor: 'transparent',
 		         plotBackgroundColor: 'transparent',
 		         plotBorderWidth: null,
 		         plotShadow: false
              },
              title: {
                 text: 'Actions',
                 color: '#fff'
              },
              xAxis: {
                 categories: generated_labels,
              },
              yAxis: {
                 min: 0,
                 max: 100,
                 title: {
                    text: 'Percentage'
                 }
              },
              legend: {
                 backgroundColor: '#FFF',
                 reversed: true
              },
              tooltip: {
                 formatter: function() {
                    return ''+
                        this.series.name +': '+ this.y +'';
                 }
              },
              plotOptions: {
                 series: {
                    stacking: 'normal'
                 }
              },
                  series: [
                  {
                       name: 'Bad',
                       data: generated_bad,
                       color: 'Red'
                  }, 
                  {
                 name: 'Good',
                 data: generated_good,
                 color: 'Green'
              }]
           });
           
	
		   
		}});
	

	
	live_chart = new Highcharts.Chart({
	   chart: {
			height: 200,
			width: 350,
			 backgroundColor: 'transparent',
	     plotBackgroundColor: 'transparent',
	     renderTo: 'liveusers',
	     defaultSeriesType: 'spline',
	     marginRight: 10,
	     events: {
	         load: function() {
	            var series = this.series[0];
	            setInterval(function() {
	               x = (new Date()).getTime();
					  $.getJSON('http://api.chartbeat.com/summary?host=meetin.gs&keys=R&apikey=x',
					function(ret){
						y = ret.R.data.observations;
					});
	               series.addPoint([x, y], true, true);
	            }, 10000);
	         }
	      }
	   },
	   title: {
	      text: 'Live users',
			style: {color: '#ffffff'},
	   },
	   xAxis: {
	      type: 'datetime',
	      tickPixelInterval: 150
	   },
	   yAxis: {
			 allowDecimals: false,
			 min: 0,
	      title: {
	         text: 'Users',
				style: {color: '#ffffff'}
	      },
	      plotLines: [{
	         value: 0,
	         width: 1,
	         color: '#fff'
	      }]
	   },
	   legend: {
	      enabled: false
	   },
	   exporting: {
	      enabled: false
	   },
	   series: [{
	      name: 'Users',
	      data: (function() {
	         // generate zero line
	         var data = [],
	            time = (new Date()).getTime(),
	            i;
	         
	         for (i = -9; i <= 0; i++) {
	            data.push({
	               x: time + i * 10000,
	               y: 0
	            });
	         }
	         return data;
	      })()
	   }]
	});

});
