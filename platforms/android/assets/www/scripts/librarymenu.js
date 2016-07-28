define(["imageLoader","layoutManager","viewManager","navdrawer","libraryBrowser","paper-icon-button-light","material-icons"],function(e,t,a,n,r){function s(){var t="";t+='<div class="primaryIcons">';var a=browserInfo.safari?"chevron_left":"&#xE5C4;";t+='<button type="button" is="paper-icon-button-light" class="headerButton headerButtonLeft headerBackButton hide autoSize"><i class="md-icon">'+a+"</i></button>",t+='<button type="button" is="paper-icon-button-light" class="headerButton mainDrawerButton barsMenuButton headerButtonLeft autoSize"><i class="md-icon">menu</i></button>',t+='<button type="button" is="paper-icon-button-light" class="headerButton headerAppsButton barsMenuButton headerButtonLeft autoSize"><i class="md-icon">home</i></button>',t+='<div class="libraryMenuButtonText headerButton">'+Globalize.translate("ButtonHome")+"</div>",t+='<div class="viewMenuSecondary">',t+='<span class="headerSelectedPlayer"></span>',t+='<button is="paper-icon-button-light" class="btnCast headerButton headerButtonRight hide autoSize"><i class="md-icon">cast</i></button>',AppInfo.enableSearchInTopMenu&&(t+='<button type="button" is="paper-icon-button-light" class="headerButton headerButtonRight headerSearchButton hide autoSize"><i class="md-icon">search</i></button>'),t+='<button is="paper-icon-button-light" class="headerButton headerButtonRight headerVoiceButton hide autoSize"><i class="md-icon">mic</i></button>',t+='<button is="paper-icon-button-light" class="headerButton headerButtonRight btnNotifications"><div class="btnNotificationsInner">0</div></button>',t+='<button is="paper-icon-button-light" class="headerButton headerButtonRight headerUserButton autoSize"><i class="md-icon">person</i></button>',browserInfo.mobile||Dashboard.isConnectMode()||(t+='<button is="paper-icon-button-light" class="headerButton headerButtonRight dashboardEntryHeaderButton autoSize" onclick="return LibraryMenu.onSettingsClicked(event);"><i class="md-icon">settings</i></button>'),t+="</div>",t+="</div>",t+='<div class="viewMenuBarTabs">',t+="</div>";var n=document.createElement("div");n.classList.add("viewMenuBar"),n.innerHTML=t,document.querySelector(".skinHeader").appendChild(n),e.lazyChildren(document.querySelector(".viewMenuBar")),document.dispatchEvent(new CustomEvent("headercreated",{})),v()}function o(){Dashboard.exitOnBack()?Dashboard.exit():history.back()}function c(e){var t=document.querySelector(".viewMenuBar");if(t){var a,n=t.querySelector(".headerUserButton");if(e&&e.name&&e.imageUrl){var i=26,r=e.imageUrl;e.supportsImageParams&&(r+="&height="+Math.round(i*Math.max(window.devicePixelRatio||1,2))),n&&(l(n,r),a=!0)}n&&!a&&l(n,null),e&&d(e.localUser),J=!1}}function l(e,t){t?(e.classList.add("headerUserButtonRound"),e.classList.remove("autoSize"),e.innerHTML='<img src="'+t+'" />'):(e.classList.remove("headerUserButtonRound"),e.classList.add("autoSize"),e.innerHTML='<i class="md-icon">person</i>')}function d(e){var t=document.querySelector(".viewMenuBar"),a=t.querySelector(".headerSearchButton"),n=t.querySelector(".btnCast"),i=t.querySelector(".dashboardEntryHeaderButton");e?(n.classList.remove("hide"),a&&a.classList.remove("hide"),i&&(e.Policy.IsAdministrator?i.classList.remove("hide"):i.classList.add("hide")),require(["apphost"],function(e){e.supports("voiceinput")?t.querySelector(".headerVoiceButton").classList.remove("hide"):t.querySelector(".headerVoiceButton").classList.add("hide")})):(n.classList.add("hide"),t.querySelector(".headerVoiceButton").classList.add("hide"),a&&a.classList.add("hide"),i&&i.classList.add("hide"))}function u(){require(["voiceDialog"],function(e){e.showDialog()})}function b(){Dashboard.navigate("search.html")}function h(e){Dashboard.showUserFlyout(e.target)}function m(){Dashboard.navigate("home.html")}function v(){var e=document.querySelector(".mainDrawerButton");e&&e.addEventListener("click",p);var t=document.querySelector(".headerBackButton");t&&t.addEventListener("click",o);var a=document.querySelector(".headerVoiceButton");a&&a.addEventListener("click",u);var n=document.querySelector(".headerSearchButton");n&&n.addEventListener("click",b);var i=document.querySelector(".headerUserButton");i&&i.addEventListener("click",h);var r=document.querySelector(".headerAppsButton");r&&r.addEventListener("click",m);var s=document.querySelector(".viewMenuBar");N(s),s.querySelector(".btnNotifications").addEventListener("click",function(){Dashboard.navigate("notificationlist.html")})}function y(e,t){return r.getHref(e,t)}function p(){W.isVisible?f():L()}function L(){W.open(),K=(new Date).getTime()}function g(){browserInfo.mobile&&document.body.classList.add("bodyWithPopupOpen")}function f(){W.close()}function k(){W.isVisible?g():document.body.classList.remove("bodyWithPopupOpen")}function M(e){var t="";t+='<div style="height:.5em;"></div>';var a=window.ApiClient?"home.html":"selectserver.html?showuser=1";t+='<a class="lnkMediaFolder sidebarLink" href="'+a+'" onclick="return LibraryMenu.onLinkClicked(event, this);">',t+="<div style=\"background-image:url('css/images/mblogoicon.png');width:28px;height:28px;background-size:contain;background-repeat:no-repeat;background-position:center center;border-radius:1000px;vertical-align:middle;margin:0 1.25em 0 1.55em;display:inline-block;\"></div>",t+=Globalize.translate("ButtonHome"),t+="</a>",t+='<a class="sidebarLink lnkMediaFolder" data-itemid="remote" href="nowplaying.html" onclick="return LibraryMenu.onLinkClicked(event, this);"><i class="md-icon sidebarLinkIcon">tablet_android</i><span class="sidebarLinkText">'+Globalize.translate("ButtonRemote")+"</span></a>",t+='<div class="sidebarDivider"></div>',t+='<div class="libraryMenuOptions">',t+="</div>";var n=e.localUser;n&&n.Policy.IsAdministrator&&(t+='<div class="adminMenuOptions">',t+='<div class="sidebarDivider"></div>',t+='<div class="sidebarHeader">',t+=Globalize.translate("HeaderAdmin"),t+="</div>",t+='<a class="sidebarLink lnkMediaFolder lnkManageServer" data-itemid="dashboard" href="#"><i class="md-icon sidebarLinkIcon">dashboard</i><span class="sidebarLinkText">'+Globalize.translate("ButtonManageServer")+"</span></a>",t+='<a class="sidebarLink lnkMediaFolder editorViewMenu" data-itemid="editor" onclick="return LibraryMenu.onLinkClicked(event, this);" href="edititemmetadata.html"><i class="md-icon sidebarLinkIcon">mode_edit</i><span class="sidebarLinkText">'+Globalize.translate("ButtonMetadataManager")+"</span></a>",browserInfo.mobile||(t+='<a class="sidebarLink lnkMediaFolder" data-itemid="reports" onclick="return LibraryMenu.onLinkClicked(event, this);" href="reports.html"><i class="md-icon sidebarLinkIcon">insert_chart</i><span class="sidebarLinkText">'+Globalize.translate("ButtonReports")+"</span></a>"),t+="</div>"),t+='<div class="userMenuOptions">',t+='<div class="sidebarDivider"></div>',e.localUser&&AppInfo.isNativeApp&&browserInfo.android&&(t+='<a class="sidebarLink lnkMediaFolder lnkMySettings" onclick="return LibraryMenu.onLinkClicked(event, this);" href="mypreferencesmenu.html?userId='+e.localUser.Id+'"><i class="md-icon sidebarLinkIcon">settings</i><span class="sidebarLinkText">'+Globalize.translate("ButtonSettings")+"</span></a>"),t+='<a class="sidebarLink lnkMediaFolder lnkMySync" data-itemid="mysync" onclick="return LibraryMenu.onLinkClicked(event, this);" href="mysync.html"><i class="md-icon sidebarLinkIcon">sync</i><span class="sidebarLinkText">'+Globalize.translate("ButtonSync")+"</span></a>",Dashboard.isConnectMode()&&(t+='<a class="sidebarLink lnkMediaFolder" data-itemid="selectserver" onclick="return LibraryMenu.onLinkClicked(event, this);" href="selectserver.html?showuser=1"><i class="md-icon sidebarLinkIcon">wifi</i><span class="sidebarLinkText">'+Globalize.translate("ButtonSelectServer")+"</span></a>"),e.localUser&&(t+='<a class="sidebarLink lnkMediaFolder" data-itemid="logout" onclick="return LibraryMenu.onLogoutClicked(this);" href="#"><i class="md-icon sidebarLinkIcon">lock</i><span class="sidebarLinkText">'+Globalize.translate("ButtonSignOut")+"</span></a>"),t+="</div>",X.innerHTML=t;var i=X.querySelector(".lnkManageServer");i&&i.addEventListener("click",I)}function w(e){X.querySelector(".adminDrawerLogo")?B():S(e)}function B(){for(var e=X.querySelectorAll(".sidebarLink"),t=0,n=e.length;n>t;t++){var i=e[t],r=!1,s=i.getAttribute("data-pageids");if(s&&(r=-1!=s.split(",").indexOf(a.currentView().id)),r){i.classList.add("selectedSidebarLink");var o="";i=i.querySelector("span")||i;var c=(i.innerText||i.textContent).trim();o+=c;var l=c;Dashboard.setPageTitle(o,l)}else i.classList.remove("selectedSidebarLink")}}function S(){var e="";e+='<a class="adminDrawerLogo clearLink" href="home.html">',e+='<img src="css/images/logo.png" />',e+="</a>",e+=Dashboard.getToolsMenuHtml(),e=e.split("href=").join('onclick="return LibraryMenu.onLinkClicked(event, this);" href='),X.innerHTML=e,B()}function T(){var e=this.getElementsByClassName("sectionName")[0],t=e?e.innerHTML:this.innerHTML;LibraryMenu.setTitle(t)}function C(e,t){return e.getUserViews({},t).then(function(e){for(var t=e.Items,a=[],n=0,i=t.length;i>n;n++){var r=t[n];if(a.push(r),"livetv"==r.CollectionType){r.ImageTags={},r.icon="live_tv",r.onclick="LibraryBrowser.showTab('livetv.html', 0);";var s=Object.assign({},r);s.Name=Globalize.translate("ButtonGuide"),s.ImageTags={},s.icon="dvr",s.url="livetv.html?tab=1",s.onclick="LibraryBrowser.showTab('livetv.html', 1);",a.push(s)}}return a})}function D(e,t){var a=document.querySelector(e);a&&(t?a.classList.remove("hide"):a.classList.add("hide"))}function q(e){if(!e)return D(".lnkMySync",!1),void D(".userMenuOptions",!1);e.Policy.EnableSync?D(".lnkMySync",!0):D(".lnkMySync",!1);var t=Dashboard.getCurrentUserId(),a=window.ApiClient,n=document.querySelector(".libraryMenuOptions");n&&C(a,t).then(function(e){var t=e,a="";a+='<div class="sidebarHeader">',a+=Globalize.translate("HeaderMedia"),a+="</div>",a+=t.map(function(e){var t="folder",a="inherit",n=e.Id;"channels"==e.CollectionType?n="channels":"livetv"==e.CollectionType&&(n="livetv"),"photos"==e.CollectionType?(t="photo_library",a="#009688"):"music"==e.CollectionType||"musicvideos"==e.CollectionType?(t="library_music",a="#FB8521"):"books"==e.CollectionType?(t="library_books",a="#1AA1E1"):"playlists"==e.CollectionType?(t="view_list",a="#795548"):"games"==e.CollectionType?(t="games",a="#F44336"):"movies"==e.CollectionType?(t="video_library",a="#CE5043"):"channels"==e.CollectionType||"Channel"==e.Type?(t="videocam",a="#E91E63"):"tvshows"==e.CollectionType?(t="tv",a="#4CAF50"):"livetv"==e.CollectionType&&(t="live_tv",a="#293AAE"),t=e.icon||t;var i=e.onclick?" function(){"+e.onclick+"}":"null";return'<a data-itemid="'+n+'" class="lnkMediaFolder sidebarLink" onclick="return LibraryMenu.onLinkClicked(event, this, '+i+');" href="'+y(e,e.CollectionType)+'"><i class="md-icon sidebarLinkIcon" style="color:'+a+'">'+t+'</i><span class="sectionName">'+e.Name+"</span></a>"}).join(""),n.innerHTML=a;for(var i=n,r=i.querySelectorAll(".sidebarLink"),s=0,o=r.length;o>s;s++)r[s].removeEventListener("click",T),r[s].addEventListener("click",T)})}function I(){f(),Dashboard.navigate("dashboard.html")}function E(){return getParameterByName("topParentId")||null}function P(){return browserInfo.mobile?320:200}function A(){var e=document,t=e.querySelector(".btnCast");if(t){var a=MediaController.getPlayerInfo();a.isLocalPlayer?(t.querySelector("i").innerHTML="cast",t.classList.remove("btnActiveCast"),e.querySelector(".headerSelectedPlayer").innerHTML=""):(t.querySelector("i").icon="cast_connected",t.classList.add("btnActiveCast"),e.querySelector(".headerSelectedPlayer").innerHTML=a.deviceName||a.name)}}function H(e){var t,a,n=e.classList.contains("liveTvPage"),i=e.classList.contains("channelsPage"),r=e.classList.contains("metadataEditorPage"),s=e.classList.contains("reportsPage"),o=e.classList.contains("mySyncPage"),c=n||i||r||s||o||e.classList.contains("allLibraryPage")?"":E()||"",l=document.getElementsByClassName("lnkMediaFolder");for(t=0,a=l.length;a>t;t++){var d=l[t],u=d.getAttribute("data-itemid");i&&"channels"==u?d.classList.add("selectedMediaFolder"):n&&"livetv"==u?d.classList.add("selectedMediaFolder"):r&&"editor"==u?d.classList.add("selectedMediaFolder"):s&&"reports"==u?d.classList.add("selectedMediaFolder"):o&&"mysync"==u?d.classList.add("selectedMediaFolder"):c&&u==c?d.classList.add("selectedMediaFolder"):d.classList.remove("selectedMediaFolder")}}function x(e,t,a){var n=new RegExp("([?|&])"+t+"=.*?(&|$)","i");return e.match(n)?e.replace(n,"$1"+t+"="+a+"$2"):a?-1==e.indexOf("?")?e+"?"+t+"="+a:e+"&"+t+"="+a:e}function z(e){var t=e.querySelectorAll(".scopedLibraryViewNav a"),a=e.classList.contains("liveTvPage")||e.classList.contains("channelsPage")||e.classList.contains("metadataEditorPage")||e.classList.contains("reportsPage")||e.classList.contains("mySyncPage")||e.classList.contains("allLibraryPage")?"":E()||"";if(a)for(i=0,length=t.length;length>i;i++){var n=t[i],r=n.href;-1==r.indexOf("#")&&(r=x(r,"topParentId",a),n.href=r)}}function F(e,t){var a=t;"UserConfigurationUpdated"===a.MessageType&&a.Data.Id==Dashboard.getCurrentUserId()}function U(e){var a=document.querySelector(".viewMenuBar");a&&(e.classList.contains("standalonePage")?a.classList.add("hide"):a.classList.remove("hide"),e.classList.contains("type-interior")&&!t.mobile?a.classList.add("headroomDisabled"):a.classList.remove("headroomDisabled")),J&&ConnectionManager.user(window.ApiClient).then(c)}function G(e){var t=e.getAttribute("data-title")||e.getAttribute("data-contextname");if(!t){var a=getParameterByName("titlekey");a&&(t=Globalize.translate(a))}t&&LibraryMenu.setTitle(t)}function V(e){var t=!e.classList.contains("homePage")&&history.length>0,a=document.querySelector(".headerBackButton"),n=AppInfo.enableBackButton;n||(n="true"==e.getAttribute("data-backbutton")),a&&(t&&n?a.classList.remove("hide"):a.classList.add("hide"))}function N(e){AppInfo.enableHeadRoom&&require(["headroom"],function(){var t=new Headroom(e,{tolerance:{down:40,up:0}});t.init()})}function O(e){Events.off(e,"websocketmessage",F),Events.on(e,"websocketmessage",F)}function R(e){var t=!1;e||(e=a.currentView()),e&&e.classList.contains("type-interior")&&(t=!0),t?($.classList.add("adminDrawer"),$.classList.remove("darkDrawer")):($.classList.add("darkDrawer"),$.classList.remove("adminDrawer"))}function _(e){var t=e?Promise.resolve(e):ConnectionManager.user(window.ApiClient);t.then(function(e){M(e),document.dispatchEvent(new CustomEvent("libraryMenuCreated",{})),q(e.localUser)})}function j(){var e=screen.availWidth-50;e=Math.max(e,240),e=Math.min(e,270);var t=!1;return browserInfo.safari&&(t=!0),{target:$,onChange:k,width:e,disableEdgeSwipe:t,edgeSwipeElement:document.querySelector(".mainDrawerPanelContent")}}var W,$=document.querySelector(".mainDrawer"),X=$.querySelector(".scrollContainer"),J=!0,K=(new Date).getTime();window.LibraryMenu={getTopParentId:E,onLinkClicked:function(e,t,a){return 1!=e.which?!0:((new Date).getTime()-K>200&&setTimeout(function(){f(),setTimeout(function(){a?a():Dashboard.navigate(t.href)},P())},50),e.stopPropagation(),e.preventDefault(),!1)},onLogoutClicked:function(){return(new Date).getTime()-K>200&&(f(),setTimeout(function(){Dashboard.logout()},P())),!1},onHardwareMenuButtonClick:function(){p()},onSettingsClicked:function(e){return 1!=e.which?!0:(Dashboard.navigate("dashboard.html"),!1)},setTabs:function(e,t,a){var n;if(!e)return void(LibraryMenu.tabType&&(document.body.classList.remove("withTallToolbar"),n=document.querySelector(".viewMenuBarTabs"),n.innerHTML="",n.classList.add("hide"),LibraryMenu.tabType=null));if(n=document.querySelector(".viewMenuBarTabs"),LibraryMenu.tabType||n.classList.remove("hide"),LibraryMenu.tabType!=e){var i=0;return n.innerHTML='<div class="libraryViewNav hiddenScrollX">'+a().map(function(e){var a=t==i?"pageTabButton is-active":"pageTabButton",n='<a class="'+a+'" href="'+e.href+'" data-index="'+i+'">'+e.name+'<div class="pageTabButtonSelectionBar"></div></a>';return i++,n}).join("")+"</div>",document.body.classList.add("withTallToolbar"),void(LibraryMenu.tabType=e)}var r=n.querySelector(".is-active"),s=n.querySelector('.pageTabButton[data-index="'+t+'"]');s.classList.add("is-active"),s!=r&&r&&r.classList.remove("is-active"),LibraryMenu.tabType=e},setTitle:function(e){var t=e,n=a.currentView();if(n){var i=n.getAttribute("data-helpurl");i&&(t+='<a href="'+i+'" target="_blank" class="clearLink" style="margin-left:2em;" title="'+Globalize.translate("ButtonHelp")+'"><button is="emby-button" type="button" class="accent" style="margin:0;font-weight:normal;font-size:14px;padding:.25em;display:block;align-items:center;"><i class="md-icon">info</i><span>'+Globalize.translate("ButtonHelp")+"</span></button></a>")}var r=document.querySelector(".libraryMenuButtonText");r&&(r.innerHTML=t)},setBackButtonVisible:function(e){var t=document.querySelector(".headerBackButton");t&&(e?t.classList.remove("hide"):t.classList.add("hide"))},setMenuButtonVisible:function(e){var t=document.querySelector(".mainDrawerButton");t&&t.classList.remove(!e&&browserInfo.mobile?"hide":"hide")},setTransparentMenu:function(e){var t=document.querySelector(".viewMenuBar");t&&(e?t.classList.add("semiTransparent"):t.classList.remove("semiTransparent"))}},pageClassOn("pageinit","page",function(){var e=this,t=e.classList.contains("libraryPage");if(t)for(var a=e.querySelectorAll(".libraryViewNav"),n=0,i=a.length;i>n;n++)N(a[n])}),pageClassOn("pagebeforeshow","page",function(){var e=this;e.classList.contains("withTabs")||LibraryMenu.setTabs(null)}),pageClassOn("pageshow","page",function(e){var t=this,a=t.classList.contains("type-interior");a?w(t):$.classList.contains("adminDrawer")&&_(),R(t),U(t),z(t),e.detail.isRestored||window.scrollTo(0,0),G(t),V(t),t.classList.contains("libraryPage")?(document.body.classList.add("libraryDocument"),document.body.classList.remove("dashboardDocument"),document.body.classList.remove("hideMainDrawer")):a?(document.body.classList.remove("libraryDocument"),document.body.classList.add("dashboardDocument"),document.body.classList.remove("hideMainDrawer")):(document.body.classList.remove("libraryDocument"),document.body.classList.remove("dashboardDocument"),document.body.classList.add("hideMainDrawer")),H(t)}),window.ApiClient&&O(window.ApiClient),W=new n(j()),$.classList.remove("hide"),s(),Events.on(ConnectionManager,"apiclientcreated",function(e,t){O(t)}),Events.on(ConnectionManager,"localusersignedin",function(e,t){R(),ConnectionManager.user(ConnectionManager.getApiClient(t.ServerId)).then(function(e){_(e),c(e)})}),Events.on(ConnectionManager,"localusersignedout",c),Events.on(MediaController,"playerchange",A),R()});