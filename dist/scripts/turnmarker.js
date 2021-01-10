!function(e){var t={};function a(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,a),s.l=!0,s.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)a.d(n,s,function(t){return e[t]}.bind(null,s));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="modules/turnmarker/scripts/",a(a.s="./src/scripts/turnmarker.js")}({"./src/scripts/chatter.js":
/*!********************************!*\
  !*** ./src/scripts/chatter.js ***!
  \********************************/
/*! exports provided: Chatter */function(e,t,a){"use strict";a.r(t),a.d(t,"Chatter",(function(){return s}));var n=a(/*! ./settings.js */"./src/scripts/settings.js");class s{static sendTurnMessage(e,t=!1){let a=[];e.players.forEach(e=>{a.push(e.name)}),0==a.length&&a.push("GM");let n=e.name;t&&!e.actor.hasPlayerOwner&&(n="???"),ChatMessage.create({speaker:{actor:e.actor},content:`<div class="flexrow">${this.placeImage(e)}\n                    <div style="flex: 12;">\n                        <h2>${n}'s Turn</h2>\n                        <p>${a.join(" - ")}</p>\n                    </div>\n                    </div><em>Turn Marker</em>`})}static placeImage(e){if(n.Settings.getIncludeAnnounceImage()){let t=e.img;return e.flags.core&&e.flags.core.thumb&&(t=e.flags.core.thumb),`<div style="flex:3;"><img src="${t}" style="border: none;" /></div>`}return""}}},"./src/scripts/marker.js":
/*!*******************************!*\
  !*** ./src/scripts/marker.js ***!
  \*******************************/
/*! exports provided: Marker */function(e,t,a){"use strict";a.r(t),a.d(t,"Marker",(function(){return i}));var n=a(/*! ./markeranimation.js */"./src/scripts/markeranimation.js"),s=a(/*! ./settings.js */"./src/scripts/settings.js"),r=a(/*! ./utils.js */"./src/scripts/utils.js");class i{static async placeTurnMarker(e,t){if(t)return this.moveMarkerToToken(e,t),t;if(this.clearAllMarkers(),s.Settings.getTurnMarkerEnabled()){let t=Object(r.findTokenById)(e),a=(s.Settings.getRatio(),this.getImageDimensions(t)),n=this.getImageLocation(t),i=new Tile({img:s.Settings.getImagePath(),width:a.w,height:a.h,x:n.x,y:n.y,z:900,rotation:0,hidden:t.data.hidden,locked:!1,flags:{turnMarker:!0}});return(await canvas.scene.createEmbeddedEntity("Tile",i.data))._id}return null}static async deleteStartMarker(){for(var e of canvas.scene.getEmbeddedCollection("Tile"))e.flags.startMarker&&await canvas.scene.deleteEmbeddedEntity("Tile",e._id)}static async placeStartMarker(e){if(s.Settings.getStartMarkerEnabled()){let t=Object(r.findTokenById)(e),a=this.getImageDimensions(t),n=this.getImageLocation(t),i=new Tile({img:s.Settings.getStartMarker(),width:a.w,height:a.h,x:n.x,y:n.y,z:900,rotation:0,hidden:t.data.hidden,locked:!1,flags:{startMarker:!0}});game.user.isGM?(canvas.scene.createEmbeddedEntity("Tile",i.data),canvas.scene.setFlag(r.FlagScope,r.Flags.startMarkerPlaced,!0)):game.socket.emit(r.socketName,{mode:r.socketAction.placeStartMarker,tileData:i.data})}}static async moveMarkerToToken(e,t){let a=Object(r.findTokenById)(e),n=(s.Settings.getRatio(),this.getImageDimensions(a)),i=this.getImageLocation(a);await canvas.scene.updateEmbeddedEntity("Tile",{_id:t,width:n.w,height:n.h,x:i.x,y:i.y,hidden:a.data.hidden})}static async clearAllMarkers(){let e=canvas.scene.getEmbeddedCollection("Tile");for(var t of e)(t.flags.turnMarker||t.flags.startMarker)&&await canvas.scene.deleteEmbeddedEntity("Tile",t._id)}static updateImagePath(){if(game.user.isGM){let e=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);e&&canvas.scene.updateEmbeddedEntity("Tile",{_id:e.id,img:s.Settings.getImagePath()})}}static reset(e){n.MarkerAnimation.stopAnimation(e),this.clearAllMarkers()}static getImageDimensions(e,t=!1){let a=t?1:s.Settings.getRatio(),n=0,r=0;switch(canvas.grid.type){case 2:case 3:n=r=e.h*a;break;case 4:case 5:n=r=e.w*a;break;default:n=e.w*a,r=e.h*a}return{w:n,h:r}}static getImageLocation(e,t=!1){let a=t?1:s.Settings.getRatio(),n=0,r=0;switch(canvas.grid.type){case 2:case 3:n=e.center.x-e.h*a/2,r=e.center.y-e.h*a/2;break;case 4:case 5:n=e.center.x-e.w*a/2,r=e.center.y-e.w*a/2;break;default:n=e.center.x-e.w*a/2,r=e.center.y-e.h*a/2}return{x:n,y:r}}}},"./src/scripts/markeranimation.js":
/*!****************************************!*\
  !*** ./src/scripts/markeranimation.js ***!
  \****************************************/
/*! exports provided: MarkerAnimation */function(e,t,a){"use strict";a.r(t),a.d(t,"MarkerAnimation",(function(){return s}));var n=a(/*! ./settings.js */"./src/scripts/settings.js");class s{static startAnimation(e,t){let a=canvas.scene.getEmbeddedEntity("Tile",t);return e=this.animateRotation.bind(a),canvas.app.ticker.add(e),e}static stopAnimation(e){canvas.app.ticker.remove(e)}static animateRotation(e){let t=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);if(t&&t.data.img){let a=n.Settings.getInterval()/1e4;try{t.tile.img.rotation+=a*e}catch(e){}}}}},"./src/scripts/settings.js":
/*!*********************************!*\
  !*** ./src/scripts/settings.js ***!
  \*********************************/
