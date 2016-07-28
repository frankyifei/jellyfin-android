define(["layoutManager","datetime","mediaInfo","backdrop","listView","itemContextMenu","itemHelper","userdataButtons","dom","scrollStyles","emby-itemscontainer"],function(e,t,a,i,r,s,n,l,o){function d(e){var t=e.id;if(t)return ApiClient.getItem(Dashboard.getCurrentUserId(),t);var a=e.genre;if(a)return ApiClient.getGenre(a,Dashboard.getCurrentUserId());if(a=e.musicgenre)return ApiClient.getMusicGenre(a,Dashboard.getCurrentUserId());if(a=e.gamegenre)return ApiClient.getGameGenre(a,Dashboard.getCurrentUserId());if(a=e.musicartist)return ApiClient.getArtist(a,Dashboard.getCurrentUserId());throw new Error("Invalid request")}function c(e,t){Dashboard.showLoadingMsg(),d(t).then(function(a){p(e,t,a)})}function u(e,t,a){var i,r,s=e.querySelectorAll("."+t);for(i=0,r=s.length;r>i;i++)a?s[i].classList.remove("hide"):s[i].classList.add("hide")}function m(e,t){return{item:e,open:!1,play:!1,queue:!1,playAllFromHere:!1,queueAllFromHere:!1,sync:!1,positionTo:t}}function p(a,r,l){ut=l;var o=r.context;LibraryMenu.setBackButtonVisible(!0),LibraryMenu.setMenuButtonVisible(!1),LibraryBrowser.renderName(l,a.querySelector(".itemName"),!1,o),LibraryBrowser.renderParentName(l,a.querySelector(".parentName"),o),LibraryMenu.setTitle(l.SeriesName||l.Name),Dashboard.getCurrentUser().then(function(r){window.scrollTo(0,0),h(a,l,r),b(a,l,o,r),I(a,l,o);var d=!1;if("MusicArtist"!=l.Type&&"MusicAlbum"!=l.Type&&"Playlist"!=l.Type&&"BoxSet"!=l.Type&&"Audio"!=l.MediaType&&e.mobile)d=LibraryBrowser.renderDetailPageBackdrop(a,l),i.clear();else{var c=a.querySelector("#itemBackdrop");c.classList.add("noBackdrop"),c.style.backgroundImage="none",i.setBackdrops([l])}var p=d&&a.classList.contains("noSecondaryNavPage");LibraryMenu.setTransparentMenu(p);var y=!1;if("Program"==l.Type){var v=new Date;v>=t.parseISO8601Date(l.StartDate,!0)&&v<t.parseISO8601Date(l.EndDate,!0)?(u(a,"btnPlay",!0),y=!0):u(a,"btnPlay")}else MediaController.canPlay(l)?(u(a,"btnPlay",!0),y=!0):u(a,"btnPlay");l.LocalTrailerCount&&"Full"==l.PlayAccess?u(a,"btnPlayTrailer",!0):u(a,"btnPlayTrailer"),n.canSync(r,l)?u(a,"btnSync",!0):u(a,"btnSync"),"Program"==l.Type&&l.TimerId?u(a,"btnCancelRecording",!0):u(a,"btnCancelRecording"),"Program"!=l.Type||l.TimerId||l.SeriesTimerId?(u(a,"btnRecord"),u(a,"btnFloatingRecord")):y?(u(a,"btnRecord",!0),u(a,"btnFloatingRecord")):(u(a,"btnRecord"),u(a,"btnFloatingRecord",!0));for(var g=a.querySelectorAll(".btnPlayExternalTrailer"),f=0,S=g.length;S>f;f++)!l.LocalTrailerCount&&l.RemoteTrailers.length&&"Full"==l.PlayAccess?(g[f].classList.remove("hide"),g[f].href=l.RemoteTrailers[0].Url):(g[f].classList.add("hide"),g[f].href="#");var T=(l.MediaSources||[]).filter(function(e){return"Grouping"==e.Type});r.Policy.IsAdministrator&&T.length?a.querySelector(".splitVersionContainer").classList.remove("hide"):a.querySelector(".splitVersionContainer").classList.add("hide"),s.getCommands(m(l)).then(function(e){e.length?u(a,"btnMoreCommands",!0):u(a,"btnMoreCommands")}),r.Policy.IsAdministrator?a.querySelector(".chapterSettingsButton").classList.remove("hide"):a.querySelector(".chapterSettingsButton").classList.add("hide");var L=a.querySelector("#itemBirthday");if("Person"==l.Type&&l.PremiereDate)try{var C=t.parseISO8601Date(l.PremiereDate,!0).toDateString();L.classList.remove("hide"),L.innerHTML=Globalize.translate("BirthDateValue").replace("{0}",C)}catch(M){L.classList.add("hide")}else L.classList.add("hide");var A=a.querySelector("#itemBirthday");if("Person"==l.Type&&l.EndDate)try{var P=t.parseISO8601Date(l.EndDate,!0).toDateString();A.classList.remove("hide"),A.innerHTML=Globalize.translate("DeathDateValue").replace("{0}",P)}catch(M){A.classList.add("hide")}var q=a.querySelector("#itemBirthLocation");if("Person"==l.Type&&l.ProductionLocations&&l.ProductionLocations.length){var w='<a class="textlink" target="_blank" href="https://maps.google.com/maps?q='+l.ProductionLocations[0]+'">'+l.ProductionLocations[0]+"</a>";q.classList.remove("hide"),q.innerHTML=Globalize.translate("BirthPlaceValue").replace("{0}",w)}else q.classList.add("hide")});var d=!1;if("Virtual"==l.LocationType&&"Episode"==l.Type)try{l.PremiereDate&&(new Date).getTime()>=t.parseISO8601Date(l.PremiereDate,!0).getTime()&&(d=!0)}catch(c){}v(a,l),a.dispatchEvent(new CustomEvent("displayingitem",{detail:{item:l,context:o},bubbles:!0})),Dashboard.hideLoadingMsg()}function h(e,t,a){LibraryBrowser.renderDetailImage(e.querySelector(".detailImageContainer"),t,a.Policy.IsAdministrator&&"Photo"!=t.MediaType)}function y(e,t){LibraryBrowser.refreshDetailImageUserData(e.querySelector(".detailImageContainer"),t)}function v(e,t){e.querySelector("#peopleHeader").innerHTML=Globalize.translate("Audio"==t.MediaType||"MusicAlbum"==t.Type||"Book"==t.MediaType||"Photo"==t.MediaType?"HeaderPeople":"HeaderCastAndCrew")}function g(e,t,a){var i=e.querySelector(".nextUpSection");return"Series"!=t.Type?void i.classList.add("hide"):void ApiClient.getNextUpEpisodes({SeriesId:t.Id,UserId:a.Id}).then(function(e){e.Items.length?i.classList.remove("hide"):i.classList.add("hide");var a=LibraryBrowser.getPosterViewHtml({items:e.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==t.Type&&t.IndexNumber,overlayText:!0,lazy:!0,overlayPlayButton:!0}),r=i.querySelector(".nextUpItems");r.innerHTML=a,ImageLoader.lazyChildren(r)})}function b(e,t,a,i){e.querySelector(".collectionItems").innerHTML="","TvChannel"==t.Type?(e.querySelector("#childrenCollapsible").classList.remove("hide"),k(e,t,i)):"Playlist"==t.Type?(e.querySelector("#childrenCollapsible").classList.remove("hide"),B(e,t,i)):"Studio"==t.Type||"Person"==t.Type||"Genre"==t.Type||"MusicGenre"==t.Type||"GameGenre"==t.Type||"MusicArtist"==t.Type?(e.querySelector("#childrenCollapsible").classList.remove("hide"),H(e,t,i)):t.IsFolder?("BoxSet"==t.Type?e.querySelector("#childrenCollapsible").classList.add("hide"):e.querySelector("#childrenCollapsible").classList.remove("hide"),R(e,t)):e.querySelector("#childrenCollapsible").classList.add("hide"),"Series"==t.Type?g(e,t,i):e.querySelector(".nextUpSection").classList.add("hide"),t.MediaSources&&t.MediaSources.length&&K(e,t);var r=t.Chapters||[];r.length?(e.querySelector("#scenesCollapsible").classList.remove("hide"),_(e,t,i,3)):e.querySelector("#scenesCollapsible").classList.add("hide"),t.SpecialFeatureCount&&0!=t.SpecialFeatureCount&&"Series"!=t.Type?(e.querySelector("#specialsCollapsible").classList.remove("hide"),$(e,t,i,6)):e.querySelector("#specialsCollapsible").classList.add("hide"),t.People&&t.People.length?(e.querySelector("#castCollapsible").classList.remove("hide"),et(e,t,a,C()?null:6)):e.querySelector("#castCollapsible").classList.add("hide"),t.PartCount&&t.PartCount>1?(e.querySelector("#additionalPartsCollapsible").classList.remove("hide"),Y(e,t,i)):e.querySelector("#additionalPartsCollapsible").classList.add("hide"),e.querySelector("#themeSongsCollapsible").classList.add("hide"),e.querySelector("#themeVideosCollapsible").classList.add("hide"),"MusicAlbum"==t.Type?X(e,t,i):e.querySelector("#musicVideosCollapsible").classList.add("hide"),O(e,t,i),C()?U(e,t):U(e,t,1)}function I(e,t,i,r){w(e,t,i),q(e,t),r||L(e,t,i);var s=e.querySelector(".tagline");t.Taglines&&t.Taglines.length?(s.classList.remove("hide"),s.innerHTML=t.Taglines[0]):s.classList.add("hide");var n=e.querySelector(".topOverview"),l=e.querySelector(".bottomOverview"),o=screen.availHeight<800||screen.availWidth<600;"MusicAlbum"==t.Type||"MusicArtist"==t.Type||"Season"==t.Type&&o?(LibraryBrowser.renderOverview([l],t),n.classList.add("hide"),l.classList.remove("hide")):(LibraryBrowser.renderOverview([n],t),n.classList.remove("hide"),l.classList.add("hide")),LibraryBrowser.renderAwardSummary(e.querySelector("#awardSummary"),t);var d,c,u=e.querySelectorAll(".itemMiscInfo");for(d=0,c=u.length;c>d;d++)a.fillPrimaryMediaInfo(u[d],t,{interactive:!0});var m=e.querySelectorAll(".itemGenres");for(d=0,c=m.length;c>d;d++)LibraryBrowser.renderGenres(m[d],t,null,r);LibraryBrowser.renderStudios(e.querySelector(".itemStudios"),t,r),E(e,t),LibraryBrowser.renderLinks(e.querySelector(".itemExternalLinks"),t),e.querySelector(".criticRatingScore").innerHTML=(t.CriticRating||"0")+"%",t.CriticRatingSummary?(e.querySelector("#criticRatingSummary").classList.remove("hide"),e.querySelector(".criticRatingSummaryText").innerHTML=t.CriticRatingSummary):e.querySelector("#criticRatingSummary").classList.add("hide"),D(e,t),z(e,t,r);var p=e.querySelector("#players");t.Players?(p.classList.remove("hide"),p.innerHTML=t.Players+" Player"):p.classList.add("hide");var h=e.querySelectorAll(".artist");for(d=0,c=h.length;c>d;d++)t.ArtistItems&&t.ArtistItems.length&&"MusicAlbum"!=t.Type?(h[d].classList.remove("hide"),h[d].innerHTML=T(t.ArtistItems,i)):h[d].classList.add("hide");t.MediaSources&&t.MediaSources.length&&t.Path?e.querySelector(".audioVideoMediaInfo").classList.remove("hide"):e.querySelector(".audioVideoMediaInfo").classList.add("hide"),"Photo"==t.MediaType?(e.querySelector(".photoInfo").classList.remove("hide"),f(e,t)):e.querySelector(".photoInfo").classList.add("hide"),S(e,t)}function f(e,t){var a="",i=[];if(t.CameraMake&&i.push(Q(Globalize.translate("MediaInfoCameraMake"),t.CameraMake)),t.CameraModel&&i.push(Q(Globalize.translate("MediaInfoCameraModel"),t.CameraModel)),t.Altitude&&i.push(Q(Globalize.translate("MediaInfoAltitude"),t.Altitude.toFixed(1))),t.Aperture&&i.push(Q(Globalize.translate("MediaInfoAperture"),"F"+t.Aperture.toFixed(1))),t.ExposureTime){var r=1/t.ExposureTime;i.push(Q(Globalize.translate("MediaInfoExposureTime"),"1/"+r+" s"))}t.FocalLength&&i.push(Q(Globalize.translate("MediaInfoFocalLength"),t.FocalLength.toFixed(1)+" mm")),t.ImageOrientation,t.IsoSpeedRating&&i.push(Q(Globalize.translate("MediaInfoIsoSpeedRating"),t.IsoSpeedRating)),t.Latitude&&i.push(Q(Globalize.translate("MediaInfoLatitude"),t.Latitude.toFixed(1))),t.Longitude&&i.push(Q(Globalize.translate("MediaInfoLongitude"),t.Longitude.toFixed(1))),t.ShutterSpeed&&i.push(Q(Globalize.translate("MediaInfoShutterSpeed"),t.ShutterSpeed)),t.Software&&i.push(Q(Globalize.translate("MediaInfoSoftware"),t.Software)),a+=i.join("<br/>"),e.querySelector(".photoInfoContent").innerHTML=a}function S(e){var t=e.querySelector(".tabDetails"),a=t.textContent||t.innerText||"";a.trim()?e.querySelector(".detailsSection").classList.remove("hide"):e.querySelector(".detailsSection").classList.add("hide")}function T(e){for(var t=[],a=0,i=e.length;i>a;a++){var r=e[a];t.push('<a class="textlink" href="itemdetails.html?id='+r.Id+'">'+r.Name+"</a>")}return t=t.join(" / "),1==e.length?Globalize.translate("ValueArtist",t):e.length>1?Globalize.translate("ValueArtists",t):t}function L(e,t,a){var i=e.querySelector(".lnkPreviousItem"),r=e.querySelector(".lnkNextItem");if("Episode"!=t.Type&&"Season"!=t.Type&&"Audio"!=t.Type&&"Photo"!=t.Type)return r.classList.add("hide"),void i.classList.add("hide");var s;s="Season"==t.Type?ApiClient.getSeasons(t.SeriesId,{userId:Dashboard.getCurrentUserId(),AdjacentTo:t.Id}):"Episode"==t.Type&&t.SeasonId?ApiClient.getEpisodes(t.SeriesId,{seasonId:t.SeasonId,userId:Dashboard.getCurrentUserId(),AdjacentTo:t.Id}):ApiClient.getItems(Dashboard.getCurrentUserId(),{AdjacentTo:t.Id,ParentId:t.ParentId,SortBy:"SortName"}),a=a||"",s.then(function(e){for(var s=!1,n=0,l=e.Items.length;l>n;n++){var o=e.Items[n];o.Id==t.Id?s=!0:s?(r.classList.remove("hide"),r.href="itemdetails.html?id="+o.Id+"&context="+a):(i.classList.remove("hide"),i.href="itemdetails.html?id="+o.Id+"&context="+a)}})}function C(){return browserInfo.mobile&&AppInfo.enableAppLayouts&&screen.availWidth<=1e3}function M(){return C()?"overflowPortrait":"detailPagePortrait"}function A(){return C()?"overflowSquare":"detailPageSquare"}function P(){return C()?"overflowBackdrop":"detailPage169"}function q(e,t){var a=e.querySelector("#moreFromSection");if(a)return"MusicAlbum"==t.Type&&t.AlbumArtists&&t.AlbumArtists.length?void ApiClient.getItems(Dashboard.getCurrentUserId(),{IncludeItemTypes:"MusicAlbum",ArtistIds:t.AlbumArtists[0].Id,Recursive:!0,ExcludeItemIds:t.Id}).then(function(i){if(!i.Items.length)return void a.classList.add("hide");a.classList.remove("hide"),a.querySelector(".moreFromHeader").innerHTML=Globalize.translate("MoreFromValue",t.AlbumArtists[0].Name);var r="";r+=C()?'<div is="emby-itemscontainer" class="hiddenScrollX itemsContainer">':'<div is="emby-itemscontainer" class="itemsContainer">';var s="MusicAlbum"==t.Type||"MusicArtist"==t.Type?A():M();r+=LibraryBrowser.getPosterViewHtml({items:i.Items,shape:s,showParentTitle:"MusicAlbum"==t.Type,centerText:!0,showTitle:"MusicAlbum"==t.Type||"Game"==t.Type||"MusicArtist"==t.Type,coverImage:"MusicAlbum"==t.Type||"MusicArtist"==t.Type,overlayPlayButton:!0}),r+="</div>";var n=e.querySelector("#moreFromItems");n.innerHTML=r,ImageLoader.lazyChildren(n)}):void a.classList.add("hide")}function w(e,t,a){var i=e.querySelector("#similarCollapsible");if(i){if("Movie"!=t.Type&&"Trailer"!=t.Type&&"Series"!=t.Type&&"Program"!=t.Type&&"Recording"!=t.Type&&"Game"!=t.Type&&"MusicAlbum"!=t.Type&&"MusicArtist"!=t.Type&&"ChannelVideoItem"!=t.Type)return void i.classList.add("hide");i.classList.remove("hide");var r="MusicAlbum"==t.Type||"MusicArtist"==t.Type?A():M(),s={userId:Dashboard.getCurrentUserId(),limit:8,fields:"PrimaryImageAspectRatio,UserData,SyncInfo,CanDelete"};"MusicAlbum"==t.Type&&t.AlbumArtists&&t.AlbumArtists.length&&(s.ExcludeArtistIds=t.AlbumArtists[0].Id),C()&&(s.limit=12),ApiClient.getSimilarItems(t.Id,s).then(function(s){if(!s.Items.length)return void i.classList.add("hide");i.classList.remove("hide"),i.querySelector(".similiarHeader").innerHTML=Globalize.translate("HeaderIfYouLikeCheckTheseOut",t.Name);var n="";n+=C()?'<div is="emby-itemscontainer" class="hiddenScrollX itemsContainer">':'<div is="emby-itemscontainer" class="itemsContainer">',n+=LibraryBrowser.getPosterViewHtml({items:s.Items,shape:r,showParentTitle:"MusicAlbum"==t.Type,centerText:!0,showTitle:"MusicAlbum"==t.Type||"Game"==t.Type||"MusicArtist"==t.Type,context:a,lazy:!0,showDetailsMenu:!0,coverImage:"MusicAlbum"==t.Type||"MusicArtist"==t.Type,overlayPlayButton:!0}),n+="</div>";var l=e.querySelector("#similarContent");l.innerHTML=n,ImageLoader.lazyChildren(l)})}}function z(e,t,a){var i=e.querySelector("#seriesAirTime");if("Series"!=t.Type)return void i.classList.add("hide");var r="";t.AirDays&&t.AirDays.length&&(r+=7==t.AirDays.length?"daily":t.AirDays.map(function(e){return e+"s"}).join(",")),t.AirTime&&(r+=" at "+t.AirTime),t.Studios.length&&(r+=a?" on "+t.Studios[0].Name:' on <a class="textlink" href="itemdetails.html?id='+t.Studios[0].Id+'">'+t.Studios[0].Name+"</a>"),r?(r=("Ended"==t.Status?"Aired ":"Airs ")+r,i.innerHTML=r,i.classList.remove("hide")):i.classList.add("hide")}function D(e,t){var a=e.querySelector(".itemTags");if(t.Tags&&t.Tags.length){var i="";i+="<p>"+Globalize.translate("HeaderTags")+"</p>";for(var r=0,s=t.Tags.length;s>r;r++)i+='<div class="itemTag">'+t.Tags[r]+"</div>";a.innerHTML=i,a.classList.remove("hide")}else a.classList.add("hide")}function G(e,t){return t=Object.assign({},t),function(a,i,r){return t.StartIndex=a,t.Limit=i,t.Fields=r,ApiClient.getEpisodes(e,t)}}function x(e){return e=Object.assign({},e),function(t,a,i){return e.StartIndex=t,e.Limit=a,e.Fields=i,ApiClient.getItems(Dashboard.getCurrentUserId(),e)}}function R(e,t){mt=null;var a="ItemCounts,AudioInfo,PrimaryImageAspectRatio,SyncInfo,CanDelete",i={ParentId:t.Id,Fields:a};"BoxSet"!==t.Type&&(i.SortBy="SortName");var s,n=Dashboard.getCurrentUserId();"Series"==t.Type?s=ApiClient.getSeasons(t.Id,{userId:n,Fields:a}):"Season"==t.Type?(s=ApiClient.getEpisodes(t.SeriesId,{seasonId:t.Id,userId:n,Fields:a}),mt=G(t.SeriesId,{seasonId:t.Id,userId:n,Fields:a})):"MusicAlbum"==t.Type&&(mt=x(i)),s=s||ApiClient.getItems(Dashboard.getCurrentUserId(),i),s.then(function(a){var i="",s=!1;"MusicAlbum"==t.Type?i=r.getListViewHtml({items:a.Items,smallIcon:!0,showIndex:!0,index:"disc",showIndexNumber:!0,playFromHere:!0,action:"playallfromhere",lazy:!0}):"Series"==t.Type?(s=C(),i=LibraryBrowser.getPosterViewHtml({items:a.Items,shape:M(),showTitle:!0,centerText:!0,lazy:!0,overlayPlayButton:!0})):"Season"==t.Type?i=LibraryBrowser.getPosterViewHtml({items:a.Items,shape:"detailPage169",showTitle:!0,displayAsSpecial:"Season"==t.Type&&t.IndexNumber,playFromHere:!0,overlayText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:AppInfo.enableAppLayouts}):"GameSystem"==t.Type&&(i=LibraryBrowser.getPosterViewHtml({items:a.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0}));var n=e.querySelector(".childrenItemsContainer");if(n.innerHTML=i,ImageLoader.lazyChildren(n),s?n.classList.add("hiddenScrollX"):n.classList.remove("hiddenScrollX"),"BoxSet"==t.Type){var l=[{name:Globalize.translate("HeaderMovies"),type:"Movie"},{name:Globalize.translate("HeaderSeries"),type:"Series"},{name:Globalize.translate("HeaderAlbums"),type:"MusicAlbum"},{name:Globalize.translate("HeaderGames"),type:"Game"},{name:Globalize.translate("HeaderBooks"),type:"Book"}];F(e,t,l,a.Items)}}),e.querySelector("#childrenTitle").innerHTML=Globalize.translate("Season"==t.Type?"HeaderEpisodes":"Series"==t.Type?"HeaderSeasons":"MusicAlbum"==t.Type?"HeaderTracks":"GameSystem"==t.Type?"HeaderGames":"HeaderItems"),"MusicAlbum"==t.Type?e.querySelector(".childrenSectionHeader",e).classList.add("hide"):e.querySelector(".childrenSectionHeader",e).classList.remove("hide")}function H(e,t){require("scripts/itembynamedetailpage".split(","),function(){window.ItemsByName.renderItems(e,t)})}function B(e,t){require("scripts/playlistedit".split(","),function(){PlaylistViewer.render(e,t)})}function k(e,t){require("scripts/livetvcomponents,scripts/livetvchannel,livetvcss".split(","),function(){LiveTvChannelPage.renderPrograms(e,t.Id)})}function F(e,t,a,i){e.querySelector(".collectionItems").innerHTML="";var r,s;for(r=0,s=a.length;s>r;r++){var n=a[r],l=i.filter(function(e){return e.Type==n.type});l.length&&V(e,t,n,l)}var o={name:Globalize.translate("HeaderOtherItems")},d=i.filter(function(e){return!a.filter(function(t){return t.type==e.Type}).length});d.length&&V(e,t,o,d),i.length||V(e,t,{name:Globalize.translate("HeaderItems")},i)}function V(e,t,a,i){var r="";r+='<div class="detailSection">',r+='<div style="display:flex;align-items:center;">',r+="<h1>",r+="<span>"+a.name+"</span>",r+="</h1>",r+='<button class="btnAddToCollection autoSize" type="button" is="paper-icon-button-light" style="margin-left:1em;"><i class="md-icon" icon="add">add</i></button>',r+="</div>",r+='<div is="emby-itemscontainer" class="detailSectionContent itemsContainer">';var s="MusicAlbum"==a.type?"detailPageSquare":"detailPagePortrait";r+=LibraryBrowser.getPosterViewHtml({items:i,shape:s,showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayMoreButton:!0,showAddToCollection:!1,showRemoveFromCollection:!0,collectionId:t.Id}),r+="</div>",r+="</div>";var n=e.querySelector(".collectionItems");n.insertAdjacentHTML("beforeend",r),ImageLoader.lazyChildren(n),n.querySelector(".btnAddToCollection").addEventListener("click",function(){require(["alert"],function(e){e({text:Globalize.translate("AddItemToCollectionHelp"),html:Globalize.translate("AddItemToCollectionHelp")+'<br/><br/><a target="_blank" href="https://github.com/MediaBrowser/Wiki/wiki/Collections">'+Globalize.translate("ButtonLearnMore")+"</a>"})})})}function E(e,t){for(var a=e.querySelectorAll(".userDataIcons"),i=l.getIconsHtml({item:t,style:"fab-mini"}),r=0,s=a.length;s>r;r++)a[r].innerHTML=i}function U(e,t,a){if("Movie"!=t.Type&&"Trailer"!=t.Type&&"MusicVideo"!=t.Type)return void e.querySelector("#criticReviewsCollapsible").classList.add("hide");var i={};a&&(i.limit=a),ApiClient.getCriticReviews(t.Id,i).then(function(i){i.TotalRecordCount||t.CriticRatingSummary||t.AwardSummary?(e.querySelector("#criticReviewsCollapsible").classList.remove("hide"),N(e,i,a)):e.querySelector("#criticReviewsCollapsible").classList.add("hide")})}function N(e,a,i){for(var r="",s=a.Items,n=0,l=s.length;l>n;n++){var o=s[n];r+='<div class="paperList criticReviewPaperList">',r+='<div class="listItem">',null!=o.Score||null!=o.Likes&&(r+=o.Likes?"<div style=\"background-color:transparent;background-image:url('css/images/fresh.png');background-repeat:no-repeat;background-position:center center;background-size: cover;width:40px;height:40px;\"></div>":"<div style=\"background-color:transparent;background-image:url('css/images/rotten.png');background-repeat:no-repeat;background-position:center center;background-size: cover;width:40px;height:40px;\"></div>"),r+='<div class="listItemBody two-line">',r+='<div style="white-space:normal;">'+o.Caption+"</div>";var d=[];if(o.ReviewerName&&d.push(o.ReviewerName),o.Publisher&&d.push(o.Publisher),r+='<div class="secondary">'+d.join(", ")+".",o.Date)try{var c=t.parseISO8601Date(o.Date,!0).toLocaleDateString();r+='<span class="reviewDate">'+c+"</span>"}catch(u){}r+="</div>",o.Url&&(r+='<div class="secondary"><a class="textlink" href="'+o.Url+'" target="_blank">'+Globalize.translate("ButtonFullReview")+"</a></div>"),r+="</div>",r+="</div>",r+="</div>"}i&&a.TotalRecordCount>i&&(r+='<p style="margin: 0;"><button is="emby-button" type="button" class="raised more moreCriticReviews">'+Globalize.translate("ButtonMore")+"</button></p>");var m=e.querySelector("#criticReviewsContent");m.innerHTML=r,C()?m.classList.add("hiddenScrollX"):m.classList.remove("hiddenScrollX")}function O(e,t){ApiClient.getThemeMedia(Dashboard.getCurrentUserId(),t.Id,!0).then(function(a){var i=a.ThemeSongsResult.OwnerId==t.Id?a.ThemeSongsResult.Items:[],r=a.ThemeVideosResult.OwnerId==t.Id?a.ThemeVideosResult.Items:[];W(e,i),j(e,r),e.dispatchEvent(new CustomEvent("thememediadownload",{detail:{themeMediaResult:a},bubbles:!0}))})}function W(e,t){if(t.length){e.querySelector("#themeSongsCollapsible").classList.remove("hide");var a=r.getListViewHtml({items:result.Items,sortBy:query.SortBy});e.querySelector("#themeSongsContent").innerHTML=a}else e.querySelector("#themeSongsCollapsible").classList.add("hide")}function j(e,t,a){if(t.length){e.querySelector("#themeVideosCollapsible").classList.remove("hide");var i=e.querySelector("#themeVideosContent");i.innerHTML=Z(t,a),ImageLoader.lazyChildren(i)}else e.querySelector("#themeVideosCollapsible").classList.add("hide")}function X(e,t,a){ApiClient.getItems(a.Id,{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"MusicVideo",Recursive:!0,Fields:"DateCreated,SyncInfo,CanDelete",Albums:t.Name}).then(function(t){if(t.Items.length){e.querySelector("#musicVideosCollapsible").classList.remove("hide");var i=e.querySelector(".musicVideosContent");i.innerHTML=Z(t.Items,a),ImageLoader.lazyChildren(i)}else e.querySelector("#musicVideosCollapsible").classList.add("hide")})}function Y(e,t,a){ApiClient.getAdditionalVideoParts(a.Id,t.Id).then(function(t){if(t.Items.length){e.querySelector("#additionalPartsCollapsible").classList.remove("hide");var i=e.querySelector("#additionalPartsContent");i.innerHTML=Z(t.Items,a),ImageLoader.lazyChildren(i)}else e.querySelector("#additionalPartsCollapsible").classList.add("hide")})}function _(e,a,i,r,s){var n="",l=a.Chapters||[],o=LibraryBrowser.getPosterViewInfo().backdropWidth;C()?(n+='<div class="hiddenScrollX itemsContainer">',r=null):n+='<div class="itemsContainer">';for(var d=0,c=l.length;c>d&&!(r&&d>=r);d++){var u=l[d],m=u.Name||"Chapter "+d,p="Full"!=a.PlayAccess||s?"":' onclick="ItemDetailPage.play('+u.StartPositionTicks+');"';n+='<a class="card '+P()+'Card" href="#"'+p+">",n+='<div class="cardBox">',n+='<div class="cardScalable">';var h;h=u.ImageTag?ApiClient.getScaledImageUrl(a.Id,{maxWidth:o,tag:u.ImageTag,type:"Chapter",index:d}):"css/images/items/list/chapter.png",n+='<div class="cardPadder"></div>',n+='<div class="cardContent">',n+='<div class="cardImage lazy" data-src="'+h+'"></div>',n+='<div class="cardFooter">',n+='<div class="cardText">'+m+"</div>",n+='<div class="cardText">',n+=t.getDisplayRunningTime(u.StartPositionTicks),n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</div>",n+="</a>"}n+="</div>",r&&l.length>r&&(n+='<p style="margin: 0;"><button is="emby-button" type="button" class="raised more moreScenes">'+Globalize.translate("ButtonMore")+"</button></p>");var y=e.querySelector("#scenesContent");y.innerHTML=n,ImageLoader.lazyChildren(y)}function K(e,t){var a=t.MediaSources.map(function(e){return J(t,e)}).join('<div style="border-top:1px solid #444;margin: 1em 0;"></div>');t.MediaSources.length>1&&(a="<br/>"+a);var i=e.querySelector("#mediaInfoContent");i.innerHTML=a}function J(e,t){var a="";t.Name&&e.MediaSources.length>1&&(a+='<div><span class="mediaInfoAttribute">'+t.Name+"</span></div><br/>");for(var i=0,r=t.MediaStreams.length;r>i;i++){var s=t.MediaStreams[i];if("Data"!=s.Type){a+='<div class="mediaInfoStream">';var n=Globalize.translate("MediaInfoStreamType"+s.Type);a+='<div class="mediaInfoStreamType">'+n+"</div>";var l=[];s.Language&&"Video"!=s.Type&&l.push(Q(Globalize.translate("MediaInfoLanguage"),s.Language)),s.Codec&&l.push(Q(Globalize.translate("MediaInfoCodec"),s.Codec.toUpperCase())),s.CodecTag&&l.push(Q(Globalize.translate("MediaInfoCodecTag"),s.CodecTag)),null!=s.IsAVC&&l.push(Q("AVC",s.IsAVC?"Yes":"No")),s.Profile&&l.push(Q(Globalize.translate("MediaInfoProfile"),s.Profile)),s.Level&&l.push(Q(Globalize.translate("MediaInfoLevel"),s.Level)),(s.Width||s.Height)&&l.push(Q(Globalize.translate("MediaInfoResolution"),s.Width+"x"+s.Height)),s.AspectRatio&&"mjpeg"!=s.Codec&&l.push(Q(Globalize.translate("MediaInfoAspectRatio"),s.AspectRatio)),"Video"==s.Type&&(null!=s.IsAnamorphic&&l.push(Q(Globalize.translate("MediaInfoAnamorphic"),s.IsAnamorphic?"Yes":"No")),l.push(Q(Globalize.translate("MediaInfoInterlaced"),s.IsInterlaced?"Yes":"No"))),(s.AverageFrameRate||s.RealFrameRate)&&l.push(Q(Globalize.translate("MediaInfoFramerate"),s.AverageFrameRate||s.RealFrameRate)),s.ChannelLayout&&l.push(Q(Globalize.translate("MediaInfoLayout"),s.ChannelLayout)),s.Channels&&l.push(Q(Globalize.translate("MediaInfoChannels"),s.Channels+" ch")),s.BitRate&&"mjpeg"!=s.Codec&&l.push(Q(Globalize.translate("MediaInfoBitrate"),parseInt(s.BitRate/1024)+" kbps")),s.SampleRate&&l.push(Q(Globalize.translate("MediaInfoSampleRate"),s.SampleRate+" khz")),s.BitDepth&&l.push(Q(Globalize.translate("MediaInfoBitDepth"),s.BitDepth+" bit")),s.PixelFormat&&l.push(Q(Globalize.translate("MediaInfoPixelFormat"),s.PixelFormat)),s.RefFrames&&l.push(Q(Globalize.translate("MediaInfoRefFrames"),s.RefFrames)),s.NalLengthSize&&l.push(Q("NAL",s.NalLengthSize)),"Video"!=s.Type&&l.push(Q(Globalize.translate("MediaInfoDefault"),s.IsDefault?"Yes":"No")),"Subtitle"==s.Type&&(l.push(Q(Globalize.translate("MediaInfoForced"),s.IsForced?"Yes":"No")),l.push(Q(Globalize.translate("MediaInfoExternal"),s.IsExternal?"Yes":"No"))),"Video"==s.Type&&t.Timestamp&&l.push(Q(Globalize.translate("MediaInfoTimestamp"),t.Timestamp)),s.DisplayTitle&&l.push(Q("Title",s.DisplayTitle)),a+=l.join("<br/>"),a+="</div>"}}if(t.Container&&(a+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoContainer")+'</span><span class="mediaInfoAttribute">'+t.Container+"</span></div>"),t.Formats&&t.Formats.length,t.Path&&"Http"!=t.Protocol&&(a+='<div style="max-width:600px;overflow:hidden;"><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoPath")+'</span><span class="mediaInfoAttribute">'+t.Path+"</span></div>"),t.Size){var o=(t.Size/1048576).toFixed(0);a+='<div><span class="mediaInfoLabel">'+Globalize.translate("MediaInfoSize")+'</span><span class="mediaInfoAttribute">'+o+" MB</span></div>"}return a}function Q(e,t){return'<span class="mediaInfoLabel">'+e+'</span><span class="mediaInfoAttribute">'+t+"</span>"}function Z(e,a,i,r){for(var s="",n=LibraryBrowser.getPosterViewInfo().backdropWidth,l=0,o=e.length;o>l&&!(i&&l>=i);l++){var d=e[l],c="card detailPage169Card",u="itemdetails.html?id="+d.Id,m="Full"==d.PlayAccess?" onclick=\"MediaController.play('"+d.Id+"'); return false;\"":"";s+='<a class="'+c+'" href="'+u+'"'+m+">",s+='<div class="cardBox">',s+='<div class="cardScalable">';var p,h=d.ImageTags||{};p=h.Primary?ApiClient.getScaledImageUrl(d.Id,{maxWidth:n,tag:h.Primary,type:"primary"}):"css/images/items/detail/video.png",s+='<div class="cardPadder"></div>',s+='<div class="cardContent">',s+='<div class="cardImage lazy" data-src="'+p+'"></div>',s+='<div class="cardFooter">',s+='<div class="cardText">'+d.Name+"</div>",s+='<div class="cardText">',s+=""!=d.RunTimeTicks?t.getDisplayRunningTime(d.RunTimeTicks):"&nbsp;",s+="</div>",s+="</div>",s+="</div>",s+="</div>",s+="</div>",s+="</a>"}return i&&e.length>i&&(s+='<p style="margin: 0;padding-left:5px;"><button is="emby-button" type="button" class="raised more '+r+'">'+Globalize.translate("ButtonMore")+"</button></p>"),s}function $(e,t,a,i){ApiClient.getSpecialFeatures(a.Id,t.Id).then(function(t){var r=e.querySelector("#specialsContent");r.innerHTML=Z(t,a,i,"moreSpecials"),ImageLoader.lazyChildren(r)})}function et(e,t,a,i,r){if(C())return void tt(e,t,a,r);for(var s="",n=t.People||[],l=0,o=n.length;o>l&&!(i&&l>=i);l++){var d=n[l],c=r?"#":"itemdetails.html?id="+d.Id;s+='<a class="tileItem smallPosterTileItem" href="'+c+'">';var u,m=!0;d.PrimaryImageTag?u=ApiClient.getScaledImageUrl(d.Id,{maxWidth:100,tag:d.PrimaryImageTag,type:"primary",minScale:2}):(u="css/images/items/list/person.png",m=!1),s+=m?'<div class="tileImage lazy" data-src="'+u+'"></div>':'<div class="tileImage" style="background-image:url(\''+u+"');\"></div>",s+='<div class="tileContent">',s+="<p>"+d.Name+"</p>";var p=d.Role?Globalize.translate("ValueAsRole",d.Role):d.Type;"GuestStar"==p&&(p=Globalize.translate("ValueGuestStar")),p=p||"";var h=40;p.length>h&&(p=p.substring(0,h-3)+"..."),s+="<p>"+p+"</p>",s+="</div>",s+="</a>"}i&&n.length>i&&(s+='<p style="margin: 0;padding-left:5px;"><button is="emby-button" type="button" class="raised more morePeople">'+Globalize.translate("ButtonMore")+"</button></p>");var y=e.querySelector("#castContent");y.innerHTML=s,ImageLoader.lazyChildren(y)}function tt(e,t,a,i){var r="";r+=C()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">';var s=t.People||[];s=s.filter(function(e){return e.PrimaryImageTag}),s.length||(s=t.People||[]);for(var n=0,l=s.length;l>n;n++){var o=s[n],d=i?"#":"itemdetails.html?id="+o.Id;r+='<div class="card '+M()+'Card">',r+='<div class="cardBox">',r+='<div class="cardScalable">';var c,u=!0;o.PrimaryImageTag?c=ApiClient.getScaledImageUrl(o.Id,{maxWidth:100,tag:o.PrimaryImageTag,type:"primary",minScale:2}):(c="css/images/items/list/person.png",u=!1),r+='<div class="cardPadder"></div>',r+='<a class="cardContent" href="'+d+'">',r+=u?'<div class="cardImage coveredCardImage lazy" data-src="'+c+'"></div>':'<div class="cardImage coveredCardImage" style="background-image:url(\''+c+"');\"></div>",r+="</div>",r+="</a>",r+="</div>",r+='<div class="cardFooter outerCardFooter">',r+='<div class="cardText">'+o.Name+"</div>",r+='<div class="cardText">';var m=o.Role?Globalize.translate("ValueAsRole",o.Role):o.Type;"GuestStar"==m&&(m=Globalize.translate("ValueGuestStar")),m=m||"";var p=40;m.length>p&&(m=m.substring(0,p-3)+"..."),r+=m,r+="</div>",r+="</div>",r+="</div>"}r+="</div>";var h=e.querySelector("#castContent");h.innerHTML=r,ImageLoader.lazyChildren(h)}function at(e){MediaController.play({items:[ut],startPositionTicks:e})}function it(e,t){require(["confirm"],function(a){a("Are you sure you wish to split the media sources into separate items?","Split Media Apart").then(function(){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Videos/"+t.id+"/AlternateSources")}).then(function(){Dashboard.hideLoadingMsg(),c(e,t)})})})}function rt(){ApiClient.getLocalTrailers(Dashboard.getCurrentUserId(),ut.Id).then(function(e){MediaController.play({items:e})})}function st(e,t){require(["playMenu"],function(a){a.show({item:e,positionTo:t})})}function nt(e){return"Program"==ut.Type?void ApiClient.getLiveTvChannel(ut.ChannelId,Dashboard.getCurrentUserId()).then(function(t){st(t,e)
}):void st(ut,e)}function lt(e,t,a){require(["confirm"],function(i){i(Globalize.translate("MessageConfirmRecordingCancellation"),Globalize.translate("HeaderConfirmRecordingCancellation")).then(function(){Dashboard.showLoadingMsg(),ApiClient.cancelLiveTvTimer(a).then(function(){require(["toast"],function(e){e(Globalize.translate("MessageRecordingCancelled"))}),c(e,t)})})})}function ot(){var e=this;e.play=at,e.setInitialCollapsibleState=b,e.renderDetails=I,e.renderCriticReviews=U,e.renderCast=et,e.renderScenes=_,e.renderMediaSources=K}function dt(){nt(this)}function ct(){require(["syncDialog"],function(e){e.showMenu({items:[ut]})})}var ut,mt=null;return window.ItemDetailPage=new ot,function(e,t){function a(){rt(e)}function i(){var a=t.id;Dashboard.showLoadingMsg(),require(["recordingCreator"],function(i){i.show(a,ut.ServerId).then(function(){c(e,t)})})}function r(){lt(e,t,ut.TimerId)}function n(){var a=this;s.show(m(ut,a)).then(function(a){a.deleted?Emby.Page.goHome():a.updated&&c(e,t)})}function l(t,a){var i=a;if("UserDataChanged"===i.MessageType&&ut&&i.Data.UserId==Dashboard.getCurrentUserId()){var r=ut.UserData.Key,s=i.Data.UserDataList.filter(function(e){return e.Key==r})[0];s&&(ut.UserData=s,Dashboard.getCurrentUser().then(function(t){y(e,ut,t)}))}}var d,u,p=e.querySelectorAll(".btnPlay");for(d=0,u=p.length;u>d;d++)p[d].addEventListener("click",dt);for(p=e.querySelectorAll(".btnPlayTrailer"),d=0,u=p.length;u>d;d++)p[d].addEventListener("click",a);for(e.querySelector(".btnSplitVersions").addEventListener("click",function(){it(e,t)}),p=e.querySelectorAll(".btnSync"),d=0,u=p.length;u>d;d++)p[d].addEventListener("click",ct);for(p=e.querySelectorAll(".btnRecord,.btnFloatingRecord"),d=0,u=p.length;u>d;d++)p[d].addEventListener("click",i);for(p=e.querySelectorAll(".btnCancelRecording"),d=0,u=p.length;u>d;d++)p[d].addEventListener("click",r);for(p=e.querySelectorAll(".btnMoreCommands"),d=0,u=p.length;u>d;d++)p[d].addEventListener("click",n);var h=e.querySelector(".childrenItemsContainer");h.addEventListener("playallfromhere",function(e){LibraryBrowser.playAllFromHere(mt,e.detail.index)}),h.addEventListener("queueallfromhere",function(e){LibraryBrowser.queueAllFromHere(mt,e.detail.index)}),e.addEventListener("click",function(a){o.parentWithClass(a.target,"moreScenes")?Dashboard.getCurrentUser().then(function(t){_(e,ut,t)}):o.parentWithClass(a.target,"morePeople")?et(e,ut,t.context):o.parentWithClass(a.target,"moreSpecials")?Dashboard.getCurrentUser().then(function(t){$(e,ut,t)}):o.parentWithClass(a.target,"moreCriticReviews")&&U(e,ut)}),e.querySelector(".collectionItems").addEventListener("needsrefresh",function(){R(e,ut)}),e.querySelector(".detailImageContainer").addEventListener("click",function(a){var i=o.parentWithClass(a.target,"itemDetailGalleryLink");i&&LibraryBrowser.editImages(ut.Id).then(function(){c(e,t)})}),e.addEventListener("viewbeforeshow",function(){var e=this;c(e,t),Events.on(ApiClient,"websocketmessage",l)}),e.addEventListener("viewbeforehide",function(){ut=null,Events.off(ApiClient,"websocketmessage",l),LibraryMenu.setTransparentMenu(!1)})}});