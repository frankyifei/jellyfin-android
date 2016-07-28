define(["appSettings","userSettings","appStorage","datetime"],function(e,t,r,n){function a(){function a(){var e=h.currentMediaRenderer,t=(h.getCurrentSrc(e)||"").toLowerCase();if(-1==t.indexOf(".m3u8")){var r=e.duration();return r&&!isNaN(r)&&r!=Number.POSITIVE_INFINITY&&r!=Number.NEGATIVE_INFINITY}return-1==t.indexOf("forcelivestream=true")?!0:void 0}function i(e,t,r){function n(){Events.off(e,"play",n),Events.on(e,"ended",h.onPlaybackStopped),Events.on(e,"ended",h.playNextAfterEnded),h.startProgressInterval(),I()}g(),Events.off(e,"ended",h.onPlaybackStopped),Events.off(e,"ended",h.playNextAfterEnded),Events.on(e,"play",n),"Video"==h.currentItem.MediaType?ApiClient.stopActiveEncodings(t).then(function(){h.setSrcIntoRenderer(e,r,h.currentItem,h.currentMediaSource)}):h.setSrcIntoRenderer(e,r,h.currentItem,h.currentMediaSource)}function o(e,t){var r,n=e[0];return"Playlist"==n.Type?r=h.getItemsForPlayback({ParentId:n.Id}):"MusicArtist"==n.Type?r=h.getItemsForPlayback({ArtistIds:n.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):"MusicGenre"==n.Type?r=h.getItemsForPlayback({Genres:n.Name,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):n.IsFolder?r=h.getItemsForPlayback({ParentId:n.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio,Video"}):t&&"Episode"==n.Type&&1==e.length&&(r=ApiClient.getCurrentUser().then(function(e){return e.Configuration.EnableNextEpisodeAutoPlay&&n.SeriesId?ApiClient.getEpisodes(n.SeriesId,{IsVirtualUnaired:!1,IsMissing:!1,UserId:ApiClient.getCurrentUserId(),Fields:C}).then(function(e){var t=!1;return e.Items=e.Items.filter(function(e){return t?!0:e.Id==n.Id?(t=!0,!0):!1}),e.TotalRecordCount=e.Items.length,e}):null})),r?r.then(function(t){return t?t.Items:e}):Promise.resolve(e)}function u(e,t){var r=t.map(function(e){return MediaController.supportsDirectPlay(e)});return Promise.all(r).then(function(e){for(var r=0,n=t.length;n>r;r++)t[r].enableDirectPlay=e[r]||!1;var a=t.filter(function(e){return e.enableDirectPlay})[0];return a||(a=t.filter(function(e){return e.SupportsDirectStream})[0]),a=a||t.filter(function(e){return e.SupportsTranscoding})[0]})}function s(e,t,r,n){h.tryStartPlayback(e,t,r,function(e){l(t,e,r,n)})}function l(e,t,r,n){Dashboard.hideLoadingMsg(),h.currentMediaSource=t,h.currentItem=e,"Video"===e.MediaType?requirejs(["videorenderer","scripts/mediaplayer-video"],function(){h.playVideo(e,h.currentMediaSource,r,n)}):"Audio"===e.MediaType&&f(e,h.currentMediaSource,r,n)}function d(e){return e.ErrorCode?(MediaController.showPlaybackInfoErrorMessage(e.ErrorCode),!1):!0}function c(e){Events.off(e,"volumechange",P),Events.off(e,"pause",v),Events.off(e,"playing",S),Events.off(e,"timeupdate",p)}function m(){h.currentItem&&h.currentMediaRenderer&&(T?h.onPlaybackStopped.call(h.currentMediaRenderer):ApiClient.stopActiveEncodings())}function I(){var e=h.currentMediaRenderer;if(e.enableProgressReporting!==!1){var t=h.getPlayerStateInternal(e,h.currentItem,h.currentMediaSource),r={QueueableMediaTypes:t.NowPlayingItem.MediaType,ItemId:t.NowPlayingItem.Id,NowPlayingItem:t.NowPlayingItem};r=Object.assign(r,t.PlayState),ApiClient.reportPlaybackProgress(r)}}function g(){T&&(clearTimeout(T),T=null)}function p(){var e=h.getCurrentTicks(this);h.setCurrentTime(e)}function f(e,t,r,n){requirejs(["audiorenderer"],function(){y(e,t,r),n&&n()})}function y(e,t,r){h.createStreamInfo("Audio",e,t,r).then(function(r){function n(){Events.off(i,"playing",n),Events.on(i,"ended",h.onPlaybackStopped),Events.on(i,"ended",h.playNextAfterEnded),h.onPlaybackStart(i,e,t)}h.startTimeTicksOffset=r.startTimeTicksOffset;var a=h.getSavedVolume(),i=new AudioRenderer({poster:h.getPosterUrl(e)});Events.on(i,"volumechange",P),Events.on(i,"playing",n),Events.on(i,"pause",v),Events.on(i,"playing",S),Events.on(i,"timeupdate",p),h.currentMediaRenderer=i,h.currentDurationTicks=h.currentMediaSource.RunTimeTicks,i.init().then(function(){i.volume(a),h.onBeforePlaybackStart(i,e,t),i.setCurrentSrc(r,e,t),h.streamInfo=r})})}function P(){h.onPlaystateChange(this),h.setCurrentTime(h.getCurrentTicks())}function v(){h.onPlaystateChange(this),h.setCurrentTime(h.getCurrentTicks())}function S(){h.onPlaystateChange(this),h.setCurrentTime(h.getCurrentTicks())}var T,h=this,M=-1;h.currentMediaRenderer=null,h.currentItem=null,h.currentMediaSource=null,h.currentDurationTicks=null,h.startTimeTicksOffset=null,h.playlist=[],h.isLocalPlayer=!0,h.isDefaultPlayer=!0,h.streamInfo={},h.name="Html5 Player",h.getTargets=function(){return new Promise(function(e){e(h.getTargetsInternal())})},h.getTargetsInternal=function(){var e=[{name:Globalize.translate("MyDevice"),id:ConnectionManager.deviceId(),playerName:h.name,playableMediaTypes:["Audio","Video"],isLocalPlayer:!0,supportedCommands:Dashboard.getSupportedRemoteCommands()}];return e};var b;h.supportsTextTracks=function(){return null==b&&(b=null!=document.createElement("video").textTracks),b},h.getCurrentSrc=function(e){return e.currentSrc()},h.getCurrentTicks=function(e){var t=Math.floor(1e4*(e||h.currentMediaRenderer).currentTime());return t+=h.startTimeTicksOffset},h.playNextAfterEnded=function(){Events.off(this,"ended",h.playNextAfterEnded),h.nextTrack()},h.startProgressInterval=function(){g();var e=ApiClient.isWebSocketOpen()?1200:5e3;browserInfo.safari&&(e=Math.max(e,5e3)),h.lastProgressReport=0,T=setInterval(function(){h.currentMediaRenderer&&(new Date).getTime()-h.lastProgressReport>e&&(h.lastProgressReport=(new Date).getTime(),I())},250)},h.getCurrentMediaExtension=function(e){return e=e.split("?")[0],e.substring(e.lastIndexOf("."))},h.canPlayNativeHls=function(){if(AppInfo.isNativeApp)return!0;var e=document.createElement("video");return e.canPlayType("application/x-mpegURL").replace(/no/,"")||e.canPlayType("application/vnd.apple.mpegURL").replace(/no/,"")?!0:!1},h.canPlayHls=function(){return h.canPlayNativeHls()?!0:window.MediaSource&&!browserInfo.firefox},h.changeStream=function(e,t){var r=h.currentMediaRenderer;if(a()&&null==t)return void r.currentTime(e/1e4);t=t||{};var n=r.currentSrc(),o=getParameterByName("PlaySessionId",n),u=getParameterByName("LiveStreamId",n);Dashboard.getDeviceProfile().then(function(a){var s=null==t.AudioStreamIndex?getParameterByName("AudioStreamIndex",n)||null:t.AudioStreamIndex;"string"==typeof s&&(s=parseInt(s));var l=null==t.SubtitleStreamIndex?getParameterByName("SubtitleStreamIndex",n)||null:t.SubtitleStreamIndex;"string"==typeof l&&(l=parseInt(l)),MediaController.getPlaybackInfo(h.currentItem.Id,a,e,h.currentMediaSource,s,l,u).then(function(t){d(t)&&(h.currentMediaSource=t.MediaSources[0],h.createStreamInfo(h.currentItem.MediaType,h.currentItem,h.currentMediaSource,e).then(function(e){return e.url?(h.currentSubtitleStreamIndex=l,void i(r,o,e)):(MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"),void h.stop())}))})})},h.setSrcIntoRenderer=function(e,t,r,n){for(var a=n.MediaStreams.filter(function(e){return"Subtitle"==e.Type}),i=a.filter(function(e){return"External"==e.DeliveryMethod}),o=[],u=0,s=i.length;s>u;u++){var l=i[u],d=l.IsExternalUrl?l.DeliveryUrl:ApiClient.getUrl(l.DeliveryUrl);o.push({url:d,language:l.Language||"und",isDefault:l.Index==n.DefaultSubtitleStreamIndex,index:l.Index,format:l.Codec})}h.startTimeTicksOffset=t.startTimeTicksOffset||0,e.setCurrentSrc(t,r,n,o),h.streamInfo=t},h.setCurrentTime=function(e,t,r){e=Math.floor(e);var i=n.getDisplayRunningTime(e),o=h.currentMediaRenderer;if(h.currentDurationTicks&&(i+=" / "+n.getDisplayRunningTime(h.currentDurationTicks),t)){var u=e/h.currentDurationTicks;u*=100,t.value=u}t&&(t.disabled=!((h.currentDurationTicks||0)>0||a())),r&&(r.innerHTML=i);var s=h.getPlayerStateInternal(o,h.currentItem,h.currentMediaSource);Events.trigger(h,"positionchange",[s])},h.canQueueMediaType=function(e){return h.currentItem&&h.currentItem.MediaType==e},h.play=function(e){Dashboard.showLoadingMsg(),Dashboard.getCurrentUser().then(function(t){e.items?o(e.items,!0).then(function(r){h.playWithIntros(r,e,t)}):h.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(r){o(r.Items,!0).then(function(r){h.playWithIntros(r,e,t)})})})},h.playWithIntros=function(e,r,n){var a=e[0];return"Video"===a.MediaType&&Dashboard.showLoadingMsg(),r.startPositionTicks||"Video"!==a.MediaType||!t.enableCinemaMode()?void h.playInternal(a,r.startPositionTicks,function(){h.setPlaylistState(0,e)}):void ApiClient.getJSON(ApiClient.getUrl("Users/"+n.Id+"/Items/"+a.Id+"/Intros")).then(function(t){e=t.Items.concat(e),h.playInternal(e[0],r.startPositionTicks,function(){h.setPlaylistState(0,e)})})},h.createStreamInfo=function(e,t,r,n){return new Promise(function(a){var i,o,u=0,s=n?n/1e7:0,l=s?"#t="+s:"",d="Transcode";if("Video"==e)if(o="video/"+r.Container,r.enableDirectPlay)i=r.Path,d="DirectPlay";else if(r.SupportsDirectStream){var c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),i=ApiClient.getUrl("Videos/"+t.Id+"/stream."+r.Container,c),i+=l,d="DirectStream"}else r.SupportsTranscoding&&(i=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(-1!=i.toLowerCase().indexOf("forcelivestream=true")&&(s=0,u=n||0),o="application/x-mpegURL"):(-1==i.toLowerCase().indexOf("copytimestamps=true")&&(s=0,u=n||0),o="video/"+r.TranscodingContainer));else if(o="audio/"+r.Container,r.enableDirectPlay)i=r.Path,d="DirectPlay";else{var m=r.SupportsDirectStream;if(m){var I=(r.Container||"").toLowerCase(),c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),i=ApiClient.getUrl("Audio/"+t.Id+"/stream."+I,c),i+=l,d="DirectStream"}else r.SupportsTranscoding&&(i=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(i+=l,o="application/x-mpegURL"):(u=n||0,o="audio/"+r.TranscodingContainer))}var g={url:i,mimeType:o,startTimeTicksOffset:u,startPositionInSeekParam:s,playMethod:d};"DirectPlay"==d&&"File"==r.Protocol?require(["localassetmanager"],function(){LocalAssetManager.translateFilePath(g.url).then(function(e){g.url=e,a(g)})}):a(g)})},h.lastBitrateDetections={},h.playInternal=function(t,r,n){if(null==t)throw new Error("item cannot be null");if(h.isPlaying()&&h.stop(!1),"Audio"!==t.MediaType&&"Video"!==t.MediaType)throw new Error("Unrecognized media type");if(t.IsPlaceHolder)return Dashboard.hideLoadingMsg(),void MediaController.showPlaybackInfoErrorMessage("PlaceHolder");var a=function(){Dashboard.getDeviceProfile().then(function(e){s(e,t,r,n)})},i=ApiClient.serverAddress();"Video"==t.MediaType&&e.enableAutomaticBitrateDetection()&&(new Date).getTime()-(h.lastBitrateDetections[i]||0)>3e5?(Dashboard.showLoadingMsg(),ApiClient.detectBitrate().then(function(t){h.lastBitrateDetections[i]=(new Date).getTime(),e.maxStreamingBitrate(t),a()},a)):a()},h.tryStartPlayback=function(e,t,r,n){"Video"===t.MediaType&&Dashboard.showLoadingMsg(),MediaController.getPlaybackInfo(t.Id,e,r).then(function(a){d(a)&&u(t.MediaType,a.MediaSources).then(function(i){i?i.RequiresOpening?MediaController.getLiveStream(t.Id,a.PlaySessionId,e,r,i,null,null).then(function(e){MediaController.supportsDirectPlay(e.MediaSource).then(function(t){e.MediaSource.enableDirectPlay=t,n(e.MediaSource)})}):n(i):(Dashboard.hideLoadingMsg(),MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"))})})},h.getPosterUrl=function(e){var t=Math.max(screen.height,screen.width);return e.BackdropImageTags&&e.BackdropImageTags.length?ApiClient.getScaledImageUrl(e.Id,{type:"Backdrop",index:0,maxWidth:t,tag:e.BackdropImageTags[0]}):e.ParentBackdropItemId&&e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length?ApiClient.getScaledImageUrl(e.ParentBackdropItemId,{type:"Backdrop",index:0,maxWidth:t,tag:e.ParentBackdropImageTags[0]}):null},h.displayContent=function(e){var t=ApiClient;t.getItem(t.getCurrentUserId(),e.ItemId).then(function(e){require(["embyRouter"],function(t){t.showItem(e)})})},h.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(r){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){r({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.Fields=C,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))},h.removeFromPlaylist=function(e){h.playlist.remove(e)},h.currentPlaylistIndex=function(e){if(null==e)return M;var t=h.playlist[e];h.playInternal(t,0,function(){h.setPlaylistState(e)})},h.setPlaylistState=function(e,t){isNaN(e)||(M=e),t&&(h.playlist=t),h.updatePlaylistUi&&h.updatePlaylistUi()},h.nextTrack=function(){var e;switch(h.getRepeatMode()){case"RepeatOne":e=M;break;case"RepeatAll":e=M+1,e>=h.playlist.length&&(e=0);break;default:e=M+1}var t=h.playlist[e];t&&h.playInternal(t,0,function(){h.setPlaylistState(e)})},h.previousTrack=function(){var e=M-1;if(e>=0){var t=h.playlist[e];t&&h.playInternal(t,0,function(){h.setPlaylistState(e)})}},h.queueItemsNext=function(e){for(var t=1,r=0,n=e.length;n>r;r++)h.playlist.splice(t,0,e[r]),t++},h.queueItems=function(e){for(var t=0,r=e.length;r>t;t++)h.playlist.push(e[t])},h.queue=function(e){return h.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?o(e.items).then(function(e){h.queueItems(e)}):h.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(e){o(e.Items).then(function(e){h.queueItems(e)})})}):void h.play(e)},h.queueNext=function(e){return h.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?h.queueItemsNext(e.items):h.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,h.queueItemsNext(e.items)})}):void h.play(e)},h.pause=function(){h.currentMediaRenderer.pause()},h.unpause=function(){h.currentMediaRenderer.unpause()},h.seek=function(e){h.changeStream(e)},h.mute=function(){h.setVolume(0)},h.unMute=function(){h.setVolume(100*h.getSavedVolume())},h.volume=function(){return 100*h.currentMediaRenderer.volume()},h.toggleMute=function(){h.currentMediaRenderer&&(h.volume()?h.mute():h.unMute())},h.volumeDown=function(){h.currentMediaRenderer&&h.setVolume(Math.max(h.volume()-2,0))},h.volumeUp=function(){h.currentMediaRenderer&&h.setVolume(Math.min(h.volume()+2,100))},h.setVolume=function(e){h.currentMediaRenderer&&(h.currentMediaRenderer.volume(e/100),h.onVolumeChanged(h.currentMediaRenderer))},h.saveVolume=function(e){e&&r.setItem("volume",e)},h.getSavedVolume=function(){return r.getItem("volume")||.5},h.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(r){var n={UserId:t,Fields:C,Limit:100,Filters:"IsNotFolder",Recursive:!0,SortBy:"Random"};if("MusicArtist"==r.Type)n.MediaTypes="Audio",n.ArtistIds=r.Id;else if("MusicGenre"==r.Type)n.MediaTypes="Audio",n.Genres=r.Name;else{if(!r.IsFolder)return;n.ParentId=e}h.getItemsForPlayback(n).then(function(e){h.play({items:e.Items})})})},h.instantMix=function(e){var t=100;ApiClient.getInstantMixFromItem(e,{UserId:Dashboard.getCurrentUserId(),Fields:C,Limit:t}).then(function(e){h.play({items:e.Items})})},h.stop=function(e){var t=h.currentMediaRenderer;if(t){Events.off(t,"ended",h.playNextAfterEnded);var r=!1;T||(r=!0),t.stop(),Events.trigger(t,"ended"),c(t),t.cleanup(e),h.currentMediaRenderer=null,h.currentItem=null,h.currentSubtitleStreamIndex=null,h.streamInfo={},h.currentMediaSource=null,r&&ApiClient.stopActiveEncodings()}else h.currentMediaRenderer=null,h.currentItem=null,h.currentMediaSource=null,h.currentSubtitleStreamIndex=null,h.streamInfo={};h.resetEnhancements&&h.resetEnhancements()},h.isPlaying=function(){return h.playlist.length>0},h.getPlayerState=function(){return new Promise(function(e){var t=h.getPlayerStateInternal(h.currentMediaRenderer,h.currentItem,h.currentMediaSource);e(t)})},h.getPlayerStateInternal=function(e,t,r){var n={PlayState:{}};if(e){n.PlayState.VolumeLevel=100*e.volume(),n.PlayState.IsMuted=0==e.volume(),n.PlayState.IsPaused=e.paused(),n.PlayState.PositionTicks=h.getCurrentTicks(e),n.PlayState.RepeatMode=h.getRepeatMode();var i=e.currentSrc();if(i){var o=getParameterByName("AudioStreamIndex",i);o&&(n.PlayState.AudioStreamIndex=parseInt(o)),n.PlayState.SubtitleStreamIndex=h.currentSubtitleStreamIndex,n.PlayState.PlayMethod=h.streamInfo.playMethod,n.PlayState.PlaySessionId=getParameterByName("PlaySessionId",i)}}return r&&(n.PlayState.MediaSourceId=r.Id,n.PlayState.LiveStreamId=r.LiveStreamId,n.NowPlayingItem={RunTimeTicks:r.RunTimeTicks},n.PlayState.CanSeek=(r.RunTimeTicks||0)>0||a()),t&&(n.NowPlayingItem=h.getNowPlayingItemForReporting(t,r)),n},h.getNowPlayingItemForReporting=function(e,t){var r={};r.RunTimeTicks=t.RunTimeTicks,r.Id=e.Id,r.MediaType=e.MediaType,r.Type=e.Type,r.Name=e.Name,r.IndexNumber=e.IndexNumber,r.IndexNumberEnd=e.IndexNumberEnd,r.ParentIndexNumber=e.ParentIndexNumber,r.ProductionYear=e.ProductionYear,r.PremiereDate=e.PremiereDate,r.SeriesName=e.SeriesName,r.Album=e.Album,r.AlbumId=e.AlbumId,r.Artists=e.Artists,r.ArtistItems=e.ArtistItems;var n=e.ImageTags||{};return e.SeriesPrimaryImageTag?(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag):n.Primary?(r.PrimaryImageItemId=e.Id,r.PrimaryImageTag=n.Primary):e.AlbumPrimaryImageTag?(r.PrimaryImageItemId=e.AlbumId,r.PrimaryImageTag=e.AlbumPrimaryImageTag):e.SeriesPrimaryImageTag&&(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag),e.BackdropImageTags&&e.BackdropImageTags.length?(r.BackdropItemId=e.Id,r.BackdropImageTag=e.BackdropImageTags[0]):e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length&&(r.BackdropItemId=e.ParentBackdropItemId,r.BackdropImageTag=e.ParentBackdropImageTags[0]),n.Thumb&&(r.ThumbItemId=e.Id,r.ThumbImageTag=n.Thumb),n.Logo?(r.LogoItemId=e.Id,r.LogoImageTag=n.Logo):e.ParentLogoImageTag&&(r.LogoItemId=e.ParentLogoItemId,r.LogoImageTag=e.ParentLogoImageTag),r},h.beginPlayerUpdates=function(){},h.endPlayerUpdates=function(){},h.onBeforePlaybackStart=function(e,t,r){var n=h.getPlayerStateInternal(e,t,r);Events.trigger(h,"beforeplaybackstart",[n])},h.onPlaybackStart=function(e,t,r){var n=h.getPlayerStateInternal(e,t,r);Events.trigger(h,"playbackstart",[n]),h.startProgressInterval()},h.onVolumeChanged=function(e){h.saveVolume(e.volume());var t=h.getPlayerStateInternal(e,h.currentItem,h.currentMediaSource);Events.trigger(h,"volumechange",[t])},h.cleanup=function(){},h.onPlaybackStopped=function(){document.body.classList.remove("bodyWithPopupOpen");var e=this;c(e),Events.off(e,"ended",h.onPlaybackStopped);var t=h.currentItem,r=h.currentMediaSource,n=h.getPlayerStateInternal(e,t,r);h.cleanup(e),g(),"Video"==t.MediaType&&h.resetEnhancements(),Events.trigger(h,"playbackstop",[n])},h.onPlaystateChange=function(e){var t=h.getPlayerStateInternal(e,h.currentItem,h.currentMediaSource);Events.trigger(h,"playstatechange",[t])},window.addEventListener("beforeunload",m),h.canAutoPlayAudio=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0};var k="RepeatNone";h.getRepeatMode=function(){return k},h.setRepeatMode=function(e){k=e};var C="MediaSources,Chapters";h.tryPair=function(){return new Promise(function(e){e()})}}window.MediaPlayer=new a,window.MediaPlayer.init=function(){window.MediaController.registerPlayer(window.MediaPlayer),window.MediaController.setActivePlayer(window.MediaPlayer,window.MediaPlayer.getTargetsInternal()[0])}});