!function(){redirectToError=function(reason){var isIos=/iP(hone|od|ad)/.test(navigator.userAgent);window.location="/errors/unsupportedDevice.html?ios="+isIos.toString()+"&reason="+reason},testLocalStorage=function(){if(window.localStorage)try{window.localStorage.setItem("test","test"),window.localStorage.removeItem("test")}catch(err){return void redirectToError("localStorageSetItem")}},featureDetection=function(){requiredFeatures={localStorage:window.localStorage,querySelector:document.querySelector};for(var i in requiredFeatures)if("undefined"==typeof requiredFeatures[i])return void redirectToError(i)},featureDetection(),testLocalStorage()}();var mtnApp={appBrand:1,fake_connectivity:null,version:"3.5.1",androidVersionCode:8,config:{mode:"production",environment:"live",appId:"com.swipetomeet.mobile"}};mtnApp.appBrands={MEETINGS:0,SWIPETOMEET:1,CMEET:2},window.mtnApp=mtnApp||{},window.mtnApp.config=window.mtnApp.config||{},window.mtnApp.appBrand=window.mtnApp.appBrand||0,window.mtnApp.version=window.mtnApp.version||"dev",window.mtnApp.config.environment=window.mtnApp.config.environment||"staging",window.mtnApp.config.mode=window.mtnApp.config.mode||"development",window.mtnApp.appSettings={0:{appName:"Meetin.gs",urlScheme:"meetin.gs",supportLinks:{support:{linkText:"Send feedback",url:"mailto:feedback@meetin.gs?subject=Meetin.gs%20app%20feedback",alternativeUrl:"mailto:feedback@meetin.gs?subject=Meetin.gs%20app%20feedback"},facebook:{linkText:"Meetin.gs on Facebook",url:"fb://"+("ios"===("undefined"!=typeof device&&null!==device?device.platform.toLowerCase():void 0)?"profile":"page")+"/182909251746386",alternativeUrl:"https://www.facebook.com/www.meetin.gs"},twitter:{linkText:"Meetin.gs on Twitter",url:"twitter://user?user_id=252745045",alternativeUrl:"https://twitter.com/meetin_gs"}}},1:{appName:"SwipeToMeet",urlScheme:"swipetomeet",supportLinks:{support:{linkText:"Send feedback",url:"mailto:feedback@swipetomeet.com?subject=SwipeToMeet%20feedback",alternativeUrl:"mailto:feedback@swipetomeet.com?subject=SwipeToMeet%20feedback"},facebook:{linkText:"SwipeToMeet on Facebook",url:"fb://"+("ios"===("undefined"!=typeof device&&null!==device?device.platform.toLowerCase():void 0)?"profile":"page")+"/736185226466841",alternativeUrl:"https://www.facebook.com/swipetomeet"},twitter:{linkText:"SwipeToMeet on Twitter",url:"twitter://user?user_id=2976255909",alternativeUrl:"https://twitter.com/swipetomeet"}}},2:{appName:"cMeet",urlScheme:"cmeet",supportLinks:{support:{linkText:"",url:"",alternativeUrl:""},facebook:{linkText:"",url:"",alternativeUrl:""},twitter:{linkText:"",url:"",alternativeUrl:""}}}},window.mtnApp.appSetting=window.mtnApp.appSettings[window.mtnApp.appBrand],window.mtnApp.appName=window.mtnApp.appSettings[window.mtnApp.appBrand].appName,window.appEnvironments={commons:{timeline:{initialMeetingsLimit:20,fetchMoreMeetingsLimit:10},meeting:{participants:{maxCountBeforeSummary:7}},thumbnail:{small:64,medium:120,large:200},notifications:{pollInterval:3e5},calendar:{pollInterval:6e5},scheduling:{pollInterval:500},pushNotifications:{testPushRetryCount:10,testPushRetryInterval:5e3},tabIndex:{scheduling:0,timeline:1,notification:2,menu:3},tabs:[{location:"http://localhost/views/scheduling/index.html#/scheduling/"},{location:"http://localhost/views/meeting/index.html?msgChannel=timeline"},{location:"http://localhost/views/notification/index.html?msgChannel=notifications"},{location:"http://localhost/views/menu/index.html?msgChannel=menu"}],appStoreUrls:{ios:"https://itunes.apple.com/en/app/swipetomeet/id996409597",android:"https://play.google.com/store/apps/details?id=com.swipetomeet.mobile"}},staging:{api:{baseUrl:"https://api-dev.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://dev.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"8824683db2d12efab53edbb1c6bae904"},pusher:{key:"acc4855651c9884f9717",authEndpoint:"https://api-dev.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"abff9b504523640a1e3f0bc967dd81b8"},segment:{token:"bxHAPTbmY0PenrOQ62oDvdtmE1bJjwKH"}},sentry:{enabled:!1,projectId:"35872",token:"110d441138b3492face5f0de2017328b",whitelistUrls:[/http:\/\/(mob|dist)\.dev/,/https?:\/\/mobiledev\.meetin\.gs/,/https?:\/\/localhost/]},GCM:{id:"485488469276"}},alpha:{api:{baseUrl:"https://api-dev.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://dev.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"8824683db2d12efab53edbb1c6bae904"},pusher:{key:"acc4855651c9884f9717",authEndpoint:"https://api-dev.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"abff9b504523640a1e3f0bc967dd81b8"},segment:{token:"bxHAPTbmY0PenrOQ62oDvdtmE1bJjwKH"}},sentry:{enabled:!1,projectId:"35872",token:"110d441138b3492face5f0de2017328b",whitelistUrls:[/http:\/\/(mob|dist)\.dev/,/https?:\/\/mobiledev\.meetin\.gs/,/https?:\/\/localhost/]}},beta:{api:{baseUrl:"https://api-beta.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://beta.meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-50042813-1",updateInterval:10}},qbaka:{enabled:!0,key:"beed27175e44d720210ef3d02e32960d"},pusher:{key:"8626829005c0e1e62345",authEndpoint:"https://api-beta.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"15fa3a3f5c21ccb03b19f58d243bb002"},segment:{token:"jHOLhw2kVeKPG449cUy1srWYiBBC920i"}},sentry:{enabled:!0,projectId:"35886",token:"f25673b8e33042bea4d990bd854f3dc5",whitelistUrls:[/https?:\/\/mobilebeta\.meetin\.gs/,/https?:\/\/localhost/]}},live:{api:{baseUrl:"https://api.meetin.gs/v1"},googleSignIn:{clientId:584216729178,redirectUri:"https://meetin.gs/meetings_global/redirect_mobile"},google:{analytics:{enabled:!0,accountId:"UA-3314001-32",updateInterval:10}},qbaka:{enabled:!0,key:"1ae2b946b5b29ee7c9d5a5052368e963"},pusher:{key:"8626829005c0e1e62345",authEndpoint:"https://api.meetin.gs/v1/pusher_auth",channelName:"private-meetings_user_"},analytics:{mixpanel:{token:"44470ef493e8b587085866a57bc57629"},segment:{token:"s72DrYzewgAuCBwRbH9Q44vzH7wK2jjv"}},sentry:{enabled:!0,projectId:"35892",token:"ae5590c7492e4d5ebe9a3c2788557f95",whitelistUrls:[/https?:\/\/mobile\.meetin\.gs/,/https?:\/\/localhost/]},GCM:{id:"750413458992"}}},window.appEnvironment=window.appEnvironments[window.mtnApp.config.environment],window.steroids||(window.steroids={openURL:function(){return null},buttons:{NavigationBarButton:function(){return null}},initialView:{show:function(){return null},dismiss:function(){return null}},view:{setBackgroundColor:function(){return null},setAllowedRotations:function(){return null},params:function(){return null}},views:{WebView:function(){return null}},layers:{push:function(){return null},pop:function(){return null},replace:function(){return null}},tabBar:{update:function(){return null},show:function(){return null},hide:function(){return null},on:function(){return null},off:function(){return null},selectTab:function(){return null}},splashscreen:{hide:function(){return null}}});