/*! exports provided: imageTitles, announcedActorOptions, Settings */function(e,t,a){"use strict";a.r(t),a.d(t,"imageTitles",(function(){return i})),a.d(t,"announcedActorOptions",(function(){return o})),a.d(t,"Settings",(function(){return c}));var n=a(/*! ./marker.js */"./src/scripts/marker.js"),s=a(/*! ./settingsForm.js */"./src/scripts/settingsForm.js"),r=a(/*! ./utils.js */"./src/scripts/utils.js");const i=["Runes of Incendium by Rin","Runes of the Cultist by Rin","Runes of Regeneration by Rin","Runes of the Cosmos by Rin","Runes of Earthly Dust by Rin","Runes of Reality by Rin","Runes of the Believer by Rin","Runes of the Mad Mage by Rin","Runes of the Blue Sky by Rin","Runes of the Universe by Rin","Runes of Prosperity by Rin"],o=["Announce for all","Announce for players","Announce for GM-controlled","Announce all but hide GM-controlled names"];class c{static getVersion(){return game.settings.get(r.modName,"tm-version")}static setVersion(e){game.settings.set(r.modName,"tm-version",e)}static getRatio(){return game.settings.get(r.modName,"ratio")}static setRatio(e){game.settings.set(r.modName,"ratio",e)}static getShouldAnimate(){return game.settings.get(r.modName,"animation")}static getInterval(){return game.settings.get(r.modName,"interval")}static shouldAnnounceTurns(){return game.settings.get(r.modName,"announce-turn")}static setShouldAnnounceTurns(e){game.settings.set(r.modName,"announce-turn",e)}static getAnnounceActors(){return game.settings.get(r.modName,"announce-Actors")}static setAnnounceActors(e){return game.settings.set(r.modName,"announce-Actors",e)}static getIncludeAnnounceImage(){return game.settings.get(r.modName,"announce-image")}static setIncludeAnnounceImage(e){game.settings.set(r.modName,"announce-image",e)}static getImageIndex(){return game.settings.get(r.modName,"image")}static getStartMarker(){return""==game.settings.get(r.modName,"startMarker-custom").trim()?"modules/turnmarker/assets/start.png":game.settings.get(r.modName,"startMarker-custom")}static getTurnMarkerEnabled(){return game.settings.get(r.modName,"turnmarker-enabled")}static setTurnMarkerEnabled(e){game.settings.set(r.modName,"turnmarker-enabled",e)}static getStartMarkerEnabled(){return game.settings.get(r.modName,"startMarker-enabled")}static setStartMarkerEnabled(e){game.settings.set(r.modName,"startMarker-enabled",e)}static getStartMarkerPath(){return game.settings.get(r.modName,"startMarker-custom")}static setStartMarkerPath(e){game.settings.set(r.modName,"startMarker-custom",e)}static getImagePath(){return""==game.settings.get(r.modName,"customimage").trim()?this.getImageByIndex(game.settings.get(r.modName,"image")):game.settings.get(r.modName,"customimage")}static getImageByIndex(e){switch(e){case 0:return"modules/turnmarker/assets/incendium.png";case 1:return"modules/turnmarker/assets/cultist.png";case 2:return"modules/turnmarker/assets/regeneration.png";case 3:return"modules/turnmarker/assets/cosmos.png";case 4:return"modules/turnmarker/assets/earthlydust.png";case 5:return"modules/turnmarker/assets/reality.png";case 6:return"modules/turnmarker/assets/believer.png";case 7:return"modules/turnmarker/assets/madmage.png";case 8:return"modules/turnmarker/assets/bluesky.png";case 9:return"modules/turnmarker/assets/universe.png";case 10:return"modules/turnmarker/assets/prosperity.png"}}static setImage(e){game.settings.set(r.modName,"image",e)}static getCustomImagePath(){return game.settings.get(r.modName,"customimage")}static setCustomImagePath(e){game.settings.set(r.modName,"customimage",e)}static registerSettings(){game.settings.registerMenu(r.modName,"tm.settingsMenu",{name:"tm.settings.button.name",label:"tm.settings.button.label",icon:"fas fa-sync-alt",type:s.SettingsForm,restricted:!0}),game.settings.register(r.modName,"tm-version",{name:r.modName+" version",default:"0.0.0",type:String,scope:"world"}),game.settings.register(r.modName,"ratio",{name:"tm.settings.ratio.name",hint:"tm.settings.ratio.hint",scope:"world",config:!1,type:Number,default:1.5,restricted:!0}),game.settings.register(r.modName,"animation",{name:"tm.settings.animate.name",hint:"tm.settings.animate.hint",scope:"user",config:!0,type:Boolean,default:!0}),game.settings.register(r.modName,"interval",{name:"tm.settings.interval.name",hint:"tm.settings.interval.hint",scope:"user",config:!0,type:Number,default:100}),game.settings.register(r.modName,"image",{name:"tm.settings.image.name",scope:"world",config:!1,type:Number,default:0,choices:i,restricted:!0,onChange:e=>n.Marker.updateImagePath(e)}),game.settings.register(r.modName,"announce-Actors",{name:"tm.settings.announcedActors.name",hint:"tm.settings.announcedActors.hint",scope:"world",config:!1,type:Number,default:0,restricted:!0,choices:o}),game.settings.register(r.modName,"customimage",{name:"tm.settings.customImage.name",hint:"tm.settings.customImage.hint",scope:"world",config:!1,type:String,default:"",restricted:!0,onChange:e=>n.Marker.updateImagePath(e)}),game.settings.register(r.modName,"announce-turn",{name:"tm.settings.announce.name",hint:"tm.settings.announce.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,"announce-image",{name:"tm.settings.announceImage.name",hint:"tm.settings.announceImage.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,"announce-asActor",{name:"tm.settings.announceAs.name",hint:"tm.settings.announceAs.hint",scope:"world",config:!1,type:Boolean,default:!0}),game.settings.register(r.modName,"turnmarker-enabled",{name:"tm.settings.turnMarkerEnabled.name",hint:"tm.settings.turnMarkerEnabled.hint",scope:"world",config:!1,type:Boolean,default:!0,restricted:!0}),game.settings.register(r.modName,"startMarker-enabled",{name:"tm.settings.startEnabled.name",hint:"tm.settings.startEnabled.hint",scope:"world",config:!1,type:Boolean,default:!1,restricted:!0}),game.settings.register(r.modName,"startMarker-custom",{name:"tm.settings.startImage.name",hint:"tm.settings.startImage.hint",scope:"world",config:!1,type:String,default:"",restricted:!0})}}},"./src/scripts/settingsForm.js":
/*!*************************************!*\
  !*** ./src/scripts/settingsForm.js ***!
  \*************************************/
/*! exports provided: SettingsForm */function(e,t,a){"use strict";a.r(t),a.d(t,"SettingsForm",(function(){return r}));var n=a(/*! ./settings.js */"./src/scripts/settings.js");const s=["mp4","webm","ogg"];class r extends FormApplication{constructor(e,t={}){super(e,t)}static get defaultOptions(){return mergeObject(super.defaultOptions,{id:"turnmarker-settings-form",title:"Turn Marker - Global Settings",template:"./modules/turnmarker/templates/settings.html",classes:["sheet","tm-settings"],width:500,closeOnSubmit:!0})}getData(){return{turnMarkerEnabled:n.Settings.getTurnMarkerEnabled(),ratio:n.Settings.getRatio(),image:this.getSelectList(n.imageTitles,n.Settings.getImageIndex()),announceActors:this.getSelectList(n.announcedActorOptions,n.Settings.getAnnounceActors()),customImage:n.Settings.getCustomImagePath(),announce:n.Settings.shouldAnnounceTurns(),announceImage:n.Settings.getIncludeAnnounceImage(),startMarkerEnabled:n.Settings.getStartMarkerEnabled(),startMarkerPath:n.Settings.getStartMarkerPath(),previewPath:n.Settings.getImagePath()}}async _updateObject(e,t){console.log("Turn Marker | Saving Settings"),n.Settings.setRatio(t.ratio),t.image&&n.Settings.setImage(t.image),n.Settings.setCustomImagePath(t.customImage),n.Settings.setShouldAnnounceTurns(t.announce),n.Settings.setAnnounceActors(t.announceActors),n.Settings.setIncludeAnnounceImage(t.announceImage),n.Settings.setTurnMarkerEnabled(t.turnMarkerEnabled),n.Settings.setStartMarkerEnabled(t.startMarkerEnabled),n.Settings.setStartMarkerPath(t.startMarkerPath)}activateListeners(e){super.activateListeners(e);const t=e.find("#image"),a=e.find("#customImage"),s=e.find("#markerImgPreview");this.updatePreview(e),t.length>0&&t.on("change",e=>{""==a[0].value.trim()&&s.attr("src",n.Settings.getImageByIndex(Number(e.target.value)))}),a.length>0&&a.on("change",t=>{this.updatePreview(e)})}updatePreview(e){const t=e.find("#image"),a=e.find("#customImage"),r=e.find("#markerImgPreview"),i=e.find("#markerVideoPreview");if(""==a[0].value.trim())t[0].disabled=!1,r.attr("src",n.Settings.getImageByIndex(Number(t[0].value))),r.removeClass("hidden"),i.addClass("hidden");else{t[0].disabled=!0;const e=this.getExtension(a[0].value);console.warn(e),s.includes(e.toLowerCase())?(i.attr("src",a[0].value),r.addClass("hidden"),i.removeClass("hidden")):(r.attr("src",a[0].value),r.removeClass("hidden"),i.addClass("hidden"))}}getExtension(e){return e.slice(2+(e.lastIndexOf(".")-1>>>0))}getSelectList(e,t){let a=[];return e.forEach((e,n)=>{a.push({value:e,selected:n==t})}),a}}},"./src/scripts/turnmarker.js":
/*!***********************************!*\
  !*** ./src/scripts/turnmarker.js ***!
  \***********************************/
/*! no exports provided */function(e,t,a){"use strict";a.r(t);var n=a(/*! ./chatter.js */"./src/scripts/chatter.js"),s=a(/*! ./marker.js */"./src/scripts/marker.js"),r=a(/*! ./markeranimation.js */"./src/scripts/markeranimation.js"),i=a(/*! ./settings.js */"./src/scripts/settings.js"),o=a(/*! ./updateWindow.js */"./src/scripts/updateWindow.js"),c=a(/*! ./utils.js */"./src/scripts/utils.js");let m,g,d="";Hooks.on("ready",async()=>{i.Settings.registerSettings();let e=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);if(e&&e.id){g=e.id;let t=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);t.zIndex=Math.max(...canvas.tiles.placeables.map(e=>e.zIndex))+1,t.parent.sortChildren(),!game.paused&&i.Settings.getShouldAnimate()&&(m=r.MarkerAnimation.startAnimation(m,g))}game.user.isGM&&isNewerVersion(game.modules.get("turnmarker").data.version,i.Settings.getVersion())&&Object(o.renderUpdateWindow)(),game.socket.on(c.socketName,async e=>{if(game.user.isGM)switch(e.mode){case c.socketAction.placeStartMarker:await canvas.scene.createEmbeddedEntity("Tile",e.tileData),canvas.scene.setFlag(c.FlagScope,c.Flags.startMarkerPlaced,!0)}})}),Hooks.on("createTile",(e,t)=>{1==t.flags.turnMarker&&(g=t._id,(t=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker)).zIndex=Math.max(...canvas.tiles.placeables.map(e=>e.zIndex))+1,t.parent.sortChildren(),i.Settings.getShouldAnimate()&&(m=r.MarkerAnimation.startAnimation(m,g)))}),Hooks.on("preUpdateToken",async(e,t)=>{game.combat&&(t._id!=game.combat.combatant.token._id||canvas.scene.getFlag(c.FlagScope,c.Flags.startMarkerPlaced)||await s.Marker.placeStartMarker(game.combat.combatant.token._id))}),Hooks.on("updateCombat",async(e,t)=>{if(e.combatant&&t&&d!=e.combatant._id&&game.user.isGM&&game.userId==Object(c.firstGM)()&&(d=e.combatant._id,e&&e.combatant)){let t=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker),a=await s.Marker.placeTurnMarker(e.combatant.token._id,t&&t.id||void 0);if(a&&(g=a.markerId,m=a.animator),i.Settings.getTurnMarkerEnabled()&&(s.Marker.deleteStartMarker(),canvas.scene.unsetFlag(c.FlagScope,c.Flags.startMarkerPlaced)),i.Settings.shouldAnnounceTurns()&&!e.combatant.hidden)switch(i.Settings.getAnnounceActors()){case 0:n.Chatter.sendTurnMessage(e.combatant);break;case 1:e.combatant.actor.hasPlayerOwner&&n.Chatter.sendTurnMessage(e.combatant);break;case 2:e.combatant.actor.hasPlayerOwner||n.Chatter.sendTurnMessage(e.combatant);break;case 3:n.Chatter.sendTurnMessage(e.combatant,!0)}}}),Hooks.on("deleteCombat",async()=>{game.user.isGM&&s.Marker.clearAllMarkers(),r.MarkerAnimation.stopAnimation(m)}),Hooks.on("updateToken",(e,t,a)=>{let n=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);n&&(a.x||a.y||a.width||a.height||a.hidden)&&game&&game.combat&&game.combat.combatant&&game.combat.combatant.tokenId==t._id&&game.user.isGM&&game.combat&&(s.Marker.moveMarkerToToken(t._id,n.id),n.zIndex=Math.max(...canvas.tiles.placeables.map(e=>e.zIndex))+1,n.parent.sortChildren())}),Hooks.on("updateTile",()=>{if(canvas.scene.data.tokenVision){let e=canvas.tiles.placeables.find(e=>1==e.data.flags.turnMarker);if(e){let t=canvas.tokens.placeables.find(e=>e.id==game.combat.combatant.tokenId);t&&!t.data.hidden&&(e.visible=canvas.sight.testVisibility(t.center,{tolerance:canvas.dimensions.size/4}))}}}),Hooks.on("pauseGame",async e=>{g&&i.Settings.getShouldAnimate()&&(e?r.MarkerAnimation.stopAnimation(m):m=r.MarkerAnimation.startAnimation(m,g))})},"./src/scripts/updateWindow.js":
/*!*************************************!*\
  !*** ./src/scripts/updateWindow.js ***!
  \*************************************/
