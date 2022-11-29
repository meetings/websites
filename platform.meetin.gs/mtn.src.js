/*!
 * domready (c) Dustin Diaz 2012 - License MIT
 */
!function (name, context, definition) {
    if (typeof module != 'undefined') { module.exports = definition(); }
    else if (typeof define == 'function' && typeof define.amd == 'object') { define(definition); }
    else { context[name] = definition(); }
}('domready', this, function (ready) {

    var fns = [], fn, f = false
        , doc = document
        , testEl = doc.documentElement
        , hack = testEl.doScroll
        , domContentLoaded = 'DOMContentLoaded'
        , addEventListener = 'addEventListener'
        , onreadystatechange = 'onreadystatechange'
        , readyState = 'readyState'
        , loaded = /^loade|c/.test(doc[readyState]);

    function flush(f) {
        loaded = 1;
        while (f = fns.shift()) { f() }
    }

doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
    doc.removeEventListener(domContentLoaded, fn, f);
    flush();
}, f);


hack && doc.attachEvent(onreadystatechange, fn = function () {
    if (/^c/.test(doc[readyState])) {
        doc.detachEvent(onreadystatechange, fn);
        flush();
    }
});

return (ready = hack ?
        function (fn) {
    self != top ?
        loaded ? fn() : fns.push(fn) :
        function () {
        try {
            testEl.doScroll('left')
        } catch (e) {
            return setTimeout(function() { ready(fn) }, 50)
        }
        fn()
    }()
} :
    function (fn) {
    loaded ? fn() : fns.push(fn);
});
});

/*
 * Lightweight JSONP fetcher
 * Copyright 2010-2012 Erik Karlsson. All rights reserved.
 * BSD licensed
 */
var JSONP = (function(){
    var counter = 0, head, window = this, config = {};
    function load(url, pfnError) {
        var script = document.createElement('script'),
        done = false;
        script.src = url;
        script.async = true;

        var errorHandler = pfnError || config.error;
        if ( typeof errorHandler === 'function' ) {
            script.onerror = function(ex){
                errorHandler({url: url, event: ex});
            };
        }

        script.onload = script.onreadystatechange = function() {
            if ( !done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                script.onload = script.onreadystatechange = null;
                if ( script && script.parentNode ) {
                    script.parentNode.removeChild( script );
                }
            }
        };

        if ( !head ) {
            head = document.getElementsByTagName('head')[0];
        }
        head.appendChild( script );
    }
    function encode(str) {
        return encodeURIComponent(str);
    }
    function jsonp(url, params, callback, callbackName) {
        var query = (url||'').indexOf('?') === -1 ? '?' : '&', key;

        callbackName = (callbackName||config['callbackName']||'callback');
        var uniqueName = callbackName + "_json" + (++counter);

        params = params || {};
        for ( key in params ) {
            if ( params.hasOwnProperty(key) ) {
                query += encode(key) + "=" + encode(params[key]) + "&";
            }
        }

        window[ uniqueName ] = function(data){
            callback(data);
            try {
                delete window[ uniqueName ];
            } catch (e) {}
            window[ uniqueName ] = null;
        };

        load(url + query + callbackName + '=' + uniqueName);
        return uniqueName;
    }
    function setDefaults(obj){
        config = obj;
    }
    return {
        get:jsonp,
        init:setDefaults
    };
}());

/*
 * Meetin.gs platform library
 *
 */
window.MTN = window.MTN || {};
MTN._getAttr = function(el, attr) {
    if (el && el.attributes && el.attributes[attr]) { return el.getAttribute(attr); }
    else { return false; }
};

