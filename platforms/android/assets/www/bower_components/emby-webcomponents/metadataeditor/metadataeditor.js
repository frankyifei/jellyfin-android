define(["itemHelper","dom","layoutManager","dialogHelper","datetime","loading","focusManager","connectionManager","globalize","require","emby-checkbox","emby-input","emby-select","listViewStyle","emby-textarea","emby-button","paper-icon-button-light","css!./../formdialog"],function(e,t,r,a,n,o,l,i,u,s){function c(){return J.classList.contains("dialog")}function d(){c()&&a.close(J)}function p(e,t){function r(){s(["toast"],function(e){e(u.translate("sharedcomponents#MessageItemSaved"))}),o.hide(),d(!0)}var a=P();a.updateItem(t).then(function(){var n=e.querySelector("#selectContentType").value||"";(Q.ContentType||"")!=n?a.ajax({url:a.getUrl("Items/"+t.Id+"/ContentType",{ContentType:n}),type:"POST"}).then(function(){r()}):r()})}function y(e){var t=e.querySelectorAll(".chkAirDay:checked")||[];return Array.prototype.map.call(t,function(e){return e.getAttribute("data-day")})}function m(e){return e.querySelector("#txtAlbumArtist").value.trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function v(e){return e.querySelector("#txtArtist").value.trim().split(";").filter(function(e){return e.length>0}).map(function(e){return{Name:e}})}function f(e,t,r){var a=e.querySelector(t).value;if(!a)return null;if(X[r]){var o=n.parseISO8601Date(X[r],!0),l=o.toISOString().split("T");if(0==l[0].indexOf(a)){var i=l[1];a+="T"+i}}return a}function S(e){o.show();var t=this;try{var r={Id:X.Id,Name:t.querySelector("#txtName").value,OriginalTitle:t.querySelector("#txtOriginalName").value,ForcedSortName:t.querySelector("#txtSortName").value,DisplayMediaType:t.querySelector("#txtDisplayMediaType").value,CommunityRating:t.querySelector("#txtCommunityRating").value,VoteCount:t.querySelector("#txtCommunityVoteCount").value,HomePageUrl:t.querySelector("#txtHomePageUrl").value,Budget:t.querySelector("#txtBudget").value,Revenue:t.querySelector("#txtRevenue").value,CriticRating:t.querySelector("#txtCriticRating").value,CriticRatingSummary:t.querySelector("#txtCriticRatingSummary").value,IndexNumber:t.querySelector("#txtIndexNumber").value||null,AbsoluteEpisodeNumber:t.querySelector("#txtAbsoluteEpisodeNumber").value,DvdEpisodeNumber:t.querySelector("#txtDvdEpisodeNumber").value,DvdSeasonNumber:t.querySelector("#txtDvdSeasonNumber").value,AirsBeforeSeasonNumber:t.querySelector("#txtAirsBeforeSeason").value,AirsAfterSeasonNumber:t.querySelector("#txtAirsAfterSeason").value,AirsBeforeEpisodeNumber:t.querySelector("#txtAirsBeforeEpisode").value,ParentIndexNumber:t.querySelector("#txtParentIndexNumber").value||null,DisplayOrder:t.querySelector("#selectDisplayOrder").value,Players:t.querySelector("#txtPlayers").value,Album:t.querySelector("#txtAlbum").value,AlbumArtist:m(t),ArtistItems:v(t),Metascore:t.querySelector("#txtMetascore").value,AwardSummary:t.querySelector("#txtAwardSummary").value,Overview:t.querySelector("#txtOverview").value,ShortOverview:t.querySelector("#txtShortOverview").value,Status:t.querySelector("#selectStatus").value,AirDays:y(t),AirTime:t.querySelector("#txtAirTime").value,Genres:g(t.querySelector("#listGenres")),ProductionLocations:g(t.querySelector("#listCountries")),Tags:g(t.querySelector("#listTags")),Keywords:g(t.querySelector("#listKeywords")),Studios:g(t.querySelector("#listStudios")).map(function(e){return{Name:e}}),PremiereDate:f(t,"#txtPremiereDate","PremiereDate"),DateCreated:f(t,"#txtDateAdded","DateCreated"),EndDate:f(t,"#txtEndDate","EndDate"),ProductionYear:t.querySelector("#txtProductionYear").value,AspectRatio:t.querySelector("#txtOriginalAspectRatio").value,Video3DFormat:t.querySelector("#select3dFormat").value,OfficialRating:t.querySelector("#selectOfficialRating").value,CustomRating:t.querySelector("#selectCustomRating").value,People:X.People,LockData:t.querySelector("#chkLockData").checked,LockedFields:Array.prototype.filter.call(t.querySelectorAll(".selectLockedField"),function(e){return!e.checked}).map(function(e){return e.getAttribute("data-value")})};r.ProviderIds=Object.assign({},X.ProviderIds);var a=t.querySelectorAll(".txtExternalId");if(Array.prototype.map.call(a,function(e){var t=e.getAttribute("data-providerkey");r.ProviderIds[t]=e.value}),r.PreferredMetadataLanguage=t.querySelector("#selectLanguage").value,r.PreferredMetadataCountryCode=t.querySelector("#selectCountry").value,"Person"==X.Type){var n=t.querySelector("#txtPlaceOfBirth").value;r.ProductionLocations=n?[n]:[]}if("Series"==X.Type){var l=t.querySelector("#txtSeriesRuntime").value;r.RunTimeTicks=l?6e8*l:null}var i=t.querySelector("#txtTagline").value;r.Taglines=i?[i]:[],p(t,r)}catch(u){alert(u)}return e.preventDefault(),e.stopPropagation(),!1}function g(e){return Array.prototype.map.call(e.querySelectorAll(".textValue"),function(e){return e.textContent})}function b(e,r){s(["prompt"],function(a){a({label:"Value:"}).then(function(a){var n=t.parentWithClass(e,"editableListviewContainer").querySelector(".paperList"),o=g(n);o.push(a),U(n,o,r)})})}function h(e){var r=t.parentWithClass(e,"listItem");r.parentNode.removeChild(r)}function q(e,t,r){s(["personEditor"],function(a){a.show(t).then(function(t){var a=-1==r;a&&X.People.push(t),Y(e,X.People)})})}function T(e,t){s(["itemContextMenu"],function(r){r.show({item:X,positionTo:t,edit:!1,editImages:!0,editSubtitles:!0,sync:!1,share:!1}).then(function(t){t.deleted?Emby.Page.goHome():t.updated&&j(e,X.Id,X.ServerId)})})}function x(e,t){var r=t;"LibraryChanged"===r.MessageType&&-1!=r.Data.ItemsUpdated.indexOf(X.Id)&&j(J,X.Id,X.ServerId)}function A(e,t){Events.on(t,"websocketmessage",x)}function C(e,t){Events.off(t,"websocketmessage",x)}function D(e){var r=t.parentWithClass(e.target,"btnRemoveFromEditorList");if(r)return void h(r);var a=t.parentWithClass(e.target,"btnAddTextItem");a&&b(a)}function P(){return i.getApiClient(X.ServerId)}function L(e,r){e.querySelector(".btnCancel").addEventListener("click",function(){d(!1)}),e.querySelector(".btnMore").addEventListener("click",function(t){P().getCurrentUser().then(function(r){T(e,t.target,r)})}),e.querySelector(".btnHeaderSave").addEventListener("click",function(){e.querySelector(".btnSave").click()}),e.querySelector("#chkLockData").addEventListener("click",function(e){e.target.checked?w(".providerSettingsContainer"):B(".providerSettingsContainer")}),e.removeEventListener("click",D),e.addEventListener("click",D);var a=e.querySelector("form");a.removeEventListener("submit",S),a.addEventListener("submit",S),e.querySelector("#btnAddPerson").addEventListener("click",function(){q(e,{},-1)}),e.querySelector("#peopleList").addEventListener("click",function(r){var a=t.parentWithClass(r.target,"btnDeletePerson");if(a){var n=parseInt(a.getAttribute("data-index"));X.People.splice(n,1),Y(e,X.People)}var o=t.parentWithClass(r.target,"btnEditPerson");if(o){var n=parseInt(o.getAttribute("data-index"));q(e,X.People[n],n)}}),c()&&A(e,r)}function N(e,t){var r=i.getApiClient(t);return e?r.getItem(r.getCurrentUserId(),e):r.getRootFolder(r.getCurrentUserId())}function E(e,t){var r=i.getApiClient(t);return e?r.getJSON(r.getUrl("Items/"+e+"/MetadataEditor")):Promise.resolve({})}function I(e,t){var r="";r+="<option value=''></option>";for(var a=0,n=t.length;n>a;a++){var o=t[a];r+="<option value='"+o.TwoLetterISORegionName+"'>"+o.DisplayName+"</option>"}e.innerHTML=r}function R(e,t){var r="";r+="<option value=''></option>";for(var a=0,n=t.length;n>a;a++){var o=t[a];r+="<option value='"+o.TwoLetterISOLanguageName+"'>"+o.DisplayName+"</option>"}e.innerHTML=r}function O(e,t){t.ContentTypeOptions.length?B("#fldContentType",e):w("#fldContentType",e);var r=t.ContentTypeOptions.map(function(e){return'<option value="'+e.Value+'">'+e.Name+"</option>"}).join(""),a=e.querySelector("#selectContentType");a.innerHTML=r,a.value=t.ContentType||""}function M(){var e=this.getAttribute("data-formatstring"),t=this.getAttribute("data-buttonclass");this.value?document.querySelector("."+t).setAttribute("href",e.replace("{0}",this.value)):document.querySelector("."+t).setAttribute("href","#")}function k(e,t,r){for(var a="",n=t.ProviderIds||{},o=0,l=r.length;l>o;o++){var i=r[o],s="txt1"+i.Key,c="btnOpen1"+i.Key,d=i.UrlFormatString||"",p=u.translate("sharedcomponents#LabelDynamicExternalId").replace("{0}",i.Name);a+='<div class="inputContainer">',a+='<div style="display: flex; align-items: center;">';var y=n[i.Key]||"";a+='<div style="flex-grow:1;">',a+='<input is="emby-input" class="txtExternalId" value="'+y+'" data-providerkey="'+i.Key+'" data-formatstring="'+d+'" data-buttonclass="'+c+'" id="'+s+'" label="'+p+'"/>',a+="</div>",d&&(a+='<a class="clearLink '+c+'" href="#" target="_blank" data-role="none" style="float: none; width: 1.75em"><button type="button" is="paper-icon-button-light" class="autoSize"><i class="md-icon">open_in_browser</i></button></a>'),a+="</div>",a+="</div>"}var m=e.querySelector(".externalIds",e);m.innerHTML=a;var v=m.querySelector(".txtExternalId")||[];Array.prototype.forEach.call(v,function(e){e.addEventListener("change",M.bind(e)),e.dispatchEvent(new Event("change"))})}function w(e,t,r){if(t=t||document,"string"==typeof e){var a=r?t.querySelectorAll(e):[t.querySelector(e)];Array.prototype.forEach.call(a,function(e){e&&e.classList.add("hide")})}else e.classList.add("hide")}function B(e,t,r){if(t=t||document,"string"==typeof e){var a=r?t.querySelectorAll(e):[t.querySelector(e)];Array.prototype.forEach.call(a,function(e){e&&e.classList.remove("hide")})}else e.classList.remove("hide")}function H(e,t){t.Path&&"Remote"!=t.LocationType?B("#fldPath",e):w("#fldPath",e),"Series"==t.Type||"Movie"==t.Type||"Trailer"==t.Type?B("#fldOriginalName",e):w("#fldOriginalName",e),"Series"==t.Type?B("#fldSeriesRuntime",e):w("#fldSeriesRuntime",e),"Series"==t.Type||"Person"==t.Type?B("#fldEndDate",e):w("#fldEndDate",e),"Movie"==t.Type||"Game"==t.MediaType||"Trailer"==t.MediaType||"MusicVideo"==t.Type?(B("#fldBudget",e),B("#fldRevenue",e)):(w("#fldBudget",e),w("#fldRevenue",e)),"MusicAlbum"==t.Type?B("#albumAssociationMessage",e):w("#albumAssociationMessage",e),"Game"==t.MediaType?B("#fldPlayers",e):w("#fldPlayers",e),"Movie"==t.Type||"Trailer"==t.Type?(B("#fldCriticRating",e),B("#fldCriticRatingSummary",e)):(w("#fldCriticRating",e),w("#fldCriticRatingSummary",e)),"Movie"==t.Type?B("#fldAwardSummary",e):w("#fldAwardSummary",e),"Movie"==t.Type||"Trailer"==t.Type?B("#fldMetascore",e):w("#fldMetascore",e),"Series"==t.Type?(B("#fldStatus",e),B("#fldAirDays",e),B("#fldAirTime",e)):(w("#fldStatus",e),w("#fldAirDays",e),w("#fldAirTime",e)),"Video"==t.MediaType&&"TvChannel"!=t.Type?B("#fld3dFormat",e):w("#fld3dFormat",e),"Audio"==t.Type?B("#fldAlbumArtist",e):w("#fldAlbumArtist",e),"Audio"==t.Type||"MusicVideo"==t.Type?(B("#fldArtist",e),B("#fldAlbum",e)):(w("#fldArtist",e),w("#fldAlbum",e)),"Episode"==t.Type?B("#collapsibleDvdEpisodeInfo",e):w("#collapsibleDvdEpisodeInfo",e),"Episode"==t.Type&&0==t.ParentIndexNumber?B("#collapsibleSpecialEpisodeInfo",e):w("#collapsibleSpecialEpisodeInfo",e),"Person"==t.Type||"Genre"==t.Type||"Studio"==t.Type||"GameGenre"==t.Type||"MusicGenre"==t.Type||"TvChannel"==t.Type?(w("#fldCommunityRating",e),w("#fldCommunityVoteCount",e),w("#genresCollapsible",e),w("#peopleCollapsible",e),w("#studiosCollapsible",e),"TvChannel"==t.Type?B("#fldOfficialRating",e):w("#fldOfficialRating",e),w("#fldCustomRating",e)):(B("#fldCommunityRating",e),B("#fldCommunityVoteCount",e),B("#genresCollapsible",e),B("#peopleCollapsible",e),B("#studiosCollapsible",e),B("#fldOfficialRating",e),B("#fldCustomRating",e)),"Movie"==t.Type||"Trailer"==t.Type||"MusicArtist"==t.Type?B("#countriesCollapsible",e):w("#countriesCollapsible",e),"TvChannel"==t.Type?(w("#tagsCollapsible",e),w("#metadataSettingsCollapsible",e),w("#fldPremiereDate",e),w("#fldDateAdded",e),w("#fldYear",e)):(B("#tagsCollapsible",e),B("#metadataSettingsCollapsible",e),B("#fldPremiereDate",e),B("#fldDateAdded",e),B("#fldYear",e)),"Movie"==t.Type||"Trailer"==t.Type||"BoxSet"==t.Type?B("#keywordsCollapsible",e):w("#keywordsCollapsible",e),"Video"==t.MediaType&&"TvChannel"!=t.Type?B("#fldSourceType",e):w("#fldSourceType",e),"Person"==t.Type?(e.querySelector("#txtProductionYear").label(u.translate("sharedcomponents#LabelBirthYear")),e.querySelector("#txtPremiereDate").label(u.translate("sharedcomponents#LabelBirthDate")),e.querySelector("#txtEndDate").label(u.translate("sharedcomponents#LabelDeathDate")),B("#fldPlaceOfBirth")):(e.querySelector("#txtProductionYear").label(u.translate("sharedcomponents#LabelYear")),e.querySelector("#txtPremiereDate").label(u.translate("sharedcomponents#LabelReleaseDate")),e.querySelector("#txtEndDate").label(u.translate("sharedcomponents#LabelEndDate")),w("#fldPlaceOfBirth")),"Video"==t.MediaType&&"TvChannel"!=t.Type?B("#fldOriginalAspectRatio"):w("#fldOriginalAspectRatio"),"Audio"==t.Type||"Episode"==t.Type||"Season"==t.Type?(B("#fldIndexNumber"),e.querySelector("#txtIndexNumber").label("Episode"==t.Type?u.translate("sharedcomponents#LabelEpisodeNumber"):"Season"==t.Type?u.translate("sharedcomponents#LabelSeasonNumber"):"Audio"==t.Type?u.translate("sharedcomponents#LabelTrackNumber"):u.translate("sharedcomponents#LabelNumber"))):w("#fldIndexNumber"),"Audio"==t.Type||"Episode"==t.Type?(B("#fldParentIndexNumber"),e.querySelector("#txtParentIndexNumber").label("Episode"==t.Type?u.translate("LabelSeasonNumber"):"Audio"==t.Type?u.translate("LabelDiscNumber"):u.translate("LabelParentNumber"))):w("#fldParentIndexNumber",e),"BoxSet"==t.Type?(B("#fldDisplayOrder",e),e.querySelector("#selectDisplayOrder").innerHTML='<option value="SortName">'+u.translate("sharedcomponents#SortName")+'</option><option value="PremiereDate">'+u.translate("sharedcomponents#ReleaseDate")+"</option>"):(e.querySelector("#selectDisplayOrder").innerHTML="",w("#fldDisplayOrder",e));var r=e.querySelectorAll(".fldDisplaySetting"),a=Array.prototype.filter.call(r,function(e){return"none"!=e.style.display});a.length?B("#collapsibleDisplaySettings",e):w("#collapsibleDisplaySettings",e)}function V(e,t,r){var a=e.querySelector("#selectOfficialRating");F(r,a,t.OfficialRating),a.value=t.OfficialRating||"",a=e.querySelector("#selectCustomRating"),F(r,a,t.CustomRating),a.value=t.CustomRating||"";var o=e.querySelector("#selectStatus");G(o),o.value=t.Status||"",e.querySelector("#select3dFormat",e).value=t.Video3DFormat||"",Array.prototype.forEach.call(e.querySelectorAll(".chkAirDay",e),function(e){e.checked=-1!=(t.AirDays||[]).indexOf(e.getAttribute("data-day"))}),U(e.querySelector("#listCountries"),t.ProductionLocations||[]),U(e.querySelector("#listGenres"),t.Genres),Y(e,t.People||[]),U(e.querySelector("#listStudios"),(t.Studios||[]).map(function(e){return e.Name||""})),U(e.querySelector("#listTags"),t.Tags),U(e.querySelector("#listKeywords"),t.Keywords);var l=t.LockData||!1,i=e.querySelector("#chkLockData");i.checked=l,i.checked?w(".providerSettingsContainer",e):B(".providerSettingsContainer",e),W(e,t,t.LockedFields),e.querySelector("#txtPath").value=t.Path||"",e.querySelector("#txtName").value=t.Name||"",e.querySelector("#txtOriginalName").value=t.OriginalTitle||"",e.querySelector("#txtOverview").value=t.Overview||"",e.querySelector("#txtShortOverview").value=t.ShortOverview||"",e.querySelector("#txtTagline").value=t.Taglines&&t.Taglines.length?t.Taglines[0]:"",e.querySelector("#txtSortName").value=t.ForcedSortName||"",e.querySelector("#txtDisplayMediaType").value=t.DisplayMediaType||"",e.querySelector("#txtCommunityRating").value=t.CommunityRating||"",e.querySelector("#txtCommunityVoteCount").value=t.VoteCount||"",e.querySelector("#txtHomePageUrl").value=t.HomePageUrl||"",e.querySelector("#txtAwardSummary").value=t.AwardSummary||"",e.querySelector("#txtMetascore").value=t.Metascore||"",e.querySelector("#txtBudget").value=t.Budget||"",e.querySelector("#txtRevenue").value=t.Revenue||"",e.querySelector("#txtCriticRating").value=t.CriticRating||"",e.querySelector("#txtCriticRatingSummary").value=t.CriticRatingSummary||"",e.querySelector("#txtIndexNumber").value="IndexNumber"in t?t.IndexNumber:"",e.querySelector("#txtParentIndexNumber").value="ParentIndexNumber"in t?t.ParentIndexNumber:"",e.querySelector("#txtPlayers").value=t.Players||"",e.querySelector("#txtAbsoluteEpisodeNumber").value="AbsoluteEpisodeNumber"in t?t.AbsoluteEpisodeNumber:"",e.querySelector("#txtDvdEpisodeNumber").value="DvdEpisodeNumber"in t?t.DvdEpisodeNumber:"",e.querySelector("#txtDvdSeasonNumber").value="DvdSeasonNumber"in t?t.DvdSeasonNumber:"",e.querySelector("#txtAirsBeforeSeason").value="AirsBeforeSeasonNumber"in t?t.AirsBeforeSeasonNumber:"",e.querySelector("#txtAirsAfterSeason").value="AirsAfterSeasonNumber"in t?t.AirsAfterSeasonNumber:"",e.querySelector("#txtAirsBeforeEpisode").value="AirsBeforeEpisodeNumber"in t?t.AirsBeforeEpisodeNumber:"",e.querySelector("#txtAlbum").value=t.Album||"",e.querySelector("#txtAlbumArtist").value=(t.AlbumArtists||[]).map(function(e){return e.Name}).join(";"),e.querySelector("#selectDisplayOrder").value=t.DisplayOrder,e.querySelector("#txtArtist").value=(t.ArtistItems||[]).map(function(e){return e.Name}).join(";");var u;if(t.DateCreated)try{u=n.parseISO8601Date(t.DateCreated,!0),e.querySelector("#txtDateAdded").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtDateAdded").value=""}else e.querySelector("#txtDateAdded").value="";if(t.PremiereDate)try{u=n.parseISO8601Date(t.PremiereDate,!0),e.querySelector("#txtPremiereDate").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtPremiereDate").value=""}else e.querySelector("#txtPremiereDate").value="";if(t.EndDate)try{u=n.parseISO8601Date(t.EndDate,!0),e.querySelector("#txtEndDate").value=u.toISOString().slice(0,10)}catch(s){e.querySelector("#txtEndDate").value=""}else e.querySelector("#txtEndDate").value="";e.querySelector("#txtProductionYear").value=t.ProductionYear||"",e.querySelector("#txtAirTime").value=t.AirTime||"";var c=t.ProductionLocations&&t.ProductionLocations.length?t.ProductionLocations[0]:"";if(e.querySelector("#txtPlaceOfBirth").value=c,e.querySelector("#txtOriginalAspectRatio").value=t.AspectRatio||"",e.querySelector("#selectLanguage").value=t.PreferredMetadataLanguage||"",e.querySelector("#selectCountry").value=t.PreferredMetadataCountryCode||"",t.RunTimeTicks){var d=t.RunTimeTicks/6e8;e.querySelector("#txtSeriesRuntime").value=Math.round(d)}else e.querySelector("#txtSeriesRuntime",e).value=""}function F(e,t,r){var a="";a+="<option value=''></option>";var n,o,l,i=[],u=!1;for(n=0,o=e.length;o>n;n++)l=e[n],i.push({Name:l.Name,Value:l.Name}),l.Name==r&&(u=!0);for(r&&!u&&i.push({Name:r,Value:r}),n=0,o=i.length;o>n;n++)l=i[n],a+="<option value='"+l.Value+"'>"+l.Name+"</option>";t.innerHTML=a}function G(e){var t="";t+="<option value=''></option>",t+="<option value='Continuing'>"+u.translate("sharedcomponents#Continuing")+"</option>",t+="<option value='Ended'>"+u.translate("sharedcomponents#Ended")+"</option>",e.innerHTML=t}function U(e,t,r){t=t||[],"undefined"==typeof r?t.sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())}):t=r(t);for(var a="",n=0;n<t.length;n++)a+='<div class="listItem">',a+='<i class="md-icon listItemIcon" style="background-color:#333;">live_tv</i>',a+='<div class="listItemBody">',a+='<div class="textValue">',a+=t[n],a+="</div>",a+="</div>",a+='<button type="button" is="paper-icon-button-light" data-index="'+n+'" class="btnRemoveFromEditorList autoSize"><i class="md-icon">delete</i></button>',a+="</div>";e.innerHTML=a}function Y(e,t){for(var r="",a="",n=e.querySelector("#peopleList"),o=0,l=t.length;l>o;o++){var i=t[o];a+='<div class="listItem">',a+='<i class="md-icon listItemIcon" style="background-color:#333;">person</i>',a+='<div class="listItemBody">',a+='<a class="btnEditPerson clearLink" href="#" data-index="'+o+'">',a+='<div class="textValue">',a+=i.Name||"",a+="</div>",i.Role&&i.Role!=r&&(a+='<div class="secondary">'+i.Role+"</div>"),a+="</a>",a+="</div>",a+='<button type="button" is="paper-icon-button-light" data-index="'+o+'" class="btnDeletePerson autoSize"><i class="md-icon">delete</i></button>',a+="</div>"}n.innerHTML=a}function K(e,t){for(var r="",a=0;a<e.length;a++){var n=e[a],o=n.name,l=n.value||n.name,i=-1==t.indexOf(l)?" checked":"";r+="<label>",r+='<input type="checkbox" is="emby-checkbox" class="selectLockedField" data-value="'+l+'"'+i+"/>",r+="<span>"+o+"</span>",r+="</label>"}return r}function W(e,t,r){var a=e.querySelector(".providerSettingsContainer");r=r||new Array;var n=[{name:u.translate("sharedcomponents#Name"),value:"Name"},{name:u.translate("sharedcomponents#Overview"),value:"Overview"},{name:u.translate("sharedcomponents#Genres"),value:"Genres"},{name:u.translate("sharedcomponents#ParentalRating"),value:"OfficialRating"},{name:u.translate("sharedcomponents#People"),value:"Cast"}];n.push("Person"==t.Type?{name:u.translate("sharedcomponents#BirthLocation"),value:"ProductionLocations"}:{name:u.translate("sharedcomponents#ProductionLocations"),value:"ProductionLocations"}),"Series"==t.Type&&n.push({name:u.translate("Runtime"),value:"Runtime"}),n.push({name:u.translate("sharedcomponents#Studios"),value:"Studios"}),n.push({name:u.translate("sharedcomponents#Tags"),value:"Tags"}),n.push({name:u.translate("sharedcomponents#Keywords"),value:"Keywords"}),n.push({name:u.translate("sharedcomponents#Images"),value:"Images"}),n.push({name:u.translate("sharedcomponents#Backdrops"),value:"Backdrops"}),"Game"==t.Type&&n.push({name:u.translate("sharedcomponents#Screenshots"),value:"Screenshots"});var o="";o+="<h1>"+u.translate("sharedcomponents#HeaderEnabledFields")+"</h1>",o+="<p>"+u.translate("sharedcomponents#HeaderEnabledFieldsHelp")+"</p>",o+=K(n,r),a.innerHTML=o}function j(e,t,r){o.show(),Promise.all([N(t,r),E(t,r)]).then(function(t){var r=t[0];Q=t[1],X=r;var a=Q.Cultures,n=Q.Countries;O(e,Q),k(e,r,Q.ExternalIdInfos),R(e.querySelector("#selectLanguage"),a),I(e.querySelector("#selectCountry"),n),H(e,r),V(e,r,Q.ParentalRatingOptions),"Video"==r.MediaType&&"Episode"!=r.Type?B("#fldShortOverview",e):w("#fldShortOverview",e),"Video"==r.MediaType&&"Episode"!=r.Type?B("#fldTagline",e):w("#fldTagline",e),o.hide()})}function z(e,t,r){s(["scrollHelper"],function(a){var n=r?"on":"off";a.centerFocus[n](e,t)})}function _(e,t,n){o.show(),s(["text!./metadataeditor.template.html"],function(o){var l={removeOnClose:!0,scrollY:!1};l.size=r.tv?"fullscreen":"medium";var s=a.createDialog(l);s.classList.add("ui-body-b"),s.classList.add("background-theme-b"),s.classList.add("formDialog");var c="";c+=u.translateDocument(o,"sharedcomponents"),s.innerHTML=c,document.body.appendChild(s),r.tv&&z(s.querySelector(".dialogContent"),!1,!0),a.open(s),s.addEventListener("close",function(){r.tv&&z(s.querySelector(".dialogContent"),!1,!1),C(s,i.getApiClient(t)),n()}),J=s,L(s,i.getApiClient(t)),j(s,e,t)})}var J,Q,X;return{show:function(e,t){return new Promise(function(r,a){return _(e,t,r,a)})},embed:function(e,t,r){return new Promise(function(){o.show(),s(["text!./metadataeditor.template.html"],function(a){e.innerHTML=u.translateDocument(a,"sharedcomponents"),e.querySelector(".btnCancel").classList.add("hide"),J=e,L(e,i.getApiClient(r)),j(e,t,r),l.autoFocus(e)})})}}});