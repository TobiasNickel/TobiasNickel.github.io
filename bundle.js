(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var appData=module.exports={appName:"dData",data:{_meta:{schemas:{}}},section:"lists",sections:{lists:{currentListName:"none",currentList:[],newValues:{},"new":!1},definitions:{selected:null},store:{saveName:"data.json"}},userLanguage:"en",languages:{en:{load:"load",save:"save",lists:"lists",forms:"forms",definitions:"definitions","new":"new",back:"back",properties:"properties","add property":"add property",name:"name"},de:{load:"laden",save:"speichern",lists:"Listen",forms:"Formulare",definitions:"Definitionen","new":"neu",back:"zurück",properties:"Eigenschaften","add property":"neue Eigenschaft",name:"Name"},zh:{load:"laden",save:"speichern",lists:"Listen",forms:"Formulare",definitions:"Definitionen","new":"neu",back:"zurück",properties:"Eigenschaften","add property":"neue Eigenschaft",name:"Name"}},t:function(e){return appData.languages[appData.userLanguage][e]||e}},language=navigator.language.substr(0,2).toLowerCase();appData.languages[language]&&(appData.userLanguage=language),module.exports.sections.lists.currentList=module.exports.data.Contacts;

},{}],2:[function(require,module,exports){
function set(e,t){var a=e;e=e.split(".");for(var r,n={it:appData};r=e.shift();){if(0==e.length)return void(n[r]=t);n=n[r]}throw"can not set: "+a}function ensureMeta(e){e._meta||(e._meta={schemas:{}});var t=e._meta;for(var a in e)"_meta"!==a&&Array.isArray(e[a])&&(t.schemas[a]||(t.schemas[a]=createListsDefaultSchema(e[a])))}function createListsDefaultSchema(e){var t={fields:{}};if(e.length)for(var a in e[0])t.fields[a]||(t.fields[a]={type:typeof e[0][a]});return t}var appData=require("../appData"),app=require("../main");module.exports.set=function(e){e.style.cursor="pointer",e.addEventListener("click",function(){console.log("click");var t=e.getAttribute("prop");set(t,e.getAttribute("value")),app.rerender()})},module.exports.unset=function(e){e.style.cursor="pointer",e.addEventListener("click",function(){var t=e.getAttribute("prop");set(t,void 0),app.rerender()})},module.exports.dataBind=function(e){e.tagName.toLowerCase();e.addEventListener("change",function(){var t=e.value,a=e.getAttribute("prop");set(a,t),app.rerender()})},module.exports.loadFile=function(e){e.style.cursor="pointer";var t=document.createElement("input");t.setAttribute("type","file"),t.setAttribute("accept","json"),t.hidden=!0,e.appendChild(t),e.addEventListener("click",function(){t.click()}),t.addEventListener("change",function(){var e=new FileReader,a=t.files[0];e.readAsText(a),e.onload=function(){appData.data=JSON.parse(e.result),ensureMeta(appData.data),appData.sections.store.saveName=a.name,console.log(appData.data),app.rerender()}})},module.exports.createList=function(e){e.addEventListener("click",function(){var e=prompt("name:");e&&(appData.data[e]?alert("already exist"):(appData.data[e]=[],appData.data._meta.schemas[e]={fields:{}},app.rerender()))})},module.exports.addNewItem=function(e){e.addEventListener("click",function(){var e=appData.sections.lists.newValues,t=appData.data._meta.schemas[appData.sections.lists.currentListName];for(var a in t){var r=t[a];"number"==r.type?e[a]=parseFloat(e[a]):"boolean"==r.type&&(e[a]="on"==e[a])}appData.sections.lists.newValues={},appData.data[appData.sections.lists.currentListName].push(e),app.rerender()})},module.exports.removeSchemaField=function(e){e.addEventListener("click",function(){var t=e.getAttribute("name");delete appData.data._meta.schemas[appData.sections.definitions.selected].fields[t],app.rerender()})},module.exports.addNewSchemaField=function(e){e.addEventListener("click",function(){var e=prompt("get a name for the new property:");e&&(appData.data._meta.schemas[appData.sections.definitions.selected].fields[e]={type:"string"},app.rerender())})};

},{"../appData":1,"../main":3}],3:[function(require,module,exports){
function rerender(){var e=tM.render("main",appData);treeAct.render(e)}var TreeAct=require("treeact"),TemplateManager=require("templatemanager"),templates=require("./templates"),_=require("underscore"),components=require("./components/mainComponents");require("./style.less");var appData=require("./appData"),TDispatcher=require("tdispatcher");window._=_,appData.currentList=appData.data.contacts;var tM=new TemplateManager("underscore");tM.templates=templates,tM.fileExtension="html",tM.nameOfTemplatemanager="tM";var treeAct=new TreeAct(document.body);treeAct.components=components,rerender(),module.exports.rerender=rerender,module.exports.appData=appData,module.exports.dispatcher=new TDispatcher,window.rerender=rerender,window.appData=appData,window.app=module.exports;
},{"./appData":1,"./components/mainComponents":2,"./style.less":4,"./templates":5,"tdispatcher":9,"templatemanager":10,"treeact":11,"underscore":12}],4:[function(require,module,exports){
var css="* {\n  margin: 0px;\n  padding: 0px;\n}\nbody {\n  background-color: #ddd;\n}\n.app {\n  max-width: 640px;\n  width: 100%;\n  padding: 0 0px;\n  font-family: monospace;\n  font-size: 16px;\n  position: relative;\n  bottom: 0px;\n  top: 0px;\n  margin: auto;\n  height: 100%;\n}\n.app .navigation {\n  position: absolute;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  padding: 5px;\n  background-color: #fff;\n  text-align: center;\n}\n.app .navigation li {\n  display: inline;\n  padding: 0px 5px;\n  border-left: 1px #666 solid;\n  text-align: center;\n}\n.app .navigation li.selected {\n  font-weight: bold;\n}\n.app .navigation li:first-child {\n  border-left: 0px;\n}\n.listSelect {\n  background-color: white;\n  margin-bottom: 10px;\n  height: 28px;\n  padding-top: 8px;\n  overflow-y: scroll;\n}\n.listSelect li {\n  display: table-cell;\n  padding: 0 20px;\n}\n.listSelect li.selected {\n  font-weight: bold;\n}\n.listsPage .addNew {\n  background-color: white;\n  margin: 5px;\n  padding: 5px;\n}\n.listsPage .addNew label {\n  width: 120px;\n  display: inline-block;\n  overflow: hidden;\n}\n.table li {\n  margin: 0px 8px;\n  padding: 5px 5px;\n  height: 20px;\n  overflow: hidden;\n  background-color: white;\n  transition: 0.3s linear height;\n  line-height: 24px;\n}\n.table li .prop {\n  display: block;\n  padding-left: 13px;\n}\n.table li .prop .propName {\n  display: none;\n  color: #636363;\n  padding-right: 4px;\n}\n.table li .prop:first-child {\n  padding-left: 3px;\n}\n.table li:hover {\n  height: initial;\n}\n.table li:hover .propName {\n  display: inline;\n}\n.table li:nth-child(ODD) {\n  background-color: #F9F9F9;\n}\n.storePage {\n  text-align: center;\n  font-size: 30px;\n}\n.storePage * {\n  color: black;\n  padding: 60px;\n  text-decoration: none;\n}\n.storePage input {\n  padding: 4px;\n  font-size: 20px;\n}\n.definitionsPage .back {\n  margin-top: 30px;\n}\n.definitionsPage ul {\n  padding: 5px 5px;\n}\n.definitionsPage ul li {\n  position: relative;\n  background-color: white;\n  min-height: 24px;\n  padding-top: 8px;\n}\n.definitionsPage ul li:nth-child(ODD) {\n  background-color: #F9F9F9;\n}\n.definitionsPage ul li label {\n  padding: 0px 17px;\n}\n.definitionsPage ul li button {\n  position: absolute;\n  right: 8px;\n}\n.definitionsPage ul li select {\n  position: absolute;\n  right: 80px;\n}\nbutton {\n  background-color: white;\n  box-shadow: 1px 1px 2px black;\n  border-width: 0px;\n  padding: 2px 10px;\n  margin: 3px;\n}\nbutton:active {\n  margin: 4px 4px;\n  box-shadow: none;\n}\ninput {\n  background-color: white;\n  border: 1px solid lightgray;\n}\nselect {\n  background-color: white;\n}\nul {\n  list-style-type: none;\n}\n.page {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  bottom: 30px;\n  overflow: scroll;\n}\n";require("lessify")(css),module.exports=css;

},{"lessify":8}],5:[function(require,module,exports){
module.exports={definitions:{template:function(e){var n,t="";Array.prototype.join;t+='<div class="definitionsPage">\n    ';var s=e.sections.definitions.selected;if(t+="\n    ",s){t+="\n     ";var l=e.data._meta.schemas[e.sections.definitions.selected].fields;t+='\n        <h2 class="listHeadline">'+(null==(n=e.sections.definitions.selected)?"":_.escape(n))+" "+(null==(n=e.t("properties"))?"":n)+"</h2>\n        <ul>\n            ";for(var a in l)l[a]&&(t+="\n                <li><label>"+(null==(n=a)?"":_.escape(n))+'</label>\n                    <select component="dataBind" prop="it.data._meta.schemas.'+(null==(n=s)?"":_.escape(n))+".fields."+(null==(n=a)?"":_.escape(n))+'.type" type="select">\n                        <option value="string"',"string"==l[a].type&&(t+=' selected="true"'),t+='>string</option>\n                        <option value="number"',"number"==l[a].type&&(t+=' selected="true"'),t+='>number</option>\n                        <option value="boolean"',"boolean"==l[a].type&&(t+=' selected="true"'),t+='>boolean</option>\n                        <option value="date"',"date"==l[a].type&&(t+=' selected="true"'),t+=">date</option>\n                    </select><!-- - "+(null==(n=JSON.stringify(l[a]))?"":_.escape(n))+'-->\n                    <button component="removeSchemaField" name="'+(null==(n=a)?"":_.escape(n))+'">delete</button>\n                </li>\n        <!-- '+(null==(n="string"==l[a].type?" selected":"")?"":_.escape(n))+" -->\n            ");t+='\n        </ul>\n        <button component="addNewSchemaField">'+(null==(n=e.t("add property"))?"":n)+'</button>\n        <div class="back" component="set" prop="it.sections.definitions.selected">'+(null==(n=e.t("back"))?"":n)+"</div>\n     "}else{t+='\n        <h2 class="listsHeadline">'+(null==(n=e.t("lists"))?"":n)+"</h2>\n        <ul>\n            ";for(var a in e.data._meta.schemas)t+='<li component="set" prop="it.sections.definitions.selected" value="'+(null==(n=a)?"":_.escape(n))+'">'+(null==(n=a)?"":_.escape(n))+"</li>";t+="\n        </ul>\n     "}return t+="\n</div> "}},forms:{template:function(e){var n="";Array.prototype.join;return n+='<div class="formsPage">',e.data._meta.forms&&e.data._meta.forms.length||(n+="\n    there is currently no form defined\n"),n+="</div>"}},lists:{template:function(e){var n,t="";Array.prototype.join;t+='<div class="listsPage">\n    ';var s=e.sections.lists.currentListName,l=Object.keys(e.data);l=l.filter(function(n){return Array.isArray(e.data[n])});var a=e.data[s];if(e.data._meta.schemas)var i=e.data._meta.schemas[s];var o=[];if(a&&a[0]&&(o=Object.keys(a[0])),t+='\n    \n    <ul class="listSelect">\n        ',l.forEach(function(e){t+='\n            <li class="item '+(null==(n=s==e?"selected ":"")?"":n)+'" component="set" prop="it.sections.lists.currentListName" value="'+(null==(n=e)?"":n)+'">'+(null==(n=e)?"":n)+"</li>\n        "}),t+='\n        <li class="item"><button component="createList">new</button></li>\n    </ul>\n    \n    \n    ',a&&a.length&&(t+='\n        <ul class="table">\n        ',a.forEach(function(e){t+="\n            <li>",o.forEach(function(s){t+='<div class="prop"><span class="propName">'+(null==(n=s)?"":_.escape(n))+': </span><span class="value">'+(null==(n=e[s])?"":_.escape(n))+"</span></div>"}),t+="</li>\n        "}),t+="\n        </ul>\n    "),t+="\n    ",i){t+='\n    <div class="addNew">\n        <ul>\n            ';for(var c in i.fields){var r=i.fields[c];switch(t+="\n                <li>\n                    <label>"+(null==(n=c)?"":_.escape(n))+"</label>",r.type){case"number":t+='<input component="dataBind" prop="it.sections.lists.newValues.'+(null==(n=c)?"":_.escape(n))+'" type="number" value="'+(null==(n=e.sections.lists.newValues[c]||"")?"":_.escape(n))+'"/>';break;case"boolean":t+='<input component="dataBind" type="checkbox" prop="it.sections.lists.newValues.'+(null==(n=c)?"":_.escape(n))+'" checked="'+(null==(n=e.sections.lists.newValues[c]||"")?"":_.escape(n))+'"/>';break;case"date":t+='<input type="date" component="dataBind" prop="it.sections.lists.newValues.'+(null==(n=c)?"":_.escape(n))+'" value="'+(null==(n=e.sections.lists.newValues[c]||"")?"":_.escape(n))+'"/>';break;case"string":default:t+='<input component="dataBind" prop="it.sections.lists.newValues.'+(null==(n=c)?"":_.escape(n))+'" value="'+(null==(n=e.sections.lists.newValues[c]||"")?"":_.escape(n))+'"/>'}t+="\n                </li>\n            "}t+='\n        </ul>\n        <button component="addNewItem">add</button>\n    </div>\n    '}return t+="\n</div>"}},main:{template:function(e){var n,t="";Array.prototype.join;switch(t+='<div class="app">\n    <div class="page">\n    ',e.section){case"lists":t+=""+(null==(n=e.tM.render("./lists",e))?"":n);break;case"forms":t+=""+(null==(n=e.tM.render("./forms",e))?"":n);break;case"definitions":t+=""+(null==(n=e.tM.render("./definitions",e))?"":n);break;case"store":t+=""+(null==(n=e.tM.render("./store",e))?"":n)}return t+='\n    </div>\n    \n    <ul class="navigation">\n        <li class="item '+(null==(n="lists"==e.section?"selected ":"")?"":n)+'" component="set" prop="it.section" value="lists">'+(null==(n=e.t("lists"))?"":n)+'</li>\n        <li class="item '+(null==(n="forms"==e.section?"selected ":"")?"":n)+'" component="set" prop="it.section" value="forms">'+(null==(n=e.t("forms"))?"":n)+'</li>\n        <li class="item '+(null==(n="definitions"==e.section?"selected ":"")?"":n)+'" component="set" prop="it.section" value="definitions">'+(null==(n=e.t("definitions"))?"":n)+'</li>\n        <li class="item '+(null==(n="store"==e.section?"selected ":"")?"":n)+'" component="set" prop="it.section" value="store">'+(null==(n=e.t("load"))?"":n)+" / "+(null==(n=e.t("save"))?"":n)+"</li>\n    </ul>\n</div>\n"}},store:{template:function(e){var n,t="";Array.prototype.join;return t+='<div class="storePage">\n    <div component="loadFile">'+(null==(n=e.t("load"))?"":n)+'</div>\n    <a href="data:test/json;base64,'+(null==(n=btoa(JSON.stringify(e.data)))?"":n)+'" download="'+(null==(n=e.sections.store.saveName)?"":_.escape(n))+'">'+(null==(n=e.t("save"))?"":n)+"</a>\n    <p><label>"+(null==(n=e.t("name"))?"":n)+':</label><input component="dataBind" prop="it.sections.store.saveName" value="'+(null==(n=e.sections.store.saveName)?"":_.escape(n))+'" /></p>\n</div>'}}};

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
module.exports = function (css, customDocument) {
  var doc = customDocument || document;
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css;
    return sheet.ownerNode;
  } else {
    var head = doc.getElementsByTagName('head')[0],
        style = doc.createElement('style');

    style.type = 'text/css';

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(doc.createTextNode(css));
    }

    head.appendChild(style);
    return style;
  }
};

