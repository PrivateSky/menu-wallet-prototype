System.register(["./p-3369a689.system.js","./p-04722581.system.js","./p-894b1d93.system.js","./p-609d210d.system.js","./p-5514a11c.system.js","./p-4a86ff19.system.js","./p-ce0bcb66.system.js","./p-b1be88f7.system.js"],(function(e){"use strict";var t,o,n,s,i,r,a,l,d;return{setters:[function(e){t=e.r;o=e.c;n=e.h;s=e.g},function(){},function(){},function(e){i=e.T},function(e){r=e.C},function(e){a=e.B},function(e){l=e.P},function(e){d=e.T}],execute:function(){var c=undefined&&undefined.__decorate||function(e,t,o,n){var s=arguments.length,i=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,r;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")i=Reflect.decorate(e,t,o,n);else for(var a=e.length-1;a>=0;a--)if(r=e[a])i=(s<3?r(i):s>3?r(t,o,i):r(t,o))||i;return s>3&&i&&Object.defineProperty(t,o,i),i};var p=e("psk_modal",function(){function e(e){var n=this;t(this,e);this._closeModalHandler=function(e){if(n.eventName){e.preventDefault();e.stopImmediatePropagation();var t=new l(n.eventName,null,{bubbles:true,composed:true,cancelable:true});n._host.dispatchEvent(t)}else{n.closeModal.emit()}};this.opened=false;this.closeModal=o(this,"closeModal",7)}e.prototype.render=function(){return n("div",null,n("div",{id:"backdrop",onClick:this._closeModalHandler}),n("div",{id:"modal"},n("div",{class:"modal-content"},n("div",{class:"modal-header"},n("slot",{name:"title"}),n("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},n("span",{"aria-hidden":"true",onClick:this._closeModalHandler},"×"))),n("div",{class:"modal-body"},n("slot",null)))))};Object.defineProperty(e.prototype,"_host",{get:function(){return s(this)},enumerable:true,configurable:true});return e}());c([a(),r()],p.prototype,"_host",void 0);c([i({description:"This is the property that gives the state of the modal if it is opened or closed. The posible values are true or false.",isMandatory:false,propertyType:"boolean",defaultValue:"false"})],p.prototype,"opened",void 0);c([d({eventName:"closeModal",description:"When this event is triggered the Application Controller should listen to this so the modal can be closed within the controller."})],p.prototype,"closeModal",void 0);c([i({description:["By defining this attribute, the component will be able to trigger an event. The name of the event is the value of the attribute."],isMandatory:false,propertyType:"string"})],p.prototype,"eventName",void 0)}}}));