(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{299:function(e,t,a){"use strict";var n=a(23),o=a(0),r=a.n(o),i=a(300),s=a.n(i),l=a(9);t.a=function(e){var t=null,a=[s.a.Button];return e.btnClicked&&(t=e.btnClicked,e.buttonArgs?t=function(t){return e.btnClicked(t,e.buttonArgs)}:l.e(e.buttonArgs,0)&&(t=function(t){return e.btnClicked.apply(e,[t].concat(Object(n.a)(e.buttonArgs)))})),"login"===e.context?a.push(s.a.Button__Login):"logout"===e.context&&a.push(s.a.Button__Logout),e.isLink?r.a.createElement("a",{href:e.href,target:e.target,rel:"noopener noreferrer",className:a.join(" ")},r.a.createElement("span",{className:s.a.Button__Text},e.text)):r.a.createElement("button",{className:a.join(" "),onClick:t},r.a.createElement("span",{className:s.a.Button__Text},e.text))}},300:function(e,t,a){e.exports={Button:"Button_Button__qeSPR",Button__Text:"Button_Button__Text__-SCdJ",Button__Login:"Button_Button__Login__3r9X-",Button__Logout:"Button_Button__Logout__2N23u"}},302:function(e,t,a){e.exports={Dropdown:"Dropdown_Dropdown__3fBqO",Dropdown_discover:"Dropdown_Dropdown_discover__vMY_k",Dropdown__List:"Dropdown_Dropdown__List__1IBTC",Dropdown__List_discover:"Dropdown_Dropdown__List_discover__3mPbT",Dropdown__Header:"Dropdown_Dropdown__Header__3oYdW",Dropdown__Header_discover:"Dropdown_Dropdown__Header_discover__2-oxh",Dropdown__Item:"Dropdown_Dropdown__Item__lSNiq",Dropdown__Item_discover:"Dropdown_Dropdown__Item_discover__1FGvk"}},304:function(e,t,a){e.exports={Filters:"Filters_Filters__79eZp"}},306:function(e,t,a){e.exports={Header:"Header_Header__Qitun",Header__Discover:"Header_Header__Discover__3xNQb",Header__Login:"Header_Header__Login__2815X",Header__Login_Buttons:"Header_Header__Login_Buttons__3W1w1",Header__Fineprint:"Header_Header__Fineprint__2WATO"}},308:function(e,t,a){"use strict";var n=a(11),o=a(0),r=a.n(o),i=a(77),s=a(299),l=a(101),u=a(302),p=a.n(u),c=function(e){var t=e.stateKey,a=e.updateKey,n=[p.a.Dropdown],o=[p.a.Dropdown__Header],i=[p.a.Dropdown__List],s=[p.a.Dropdown__Item];"discover"===e.context&&(n.push(p.a.Dropdown_discover),o.push(p.a.Dropdown__Header_discover),i.push(p.a.Dropdown__List_discover),s.push(p.a.Dropdown__Item_discover));var l=e.options.map(function(n){return r.a.createElement("li",{key:n.text,onClick:function(o){return e.selected(n.text,t,a)},className:s.join(" ")},n.text)});return r.a.createElement("div",{className:n.join(" ")},r.a.createElement("div",{className:o.join(" ")},e.value),r.a.createElement("ul",{className:i.join(" ")},l))},d=a(304),_=a.n(d),v=function(e){var t=[],a=[];e.filters&&Object.entries(e.filters).forEach(function(o){var i=Object(n.a)(o,2),s=i[0],u=i[1];"text"===u.inputType?t.push(r.a.createElement(l.a,Object.assign({context:"discoverText",key:s,stateKey:e.stateKey,updateKey:s,func:e.inputChanged},u))):"select"===u.inputType&&a.push(r.a.createElement(c,Object.assign({key:s,context:"discover",stateKey:e.stateKey,updateKey:s,selected:e.inputChanged},u)))});var o=r.a.createElement(l.a,{context:"discoverSubmit",inputType:"submit",inputConfig:{type:"submit",placeholder:"Apply"},value:"Apply",func:e.applyFilters});return r.a.createElement("form",{className:_.a.Filters,onSubmit:e.applyFilters},t,a,o)},h=a(9),g=a(306),m=a.n(g);t.a=function(e){var t=e.context,a=e.headerTitle,o=[m.a.Header],l=null;"discover"===t&&(o.push(m.a.Header__Discover),l=r.a.createElement(v,{stateKey:e.stateKey,applyFilters:e.applyFilters,inputChanged:e.updateInputValue,filters:e.filters}));var u=null,p=null;return"login"===t&&(o.push(m.a.Header__Login),h.f(e.buttons)&&(u=[],Object.entries(e.buttons).forEach(function(a){var o=Object(n.a)(a,2),i=o[0],l=o[1];"link"===l.inputConfig.type?u.push(r.a.createElement(s.a,{key:i,href:l.inputConfig.href,target:"_blank",isLink:!0,context:t,text:l.value})):u.push(r.a.createElement(s.a,{key:i,btnClicked:e.btnClicked,text:l.value,context:t,buttonArgs:l.inputConfig}))}),e.fineprint&&(p=r.a.createElement("p",{className:m.a.Header__Fineprint},e.fineprint.value)),u=r.a.createElement("div",{className:m.a.Header__Login_Buttons},u))),r.a.createElement("header",{className:o.join(" ")},r.a.createElement(i.a,{title:a,context:t}),l,u,p)}},314:function(e,t,a){e.exports={Discover:"Discover_Discover__GkooB",Discover__Results:"Discover_Discover__Results__1NdfO",Discover__NoResults:"Discover_Discover__NoResults__vy9Gv"}},344:function(e,t,a){"use strict";a.r(t);var n=a(11),o=a(5),r=a(14),i=a(15),s=a(17),l=a(16),u=a(18),p=a(0),c=a.n(p),d=a(32),_=a(78),v=a(308),h=a(116),g=a(314),m=a.n(g),f=a(33),y=a(13),D=a(29),w=a(9),x=function(e){function t(){var e,a;Object(r.a)(this,t);for(var i=arguments.length,u=new Array(i),p=0;p<i;p++)u[p]=arguments[p];return(a=Object(s.a)(this,(e=Object(l.a)(t)).call.apply(e,[this].concat(u)))).state={filters:{sortBy:{inputType:"select",value:"Sort Order",hasDictionary:!0,inputConfig:{name:"sort_by",defaultVal:"Sort Order"},options:[{text:"Sort Order"},{text:"Popularity: High to Low"},{text:"Popularity: Low to High"},{text:"Rating: High to Low"},{text:"Rating: Low to High"},{text:"Release Date: New to Old"},{text:"Release Date: Old to New"},{text:"Title: A to Z"},{text:"Title: Z to A"},{text:"Revenue: High to Low"},{text:"Revenue: Low to High"}]},year:{inputType:"select",value:"By Year",inputConfig:{name:"primary_release_year",defaultVal:"By Year"},options:w.d("By Year",50,w.b(),"desc")},rating:{inputType:"select",value:"By Rating",inputConfig:{name:"vote_average.gte",defaultVal:"By Rating"},options:w.d("By Rating",10,10,"desc")},media:{inputType:"select",value:"Movie",inputConfig:{isMedia:!0},options:[{text:"Movie"},{text:"TV"}]},keywords:{inputType:"text",value:"",inputConfig:{type:"text",placeholder:"Keywords",name:"with_keywords"}},people:{inputType:"text",value:"",inputConfig:{type:"text",placeholder:"People Involved",name:"with_people"}}},initFilters:{media:{name:"movie",value:"Movie"},year:{name:"primary_release_year",value:w.b()}},searchQueryPath:"",isLoaded:!1},a.updateInputValueHandler=function(e,t,n){var r="";e.target&&e.target.value?r=e.target.value:"string"===typeof e&&(r=e),a.setState(Object(o.a)({},t,w.h(t,n,r,a.state)))},a.applyFiltersHandler=function(e){e.preventDefault();var t={},o=[];Object.entries(a.state.filters).forEach(function(e){var a=Object(n.a)(e,2),r=a[0],i=a[1],s=i.inputConfig,l=i.value,u=i.inputType,p=i.hasDictionary,c=s.name,d=s.defaultVal,_=s.isMedia;"select"===u&&d!==l?(p&&(l=w.c(l)),_?(c=l.toLowerCase(),o.push(["media",c].join("="))):o.push([c,l].join("=")),t[r]={name:c,value:l}):"select"!==u&&""!==l&&(o.push([c,l].join("=")),t[r]={name:c,value:l})});var r=a.props,i=r.history,s=r.onGetDiscoverResults,l=r.page;if(w.f(t)){var u=["/discover?",o.join("&")].join(""),p=[u,"&page=",l].join("");s(t),i.push(p),a.setState({searchQueryPath:u})}else i.push("/discover")},a.getFilmDetailsHandler=function(e,t){"tv"===t?a.props.onGetTVDetails(e):"movie"===t&&a.props.onGetMovieDetails(e)},a.arrowClickedHandler=function(e){a.props.onChangeDiscoverList(e)},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.initFilters,t=["/discover?",e.year.name,"=",e.year.value,"&media=",e.media.name].join("");this.setState({searchQueryPath:t}),this.props.onGetDiscoverInit(e),window.scrollTo(0,0)}},{key:"componentDidUpdate",value:function(e){var t=e.page,a=this.props,n=a.location,o=a.history,r=a.page,i=a.loading,s=a.listLength,l=this.state,u=l.searchQueryPath,p=l.isLoaded;""!==u&&t!==r&&o.push(u.concat(["&page=",r].join(""))),s&&(p||i?p&&i&&!n.state&&this.setState({isLoaded:!1}):this.setState({isLoaded:!0}))}},{key:"render",value:function(){var e=c.a.createElement(h.a,{context:"discover",page:this.props.page,maxPage:this.props.maxPage,results:this.props.results,listLength:this.props.listLength,videoClicked:this.getFilmDetailsHandler,arrowClicked:this.arrowClickedHandler,mediaType:this.state.filters.media.value.toLowerCase(),isImgLoaded:this.state.isLoaded,isDiscover:!0,hasPathPrefix:!0}),t=null;return this.props.loading||this.props.loadingInit||(0===this.props.results.length?e=c.a.createElement("p",{className:m.a.Discover__NoResults},this.props.totalResults," results found"):t=c.a.createElement("p",{className:m.a.Discover__Results},this.props.totalResults," results found")),c.a.createElement(c.a.Fragment,null,c.a.createElement(_.a,{loading:this.props.loadingInit,pageTitle:"Discover More"}),c.a.createElement("div",{className:m.a.Discover},c.a.createElement(v.a,{headerTitle:"Discover",context:"discover",stateKey:"filters",applyFilters:this.applyFiltersHandler,updateInputValue:this.updateInputValueHandler,filters:this.state.filters}),t,e))}}]),t}(p.Component);t.default=Object(d.b)(function(e){return{results:e.discover.results,totalResults:e.discover.totalResults,loadingInit:e.discover.loadingInit,loading:e.discover.loading,page:e.discover.showPage,loadedPage:e.discover.page,maxPage:e.discover.maxPage,listLength:e.app.listLength}},function(e){return{onGetDiscoverInit:function(t){return e(f.e(t))},onGetDiscoverResults:function(t){return e(f.h(t))},onChangeDiscoverList:function(t){return e(f.a(t))},onGetMovieDetails:function(t){return e(y.l(t))},onGetTVDetails:function(t){return e(D.l(t))}}})(x)}}]);
//# sourceMappingURL=3.879777d7.chunk.js.map