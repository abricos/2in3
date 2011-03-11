YUI.add('yui2-progressbar', function(Y) {
    var YAHOO    = Y.YUI2;
    /*
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0pr1
*/
(function(){var B=YAHOO.util.Dom,H=YAHOO.lang,a="yui-pb",d=a+"-mask",Z=a+"-bar",Y=a+"-anim",P=a+"-tl",K=a+"-tr",J=a+"-bl",F=a+"-br",G="width",V="height",L="minValue",X="maxValue",I="value",A="anim",W="direction",D="ltr",S="rtl",g="ttb",R="btt",E="barEl",C="maskEl",U="ariaTextTemplate",M="animAcceleration",O="background-position",N="px",c="start",f="progress",T="complete";var Q=function(b){Q.superclass.constructor.call(this,document.createElement("div"),b);this._init(b);};YAHOO.widget.ProgressBar=Q;Q.MARKUP=['<div class="',Z,'"></div><div class="',d,'"><div class="',P,'"></div><div class="',K,'"></div><div class="',J,'"></div><div class="',F,'"></div></div>'].join("");H.extend(Q,YAHOO.util.Element,{_init:function(b){},initAttributes:function(i){Q.superclass.initAttributes.call(this,i);this.set("innerHTML",Q.MARKUP);this.addClass(a);var h,b=["id",G,V,"class","style"];while((h=b.pop())){if(h in i){this.set(h,i[h]);}}this.setAttributeConfig(E,{readOnly:true,value:this.getElementsByClassName(Z)[0]});this.setAttributeConfig(C,{readOnly:true,value:this.getElementsByClassName(d)[0]});this.setAttributeConfig(W,{value:D,validator:function(j){if(this._rendered){return false;}switch(j){case D:case S:case g:case R:return true;default:return false;}}});this.setAttributeConfig(X,{value:100,validator:H.isNumber,method:function(j){this.get("element").setAttribute("aria-valuemax",j);if(this.get(I)>j){this.set(I,j);}}});this.setAttributeConfig(L,{value:0,validator:H.isNumber,method:function(j){this.get("element").setAttribute("aria-valuemin",j);if(this.get(I)<j){this.set(I,j);}}});this.setAttributeConfig(G,{getter:function(){return this.getStyle(G);},method:this._widthChange});this.setAttributeConfig(V,{getter:function(){return this.getStyle(V);},method:this._heightChange});this.setAttributeConfig(U,{value:"{value}"});this.setAttributeConfig(I,{value:0,validator:function(j){return H.isNumber(j)&&j>=this.get(L)&&j<=this.get(X);},method:this._valueChange});this.setAttributeConfig(A,{validator:function(j){return !!YAHOO.util.Anim;},setter:this._animSetter});this.setAttributeConfig(M,{value:null,validator:function(j){return H.isNumber(j)||H.isNull(j);},method:function(j){this._fixAnim(this.get(A),j);}});},render:function(h,i){if(this._rendered){return;}this._rendered=true;var j=this.get(W);this.addClass(a);this.addClass(a+"-"+j);var b=this.get("element");b.tabIndex=0;b.setAttribute("role","progressbar");b.setAttribute("aria-valuemin",this.get(L));b.setAttribute("aria-valuemax",this.get(X));this.appendTo(h,i);this.redraw(false);this._previousValue=this.get(I);this._fixEdges();this.on("minValueChange",this.redraw);this.on("maxValueChange",this.redraw);return this;},redraw:function(b){this._recalculateConstants();this._valueChange(this.get(I),b);},destroy:function(){this.set(A,false);this.unsubscribeAll();var b=this.get("element");if(b.parentNode){b.parentNode.removeChild(b);}},_previousValue:0,_barSpace:100,_barFactor:1,_rendered:false,_heightChange:function(b){if(H.isNumber(b)){b+=N;}this.setStyle(V,b);this._fixEdges();this.redraw(false);},_widthChange:function(b){if(H.isNumber(b)){b+=N;}this.setStyle(G,b);this._fixEdges();this.redraw(false);},_fixEdges:function(){if(!this._rendered||YAHOO.env.ua.ie||YAHOO.env.ua.gecko){return;}var j=this.get(C),l=B.getElementsByClassName(P,undefined,j)[0],i=B.getElementsByClassName(K,undefined,j)[0],k=B.getElementsByClassName(J,undefined,j)[0],h=B.getElementsByClassName(F,undefined,j)[0],b=(parseInt(B.getStyle(j,V),10)-parseInt(B.getStyle(l,V),10))+N;B.setStyle(k,V,b);B.setStyle(h,V,b);b=(parseInt(B.getStyle(j,G),10)-parseInt(B.getStyle(l,G),10))+N;B.setStyle(i,G,b);B.setStyle(h,G,b);},_recalculateConstants:function(){var b=this.get(E);switch(this.get(W)){case D:case S:this._barSpace=parseInt(this.get(G),10)-(parseInt(B.getStyle(b,"marginLeft"),10)||0)-(parseInt(B.getStyle(b,"marginRight"),10)||0);break;case g:case R:this._barSpace=parseInt(this.get(V),10)-(parseInt(B.getStyle(b,"marginTop"),10)||0)-(parseInt(B.getStyle(b,"marginBottom"),10)||0);break;}this._barFactor=this._barSpace/(this.get(X)-(this.get(L)||0))||1;},_animSetter:function(i){var h,b=this.get(E);if(i){if(i instanceof YAHOO.util.Anim){h=i;}else{h=new YAHOO.util.Anim(b);}h.onTween.subscribe(this._animOnTween,this,true);h.onComplete.subscribe(this._animComplete,this,true);this._fixAnim(h,this.get(M));}else{h=this.get(A);if(h){h.onTween.unsubscribeAll();h.onComplete.unsubscribeAll();}h=null;}return h;},_fixAnim:function(i,h){if(i){if(!this._oldSetAttribute){this._oldSetAttribute=i.setAttribute;}var b=this;switch(this.get(W)){case D:i.setAttribute=function(j,l,k){l=Math.round(l);b._oldSetAttribute.call(this,j,l,k);if(j==G){b._oldSetAttribute.call(this,O,-l*h,N);}};break;case S:i.setAttribute=function(j,m,k){m=Math.round(m);b._oldSetAttribute.call(this,j,m,k);if(j==G){var l=b._barSpace-m;b._oldSetAttribute.call(this,"left",l,N);b._oldSetAttribute.call(this,O,-l+m*h,N);}};break;case g:i.setAttribute=function(j,l,k){l=Math.round(l);b._oldSetAttribute.call(this,j,l,k);if(j==V){b._oldSetAttribute.call(this,O,"center "+(-l*h),N);}};break;case R:i.setAttribute=function(j,m,k){m=Math.round(m);b._oldSetAttribute.call(this,j,m,k);if(j==V){var l=b._barSpace-m;b._oldSetAttribute.call(this,"top",l,N);b._oldSetAttribute.call(this,O,"center "+(m*h-l),N);}};break;}}},_animComplete:function(){var b=this.get(I);this._previousValue=b;this.fireEvent(f,b);this.fireEvent(T,b);B.removeClass(this.get(E),Y);},_animOnTween:function(b,h){var i=Math.floor(this._tweenFactor*h[0].currentFrame+this._previousValue);this.fireEvent(f,i);},_valueChange:function(j,h){var i=this.get(A),b=Math.floor((j-this.get(L))*this._barFactor);this._setAriaText(j);if(this._rendered){if(i){i.stop();if(i.isAnimated()){i._onComplete.fire();}}this.fireEvent(c,this._previousValue);Q._barSizeFunctions[((h!==false)&&i)?1:0][this.get(W)].call(this,j,b,this.get(E),i);}},_setAriaText:function(h){var b=this.get("element"),i=H.substitute(this.get(U),{value:h,minValue:this.get(L),maxValue:this.get(X)});
b.setAttribute("aria-valuenow",h);b.setAttribute("aria-valuetext",i);}});var e=[{},{}];Q._barSizeFunctions=e;e[0][D]=function(j,b,h,i){B.setStyle(h,G,b+N);this.fireEvent(f,j);this.fireEvent(T,j);};e[0][S]=function(j,b,h,i){B.setStyle(h,G,b+N);B.setStyle(h,"left",(this._barSpace-b)+N);this.fireEvent(f,j);this.fireEvent(T,j);};e[0][g]=function(j,b,h,i){B.setStyle(h,V,b+N);this.fireEvent(f,j);this.fireEvent(T,j);};e[0][R]=function(j,b,h,i){B.setStyle(h,V,b+N);B.setStyle(h,"top",(this._barSpace-b)+N);this.fireEvent(f,j);this.fireEvent(T,j);};e[1][D]=function(j,b,h,i){B.addClass(h,Y);this._tweenFactor=(j-this._previousValue)/i.totalFrames/i.duration;i.attributes={width:{to:b}};i.animate();};e[1][S]=e[1][D];e[1][g]=function(j,b,h,i){B.addClass(h,Y);this._tweenFactor=(j-this._previousValue)/i.totalFrames/i.duration;i.attributes={height:{to:b}};i.animate();};e[1][R]=e[1][g];})();YAHOO.register("progressbar",YAHOO.widget.ProgressBar,{version:"2.9.0pr1",build:"2725"});
}, '2.9.0pr1.2725' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-element", "yui2-skin-sam-progressbar"], "optional": ["yui2-animation"]});