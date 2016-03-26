define(["jQuery"],function(e){function t(e,t){var i=Globalize.translate("MessageConfirmResetTuner");require(["confirm"],function(n){n(i,Globalize.translate("HeaderResetTuner")).then(function(){Dashboard.showLoadingMsg(),ApiClient.resetLiveTvTuner(t).then(function(){Dashboard.hideLoadingMsg(),s(e)})})})}function i(i,n){var a="";if(n.length){a+='<div class="paperList">';for(var r=0,o=n.length;o>r;r++){var s=n[r];a+="<paper-icon-item>",a+='<paper-fab mini style="background:#52B54B;" icon="live-tv" item-icon></paper-fab>',a+="<paper-item-body two-line>",a+="<div>",a+=s.Name,a+="</div>",a+="<div secondary>",a+=s.SourceType,a+="</div>",a+="<div secondary>","RecordingTv"==s.Status?s.ChannelName?(a+='<a href="itemdetails.html?id='+s.ChannelId+'">',a+=Globalize.translate("StatusRecordingProgram").replace("{0}",s.ChannelName),a+="</a>"):a+=Globalize.translate("StatusRecording"):"LiveTv"==s.Status?s.ChannelName?(a+='<a href="itemdetails.html?id='+s.ChannelId+'">',a+=Globalize.translate("StatusWatchingProgram").replace("{0}",s.ChannelName),a+="</a>"):a+=Globalize.translate("StatusWatching"):a+=s.Status,a+="</div>",a+="</paper-item-body>",s.CanReset&&(a+='<paper-icon-button icon="refresh" data-tunerid="'+s.Id+'" title="'+Globalize.translate("ButtonResetTuner")+'" class="btnResetTuner"></paper-icon-button>'),a+="</paper-icon-item>"}a+="</div>"}n.length?i.querySelector(".tunerSection").classList.remove("hide"):i.querySelector(".tunerSection").classList.add("hide");var l=e(".tunerList",i).html(a);e(".btnResetTuner",l).on("click",function(){var e=this.getAttribute("data-tunerid");t(i,e)})}function n(e){var t="";t+="<div>";var i=e.HomePageUrl||"#";t+='<p><a href="'+i+'" target="_blank">'+e.Name+"</a></p>";var n=e.Version||"Unknown";n+=e.HasUpdateAvailable?' <a style="margin-left: .25em;" href="'+i+'" target="_blank">'+Globalize.translate("LiveTvUpdateAvailable")+"</a>":'<img src="css/images/checkmarkgreen.png" style="height: 17px; margin-left: 10px; margin-right: 0; position: relative; top: 5px; border-radius:3px;" /> '+Globalize.translate("LabelVersionUpToDate"),t+="<p>"+n+"</p>";var a=e.Status;return"Ok"==e.Status?a='<span style="color:green;">'+a+"</span>":(e.StatusMessage&&(a+=" ("+e.StatusMessage+")"),a='<span style="color:red;">'+a+"</span>"),t+="<p>"+Globalize.translate("ValueStatus",a)+"</p>",t+="</div>"}function a(t,a){a.IsEnabled?e(".liveTvStatusContent",t).show():e(".liveTvStatusContent",t).hide();var o=a.Services.filter(function(e){return e.IsVisible});o.length?e(".servicesSection",t).show():e(".servicesSection",t).hide(),e(".servicesList",t).html(o.map(n).join(""));for(var s=[],l=0,d=a.Services.length;d>l;l++)for(var u=0,v=a.Services[l].Tuners.length;v>u;u++)s.push(a.Services[l].Tuners[u]);i(t,s),ApiClient.getNamedConfiguration("livetv").then(function(e){r(t,e.TunerHosts),c(t,e.ListingProviders)}),Dashboard.hideLoadingMsg()}function r(t,i){var n="";if(i.length){n+='<div class="paperList">';for(var a=0,r=i.length;r>a;a++){var s=i[a],l="livetvtunerprovider-"+s.Type+".html?id="+s.Id;n+="<paper-icon-item>",n+='<paper-fab mini style="background:#52B54B;" icon="live-tv" item-icon></paper-fab>',n+="<paper-item-body two-line>",n+='<a class="clearLink" href="'+l+'">',n+="<div>",n+=s.FriendlyName||u(s.Type),n+="</div>",n+="<div secondary>",n+=s.Url,n+="</div>",n+="</a>",n+="</paper-item-body>",n+='<paper-icon-button icon="delete" data-id="'+s.Id+'" title="'+Globalize.translate("ButtonDelete")+'" class="btnDeleteDevice"></paper-icon-button>',n+="</paper-icon-item>"}n+="</div>"}var c=e(".devicesList",t).html(n);e(".btnDeleteDevice",c).on("click",function(){var e=this.getAttribute("data-id");o(t,e)})}function o(e,t){var i=Globalize.translate("MessageConfirmDeleteTunerDevice");require(["confirm"],function(n){n(i,Globalize.translate("HeaderDeleteDevice")).then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("LiveTv/TunerHosts",{Id:t})}).then(function(){s(e)})})})}function s(e){Dashboard.showLoadingMsg(),ApiClient.getLiveTvInfo().then(function(t){a(e,t)})}function l(t){t.querySelector(".dlgAddDevice").close(),Dashboard.showLoadingMsg(),ApiClient.ajax({type:"POST",url:ApiClient.getUrl("LiveTv/TunerHosts"),data:JSON.stringify({Type:e("#selectTunerDeviceType",t).val(),Url:e("#txtDevicePath",t).val()}),contentType:"application/json"}).then(function(){s(t)},function(){Dashboard.alert({message:Globalize.translate("ErrorAddingTunerDevice")})})}function c(t,i){var n="";if(i.length){n+='<div class="paperList">';for(var a=0,r=i.length;r>a;a++){var o=i[a];n+="<paper-icon-item>",n+='<paper-fab mini style="background:#52B54B;" icon="dvr" item-icon></paper-fab>',n+="<paper-item-body two-line>",n+='<a class="clearLink" href="'+p(o.Type)+"&id="+o.Id+'">',n+="<div>",n+=v(o.Type),n+="</div>",n+="</a>",n+="</paper-item-body>",n+='<paper-icon-button icon="delete" data-id="'+o.Id+'" title="'+Globalize.translate("ButtonDelete")+'" class="btnDelete"></paper-icon-button>',n+="</paper-icon-item>"}n+="</div>"}var s=e(".providerList",t).html(n);e(".btnDelete",s).on("click",function(){var e=this.getAttribute("data-id");d(t,e)})}function d(e,t){var i=Globalize.translate("MessageConfirmDeleteGuideProvider");require(["confirm"],function(n){n(i,Globalize.translate("HeaderDeleteProvider")).then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("LiveTv/ListingProviders",{Id:t})}).then(function(){s(e)},function(){s(e)})})})}function u(e){switch(e=e.toLowerCase()){case"m3u":return"M3U Playlist";case"hdhomerun":return"HDHomerun";case"satip":return"DVB";default:return"Unknown"}}function v(e){switch(e=e.toLowerCase()){case"schedulesdirect":return"Schedules Direct";case"emby":return"Emby Guide";default:return"Unknown"}}function p(e){switch(e=e.toLowerCase()){case"schedulesdirect":return"livetvguideprovider.html?type=schedulesdirect";case"emby":return"livetvguideprovider.html?type=emby"}}function h(e){var t=[];t.push({name:"Schedules Direct",id:"SchedulesDirect"}),t.push({name:Globalize.translate("ButtonOther"),id:"other"}),require(["actionsheet"],function(i){i.show({items:t,positionTo:e,callback:function(e){"other"==e?Dashboard.alert({message:Globalize.translate("ForAdditionalLiveTvOptions")}):Dashboard.navigate(p(e))}})})}function f(e){var t=[];t.push({name:"HDHomerun",id:"hdhomerun"}),t.push({name:u("m3u"),id:"m3u"}),t.push({name:Globalize.translate("ButtonOther"),id:"other"}),require(["actionsheet"],function(i){i.show({items:t,positionTo:e,callback:function(e){"other"==e?Dashboard.alert({message:Globalize.translate("ForAdditionalLiveTvOptions")}):Dashboard.navigate("livetvtunerprovider-"+e+".html")}})})}e(document).on("pageinit","#liveTvStatusPage",function(){var t=this;e(".btnAddDevice",t).on("click",function(){f(this)}),e(".formAddDevice",t).on("submit",function(){return l(t),!1}),e(".btnAddProvider",t).on("click",function(){h(this)})}).on("pageshow","#liveTvStatusPage",function(){var t=this;s(t),e(".btnRefresh",t).taskButton({mode:"on",progressElem:t.querySelector(".refreshGuideProgress"),taskKey:"RefreshGuide"})}).on("pagehide","#liveTvStatusPage",function(){var t=this;e(".btnRefreshGuide",t).taskButton({mode:"off"})})});