module.exports.byUrl = function(url) {
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode;
  } else {
    var head = document.getElementsByTagName('head')[0],
        link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;

    head.appendChild(link);
    return link;
  }
};

},{}],8:[function(require,module,exports){
module.exports = require('cssify');

},{"cssify":7}],9:[function(require,module,exports){
/**
 * @author Tobias Nickel
 * @description minimalistic dispatcher, that fulfill the full requirement of a FLUX dispatcher.
 * @license MIT
 */

 /**
  * gives an object the ability to handle emittions by defining 4 attributes
  * ._events, .on, .off and .trigger
  */
var tDispatcher = (function(){
  function tDispatcher(){
		this._events= {dispatched:[]};
		this.isDispatching = false;
		this._actions = [];
  }

	/**
	 *	method that you will want to write in the documentation of your class/object.
	 *  together with all the events you trigger by yourself
	 *@param event {string} name of the event
	 *@param callback {function} the function to be called when the event is triggered
	 */
	tDispatcher.prototype.on = function on(store, callback) {
		if(typeof store == 'string'){
			store={
				event:store,
				name:(Math.random()* 0xFFFFFFFFFFFFF).toString(16)+''+(Math.random()* 0xFFFFFFFFFFFFF).toString(16),
				callback: callback
			}
		}
        // a store has minimum the properties event, name and callback
        //store = {
        //  event: '',
        //  name: 'name that others can require'
		// 	require: [] list of other name-strings
        //  callback: the method do call with the action
        //}

		if (!(store.event in this._events)){
			this._events[store.event] = {};
    }
		this._events[store.event][store.name] = store;
    this.addAction(store.name);
	};

	/**
	 *	method to remove an eventlistener or even all.
	 *@param event {string} name of the event where the call back should be removed
	 *@param callback {function} that will be removed from the listener
	 */
	tDispatcher.prototype.off = function off(event,/*name or callback*/ name) {
		if (!event) {
			this._events = {};
			return;
		}
		if (!name) {
			delete this._events[event];
		} else {
			if(this._events[event]){
				if("function" == typeof name){
					var events = this._events[event];
					for(var i in events){
						if(events[i].callback === name){
							delete events[i];
						}
					}
				}else{
					delete this._events[event][name];
				}
			}
		}
	};

	/**
	 *  executing all listener that are registered on the event
	 *@param event {string} name of the event to be triggered
	 *@args args {mixed} anything that you want to be passed to the listeners callback
	 */
	tDispatcher.prototype.trigger = function trigger(action,/*optional*/value) {
		if(typeof action === 'string'){
			action = {event:action};
    }
		if(value !== undefined){
			action.value=value;
    }
		if (!action.event) return;
		this._actions.push(action);
		if(this.isDispatching) return;

    this.isDispatching = true;
		while(action = this._actions.shift()){
      if (!this._events[action.event]){
        continue;
      }
			var solvedRoundCount = 1;
			var todoEvents = {};
			var events = this._events[action.event];
			for(var i in events){
				todoEvents[i] = events[i];
      }

			var done = {};
			while(solvedRoundCount != 0){
				solvedRoundCount = 0;
				for(var i in todoEvents) {
					if(todoEvents[i].require){
						var found=false;
						for(var r = 0; r<todoEvents[i].require.length; r++){
							if(!done[todoEvents[i].require[r]]){
								found=true;
								break;
							}
						}
						if(found)continue;
					}

					done[i]=true;
					todoEvents[i].callback(action);
					delete todoEvents[i];
					solvedRoundCount++;
				}
			}
    }
    var events = this._events["dispatched"];
    for(var i in events){
      events[i].callback();
    }
    this.isDispatching = false;
	};

  /**
   * create a method on the dispatcher, that dispatches the Event of the given name
   * @param name {string} the name of the Action and the method.
   */
  tDispatcher.prototype.addAction = function(name){
    if(!this[name]){
      this[name]=function(value){
        this.trigger('name', value);
      };
    }
  };

  return tDispatcher
})();

if('object' === typeof module){ module.exports=tDispatcher; }
//test

},{}],10:[function(require,module,exports){
var TemplateManager = (function() {
  "use strict";

  /**
   * @class
   * helps to manage Templates
   *
   * @param enging {string} name if the template engine, "ejs", "underscore"
   */
  function TemplateManager(engine, defaults, basePath, fileExtension, nameOfTemplatemanager, baseName, templates) {
    if (engine instanceof TemplateManager) {
      var example = engine;
      engine = example.engine;
      defaults = example.defaults;
      basePath = example.basePath;
      fileExtension = example.fileExtension;
      nameOfTemplatemanager = example.nameOfTemplatemanager;
      baseName = example.baseName;
      templates = example.templates;
    }
    this.templates = templates ? templates : {};
    this.engine = engine.toLowerCase().trim();
    this.defaults = defaults ? defaults : {};
    this.basePath = basePath ? basePath : "/templates";
    this.fileExtension = fileExtension ? fileExtension : "html";
    this.nameOfTemplatemanager = nameOfTemplatemanager ? nameOfTemplatemanager : "templateManager";
    this.baseName = baseName ? baseName : "";

    this.findTemplates();
  }

  TemplateManager.prototype.render = function(name, data) {
    var options = {};
    options.that = options;
    extend(options, data);
    //preparing next templateManager for the template
    var nextTM = new TemplateManager(this);
    var lastSlash = name.lastIndexOf("/");
    if (lastSlash !== -1)
      nextTM.baseName += name.slice(0, lastSlash) + "/";
    options[this.nameOfTemplatemanager] = nextTM;

    if (name[0] === "/") {
      name = name.slice(1);
    } else {
      if (name[0] === "../") {
        name = name.slice(3);
      }
      name = this.baseName + name;
    }
    name = join(name);
    if (!this.templates[name]) {
      this.loadTemplateFile(name);
    }
    if (this.templates[name]) {
      if (this.templates[name].defaults) {
        extend(options, this.templates[name].defaults);
      }
      extend(options, this.defaults);
      return this.templates[name].template(options)
    } else {
      return "template " + name + " not found";
    }
  };
  TemplateManager.prototype.loadTemplateFile = function(name, defaults) {
    var templateText = '';
    if (TemplateManager.isNode) {
      templateText = fs.readFileSync(this.basePath + '/' + name + '' + this.fileExtension) + '';
    } else {
      var request = newRequest();
      request.open("GET", this.basePath + "/" + name + "." + this.fileExtension, false);
      try {
        request.send(null);
      } catch (e) {
        return null;
      }

      if (request.status == 404 || request.status == 2 || (request.status == 0 && request.responseText == '')) {
        throw (new Error("can't load the template " + name));
        return null;
      }

      templateText = request.responseText;
    }
    this.templates[name] = {
      template: this.compile(templateText)
    };
    if (defaults) {
      this.templates[name].defaults = defaults;
    }
  };
  TemplateManager.prototype.findTemplates = function() {
    if (!TemplateManager.isNode) {
      var templateTags = collectionToArray(
        document.getElementsByTagName("template")
      );
      templateTags = templateTags.concat(
        collectionToArray(
          document.querySelectorAll("script[type='text/template']")
        )
      );
      for (var i = 0; templateTag = templateTags[i]; i++) {
        var templateTag = templateTags[i];
        var templateText = templateTag.innerHTML.trim();
        var name = templateTag.id.trim();
        this.templates[name] = {
          template: this.compile(templateText)
        };
        templateTag.remove();
      }
    }
  };


  function collectionToArray(collection) {
    var l = collection.length,
      out = [],
      i = 0;
    for (i = 0; i < l; i += 1) {
      out.push(collection[i]);
    }
    return out;
  }
  
  var newRequest = function() {
    var factories = [

      function() {
        return new ActiveXObject("Msxml2.XMLHTTP");
      },
      function() {
        return new XMLHttpRequest();
      },
      function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      }];
    for (var i = 0; i < factories.length; i++) {
      try {
        var request = factories[i]();
        if (request != null) return request;
      } catch (e) {
        continue;
      }
    }
  }

  function extend(obj, withThis) {
    for (var i in withThis) {
      obj[i] = obj[i] !== undefined ? obj[i] : withThis[i];
    }
  }
  return TemplateManager;
}());
TemplateManager.getCompiler = function(engine) {
  switch (engine.toLowerCase().trim()) {
    case "ejs":
      var EJS = EJS//TemplateManager.isNode ? require('EJS') : EJS;
      this.compile = compileEJS;
      break;

    case "underscore":
      this.compile = compileUnderscore;
      break;
    case "mustache":
      this.compile = compileMustache;
      break;
    case "jade":
      this.compile = compileJade;
      break;
    case "dot":
      this.compile = compileDoT;
      break;
    default:
      throw "no valid templateEngine defined";
  }

  /**
   * the compile method needs to take vthe text of the template and returns the rendering Method for a template.
   *
   * the rendering method. takes data to display and returns a the result.
   */
  function compileEJS(templateText) {
    var template = new EJS({
      text: templateText
    });
    return function renderEjsTemplate(data) {
      return template.render(data);
    };
  }
  function compileJade(templateText) {
    var template = jade.compile(templateText);
  //::test if the short version is working
  // var template = new jade.compile(templateText);
  // return function renderJadeTemplate(data) {
  //     return template(data);
  // };
  }
  function compileDoT(templateText) {
    return doT.compile(templateText);
  //::test if the short version is working
  // var template = new doT.compile( templateText );
  // return function renderDoTTemplate(data) {
  //     return template(data);
  // };
  }
  // underscore returnes a template, that is directlz usable
  function compileUnderscore(templateText) {
    return _.template(templateText);
  }
  // mustache has its own templateCache
  function compileMustache(templateText) {
    return function(data) {
      return Mustache.render(templateText, data);
    };
  }
/**
 * end compile Methods
 */
}

if ('object' === typeof module) {
  var fs = require('fs');
  module.exports = TemplateManager;
  TemplateManager.isNode = true;
}

/**
 * path join Method, imported from https://gist.github.com/creationix/7435851
 */
// Joins path segments.  Preserves initial "/" and resolves ".." and "."
// Does not support using ".." to go above/outside the root.
// This means that join("foo", "../../bar") will not resolve to "../bar"
function join(/* path segments */) {
  // Split the inputs into a list of path commands.
  var parts = [];
  for (var i = 0, l = arguments.length; i < l; i++) {
    parts = parts.concat(arguments[i].split("/"));
  }
  // Interpret the path commands to get the new resolved path.
  var newParts = [];
  for (i = 0, l = parts.length; i < l; i++) {
    var part = parts[i];
    // Remove leading and trailing slashes
    // Also remove "." segments
    if (!part || part === ".") continue;
    // Interpret ".." to pop the last segment
    if (part === "..") newParts.pop();
    // Push new path segments.
    else newParts.push(part);
  }
  // Preserve the initial slash if there was one.
  if (parts[0] === "") newParts.unshift("");
  // Turn back into a single string path.
  return newParts.join("/") || (newParts.length ? "/" : ".");
}

// A simple function to get the dirname of a path
// Trailing slashes are ignored. Leading slash is preserved.
function dirname(path) {
  return join(path, "..");
}

},{"fs":6}],11:[function(require,module,exports){
// loading tXML, an xmlParser by Tobias Nickel(https://github.com/TobiasNickel/tXml)
function tXml(b){function k(){for(var f=[];b[a];){
    if(60==b.charCodeAt(a)){if(47===b.charCodeAt(a+1)){a=b.indexOf(">",a);break
    }else if(33===b.charCodeAt(a+1)){if(45==b.charCodeAt(a+2)){
        for(;62!==b.charCodeAt(a)||45!=b.charCodeAt(a-1)||45!=b.charCodeAt(a-2)||-1==a;)a=b.indexOf(">",a+1);-1===a&&(a=b.length)
        }else for(a+=2;62!==b.charCodeAt(a);)a++;a++;continue}var d={};a++;d.tagName=c();
        for(var g=!1;62!==b.charCodeAt(a);){var e=b.charCodeAt(a);if(64<e&&91>e||96<e&&123>e){
            for(var l=c(),e=b.charCodeAt(a);39!==
e&&34!==e;)a++,e=b.charCodeAt(a);var e=b[a],m=++a;a=b.indexOf(e,m);e=b.slice(m,a);g||(d.attributes={},g=!0);
d.attributes[l.toLowerCase()]=e}a++}47!==b.charCodeAt(a-1)&&("script"==d.tagName?(g=a,a=b.indexOf("\x3c/script>",a),d.children=[b.slice(g,a-1)],a+=8):"style"==d.tagName?(g=a,a=b.indexOf("</style>",a),d.children=[b.slice(g,a-1)],a+=7):-1==h.indexOf(d.tagName)&&(a++,d.children=k(l)));f.push(d)}else d=a,a=b.indexOf("<",a)-1,-2===a&&(a=b.length),d=b.slice(d,a+1),0<d.trim().length&&f.push(d);a++}return f}
function c(){for(var c=a;-1===g.indexOf(b[a]);)a++;return b.slice(c,a)}
var g="\n\t>/= ",h=["img","br","input"],a=0;return k()}
function TOMObjToXML(b){function k(b){if(b)for(var h=0;h<b.length;h++)
if("string"==typeof b[h])c+=b[h].trim();else{var a=b[h];c+="<"+a.tagName;var f=void 0;for(f in a.attributes)c=-1===a.attributes[f].indexOf('"')?c+(" "+f+'="'+a.attributes[f].trim()+'"'):c+(" "+f+"='"+a.attributes[f].trim()+"'");c+=">";k(a.children);c+="</"+a.tagName+">"}}var c="";Array.isArray(b)||(b=[b]);k(b);return c};


/**
 *@author: Tobias Nickel
 *  Inspired by the awesome reactJS, I'd like to provide an alternative,
 *  that allowes you to use techniques, that you already use.
 *
 *  So, it is a module, that render your HTML to the dom and only updates the nessasary elements.
 *  it is so effective, that you can rerender your entire web-app each time, when data changes.
 *  your eventlistener keep available and you can even use css transition between one and a new rendering.
 */
var TreeAct = (function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(cb) {
      setTimeout(cb, 0);
    };

    function TreeAct(root) {
      this.root = root;
      root.innerHTML = '';
      this.struct = '';
      this.struct.ids = {};
      this.components = {};
    }



    var creator = document.createElement('div'); // used by getNode()
    /**
     *creates the DOM node of a tXml-node
     */
    function getNode(xml) {
        creator.innerHTML = TOMObjToXML(xml);
        return creator.firstChild;
    }

    function createRootNode(txmlNode){
        if(Array.isArray(txmlNode)){
          return getNode(txmlNode);
        }
        var root = document.createElement(txmlNode.tagName);
        var attr = txmlNode.attributes;
        if(attr){
          for(var i in attr){
            root.setAttribute(i, attr[i]);
          }
        }
        return root;
    }

    /**
     * try to find the element with a given id in the attribute
     * @param list {Array} the list to search in, often a tXML child-List
     * @param id {string} the id of the searched element
     */
    function indexOfId(list, id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].attributes && list[i].attributes.id == id) {
                return i;
            }
        }
        return -1;
    }


    /**
     * the core method of this framework. it is responsible for the reconsilation.
     *
     * this is a recursive method, that goes recursive trough the tree-structure of a Document.
     * there are no tests, stop on circular structures, objects parsed by tXml are never circular as XML is.
     *
     * @param xml {tXml} tXml document, representing the new tree.
     * @param oldXml {tXml} the old tXml-Document, the tree as is is currently displayed.
     * @param root {DOM-node} the DOM-node, that is displaying the html.
     */
    function updateChildren(xml, orgXml, root, tReeAct) {
        if (!xml) {
            root.innerHTML = '';
            return;
        }

        orgXml = orgXml || [];
        orgXml.ids = orgXml.ids || {};

        //make sure, the nodes and objects are connected
        if (orgXml[0] ) {//&& !orgXml[0].node
            var children = root.childNodes;
            for (var i = 0; i < orgXml.length; i++) {
                if (typeof orgXml[i] == "string") orgXml[i] = [orgXml[i]];
                orgXml[i].label = getNodeLabel(orgXml[i]);
                orgXml[i].node = children[i];
                if (orgXml[i].attributes && orgXml[i].attributes.id)
                    orgXml.ids[orgXml[i].attributes.id] = orgXml[i]
            }
        }

        var ids = {}; // id : xmlMapping (xml has node attribute): has indexAttribute, for the index in orgXml
        // used to reuse the elements that have an ID.
        for (var i = 0; i < xml.length; i++) {
            if (typeof xml[i] == 'string') xml[i] = [xml[i]];
            var cXml = xml[i];
            cXml.label = getNodeLabel(cXml);
            cXml.index = i;
            if (!orgXml[i]) {
                // nothing to compare with: create
                cXml.node = createRootNode(cXml);
                insertAt(root, cXml.node, i);

                if(cXml.attributes && cXml.attributes.component) {
                  cXml.component = tReeAct.components[cXml.attributes.component](cXml.node, tReeAct);
                }
                updateChildren(cXml.children, '', cXml.node, tReeAct);
                if(cXml.component && cXml.component.didRender) cXml.component.didRender(cXml.node, tReeAct);
                if (cXml.attributes && cXml.attributes.id) ids[cXml.attributes.id] = cXml;
            } else if (cXml.attributes && cXml.attributes.id) {
                // try to reuse & compare childs
                //  elements that has an id
                var id = cXml.attributes.id;
                ids[cXml.attributes.id] = cXml;
                // check for existence
                if (orgXml.ids[id]) {
                    // ensure position & compare childs
                    if (id !== orgXml.ids[id].index)
                        moveElement(orgXml, orgXml.ids[id].index, id);
                    updateNode(cXml, orgXml.ids[id]);
                    updateChildren(cXml.children, orgXml.ids[id].children, orgXml.ids[id].node, tReeAct);
                } else {
                    //exchange complete
                    var node = getNode(cXml);
                    xml.node = node;
                    root.insertBefore(node, orgXml[i].node);
                    orgXml[i].node.remove();
                }
            } else if (cXml.label == orgXml[i].label) {
                //compare childs
                updateNode(cXml, orgXml[i]);
                updateChildren(cXml.children, orgXml[i].children, orgXml[i].node, tReeAct);
            } else if (cXml[i] !== orgXml[i][0] || cXml.tagName !== orgXml[0].tagName || getComponent(cXml) !== getComponent(orgXml[0])) {
                //exchange complete
                cXml.node = createRootNode(cXml);;
                root.insertBefore(cXml.node, orgXml[i].node);
                orgXml[i].node.remove();
                
                if(cXml.attributes && cXml.attributes.component) {
                  cXml.component = tReeAct.components[cXml.attributes.component](cXml.node, tReeAct);
                }
                updateChildren(cXml.children, '', cXml.node, tReeAct);
                if(cXml.component && cXml.component.didRender) cXml.component.didRender(cXml.node, tReeAct);
                if (cXml.attributes && cXml.attributes.id) ids[cXml.attributes.id] = cXml;
            }else{
                //compare childs
                updateNode(cXml, orgXml[i]);
                updateChildren(cXml.children, orgXml[i].children, orgXml[i].node, tReeAct);
            }
        }
        for (; i < orgXml.length; i++) {
            orgXml[i].node.remove();
        }
        xml.ids = ids;
    }
    
    function getComponent(xmlNode){
        if(!xmlNode.attributes) return;
        return xmlNode.attributes.component
    }

    /**
     *updates the node, not its children
     * means tagname and attributes
     *@param xml {tXml}
     *@param org {tXml} the old and currently displayed node. the org is containing the belonging DOM node
     */
    function updateNode(xml, org) {
        if (xml.tagName !== org.tagName)
            org.node.tagName = xml.tagName;

        for (var i in xml.attributes) {
            if (org && org.attributes && org.attributes[i]) {
                if (xml.attributes[i] !== org.attributes[i])
                    org.node.setAttribute(i, xml.attributes[i]);
                delete org.attributes[i];
            }
        }
        for (var i in org.attributes) {
            org.node.removeAttribute(i);
        }
    }


    /**
     * returns a label of the given tXML-node
     * it is in the format of "tagname#id.class"
     * where only the fist class is used.
     * That let the app-developer toggle a class
     * without recreating the element.
     *
     *@param node {tXml}
     */
    function getNodeLabel(node) {
        if (!node.tagName) return 'string::'+node[0];
        if (!node.attributes) return node.tagName;
        var id = node.attributes.id ? "#" + node.attributes.id : "";
        var classname = node.attributes['class'] ? ":" + node.attributes['class'].split(" ")[0] : "";
        var componentName = node.attributes.component ? '('+node.attributes.component+')' : ''
        return node.tagName + id + classname + componentName;
    }

    /**
     *insert an element at the position i of root's children
     */
    function insertAt(root, element, i) {
        var child = root.childNodes[i];
        if (child) {
            root.insertBefore(element, child);
        } else {
            root.appendChild(element);
        }
    }
    /**
     *@param arr {array}
     *@param from {int}
     *@param to {int}
     */
    function moveElement(arr, from, to) {
        if (from == to) return;
        arr.splice(to, 0, arr.splice(from, 1)[0])
    }
    /**
     *@param xml {xml-string}
     *@param doneCB {function} method that will be called, after all elements are attached to the DOM
     */
    TreeAct.prototype.render = function(xml, doneCB) {
        if (typeof xml == 'string') xml = tXml(xml);
        var that = this;
        requestAnimationFrame = setTimeout;
        requestAnimationFrame(function() {
            updateChildren(xml, that.struct, that.root, that);
            that.struct = xml;
            if (doneCB) doneCB();
        });
    };

   TreeAct.prototype.addComponent = function(name, thePrototype) {
     this.components[name]=function(el,tReeAct){
       this.init(el, tReeAct);
     }
     this.components[name].prototype = thePrototype;
   };
    return TreeAct;
})();

