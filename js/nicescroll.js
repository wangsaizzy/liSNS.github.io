/* jquery.nicescroll 2.9.6 InuYaksa*2012 MIT http://areaaperta.com/nicescroll */
(function(e) {
	var o = false,
		q = false,
		t = 5E3,
		u = 2E3,
		v = function() {
			var e = document.getElementsByTagName("script"),
				e = e[e.length - 1].src.split("?")[0];
			return e.split("/").length > 0 ? e.split("/").slice(0, -1).join("/") + "/" : ""
		}(),
		n = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || false,
		p = window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || false,
		z = function(f, d) {
			function h(c, g, d) {
				g = c.css(g);
				c = parseFloat(g);
				return isNaN(c) ? (c = m[g] || 0, d = c == 3 ? d ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, b.isie8 && c && (c += 1), d ? c : 0) : c
			}
			var b = this;
			this.version = "2.9.6";
			this.name = "nicescroll";
			this.me = d;
			this.opt = {
				doc: e("body"),
				win: false,
				zindex: -3,
				cursoropacitymin: 0,
				cursoropacitymax: 1,
				cursorcolor: "#3ac0e6",
				cursorwidth: "5px",
				cursorborder: "1px solid #28c7a7",
				cursorborderradius: "5px",
				scrollspeed: 60,
				mousescrollstep: 40,
				touchbehavior: false,
				hwacceleration: true,
				usetransition: true,
				boxzoom: false,
				dblclickzoom: true,
				gesturezoom: true,
				grabcursorenabled: true,
				autohidemode: true,
				background: "",
				iframeautoresize: true,
				cursorminheight: 20,
				preservenativescrolling: true,
				railoffset: false,
				bouncescroll: false,
				spacebarenabled: true,
				railpadding: {
					top: 0,
					right: 0,
					left: 0,
					bottom: 0
				},
				disableoutline: true
			};
			if (f) for (var i in b.opt) typeof f[i] != "undefined" && (b.opt[i] = f[i]);
			this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
			this.ispage = /BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName);
			this.haswrapper = b.opt.win !== false;
			this.win = b.opt.win || (this.ispage ? e(window) : this.doc);
			this.docscroll = this.ispage && !this.haswrapper ? e(window) : this.win;
			this.body = e("body");
			this.iframe = false;
			this.isiframe = this.doc[0].nodeName == "IFRAME" && this.win[0].nodeName == "IFRAME";
			this.istextarea = this.win[0].nodeName == "TEXTAREA";
			this.page = this.view = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown = false;
			this.scroll = {
				x: 0,
				y: 0
			};
			this.scrollratio = {
				x: 0,
				y: 0
			};
			this.cursorheight = 20;
			this.scrollvaluemax = 0;
			this.scrollmom = false;
			do this.id = "ascrail" + u++;
			while (document.getElementById(this.id));
			this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.cursorfreezed = this.cursor = this.rail = false;
			this.visibility = true;
			this.nativescrollingarea = this.hidden = this.locked = false;
			this.events = [];
			this.saved = {};
			this.delaylist = {};
			this.synclist = {};
			this.lastdelta = 0;
			var j = document.createElement("DIV");
			this.isopera = "opera" in window;
			this.isieold = (this.isie = "all" in document && "attachEvent" in j && !this.isopera) && !("msInterpolationMode" in j.style);
			this.isie7 = this.isie && !this.isieold && (!("documentMode" in document) || document.documentMode == 7);
			this.isie8 = this.isie && "documentMode" in document && document.documentMode == 8;
			this.isie9 = this.isie && "performance" in window && document.documentMode >= 9;
			this.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
			this.isie7mobile = !this.isie9mobile && this.isie7 && /iemobile/i.test(navigator.userAgent);
			this.ismozilla = "MozAppearance" in j.style;
			this.ischrome = "chrome" in window;
			this.cantouch = "ontouchstart" in document.documentElement;
			this.hasmstouch = window.navigator.msPointerEnabled || false;
			this.isios4 = (this.isios = this.cantouch && /iphone|ipad|ipod/i.test(navigator.platform)) && !("seal" in Object);
			if (b.opt.hwacceleration) {
				if ((this.trstyle = window.opera ? "OTransform" : document.all ? "msTransform" : j.style.webkitTransform !== void 0 ? "webkitTransform" : j.style.MozTransform !== void 0 ? "MozTransform" : false) && typeof j.style[this.trstyle] == "undefined") this.trstyle = false;
				if (this.hastransform = this.trstyle != false) j.style[this.trstyle] = "translate3d(1px,2px,3px)", this.hastranslate3d = /translate3d/.test(j.style[this.trstyle]);
				this.transitionstyle = false;
				this.prefixstyle = "";
				this.transitionend = false;
				var r = "transition,webkitTransition,MozTransition,OTransition,msTransition,KhtmlTransition".split(","),
					x = ",-webkit-,-moz-,-o-,-ms-,-khtml-".split(","),
					l = "transitionEnd,webkitTransitionEnd,transitionend,oTransitionEnd,msTransitionEnd,KhtmlTransitionEnd".split(",");
				for (i = 0; i < r.length; i++) if (r[i] in j.style) {
					this.transitionstyle = r[i];
					this.prefixstyle = x[i];
					this.transitionend = l[i];
					break
				}
				this.hastransition = this.transitionstyle
			} else this.transitionend = this.hastransition = this.transitionstyle = this.hastranslate3d = this.hastransform = this.trstyle = false;
			this.cursorgrabvalue = "";
			if (b.opt.grabcursorenabled && b.opt.touchbehavior) this.cursorgrabvalue = function() {
				var c = ["-moz-grab", "-webkit-grab", "grab"];
				if (b.ischrome || b.isie) c = [];
				for (var g = 0; g < c.length; g++) {
					var d = c[g];
					j.style.cursor = d;
					if (j.style.cursor == d) return d
				}
				return "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
			}();
			j = null;
			this.ishwscroll = b.hastransform && b.opt.hwacceleration && b.haswrapper;
			this.delayed = function(c, g, d) {
				var e = b.delaylist[c],
					f = (new Date).getTime();
				if (e && e.tt) return false;
				if (e && e.last + d > f && !e.tt) b.delaylist[c] = {
					last: f + d,
					tt: setTimeout(function() {
						b.delaylist[c].tt = 0;
						g.call()
					}, d)
				};
				else if (!e || !e.tt) b.delaylist[c] = {
					last: f,
					tt: 0
				}, setTimeout(function() {
					g.call()
				}, 0)
			};
			this.requestSync = function() {
				if (!b.onsync) n(function() {
					b.onsync = false;
					for (name in b.synclist) {
						var c = b.synclist[name];
						c && c.call(b);
						b.synclist[name] = false
					}
				}), b.onsync = true
			};
			this.synched = function(c, g) {
				b.synclist[c] = g;
				b.requestSync()
			};
			this.css = function(c, g) {
				for (var d in g) b.saved.css.push([c, d, c.css(d)]), c.css(d, g[d])
			};
			this.scrollTop = function(c) {
				return typeof c == "undefined" ? b.getScrollTop() : b.setScrollTop(c)
			};
			BezierClass = function(b, d, e, k, f, h, y) {
				this.st = b;
				this.ed = d;
				this.spd = e;
				this.p1 = k || 0;
				this.p2 = f || 1;
				this.p3 = h || 0;
				this.p4 = y || 1;
				this.ts = (new Date).getTime();
				this.df = this.ed - this.st
			};
			BezierClass.prototype = {
				B2: function(b) {
					return 3 * b * b * (1 - b)
				},
				B3: function(b) {
					return 3 * b * (1 - b) * (1 - b)
				},
				B4: function(b) {
					return (1 - b) * (1 - b) * (1 - b)
				},
				getNow: function() {
					var b = 1 - ((new Date).getTime() - this.ts) / this.spd,
						d = this.B2(b) + this.B3(b) + this.B4(b);
					return b < 0 ? this.ed : this.st + Math.round(this.df * d)
				},
				update: function(b, d) {
					this.st = this.getNow();
					this.ed = b;
					this.spd = d;
					this.ts = (new Date).getTime();
					this.df = this.ed - this.st;
					return this
				}
			};
			this.ishwscroll ? (this.doc.translate = {
				x: 0,
				y: 0
			}, this.hastranslate3d && this.doc.css(this.prefixstyle + "backface-visibility", "hidden"), this.getScrollTop = function(c) {
				return b.timerscroll && !c ? b.timerscroll.bz.getNow() : b.doc.translate.y
			}, this.notifyScrollEvent = document.createEvent ?
			function(b) {
				var d = document.createEvent("UIEvents");
				d.initUIEvent("scroll", false, true, window, 1);
				b.dispatchEvent(d)
			} : document.fireEvent ?
			function(b) {
				var d = document.createEventObject();
				b.fireEvent("onscroll");
				d.cancelBubble = true
			} : function() {}, this.setScrollTop = this.hastranslate3d ?
			function(c, d) {
				b.doc.css(b.trstyle, "translate3d(0px," + c * -1 + "px,0px)");
				b.doc.translate.y = c;
				d || b.notifyScrollEvent(b.win[0])
			} : function(c, d) {
				b.doc.css(b.trstyle, "translate(0px," + c * -1 + "px)");
				b.doc.translate.y = c;
				d || b.notifyScrollEvent(b.win[0])
			}) : (this.getScrollTop = function() {
				return b.docscroll.scrollTop()
			}, this.setScrollTop = function(c) {
				return b.docscroll.scrollTop(c)
			});
			this.getTarget = function(b) {
				return !b ? false : b.target ? b.target : b.srcElement ? b.srcElement : false
			};
			this.hasParent = function(b, d) {
				if (!b) return false;
				for (var e = b.target || b.srcElement || b || false; e && e.id != d;) e = e.parentNode || false;
				return e !== false
			};
			var m = {
				thin: 1,
				medium: 3,
				thick: 5
			};
			this.updateScrollBar = function(c) {
				if (b.ishwscroll) b.rail.css({
					height: b.win.innerHeight()
				});
				else {
					var d = b.win.offset();
					d.top += h(b.win, "border-top-width", true);
					d.left += b.win.outerWidth() - h(b.win, "border-right-width", false) - b.rail.width;
					var e = b.opt.railoffset;
					e && (e.top && (d.top += e.top), e.left && (d.left += e.left));
					b.rail.css({
						top: d.top,
						left: d.left,
						height: c ? c.h : b.win.innerHeight()
					});
					b.zoom && b.zoom.css({
						top: d.top + 1,
						left: d.left - 20
					})
				}
			};
			b.hasanimationframe = n;
			b.hascancelanimationframe = p;
			b.hasanimationframe ? b.hascancelanimationframe || (p = function() {
				b.cancelAnimationFrame = true
			}) : (n = function(b) {
				return setTimeout(b, 16)
			}, p = clearInterval);
			this.init = function() {
				b.saved.css = [];
				if (b.isie7mobile) return true;
				b.hasmstouch && b.css(b.ispage ? e("html") : b.win, {
					"-ms-touch-action": "none"
				});
				if (!b.ispage || !b.cantouch && !b.isieold && !b.isie9mobile) {
					var c = b.docscroll;
					b.ispage && (c = b.haswrapper ? b.win : b.doc);
					b.isie9mobile || b.css(c, {
						"overflow-y": "hidden"
					});
					b.ispage && b.isie7 && b.win[0].nodeName == "BODY" && b.css(e("html"), {
						"overflow-y": "hidden"
					});
					var d = e(document.createElement("div"));
					d.css({
						position: "relative",
						top: 0,
						"float": "right",
						width: b.opt.cursorwidth,
						height: "0px",
						"background-color": b.opt.cursorcolor,
						border: b.opt.cursorborder,
						"background-clip": "padding-box",
						"-webkit-border-radius": b.opt.cursorborderradius,
						"-moz-border-radius": b.opt.cursorborderradius,
						"border-radius": b.opt.cursorborderradius
					});
					d.hborder = parseFloat(d.outerHeight() - d.innerHeight());
					b.cursor = d;
					c = e(document.createElement("div"));
					c.attr("id", b.id);
					c.width = Math.max(parseFloat(b.opt.cursorwidth), d.outerWidth());
					c.css({
						width: c.width + "px",
						zIndex: b.ispage ? b.opt.zindex : b.opt.zindex + 2,
						background: b.opt.background
					});
					var w = ["top", "bottom", "left", "right"],
						k;
					for (k in w) {
						var f = b.opt.railpadding[k];
						f && c.css("padding-" + k, f + "px")
					}
					c.append(d);
					b.rail = c;
					k = b.rail.drag = false;
					if (b.opt.boxzoom && !b.ispage && !b.isieold && (k = document.createElement("div"), b.bind(k, "click", b.doZoom), b.zoom = e(k), b.zoom.css({
						cursor: "pointer",
						"z-index": b.opt.zindex,
						backgroundImage: "url(" + v + "zoomico.png)",
						height: 18,
						width: 18,
						backgroundPosition: "0px 0px"
					}), b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), b.cantouch && b.opt.gesturezoom)) b.ongesturezoom = function(c) {
						c.scale > 1.5 && b.doZoomIn(c);
						c.scale < 0.8 && b.doZoomOut(c);
						return b.cancelEvent(c)
					}, b.bind(b.win, "gestureend", b.ongesturezoom);
					b.ispage ? (c.css({
						position: "fixed",
						top: "0px",
						right: "0px",
						height: "100%"
					}), b.body.append(c)) : (b.ishwscroll ? (b.win.css("position") == "static" && b.css(b.win, {
						position: "relative"
					}), k = b.win[0].nodeName == "HTML" ? b.body : b.win, b.zoom && (b.zoom.css({
						position: "absolute",
						top: 1,
						right: 0,
						"margin-right": c.width + 4
					}), k.append(b.zoom)), c.css({
						position: "absolute",
						top: 0,
						right: 0
					}), k.append(c)) : (c.css({
						position: "absolute"
					}), b.zoom && b.zoom.css({
						position: "absolute"
					}), b.updateScrollBar(), b.body.append(c), b.zoom && b.body.append(b.zoom)), b.isios && b.css(b.win, {
						"-webkit-tap-highlight-color": "rgba(0,0,0,0)",
						"-webkit-touch-callout": "none"
					}));
					if (b.opt.autohidemode === false) b.autohidedom = false;
					else if (b.opt.autohidemode === true) b.autohidedom = b.rail;
					else if (b.opt.autohidemode == "cursor") b.autohidedom = b.cursor;
					if (b.isie9mobile) b.scrollmom = {
						y: new s(b)
					}, b.onmangotouch = function() {
						var c = b.getScrollTop();
						if (c == b.scrollmom.y.lastscrolly) return true;
						var d = c - b.mangotouch.sy;
						if (d != 0) {
							var e = d < 0 ? -1 : 1,
								g = (new Date).getTime();
							b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);
							if (g - b.mangotouch.tm > 60 || b.mangotouch.dry != e) b.scrollmom.y.stop(), b.scrollmom.y.reset(c), b.mangotouch.sy = c, b.mangotouch.ly = c, b.mangotouch.dry = e, b.mangotouch.tm = g;
							else {
								b.scrollmom.y.stop();
								b.scrollmom.y.update(b.mangotouch.sy - d);
								var f = g - b.mangotouch.tm;
								b.mangotouch.tm = g;
								d = Math.abs(b.mangotouch.ly - c);
								b.mangotouch.ly = c;
								if (d > 2) b.mangotouch.lazy = setTimeout(function() {
									b.mangotouch.lazy = false;
									b.mangotouch.dry = 0;
									b.mangotouch.tm = 0;
									b.scrollmom.y.doMomentum(f)
								}, 80)
							}
						}
					}, c = b.getScrollTop(), b.mangotouch = {
						sy: c,
						ly: c,
						dry: 0,
						lazy: false,
						tm: 0
					}, b.bind(b.docscroll, "scroll", b.onmangotouch);
					else {
						if (b.cantouch || b.opt.touchbehavior || b.hasmstouch) b.scrollmom = {
							y: new s(b)
						}, b.ontouchstart = function(c) {
							if (c.pointerType && c.pointerType != 2) return false;
							if (!b.locked) {
								if (b.hasmstouch) for (var d = c.target ? c.target : false; d;) {
									var g = e(d).getNiceScroll();
									if (g.length > 0 && g[0].me == b.me) break;
									if (g.length > 0) return false;
									if (d.nodeName == "DIV" && d.id == b.id) break;
									d = d.parentNode ? d.parentNode : false
								}
								b.cancelScroll();
								b.rail.drag = {
									x: c.clientX,
									y: c.clientY,
									sx: b.scroll.x,
									sy: b.scroll.y,
									st: b.getScrollTop(),
									pt: 2
								};
								b.hasmoving = false;
								b.lastmouseup = false;
								b.scrollmom.y.reset(c.clientY);
								if (!b.cantouch && !b.hasmstouch) {
									d = b.getTarget(c);
									if (!d || !/INPUT|SELECT|TEXTAREA/i.test(d.nodeName)) return b.cancelEvent(c);
									if (/SUBMIT|CANCEL|BUTTON/i.test(e(d).attr("type"))) pc = {
										tg: d,
										click: false
									}, b.preventclick = pc
								}
							}
						}, b.ontouchend = function(c) {
							if (c.pointerType && c.pointerType != 2) return false;
							if (b.rail.drag && b.rail.drag.pt == 2 && (b.scrollmom.y.doMomentum(), b.rail.drag = false, b.hasmoving && (b.hasmoving = false, b.lastmouseup = true, b.hideCursor(), !b.cantouch))) return b.cancelEvent(c)
						}, b.ontouchmove = function(c) {
							if (c.pointerType && c.pointerType != 2) return false;
							if (b.rail.drag && b.rail.drag.pt == 2) {
								if (b.cantouch && typeof c.original == "undefined") return true;
								b.hasmoving = true;
								if (b.preventclick && !b.preventclick.click) b.preventclick.click = b.preventclick.tg.onclick || false, b.preventclick.tg.onclick = b.onpreventclick;
								var d = c.clientY,
									g = b.rail.drag.st - (d - b.rail.drag.y);
								if (b.ishwscroll) g < 0 ? (g = Math.round(g / 2), d = 0) : g > b.page.maxh && (g = b.page.maxh + Math.round((g - b.page.maxh) / 2), d = 0);
								else if (g < 0 && (g = 0), g > b.page.maxh) g = b.page.maxh;
								b.synched("touchmove", function() {
									b.rail.drag && b.rail.drag.pt == 2 && (b.prepareTransition && b.prepareTransition(0), b.setScrollTop(g), b.showCursor(g), b.scrollmom.y.update(d))
								});
								return b.cancelEvent(c)
							}
						};
						b.cantouch || b.opt.touchbehavior ? (b.onpreventclick = function(c) {
							if (b.preventclick) return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick = false, b.cancelEvent(c)
						}, b.onmousedown = b.ontouchstart, b.onmouseup = b.ontouchend, b.onclick = b.isios ? false : function(c) {
							return b.lastmouseup ? (b.lastmouseup = false, b.cancelEvent(c)) : true
						}, b.onmousemove = b.ontouchmove, b.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, {
							cursor: b.cursorgrabvalue
						}), b.css(b.rail, {
							cursor: b.cursorgrabvalue
						}))) : (b.onmousedown = function(c) {
							if (!(b.rail.drag && b.rail.drag.pt != 1)) {
								if (b.locked) return b.cancelEvent(c);
								b.cancelScroll();
								b.rail.drag = {
									x: c.clientX,
									y: c.clientY,
									sx: b.scroll.x,
									sy: b.scroll.y,
									pt: 1
								};
								return b.cancelEvent(c)
							}
						}, b.onmouseup = function(c) {
							if (b.rail.drag && b.rail.drag.pt == 1) return b.rail.drag = false, b.cancelEvent(c)
						}, b.onmousemove = function(c) {
							if (b.rail.drag) {
								if (b.rail.drag.pt == 1) {
									b.scroll.y = b.rail.drag.sy + (c.clientY - b.rail.drag.y);
									if (b.scroll.y < 0) b.scroll.y = 0;
									var d = b.scrollvaluemax;
									if (b.scroll.y > d) b.scroll.y = d;
									b.synched("mousemove", function() {
										if (b.rail.drag && b.rail.drag.pt == 1) b.showCursor(), b.cursorfreezed = true, b.doScroll(Math.round(b.scroll.y * b.scrollratio.y))
									});
									return b.cancelEvent(c)
								}
							} else b.checkarea = true
						});
						(b.cantouch || b.opt.touchbehavior) && b.bind(b.win, "mousedown", b.onmousedown);
						b.hasmstouch && (b.css(b.rail, {
							"-ms-touch-action": "none"
						}), b.css(b.cursor, {
							"-ms-touch-action": "none"
						}), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), b.bind(document, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(b) {
							b.preventDefault()
						}), b.bind(b.cursor, "contextmenu", function(b) {
							b.preventDefault()
						}));
						b.bind(b.cursor, "mousedown", b.onmousedown);
						b.bind(b.cursor, "mouseup", function(c) {
							if (!(b.rail.drag && b.rail.drag.pt == 2)) return b.rail.drag = false, b.hasmoving = false, b.hideCursor(), b.cancelEvent(c)
						});
						b.bind(document, "mouseup", b.onmouseup);
						b.bind(document, "mousemove", b.onmousemove);
						b.onclick && b.bind(document, "click", b.onclick);
						b.cantouch || (b.rail.mouseenter(function() {
							b.showCursor();
							b.rail.active = true
						}), b.rail.mouseleave(function() {
							b.rail.active = false;
							b.rail.drag || b.hideCursor()
						}), b.isiframe || b.bind(b.isie && b.ispage ? document : b.docscroll, "mousewheel", b.onmousewheel), b.bind(b.rail, "mousewheel", b.onmousewheel));
						b.zoom && (b.zoom.mouseenter(function() {
							b.showCursor();
							b.rail.active = true
						}), b.zoom.mouseleave(function() {
							b.rail.active = false;
							b.rail.drag || b.hideCursor()
						}));
						!b.ispage && !b.cantouch && !/HTML|BODY/.test(b.win[0].nodeName) && (b.win.attr("tabindex") || b.win.attr({
							tabindex: t++
						}), b.ischrome && b.opt.disableoutline && b.win.css({
							outline: "none"
						}), b.win.focus(function(c) {
							o = b.getTarget(c).id || true;
							b.hasfocus = true;
							b.noticeCursor()
						}), b.win.blur(function() {
							o = false;
							b.hasfocus = false
						}), b.win.mouseenter(function(c) {
							q = b.getTarget(c).id || true;
							b.hasmousefocus = true;
							b.noticeCursor()
						}), b.win.mouseleave(function() {
							q = false;
							b.hasmousefocus = false
						}))
					}
					b.onkeypress = function(c) {
						if (b.locked && b.page.maxh == 0) return true;
						var c = c ? c : window.e,
							d = b.getTarget(c);
						if (d && /INPUT|TEXTAREA|SELECT|OPTION/.test(d.nodeName) && (!d.getAttribute("type") && !d.type || !/submit|button|cancel/i.tp)) return true;
						if (b.hasfocus || b.hasmousefocus && !o || b.ispage && !o && !q) {
							d = c.keyCode;
							if (b.locked && d != 27) return b.cancelEvent(c);
							var g = false;
							switch (d) {
							case 38:
							case 63233:
								b.doScrollBy(72);
								g = true;
								break;
							case 40:
							case 63235:
								b.doScrollBy(-72);
								g = true;
								break;
							case 33:
							case 63276:
								b.doScrollBy(b.view.h);
								g = true;
								break;
							case 34:
							case 63277:
								b.doScrollBy(-b.view.h);
								g = true;
								break;
							case 36:
							case 63273:
								b.doScrollTo(0);
								g = true;
								break;
							case 35:
							case 63275:
								b.doScrollTo(b.page.maxh);
								g = true;
								break;
							case 32:
								b.opt.spacebarenabled && (b.doScrollBy(-b.view.h), g = true);
								break;
							case 27:
								b.zoomactive && (b.doZoom(), g = true)
							}
							if (g) return b.cancelEvent(c)
						}
					};
					b.bind(document, b.isopera ? "keypress" : "keydown", b.onkeypress);
					b.bind(window, "resize", b.resize);
					b.bind(window, "orientationchange", b.resize);
					b.bind(window, "load", b.resize);
					b.onAttributeChange = function() {
						b.lazyResize()
					};
					!b.ispage && !b.haswrapper && ("WebKitMutationObserver" in window ? (new WebKitMutationObserver(function(c) {
						c.forEach(b.onAttributeChange)
					})).observe(b.win[0], {
						attributes: true,
						subtree: false
					}) : (b.bind(b.win, b.isie && !b.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), b.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange)));
					!b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);
					b.istextarea && b.bind(b.win, "mouseup", b.resize);
					b.resize()
				}
				if (this.doc[0].nodeName == "IFRAME") {
					var h = function() {
							b.iframexd = false;
							try {
								var c = "contentDocument" in this ? this.contentDocument : this.contentWindow.document
							} catch (d) {
								b.iframexd = true, c = false
							}
							if (b.iframexd) return true;
							if (b.isiframe) b.iframe = {
								html: b.doc.contents().find("html")[0],
								body: b.doc.contents().find("body")[0]
							}, b.getContentSize = function() {
								return {
									w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
									h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
								}
							}, b.docscroll = e(this.contentWindow);
							if (b.opt.iframeautoresize && !b.isiframe) {
								b.win.scrollTop(0);
								b.doc.height("");
								var g = Math.max(c.getElementsByTagName("html")[0].scrollHeight, c.body.scrollHeight);
								b.doc.height(g)
							}
							b.resize();
							b.isie7 && b.css(e(c).find("html"), {
								"overflow-y": "hidden"
							});
							b.css(e(c.body), {
								"overflow-y": "hidden"
							});
							"contentWindow" in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(c, "scroll", b.onscroll);
							b.bind(c, "mouseup", b.onmouseup);
							b.bind(c, "mousewheel", b.onmousewheel);
							b.bind(c, b.isopera ? "keypress" : "keydown", b.onkeypress);
							if (b.cantouch || b.opt.touchbehavior) b.bind(c, "mousedown", b.onmousedown), b.cursorgrabvalue && b.css(e(c.body), {
								cursor: b.cursorgrabvalue
							});
							b.bind(c, "mousemove", b.onmousemove);
							b.zoom && (b.opt.dblclickzoom && b.bind(c, "dblclick", b.doZoom), b.ongesturezoom && b.bind(c, "gestureend", b.ongesturezoom))
						};
					this.doc[0].readyState && this.doc[0].readyState == "complete" && setTimeout(function() {
						h.call(b.doc[0], false)
					}, 500);
					b.bind(this.doc, "load", h)
				}
			};
			this.showCursor = function(c) {
				if (b.cursortimeout) clearTimeout(b.cursortimeout), b.cursortimeout = 0;
				if (b.rail) {
					b.autohidedom && b.autohidedom.stop().css({
						opacity: b.opt.cursoropacitymax
					});
					if (typeof c != "undefined") b.scroll.y = Math.round(c * 1 / b.scrollratio.y);
					b.cursor.css({
						height: b.cursorheight,
						top: b.scroll.y
					});
					b.zoom && b.zoom.stop().css({
						opacity: b.opt.cursoropacitymax
					})
				}
			};
			this.hideCursor = function(c) {
				if (!b.cursortimeout && b.rail && b.autohidedom) b.cursortimeout = setTimeout(function() {
					b.rail.active || (b.autohidedom.stop().animate({
						opacity: b.opt.cursoropacitymin
					}), b.zoom && b.zoom.stop().animate({
						opacity: b.opt.cursoropacitymin
					}));
					b.cursortimeout = 0
				}, c || 400)
			};
			this.noticeCursor = function(c, d) {
				b.showCursor(d);
				b.hideCursor(c)
			};
			this.getContentSize = b.ispage ?
			function() {
				return {
					w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
					h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
				}
			} : b.haswrapper ?
			function() {
				return {
					w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")),
					h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom"))
				}
			} : function() {
				return {
					w: b.docscroll[0].scrollWidth,
					h: b.docscroll[0].scrollHeight
				}
			};
			this.resize = this.onResize = function(c, d) {
				if (!b.haswrapper && !b.ispage) if (b.win.css("display") == "none") return b.visibility && b.hideRail(), false;
				else!b.visibility && b.getScrollTop() == 0 && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y)), !b.hidden && !b.visibility && b.showRail();
				var e = b.page.maxh,
					f = b.page.maxw,
					h = b.view.w;
				b.view = {
					w: b.ispage ? b.win.width() : parseInt(b.win[0].clientWidth),
					h: b.ispage ? b.win.height() : parseInt(b.win[0].clientHeight)
				};
				b.page = d ? d : b.getContentSize();
				b.page.maxh = Math.max(0, b.page.h - b.view.h);
				b.page.maxw = Math.max(0, b.page.w - b.view.w);
				if (b.page.maxh == e && b.page.maxw == f && b.view.w == h) if (b.ispage) return b;
				else {
					e = b.win.offset();
					if (b.lastposition && (f = b.lastposition, f.top == e.top && f.left == e.left)) return b;
					b.lastposition = e
				}
				if (b.page.maxh == 0) return b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio = {
					x: 0,
					y: 0
				}, b.cursorheight = 0, b.locked = true, b.setScrollTop(0), false;
				else if (!b.hidden && !b.visibility) b.showRail(), b.locked = false;
				b.istextarea && b.win.css("resize") && b.win.css("resize") != "none" && (b.view.h -= 20);
				b.ispage || b.updateScrollBar(b.view);
				b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h)));
				b.cursorheight = Math.max(b.opt.cursorminheight, b.cursorheight);
				b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder;
				b.scrollratio = {
					x: 0,
					y: b.page.maxh / b.scrollvaluemax
				};
				b.getScrollTop() > b.page.maxh ? b.doScroll(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.noticeCursor());
				return b
			};
			this.lazyResize = function() {
				b.delayed("resize", b.resize, 250)
			};
			this._bind = function(c, d, e, f) {
				b.events.push({
					e: c,
					n: d,
					f: e
				});
				c.addEventListener ? c.addEventListener(d, e, f || false) : c.attachEvent ? c.attachEvent("on" + d, e) : c["on" + d] = e
			};
			this.bind = function(c, d, e, f) {
				var h = "jquery" in c ? c[0] : c;
				h.addEventListener ? (b.cantouch && /mouseup|mousedown|mousemove/.test(d) && b._bind(h, d == "mousedown" ? "touchstart" : d == "mouseup" ? "touchend" : "touchmove", function(b) {
					if (b.touches) {
						if (b.touches.length < 2) {
							var c = b.touches.length ? b.touches[0] : b;
							c.original = b;
							e.call(this, c)
						}
					} else if (b.changedTouches) c = b.changedTouches[0], c.original = b, e.call(this, c)
				}, f || false), b._bind(h, d, e, f || false), d == "mousewheel" && b._bind(h, "DOMMouseScroll", e, f || false), b.cantouch && d == "mouseup" && b._bind(h, "touchcancel", e, f || false)) : b._bind(h, d, function(c) {
					if ((c = c || window.event || false) && c.srcElement) c.target = c.srcElement;
					return e.call(h, c) === false || f === false ? b.cancelEvent(c) : true
				})
			};
			this._unbind = function(b, d, e) {
				b.removeEventListener ? b.removeEventListener(d, e, false) : b.detachEvent ? b.detachEvent("on" + d, e) : b["on" + d] = false
			};
			this.unbindAll = function() {
				for (var c = 0; c < b.events.length; c++) {
					var d = b.events[c];
					b._unbind(d.e, d.n, d.f)
				}
			};
			this.cancelEvent = function(b) {
				b = b.original ? b.original : b ? b : window.event || false;
				if (!b) return false;
				b.preventDefault && b.preventDefault();
				b.stopPropagation && b.stopPropagation();
				b.preventManipulation && b.preventManipulation();
				b.cancelBubble = true;
				b.cancel = true;
				return b.returnValue = false
			};
			this.showRail = function() {
				if (b.page.maxh != 0 && (b.ispage || b.win.css("display") != "none")) b.visibility = true, b.rail.css("display", "block");
				return b
			};
			this.hideRail = function() {
				b.visibility = false;
				b.rail.css("display", "none");
				return b
			};
			this.show = function() {
				b.hidden = false;
				b.locked = false;
				return b.showRail()
			};
			this.hide = function() {
				b.hidden = true;
				b.locked = true;
				return b.hideRail()
			};
			this.remove = function() {
				b.doZoomOut();
				b.unbindAll();
				b.events = [];
				b.rail.remove();
				b.zoom && b.zoom.remove();
				b.cursor = false;
				b.rail = false;
				b.zoom = false;
				for (var c = 0; c < b.saved.css.length; c++) {
					var d = b.saved.css[c];
					d[0].css(d[1], typeof d[2] == "undefined" ? "" : d[2])
				}
				b.saved = false;
				b.me.data("__nicescroll", "");
				return b
			};
			this.isScrollable = function(b) {
				for (b = b.target ? b.target : b; b && b.nodeName && !/BODY|HTML/.test(b.nodeName);) {
					var d = e(b);
					if (/scroll|auto/.test(d.css("overflowY") || d.css("overflow") || "")) return b.clientHeight != b.scrollHeight;
					b = b.parentNode ? b.parentNode : false
				}
				return false
			};
			this.onmousewheel = function(c) {
				if (b.locked && b.page.maxh == 0) return true;
				if (b.opt.preservenativescrolling && b.checkarea) b.checkarea = false, b.nativescrollingarea = b.isScrollable(c);
				if (b.nativescrollingarea) return true;
				if (b.locked) return b.cancelEvent(c);
				if (b.rail.drag) return b.cancelEvent(c);
				var d = 0;
				if (d = c.detail ? c.detail * -1 : c.wheelDelta / 40) b.scrollmom && b.scrollmom.y.stop(), b.lastdelta += d * b.opt.mousescrollstep, b.synched("mousewheel", function() {
					if (!b.rail.drag) {
						var c = b.lastdelta;
						b.lastdelta = 0;
						b.doScrollBy(c)
					}
				});
				return b.cancelEvent(c)
			};
			this.stop = function() {
				b.cancelScroll();
				b.scrollmon && b.scrollmon.stop();
				b.cursorfreezed = false;
				b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
				b.noticeCursor();
				return b
			};
			b.ishwscroll && b.hastransition && b.opt.usetransition ? (this.prepareTransition = function(c) {
				var d = Math.round(b.opt.scrollspeed * 10),
					c = Math.min(d, Math.round(c / 20 * b.opt.scrollspeed)),
					d = c > 20 ? b.prefixstyle + "transform " + c + "ms ease-out 0s" : "";
				if (!b.lasttransitionstyle || b.lasttransitionstyle != d) b.lasttransitionstyle = d, b.doc.css(b.transitionstyle, d);
				return c
			}, this.doScroll = function(c, d) {
				var e = b.getScrollTop();
				if (c < 0 && e <= 0) return b.noticeCursor();
				else if (c > b.page.maxh && e >= b.page.maxh) return b.checkContentSize(), b.noticeCursor();
				b.newscrolly = c;
				b.newscrollspeed = d || false;
				if (b.timer) return false;
				if (!b.scrollendtrapped) b.scrollendtrapped = true, b.bind(b.doc, b.transitionend, b.onScrollEnd, false);
				b.timer = setTimeout(function() {
					var c = b.getScrollTop(),
						c = b.newscrollspeed ? b.newscrollspeed : Math.abs(c - b.newscrolly),
						d = b.prepareTransition(c);
					b.timer = setTimeout(function() {
						if (b.newscrolly < 0 && !b.opt.bouncescroll) b.newscrolly = 0;
						else if (b.newscrolly > b.page.maxh && !b.opt.bouncescroll) b.newscrolly = b.page.maxh;
						if (b.newscrolly == b.getScrollTop()) b.timer = 0, b.onScrollEnd();
						else {
							var c = b.getScrollTop();
							b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
							if (d > 0 && (b.timerscroll = {
								ts: (new Date).getTime(),
								s: b.getScrollTop(),
								e: b.newscrolly,
								sp: d,
								bz: new BezierClass(c, b.newscrolly, d, 0, 1, 0, 1)
							}, !b.cursorfreezed)) b.timerscroll.tm = setInterval(function() {
								b.showCursor(b.getScrollTop())
							}, 60);
							b.setScrollTop(b.newscrolly);
							b.timer = 0
						}
					}, 15)
				}, b.opt.scrollspeed)
			}, this.cancelScroll = function() {
				if (!b.scrollendtrapped) return true;
				var c = b.getScrollTop();
				b.scrollendtrapped = false;
				b._unbind(b.doc, b.transitionend, b.onScrollEnd);
				b.prepareTransition(0);
				b.setScrollTop(c);
				b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
				b.timerscroll = false;
				b.cursorfreezed = false;
				b.noticeCursor(false, c);
				return b
			}, this.onScrollEnd = function() {
				b.scrollendtrapped = false;
				b._unbind(b.doc, b.transitionend, b.onScrollEnd);
				b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
				b.timerscroll = false;
				b.cursorfreezed = false;
				var c = b.getScrollTop();
				b.setScrollTop(c);
				b.noticeCursor(false, c);
				c < 0 ? b.doScroll(0, 60) : c > b.page.maxh && b.doScroll(b.page.maxh, 60)
			}) : (this.doScroll = function(c) {
				function d() {
					if (b.cancelAnimationFrame) return true;
					if (h = 1 - h) return b.timer = n(d) || 1;
					var c = b.getScrollTop(),
						e = b.bzscroll ? b.bzscroll.getNow() : b.newscrolly,
						c = e - c;
					if (c < 0 && e < b.newscrolly || c > 0 && e > b.newscrolly) e = b.newscrolly;
					b.setScrollTop(e);
					e == b.newscrolly ? (b.timer = 0, b.cursorfreezed = false, b.bzscroll = false, e < 0 ? b.doScroll(0) : e > b.page.maxh && b.doScroll(b.page.maxh)) : b.timer = n(d) || 1
				}
				if (b.newscrolly == c) return true;
				var e = b.getScrollTop();
				b.newscrolly = c;
				if (!b.bouncescroll) if (b.newscrolly < 0) {
					if (b.newspeedy) b.newspeedy.x = 0;
					b.newscrolly = 0
				} else if (b.newscrolly > b.page.maxh) {
					if (b.newspeedy) b.newspeedy.x = b.page.maxh;
					b.newscrolly = b.page.maxh
				}
				var f = Math.floor(Math.abs(c - e) / 40);
				f > 0 ? (f = Math.min(10, f) * 100, b.bzscroll = b.bzscroll ? b.bzscroll.update(c, f) : new BezierClass(e, c, f, 0, 1, 0, 1)) : b.bzscroll = false;
				if (!b.timer) {
					e == b.page.maxh && c >= b.page.maxh && b.checkContentSize();
					var h = 1;
					b.cancelAnimationFrame = false;
					b.timer = 1;
					d();
					e == b.page.maxh && c >= e && b.checkContentSize();
					b.noticeCursor()
				}
			}, this.cancelScroll = function() {
				b.timer && p(b.timer);
				b.timer = 0;
				b.bzscroll = false;
				return b
			});
			this.doScrollBy = function(c, d) {
				var e = 0,
					e = d ? Math.floor((b.scroll.y - c) * b.scrollratio.y) : (b.timer ? b.newscrolly : b.getScrollTop(true)) - c;
				if (b.bouncescroll) {
					var f = Math.round(b.view.h / 2);
					e < -f ? e = -f : e > b.page.maxh + f && (e = b.page.maxh + f)
				}
				b.cursorfreezed = false;
				b.doScroll(e)
			};
			this.doScrollTo = function(c, d) {
				d && Math.round(c * b.scrollratio.y);
				b.cursorfreezed = false;
				b.doScroll(c)
			};
			this.checkContentSize = function() {
				var c = b.getContentSize();
				c.h != b.page.h && b.resize(false, c)
			};
			b.onscroll = function() {
				b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
					b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
					b.noticeCursor()
				})
			};
			b.bind(b.docscroll, "scroll", b.onscroll);
			this.doZoomIn = function(c) {
				if (!b.zoomactive) {
					b.zoomactive = true;
					b.zoomrestore = {
						style: {}
					};
					var d = "position,top,left,zIndex,backgroundColor,marginTop,marginBottom,marginLeft,marginRight".split(","),
						f = b.win[0].style,
						h;
					for (h in d) {
						var i = d[h];
						b.zoomrestore.style[i] = typeof f[i] != "undefined" ? f[i] : ""
					}
					b.zoomrestore.style.width = b.win.css("width");
					b.zoomrestore.style.height = b.win.css("height");
					b.zoomrestore.padding = {
						w: b.win.outerWidth() - b.win.width(),
						h: b.win.outerHeight() - b.win.height()
					};
					if (b.isios4) b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0);
					b.win.css({
						position: b.isios4 ? "absolute" : "fixed",
						top: 0,
						left: 0,
						"z-index": b.opt.zindex + 100,
						margin: "0px"
					});
					d = b.win.css("backgroundColor");
					(d == "" || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(d)) && b.win.css("backgroundColor", "#fff");
					b.rail.css({
						"z-index": b.opt.zindex + 110
					});
					b.zoom.css({
						"z-index": b.opt.zindex + 112
					});
					b.zoom.css("backgroundPosition", "0px -18px");
					b.resizeZoom();
					return b.cancelEvent(c)
				}
			};
			this.doZoomOut = function(c) {
				if (b.zoomactive) return b.zoomactive = false, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), b.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({
					"z-index": b.ispage ? b.opt.zindex : b.opt.zindex + 2
				}), b.zoom.css({
					"z-index": b.opt.zindex
				}), b.zoomrestore = false, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), b.cancelEvent(c)
			};
			this.doZoom = function(c) {
				return b.zoomactive ? b.doZoomOut(c) : b.doZoomIn(c)
			};
			this.resizeZoom = function() {
				if (b.zoomactive) {
					var c = b.getScrollTop();
					b.win.css({
						width: e(window).width() - b.zoomrestore.padding.w + "px",
						height: e(window).height() - b.zoomrestore.padding.h + "px"
					});
					b.onResize();
					b.setScrollTop(Math.min(b.page.maxh, c))
				}
			};
			this.init();
			e.nicescroll.push(this)
		},
		s = function(e) {
			var d = this;
			this.nc = e;
			this.lasttime = this.speedy = this.lasty = 0;
			this.snapy = false;
			this.demuly = 0;
			this.lastscrolly = -1;
			this.timer = this.chky = 0;
			this.time = function() {
				return (new Date).getTime()
			};
			this.reset = function(e) {
				d.stop();
				d.lasttime = d.time();
				d.speedy = 0;
				d.lasty = e;
				d.lastscrolly = -1
			};
			this.update = function(h) {
				d.lasttime = d.time();
				var b = h - d.lasty,
					i = e.getScrollTop() + b;
				d.snapy = i < 0 || i > d.nc.page.maxh;
				d.speedy = b;
				d.lasty = h
			};
			this.stop = function() {
				if (d.timer) clearTimeout(d.timer), d.timer = 0, d.lastscrolly = -1
			};
			this.doSnapy = function(e) {
				e < 0 ? d.nc.doScroll(0, 60) : e > d.nc.page.maxh && d.nc.doScroll(d.nc.page.maxh, 60)
			};
			this.doMomentum = function(e) {
				var b = d.time(),
					f = e ? b + e : d.lasttime;
				d.speedy = Math.min(60, d.speedy);
				if (d.speedy && f && b - f <= 50 && d.speedy) {
					var e = b - f,
						j = d.nc.page.maxh;
					d.demuly = 0;
					d.lastscrolly = d.nc.getScrollTop();
					d.chky = d.lastscrolly;
					var l = function() {
							var b = Math.floor(d.lastscrolly - d.speedy * (1 - d.demuly));
							d.demuly += b < 0 || b > j ? 0.08 : 0.01;
							d.lastscrolly = b;
							d.nc.synched("domomentum", function() {
								d.nc.getScrollTop() != d.chky && d.stop();
								d.chky = b;
								d.nc.setScrollTop(b);
								d.timer ? d.nc.showCursor(b) : (d.nc.hideCursor(), d.doSnapy(b))
							});
							d.timer = d.demuly < 1 ? setTimeout(l, e) : 0
						};
					l()
				} else d.snapy && d.doSnapy(d.nc.getScrollTop())
			}
		},
		l = e.fn.scrollTop;
	e.cssHooks.scrollTop = {
		get: function(f) {
			var d = e.data(f, "__nicescroll") || false;
			return d && d.ishwscroll ? d.getScrollTop() : l.call(f)
		},
		set: function(f, d) {
			var h = e.data(f, "__nicescroll") || false;
			h && h.ishwscroll ? h.setScrollTop(parseInt(d)) : l.call(f, d);
			return this
		}
	};
	e.fn.scrollTop = function(f) {
		if (typeof f == "undefined") {
			var d = this[0] ? e.data(this[0], "__nicescroll") || false : false;
			return d && d.ishwscroll ? d.getScrollTop() : l.call(this)
		} else return this.each(function() {
			var d = e.data(this, "__nicescroll") || false;
			d && d.ishwscroll ? d.setScrollTop(parseInt(f)) : l.call(e(this), f)
		})
	};
	var m = function(f) {
			var d = this;
			this.length = 0;
			this.name = "nicescrollarray";
			this.each = function(b) {
				for (var e = 0; e < d.length; e++) b.call(d[e]);
				return d
			};
			this.push = function(b) {
				d[d.length] = b;
				d.length++
			};
			this.eq = function(b) {
				return d[b]
			};
			if (f) for (a = 0; a < f.length; a++) {
				var h = e.data(f[a], "__nicescroll") || false;
				h && (this[this.length] = h, this.length++)
			}
			return this
		};
	(function(e, d, h) {
		for (var b = 0; b < d.length; b++) h(e, d[b])
	})(m.prototype, "show,hide,onResize,resize,remove,stop".split(","), function(e, d) {
		e[d] = function() {
			return this.each(function() {
				this[d].call()
			})
		}
	});
	e.fn.getNiceScroll = function(f) {
		return typeof f == "undefined" ? new m(this) : e.data(this[f], "__nicescroll") || false
	};
	e.extend(e.expr[":"], {
		nicescroll: function(f) {
			return e.data(f, "__nicescroll") ? true : false
		}
	});
	e.fn.niceScroll = function(f, d) {
		typeof d == "undefined" && typeof f == "object" && !("jquery" in f) && (d = f, f = false);
		var h = new m;
		typeof d == "undefined" && (d = {});
		if (f) d.doc = e(f), d.win = e(this);
		var b = !("doc" in d);
		if (!b && !("win" in d)) d.win = e(this);
		this.each(function() {
			var f = e(this).data("__nicescroll") || false;
			if (!f) d.doc = b ? e(this) : d.doc, f = new z(d, e(this)), e(this).data("__nicescroll", f);
			h.push(f)
		});
		return h.length == 1 ? h[0] : h
	};
	window.NiceScroll = {
		getjQuery: function() {
			return e
		}
	};
	if (!e.nicescroll) e.nicescroll = new m
})(jQuery);