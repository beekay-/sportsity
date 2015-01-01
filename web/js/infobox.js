function InfoBox(a){a=a||{};google.maps.OverlayView.apply(this,arguments);this.content_=a.content||"";this.disableAutoPan_=a.disableAutoPan||!1;this.maxWidth_=a.maxWidth||0;this.pixelOffset_=a.pixelOffset||new google.maps.Size(0,0);this.position_=a.position||new google.maps.LatLng(0,0);this.zIndex_=a.zIndex||null;this.boxClass_=a.boxClass||"infoBox";this.boxStyle_=a.boxStyle||{};this.closeBoxMargin_=a.closeBoxMargin||"2px";this.closeBoxURL_=a.closeBoxURL||"http://www.google.com/intl/en_us/mapfiles/close.gif";
""===a.closeBoxURL&&(this.closeBoxURL_="");this.infoBoxClearance_=a.infoBoxClearance||new google.maps.Size(1,1);this.isHidden_=a.isHidden||!1;this.alignBottom_=a.alignBottom||!1;this.pane_=a.pane||"floatPane";this.enableEventPropagation_=a.enableEventPropagation||!1;this.fixedWidthSet_=this.contextListener_=this.moveListener_=this.eventListener3_=this.eventListener2_=this.eventListener1_=this.closeListener_=this.div_=null}InfoBox.prototype=new google.maps.OverlayView;
InfoBox.prototype.createInfoBoxDiv_=function(){var a,b=this,c=function(a){a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()},e=function(a){a.returnValue=!1;a.preventDefault&&a.preventDefault();b.enableEventPropagation_||c(a)};this.div_||(this.div_=document.createElement("div"),this.setBoxStyle_(),"undefined"===typeof this.content_.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+this.content_:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(this.content_)),this.getPanes()[this.pane_].appendChild(this.div_),
this.addClickHandler_(),this.div_.style.width?this.fixedWidthSet_=!0:0!==this.maxWidth_&&this.div_.offsetWidth>this.maxWidth_?(this.div_.style.width=this.maxWidth_,this.div_.style.overflow="auto",this.fixedWidthSet_=!0):(a=this.getBoxWidths_(),this.div_.style.width=this.div_.offsetWidth-a.left-a.right+"px",this.fixedWidthSet_=!1),this.panBox_(this.disableAutoPan_),this.enableEventPropagation_||(this.eventListener1_=google.maps.event.addDomListener(this.div_,"mousedown",c),this.eventListener2_=google.maps.event.addDomListener(this.div_,
"click",c),this.eventListener3_=google.maps.event.addDomListener(this.div_,"dblclick",c),this.eventListener4_=google.maps.event.addDomListener(this.div_,"mouseover",function(a){this.style.cursor="default"})),this.contextListener_=google.maps.event.addDomListener(this.div_,"contextmenu",e),google.maps.event.trigger(this,"domready"))};
InfoBox.prototype.getCloseBoxImg_=function(){var a="";""!==this.closeBoxURL_&&(a="<img"+(" src='"+this.closeBoxURL_+"'"),a+=" align=right style='",a+=" position: relative; display: none;",a+=" width: 12px;",a+=" height: 12px;",a+=" cursor: pointer;",a+=" margin: "+this.closeBoxMargin_+";",a+="'>");return a};
InfoBox.prototype.addClickHandler_=function(){var a;""!==this.closeBoxURL_?(a=this.div_.firstChild,this.closeListener_=google.maps.event.addDomListener(a,"click",this.getCloseClickHandler_())):this.closeListener_=null};InfoBox.prototype.getCloseClickHandler_=function(){var a=this;return function(b){b.cancelBubble=!0;b.stopPropagation&&b.stopPropagation();a.close();google.maps.event.trigger(a,"closeclick")}};
InfoBox.prototype.panBox_=function(a){var b=0,c=0;if(!a&&(a=this.getMap(),a instanceof google.maps.Map)){a.getBounds().contains(this.position_)||a.setCenter(this.position_);a.getBounds();var e=a.getDiv(),m=e.offsetWidth,e=e.offsetHeight,h=this.pixelOffset_.width,f=this.pixelOffset_.height,n=this.div_.offsetWidth,k=this.div_.offsetHeight,l=this.infoBoxClearance_.width,g=this.infoBoxClearance_.height,d=this.getProjection().fromLatLngToContainerPixel(this.position_);d.x<-h+l?b=d.x+h-l:d.x+n+h+l>m&&(b=
d.x+n+h+l-m);this.alignBottom_?d.y<-f+g+k?c=d.y+f-g-k:d.y+f+g>e&&(c=d.y+f+g-e):d.y<-f+g?c=d.y+f-g:d.y+k+f+g>e&&(c=d.y+k+f+g-e);if(0!==b||0!==c)a.getCenter(),a.panBy(b,c)}};
InfoBox.prototype.setBoxStyle_=function(){var a,b;if(this.div_){this.div_.className=this.boxClass_;this.div_.style.cssText="";b=this.boxStyle_;for(a in b)b.hasOwnProperty(a)&&(this.div_.style[a]=b[a]);"undefined"!==typeof this.div_.style.opacity&&""!==this.div_.style.opacity&&(this.div_.style.filter="alpha(opacity="+100*this.div_.style.opacity+")");this.div_.style.position="absolute";this.div_.style.visibility="hidden";null!==this.zIndex_&&(this.div_.style.zIndex=this.zIndex_)}};
InfoBox.prototype.getBoxWidths_=function(){var a,b={top:0,bottom:0,left:0,right:0};a=this.div_;if(document.defaultView&&document.defaultView.getComputedStyle){if(a=a.ownerDocument.defaultView.getComputedStyle(a,""))b.top=parseInt(a.borderTopWidth,10)||0,b.bottom=parseInt(a.borderBottomWidth,10)||0,b.left=parseInt(a.borderLeftWidth,10)||0,b.right=parseInt(a.borderRightWidth,10)||0}else document.documentElement.currentStyle&&a.currentStyle&&(b.top=parseInt(a.currentStyle.borderTopWidth,10)||0,b.bottom=
parseInt(a.currentStyle.borderBottomWidth,10)||0,b.left=parseInt(a.currentStyle.borderLeftWidth,10)||0,b.right=parseInt(a.currentStyle.borderRightWidth,10)||0);return b};InfoBox.prototype.onRemove=function(){this.div_&&(this.div_.parentNode.removeChild(this.div_),this.div_=null)};
InfoBox.prototype.draw=function(){this.createInfoBoxDiv_();var a=this.getProjection().fromLatLngToDivPixel(this.position_);this.div_.style.left=a.x+this.pixelOffset_.width+"px";this.alignBottom_?this.div_.style.bottom=-(a.y+this.pixelOffset_.height)+"px":this.div_.style.top=a.y+this.pixelOffset_.height+"px";this.div_.style.visibility=this.isHidden_?"hidden":"visible"};
InfoBox.prototype.setOptions=function(a){"undefined"!==typeof a.boxClass&&(this.boxClass_=a.boxClass,this.setBoxStyle_());"undefined"!==typeof a.boxStyle&&(this.boxStyle_=a.boxStyle,this.setBoxStyle_());"undefined"!==typeof a.content&&this.setContent(a.content);"undefined"!==typeof a.disableAutoPan&&(this.disableAutoPan_=a.disableAutoPan);"undefined"!==typeof a.maxWidth&&(this.maxWidth_=a.maxWidth);"undefined"!==typeof a.pixelOffset&&(this.pixelOffset_=a.pixelOffset);"undefined"!==typeof a.alignBottom&&
(this.alignBottom_=a.alignBottom);"undefined"!==typeof a.position&&this.setPosition(a.position);"undefined"!==typeof a.zIndex&&this.setZIndex(a.zIndex);"undefined"!==typeof a.closeBoxMargin&&(this.closeBoxMargin_=a.closeBoxMargin);"undefined"!==typeof a.closeBoxURL&&(this.closeBoxURL_=a.closeBoxURL);"undefined"!==typeof a.infoBoxClearance&&(this.infoBoxClearance_=a.infoBoxClearance);"undefined"!==typeof a.isHidden&&(this.isHidden_=a.isHidden);"undefined"!==typeof a.enableEventPropagation&&(this.enableEventPropagation_=
a.enableEventPropagation);this.div_&&this.draw()};
InfoBox.prototype.setContent=function(a){this.content_=a;this.div_&&(this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null),this.fixedWidthSet_||(this.div_.style.width=""),"undefined"===typeof a.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+a:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(a)),this.fixedWidthSet_||(this.div_.style.width=this.div_.offsetWidth+"px","undefined"===typeof a.nodeType?this.div_.innerHTML=this.getCloseBoxImg_()+
a:(this.div_.innerHTML=this.getCloseBoxImg_(),this.div_.appendChild(a))),this.addClickHandler_());google.maps.event.trigger(this,"content_changed")};InfoBox.prototype.setPosition=function(a){this.position_=a;this.div_&&this.draw();google.maps.event.trigger(this,"position_changed")};InfoBox.prototype.setZIndex=function(a){this.zIndex_=a;this.div_&&(this.div_.style.zIndex=a);google.maps.event.trigger(this,"zindex_changed")};InfoBox.prototype.getContent=function(){return this.content_};
InfoBox.prototype.getPosition=function(){return this.position_};InfoBox.prototype.getZIndex=function(){return this.zIndex_};InfoBox.prototype.show=function(){this.isHidden_=!1;this.div_&&(this.div_.style.visibility="visible")};InfoBox.prototype.hide=function(){this.isHidden_=!0;this.div_&&(this.div_.style.visibility="hidden")};
InfoBox.prototype.open=function(a,b){var c=this;b&&(this.position_=b.getPosition(),this.moveListener_=google.maps.event.addListener(b,"position_changed",function(){c.setPosition(this.getPosition())}));this.setMap(a);this.div_&&this.panBox_()};
InfoBox.prototype.close=function(){this.closeListener_&&(google.maps.event.removeListener(this.closeListener_),this.closeListener_=null);this.eventListener1_&&(google.maps.event.removeListener(this.eventListener1_),google.maps.event.removeListener(this.eventListener2_),google.maps.event.removeListener(this.eventListener3_),google.maps.event.removeListener(this.eventListener4_),this.eventListener4_=this.eventListener3_=this.eventListener2_=this.eventListener1_=null);this.moveListener_&&(google.maps.event.removeListener(this.moveListener_),
this.moveListener_=null);this.contextListener_&&(google.maps.event.removeListener(this.contextListener_),this.contextListener_=null);this.setMap(null)};