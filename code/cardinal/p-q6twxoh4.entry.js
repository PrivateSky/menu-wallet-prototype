import{r as e,h as t}from"./p-2eb42df6.js";import{C as r}from"./p-6a61ad0f.js";const n=class{constructor(t){e(this,t)}renderMenuItem(e){let r=e.path,n=[];e.children&&"known"===e.children.type&&e.children.items.forEach(e=>{n.push(this.renderMenuItem(e))});let a=t("div",{class:"wrapper_container"},t("div",{class:"item_container"},t("span",{class:`icon fa ${e.icon}`}),t("span",{class:"item_name"},e.name),e.children?t("span",{class:"fa fa-caret-right expand-menu"}):null),e.children?t("div",{class:"children"},n):null);if(e.children&&"event"===e.children.type)return t("event-expandable-renderer",{event:e.children.event},a);{let n="query"===this.historyType?"query-page-link":"stencil-route-link";return t("abstract"===e.type?"expandable-renderer":n,{firstMenuChild:e.children?e.children.items[0]:"",url:r,activeClass:"active",exact:!1,somethingChanged:this.value},a)}}render(){return this.renderMenuItem(this.value)}};!function(e,t,r,n){var a,s=arguments.length,i=s<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(e,t,r,n);else for(var l=e.length-1;l>=0;l--)(a=e[l])&&(i=(s<3?a(i):s>3?a(t,r,i):a(t,r))||i);s>3&&i&&Object.defineProperty(t,r,i)}([r()],n.prototype,"value",void 0);export{n as sidebar_renderer};