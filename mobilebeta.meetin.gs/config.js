!function(){redirectToError=function(reason){var isIos=/iP(hone|od|ad)/.test(navigator.userAgent);window.location="/errors/unsupportedDevice.html?ios="+isIos.toString()+"&reason="+reason},testLocalStorage=function(){if(window.localStorage)try{window.localStorage.setItem("test","test"),window.localStorage.removeItem("test")}catch(err){return void redirectToError("localStorageSetItem")}},featureDetection=function(){requiredFeatures={localStorage:window.localStorage,querySelector:document.querySelector};for(var i in requiredFeatures)if("undefined"==typeof requiredFeatures[i])return void redirectToError(i)},featureDetection(),testLocalStorage()}();var mtnApp={appName:"SwipeToMeet",version:"3.4.0-beta",androidVersionCode:3,config:{mode:"production",environment:"beta",appId:"com.swipetomeet.mobile"}};window.mtnApp=mtnApp||{},window.mtnApp.config=window.mtnApp.config||{},window.mtnApp.appName=window.mtnApp.appName||"Meetin.gs",window.mtnApp.version=window.mtnApp.version||"dev",window.mtnApp.config.environment=window.mtnApp.config.environment||"staging",window.mtnApp.config.mode=window.mtnApp.config.mode||"development",window.appEnvironments={staging:{api:{baseUrl:"https://api-dev.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://dev.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"8824683db2d12efab53edbb1c6bae904"},pusher:{key:"acc4855651c9884f9717",authEndpoint:"https://api-dev.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"abff9b504523640a1e3f0bc967dd81b8"},segment:{token:"bxHAPTbmY0PenrOQ62oDvdtmE1bJjwKH"}},sentry:{enabled:!1,projectId:"35872",token:"110d441138b3492face5f0de2017328b",whitelistUrls:[/http:\/\/(mob|dist)\.dev/,/https?:\/\/mobiledev\.meetin\.gs/,/https?:\/\/localhost/]}},alpha:{api:{baseUrl:"https://api-dev.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://dev.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"8824683db2d12efab53edbb1c6bae904"},pusher:{key:"acc4855651c9884f9717",authEndpoint:"https://api-dev.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"abff9b504523640a1e3f0bc967dd81b8"},segment:{token:"bxHAPTbmY0PenrOQ62oDvdtmE1bJjwKH"}},sentry:{enabled:!1,projectId:"35872",token:"110d441138b3492face5f0de2017328b",whitelistUrls:[/http:\/\/(mob|dist)\.dev/,/https?:\/\/mobiledev\.meetin\.gs/,/https?:\/\/localhost/]}},beta:{api:{baseUrl:"https://api-beta.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://beta.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"beed27175e44d720210ef3d02e32960d"},pusher:{key:"8626829005c0e1e62345",authEndpoint:"https://api-beta.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"15fa3a3f5c21ccb03b19f58d243bb002"},segment:{token:"jHOLhw2kVeKPG449cUy1srWYiBBC920i"}},sentry:{enabled:!0,projectId:"35886",token:"f25673b8e33042bea4d990bd854f3dc5",whitelistUrls:[/https?:\/\/mobilebeta\.meetin\.gs/,/https?:\/\/localhost/]}},live:{api:{baseUrl:"https://api.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-3314001-32",updateInterval:10}},qbaka:{enabled:!0,key:"1ae2b946b5b29ee7c9d5a5052368e963"},pusher:{key:"8626829005c0e1e62345",authEndpoint:"https://api.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"44470ef493e8b587085866a57bc57629"},segment:{token:"s72DrYzewgAuCBwRbH9Q44vzH7wK2jjv"}},sentry:{enabled:!0,projectId:"35892",token:"ae5590c7492e4d5ebe9a3c2788557f95",whitelistUrls:[/https?:\/\/mobile\.meetin\.gs/,/https?:\/\/localhost/]}}},window.appEnvironment=window.appEnvironments[window.mtnApp.config.environment],window.steroids||(window.steroids={openURL:function(){return null},buttons:{NavigationBarButton:function(){return null}},initialView:{show:function(){return null},dismiss:function(){return null}},view:{setBackgroundColor:function(){return null},setAllowedRotations:function(){return null},params:function(){return null}},views:{WebView:function(){return null}},layers:{push:function(){return null},pop:function(){return null},replace:function(){return null}},tabBar:{update:function(){return null},show:function(){return null},hide:function(){return null},on:function(){return null},off:function(){return null},selectTab:function(){return null}},splashscreen:{hide:function(){return null}}});