if(typeof module == 'object') module.exports = TreeAct;

},{}],12:[function(require,module,exports){
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind,
    nativeCreate       = Object.create;

  // Naked function reference for surrogate-prototype-swapping.
  var Ctor = function(){};

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.8.3';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var optimizeCb = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  var cb = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
    if (_.isObject(value)) return _.matcher(value);
    return _.property(value);
  };
  _.iteratee = function(value, context) {
    return cb(value, context, Infinity);
  };

  // An internal function for creating assigner functions.
  var createAssigner = function(keysFunc, undefinedOnly) {
    return function(obj) {
      var length = arguments.length;
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };

  // An internal function for creating a new object that inherits from another.
  var baseCreate = function(prototype) {
    if (!_.isObject(prototype)) return {};
    if (nativeCreate) return nativeCreate(prototype);
    Ctor.prototype = prototype;
    var result = new Ctor;
    Ctor.prototype = null;
    return result;
  };

  var property = function(key) {
    return function(obj) {
      return obj == null ? void 0 : obj[key];
    };
  };

  // Helper for collection methods to determine whether a collection
  // should be iterated as an array or as an object
  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
  var getLength = property('length');
  var isArrayLike = function(collection) {
    var length = getLength(collection);
    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    iteratee = optimizeCb(iteratee, context);
    var i, length;
    if (isArrayLike(obj)) {
      for (i = 0, length = obj.length; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length);
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  // Create a reducing function iterating left or right.
  function createReduce(dir) {
    // Optimized iterator function as using arguments.length
    // in the main function will deoptimize the, see #1991.
    function iterator(obj, iteratee, memo, keys, index, length) {
      for (; index >= 0 && index < length; index += dir) {
        var currentKey = keys ? keys[index] : index;
        memo = iteratee(memo, obj[currentKey], currentKey, obj);
      }
      return memo;
    }

    return function(obj, iteratee, memo, context) {
      iteratee = optimizeCb(iteratee, context, 4);
      var keys = !isArrayLike(obj) && _.keys(obj),
          length = (keys || obj).length,
          index = dir > 0 ? 0 : length - 1;
      // Determine the initial value if none is provided.
      if (arguments.length < 3) {
        memo = obj[keys ? keys[index] : index];
        index += dir;
      }
      return iterator(obj, iteratee, memo, keys, index, length);
    };
  }

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = createReduce(1);

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = createReduce(-1);

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var key;
    if (isArrayLike(obj)) {
      key = _.findIndex(obj, predicate, context);
    } else {
      key = _.findKey(obj, predicate, context);
    }
    if (key !== void 0 && key !== -1) return obj[key];
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given item (using `===`).
  // Aliased as `includes` and `include`.
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj);
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      var func = isFunc ? method : value[method];
      return func == null ? func : func.apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matcher(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matcher(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = isArrayLike(obj) ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = isArrayLike(obj) ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (!isArrayLike(obj)) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = cb(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (isArrayLike(obj)) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    return _.initial(array, array.length - n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return _.rest(array, Math.max(0, array.length - n));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, startIndex) {
    var output = [], idx = 0;
    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
      var value = input[i];
      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
        //flatten current level of array or arguments object
        if (!shallow) value = flatten(value, shallow, strict);
        var j = 0, len = value.length;
        output.length += len;
        while (j < len) {
          output[idx++] = value[j++];
        }
      } else if (!strict) {
        output[idx++] = value;
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = cb(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = getLength(array); i < length; i++) {
      var value = array[i],
          computed = iteratee ? iteratee(value, i, array) : value;
      if (isSorted) {
        if (!i || seen !== computed) result.push(value);
        seen = computed;
      } else if (iteratee) {
        if (!_.contains(seen, computed)) {
          seen.push(computed);
          result.push(value);
        }
      } else if (!_.contains(result, value)) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = getLength(array); i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(arguments, true, true, 1);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    return _.unzip(arguments);
  };

  // Complement of _.zip. Unzip accepts an array of arrays and groups
  // each array's elements on shared indices
  _.unzip = function(array) {
    var length = array && _.max(array, getLength).length || 0;
    var result = Array(length);

    for (var index = 0; index < length; index++) {
      result[index] = _.pluck(array, index);
    }
    return result;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    var result = {};
    for (var i = 0, length = getLength(list); i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Generator function to create the findIndex and findLastIndex functions
  function createPredicateIndexFinder(dir) {
    return function(array, predicate, context) {
      predicate = cb(predicate, context);
      var length = getLength(array);
      var index = dir > 0 ? 0 : length - 1;
      for (; index >= 0 && index < length; index += dir) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    };
  }

  // Returns the first index on an array-like that passes a predicate test
  _.findIndex = createPredicateIndexFinder(1);
  _.findLastIndex = createPredicateIndexFinder(-1);

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = cb(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = getLength(array);
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Generator function to create the indexOf and lastIndexOf functions
  function createIndexFinder(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
        } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) {
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1;
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  }

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (stop == null) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Determines whether to execute a function as a constructor
  // or a normal function with the provided arguments
  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
    var self = baseCreate(sourceFunc.prototype);
    var result = sourceFunc.apply(self, args);
    if (_.isObject(result)) return result;
    return self;
  };

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    var args = slice.call(arguments, 2);
    var bound = function() {
      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    var bound = function() {
      var position = 0, length = boundArgs.length;
      var args = Array(length);
      for (var i = 0; i < length; i++) {
        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return executeBound(func, bound, this, this, args);
    };
    return bound;
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = _.partial(_.delay, _, 1);

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed on and after the Nth call.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed up to (but not including) the Nth call.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      }
      if (times <= 1) func = null;
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

  function collectNonEnumProps(obj, keys) {
    var nonEnumIdx = nonEnumerableProps.length;
    var constructor = obj.constructor;
    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

    // Constructor is a special case.
    var prop = 'constructor';
    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

    while (nonEnumIdx--) {
      prop = nonEnumerableProps[nonEnumIdx];
      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
        keys.push(prop);
      }
    }
  }

  // Retrieve the names of an object's own properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve all the property names of an object.
  _.allKeys = function(obj) {
    if (!_.isObject(obj)) return [];
    var keys = [];
    for (var key in obj) keys.push(key);
    // Ahem, IE < 9.
    if (hasEnumBug) collectNonEnumProps(obj, keys);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Returns the results of applying the iteratee to each element of the object
  // In contrast to _.map it returns an object
  _.mapObject = function(obj, iteratee, context) {
    iteratee = cb(iteratee, context);
    var keys =  _.keys(obj),
          length = keys.length,
          results = {},
          currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = createAssigner(_.allKeys);

  // Assigns a given object with all the own properties in the passed-in object(s)
  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
  _.extendOwn = _.assign = createAssigner(_.keys);

  // Returns the first key on an object that passes a predicate test
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(object, oiteratee, context) {
    var result = {}, obj = object, iteratee, keys;
    if (obj == null) return result;
    if (_.isFunction(oiteratee)) {
      keys = _.allKeys(obj);
      iteratee = optimizeCb(oiteratee, context);
    } else {
      keys = flatten(arguments, false, false, 1);
      iteratee = function(value, key, obj) { return key in obj; };
      obj = Object(obj);
    }
    for (var i = 0, length = keys.length; i < length; i++) {
      var key = keys[i];
      var value = obj[key];
      if (iteratee(value, key, obj)) result[key] = value;
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(flatten(arguments, false, false, 1), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = createAssigner(_.allKeys, true);

  // Creates an object that inherits from the given prototype object.
  // If additional properties are provided then they will be added to the
  // created object.
  _.create = function(prototype, props) {
    var result = baseCreate(prototype);
    if (props) _.extendOwn(result, props);
    return result;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Returns whether an object has a given set of `key:value` pairs.
  _.isMatch = function(object, attrs) {
    var keys = _.keys(attrs), length = keys.length;
    if (object == null) return !length;
    var obj = Object(object);
    for (var i = 0; i < length; i++) {
      var key = keys[i];
      if (attrs[key] !== obj[key] || !(key in obj)) return false;
    }
    return true;
  };


  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }

    var areArrays = className === '[object Array]';
    if (!areArrays) {
      if (typeof a != 'object' || typeof b != 'object') return false;

      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
                               _.isFunction(bCtor) && bCtor instanceof bCtor)
                          && ('constructor' in a && 'constructor' in b)) {
        return false;
      }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }

    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);

    // Recursively compare objects and arrays.
    if (areArrays) {
      // Compare array lengths to determine if a deep comparison is necessary.
      length = a.length;
      if (length !== b.length) return false;
      // Deep compare the contents, ignoring non-numeric properties.
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack)) return false;
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      length = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      if (_.keys(b).length !== length) return false;
      while (length--) {
        // Deep compare each member
        key = keys[length];
        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
    return _.keys(obj).length === 0;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE < 9), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
  // IE 11 (#1621), and in Safari 8 (#1929).
  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  // Predicate-generating functions. Often useful outside of Underscore.
  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = property;

  // Generates a function for a given object that returns a given property.
  _.propertyOf = function(obj) {
    return obj == null ? function(){} : function(key) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of
  // `key:value` pairs.
  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs);
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = optimizeCb(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property, fallback) {
    var value = object == null ? void 0 : object[property];
    if (value === void 0) {
      value = fallback;
    }
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // Provide unwrapping proxy for some methods used in engine operations
  // such as arithmetic and JSON stringification.
  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

  _.prototype.toString = function() {
    return '' + this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

},{}]},{},[3]);