MTN._resolved_host = '';
MTN._resolve_host = function() {
    if ( MTN._resolved_host ) {
        return MTN._resolved_host;
    }

    var scripts = document.getElementsByTagName("script");
    var i;

    for ( i = 0; i < scripts.length; i++) {
        var script = scripts.item( i );
        if ( script.src && script.src.match( /platform.*meetin\.gs\/mtn.*js$/ ) ) {
            if ( script.src.match( /platform\-dev/ ) ) {
                MTN._resolved_host = 'https://platform-dev.meetin.gs';
            }
            break;
        }
    }

    if ( ! MTN._resolved_host ) {
        MTN._resolved_host = 'https://platform.meetin.gs';
    }

    return MTN._resolved_host;
};

MTN._generateIframeUrl = function( opts ) {
    return encodeURI( MTN._resolve_host() + '/button.html?u='+( opts.user || '' ) +
                     '&url='+ (opts['Meet Me URL'] || '') +
                     '&s='+(opts.scheduler || '') +
                     '&c='+(opts.color || '') +
                     '&t='+(opts.type || '') +
                     '&m='+(opts.mode || '') +
                     '&i_n='+(opts.name || ( opts['First name'] && opts['Last name'] ? opts['First name'] + ' ' + opts['Last name'] : (opts['First name'] || opts['Last name'])) || '') +
                     '&i_o='+(opts.organization || opts['Organization'] || '') +
                     '&i_t='+(opts.title || opts['Title'] ||'') +
                     '&i_i='+(opts.image || opts['Image URL'] || '') +
                     '&d_i='+(opts.disable_image || '') +
                     '&d_f='+(opts.disable_first_name || '') +
                     '&d_l='+(opts.disable_last_name || '') +
                     '&d_t='+(opts.disable_title || '') +
                     '&d_n='+(opts.disable_name || '') +
                     '&d_o='+(opts.disable_organization || '') +
                     '&t='+(opts.name || '') +
                     '&r='+window.location.href);
};

MTN.init = function(opts) {

    // Get app id and other settings from script tag
    MTN.app_id = MTN._getAttr(document.getElementById("mtn_script"), 'data-api-key');
    MTN.disable_unregistered = MTN._getAttr(document.getElementById("mtn_script"), 'data-disable-unregistered');
    MTN.current_user_token = MTN._getAttr(document.getElementById("mtn_script"), 'data-current-user-token');
    if( opts && typeof opts.custom_user_data_received_handler === 'function' ) {
        MTN.custom_user_data_received_handler = opts.custom_user_data_received_handler;
    }

    // Find MTN/app elements on page
    var scripts = document.getElementsByTagName('script'),i,n;
    var l = scripts.length;
    var els = [],t;
    for (i = 0; i < l; i++) {
        t = MTN._getAttr(scripts[i],'type');
        if( t === 'MTN/button' || t === 'MTN/list' || t === 'MTN/app' ) {
            els.push(scripts[i]);
        }
    }

    // Go trough the elements and intialize them
    var p = els.length;
    for(n = 0; n < p; n++) {
        if( MTN._getAttr(els[n], 'type') === 'MTN/list' ){
            MTN._initList(els[n]);
        }
        else {
            MTN._initButton(els[n]);
        }
    }
};
MTN._createButtonIframe = function( opts ) {
    var f = document.createElement('iframe');
    f.setAttribute('src', MTN._generateIframeUrl(opts));

    f.setAttribute('scrolling','no');
    f.setAttribute('frameBorder','0');
    f.setAttribute('border','0');
    f.setAttribute('hspace','0');
    f.setAttribute('marginheight','0');
    f.setAttribute('marginwidth','0');
    f.style.border = '0px';

    if( opts.mode === 'full' ) {
        f.style.height = '220px';
        f.style.width= '160px';
    } else {
        f.style.height= '35px';
        f.style.width= opts.type === 'schedule' ? '86px' : '116px';
    }
    f.style.border='0px';
    f.style.overflow='hidden';
    return f;
};

