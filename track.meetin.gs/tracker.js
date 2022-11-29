meetings_tracker.object = (function ( d, w ) {
    var mTracker  = {
        'user_id' : '',
        'tracking_id' : '',
        'iframe' : null,
        'init' : function(){

            // Check support
            if (d.all && (d.documentMode === undefined)) {
                return;
            }

            // Event listener for tracker ready
            var that = this;
            if(w.addEventListener) w.addEventListener("message", function(m){ that.setReady(m); }, false);
            else w.attachEvent("onmessage", function(m){ that.setReady(m); });

            this.injectIframe();
        },
        injectIframe : function() {
            if ( ! d.body ) {
                var that = this;
                return w.setTimeout( function() { that.injectIframe(); }, 10 );
            }

            // Check are we on dev or live side
            var dev_check = w.location.toString().indexOf('dev.') !== -1 ? '-dev' : '';

            // Create tracking iFrame
            this.iframe = d.createElement("IFRAME");
            this.iframe.setAttribute("src", "https://track"+dev_check+".meetin.gs?id="+Math.random(0,10));
            this.iframe.style.width = 1+"px";
            this.iframe.style.height = 1+"px";
            this.iframe.display = "none";
            d.body.appendChild(this.iframe);
        },

        'setReady' : function(m){
            var msg = m.data.toString().split(':');
            if( msg[0] && msg[0] == 'tracker_ready'){
                this.tracking_id = msg[1];

                var that = this;

                meetings_tracker.track = function( node, type, extra, date ) {
                    if ( type && type == 'identify' ) {
                        that.user_id = extra;
                    }
                    else {
                        type = type || 'click';
                        date = date || new Date();

                        var epoch = Math.floor( date.getTime() / 1000 );
                        var ids = node ? that.getElementIdentifiers( node ) : ( type == 'load' ? 'load' : null );

                        that.postEvent( epoch, type, ids, extra );
                   }
                }

                for ( var i = 0; i < meetings_tracker.trails.length; i++ ) {
                    var trail = meetings_tracker.trails[i];
                    if ( trail[1] && trail[1] == 'identify' ) {
                        meetings_tracker.track( trail[0], trail[1], trail[2], trail[3] );
                    }
                }

                meetings_tracker.track( null, 'load', null, meetings_tracker.load );

                for ( var i = 0; i < meetings_tracker.trails.length; i++ ) {
                    var trail = meetings_tracker.trails[i];
                    if ( trail[1] && trail[1] == 'identify' ) {}
                    else {
                        meetings_tracker.track( trail[0], trail[1], trail[2], trail[3] );
                    }
                }
            }
        },

        'postEvent' : function( epoch, type, ids, extra ) {
            var msgvars = [ epoch, type, ids, extra, this.user_id, d.title, w.location, d.referrer ];

            // Securely form a JSON string by hand
            for ( i in msgvars ) {
                var value = ( msgvars[i] === null ) ? '' : '' + msgvars[i];
                msgvars[i] = value.replace(/(["\\])/g, "\\$1");
            }
            var msg = '["' + msgvars.join('","') + '"]';
            this.iframe.contentWindow.postMessage( msg , '*');
        },

        'getElementIdentifiers' : function( el ){
            var ids = []
            ids.push( el.getAttribute('data-track') || '' );
            ids.push( el.id || '' );
            ids.push( el.className || '' );

            var parents_found = 0;
            var p = el.parentNode;
            while ( p && parents_found < 2 ) {
                if ( p.id || p.className ) {
                    parents_found++;
                }
                ids.push( p.id || '' );
                ids.push( p.className || '' );
                p = p.parentNode;
            }

            return ids.join(":");
        }
    };
    mTracker.init();
    return mTracker;
})( document, window );
