
document.body.dicWin = undefined;
document.body.dicWinTop = "50";
document.body.dicWinLeft = "10";
document.body.dicWinW = "700";
document.body.dicWinH = "800";


var dicUrls = { "naver":"https://en.dict.naver.com/#/search?query={}&range=all",
	"daum":"http://dic.daum.net/search.do?q={}",	  
	"wordic":"https://www.wordnik.com/words/{}",
	"oxford":"https://www.oxfordlearnersdictionaries.com/definition/english/{}",
	"longman":"https://www.ldoceonline.com/ko/dictionary/{}",
	"cambridge":"https://dictionary.cambridge.org/ko/사전/영어-한국어/{}"
	};

function goDic(word){
	let body = document.body;
	let dicsel = document.getElementById("dictionary"); 
	let url = dicsel.options[dicsel.selectedIndex].value;
	if (url && word) {			
		if(body.dicWin==undefined || body.dicWin.closed) {
			let opts = "width={},height={}, top={},left={}".format(body.dicWinW, body.dicWinH, body.dicWinTop, body.dicWinLeft);			
			body.dicWin = window.open(url.format(word), "dicWin", opts);		
		}
		else { body.dicWin.location.href = url.format(word); };
	};	
};

function openDic(e){
	e.preventDefault();
    let targ;
    if (!e)  { let e = window.e; };
    if (e.target) { targ = e.target; }
	else if (e.srcElement) targ = e.srcElement;
	else { alert("targ is not defined"); return; };
	if (targ.tagName!="A") { return; };    
    if (targ.nodeType == 3)  /* defeat Safari bug */
        targ = targ.parentNode;
	let seledWord = document.getElementById("seledWord");
	if (seledWord) { seledWord.removeAttribute("id"); };
	targ.setAttribute("id",  "seledWord");
	goDic(targ.textContent);

};

function dicaHtml(p){
	let sp = p.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
	let html = "";
	for (let s of sp) { html += "<a>" + s + " </a>"; };
	return html;
};

function el2diclickable(el, tag){
	if (tag) {
		let els = el.getElementsByTagName(tag);
		if (els.length>0) { return false; };
	};	
	try{ el.classList.add("diclick"); el.onclick = openDic; }
	catch(e) { return false; };
	
	return true;
};

/**************************************************************************/

String.prototype.format = function() {
  let args = arguments;
  this.unkeyed_index = 0;
  return this.replace(/\{(\w*)\}/g, function(match, key) {
    if (key === "") {
      key = this.unkeyed_index;
      this.unkeyed_index++;
    };
    if (key == +key) {
      return args[key] !== "undefined"
      ? args[key]
      : match;
    } else {
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] === "object" && typeof args[i][key] !== "undefined") {
          return args[i][key];
        };
      };
      return match;
    };
  }.bind(this));
};



/* ************************************************************** */


function insertCss(code) {
	const css = document.createElement("style");
	css.textContent = code;
	document.head.appendChild(css);
};


function xreq(url, onOk, arg, method="GET") {
	let req = new XMLHttpRequest();
	req.open(method, url, true);
	req.onreadystatechange = function () {
		if (req.readyState === XMLHttpRequest.DONE) {
			if (req.status == 200) { onOk(req, arg); } 
			else { console.log("[" + req.status + "]: " + req.statusText); };
		};		
	};
	req.send();
};



function testclick(elem){
	document.querySelector("#testdiv").innerHTML = elem.textContent;
	loadJs("file:///D:/pydev/onbiz/afil/test.js", "catejs");
};



function loadJs(src, id){
	let script = document.createElement("script");
	let head = document.getElementsByTagName("head")[0];
	if (id) { 
		old = document.getElementById(id);
		if (old && head.contains(old)) { head.removeChild(old); };
		script.setAttribute("id", id); 
	};
	script.setAttribute("src", src);
	script.setAttribute("type", "text/javascript");
	head.appendChild(script);
}



/* ************************************************************** */

function qsel(selector){ return document.querySelector(selector); };
function qsal(selector){ return document.querySelectorAll(selector); };

function j2o(json) { return JSON.parse(json); };
function o2j(o) { return JSON.stringify(o); };

function elclear(el) { while(el.firstChild) { el.removeChild(el.firstChild); } }; 	

function gentext(text) { return document.createTextNode(text); };

function addev(evname, on) { document.addEventListener(name, on); };

function appendel(el, children){ for(const k of children) { el.appendChild(k); }; };




function attr2el(el, k, v) { el.setAttribute(k, v); };

function genel(tag, options, children) { return gentel(tag, null, options, children); }; 
	
function gentel(tag, text, options, children) { 
	let el = document.createElement(tag);
	if(text) { el.appendChild(document.createTextNode(text)); };
	if(options){ for(const k in options) { if (options[k]){ el.setAttribute(k, options[k]); }; };  };
	if(children){ for(const k of children) { if(k) el.appendChild(k);  };	};
	return el;
};
	
function gendickel(tag, html, options) { 
	let el = document.createElement(tag);
	el.innerHTML = html; 
	if(options){ for(const k in options) { if (options[k]){ el.setAttribute(k, options[k]); }; };  };
	el.classList.add("diclick"); el.onclick = openDic;		
	return el;
};	

function gentml(tag, html, options) { 
	let el = document.createElement(tag);
	el.innerHTML = html;
	if(options){ for(const k in options) { if (options[k]){ el.setAttribute(k, options[k]); }; };  };
	return el;
};

function aimg(href, src, alt) {
	let attrd = {"src":src};
	if(alt){attrd["alt"] = alt;};
	return genel("a", {"href":href, "target":"_blank"}, [genel("img", attrd)]);
};