/*! exports provided: renderUpdateWindow */function(e,t,a){"use strict";a.r(t),a.d(t,"renderUpdateWindow",(function(){return s}));var n=a(/*! ./settings.js */"./src/scripts/settings.js");function s(){const e=game.modules.get("turnmarker");if(isNewerVersion(e.data.version,n.Settings.getVersion())){class t extends Application{static get defaultOptions(){return mergeObject(super.defaultOptions,{template:`modules/${e.id}/templates/updateWindow.html`,resizable:!1,width:500,height:600,classes:["updateWindow"],title:e.data.title+" - Updated"})}getData(){return{version:e.data.version}}activateListeners(t){super.activateListeners(t),t.find(".show-again").on("change",t=>{n.Settings.setVersion(t.currentTarget.checked?e.data.version:oldVersion)})}}(new t).render(!0)}}},"./src/scripts/utils.js":
/*!******************************!*\
  !*** ./src/scripts/utils.js ***!
  \******************************/
/*! exports provided: modName, FlagScope, Flags, socketName, socketAction, findTokenById, firstGM */function(e,t,a){"use strict";a.r(t),a.d(t,"modName",(function(){return n})),a.d(t,"FlagScope",(function(){return s})),a.d(t,"Flags",(function(){return r})),a.d(t,"socketName",(function(){return i})),a.d(t,"socketAction",(function(){return o})),a.d(t,"findTokenById",(function(){return c})),a.d(t,"firstGM",(function(){return m}));const n="turnmarker",s="turnmarker",r={startMarkerPlaced:"startMarkerPlaced"},i="module.turnmarker",o={placeStartMarker:0};function c(e){return canvas.tokens.ownedTokens.find(t=>t.id==e)}function m(){for(let e of game.users.entities)if(e.data.role>=4&&e.active)return e.data._id}}});
//# sourceMappingURL=turnmarker.js.map