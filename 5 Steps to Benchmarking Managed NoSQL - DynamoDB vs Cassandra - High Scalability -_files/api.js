var Event=YAHOO.util.Event;var JSON=YAHOO.lang.JSON;var Connect=YAHOO.util.Connect;Squarespace.api={server:function(){return window.location.protocol+"//"+window.location.host+"/";},callback:function(C,B,A,D){if(typeof (C)=="function"){if(D){YAHOO.lang.later(D,B,C,A||[],false);}else{C.apply(B,A||[]);}}return ;},url:{encode:function(G){if(!G){return"";}var C=[];for(var E in G){var B=G[E];var F=encodeURIComponent(E);if(typeof (B)=="undefined"){C.push(F,"=&");}else{if(typeof (B)!="function"&&typeof (B)!="object"){C.push(F,"=",encodeURIComponent(B),"&");}else{if(YAHOO.lang.isArray(B)){if(B.length){for(var D=0,A=B.length;D<A;D++){C.push(F,"=",encodeURIComponent(B[D]===undefined?"":B[D]),"&");}}else{C.push(F,"=&");}}}}}C.pop();return C.join("");},decode:function(I,G){if(!I||!I.length){return{};}var D={};var B=I.split("&");var C;var A;var H;for(var E=0,F=B.length;E<F;E++){C=B[E].split("=");A=decodeURIComponent(C[0]);H=decodeURIComponent(C[1]);if(G!==true){if(typeof (D[A])=="undefined"){D[A]=H;}else{if(typeof (D[A])=="string"){D[A]=[D[A]];D[A].push(H);}else{D[A].push(H);}}}else{D[A]=H;}}return D;}}};Squarespace.api.Connection=function(){return ;};Squarespace.api.Connection.prototype={defaultPOSTHeader:"application/x-www-form-urlencoded; charset=UTF-8",defaultFormHeader:"application/x-www-form-urlencoded",defaultXMLContentType:"text/xml",defaultJSONContentType:"application/json",defaultXHRHeader:"XMLHttpRequest",timeout:30000,bypassCache:true,requestObject:null,request:function(B){var F=B.method||(B.data?"POST":"GET");var D=null;var C=null;if(typeof (B.url)=="function"){D=B.url.call(B.scope,B);}else{D=B.url;}if(!B.headers){B.headers={};}if(typeof (C)=="object"){var E=B.headers["Content-Type"];if(YAHOO.lang.isString(E)){if(E==Squarespace.api.Connection.defaultJSONContentType){C=JSON.stringify(B.data);}else{if(E==Squarespace.api.Connection.defaultXMLContentType){C=(new XMLSerializer()).serializeToString(B.data);}else{C=Squarespace.api.url.encode(B.data);}}}else{if(F=="POST"){B.headers["Content-Type"]=Squarespace.api.Connection.defaultPOSTHeader;C=Squarespace.api.url.encode(B.data);}else{if(F=="GET"){D+=(D.indexOf("?")!=-1?"&":"?")+Squarespace.api.url.encode(B.data);}}}}var A={cache:B.cache||!(this.bypassCache),timeout:B.timeout||this.timeout,argument:B.context,success:function(G){Squarespace.api.callback(B.success,B.scope,[G]);this.requestObject=null;return ;},failure:function(G){Squarespace.api.callback(B.failure,B.scope,[G]);this.requestObject=null;return ;}};this.requestObject=Connect.asyncRequest(F,D,A,C);this.requestObject.argument=B.context;return this.requestObject.id;},isLoading:function(){return Connect.isCallInProgress(this.requestObject);},abort:function(){return Connect.abort(this.requestObject,null,false);}};Squarespace.api.WebServiceRequest=function(A){this.connection=A;this.methodId=A.requestObject.argument;this.requestTime=new Date();return ;};Squarespace.api.WebServiceRequest.prototype={id:function(){return this.connection.id;},method:function(){return this.methodId;},isPending:function(){return this.connection.isLoading();},cancel:function(){return this.connection.abort();}};Squarespace.api.WebServiceResponse=function(A){this.responseId=A.tId;this.methodId=A.argument;this.responseTime=new Date();this.responseHeaders=A.getResponseHeader;if(A.status>=200&&A.status<300){this.responseText=A.responseText;}else{var B={status:A.status,statusText:A.statusText};this.responseText=JSON.stringify(B);}return ;};Squarespace.api.WebServiceResponse.prototype={id:function(){return this.responseId;},method:function(){return this.methodId;},getResponseHeaders:function(){return this.responseHeaders;},getResponseHeaderValue:function(A){return this.responseHeaders[A];},getResponse:function(){return this.responseText;}};Squarespace.api.WebService={createRequest:function(D,E,C,B){var A={method:D,url:Squarespace.api.server()+E,data:C,callback:B,scope:this,timeout:15000,success:function(G){var F=new Squarespace.api.WebServiceResponse(G);if(YAHOO.lang.isFunction(B)){B.apply(this,[F]);}else{B.handleResponse.apply(B,[F]);}return ;},failure:function(G){var F=new Squarespace.api.WebServiceResponse(G);if(YAHOO.lang.isFunction(B)){B.apply(this,[F]);}else{B.handleResponse.apply(B,[F]);}return ;}};return A;},startRequest:function(A){var B=new Squarespace.api.Connection();var C=B.request(A);return new Squarespace.api.WebServiceRequest(B);},stopRequest:function(A){if(A.isLoading()){A.abort();}return ;}};Squarespace.api.Twitter={getFeed:function(D,C,E){var B={version:"20100220",responseFormat:"json",method:"squarespace.twitter.getFeed",moduleId:D,count:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,E);return Squarespace.api.WebService.startRequest(A);},getFeedForUsername:function(D,F,C,E){var B={version:"20100220",responseFormat:"json",method:"squarespace.twitter.getFeed",moduleId:D,username:F,count:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,E);return Squarespace.api.WebService.startRequest(A);},getTweets:function(C,E,D,F){var B={version:"20100220",responseFormat:"json",method:"squarespace.twitter.getFeed",moduleId:C,ids:E,filter:D.filter,filterType:D.filterType,filterAtReplies:D.filterAtReplies,filterRetweets:D.filterRetweets,count:D.count};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,F);return Squarespace.api.WebService.startRequest(A);}};Squarespace.api.Flickr={getFeed:function(C,D){var B={version:"20100220",responseFormat:"json",method:"squarespace.flickr.getFeed",moduleId:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,D);return Squarespace.api.WebService.startRequest(A);}};Squarespace.api.Rss={getFeed:function(D,C,E){var B={version:"20100220",responseFormat:"json",method:"squarespace.rss.getFeed",moduleId:D,count:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,E);return Squarespace.api.WebService.startRequest(A);}};Squarespace.api.Delicious={getFeed:function(D,C,E){var B={version:"20100220",responseFormat:"json",method:"squarespace.delicious.getFeed",moduleId:D,count:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,E);return Squarespace.api.WebService.startRequest(A);}};Squarespace.api.LocationCheckins={getFeed:function(D,C,E){var B={version:"20100220",responseFormat:"json",method:"squarespace.location.getFeed",moduleId:D,count:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,E);return Squarespace.api.WebService.startRequest(A);}};Squarespace.api.OAuthProfile={getProfile:function(D,C){var B={version:"20100220",responseFormat:"json",method:"squarespace.oauth.getProfile",provider:C};var A=Squarespace.api.WebService.createRequest("GET","api/rest",B,D);return Squarespace.api.WebService.startRequest(A);}};