function lia(text, opts1, opts2){
	return genel("li", opts1, [gentel("a", text, opts2)]);
};
function lii(cls1, cls2, text){	
	return genel("li", {"class":cls1}, [gentel("i", text, {"class":cls2})]);
};



/* ************************************************************** */

var _amatag = "";    /* "&tag=mytag" */ 
var _lang = "en_US";

var _rawUrl = "https://goodssen.github.io/suuro/"; 

var _cates = ["beauty & care", "fasion", "office", "home", "kids", "kitchen", "lesure & sports"];
var _catenavalsd = {}; 

function rawUrl(fname, pref="cate_", ext=".js"){ return [_rawUrl, pref, fname, ext].join(""); };

function curCate(){ return document.querySelector("#cates>li[class='active']"); };
function curSubcate(){ return document.querySelector("#subcates>li[class='active']"); };
function elSubcates(){ return document.getElementById("subcates"); };


function navlia(name, onclick) {

	let nav = document.createElement("li"); 
	nav.innerHTML = ["<a data-toggle=\"tab\" href=\"\" onclick=\"", onclick, " return false;\">", name, "</a>"].join("");
	return nav;
}; 

function newSubcate(name) { return navlia(name, "subcateClick(this);"); };



function asinUrl(asin){
	return ["https://www.amazon.com/gp/product/", asin, "/?language=", _lang, _amatag].join("");
};

function selopts(attrd, optd){
	let sel = genel("select", attrd);
	let opt = null;
	for(const k in optd){ 
		opt = document.createElement("option");
		opt.text = k;
		v = optd[k];
		if(v){ opt.value = v; };
		sel.appendChild(opt); 
	};
	return sel;
};

function ini(){
	let cates = document.querySelector("#cates");
	let curcate = null;
	for(k of _cates){ 
		let c = navlia(k, "cateClick(this);");
		cates.appendChild(c); 
		if(!curcate) curcate = c;
	};
	cates.appendChild(navlia(" ", ""));
	
	let seli = document.createElement("li");
	seli.appendChild(selopts({"id":"dictionary"}, dicUrls));
	cates.appendChild(seli);
	curcate.className = "active";
	inicate(curcate);
};

function __inicate(cate){
	d = _catenavalsd[cate.textContent];
	if(d){ iniSubcate(cate.textContent, d); }
	else { xreq(rawUrl(cate.textContent), cate4req, cate); };		
}

function inicate(cate){
	let title = cate.textContent;
	let d = _catenavalsd[title];
	if(d){ iniSubcate(title, d); }
	else { loadJs(rawUrl(cate.textContent, "cate_", ".js"), "catejs"); };
};



function cateClick(cate){ 
	if(curCate()==cate.textContent) { return; };
	inicate(cate);
};


function subcateClick(sub){
	if(curSubcate()==sub.textContent) { return; };		
	sectals(_catenavalsd[curCate().textContent][sub.textContent]);
};

function iniSubcate(title, navalsd){
	document.getElementById("sectitle").textContent = title;
	let ul = document.getElementById("subcates");
	ul.innerHTML = "";
	for(k in navalsd){ ul.appendChild(newSubcate(k)); };
	let fc = ul.firstChild;
	fc.setAttribute("class", "active");
	let naval = navalsd[fc.textContent];
	sectals(naval);
};

	
function catej4iniNavals(cate, j){
	/*let d = JSON.parse(j); */
	
	_catenavalsd[cate] = j;
	iniSubcate(cate, j);
};

function sectals(al){
	let secta = document.getElementById("sectals"); secta.innerHTML = "";
	let o = undefined;
	for(const l of al) { 
		o = l2o(l);
		secta.appendChild(articlel(o)); 
	};
};

function articlel(o) {	/* setAttribute, getAttribute, hasAttribute  */
	let article = genel("article", {"class":"article row-article"});	
	let feature = "";
	for(ft of o.feature) { feature += "<div>" + ft + "</div>"; };
	article.appendChild(genel("div", {"class":"article-img"}, [aimg(o.href, o.img)]));	
	/*el.classList.add("diclick"); el.onclick = openDic; */
	  let body = genel("div", {"class":"article-body"});
		let info = genel("ul", {"class":"article-info"},[lia("Amazon", {"class":"article-category"}, {"href":o.href, "target":"_blank"}), lii("article-type", "fa fa-amazon")]);
		let title = genel("h3", {"class":"article-title"}, [gendickel("div", o.title, {"href":o.href})]);	
		let meta = genel("ul", {"class":"article-meta"}, 
						[genel("li", {"class":"fa fa-clock-o"}, [gendickel("i", o.avail)]),
						lii("", "fa fa-comments", o.price ), gendickel("div", o.feature), gendickel("p", o.desc)]);			
	  appendel(body, [info, title, meta]);
	article.appendChild(body);
	return article;	
};




function cate4req(req, cate){ j2d4cate(req.responseText, cate.textContent); };




/* ************************************************************** */


function l2o(l) {
	/* let keys = ["sin", "title", "desc", "feature", "reviews", "avail", "price", "img"];	*/
	let o = Object();
	o.feature = "";
	for(const ft of l[3]) { o.feature += dicaHtml(ft) + "</br>"; };
	o.href = asinUrl(l[0]); o.title = dicaHtml(l[1]); o.desc = dicaHtml(l[2]);
	o.reviews = dicaHtml(l[4]); o.avail = dicaHtml(l[5]); o.price = l[6]; o.img = l[7];
	return o;
};	
	

ini();