MTN._initButton = function( el, opts ) {
    opts = opts || MTN._getOptionsFromEl( el );

    if( opts.email || opts.token ) {
        JSONP.get( MTN._resolve_host() + '/apigw/v1/meetme/' + (opts.email || opts.token) , { app_id : MTN.app_id }, function(r){
            if( typeof MTN.custom_user_data_received_handler === 'function' ) {
                MTN.custom_user_data_received_handler( el, r, r.TOKEN === MTN.current_user_token ? 1 : 0 );
            } else if( opts.mode === 'full' ) {
                opts.image = r['Image URL'];
                opts.name = r['First name'] + ' ' + r['Last name'];
                opts.title = r['Title'];
                opts.organization = r['Organization'];
                opts['Meet Me URL'] = r['Meet Me URL'];
                el.parentNode.replaceChild(MTN._createButtonIframe( opts ),el);
            } else {
                opts['Meet Me URL'] = r['Meet Me URL'];
                el.parentNode.replaceChild(MTN._createButtonIframe( opts ),el);
            }
        });
    } else {
        el.parentNode.replaceChild(MTN._createButtonIframe( opts ),el);
    }
};

MTN._initList = function( el ) {
    // Get options
    var opts = MTN._getOptionsFromEl( el );

    // Replace script element with wrapper div
    var wrapper_el = document.createElement('div');
    wrapper_el.className = 'mtn_list_wrapper';
    el.parentNode.replaceChild(wrapper_el ,el);

    // Fetch list
    JSONP.get( MTN._resolve_host() + '/apigw/v1/meetme', { app_id : MTN.app_id, match : opts.match }, function(r){
        var e,i,l = r.length;

        for( i = 0; i < l; i++ ) {

            if( typeof MTN.custom_user_data_received_handler === 'function' ) {
                e = document.createElement('script');
                wrapper_el.appendChild(e);
                MTN.custom_user_data_received_handler( e, r[i], r[i].TOKEN === MTN.current_user_token ? 1 : 0 );
                continue;
            }

            if( ! r[i].NOPRELOAD ) {
                r[i].mode = 'full';
                wrapper_el.appendChild(MTN._createButtonIframe( r[i] ));
            } else {
                // Create script tag placeholder and init button
                e = document.createElement('script');
                e.attributes['data-type'] = 'MTN/app';
                e.attributes['data-token'] = r[i].TOKEN;
                wrapper_el.appendChild(e);
                ( function(e,token) { MTN._initButton( e, { mode : 'full', token : token, type : 'gallery' }  ); } )(e, r[i].TOKEN);
            }
        }
    });
};

MTN._getOptionsFromEl = function( el ) {
    return {
        user : MTN._getAttr(el,'data-user') || '',
        scheduler : MTN._getAttr(el,'data-scheduler') || '',
        type : MTN._getAttr(el,'data-type') || 'meetme',
        mode : MTN._getAttr(el,'data-mode') || 'button',
        color : MTN._getAttr(el,'data-color') || 'blue',
        name : MTN._getAttr(el,'data-name') || '',
        image : MTN._getAttr(el,'data-imgage') || '',
        title : MTN._getAttr(el,'data-title') || '',
        organization : MTN._getAttr(el,'data-organization') || '',
        email : MTN._getAttr(el,'data-email') || '',
        token : MTN._getAttr(el,'data-token') || '',
        disable_organization : MTN._getAttr(el,'data-disable-organization ') || '',
        disable_image : MTN._getAttr(el,'data-disable-image') || '',
        disable_title : MTN._getAttr(el,'data-disable-title') || '',
        disable_name : MTN._getAttr(el,'data-disable-name') || '',
        disable_first_name : MTN._getAttr(el,'data-disable-first-name') || '',
        disable_last_name : MTN._getAttr(el,'data-disable-last-name') || '',
        match : MTN._getAttr(el, 'data-match') || ''
    };
};

domready(function () {
    if( MTN._getAttr(document.getElementById("mtn_script"), 'data-disable-autoinit') ) { return; }
    MTN.init();
});
