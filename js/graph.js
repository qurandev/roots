var labelType, useGradients, nativeTextSupport, animate;
(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};

var st;
function init(){
	var json = {"id":"rootrHm","name":"rHm","data":{},"children":[{"id":"57rootr~aHoma`n","name":"r~aHoma`n","data":{},"children":[]},{"id":"116rootr~aHiym","name":"r~aHiym","data":{},"children":[]},{"id":"114rootraHomap","name":"raHomap","data":{},"children":[]},{"id":"12root>aroHaAm","name":">aroHaAm","data":{},"children":[]},{"id":"28rootr~aHima","name":"r~aHima","data":{},"children":[]},{"id":"4root>aroHam","name":">aroHam","data":{},"children":[]},{"id":"6rootr~a`Himiyn","name":"r~a`Himiyn","data":{},"children":[]},{"id":"1rootruHom","name":"ruHom","data":{},"children":[]},{"id":"1rootmaroHamap","name":"maroHamap","data":{},"children":[]}]};
	
	json = {"id":"rootsmw","name":"smw","data":{},"children":[{"id":"39root{som","name":"{som","data":{},"children":[]},{"id":"310rootsamaA^'","name":"samaA^'","data":{},"children":[]},{"id":"21rootm~usam~FY","name":"m~usam~FY","data":{},"children":[]},{"id":"8rootsam~aY`","name":"sam~aY`","data":{},"children":[]},{"id":"2rootsamiy~","name":"samiy~","data":{},"children":[]},{"id":"1roottasomiyap","name":"tasomiyap","data":{},"children":[]}]};
	
	
	var graph = { "id": "root", "name": "root", data: {}, children: [] }
	
	
	//var json = _ROOTS_MAPS_ARRAY[8];

	
	_MAP_RAW_JSON_TO_GRAPH = function(_ROOTS_){
		var graph = { "id": "root", "name": "root", data: {}, children: [] };
		var _MAP_ = graph, firstLetter, lettersMap = {}, lettersArray, lettersString, letterIndex;
		$.each(Object.keys(_ROOTS_), function(index, root){
			firstLetter = root.split('')[0];
			lettersMap[ firstLetter ] ? ++lettersMap[ firstLetter ] : (lettersMap[ firstLetter ] = 1);
		});
		lettersArray = Object.keys( lettersMap ); 
		lettersString = lettersArray.join('');
		$.each(lettersArray, function(indx, ltr){ if(!ltr || ltr.length != 1) debugger;
			if(!_MAP_.children[indx] ) //have to insert a child first
				_MAP_.children[indx] = { "id": indx, "name": ltr, data: {}, children: [] };
		});
		
		$.each(Object.keys(_ROOTS_), function(index, root){
			if(!root || root == 'name') debugger;
			//1) Lets first branch out by first letter...
			firstLetter = root.split('')[0];
			letterIndex = lettersString.indexOf(firstLetter);
			if(letterIndex <0) debugger; //shuldnt happen
			if(!_MAP_.children[letterIndex] ) debugger; //have to insert a child first. shouldnt happen
			
			//2) Now add branch for the root
			var rootIndex = -1;
			rootIndex = -1 + _MAP_.children[letterIndex].children.push( { "id": root, "name": root, data: {"n": _ROOTS_[root].n, "f": _ROOTS_[root].f}, children: [] } );
			
			//3) Now add children of the root
			var rootChildren = _ROOTS_[ root ].d;
			if(rootChildren)
				$.each( Object.keys(rootChildren), function(childno, child){
					_MAP_.children[letterIndex].children[ rootIndex ].children.push( { "id": child, "name": child, data: {"n": rootChildren[child]}, children: [] } );
				});
		});
		return _MAP_;
	}

    //init Spacetree
    //Create a new ST instance
    /*var -- stuff into Global*/ st = new $jit.ST({
        //id of viz container element
        injectInto: 'infovis',
		orientation: 'top',
        //set duration for the animation
        duration: 300, //800
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 50,
        //enable panning
        Navigation: { //r-right direction
          enable:true,
          panning:true
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            height: 50, //20,
            width: 80, //60,
            type: 'rectangle',
            color: '#aaa',
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            overridable: true
        },
        
        onBeforeCompute: function(node){
            Log.write("loading " + node.name);
        },
        
        onAfterCompute: function(){
            Log.write("done");
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = '<span dir=rtl>' + EnToAr( node.name ) + '</span>';//node.name; يُخَالِفُ
			var url, ROOTURL = 'http://corpus.quran.com/qurandictionary.jsp?q=', 
					 LEMURL = 'http://corpus.quran.com/search.jsp?q=lem:';
			var data = node.data, datastr = JSON.stringify( data ), linklabel;
			linklabel = (data && data.n) ? (data.n + 'x') : 'link';
			if(node.name && node.name.length == 3){
				url = ROOTURL + (node.name);
				//label.innerHTML = '<span dir=rtl>' + EnToAr( node.name ).split('').join(' ') + '</span>';
				//window.open (url,"mywindow","menubar=1,resizable=1,width=750,height=450");
			}
			else if(node.name && node.name.length > 3){
				url = LEMURL + (node.name);
				//window.open (url,"mywindow","menubar=1,resizable=1,width=750,height=450");
			}
			if(url){
				label.innerHTML = "&nbsp;" + label.innerHTML + "&nbsp;<span dir=ltr style=font-size:0.5em;><A HREF='" + url + "' TARGET=_>(" + linklabel + ")" + "</A></span><!-" + datastr + "-->";
			}
            label.onclick = function(){
            	if(normal.checked) {
            	  st.onClick(node.id);
				  console.log(node.name); console.log(node); $('#debug').val( node.name ).change();
            	} else {
                st.setRoot(node.id, 'animate');
            	}
            };
            //set label styles
            var style = label.style;
            style.width = 60 + 'px';
            style.height = 48 + 'px'; //17 + 'px';            
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '2em'; //'0.8em';
            style.textAlign= 'center';
            style.paddingTop = '3px';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#ff7";
            }
            else {
                delete node.data.$color;
                //if the node belongs to the last plotted level
                if(!node.anySubnode("exist")) {
                    //count children number
                    var count = 0;
                    node.eachSubnode(function(n) { count++; });
                    //assign a node color based on
                    //how many children it has
                    node.data.$color = ['#aaa', '#baa', '#caa', '#daa', '#eaa', '#faa'][count];                    
                }
            }
        },
        
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                adj.data.$color = "#eed";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        }
    });
	_SpaceTree = st;

	var level0 = "AbtvjHxd*rzs$SDTZEgfqklmnhwy".split('');

	var level1 = {"A":["A$","A*","AH","AS","Ab","Ad","Af","Ah","Aj","Ak","Al","Am","An","Ar","As","At","Av","Aw","Ax","Ay","Az"],"b":["b$","b*","bA","bD","bE","bH","bS","bT","bd","bg","bh","bj","bk","bl","bn","bq","br","bs","bt","bv","bw","bx","by","bz"],"t":["tE","tH","tb","tf","tj","tl","tm","tq","tr","ts","tw","ty"],"v":["vE","vb","vj","vl","vm","vn","vq","vr","vw","vx","vy"],"j":["j*","jA","jE","jH","jb","jd","jf","jh","jl","jm","jn","jr","js","jv","jw","jy","jz"],"H":["H$","H*","HD","HS","HT","HZ","Hb","Hd","Hf","Hj","Hk","Hl","Hm","Hn","Hq","Hr","Hs","Ht","Hv","Hw","Hy","Hz"],"x":["x$","x*","xD","xS","xT","xb","xd","xf","xl","xm","xn","xr","xs","xt","xw","xy","xz"],"d":["dA","dE","dH","db","df","dh","dk","dl","dm","dn","dr","ds","dv","dw","dx","dy"],"*":["*A","*E","*b","*h","*k","*l","*m","*n","*q","*r","*w","*x","*y"],"r":["r$","r*","rA","rD","rE","rH","rS","rT","rb","rd","rf","rg","rh","rj","rk","rm","rq","rs","rt","rw","rx","ry","rz"],"z":["zE","zH","zb","zf","zh","zj","zk","zl","zm","zn","zq","zr","zw","zx","zy"],"s":["sA","sE","sH","sT","sb","sd","sf","sg","sh","sj","sk","sl","sm","sn","sq","sr","st","sw","sx","sy"],"$":["$A","$E","$H","$T","$b","$d","$f","$g","$h","$j","$k","$m","$n","$q","$r","$t","$w","$x","$y"],"S":["SE","SH","Sb","Sd","Sf","Sg","Sh","Sk","Sl","Sm","Sn","Sr","Sw","Sx","Sy"],"D":["DA","DE","DH","Db","Dd","Df","Dg","Dh","Dj","Dl","Dm","Dn","Dr","Dw","Dy"],"T":["TE","TH","Tb","Tf","Tg","Th","Tl","Tm","Tr","Tw","Ty"],"Z":["ZE","Zf","Zh","Zl","Zm","Zn"],"E":["E$","E*","ED","ES","ET","EZ","Eb","Ed","Ef","Eh","Ej","Ek","El","Em","En","Eq","Er","Es","Et","Ev","Ew","Ey","Ez"],"g":["g$","gD","gS","gT","gb","gd","gf","gl","gm","gn","gr","gs","gv","gw","gy","gz"],"f":["f$","fA","fD","fE","fH","fS","fT","fZ","fd","fh","fj","fk","fl","fn","fq","fr","fs","ft","fw","fx","fy","fz"],"q":["q$","q*","qD","qE","qH","qS","qT","qb","qd","qf","qh","ql","qm","qn","qr","qs","qt","qv","qw","qy"],"k":["k$","k*","kA","kE","kZ","kb","kd","kf","kh","kl","km","kn","kr","ks","kt","kv","kw","ky"],"l":["l*","lA","lE","lH","lT","lZ","lb","ld","lf","lg","lh","lj","lm","lq","ls","lw","ly","lz"],"m":["m$","mA","mD","mE","mH","mS","mT","md","mh","mj","mk","ml","mn","mq","mr","ms","mt","mv","mw","mx","my","mz"],"n":["n$","n*","nA","nD","nE","nH","nS","nT","nZ","nb","nd","nf","ng","nh","nj","nk","nm","nq","ns","nt","nv","nw","nx","ny","nz"],"h":["h","h$","hA","hD","hT","hb","hd","hj","hl","hm","hn","hr","hw","hy","hz"],"w":["w$","w*","wA","wD","wE","wH","wS","wT","wb","wd","wf","wh","wj","wk","wl","wn","wq","wr","ws","wt","wv","wz"],"y":["yA","yb","yd","ym","yn","yq","ys","yt","yw"]};

	var getLevel2 = function(prefix, returnObj){
	  var ret = _.chain(_TREE)
			  .filter(function(o){
				  return o.r.indexOf(prefix) == 0;
			   })
			   //.map(function(o){ return o. r })
			   .value();
	   if(!returnObj){ ret = _.map(ret, function(o){ return o. r }); }
	   else{ if(prefix.length >= 3 && ret.length == 1)
				return _.first(ret);
	   }
	   return ret;
	}

	var json = {id:'root', name:'root', children:[]}
	_.each(level0.reverse(), function(ltr){
		var o = {};
		o.id = o.name = ltr; o.children = [];
		_.each(level1[ltr], function(prefix){
			var p = {};
			p.id = p.name = prefix; p.children = [];
			_.each(getLevel2(prefix), function(root){
				var q = {};
				q.id = q.name = root; q.children = [];
				_.each(getLevel2(root, 1).l, function(lem){
					var r = {};
					r.id = r.name = lem;
					q.children.push(r);
				});
				p.children.push(q);
			});
			o.children.push(p);
		});    
		json.children.push( o );    
	}); //console.log(JSON.stringify(json));	
	
    //load json data
	json.name = "AlfAZ"; //Alfaaz letters
    _SpaceTree.loadJSON(json);
	
    //compute node positions and layout
    st.compute();
    //optional: make a translation of the tree
    st.geom.translate(new $jit.Complex(-200, 0), "current");
    //emulate a click on the root node.
    st.onClick(st.root);
    //end
    //Add event handlers to switch spacetree orientation.
    var top = $jit.id('r-top'), 
        left = $jit.id('r-left'), 
        bottom = $jit.id('r-bottom'), 
        right = $jit.id('r-right'),
        normal = $jit.id('s-normal');
        
    
    function changeHandler() {
        if(this.checked) {
            top.disabled = bottom.disabled = right.disabled = left.disabled = true;
            st.switchPosition(this.value, "animate", {
                onComplete: function(){
                    top.disabled = bottom.disabled = right.disabled = left.disabled = false;
                }
            });
        }
    };
    
    top.onchange = left.onchange = bottom.onchange = right.onchange = changeHandler;
    //end
}