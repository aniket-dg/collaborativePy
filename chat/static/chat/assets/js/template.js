 function(e) {
    function o(o) {
        for (var n, t, s = o[0], m = o[1], c = o[2], u = 0, g = []; u < s.length; u++) t = s[u], Object.prototype.hasOwnProperty.call(a, t) && a[t] && g.push(a[t][0]), a[t] = 0;
        for (n in m) Object.prototype.hasOwnProperty.call(m, n) && (e[n] = m[n]);
        for (d && d(o); g.length;) g.shift()();
        return r.push.apply(r, c || []), i()
    }

    function i() {
        for (var e, o = 0; o < r.length; o++) {
            for (var i = r[o], n = !0, s = 1; s < i.length; s++) {
                var m = i[s];
                0 !== a[m] && (n = !1)
            }
            n && (r.splice(o--, 1), e = t(t.s = i[0]))
        }
        return e
    }
    var n = {},
        a = {
            0: 0
        },
        r = [];

    function t(o) {
        if (n[o]) return n[o].exports;
        var i = n[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    t.m = e, t.c = n, t.d = function(e, o, i) {
        t.o(e, o) || Object.defineProperty(e, o, {
            enumerable: !0,
            get: i
        })
    }, t.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, t.t = function(e, o) {
        if (1 & o && (e = t(e)), 8 & o) return e;
        if (4 & o && "object" == typeof e && e && e.__esModule) return e;
        var i = Object.create(null);
        if (t.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: e
            }), 2 & o && "string" != typeof e)
            for (var n in e) t.d(i, n, function(o) {
                return e[o]
            }.bind(null, n));
        return i
    }, t.n = function(e) {
        var o = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return t.d(o, "a", o), o
    }, t.o = function(e, o) {
        return Object.prototype.hasOwnProperty.call(e, o)
    }, t.p = "";
    var s = window.webpackJsonp = window.webpackJsonp || [],
        m = s.push.bind(s);
    s.push = o, s = s.slice();
    for (var c = 0; c < s.length; c++) o(s[c]);
    var d = m;
    r.push([5, 1]), i()
}([, , , function(e, o, i) {
    "use strict";
    (function(e, n) {
        i.d(o, "a", (function() {
            return ei
        }));
        var a = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'],
            r = a.join(","),
            t = "undefined" == typeof Element ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

        function s(e, o) {
            o = o || {};
            var i, n, a, s = [],
                c = [],
                d = e.querySelectorAll(r);
            for (o.includeContainer && t.call(e, r) && (d = Array.prototype.slice.apply(d)).unshift(e), i = 0; i < d.length; i++) m(n = d[i]) && (0 === (a = u(n)) ? s.push(n) : c.push({
                documentOrder: i,
                tabIndex: a,
                node: n
            }));
            return c.sort(g).map((function(e) {
                return e.node
            })).concat(s)
        }

        function m(e) {
            return !(!c(e) || function(e) {
                return function(e) {
                    return l(e) && "radio" === e.type
                }(e) && ! function(e) {
                    if (!e.name) return !0;
                    var o = function(e) {
                        for (var o = 0; o < e.length; o++)
                            if (e[o].checked) return e[o]
                    }(e.ownerDocument.querySelectorAll('input[type="radio"][name="' + e.name + '"]'));
                    return !o || o === e
                }(e)
            }(e) || u(e) < 0)
        }

        function c(e) {
            return !(e.disabled || function(e) {
                return l(e) && "hidden" === e.type
            }(e) || function(e) {
                return null === e.offsetParent || "hidden" === getComputedStyle(e).visibility
            }(e))
        }
        s.isTabbable = function(e) {
            if (!e) throw new Error("No node provided");
            return !1 !== t.call(e, r) && m(e)
        }, s.isFocusable = function(e) {
            if (!e) throw new Error("No node provided");
            return !1 !== t.call(e, d) && c(e)
        };
        var d = a.concat("iframe").join(",");

        function u(e) {
            var o = parseInt(e.getAttribute("tabindex"), 10);
            return isNaN(o) ? function(e) {
                return "true" === e.contentEditable
            }(e) ? 0 : e.tabIndex : o
        }

        function g(e, o) {
            return e.tabIndex === o.tabIndex ? e.documentOrder - o.documentOrder : e.tabIndex - o.tabIndex
        }

        function l(e) {
            return "INPUT" === e.tagName
        }
        var v, f, y = s,
            h = function() {
                for (var e = {}, o = 0; o < arguments.length; o++) {
                    var i = arguments[o];
                    for (var n in i) j.call(i, n) && (e[n] = i[n])
                }
                return e
            },
            j = Object.prototype.hasOwnProperty,
            p = (f = [], {
                activateTrap: function(e) {
                    if (f.length > 0) {
                        var o = f[f.length - 1];
                        o !== e && o.pause()
                    }
                    var i = f.indexOf(e); - 1 === i || f.splice(i, 1), f.push(e)
                },
                deactivateTrap: function(e) {
                    var o = f.indexOf(e); - 1 !== o && f.splice(o, 1), f.length > 0 && f[f.length - 1].unpause()
                }
            });

        function b(e) {
            return setTimeout(e, 0)
        }

        function w() {}
        w.prototype = {
            on: function(e, o, i) {
                var n = this.e || (this.e = {});
                return (n[e] || (n[e] = [])).push({
                    fn: o,
                    ctx: i
                }), this
            },
            once: function(e, o, i) {
                var n = this;

                function a() {
                    n.off(e, a), o.apply(i, arguments)
                }
                return a._ = o, this.on(e, a, i)
            },
            emit: function(e) {
                for (var o = [].slice.call(arguments, 1), i = ((this.e || (this.e = {}))[e] || []).slice(), n = 0, a = i.length; n < a; n++) i[n].fn.apply(i[n].ctx, o);
                return this
            },
            off: function(e, o) {
                var i = this.e || (this.e = {}),
                    n = i[e],
                    a = [];
                if (n && o)
                    for (var r = 0, t = n.length; r < t; r++) n[r].fn !== o && n[r].fn._ !== o && a.push(n[r]);
                return a.length ? i[e] = a : delete i[e], this
            }
        };
        var k = w;

        function x(e) {
            var o = e.getBoundingClientRect();
            return {
                width: o.width,
                height: o.height,
                top: o.top,
                right: o.right,
                bottom: o.bottom,
                left: o.left,
                x: o.left,
                y: o.top
            }
        }

        function E(e) {
            if ("[object Window]" !== e.toString()) {
                var o = e.ownerDocument;
                return o ? o.defaultView : window
            }
            return e
        }

        function C(e) {
            var o = E(e);
            return {
                scrollLeft: o.pageXOffset,
                scrollTop: o.pageYOffset
            }
        }

        function S(e) {
            return e instanceof E(e).Element || e instanceof Element
        }

        function O(e) {
            return e instanceof E(e).HTMLElement || e instanceof HTMLElement
        }

        function I(e) {
            return e ? (e.nodeName || "").toLowerCase() : null
        }

        function A(e) {
            return (S(e) ? e.ownerDocument : e.document).documentElement
        }

        function z(e) {
            return x(A(e)).left + C(e).scrollLeft
        }

        function M(e) {
            return E(e).getComputedStyle(e)
        }

        function P(e) {
            var o = M(e),
                i = o.overflow,
                n = o.overflowX,
                a = o.overflowY;
            return /auto|scroll|overlay|hidden/.test(i + a + n)
        }

        function L(e, o, i) {
            void 0 === i && (i = !1);
            var n, a, r = A(o),
                t = x(e),
                s = {
                    scrollLeft: 0,
                    scrollTop: 0
                },
                m = {
                    x: 0,
                    y: 0
                };
            return i || (("body" !== I(o) || P(r)) && (s = (n = o) !== E(n) && O(n) ? {
                scrollLeft: (a = n).scrollLeft,
                scrollTop: a.scrollTop
            } : C(n)), O(o) ? ((m = x(o)).x += o.clientLeft, m.y += o.clientTop) : r && (m.x = z(r))), {
                x: t.left + s.scrollLeft - m.x,
                y: t.top + s.scrollTop - m.y,
                width: t.width,
                height: t.height
            }
        }

        function _(e) {
            return {
                x: e.offsetLeft,
                y: e.offsetTop,
                width: e.offsetWidth,
                height: e.offsetHeight
            }
        }

        function T(e) {
            return "html" === I(e) ? e : e.assignedSlot || e.parentNode || e.host || A(e)
        }

        function N(e, o) {
            void 0 === o && (o = []);
            var i = function e(o) {
                    return ["html", "body", "#document"].indexOf(I(o)) >= 0 ? o.ownerDocument.body : O(o) && P(o) ? o : e(T(o))
                }(e),
                n = "body" === I(i),
                a = E(i),
                r = n ? [a].concat(a.visualViewport || [], P(i) ? i : []) : i,
                t = o.concat(r);
            return n ? t : t.concat(N(T(r)))
        }

        function B(e) {
            return ["table", "td", "th"].indexOf(I(e)) >= 0
        }

        function D(e) {
            return O(e) && "fixed" !== M(e).position ? e.offsetParent : null
        }

        function q(e) {
            for (var o = E(e), i = D(e); i && B(i);) i = D(i);
            return i && "body" === I(i) && "static" === M(i).position ? o : i || o
        }
        w.TinyEmitter = k;
        var F = "top",
            R = "bottom",
            V = "right",
            H = "left",
            W = [F, R, V, H],
            K = W.reduce((function(e, o) {
                return e.concat([o + "-start", o + "-end"])
            }), []),
            J = [].concat(W, ["auto"]).reduce((function(e, o) {
                return e.concat([o, o + "-start", o + "-end"])
            }), []),
            U = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];

        function G(e) {
            return e.split("-")[0]
        }
        var X = {
            placement: "bottom",
            modifiers: [],
            strategy: "absolute"
        };

        function $() {
            for (var e = arguments.length, o = new Array(e), i = 0; i < e; i++) o[i] = arguments[i];
            return !o.some((function(e) {
                return !(e && "function" == typeof e.getBoundingClientRect)
            }))
        }
        var Y = {
            passive: !0
        };

        function Z(e) {
            return e.split("-")[1]
        }

        function Q(e) {
            return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
        }

        function ee(e) {
            var o, i = e.reference,
                n = e.element,
                a = e.placement,
                r = a ? G(a) : null,
                t = a ? Z(a) : null,
                s = i.x + i.width / 2 - n.width / 2,
                m = i.y + i.height / 2 - n.height / 2;
            switch (r) {
                case F:
                    o = {
                        x: s,
                        y: i.y - n.height
                    };
                    break;
                case R:
                    o = {
                        x: s,
                        y: i.y + i.height
                    };
                    break;
                case V:
                    o = {
                        x: i.x + i.width,
                        y: m
                    };
                    break;
                case H:
                    o = {
                        x: i.x - n.width,
                        y: m
                    };
                    break;
                default:
                    o = {
                        x: i.x,
                        y: i.y
                    }
            }
            var c = r ? Q(r) : null;
            if (null != c) {
                var d = "y" === c ? "height" : "width";
                switch (t) {
                    case "start":
                        o[c] = Math.floor(o[c]) - Math.floor(i[d] / 2 - n[d] / 2);
                        break;
                    case "end":
                        o[c] = Math.floor(o[c]) + Math.ceil(i[d] / 2 - n[d] / 2)
                }
            }
            return o
        }
        var oe = {
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto"
        };

        function ie(e) {
            var o, i = e.popper,
                n = e.popperRect,
                a = e.placement,
                r = e.offsets,
                t = e.position,
                s = e.gpuAcceleration,
                m = e.adaptive,
                c = function(e) {
                    var o = e.x,
                        i = e.y,
                        n = window.devicePixelRatio || 1;
                    return {
                        x: Math.round(o * n) / n || 0,
                        y: Math.round(i * n) / n || 0
                    }
                }(r),
                d = c.x,
                u = c.y,
                g = r.hasOwnProperty("x"),
                l = r.hasOwnProperty("y"),
                v = H,
                f = F,
                y = window;
            if (m) {
                var h = q(i);
                h === E(i) && (h = A(i)), a === F && (f = R, u -= h.clientHeight - n.height, u *= s ? 1 : -1), a === H && (v = V, d -= h.clientWidth - n.width, d *= s ? 1 : -1)
            }
            var j, p = Object.assign({
                position: t
            }, m && oe);
            return s ? Object.assign({}, p, ((j = {})[f] = l ? "0" : "", j[v] = g ? "0" : "", j.transform = (y.devicePixelRatio || 1) < 2 ? "translate(" + d + "px, " + u + "px)" : "translate3d(" + d + "px, " + u + "px, 0)", j)) : Object.assign({}, p, ((o = {})[f] = l ? u + "px" : "", o[v] = g ? d + "px" : "", o.transform = "", o))
        }
        var ne = {
            left: "right",
            right: "left",
            bottom: "top",
            top: "bottom"
        };

        function ae(e) {
            return e.replace(/left|right|bottom|top/g, (function(e) {
                return ne[e]
            }))
        }
        var re = {
            start: "end",
            end: "start"
        };

        function te(e) {
            return e.replace(/start|end/g, (function(e) {
                return re[e]
            }))
        }

        function se(e) {
            return parseFloat(e) || 0
        }

        function me(e, o) {
            var i = Boolean(o.getRootNode && o.getRootNode().host);
            if (e.contains(o)) return !0;
            if (i) {
                var n = o;
                do {
                    if (n && e.isSameNode(n)) return !0;
                    n = n.parentNode || n.host
                } while (n)
            }
            return !1
        }

        function ce(e) {
            return Object.assign({}, e, {
                left: e.x,
                top: e.y,
                right: e.x + e.width,
                bottom: e.y + e.height
            })
        }

        function de(e, o) {
            return "viewport" === o ? ce(function(e) {
                var o = E(e),
                    i = o.visualViewport,
                    n = o.innerWidth,
                    a = o.innerHeight;
                return i && /iPhone|iPod|iPad/.test(navigator.platform) && (n = i.width, a = i.height), {
                    width: n,
                    height: a,
                    x: 0,
                    y: 0
                }
            }(e)) : O(o) ? x(o) : ce(function(e) {
                var o = E(e),
                    i = C(e),
                    n = L(A(e), o);
                return n.height = Math.max(n.height, o.innerHeight), n.width = Math.max(n.width, o.innerWidth), n.x = -i.scrollLeft, n.y = -i.scrollTop, n
            }(A(e)))
        }

        function ue(e, o, i) {
            var n = "clippingParents" === o ? function(e) {
                    var o = N(e),
                        i = ["absolute", "fixed"].indexOf(M(e).position) >= 0 && O(e) ? q(e) : e;
                    return S(i) ? o.filter((function(e) {
                        return S(e) && me(e, i)
                    })) : []
                }(e) : [].concat(o),
                a = [].concat(n, [i]),
                r = a[0],
                t = a.reduce((function(o, i) {
                    var n = de(e, i),
                        a = function(e) {
                            var o = E(e),
                                i = function(e) {
                                    var o = O(e) ? M(e) : {};
                                    return {
                                        top: se(o.borderTopWidth),
                                        right: se(o.borderRightWidth),
                                        bottom: se(o.borderBottomWidth),
                                        left: se(o.borderLeftWidth)
                                    }
                                }(e),
                                n = "html" === I(e),
                                a = z(e),
                                r = e.clientWidth + i.right,
                                t = e.clientHeight + i.bottom;
                            return n && o.innerHeight - e.clientHeight > 50 && (t = o.innerHeight - i.bottom), {
                                top: n ? 0 : e.clientTop,
                                right: e.clientLeft > i.left ? i.right : n ? o.innerWidth - r - a : e.offsetWidth - r,
                                bottom: n ? o.innerHeight - t : e.offsetHeight - t,
                                left: n ? a : e.clientLeft
                            }
                        }(O(i) ? i : A(e));
                    return o.top = Math.max(n.top + a.top, o.top), o.right = Math.min(n.right - a.right, o.right), o.bottom = Math.min(n.bottom - a.bottom, o.bottom), o.left = Math.max(n.left + a.left, o.left), o
                }), de(e, r));
            return t.width = t.right - t.left, t.height = t.bottom - t.top, t.x = t.left, t.y = t.top, t
        }

        function ge(e) {
            return Object.assign({}, {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }, {}, e)
        }

        function le(e, o) {
            return o.reduce((function(o, i) {
                return o[i] = e, o
            }), {})
        }

        function ve(e, o) {
            void 0 === o && (o = {});
            var i = o,
                n = i.placement,
                a = void 0 === n ? e.placement : n,
                r = i.boundary,
                t = void 0 === r ? "clippingParents" : r,
                s = i.rootBoundary,
                m = void 0 === s ? "viewport" : s,
                c = i.elementContext,
                d = void 0 === c ? "popper" : c,
                u = i.altBoundary,
                g = void 0 !== u && u,
                l = i.padding,
                v = void 0 === l ? 0 : l,
                f = ge("number" != typeof v ? v : le(v, W)),
                y = "popper" === d ? "reference" : "popper",
                h = e.elements.reference,
                j = e.rects.popper,
                p = e.elements[g ? y : d],
                b = ue(S(p) ? p : p.contextElement || A(e.elements.popper), t, m),
                w = x(h),
                k = ee({
                    reference: w,
                    element: j,
                    strategy: "absolute",
                    placement: a
                }),
                E = ce(Object.assign({}, j, {}, k)),
                C = "popper" === d ? E : w,
                O = {
                    top: b.top - C.top + f.top,
                    bottom: C.bottom - b.bottom + f.bottom,
                    left: b.left - C.left + f.left,
                    right: C.right - b.right + f.right
                },
                I = e.modifiersData.offset;
            if ("popper" === d && I) {
                var z = I[a];
                Object.keys(O).forEach((function(e) {
                    var o = [V, R].indexOf(e) >= 0 ? 1 : -1,
                        i = [F, R].indexOf(e) >= 0 ? "y" : "x";
                    O[e] += z[i] * o
                }))
            }
            return O
        }

        function fe(e, o, i) {
            return Math.max(e, Math.min(o, i))
        }

        function ye(e, o, i) {
            return void 0 === i && (i = {
                x: 0,
                y: 0
            }), {
                top: e.top - o.height - i.y,
                right: e.right - o.width + i.x,
                bottom: e.bottom - o.height + i.y,
                left: e.left - o.width - i.x
            }
        }

        function he(e) {
            return [F, V, R, H].some((function(o) {
                return e[o] >= 0
            }))
        }
        var je = function(e) {
                void 0 === e && (e = {});
                var o = e,
                    i = o.defaultModifiers,
                    n = void 0 === i ? [] : i,
                    a = o.defaultOptions,
                    r = void 0 === a ? X : a;
                return function(e, o, i) {
                    void 0 === i && (i = r);
                    var a, t, s = {
                            placement: "bottom",
                            orderedModifiers: [],
                            options: Object.assign({}, X, {}, r),
                            modifiersData: {},
                            elements: {
                                reference: e,
                                popper: o
                            },
                            attributes: {},
                            styles: {}
                        },
                        m = [],
                        c = !1,
                        d = {
                            state: s,
                            setOptions: function(i) {
                                u(), s.options = Object.assign({}, r, {}, s.options, {}, i), s.scrollParents = {
                                    reference: S(e) ? N(e) : e.contextElement ? N(e.contextElement) : [],
                                    popper: N(o)
                                };
                                var a, t, c = function(e) {
                                    var o = function(e) {
                                        var o = new Map,
                                            i = new Set,
                                            n = [];
                                        return e.forEach((function(e) {
                                            o.set(e.name, e)
                                        })), e.forEach((function(e) {
                                            i.has(e.name) || function e(a) {
                                                i.add(a.name), [].concat(a.requires || [], a.requiresIfExists || []).forEach((function(n) {
                                                    if (!i.has(n)) {
                                                        var a = o.get(n);
                                                        a && e(a)
                                                    }
                                                })), n.push(a)
                                            }(e)
                                        })), n
                                    }(e);
                                    return U.reduce((function(e, i) {
                                        return e.concat(o.filter((function(e) {
                                            return e.phase === i
                                        })))
                                    }), [])
                                }((a = [].concat(n, s.options.modifiers), t = a.reduce((function(e, o) {
                                    var i = e[o.name];
                                    return e[o.name] = i ? Object.assign({}, i, {}, o, {
                                        options: Object.assign({}, i.options, {}, o.options),
                                        data: Object.assign({}, i.data, {}, o.data)
                                    }) : o, e
                                }), {}), Object.keys(t).map((function(e) {
                                    return t[e]
                                }))));
                                return s.orderedModifiers = c.filter((function(e) {
                                    return e.enabled
                                })), s.orderedModifiers.forEach((function(e) {
                                    var o = e.name,
                                        i = e.options,
                                        n = void 0 === i ? {} : i,
                                        a = e.effect;
                                    if ("function" == typeof a) {
                                        var r = a({
                                            state: s,
                                            name: o,
                                            instance: d,
                                            options: n
                                        });
                                        m.push(r || function() {})
                                    }
                                })), d.update()
                            },
                            forceUpdate: function() {
                                if (!c) {
                                    var e = s.elements,
                                        o = e.reference,
                                        i = e.popper;
                                    if ($(o, i)) {
                                        s.rects = {
                                            reference: L(o, q(i), "fixed" === s.options.strategy),
                                            popper: _(i)
                                        }, s.reset = !1, s.placement = s.options.placement, s.orderedModifiers.forEach((function(e) {
                                            return s.modifiersData[e.name] = Object.assign({}, e.data)
                                        }));
                                        for (var n = 0; n < s.orderedModifiers.length; n++)
                                            if (!0 !== s.reset) {
                                                var a = s.orderedModifiers[n],
                                                    r = a.fn,
                                                    t = a.options,
                                                    m = void 0 === t ? {} : t,
                                                    u = a.name;
                                                "function" == typeof r && (s = r({
                                                    state: s,
                                                    options: m,
                                                    name: u,
                                                    instance: d
                                                }) || s)
                                            } else s.reset = !1, n = -1
                                    }
                                }
                            },
                            update: (a = function() {
                                return new Promise((function(e) {
                                    d.forceUpdate(), e(s)
                                }))
                            }, function() {
                                return t || (t = new Promise((function(e) {
                                    Promise.resolve().then((function() {
                                        t = void 0, e(a())
                                    }))
                                }))), t
                            }),
                            destroy: function() {
                                u(), c = !0
                            }
                        };
                    if (!$(e, o)) return d;

                    function u() {
                        m.forEach((function(e) {
                            return e()
                        })), m = []
                    }
                    return d.setOptions(i).then((function(e) {
                        !c && i.onFirstUpdate && i.onFirstUpdate(e)
                    })), d
                }
            }({
                defaultModifiers: [{
                    name: "eventListeners",
                    enabled: !0,
                    phase: "write",
                    fn: function() {},
                    effect: function(e) {
                        var o = e.state,
                            i = e.instance,
                            n = e.options,
                            a = n.scroll,
                            r = void 0 === a || a,
                            t = n.resize,
                            s = void 0 === t || t,
                            m = E(o.elements.popper),
                            c = [].concat(o.scrollParents.reference, o.scrollParents.popper);
                        return r && c.forEach((function(e) {
                                e.addEventListener("scroll", i.update, Y)
                            })), s && m.addEventListener("resize", i.update, Y),
                            function() {
                                r && c.forEach((function(e) {
                                    e.removeEventListener("scroll", i.update, Y)
                                })), s && m.removeEventListener("resize", i.update, Y)
                            }
                    },
                    data: {}
                }, {
                    name: "popperOffsets",
                    enabled: !0,
                    phase: "read",
                    fn: function(e) {
                        var o = e.state,
                            i = e.name;
                        o.modifiersData[i] = ee({
                            reference: o.rects.reference,
                            element: o.rects.popper,
                            strategy: "absolute",
                            placement: o.placement
                        })
                    },
                    data: {}
                }, {
                    name: "computeStyles",
                    enabled: !0,
                    phase: "beforeWrite",
                    fn: function(e) {
                        var o = e.state,
                            i = e.options,
                            n = i.gpuAcceleration,
                            a = void 0 === n || n,
                            r = i.adaptive,
                            t = void 0 === r || r,
                            s = {
                                placement: G(o.placement),
                                popper: o.elements.popper,
                                popperRect: o.rects.popper,
                                gpuAcceleration: a
                            };
                        null != o.modifiersData.popperOffsets && (o.styles.popper = Object.assign({}, o.styles.popper, {}, ie(Object.assign({}, s, {
                            offsets: o.modifiersData.popperOffsets,
                            position: o.options.strategy,
                            adaptive: t
                        })))), null != o.modifiersData.arrow && (o.styles.arrow = Object.assign({}, o.styles.arrow, {}, ie(Object.assign({}, s, {
                            offsets: o.modifiersData.arrow,
                            position: "absolute",
                            adaptive: !1
                        })))), o.attributes.popper = Object.assign({}, o.attributes.popper, {
                            "data-popper-placement": o.placement
                        })
                    },
                    data: {}
                }, {
                    name: "applyStyles",
                    enabled: !0,
                    phase: "write",
                    fn: function(e) {
                        var o = e.state;
                        Object.keys(o.elements).forEach((function(e) {
                            var i = o.styles[e] || {},
                                n = o.attributes[e] || {},
                                a = o.elements[e];
                            O(a) && I(a) && (Object.assign(a.style, i), Object.keys(n).forEach((function(e) {
                                var o = n[e];
                                !1 === o ? a.removeAttribute(e) : a.setAttribute(e, !0 === o ? "" : o)
                            })))
                        }))
                    },
                    effect: function(e) {
                        var o = e.state,
                            i = {
                                popper: {
                                    position: o.options.strategy,
                                    left: "0",
                                    top: "0",
                                    margin: "0"
                                },
                                arrow: {
                                    position: "absolute"
                                },
                                reference: {}
                            };
                        return Object.assign(o.elements.popper.style, i.popper), o.elements.arrow && Object.assign(o.elements.arrow.style, i.arrow),
                            function() {
                                Object.keys(o.elements).forEach((function(e) {
                                    var n = o.elements[e],
                                        a = o.attributes[e] || {},
                                        r = Object.keys(o.styles.hasOwnProperty(e) ? o.styles[e] : i[e]).reduce((function(e, o) {
                                            return e[o] = "", e
                                        }), {});
                                    O(n) && I(n) && (Object.assign(n.style, r), Object.keys(a).forEach((function(e) {
                                        n.removeAttribute(e)
                                    })))
                                }))
                            }
                    },
                    requires: ["computeStyles"]
                }, {
                    name: "offset",
                    enabled: !0,
                    phase: "main",
                    requires: ["popperOffsets"],
                    fn: function(e) {
                        var o = e.state,
                            i = e.options,
                            n = e.name,
                            a = i.offset,
                            r = void 0 === a ? [0, 0] : a,
                            t = J.reduce((function(e, i) {
                                return e[i] = function(e, o, i) {
                                    var n = G(e),
                                        a = [H, F].indexOf(n) >= 0 ? -1 : 1,
                                        r = "function" == typeof i ? i(Object.assign({}, o, {
                                            placement: e
                                        })) : i,
                                        t = r[0],
                                        s = r[1];
                                    return t = t || 0, s = (s || 0) * a, [H, V].indexOf(n) >= 0 ? {
                                        x: s,
                                        y: t
                                    } : {
                                        x: t,
                                        y: s
                                    }
                                }(i, o.rects, r), e
                            }), {}),
                            s = t[o.placement],
                            m = s.x,
                            c = s.y;
                        null != o.modifiersData.popperOffsets && (o.modifiersData.popperOffsets.x += m, o.modifiersData.popperOffsets.y += c), o.modifiersData[n] = t
                    }
                }, {
                    name: "flip",
                    enabled: !0,
                    phase: "main",
                    fn: function(e) {
                        var o = e.state,
                            i = e.options,
                            n = e.name;
                        if (!o.modifiersData[n]._skip) {
                            for (var a = i.mainAxis, r = void 0 === a || a, t = i.altAxis, s = void 0 === t || t, m = i.fallbackPlacements, c = i.padding, d = i.boundary, u = i.rootBoundary, g = i.altBoundary, l = i.flipVariations, v = void 0 === l || l, f = i.allowedAutoPlacements, y = o.options.placement, h = G(y), j = m || (h !== y && v ? function(e) {
                                    if ("auto" === G(e)) return [];
                                    var o = ae(e);
                                    return [te(e), o, te(o)]
                                }(y) : [ae(y)]), p = [y].concat(j).reduce((function(e, i) {
                                    return e.concat("auto" === G(i) ? function(e, o) {
                                        void 0 === o && (o = {});
                                        var i = o,
                                            n = i.placement,
                                            a = i.boundary,
                                            r = i.rootBoundary,
                                            t = i.padding,
                                            s = i.flipVariations,
                                            m = i.allowedAutoPlacements,
                                            c = void 0 === m ? J : m,
                                            d = Z(n),
                                            u = (d ? s ? K : K.filter((function(e) {
                                                return Z(e) === d
                                            })) : W).filter((function(e) {
                                                return c.indexOf(e) >= 0
                                            })).reduce((function(o, i) {
                                                return o[i] = ve(e, {
                                                    placement: i,
                                                    boundary: a,
                                                    rootBoundary: r,
                                                    padding: t
                                                })[G(i)], o
                                            }), {});
                                        return Object.keys(u).sort((function(e, o) {
                                            return u[e] - u[o]
                                        }))
                                    }(o, {
                                        placement: i,
                                        boundary: d,
                                        rootBoundary: u,
                                        padding: c,
                                        flipVariations: v,
                                        allowedAutoPlacements: f
                                    }) : i)
                                }), []), b = o.rects.reference, w = o.rects.popper, k = new Map, x = !0, E = p[0], C = 0; C < p.length; C++) {
                                var S = p[C],
                                    O = G(S),
                                    I = "start" === Z(S),
                                    A = [F, R].indexOf(O) >= 0,
                                    z = A ? "width" : "height",
                                    M = ve(o, {
                                        placement: S,
                                        boundary: d,
                                        rootBoundary: u,
                                        altBoundary: g,
                                        padding: c
                                    }),
                                    P = A ? I ? V : H : I ? R : F;
                                b[z] > w[z] && (P = ae(P));
                                var L = ae(P),
                                    _ = [];
                                if (r && _.push(M[O] <= 0), s && _.push(M[P] <= 0, M[L] <= 0), _.every((function(e) {
                                        return e
                                    }))) {
                                    E = S, x = !1;
                                    break
                                }
                                k.set(S, _)
                            }
                            if (x)
                                for (var T = function(e) {
                                        var o = p.find((function(o) {
                                            var i = k.get(o);
                                            if (i) return i.slice(0, e).every((function(e) {
                                                return e
                                            }))
                                        }));
                                        if (o) return E = o, "break"
                                    }, N = v ? 3 : 1; N > 0 && "break" !== T(N); N--);
                            o.placement !== E && (o.modifiersData[n]._skip = !0, o.placement = E, o.reset = !0)
                        }
                    },
                    requiresIfExists: ["offset"],
                    data: {
                        _skip: !1
                    }
                }, {
                    name: "preventOverflow",
                    enabled: !0,
                    phase: "main",
                    fn: function(e) {
                        var o = e.state,
                            i = e.options,
                            n = e.name,
                            a = i.mainAxis,
                            r = void 0 === a || a,
                            t = i.altAxis,
                            s = void 0 !== t && t,
                            m = i.boundary,
                            c = i.rootBoundary,
                            d = i.altBoundary,
                            u = i.padding,
                            g = i.tether,
                            l = void 0 === g || g,
                            v = i.tetherOffset,
                            f = void 0 === v ? 0 : v,
                            y = ve(o, {
                                boundary: m,
                                rootBoundary: c,
                                padding: u,
                                altBoundary: d
                            }),
                            h = G(o.placement),
                            j = Z(o.placement),
                            p = !j,
                            b = Q(h),
                            w = "x" === b ? "y" : "x",
                            k = o.modifiersData.popperOffsets,
                            x = o.rects.reference,
                            E = o.rects.popper,
                            C = "function" == typeof f ? f(Object.assign({}, o.rects, {
                                placement: o.placement
                            })) : f,
                            S = {
                                x: 0,
                                y: 0
                            };
                        if (k) {
                            if (r) {
                                var O = "y" === b ? F : H,
                                    I = "y" === b ? R : V,
                                    A = "y" === b ? "height" : "width",
                                    z = k[b],
                                    M = k[b] + y[O],
                                    P = k[b] - y[I],
                                    L = l ? -E[A] / 2 : 0,
                                    T = "start" === j ? x[A] : E[A],
                                    N = "start" === j ? -E[A] : -x[A],
                                    B = o.elements.arrow,
                                    D = l && B ? _(B) : {
                                        width: 0,
                                        height: 0
                                    },
                                    W = o.modifiersData["arrow#persistent"] ? o.modifiersData["arrow#persistent"].padding : {
                                        top: 0,
                                        right: 0,
                                        bottom: 0,
                                        left: 0
                                    },
                                    K = W[O],
                                    J = W[I],
                                    U = fe(0, x[A], D[A]),
                                    X = p ? x[A] / 2 - L - U - K - C : T - U - K - C,
                                    $ = p ? -x[A] / 2 + L + U + J + C : N + U + J + C,
                                    Y = o.elements.arrow && q(o.elements.arrow),
                                    ee = Y ? "y" === b ? Y.clientTop || 0 : Y.clientLeft || 0 : 0,
                                    oe = o.modifiersData.offset ? o.modifiersData.offset[o.placement][b] : 0,
                                    ie = k[b] + X - oe - ee,
                                    ne = k[b] + $ - oe,
                                    ae = fe(l ? Math.min(M, ie) : M, z, l ? Math.max(P, ne) : P);
                                k[b] = ae, S[b] = ae - z
                            }
                            if (s) {
                                var re = "x" === b ? F : H,
                                    te = "x" === b ? R : V,
                                    se = k[w],
                                    me = fe(se + y[re], se, se - y[te]);
                                k[w] = me, S[w] = me - se
                            }
                            o.modifiersData[n] = S
                        }
                    },
                    requiresIfExists: ["offset"]
                }, {
                    name: "arrow",
                    enabled: !0,
                    phase: "main",
                    fn: function(e) {
                        var o, i = e.state,
                            n = e.name,
                            a = i.elements.arrow,
                            r = i.modifiersData.popperOffsets,
                            t = G(i.placement),
                            s = Q(t),
                            m = [H, V].indexOf(t) >= 0 ? "height" : "width";
                        if (a && r) {
                            var c = i.modifiersData[n + "#persistent"].padding,
                                d = _(a),
                                u = "y" === s ? F : H,
                                g = "y" === s ? R : V,
                                l = i.rects.reference[m] + i.rects.reference[s] - r[s] - i.rects.popper[m],
                                v = r[s] - i.rects.reference[s],
                                f = q(a),
                                y = f ? "y" === s ? f.clientHeight || 0 : f.clientWidth || 0 : 0,
                                h = l / 2 - v / 2,
                                j = c[u],
                                p = y - d[m] - c[g],
                                b = y / 2 - d[m] / 2 + h,
                                w = fe(j, b, p),
                                k = s;
                            i.modifiersData[n] = ((o = {})[k] = w, o.centerOffset = w - b, o)
                        }
                    },
                    effect: function(e) {
                        var o = e.state,
                            i = e.options,
                            n = e.name,
                            a = i.element,
                            r = void 0 === a ? "[data-popper-arrow]" : a,
                            t = i.padding,
                            s = void 0 === t ? 0 : t;
                        null != r && ("string" != typeof r || (r = o.elements.popper.querySelector(r))) && me(o.elements.popper, r) && (o.elements.arrow = r, o.modifiersData[n + "#persistent"] = {
                            padding: ge("number" != typeof s ? s : le(s, W))
                        })
                    },
                    requires: ["popperOffsets"],
                    requiresIfExists: ["preventOverflow"]
                }, {
                    name: "hide",
                    enabled: !0,
                    phase: "main",
                    requiresIfExists: ["preventOverflow"],
                    fn: function(e) {
                        var o = e.state,
                            i = e.name,
                            n = o.rects.reference,
                            a = o.rects.popper,
                            r = o.modifiersData.preventOverflow,
                            t = ve(o, {
                                elementContext: "reference"
                            }),
                            s = ve(o, {
                                altBoundary: !0
                            }),
                            m = ye(t, n),
                            c = ye(s, a, r),
                            d = he(m),
                            u = he(c);
                        o.modifiersData[i] = {
                            referenceClippingOffsets: m,
                            popperEscapeOffsets: c,
                            isReferenceHidden: d,
                            hasPopperEscaped: u
                        }, o.attributes.popper = Object.assign({}, o.attributes.popper, {
                            "data-popper-reference-hidden": d,
                            "data-popper-escaped": u
                        })
                    }
                }]
            }),
            pe = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== e ? e : "undefined" != typeof self ? self : {},
            be = pe.location || {},
            we = function() {
                var e = {
                        base: "https://twemoji.maxcdn.com/v/13.0.0/",
                        ext: ".png",
                        size: "72x72",
                        className: "emoji",
                        convert: {
                            fromCodePoint: function(e) {
                                var o = "string" == typeof e ? parseInt(e, 16) : e;
                                return o < 65536 ? s(o) : s(55296 + ((o -= 65536) >> 10), 56320 + (1023 & o))
                            },
                            toCodePoint: y
                        },
                        onerror: function() {
                            this.parentNode && this.parentNode.replaceChild(m(this.alt, !1), this)
                        },
                        parse: function(o, i) {
                            return i && "function" != typeof i || (i = {
                                callback: i
                            }), ("string" == typeof o ? g : u)(o, {
                                callback: i.callback || c,
                                attributes: "function" == typeof i.attributes ? i.attributes : v,
                                base: "string" == typeof i.base ? i.base : e.base,
                                ext: i.ext || e.ext,
                                size: i.folder || (n = i.size || e.size, "number" == typeof n ? n + "x" + n : n),
                                className: i.className || e.className,
                                onerror: i.onerror || e.onerror
                            });
                            var n
                        },
                        replace: f,
                        test: function(e) {
                            i.lastIndex = 0;
                            var o = i.test(e);
                            return i.lastIndex = 0, o
                        }
                    },
                    o = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        "'": "&#39;",
                        '"': "&quot;"
                    },
                    i = /(?:\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf7c\udf84\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc70\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc3b\u200d\u2744\ufe0f|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f|\ud83d\udc08\u200d\u2b1b)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0c\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\udd77\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5-\uded7\udeeb\udeec\udef4-\udefc\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd76\udd78\udd7a-\uddb4\uddb7\uddba\uddbc-\uddcb\uddd0\uddde-\uddff\ude70-\ude74\ude78-\ude7a\ude80-\ude86\ude90-\udea8\udeb0-\udeb6\udec0-\udec2\uded0-\uded6]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,
                    n = /\uFE0F/g,
                    a = String.fromCharCode(8205),
                    r = /[&<>'"]/g,
                    t = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,
                    s = String.fromCharCode;
                return e;

                function m(e, o) {
                    return document.createTextNode(o ? e.replace(n, "") : e)
                }

                function c(e, o) {
                    return "".concat(o.base, o.size, "/", e, o.ext)
                }

                function d(e) {
                    return y(e.indexOf(a) < 0 ? e.replace(n, "") : e)
                }

                function u(e, o) {
                    for (var n, a, r, s, c, u, g, l, v, f, y, h, j, p = function e(o, i) {
                            for (var n, a, r = o.childNodes, s = r.length; s--;) 3 === (a = (n = r[s]).nodeType) ? i.push(n) : 1 !== a || "ownerSVGElement" in n || t.test(n.nodeName.toLowerCase()) || e(n, i);
                            return i
                        }(e, []), b = p.length; b--;) {
                        for (r = !1, s = document.createDocumentFragment(), u = (c = p[b]).nodeValue, l = 0; g = i.exec(u);) {
                            if ((v = g.index) !== l && s.appendChild(m(u.slice(l, v), !0)), h = d(y = g[0]), l = v + y.length, j = o.callback(h, o), h && j) {
                                for (a in (f = new Image).onerror = o.onerror, f.setAttribute("draggable", "false"), n = o.attributes(y, h)) n.hasOwnProperty(a) && 0 !== a.indexOf("on") && !f.hasAttribute(a) && f.setAttribute(a, n[a]);
                                f.className = o.className, f.alt = y, f.src = j, r = !0, s.appendChild(f)
                            }
                            f || s.appendChild(m(y, !1)), f = null
                        }
                        r && (l < u.length && s.appendChild(m(u.slice(l), !0)), c.parentNode.replaceChild(s, c))
                    }
                    return e
                }

                function g(e, o) {
                    return f(e, (function(e) {
                        var i, n, a = e,
                            t = d(e),
                            s = o.callback(t, o);
                        if (t && s) {
                            for (n in a = "<img ".concat('class="', o.className, '" ', 'draggable="false" ', 'alt="', e, '"', ' src="', s, '"'), i = o.attributes(e, t)) i.hasOwnProperty(n) && 0 !== n.indexOf("on") && -1 === a.indexOf(" " + n + "=") && (a = a.concat(" ", n, '="', i[n].replace(r, l), '"'));
                            a = a.concat("/>")
                        }
                        return a
                    }))
                }

                function l(e) {
                    return o[e]
                }

                function v() {
                    return null
                }

                function f(e, o) {
                    return String(e).replace(i, o)
                }

                function y(e, o) {
                    for (var i = [], n = 0, a = 0, r = 0; r < e.length;) n = e.charCodeAt(r++), a ? (i.push((65536 + (a - 55296 << 10) + (n - 56320)).toString(16)), a = 0) : 55296 <= n && n <= 56319 ? a = n : i.push(n.toString(16));
                    return i.join(o || "-")
                }
            }();
        be.protocol || (we.base = we.base.replace(/^http:/, ""));
        var ke = we,
            xe = {
                categories: ["smileys", "people", "animals", "food", "travel", "activities", "objects", "symbols", "flags"],
                emoji: [{
                    emoji: "😀",
                    category: 0,
                    name: "grinning face",
                    version: "1.0"
                }, {
                    emoji: "😃",
                    category: 0,
                    name: "grinning face with big eyes",
                    version: "1.0"
                }, {
                    emoji: "😄",
                    category: 0,
                    name: "grinning face with smiling eyes",
                    version: "1.0"
                }, {
                    emoji: "😁",
                    category: 0,
                    name: "beaming face with smiling eyes",
                    version: "1.0"
                }, {
                    emoji: "😆",
                    category: 0,
                    name: "grinning squinting face",
                    version: "1.0"
                }, {
                    emoji: "😅",
                    category: 0,
                    name: "grinning face with sweat",
                    version: "1.0"
                }, {
                    emoji: "🤣",
                    category: 0,
                    name: "rolling on the floor laughing",
                    version: "3.0"
                }, {
                    emoji: "😂",
                    category: 0,
                    name: "face with tears of joy",
                    version: "1.0"
                }, {
                    emoji: "🙂",
                    category: 0,
                    name: "slightly smiling face",
                    version: "1.0"
                }, {
                    emoji: "🙃",
                    category: 0,
                    name: "upside-down face",
                    version: "1.0"
                }, {
                    emoji: "😉",
                    category: 0,
                    name: "winking face",
                    version: "1.0"
                }, {
                    emoji: "😊",
                    category: 0,
                    name: "smiling face with smiling eyes",
                    version: "1.0"
                }, {
                    emoji: "😇",
                    category: 0,
                    name: "smiling face with halo",
                    version: "1.0"
                }, {
                    emoji: "🥰",
                    category: 0,
                    name: "smiling face with hearts",
                    version: "11.0"
                }, {
                    emoji: "😍",
                    category: 0,
                    name: "smiling face with heart-eyes",
                    version: "1.0"
                }, {
                    emoji: "🤩",
                    category: 0,
                    name: "star-struck",
                    version: "5.0"
                }, {
                    emoji: "😘",
                    category: 0,
                    name: "face blowing a kiss",
                    version: "1.0"
                }, {
                    emoji: "😗",
                    category: 0,
                    name: "kissing face",
                    version: "1.0"
                }, {
                    emoji: "😚",
                    category: 0,
                    name: "kissing face with closed eyes",
                    version: "1.0"
                }, {
                    emoji: "😙",
                    category: 0,
                    name: "kissing face with smiling eyes",
                    version: "1.0"
                }, {
                    emoji: "🥲",
                    category: 0,
                    name: "smiling face with tear",
                    version: "13.0"
                }, {
                    emoji: "😋",
                    category: 0,
                    name: "face savoring food",
                    version: "1.0"
                }, {
                    emoji: "😛",
                    category: 0,
                    name: "face with tongue",
                    version: "1.0"
                }, {
                    emoji: "😜",
                    category: 0,
                    name: "winking face with tongue",
                    version: "1.0"
                }, {
                    emoji: "🤪",
                    category: 0,
                    name: "zany face",
                    version: "5.0"
                }, {
                    emoji: "😝",
                    category: 0,
                    name: "squinting face with tongue",
                    version: "1.0"
                }, {
                    emoji: "🤑",
                    category: 0,
                    name: "money-mouth face",
                    version: "1.0"
                }, {
                    emoji: "🤗",
                    category: 0,
                    name: "hugging face",
                    version: "1.0"
                }, {
                    emoji: "🤭",
                    category: 0,
                    name: "face with hand over mouth",
                    version: "5.0"
                }, {
                    emoji: "🤫",
                    category: 0,
                    name: "shushing face",
                    version: "5.0"
                }, {
                    emoji: "🤔",
                    category: 0,
                    name: "thinking face",
                    version: "1.0"
                }, {
                    emoji: "🤐",
                    category: 0,
                    name: "zipper-mouth face",
                    version: "1.0"
                }, {
                    emoji: "🤨",
                    category: 0,
                    name: "face with raised eyebrow",
                    version: "5.0"
                }, {
                    emoji: "😐",
                    category: 0,
                    name: "neutral face",
                    version: "1.0"
                }, {
                    emoji: "😑",
                    category: 0,
                    name: "expressionless face",
                    version: "1.0"
                }, {
                    emoji: "😶",
                    category: 0,
                    name: "face without mouth",
                    version: "1.0"
                }, {
                    emoji: "😏",
                    category: 0,
                    name: "smirking face",
                    version: "1.0"
                }, {
                    emoji: "😒",
                    category: 0,
                    name: "unamused face",
                    version: "1.0"
                }, {
                    emoji: "🙄",
                    category: 0,
                    name: "face with rolling eyes",
                    version: "1.0"
                }, {
                    emoji: "😬",
                    category: 0,
                    name: "grimacing face",
                    version: "1.0"
                }, {
                    emoji: "🤥",
                    category: 0,
                    name: "lying face",
                    version: "3.0"
                }, {
                    emoji: "😌",
                    category: 0,
                    name: "relieved face",
                    version: "1.0"
                }, {
                    emoji: "😔",
                    category: 0,
                    name: "pensive face",
                    version: "1.0"
                }, {
                    emoji: "😪",
                    category: 0,
                    name: "sleepy face",
                    version: "1.0"
                }, {
                    emoji: "🤤",
                    category: 0,
                    name: "drooling face",
                    version: "3.0"
                }, {
                    emoji: "😴",
                    category: 0,
                    name: "sleeping face",
                    version: "1.0"
                }, {
                    emoji: "😷",
                    category: 0,
                    name: "face with medical mask",
                    version: "1.0"
                }, {
                    emoji: "🤒",
                    category: 0,
                    name: "face with thermometer",
                    version: "1.0"
                }, {
                    emoji: "🤕",
                    category: 0,
                    name: "face with head-bandage",
                    version: "1.0"
                }, {
                    emoji: "🤢",
                    category: 0,
                    name: "nauseated face",
                    version: "3.0"
                }, {
                    emoji: "🤮",
                    category: 0,
                    name: "face vomiting",
                    version: "5.0"
                }, {
                    emoji: "🤧",
                    category: 0,
                    name: "sneezing face",
                    version: "3.0"
                }, {
                    emoji: "🥵",
                    category: 0,
                    name: "hot face",
                    version: "11.0"
                }, {
                    emoji: "🥶",
                    category: 0,
                    name: "cold face",
                    version: "11.0"
                }, {
                    emoji: "🥴",
                    category: 0,
                    name: "woozy face",
                    version: "11.0"
                }, {
                    emoji: "😵",
                    category: 0,
                    name: "dizzy face",
                    version: "1.0"
                }, {
                    emoji: "🤯",
                    category: 0,
                    name: "exploding head",
                    version: "5.0"
                }, {
                    emoji: "🤠",
                    category: 0,
                    name: "cowboy hat face",
                    version: "3.0"
                }, {
                    emoji: "🥳",
                    category: 0,
                    name: "partying face",
                    version: "11.0"
                }, {
                    emoji: "🥸",
                    category: 0,
                    name: "disguised face",
                    version: "13.0"
                }, {
                    emoji: "😎",
                    category: 0,
                    name: "smiling face with sunglasses",
                    version: "1.0"
                }, {
                    emoji: "🤓",
                    category: 0,
                    name: "nerd face",
                    version: "1.0"
                }, {
                    emoji: "🧐",
                    category: 0,
                    name: "face with monocle",
                    version: "5.0"
                }, {
                    emoji: "😕",
                    category: 0,
                    name: "confused face",
                    version: "1.0"
                }, {
                    emoji: "😟",
                    category: 0,
                    name: "worried face",
                    version: "1.0"
                }, {
                    emoji: "🙁",
                    category: 0,
                    name: "slightly frowning face",
                    version: "1.0"
                }, {
                    emoji: "☹️",
                    category: 0,
                    name: "frowning face",
                    version: "1.0"
                }, {
                    emoji: "😮",
                    category: 0,
                    name: "face with open mouth",
                    version: "1.0"
                }, {
                    emoji: "😯",
                    category: 0,
                    name: "hushed face",
                    version: "1.0"
                }, {
                    emoji: "😲",
                    category: 0,
                    name: "astonished face",
                    version: "1.0"
                }, {
                    emoji: "😳",
                    category: 0,
                    name: "flushed face",
                    version: "1.0"
                }, {
                    emoji: "🥺",
                    category: 0,
                    name: "pleading face",
                    version: "11.0"
                }, {
                    emoji: "😦",
                    category: 0,
                    name: "frowning face with open mouth",
                    version: "1.0"
                }, {
                    emoji: "😧",
                    category: 0,
                    name: "anguished face",
                    version: "1.0"
                }, {
                    emoji: "😨",
                    category: 0,
                    name: "fearful face",
                    version: "1.0"
                }, {
                    emoji: "😰",
                    category: 0,
                    name: "anxious face with sweat",
                    version: "1.0"
                }, {
                    emoji: "😥",
                    category: 0,
                    name: "sad but relieved face",
                    version: "1.0"
                }, {
                    emoji: "😢",
                    category: 0,
                    name: "crying face",
                    version: "1.0"
                }, {
                    emoji: "😭",
                    category: 0,
                    name: "loudly crying face",
                    version: "1.0"
                }, {
                    emoji: "😱",
                    category: 0,
                    name: "face screaming in fear",
                    version: "1.0"
                }, {
                    emoji: "😖",
                    category: 0,
                    name: "confounded face",
                    version: "1.0"
                }, {
                    emoji: "😣",
                    category: 0,
                    name: "persevering face",
                    version: "1.0"
                }, {
                    emoji: "😞",
                    category: 0,
                    name: "disappointed face",
                    version: "1.0"
                }, {
                    emoji: "😓",
                    category: 0,
                    name: "downcast face with sweat",
                    version: "1.0"
                }, {
                    emoji: "😩",
                    category: 0,
                    name: "weary face",
                    version: "1.0"
                }, {
                    emoji: "😫",
                    category: 0,
                    name: "tired face",
                    version: "1.0"
                }, {
                    emoji: "🥱",
                    category: 0,
                    name: "yawning face",
                    version: "12.0"
                }, {
                    emoji: "😤",
                    category: 0,
                    name: "face with steam from nose",
                    version: "1.0"
                }, {
                    emoji: "😡",
                    category: 0,
                    name: "pouting face",
                    version: "1.0"
                }, {
                    emoji: "😠",
                    category: 0,
                    name: "angry face",
                    version: "1.0"
                }, {
                    emoji: "🤬",
                    category: 0,
                    name: "face with symbols on mouth",
                    version: "5.0"
                }, {
                    emoji: "😈",
                    category: 0,
                    name: "smiling face with horns",
                    version: "1.0"
                }, {
                    emoji: "👿",
                    category: 0,
                    name: "angry face with horns",
                    version: "1.0"
                }, {
                    emoji: "💀",
                    category: 0,
                    name: "skull",
                    version: "1.0"
                }, {
                    emoji: "☠️",
                    category: 0,
                    name: "skull and crossbones",
                    version: "1.0"
                }, {
                    emoji: "💩",
                    category: 0,
                    name: "pile of poo",
                    version: "1.0"
                }, {
                    emoji: "🤡",
                    category: 0,
                    name: "clown face",
                    version: "3.0"
                }, {
                    emoji: "👹",
                    category: 0,
                    name: "ogre",
                    version: "1.0"
                }, {
                    emoji: "👺",
                    category: 0,
                    name: "goblin",
                    version: "1.0"
                }, {
                    emoji: "👻",
                    category: 0,
                    name: "ghost",
                    version: "1.0"
                }, {
                    emoji: "👽",
                    category: 0,
                    name: "alien",
                    version: "1.0"
                }, {
                    emoji: "👾",
                    category: 0,
                    name: "alien monster",
                    version: "1.0"
                }, {
                    emoji: "🤖",
                    category: 0,
                    name: "robot",
                    version: "1.0"
                }, {
                    emoji: "😺",
                    category: 0,
                    name: "grinning cat",
                    version: "1.0"
                }, {
                    emoji: "😸",
                    category: 0,
                    name: "grinning cat with smiling eyes",
                    version: "1.0"
                }, {
                    emoji: "😹",
                    category: 0,
                    name: "cat with tears of joy",
                    version: "1.0"
                }, {
                    emoji: "😻",
                    category: 0,
                    name: "smiling cat with heart-eyes",
                    version: "1.0"
                }, {
                    emoji: "😼",
                    category: 0,
                    name: "cat with wry smile",
                    version: "1.0"
                }, {
                    emoji: "😽",
                    category: 0,
                    name: "kissing cat",
                    version: "1.0"
                }, {
                    emoji: "🙀",
                    category: 0,
                    name: "weary cat",
                    version: "1.0"
                }, {
                    emoji: "😿",
                    category: 0,
                    name: "crying cat",
                    version: "1.0"
                }, {
                    emoji: "😾",
                    category: 0,
                    name: "pouting cat",
                    version: "1.0"
                }, {
                    emoji: "🙈",
                    category: 0,
                    name: "see-no-evil monkey",
                    version: "1.0"
                }, {
                    emoji: "🙉",
                    category: 0,
                    name: "hear-no-evil monkey",
                    version: "1.0"
                }, {
                    emoji: "🙊",
                    category: 0,
                    name: "speak-no-evil monkey",
                    version: "1.0"
                }, {
                    emoji: "💋",
                    category: 0,
                    name: "kiss mark",
                    version: "1.0"
                }, {
                    emoji: "💌",
                    category: 0,
                    name: "love letter",
                    version: "1.0"
                }, {
                    emoji: "💘",
                    category: 0,
                    name: "heart with arrow",
                    version: "1.0"
                }, {
                    emoji: "💝",
                    category: 0,
                    name: "heart with ribbon",
                    version: "1.0"
                }, {
                    emoji: "💖",
                    category: 0,
                    name: "sparkling heart",
                    version: "1.0"
                }, {
                    emoji: "💗",
                    category: 0,
                    name: "growing heart",
                    version: "1.0"
                }, {
                    emoji: "💓",
                    category: 0,
                    name: "beating heart",
                    version: "1.0"
                }, {
                    emoji: "💞",
                    category: 0,
                    name: "revolving hearts",
                    version: "1.0"
                }, {
                    emoji: "💕",
                    category: 0,
                    name: "two hearts",
                    version: "1.0"
                }, {
                    emoji: "💟",
                    category: 0,
                    name: "heart decoration",
                    version: "1.0"
                }, {
                    emoji: "❣️",
                    category: 0,
                    name: "heart exclamation",
                    version: "1.0"
                }, {
                    emoji: "💔",
                    category: 0,
                    name: "broken heart",
                    version: "1.0"
                }, {
                    emoji: "❤️",
                    category: 0,
                    name: "red heart",
                    version: "1.0"
                }, {
                    emoji: "🧡",
                    category: 0,
                    name: "orange heart",
                    version: "5.0"
                }, {
                    emoji: "💛",
                    category: 0,
                    name: "yellow heart",
                    version: "1.0"
                }, {
                    emoji: "💚",
                    category: 0,
                    name: "green heart",
                    version: "1.0"
                }, {
                    emoji: "💙",
                    category: 0,
                    name: "blue heart",
                    version: "1.0"
                }, {
                    emoji: "💜",
                    category: 0,
                    name: "purple heart",
                    version: "1.0"
                }, {
                    emoji: "🤎",
                    category: 0,
                    name: "brown heart",
                    version: "12.0"
                }, {
                    emoji: "🖤",
                    category: 0,
                    name: "black heart",
                    version: "3.0"
                }, {
                    emoji: "🤍",
                    category: 0,
                    name: "white heart",
                    version: "12.0"
                }, {
                    emoji: "💯",
                    category: 0,
                    name: "hundred points",
                    version: "1.0"
                }, {
                    emoji: "💢",
                    category: 0,
                    name: "anger symbol",
                    version: "1.0"
                }, {
                    emoji: "💥",
                    category: 0,
                    name: "collision",
                    version: "1.0"
                }, {
                    emoji: "💫",
                    category: 0,
                    name: "dizzy",
                    version: "1.0"
                }, {
                    emoji: "💦",
                    category: 0,
                    name: "sweat droplets",
                    version: "1.0"
                }, {
                    emoji: "💨",
                    category: 0,
                    name: "dashing away",
                    version: "1.0"
                }, {
                    emoji: "🕳️",
                    category: 0,
                    name: "hole",
                    version: "1.0"
                }, {
                    emoji: "💣",
                    category: 0,
                    name: "bomb",
                    version: "1.0"
                }, {
                    emoji: "💬",
                    category: 0,
                    name: "speech balloon",
                    version: "1.0"
                }, {
                    emoji: "👁️‍🗨️",
                    category: 0,
                    name: "eye in speech bubble",
                    version: "2.0"
                }, {
                    emoji: "🗨️",
                    category: 0,
                    name: "left speech bubble",
                    version: "2.0"
                }, {
                    emoji: "🗯️",
                    category: 0,
                    name: "right anger bubble",
                    version: "1.0"
                }, {
                    emoji: "💭",
                    category: 0,
                    name: "thought balloon",
                    version: "1.0"
                }, {
                    emoji: "💤",
                    category: 0,
                    name: "zzz",
                    version: "1.0"
                }, {
                    emoji: "👋",
                    category: 1,
                    name: "waving hand",
                    variations: ["👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤚",
                    category: 1,
                    name: "raised back of hand",
                    variations: ["🤚🏻", "🤚🏼", "🤚🏽", "🤚🏾", "🤚🏿"],
                    version: "3.0"
                }, {
                    emoji: "🖐️",
                    category: 1,
                    name: "hand with fingers splayed",
                    variations: ["🖐🏻", "🖐🏼", "🖐🏽", "🖐🏾", "🖐🏿"],
                    version: "1.0"
                }, {
                    emoji: "✋",
                    category: 1,
                    name: "raised hand",
                    variations: ["✋🏻", "✋🏼", "✋🏽", "✋🏾", "✋🏿"],
                    version: "1.0"
                }, {
                    emoji: "🖖",
                    category: 1,
                    name: "vulcan salute",
                    variations: ["🖖🏻", "🖖🏼", "🖖🏽", "🖖🏾", "🖖🏿"],
                    version: "1.0"
                }, {
                    emoji: "👌",
                    category: 1,
                    name: "OK hand",
                    variations: ["👌🏻", "👌🏼", "👌🏽", "👌🏾", "👌🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤌",
                    category: 1,
                    name: "pinched fingers",
                    variations: ["🤌🏻", "🤌🏼", "🤌🏽", "🤌🏾", "🤌🏿"],
                    version: "13.0"
                }, {
                    emoji: "🤏",
                    category: 1,
                    name: "pinching hand",
                    variations: ["🤏🏻", "🤏🏼", "🤏🏽", "🤏🏾", "🤏🏿"],
                    version: "12.0"
                }, {
                    emoji: "✌️",
                    category: 1,
                    name: "victory hand",
                    variations: ["✌🏻", "✌🏼", "✌🏽", "✌🏾", "✌🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤞",
                    category: 1,
                    name: "crossed fingers",
                    variations: ["🤞🏻", "🤞🏼", "🤞🏽", "🤞🏾", "🤞🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤟",
                    category: 1,
                    name: "love-you gesture",
                    variations: ["🤟🏻", "🤟🏼", "🤟🏽", "🤟🏾", "🤟🏿"],
                    version: "5.0"
                }, {
                    emoji: "🤘",
                    category: 1,
                    name: "sign of the horns",
                    variations: ["🤘🏻", "🤘🏼", "🤘🏽", "🤘🏾", "🤘🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤙",
                    category: 1,
                    name: "call me hand",
                    variations: ["🤙🏻", "🤙🏼", "🤙🏽", "🤙🏾", "🤙🏿"],
                    version: "3.0"
                }, {
                    emoji: "👈",
                    category: 1,
                    name: "backhand index pointing left",
                    variations: ["👈🏻", "👈🏼", "👈🏽", "👈🏾", "👈🏿"],
                    version: "1.0"
                }, {
                    emoji: "👉",
                    category: 1,
                    name: "backhand index pointing right",
                    variations: ["👉🏻", "👉🏼", "👉🏽", "👉🏾", "👉🏿"],
                    version: "1.0"
                }, {
                    emoji: "👆",
                    category: 1,
                    name: "backhand index pointing up",
                    variations: ["👆🏻", "👆🏼", "👆🏽", "👆🏾", "👆🏿"],
                    version: "1.0"
                }, {
                    emoji: "🖕",
                    category: 1,
                    name: "middle finger",
                    variations: ["🖕🏻", "🖕🏼", "🖕🏽", "🖕🏾", "🖕🏿"],
                    version: "1.0"
                }, {
                    emoji: "👇",
                    category: 1,
                    name: "backhand index pointing down",
                    variations: ["👇🏻", "👇🏼", "👇🏽", "👇🏾", "👇🏿"],
                    version: "1.0"
                }, {
                    emoji: "☝️",
                    category: 1,
                    name: "index pointing up",
                    variations: ["☝🏻", "☝🏼", "☝🏽", "☝🏾", "☝🏿"],
                    version: "1.0"
                }, {
                    emoji: "👍",
                    category: 1,
                    name: "thumbs up",
                    variations: ["👍🏻", "👍🏼", "👍🏽", "👍🏾", "👍🏿"],
                    version: "1.0"
                }, {
                    emoji: "👎",
                    category: 1,
                    name: "thumbs down",
                    variations: ["👎🏻", "👎🏼", "👎🏽", "👎🏾", "👎🏿"],
                    version: "1.0"
                }, {
                    emoji: "✊",
                    category: 1,
                    name: "raised fist",
                    variations: ["✊🏻", "✊🏼", "✊🏽", "✊🏾", "✊🏿"],
                    version: "1.0"
                }, {
                    emoji: "👊",
                    category: 1,
                    name: "oncoming fist",
                    variations: ["👊🏻", "👊🏼", "👊🏽", "👊🏾", "👊🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤛",
                    category: 1,
                    name: "left-facing fist",
                    variations: ["🤛🏻", "🤛🏼", "🤛🏽", "🤛🏾", "🤛🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤜",
                    category: 1,
                    name: "right-facing fist",
                    variations: ["🤜🏻", "🤜🏼", "🤜🏽", "🤜🏾", "🤜🏿"],
                    version: "3.0"
                }, {
                    emoji: "👏",
                    category: 1,
                    name: "clapping hands",
                    variations: ["👏🏻", "👏🏼", "👏🏽", "👏🏾", "👏🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙌",
                    category: 1,
                    name: "raising hands",
                    variations: ["🙌🏻", "🙌🏼", "🙌🏽", "🙌🏾", "🙌🏿"],
                    version: "1.0"
                }, {
                    emoji: "👐",
                    category: 1,
                    name: "open hands",
                    variations: ["👐🏻", "👐🏼", "👐🏽", "👐🏾", "👐🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤲",
                    category: 1,
                    name: "palms up together",
                    variations: ["🤲🏻", "🤲🏼", "🤲🏽", "🤲🏾", "🤲🏿"],
                    version: "5.0"
                }, {
                    emoji: "🤝",
                    category: 1,
                    name: "handshake",
                    version: "3.0"
                }, {
                    emoji: "🙏",
                    category: 1,
                    name: "folded hands",
                    variations: ["🙏🏻", "🙏🏼", "🙏🏽", "🙏🏾", "🙏🏿"],
                    version: "1.0"
                }, {
                    emoji: "✍️",
                    category: 1,
                    name: "writing hand",
                    variations: ["✍🏻", "✍🏼", "✍🏽", "✍🏾", "✍🏿"],
                    version: "1.0"
                }, {
                    emoji: "💅",
                    category: 1,
                    name: "nail polish",
                    variations: ["💅🏻", "💅🏼", "💅🏽", "💅🏾", "💅🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤳",
                    category: 1,
                    name: "selfie",
                    variations: ["🤳🏻", "🤳🏼", "🤳🏽", "🤳🏾", "🤳🏿"],
                    version: "3.0"
                }, {
                    emoji: "💪",
                    category: 1,
                    name: "flexed biceps",
                    variations: ["💪🏻", "💪🏼", "💪🏽", "💪🏾", "💪🏿"],
                    version: "1.0"
                }, {
                    emoji: "🦾",
                    category: 1,
                    name: "mechanical arm",
                    version: "12.0"
                }, {
                    emoji: "🦿",
                    category: 1,
                    name: "mechanical leg",
                    version: "12.0"
                }, {
                    emoji: "🦵",
                    category: 1,
                    name: "leg",
                    variations: ["🦵🏻", "🦵🏼", "🦵🏽", "🦵🏾", "🦵🏿"],
                    version: "11.0"
                }, {
                    emoji: "🦶",
                    category: 1,
                    name: "foot",
                    variations: ["🦶🏻", "🦶🏼", "🦶🏽", "🦶🏾", "🦶🏿"],
                    version: "11.0"
                }, {
                    emoji: "👂",
                    category: 1,
                    name: "ear",
                    variations: ["👂🏻", "👂🏼", "👂🏽", "👂🏾", "👂🏿"],
                    version: "1.0"
                }, {
                    emoji: "🦻",
                    category: 1,
                    name: "ear with hearing aid",
                    variations: ["🦻🏻", "🦻🏼", "🦻🏽", "🦻🏾", "🦻🏿"],
                    version: "12.0"
                }, {
                    emoji: "👃",
                    category: 1,
                    name: "nose",
                    variations: ["👃🏻", "👃🏼", "👃🏽", "👃🏾", "👃🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧠",
                    category: 1,
                    name: "brain",
                    version: "5.0"
                }, {
                    emoji: "🫀",
                    category: 1,
                    name: "anatomical heart",
                    version: "13.0"
                }, {
                    emoji: "🫁",
                    category: 1,
                    name: "lungs",
                    version: "13.0"
                }, {
                    emoji: "🦷",
                    category: 1,
                    name: "tooth",
                    version: "11.0"
                }, {
                    emoji: "🦴",
                    category: 1,
                    name: "bone",
                    version: "11.0"
                }, {
                    emoji: "👀",
                    category: 1,
                    name: "eyes",
                    version: "1.0"
                }, {
                    emoji: "👁️",
                    category: 1,
                    name: "eye",
                    version: "1.0"
                }, {
                    emoji: "👅",
                    category: 1,
                    name: "tongue",
                    version: "1.0"
                }, {
                    emoji: "👄",
                    category: 1,
                    name: "mouth",
                    version: "1.0"
                }, {
                    emoji: "👶",
                    category: 1,
                    name: "baby",
                    variations: ["👶🏻", "👶🏼", "👶🏽", "👶🏾", "👶🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧒",
                    category: 1,
                    name: "child",
                    variations: ["🧒🏻", "🧒🏼", "🧒🏽", "🧒🏾", "🧒🏿"],
                    version: "5.0"
                }, {
                    emoji: "👦",
                    category: 1,
                    name: "boy",
                    variations: ["👦🏻", "👦🏼", "👦🏽", "👦🏾", "👦🏿"],
                    version: "1.0"
                }, {
                    emoji: "👧",
                    category: 1,
                    name: "girl",
                    variations: ["👧🏻", "👧🏼", "👧🏽", "👧🏾", "👧🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧑",
                    category: 1,
                    name: "person",
                    variations: ["🧑🏻", "🧑🏼", "🧑🏽", "🧑🏾", "🧑🏿"],
                    version: "5.0"
                }, {
                    emoji: "👱",
                    category: 1,
                    name: "person with blond hair",
                    variations: ["👱🏻", "👱🏼", "👱🏽", "👱🏾", "👱🏿"],
                    version: "1.0"
                }, {
                    emoji: "👨",
                    category: 1,
                    name: "man",
                    variations: ["👨🏻", "👨🏼", "👨🏽", "👨🏾", "👨🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧔",
                    category: 1,
                    name: "man with beard",
                    variations: ["🧔🏻", "🧔🏼", "🧔🏽", "🧔🏾", "🧔🏿"],
                    version: "5.0"
                }, {
                    emoji: "👨‍🦰",
                    category: 1,
                    name: "man with red hair",
                    variations: ["👨🏻‍🦰", "👨🏼‍🦰", "👨🏽‍🦰", "👨🏾‍🦰", "👨🏿‍🦰"],
                    version: "11.0"
                }, {
                    emoji: "👨‍🦱",
                    category: 1,
                    name: "man with curly hair",
                    variations: ["👨🏻‍🦱", "👨🏼‍🦱", "👨🏽‍🦱", "👨🏾‍🦱", "👨🏿‍🦱"],
                    version: "11.0"
                }, {
                    emoji: "👨‍🦳",
                    category: 1,
                    name: "man with white hair",
                    variations: ["👨🏻‍🦳", "👨🏼‍🦳", "👨🏽‍🦳", "👨🏾‍🦳", "👨🏿‍🦳"],
                    version: "11.0"
                }, {
                    emoji: "👨‍🦲",
                    category: 1,
                    name: "man with no hair",
                    variations: ["👨🏻‍🦲", "👨🏼‍🦲", "👨🏽‍🦲", "👨🏾‍🦲", "👨🏿‍🦲"],
                    version: "11.0"
                }, {
                    emoji: "👩",
                    category: 1,
                    name: "woman",
                    variations: ["👩🏻", "👩🏼", "👩🏽", "👩🏾", "👩🏿"],
                    version: "1.0"
                }, {
                    emoji: "👩‍🦰",
                    category: 1,
                    name: "woman with red hair",
                    variations: ["👩🏻‍🦰", "👩🏼‍🦰", "👩🏽‍🦰", "👩🏾‍🦰", "👩🏿‍🦰"],
                    version: "11.0"
                }, {
                    emoji: "🧑‍🦰",
                    category: 1,
                    name: "person with red hair",
                    variations: ["🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰"],
                    version: "12.1"
                }, {
                    emoji: "👩‍🦱",
                    category: 1,
                    name: "woman with curly hair",
                    variations: ["👩🏻‍🦱", "👩🏼‍🦱", "👩🏽‍🦱", "👩🏾‍🦱", "👩🏿‍🦱"],
                    version: "11.0"
                }, {
                    emoji: "🧑‍🦱",
                    category: 1,
                    name: "person with curly hair",
                    variations: ["🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱"],
                    version: "12.1"
                }, {
                    emoji: "👩‍🦳",
                    category: 1,
                    name: "woman with white hair",
                    variations: ["👩🏻‍🦳", "👩🏼‍🦳", "👩🏽‍🦳", "👩🏾‍🦳", "👩🏿‍🦳"],
                    version: "11.0"
                }, {
                    emoji: "🧑‍🦳",
                    category: 1,
                    name: "person with white hair",
                    variations: ["🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳", "🧑🏿‍🦳"],
                    version: "12.1"
                }, {
                    emoji: "👩‍🦲",
                    category: 1,
                    name: "woman with no hair",
                    variations: ["👩🏻‍🦲", "👩🏼‍🦲", "👩🏽‍🦲", "👩🏾‍🦲", "👩🏿‍🦲"],
                    version: "11.0"
                }, {
                    emoji: "🧑‍🦲",
                    category: 1,
                    name: "person with no hair",
                    variations: ["🧑🏻‍🦲", "🧑🏼‍🦲", "🧑🏽‍🦲", "🧑🏾‍🦲", "🧑🏿‍🦲"],
                    version: "12.1"
                }, {
                    emoji: "👱‍♀️",
                    category: 1,
                    name: "woman with blond hair",
                    variations: ["👱🏻‍♀️", "👱🏼‍♀️", "👱🏽‍♀️", "👱🏾‍♀️", "👱🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "👱‍♂️",
                    category: 1,
                    name: "man with blond hair",
                    variations: ["👱🏻‍♂️", "👱🏼‍♂️", "👱🏽‍♂️", "👱🏾‍♂️", "👱🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🧓",
                    category: 1,
                    name: "older person",
                    variations: ["🧓🏻", "🧓🏼", "🧓🏽", "🧓🏾", "🧓🏿"],
                    version: "5.0"
                }, {
                    emoji: "👴",
                    category: 1,
                    name: "old man",
                    variations: ["👴🏻", "👴🏼", "👴🏽", "👴🏾", "👴🏿"],
                    version: "1.0"
                }, {
                    emoji: "👵",
                    category: 1,
                    name: "old woman",
                    variations: ["👵🏻", "👵🏼", "👵🏽", "👵🏾", "👵🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙍",
                    category: 1,
                    name: "person frowning",
                    variations: ["🙍🏻", "🙍🏼", "🙍🏽", "🙍🏾", "🙍🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙍‍♂️",
                    category: 1,
                    name: "man frowning",
                    variations: ["🙍🏻‍♂️", "🙍🏼‍♂️", "🙍🏽‍♂️", "🙍🏾‍♂️", "🙍🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙍‍♀️",
                    category: 1,
                    name: "woman frowning",
                    variations: ["🙍🏻‍♀️", "🙍🏼‍♀️", "🙍🏽‍♀️", "🙍🏾‍♀️", "🙍🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🙎",
                    category: 1,
                    name: "person pouting",
                    variations: ["🙎🏻", "🙎🏼", "🙎🏽", "🙎🏾", "🙎🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙎‍♂️",
                    category: 1,
                    name: "man pouting",
                    variations: ["🙎🏻‍♂️", "🙎🏼‍♂️", "🙎🏽‍♂️", "🙎🏾‍♂️", "🙎🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙎‍♀️",
                    category: 1,
                    name: "woman pouting",
                    variations: ["🙎🏻‍♀️", "🙎🏼‍♀️", "🙎🏽‍♀️", "🙎🏾‍♀️", "🙎🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🙅",
                    category: 1,
                    name: "person gesturing NO",
                    variations: ["🙅🏻", "🙅🏼", "🙅🏽", "🙅🏾", "🙅🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙅‍♂️",
                    category: 1,
                    name: "man gesturing NO",
                    variations: ["🙅🏻‍♂️", "🙅🏼‍♂️", "🙅🏽‍♂️", "🙅🏾‍♂️", "🙅🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙅‍♀️",
                    category: 1,
                    name: "woman gesturing NO",
                    variations: ["🙅🏻‍♀️", "🙅🏼‍♀️", "🙅🏽‍♀️", "🙅🏾‍♀️", "🙅🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🙆",
                    category: 1,
                    name: "person gesturing OK",
                    variations: ["🙆🏻", "🙆🏼", "🙆🏽", "🙆🏾", "🙆🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙆‍♂️",
                    category: 1,
                    name: "man gesturing OK",
                    variations: ["🙆🏻‍♂️", "🙆🏼‍♂️", "🙆🏽‍♂️", "🙆🏾‍♂️", "🙆🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙆‍♀️",
                    category: 1,
                    name: "woman gesturing OK",
                    variations: ["🙆🏻‍♀️", "🙆🏼‍♀️", "🙆🏽‍♀️", "🙆🏾‍♀️", "🙆🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "💁",
                    category: 1,
                    name: "person tipping hand",
                    variations: ["💁🏻", "💁🏼", "💁🏽", "💁🏾", "💁🏿"],
                    version: "1.0"
                }, {
                    emoji: "💁‍♂️",
                    category: 1,
                    name: "man tipping hand",
                    variations: ["💁🏻‍♂️", "💁🏼‍♂️", "💁🏽‍♂️", "💁🏾‍♂️", "💁🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "💁‍♀️",
                    category: 1,
                    name: "woman tipping hand",
                    variations: ["💁🏻‍♀️", "💁🏼‍♀️", "💁🏽‍♀️", "💁🏾‍♀️", "💁🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🙋",
                    category: 1,
                    name: "person raising hand",
                    variations: ["🙋🏻", "🙋🏼", "🙋🏽", "🙋🏾", "🙋🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙋‍♂️",
                    category: 1,
                    name: "man raising hand",
                    variations: ["🙋🏻‍♂️", "🙋🏼‍♂️", "🙋🏽‍♂️", "🙋🏾‍♂️", "🙋🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙋‍♀️",
                    category: 1,
                    name: "woman raising hand",
                    variations: ["🙋🏻‍♀️", "🙋🏼‍♀️", "🙋🏽‍♀️", "🙋🏾‍♀️", "🙋🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🧏",
                    category: 1,
                    name: "deaf person",
                    variations: ["🧏🏻", "🧏🏼", "🧏🏽", "🧏🏾", "🧏🏿"],
                    version: "12.0"
                }, {
                    emoji: "🧏‍♂️",
                    category: 1,
                    name: "deaf man",
                    variations: ["🧏🏻‍♂️", "🧏🏼‍♂️", "🧏🏽‍♂️", "🧏🏾‍♂️", "🧏🏿‍♂️"],
                    version: "12.0"
                }, {
                    emoji: "🧏‍♀️",
                    category: 1,
                    name: "deaf woman",
                    variations: ["🧏🏻‍♀️", "🧏🏼‍♀️", "🧏🏽‍♀️", "🧏🏾‍♀️", "🧏🏿‍♀️"],
                    version: "12.0"
                }, {
                    emoji: "🙇",
                    category: 1,
                    name: "person bowing",
                    variations: ["🙇🏻", "🙇🏼", "🙇🏽", "🙇🏾", "🙇🏿"],
                    version: "1.0"
                }, {
                    emoji: "🙇‍♂️",
                    category: 1,
                    name: "man bowing",
                    variations: ["🙇🏻‍♂️", "🙇🏼‍♂️", "🙇🏽‍♂️", "🙇🏾‍♂️", "🙇🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🙇‍♀️",
                    category: 1,
                    name: "woman bowing",
                    variations: ["🙇🏻‍♀️", "🙇🏼‍♀️", "🙇🏽‍♀️", "🙇🏾‍♀️", "🙇🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤦",
                    category: 1,
                    name: "person facepalming",
                    variations: ["🤦🏻", "🤦🏼", "🤦🏽", "🤦🏾", "🤦🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤦‍♂️",
                    category: 1,
                    name: "man facepalming",
                    variations: ["🤦🏻‍♂️", "🤦🏼‍♂️", "🤦🏽‍♂️", "🤦🏾‍♂️", "🤦🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤦‍♀️",
                    category: 1,
                    name: "woman facepalming",
                    variations: ["🤦🏻‍♀️", "🤦🏼‍♀️", "🤦🏽‍♀️", "🤦🏾‍♀️", "🤦🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤷",
                    category: 1,
                    name: "person shrugging",
                    variations: ["🤷🏻", "🤷🏼", "🤷🏽", "🤷🏾", "🤷🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤷‍♂️",
                    category: 1,
                    name: "man shrugging",
                    variations: ["🤷🏻‍♂️", "🤷🏼‍♂️", "🤷🏽‍♂️", "🤷🏾‍♂️", "🤷🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤷‍♀️",
                    category: 1,
                    name: "woman shrugging",
                    variations: ["🤷🏻‍♀️", "🤷🏼‍♀️", "🤷🏽‍♀️", "🤷🏾‍♀️", "🤷🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍⚕️",
                    category: 1,
                    name: "health worker",
                    variations: ["🧑🏻‍⚕️", "🧑🏼‍⚕️", "🧑🏽‍⚕️", "🧑🏾‍⚕️", "🧑🏿‍⚕️"],
                    version: "12.1"
                }, {
                    emoji: "👨‍⚕️",
                    category: 1,
                    name: "man health worker",
                    variations: ["👨🏻‍⚕️", "👨🏼‍⚕️", "👨🏽‍⚕️", "👨🏾‍⚕️", "👨🏿‍⚕️"],
                    version: "4.0"
                }, {
                    emoji: "👩‍⚕️",
                    category: 1,
                    name: "woman health worker",
                    variations: ["👩🏻‍⚕️", "👩🏼‍⚕️", "👩🏽‍⚕️", "👩🏾‍⚕️", "👩🏿‍⚕️"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🎓",
                    category: 1,
                    name: "student",
                    variations: ["🧑🏻‍🎓", "🧑🏼‍🎓", "🧑🏽‍🎓", "🧑🏾‍🎓", "🧑🏿‍🎓"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🎓",
                    category: 1,
                    name: "man student",
                    variations: ["👨🏻‍🎓", "👨🏼‍🎓", "👨🏽‍🎓", "👨🏾‍🎓", "👨🏿‍🎓"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🎓",
                    category: 1,
                    name: "woman student",
                    variations: ["👩🏻‍🎓", "👩🏼‍🎓", "👩🏽‍🎓", "👩🏾‍🎓", "👩🏿‍🎓"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🏫",
                    category: 1,
                    name: "teacher",
                    variations: ["🧑🏻‍🏫", "🧑🏼‍🏫", "🧑🏽‍🏫", "🧑🏾‍🏫", "🧑🏿‍🏫"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🏫",
                    category: 1,
                    name: "man teacher",
                    variations: ["👨🏻‍🏫", "👨🏼‍🏫", "👨🏽‍🏫", "👨🏾‍🏫", "👨🏿‍🏫"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🏫",
                    category: 1,
                    name: "woman teacher",
                    variations: ["👩🏻‍🏫", "👩🏼‍🏫", "👩🏽‍🏫", "👩🏾‍🏫", "👩🏿‍🏫"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍⚖️",
                    category: 1,
                    name: "judge",
                    variations: ["🧑🏻‍⚖️", "🧑🏼‍⚖️", "🧑🏽‍⚖️", "🧑🏾‍⚖️", "🧑🏿‍⚖️"],
                    version: "12.1"
                }, {
                    emoji: "👨‍⚖️",
                    category: 1,
                    name: "man judge",
                    variations: ["👨🏻‍⚖️", "👨🏼‍⚖️", "👨🏽‍⚖️", "👨🏾‍⚖️", "👨🏿‍⚖️"],
                    version: "4.0"
                }, {
                    emoji: "👩‍⚖️",
                    category: 1,
                    name: "woman judge",
                    variations: ["👩🏻‍⚖️", "👩🏼‍⚖️", "👩🏽‍⚖️", "👩🏾‍⚖️", "👩🏿‍⚖️"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🌾",
                    category: 1,
                    name: "farmer",
                    variations: ["🧑🏻‍🌾", "🧑🏼‍🌾", "🧑🏽‍🌾", "🧑🏾‍🌾", "🧑🏿‍🌾"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🌾",
                    category: 1,
                    name: "man farmer",
                    variations: ["👨🏻‍🌾", "👨🏼‍🌾", "👨🏽‍🌾", "👨🏾‍🌾", "👨🏿‍🌾"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🌾",
                    category: 1,
                    name: "woman farmer",
                    variations: ["👩🏻‍🌾", "👩🏼‍🌾", "👩🏽‍🌾", "👩🏾‍🌾", "👩🏿‍🌾"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🍳",
                    category: 1,
                    name: "cook",
                    variations: ["🧑🏻‍🍳", "🧑🏼‍🍳", "🧑🏽‍🍳", "🧑🏾‍🍳", "🧑🏿‍🍳"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🍳",
                    category: 1,
                    name: "man cook",
                    variations: ["👨🏻‍🍳", "👨🏼‍🍳", "👨🏽‍🍳", "👨🏾‍🍳", "👨🏿‍🍳"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🍳",
                    category: 1,
                    name: "woman cook",
                    variations: ["👩🏻‍🍳", "👩🏼‍🍳", "👩🏽‍🍳", "👩🏾‍🍳", "👩🏿‍🍳"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🔧",
                    category: 1,
                    name: "mechanic",
                    variations: ["🧑🏻‍🔧", "🧑🏼‍🔧", "🧑🏽‍🔧", "🧑🏾‍🔧", "🧑🏿‍🔧"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🔧",
                    category: 1,
                    name: "man mechanic",
                    variations: ["👨🏻‍🔧", "👨🏼‍🔧", "👨🏽‍🔧", "👨🏾‍🔧", "👨🏿‍🔧"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🔧",
                    category: 1,
                    name: "woman mechanic",
                    variations: ["👩🏻‍🔧", "👩🏼‍🔧", "👩🏽‍🔧", "👩🏾‍🔧", "👩🏿‍🔧"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🏭",
                    category: 1,
                    name: "factory worker",
                    variations: ["🧑🏻‍🏭", "🧑🏼‍🏭", "🧑🏽‍🏭", "🧑🏾‍🏭", "🧑🏿‍🏭"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🏭",
                    category: 1,
                    name: "man factory worker",
                    variations: ["👨🏻‍🏭", "👨🏼‍🏭", "👨🏽‍🏭", "👨🏾‍🏭", "👨🏿‍🏭"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🏭",
                    category: 1,
                    name: "woman factory worker",
                    variations: ["👩🏻‍🏭", "👩🏼‍🏭", "👩🏽‍🏭", "👩🏾‍🏭", "👩🏿‍🏭"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍💼",
                    category: 1,
                    name: "office worker",
                    variations: ["🧑🏻‍💼", "🧑🏼‍💼", "🧑🏽‍💼", "🧑🏾‍💼", "🧑🏿‍💼"],
                    version: "12.1"
                }, {
                    emoji: "👨‍💼",
                    category: 1,
                    name: "man office worker",
                    variations: ["👨🏻‍💼", "👨🏼‍💼", "👨🏽‍💼", "👨🏾‍💼", "👨🏿‍💼"],
                    version: "4.0"
                }, {
                    emoji: "👩‍💼",
                    category: 1,
                    name: "woman office worker",
                    variations: ["👩🏻‍💼", "👩🏼‍💼", "👩🏽‍💼", "👩🏾‍💼", "👩🏿‍💼"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🔬",
                    category: 1,
                    name: "scientist",
                    variations: ["🧑🏻‍🔬", "🧑🏼‍🔬", "🧑🏽‍🔬", "🧑🏾‍🔬", "🧑🏿‍🔬"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🔬",
                    category: 1,
                    name: "man scientist",
                    variations: ["👨🏻‍🔬", "👨🏼‍🔬", "👨🏽‍🔬", "👨🏾‍🔬", "👨🏿‍🔬"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🔬",
                    category: 1,
                    name: "woman scientist",
                    variations: ["👩🏻‍🔬", "👩🏼‍🔬", "👩🏽‍🔬", "👩🏾‍🔬", "👩🏿‍🔬"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍💻",
                    category: 1,
                    name: "technologist",
                    variations: ["🧑🏻‍💻", "🧑🏼‍💻", "🧑🏽‍💻", "🧑🏾‍💻", "🧑🏿‍💻"],
                    version: "12.1"
                }, {
                    emoji: "👨‍💻",
                    category: 1,
                    name: "man technologist",
                    variations: ["👨🏻‍💻", "👨🏼‍💻", "👨🏽‍💻", "👨🏾‍💻", "👨🏿‍💻"],
                    version: "4.0"
                }, {
                    emoji: "👩‍💻",
                    category: 1,
                    name: "woman technologist",
                    variations: ["👩🏻‍💻", "👩🏼‍💻", "👩🏽‍💻", "👩🏾‍💻", "👩🏿‍💻"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🎤",
                    category: 1,
                    name: "singer",
                    variations: ["🧑🏻‍🎤", "🧑🏼‍🎤", "🧑🏽‍🎤", "🧑🏾‍🎤", "🧑🏿‍🎤"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🎤",
                    category: 1,
                    name: "man singer",
                    variations: ["👨🏻‍🎤", "👨🏼‍🎤", "👨🏽‍🎤", "👨🏾‍🎤", "👨🏿‍🎤"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🎤",
                    category: 1,
                    name: "woman singer",
                    variations: ["👩🏻‍🎤", "👩🏼‍🎤", "👩🏽‍🎤", "👩🏾‍🎤", "👩🏿‍🎤"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🎨",
                    category: 1,
                    name: "artist",
                    variations: ["🧑🏻‍🎨", "🧑🏼‍🎨", "🧑🏽‍🎨", "🧑🏾‍🎨", "🧑🏿‍🎨"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🎨",
                    category: 1,
                    name: "man artist",
                    variations: ["👨🏻‍🎨", "👨🏼‍🎨", "👨🏽‍🎨", "👨🏾‍🎨", "👨🏿‍🎨"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🎨",
                    category: 1,
                    name: "woman artist",
                    variations: ["👩🏻‍🎨", "👩🏼‍🎨", "👩🏽‍🎨", "👩🏾‍🎨", "👩🏿‍🎨"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍✈️",
                    category: 1,
                    name: "pilot",
                    variations: ["🧑🏻‍✈️", "🧑🏼‍✈️", "🧑🏽‍✈️", "🧑🏾‍✈️", "🧑🏿‍✈️"],
                    version: "12.1"
                }, {
                    emoji: "👨‍✈️",
                    category: 1,
                    name: "man pilot",
                    variations: ["👨🏻‍✈️", "👨🏼‍✈️", "👨🏽‍✈️", "👨🏾‍✈️", "👨🏿‍✈️"],
                    version: "4.0"
                }, {
                    emoji: "👩‍✈️",
                    category: 1,
                    name: "woman pilot",
                    variations: ["👩🏻‍✈️", "👩🏼‍✈️", "👩🏽‍✈️", "👩🏾‍✈️", "👩🏿‍✈️"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🚀",
                    category: 1,
                    name: "astronaut",
                    variations: ["🧑🏻‍🚀", "🧑🏼‍🚀", "🧑🏽‍🚀", "🧑🏾‍🚀", "🧑🏿‍🚀"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🚀",
                    category: 1,
                    name: "man astronaut",
                    variations: ["👨🏻‍🚀", "👨🏼‍🚀", "👨🏽‍🚀", "👨🏾‍🚀", "👨🏿‍🚀"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🚀",
                    category: 1,
                    name: "woman astronaut",
                    variations: ["👩🏻‍🚀", "👩🏼‍🚀", "👩🏽‍🚀", "👩🏾‍🚀", "👩🏿‍🚀"],
                    version: "4.0"
                }, {
                    emoji: "🧑‍🚒",
                    category: 1,
                    name: "firefighter",
                    variations: ["🧑🏻‍🚒", "🧑🏼‍🚒", "🧑🏽‍🚒", "🧑🏾‍🚒", "🧑🏿‍🚒"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🚒",
                    category: 1,
                    name: "man firefighter",
                    variations: ["👨🏻‍🚒", "👨🏼‍🚒", "👨🏽‍🚒", "👨🏾‍🚒", "👨🏿‍🚒"],
                    version: "4.0"
                }, {
                    emoji: "👩‍🚒",
                    category: 1,
                    name: "woman firefighter",
                    variations: ["👩🏻‍🚒", "👩🏼‍🚒", "👩🏽‍🚒", "👩🏾‍🚒", "👩🏿‍🚒"],
                    version: "4.0"
                }, {
                    emoji: "👮",
                    category: 1,
                    name: "police officer",
                    variations: ["👮🏻", "👮🏼", "👮🏽", "👮🏾", "👮🏿"],
                    version: "1.0"
                }, {
                    emoji: "👮‍♂️",
                    category: 1,
                    name: "man police officer",
                    variations: ["👮🏻‍♂️", "👮🏼‍♂️", "👮🏽‍♂️", "👮🏾‍♂️", "👮🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "👮‍♀️",
                    category: 1,
                    name: "woman police officer",
                    variations: ["👮🏻‍♀️", "👮🏼‍♀️", "👮🏽‍♀️", "👮🏾‍♀️", "👮🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🕵️",
                    category: 1,
                    name: "detective",
                    variations: ["🕵🏻", "🕵🏼", "🕵🏽", "🕵🏾", "🕵🏿"],
                    version: "1.0"
                }, {
                    emoji: "🕵️‍♂️",
                    category: 1,
                    name: "man detective",
                    variations: ["🕵🏻‍♂️", "🕵🏼‍♂️", "🕵🏽‍♂️", "🕵🏾‍♂️", "🕵🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🕵️‍♀️",
                    category: 1,
                    name: "woman detective",
                    variations: ["🕵🏻‍♀️", "🕵🏼‍♀️", "🕵🏽‍♀️", "🕵🏾‍♀️", "🕵🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "💂",
                    category: 1,
                    name: "guard",
                    variations: ["💂🏻", "💂🏼", "💂🏽", "💂🏾", "💂🏿"],
                    version: "1.0"
                }, {
                    emoji: "💂‍♂️",
                    category: 1,
                    name: "man guard",
                    variations: ["💂🏻‍♂️", "💂🏼‍♂️", "💂🏽‍♂️", "💂🏾‍♂️", "💂🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "💂‍♀️",
                    category: 1,
                    name: "woman guard",
                    variations: ["💂🏻‍♀️", "💂🏼‍♀️", "💂🏽‍♀️", "💂🏾‍♀️", "💂🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🥷",
                    category: 1,
                    name: "ninja",
                    variations: ["🥷🏻", "🥷🏼", "🥷🏽", "🥷🏾", "🥷🏿"],
                    version: "13.0"
                }, {
                    emoji: "👷",
                    category: 1,
                    name: "construction worker",
                    variations: ["👷🏻", "👷🏼", "👷🏽", "👷🏾", "👷🏿"],
                    version: "1.0"
                }, {
                    emoji: "👷‍♂️",
                    category: 1,
                    name: "man construction worker",
                    variations: ["👷🏻‍♂️", "👷🏼‍♂️", "👷🏽‍♂️", "👷🏾‍♂️", "👷🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "👷‍♀️",
                    category: 1,
                    name: "woman construction worker",
                    variations: ["👷🏻‍♀️", "👷🏼‍♀️", "👷🏽‍♀️", "👷🏾‍♀️", "👷🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤴",
                    category: 1,
                    name: "prince",
                    variations: ["🤴🏻", "🤴🏼", "🤴🏽", "🤴🏾", "🤴🏿"],
                    version: "3.0"
                }, {
                    emoji: "👸",
                    category: 1,
                    name: "princess",
                    variations: ["👸🏻", "👸🏼", "👸🏽", "👸🏾", "👸🏿"],
                    version: "1.0"
                }, {
                    emoji: "👳",
                    category: 1,
                    name: "person wearing turban",
                    variations: ["👳🏻", "👳🏼", "👳🏽", "👳🏾", "👳🏿"],
                    version: "1.0"
                }, {
                    emoji: "👳‍♂️",
                    category: 1,
                    name: "man wearing turban",
                    variations: ["👳🏻‍♂️", "👳🏼‍♂️", "👳🏽‍♂️", "👳🏾‍♂️", "👳🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "👳‍♀️",
                    category: 1,
                    name: "woman wearing turban",
                    variations: ["👳🏻‍♀️", "👳🏼‍♀️", "👳🏽‍♀️", "👳🏾‍♀️", "👳🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "👲",
                    category: 1,
                    name: "person with skullcap",
                    variations: ["👲🏻", "👲🏼", "👲🏽", "👲🏾", "👲🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧕",
                    category: 1,
                    name: "woman with headscarf",
                    variations: ["🧕🏻", "🧕🏼", "🧕🏽", "🧕🏾", "🧕🏿"],
                    version: "5.0"
                }, {
                    emoji: "🤵",
                    category: 1,
                    name: "person in tuxedo",
                    variations: ["🤵🏻", "🤵🏼", "🤵🏽", "🤵🏾", "🤵🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤵‍♂️",
                    category: 1,
                    name: "man in tuxedo",
                    variations: ["🤵🏻‍♂️", "🤵🏼‍♂️", "🤵🏽‍♂️", "🤵🏾‍♂️", "🤵🏿‍♂️"],
                    version: "13.0"
                }, {
                    emoji: "🤵‍♀️",
                    category: 1,
                    name: "woman in tuxedo",
                    variations: ["🤵🏻‍♀️", "🤵🏼‍♀️", "🤵🏽‍♀️", "🤵🏾‍♀️", "🤵🏿‍♀️"],
                    version: "13.0"
                }, {
                    emoji: "👰",
                    category: 1,
                    name: "person with veil",
                    variations: ["👰🏻", "👰🏼", "👰🏽", "👰🏾", "👰🏿"],
                    version: "1.0"
                }, {
                    emoji: "👰‍♂️",
                    category: 1,
                    name: "man with veil",
                    variations: ["👰🏻‍♂️", "👰🏼‍♂️", "👰🏽‍♂️", "👰🏾‍♂️", "👰🏿‍♂️"],
                    version: "13.0"
                }, {
                    emoji: "👰‍♀️",
                    category: 1,
                    name: "woman with veil",
                    variations: ["👰🏻‍♀️", "👰🏼‍♀️", "👰🏽‍♀️", "👰🏾‍♀️", "👰🏿‍♀️"],
                    version: "13.0"
                }, {
                    emoji: "🤰",
                    category: 1,
                    name: "pregnant woman",
                    variations: ["🤰🏻", "🤰🏼", "🤰🏽", "🤰🏾", "🤰🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤱",
                    category: 1,
                    name: "breast-feeding",
                    variations: ["🤱🏻", "🤱🏼", "🤱🏽", "🤱🏾", "🤱🏿"],
                    version: "5.0"
                }, {
                    emoji: "👩‍🍼",
                    category: 1,
                    name: "woman feeding baby",
                    variations: ["👩🏻‍🍼", "👩🏼‍🍼", "👩🏽‍🍼", "👩🏾‍🍼", "👩🏿‍🍼"],
                    version: "13.0"
                }, {
                    emoji: "👨‍🍼",
                    category: 1,
                    name: "man feeding baby",
                    variations: ["👨🏻‍🍼", "👨🏼‍🍼", "👨🏽‍🍼", "👨🏾‍🍼", "👨🏿‍🍼"],
                    version: "13.0"
                }, {
                    emoji: "🧑‍🍼",
                    category: 1,
                    name: "person feeding baby",
                    variations: ["🧑🏻‍🍼", "🧑🏼‍🍼", "🧑🏽‍🍼", "🧑🏾‍🍼", "🧑🏿‍🍼"],
                    version: "13.0"
                }, {
                    emoji: "👼",
                    category: 1,
                    name: "baby angel",
                    variations: ["👼🏻", "👼🏼", "👼🏽", "👼🏾", "👼🏿"],
                    version: "1.0"
                }, {
                    emoji: "🎅",
                    category: 1,
                    name: "Santa Claus",
                    variations: ["🎅🏻", "🎅🏼", "🎅🏽", "🎅🏾", "🎅🏿"],
                    version: "1.0"
                }, {
                    emoji: "🤶",
                    category: 1,
                    name: "Mrs. Claus",
                    variations: ["🤶🏻", "🤶🏼", "🤶🏽", "🤶🏾", "🤶🏿"],
                    version: "3.0"
                }, {
                    emoji: "🧑‍🎄",
                    category: 1,
                    name: "mx claus",
                    variations: ["🧑🏻‍🎄", "🧑🏼‍🎄", "🧑🏽‍🎄", "🧑🏾‍🎄", "🧑🏿‍🎄"],
                    version: "13.0"
                }, {
                    emoji: "🦸",
                    category: 1,
                    name: "superhero",
                    variations: ["🦸🏻", "🦸🏼", "🦸🏽", "🦸🏾", "🦸🏿"],
                    version: "11.0"
                }, {
                    emoji: "🦸‍♂️",
                    category: 1,
                    name: "man superhero",
                    variations: ["🦸🏻‍♂️", "🦸🏼‍♂️", "🦸🏽‍♂️", "🦸🏾‍♂️", "🦸🏿‍♂️"],
                    version: "11.0"
                }, {
                    emoji: "🦸‍♀️",
                    category: 1,
                    name: "woman superhero",
                    variations: ["🦸🏻‍♀️", "🦸🏼‍♀️", "🦸🏽‍♀️", "🦸🏾‍♀️", "🦸🏿‍♀️"],
                    version: "11.0"
                }, {
                    emoji: "🦹",
                    category: 1,
                    name: "supervillain",
                    variations: ["🦹🏻", "🦹🏼", "🦹🏽", "🦹🏾", "🦹🏿"],
                    version: "11.0"
                }, {
                    emoji: "🦹‍♂️",
                    category: 1,
                    name: "man supervillain",
                    variations: ["🦹🏻‍♂️", "🦹🏼‍♂️", "🦹🏽‍♂️", "🦹🏾‍♂️", "🦹🏿‍♂️"],
                    version: "11.0"
                }, {
                    emoji: "🦹‍♀️",
                    category: 1,
                    name: "woman supervillain",
                    variations: ["🦹🏻‍♀️", "🦹🏼‍♀️", "🦹🏽‍♀️", "🦹🏾‍♀️", "🦹🏿‍♀️"],
                    version: "11.0"
                }, {
                    emoji: "🧙",
                    category: 1,
                    name: "mage",
                    variations: ["🧙🏻", "🧙🏼", "🧙🏽", "🧙🏾", "🧙🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧙‍♂️",
                    category: 1,
                    name: "man mage",
                    variations: ["🧙🏻‍♂️", "🧙🏼‍♂️", "🧙🏽‍♂️", "🧙🏾‍♂️", "🧙🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧙‍♀️",
                    category: 1,
                    name: "woman mage",
                    variations: ["🧙🏻‍♀️", "🧙🏼‍♀️", "🧙🏽‍♀️", "🧙🏾‍♀️", "🧙🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧚",
                    category: 1,
                    name: "fairy",
                    variations: ["🧚🏻", "🧚🏼", "🧚🏽", "🧚🏾", "🧚🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧚‍♂️",
                    category: 1,
                    name: "man fairy",
                    variations: ["🧚🏻‍♂️", "🧚🏼‍♂️", "🧚🏽‍♂️", "🧚🏾‍♂️", "🧚🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧚‍♀️",
                    category: 1,
                    name: "woman fairy",
                    variations: ["🧚🏻‍♀️", "🧚🏼‍♀️", "🧚🏽‍♀️", "🧚🏾‍♀️", "🧚🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧛",
                    category: 1,
                    name: "vampire",
                    variations: ["🧛🏻", "🧛🏼", "🧛🏽", "🧛🏾", "🧛🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧛‍♂️",
                    category: 1,
                    name: "man vampire",
                    variations: ["🧛🏻‍♂️", "🧛🏼‍♂️", "🧛🏽‍♂️", "🧛🏾‍♂️", "🧛🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧛‍♀️",
                    category: 1,
                    name: "woman vampire",
                    variations: ["🧛🏻‍♀️", "🧛🏼‍♀️", "🧛🏽‍♀️", "🧛🏾‍♀️", "🧛🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧜",
                    category: 1,
                    name: "merperson",
                    variations: ["🧜🏻", "🧜🏼", "🧜🏽", "🧜🏾", "🧜🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧜‍♂️",
                    category: 1,
                    name: "merman",
                    variations: ["🧜🏻‍♂️", "🧜🏼‍♂️", "🧜🏽‍♂️", "🧜🏾‍♂️", "🧜🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧜‍♀️",
                    category: 1,
                    name: "mermaid",
                    variations: ["🧜🏻‍♀️", "🧜🏼‍♀️", "🧜🏽‍♀️", "🧜🏾‍♀️", "🧜🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧝",
                    category: 1,
                    name: "elf",
                    variations: ["🧝🏻", "🧝🏼", "🧝🏽", "🧝🏾", "🧝🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧝‍♂️",
                    category: 1,
                    name: "man elf",
                    variations: ["🧝🏻‍♂️", "🧝🏼‍♂️", "🧝🏽‍♂️", "🧝🏾‍♂️", "🧝🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧝‍♀️",
                    category: 1,
                    name: "woman elf",
                    variations: ["🧝🏻‍♀️", "🧝🏼‍♀️", "🧝🏽‍♀️", "🧝🏾‍♀️", "🧝🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧞",
                    category: 1,
                    name: "genie",
                    version: "5.0"
                }, {
                    emoji: "🧞‍♂️",
                    category: 1,
                    name: "man genie",
                    version: "5.0"
                }, {
                    emoji: "🧞‍♀️",
                    category: 1,
                    name: "woman genie",
                    version: "5.0"
                }, {
                    emoji: "🧟",
                    category: 1,
                    name: "zombie",
                    version: "5.0"
                }, {
                    emoji: "🧟‍♂️",
                    category: 1,
                    name: "man zombie",
                    version: "5.0"
                }, {
                    emoji: "🧟‍♀️",
                    category: 1,
                    name: "woman zombie",
                    version: "5.0"
                }, {
                    emoji: "💆",
                    category: 1,
                    name: "person getting massage",
                    variations: ["💆🏻", "💆🏼", "💆🏽", "💆🏾", "💆🏿"],
                    version: "1.0"
                }, {
                    emoji: "💆‍♂️",
                    category: 1,
                    name: "man getting massage",
                    variations: ["💆🏻‍♂️", "💆🏼‍♂️", "💆🏽‍♂️", "💆🏾‍♂️", "💆🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "💆‍♀️",
                    category: 1,
                    name: "woman getting massage",
                    variations: ["💆🏻‍♀️", "💆🏼‍♀️", "💆🏽‍♀️", "💆🏾‍♀️", "💆🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "💇",
                    category: 1,
                    name: "person getting haircut",
                    variations: ["💇🏻", "💇🏼", "💇🏽", "💇🏾", "💇🏿"],
                    version: "1.0"
                }, {
                    emoji: "💇‍♂️",
                    category: 1,
                    name: "man getting haircut",
                    variations: ["💇🏻‍♂️", "💇🏼‍♂️", "💇🏽‍♂️", "💇🏾‍♂️", "💇🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "💇‍♀️",
                    category: 1,
                    name: "woman getting haircut",
                    variations: ["💇🏻‍♀️", "💇🏼‍♀️", "💇🏽‍♀️", "💇🏾‍♀️", "💇🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🚶",
                    category: 1,
                    name: "person walking",
                    variations: ["🚶🏻", "🚶🏼", "🚶🏽", "🚶🏾", "🚶🏿"],
                    version: "1.0"
                }, {
                    emoji: "🚶‍♂️",
                    category: 1,
                    name: "man walking",
                    variations: ["🚶🏻‍♂️", "🚶🏼‍♂️", "🚶🏽‍♂️", "🚶🏾‍♂️", "🚶🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🚶‍♀️",
                    category: 1,
                    name: "woman walking",
                    variations: ["🚶🏻‍♀️", "🚶🏼‍♀️", "🚶🏽‍♀️", "🚶🏾‍♀️", "🚶🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🧍",
                    category: 1,
                    name: "person standing",
                    variations: ["🧍🏻", "🧍🏼", "🧍🏽", "🧍🏾", "🧍🏿"],
                    version: "12.0"
                }, {
                    emoji: "🧍‍♂️",
                    category: 1,
                    name: "man standing",
                    variations: ["🧍🏻‍♂️", "🧍🏼‍♂️", "🧍🏽‍♂️", "🧍🏾‍♂️", "🧍🏿‍♂️"],
                    version: "12.0"
                }, {
                    emoji: "🧍‍♀️",
                    category: 1,
                    name: "woman standing",
                    variations: ["🧍🏻‍♀️", "🧍🏼‍♀️", "🧍🏽‍♀️", "🧍🏾‍♀️", "🧍🏿‍♀️"],
                    version: "12.0"
                }, {
                    emoji: "🧎",
                    category: 1,
                    name: "person kneeling",
                    variations: ["🧎🏻", "🧎🏼", "🧎🏽", "🧎🏾", "🧎🏿"],
                    version: "12.0"
                }, {
                    emoji: "🧎‍♂️",
                    category: 1,
                    name: "man kneeling",
                    variations: ["🧎🏻‍♂️", "🧎🏼‍♂️", "🧎🏽‍♂️", "🧎🏾‍♂️", "🧎🏿‍♂️"],
                    version: "12.0"
                }, {
                    emoji: "🧎‍♀️",
                    category: 1,
                    name: "woman kneeling",
                    variations: ["🧎🏻‍♀️", "🧎🏼‍♀️", "🧎🏽‍♀️", "🧎🏾‍♀️", "🧎🏿‍♀️"],
                    version: "12.0"
                }, {
                    emoji: "🧑‍🦯",
                    category: 1,
                    name: "person with white cane",
                    variations: ["🧑🏻‍🦯", "🧑🏼‍🦯", "🧑🏽‍🦯", "🧑🏾‍🦯", "🧑🏿‍🦯"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🦯",
                    category: 1,
                    name: "man with white cane",
                    variations: ["👨🏻‍🦯", "👨🏼‍🦯", "👨🏽‍🦯", "👨🏾‍🦯", "👨🏿‍🦯"],
                    version: "12.0"
                }, {
                    emoji: "👩‍🦯",
                    category: 1,
                    name: "woman with white cane",
                    variations: ["👩🏻‍🦯", "👩🏼‍🦯", "👩🏽‍🦯", "👩🏾‍🦯", "👩🏿‍🦯"],
                    version: "12.0"
                }, {
                    emoji: "🧑‍🦼",
                    category: 1,
                    name: "person in motorized wheelchair",
                    variations: ["🧑🏻‍🦼", "🧑🏼‍🦼", "🧑🏽‍🦼", "🧑🏾‍🦼", "🧑🏿‍🦼"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🦼",
                    category: 1,
                    name: "man in motorized wheelchair",
                    variations: ["👨🏻‍🦼", "👨🏼‍🦼", "👨🏽‍🦼", "👨🏾‍🦼", "👨🏿‍🦼"],
                    version: "12.0"
                }, {
                    emoji: "👩‍🦼",
                    category: 1,
                    name: "woman in motorized wheelchair",
                    variations: ["👩🏻‍🦼", "👩🏼‍🦼", "👩🏽‍🦼", "👩🏾‍🦼", "👩🏿‍🦼"],
                    version: "12.0"
                }, {
                    emoji: "🧑‍🦽",
                    category: 1,
                    name: "person in manual wheelchair",
                    variations: ["🧑🏻‍🦽", "🧑🏼‍🦽", "🧑🏽‍🦽", "🧑🏾‍🦽", "🧑🏿‍🦽"],
                    version: "12.1"
                }, {
                    emoji: "👨‍🦽",
                    category: 1,
                    name: "man in manual wheelchair",
                    variations: ["👨🏻‍🦽", "👨🏼‍🦽", "👨🏽‍🦽", "👨🏾‍🦽", "👨🏿‍🦽"],
                    version: "12.0"
                }, {
                    emoji: "👩‍🦽",
                    category: 1,
                    name: "woman in manual wheelchair",
                    variations: ["👩🏻‍🦽", "👩🏼‍🦽", "👩🏽‍🦽", "👩🏾‍🦽", "👩🏿‍🦽"],
                    version: "12.0"
                }, {
                    emoji: "🏃",
                    category: 1,
                    name: "person running",
                    variations: ["🏃🏻", "🏃🏼", "🏃🏽", "🏃🏾", "🏃🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏃‍♂️",
                    category: 1,
                    name: "man running",
                    variations: ["🏃🏻‍♂️", "🏃🏼‍♂️", "🏃🏽‍♂️", "🏃🏾‍♂️", "🏃🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🏃‍♀️",
                    category: 1,
                    name: "woman running",
                    variations: ["🏃🏻‍♀️", "🏃🏼‍♀️", "🏃🏽‍♀️", "🏃🏾‍♀️", "🏃🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "💃",
                    category: 1,
                    name: "woman dancing",
                    variations: ["💃🏻", "💃🏼", "💃🏽", "💃🏾", "💃🏿"],
                    version: "1.0"
                }, {
                    emoji: "🕺",
                    category: 1,
                    name: "man dancing",
                    variations: ["🕺🏻", "🕺🏼", "🕺🏽", "🕺🏾", "🕺🏿"],
                    version: "3.0"
                }, {
                    emoji: "🕴️",
                    category: 1,
                    name: "person in suit levitating",
                    variations: ["🕴🏻", "🕴🏼", "🕴🏽", "🕴🏾", "🕴🏿"],
                    version: "1.0"
                }, {
                    emoji: "👯",
                    category: 1,
                    name: "people with bunny ears",
                    version: "1.0"
                }, {
                    emoji: "👯‍♂️",
                    category: 1,
                    name: "men with bunny ears",
                    version: "4.0"
                }, {
                    emoji: "👯‍♀️",
                    category: 1,
                    name: "women with bunny ears",
                    version: "4.0"
                }, {
                    emoji: "🧖",
                    category: 1,
                    name: "person in steamy room",
                    variations: ["🧖🏻", "🧖🏼", "🧖🏽", "🧖🏾", "🧖🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧖‍♂️",
                    category: 1,
                    name: "man in steamy room",
                    variations: ["🧖🏻‍♂️", "🧖🏼‍♂️", "🧖🏽‍♂️", "🧖🏾‍♂️", "🧖🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧖‍♀️",
                    category: 1,
                    name: "woman in steamy room",
                    variations: ["🧖🏻‍♀️", "🧖🏼‍♀️", "🧖🏽‍♀️", "🧖🏾‍♀️", "🧖🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🧗",
                    category: 1,
                    name: "person climbing",
                    variations: ["🧗🏻", "🧗🏼", "🧗🏽", "🧗🏾", "🧗🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧗‍♂️",
                    category: 1,
                    name: "man climbing",
                    variations: ["🧗🏻‍♂️", "🧗🏼‍♂️", "🧗🏽‍♂️", "🧗🏾‍♂️", "🧗🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧗‍♀️",
                    category: 1,
                    name: "woman climbing",
                    variations: ["🧗🏻‍♀️", "🧗🏼‍♀️", "🧗🏽‍♀️", "🧗🏾‍♀️", "🧗🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🤺",
                    category: 1,
                    name: "person fencing",
                    version: "3.0"
                }, {
                    emoji: "🏇",
                    category: 1,
                    name: "horse racing",
                    variations: ["🏇🏻", "🏇🏼", "🏇🏽", "🏇🏾", "🏇🏿"],
                    version: "1.0"
                }, {
                    emoji: "⛷️",
                    category: 1,
                    name: "skier",
                    version: "1.0"
                }, {
                    emoji: "🏂",
                    category: 1,
                    name: "snowboarder",
                    variations: ["🏂🏻", "🏂🏼", "🏂🏽", "🏂🏾", "🏂🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏌️",
                    category: 1,
                    name: "person golfing",
                    variations: ["🏌🏻", "🏌🏼", "🏌🏽", "🏌🏾", "🏌🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏌️‍♂️",
                    category: 1,
                    name: "man golfing",
                    variations: ["🏌🏻‍♂️", "🏌🏼‍♂️", "🏌🏽‍♂️", "🏌🏾‍♂️", "🏌🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🏌️‍♀️",
                    category: 1,
                    name: "woman golfing",
                    variations: ["🏌🏻‍♀️", "🏌🏼‍♀️", "🏌🏽‍♀️", "🏌🏾‍♀️", "🏌🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🏄",
                    category: 1,
                    name: "person surfing",
                    variations: ["🏄🏻", "🏄🏼", "🏄🏽", "🏄🏾", "🏄🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏄‍♂️",
                    category: 1,
                    name: "man surfing",
                    variations: ["🏄🏻‍♂️", "🏄🏼‍♂️", "🏄🏽‍♂️", "🏄🏾‍♂️", "🏄🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🏄‍♀️",
                    category: 1,
                    name: "woman surfing",
                    variations: ["🏄🏻‍♀️", "🏄🏼‍♀️", "🏄🏽‍♀️", "🏄🏾‍♀️", "🏄🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🚣",
                    category: 1,
                    name: "person rowing boat",
                    variations: ["🚣🏻", "🚣🏼", "🚣🏽", "🚣🏾", "🚣🏿"],
                    version: "1.0"
                }, {
                    emoji: "🚣‍♂️",
                    category: 1,
                    name: "man rowing boat",
                    variations: ["🚣🏻‍♂️", "🚣🏼‍♂️", "🚣🏽‍♂️", "🚣🏾‍♂️", "🚣🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🚣‍♀️",
                    category: 1,
                    name: "woman rowing boat",
                    variations: ["🚣🏻‍♀️", "🚣🏼‍♀️", "🚣🏽‍♀️", "🚣🏾‍♀️", "🚣🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🏊",
                    category: 1,
                    name: "person swimming",
                    variations: ["🏊🏻", "🏊🏼", "🏊🏽", "🏊🏾", "🏊🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏊‍♂️",
                    category: 1,
                    name: "man swimming",
                    variations: ["🏊🏻‍♂️", "🏊🏼‍♂️", "🏊🏽‍♂️", "🏊🏾‍♂️", "🏊🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🏊‍♀️",
                    category: 1,
                    name: "woman swimming",
                    variations: ["🏊🏻‍♀️", "🏊🏼‍♀️", "🏊🏽‍♀️", "🏊🏾‍♀️", "🏊🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "⛹️",
                    category: 1,
                    name: "person bouncing ball",
                    variations: ["⛹🏻", "⛹🏼", "⛹🏽", "⛹🏾", "⛹🏿"],
                    version: "1.0"
                }, {
                    emoji: "⛹️‍♂️",
                    category: 1,
                    name: "man bouncing ball",
                    variations: ["⛹🏻‍♂️", "⛹🏼‍♂️", "⛹🏽‍♂️", "⛹🏾‍♂️", "⛹🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "⛹️‍♀️",
                    category: 1,
                    name: "woman bouncing ball",
                    variations: ["⛹🏻‍♀️", "⛹🏼‍♀️", "⛹🏽‍♀️", "⛹🏾‍♀️", "⛹🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🏋️",
                    category: 1,
                    name: "person lifting weights",
                    variations: ["🏋🏻", "🏋🏼", "🏋🏽", "🏋🏾", "🏋🏿"],
                    version: "1.0"
                }, {
                    emoji: "🏋️‍♂️",
                    category: 1,
                    name: "man lifting weights",
                    variations: ["🏋🏻‍♂️", "🏋🏼‍♂️", "🏋🏽‍♂️", "🏋🏾‍♂️", "🏋🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🏋️‍♀️",
                    category: 1,
                    name: "woman lifting weights",
                    variations: ["🏋🏻‍♀️", "🏋🏼‍♀️", "🏋🏽‍♀️", "🏋🏾‍♀️", "🏋🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🚴",
                    category: 1,
                    name: "person biking",
                    variations: ["🚴🏻", "🚴🏼", "🚴🏽", "🚴🏾", "🚴🏿"],
                    version: "1.0"
                }, {
                    emoji: "🚴‍♂️",
                    category: 1,
                    name: "man biking",
                    variations: ["🚴🏻‍♂️", "🚴🏼‍♂️", "🚴🏽‍♂️", "🚴🏾‍♂️", "🚴🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🚴‍♀️",
                    category: 1,
                    name: "woman biking",
                    variations: ["🚴🏻‍♀️", "🚴🏼‍♀️", "🚴🏽‍♀️", "🚴🏾‍♀️", "🚴🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🚵",
                    category: 1,
                    name: "person mountain biking",
                    variations: ["🚵🏻", "🚵🏼", "🚵🏽", "🚵🏾", "🚵🏿"],
                    version: "1.0"
                }, {
                    emoji: "🚵‍♂️",
                    category: 1,
                    name: "man mountain biking",
                    variations: ["🚵🏻‍♂️", "🚵🏼‍♂️", "🚵🏽‍♂️", "🚵🏾‍♂️", "🚵🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🚵‍♀️",
                    category: 1,
                    name: "woman mountain biking",
                    variations: ["🚵🏻‍♀️", "🚵🏼‍♀️", "🚵🏽‍♀️", "🚵🏾‍♀️", "🚵🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤸",
                    category: 1,
                    name: "person cartwheeling",
                    variations: ["🤸🏻", "🤸🏼", "🤸🏽", "🤸🏾", "🤸🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤸‍♂️",
                    category: 1,
                    name: "man cartwheeling",
                    variations: ["🤸🏻‍♂️", "🤸🏼‍♂️", "🤸🏽‍♂️", "🤸🏾‍♂️", "🤸🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤸‍♀️",
                    category: 1,
                    name: "woman cartwheeling",
                    variations: ["🤸🏻‍♀️", "🤸🏼‍♀️", "🤸🏽‍♀️", "🤸🏾‍♀️", "🤸🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤼",
                    category: 1,
                    name: "people wrestling",
                    version: "3.0"
                }, {
                    emoji: "🤼‍♂️",
                    category: 1,
                    name: "men wrestling",
                    version: "4.0"
                }, {
                    emoji: "🤼‍♀️",
                    category: 1,
                    name: "women wrestling",
                    version: "4.0"
                }, {
                    emoji: "🤽",
                    category: 1,
                    name: "person playing water polo",
                    variations: ["🤽🏻", "🤽🏼", "🤽🏽", "🤽🏾", "🤽🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤽‍♂️",
                    category: 1,
                    name: "man playing water polo",
                    variations: ["🤽🏻‍♂️", "🤽🏼‍♂️", "🤽🏽‍♂️", "🤽🏾‍♂️", "🤽🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤽‍♀️",
                    category: 1,
                    name: "woman playing water polo",
                    variations: ["🤽🏻‍♀️", "🤽🏼‍♀️", "🤽🏽‍♀️", "🤽🏾‍♀️", "🤽🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤾",
                    category: 1,
                    name: "person playing handball",
                    variations: ["🤾🏻", "🤾🏼", "🤾🏽", "🤾🏾", "🤾🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤾‍♂️",
                    category: 1,
                    name: "man playing handball",
                    variations: ["🤾🏻‍♂️", "🤾🏼‍♂️", "🤾🏽‍♂️", "🤾🏾‍♂️", "🤾🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤾‍♀️",
                    category: 1,
                    name: "woman playing handball",
                    variations: ["🤾🏻‍♀️", "🤾🏼‍♀️", "🤾🏽‍♀️", "🤾🏾‍♀️", "🤾🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🤹",
                    category: 1,
                    name: "person juggling",
                    variations: ["🤹🏻", "🤹🏼", "🤹🏽", "🤹🏾", "🤹🏿"],
                    version: "3.0"
                }, {
                    emoji: "🤹‍♂️",
                    category: 1,
                    name: "man juggling",
                    variations: ["🤹🏻‍♂️", "🤹🏼‍♂️", "🤹🏽‍♂️", "🤹🏾‍♂️", "🤹🏿‍♂️"],
                    version: "4.0"
                }, {
                    emoji: "🤹‍♀️",
                    category: 1,
                    name: "woman juggling",
                    variations: ["🤹🏻‍♀️", "🤹🏼‍♀️", "🤹🏽‍♀️", "🤹🏾‍♀️", "🤹🏿‍♀️"],
                    version: "4.0"
                }, {
                    emoji: "🧘",
                    category: 1,
                    name: "person in lotus position",
                    variations: ["🧘🏻", "🧘🏼", "🧘🏽", "🧘🏾", "🧘🏿"],
                    version: "5.0"
                }, {
                    emoji: "🧘‍♂️",
                    category: 1,
                    name: "man in lotus position",
                    variations: ["🧘🏻‍♂️", "🧘🏼‍♂️", "🧘🏽‍♂️", "🧘🏾‍♂️", "🧘🏿‍♂️"],
                    version: "5.0"
                }, {
                    emoji: "🧘‍♀️",
                    category: 1,
                    name: "woman in lotus position",
                    variations: ["🧘🏻‍♀️", "🧘🏼‍♀️", "🧘🏽‍♀️", "🧘🏾‍♀️", "🧘🏿‍♀️"],
                    version: "5.0"
                }, {
                    emoji: "🛀",
                    category: 1,
                    name: "person taking bath",
                    variations: ["🛀🏻", "🛀🏼", "🛀🏽", "🛀🏾", "🛀🏿"],
                    version: "1.0"
                }, {
                    emoji: "🛌",
                    category: 1,
                    name: "person in bed",
                    variations: ["🛌🏻", "🛌🏼", "🛌🏽", "🛌🏾", "🛌🏿"],
                    version: "1.0"
                }, {
                    emoji: "🧑‍🤝‍🧑",
                    category: 1,
                    name: "people holding hands",
                    variations: ["🧑🏻‍🤝‍🧑🏻", "🧑🏻‍🤝‍🧑🏼", "🧑🏻‍🤝‍🧑🏽", "🧑🏻‍🤝‍🧑🏾", "🧑🏻‍🤝‍🧑🏿", "🧑🏼‍🤝‍🧑🏻", "🧑🏼‍🤝‍🧑🏼", "🧑🏼‍🤝‍🧑🏽", "🧑🏼‍🤝‍🧑🏾", "🧑🏼‍🤝‍🧑🏿", "🧑🏽‍🤝‍🧑🏻", "🧑🏽‍🤝‍🧑🏼", "🧑🏽‍🤝‍🧑🏽", "🧑🏽‍🤝‍🧑🏾", "🧑🏽‍🤝‍🧑🏿", "🧑🏾‍🤝‍🧑🏻", "🧑🏾‍🤝‍🧑🏼", "🧑🏾‍🤝‍🧑🏽", "🧑🏾‍🤝‍🧑🏾", "🧑🏾‍🤝‍🧑🏿", "🧑🏿‍🤝‍🧑🏻", "🧑🏿‍🤝‍🧑🏼", "🧑🏿‍🤝‍🧑🏽", "🧑🏿‍🤝‍🧑🏾", "🧑🏿‍🤝‍🧑🏿"],
                    version: "12.0"
                }, {
                    emoji: "👭",
                    category: 1,
                    name: "women holding hands",
                    variations: ["👭🏻", "👩🏻‍🤝‍👩🏼", "👩🏻‍🤝‍👩🏽", "👩🏻‍🤝‍👩🏾", "👩🏻‍🤝‍👩🏿", "👩🏼‍🤝‍👩🏻", "👭🏼", "👩🏼‍🤝‍👩🏽", "👩🏼‍🤝‍👩🏾", "👩🏼‍🤝‍👩🏿", "👩🏽‍🤝‍👩🏻", "👩🏽‍🤝‍👩🏼", "👭🏽", "👩🏽‍🤝‍👩🏾", "👩🏽‍🤝‍👩🏿", "👩🏾‍🤝‍👩🏻", "👩🏾‍🤝‍👩🏼", "👩🏾‍🤝‍👩🏽", "👭🏾", "👩🏾‍🤝‍👩🏿", "👩🏿‍🤝‍👩🏻", "👩🏿‍🤝‍👩🏼", "👩🏿‍🤝‍👩🏽", "👩🏿‍🤝‍👩🏾", "👭🏿"],
                    version: "1.0"
                }, {
                    emoji: "👫",
                    category: 1,
                    name: "woman and man holding hands",
                    variations: ["👫🏻", "👩🏻‍🤝‍👨🏼", "👩🏻‍🤝‍👨🏽", "👩🏻‍🤝‍👨🏾", "👩🏻‍🤝‍👨🏿", "👩🏼‍🤝‍👨🏻", "👫🏼", "👩🏼‍🤝‍👨🏽", "👩🏼‍🤝‍👨🏾", "👩🏼‍🤝‍👨🏿", "👩🏽‍🤝‍👨🏻", "👩🏽‍🤝‍👨🏼", "👫🏽", "👩🏽‍🤝‍👨🏾", "👩🏽‍🤝‍👨🏿", "👩🏾‍🤝‍👨🏻", "👩🏾‍🤝‍👨🏼", "👩🏾‍🤝‍👨🏽", "👫🏾", "👩🏾‍🤝‍👨🏿", "👩🏿‍🤝‍👨🏻", "👩🏿‍🤝‍👨🏼", "👩🏿‍🤝‍👨🏽", "👩🏿‍🤝‍👨🏾", "👫🏿"],
                    version: "1.0"
                }, {
                    emoji: "👬",
                    category: 1,
                    name: "men holding hands",
                    variations: ["👬🏻", "👨🏻‍🤝‍👨🏼", "👨🏻‍🤝‍👨🏽", "👨🏻‍🤝‍👨🏾", "👨🏻‍🤝‍👨🏿", "👨🏼‍🤝‍👨🏻", "👬🏼", "👨🏼‍🤝‍👨🏽", "👨🏼‍🤝‍👨🏾", "👨🏼‍🤝‍👨🏿", "👨🏽‍🤝‍👨🏻", "👨🏽‍🤝‍👨🏼", "👬🏽", "👨🏽‍🤝‍👨🏾", "👨🏽‍🤝‍👨🏿", "👨🏾‍🤝‍👨🏻", "👨🏾‍🤝‍👨🏼", "👨🏾‍🤝‍👨🏽", "👬🏾", "👨🏾‍🤝‍👨🏿", "👨🏿‍🤝‍👨🏻", "👨🏿‍🤝‍👨🏼", "👨🏿‍🤝‍👨🏽", "👨🏿‍🤝‍👨🏾", "👬🏿"],
                    version: "1.0"
                }, {
                    emoji: "💏",
                    category: 1,
                    name: "kiss",
                    variations: ["👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩"],
                    version: "1.0"
                }, {
                    emoji: "💑",
                    category: 1,
                    name: "couple with heart",
                    variations: ["👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩"],
                    version: "1.0"
                }, {
                    emoji: "👪",
                    category: 1,
                    name: "family",
                    version: "1.0"
                }, {
                    emoji: "👨‍👩‍👦",
                    category: 1,
                    name: "family: man, woman, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👩‍👧",
                    category: 1,
                    name: "family: man, woman, girl",
                    version: "2.0"
                }, {
                    emoji: "👨‍👩‍👧‍👦",
                    category: 1,
                    name: "family: man, woman, girl, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👩‍👦‍👦",
                    category: 1,
                    name: "family: man, woman, boy, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👩‍👧‍👧",
                    category: 1,
                    name: "family: man, woman, girl, girl",
                    version: "2.0"
                }, {
                    emoji: "👨‍👨‍👦",
                    category: 1,
                    name: "family: man, man, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👨‍👧",
                    category: 1,
                    name: "family: man, man, girl",
                    version: "2.0"
                }, {
                    emoji: "👨‍👨‍👧‍👦",
                    category: 1,
                    name: "family: man, man, girl, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👨‍👦‍👦",
                    category: 1,
                    name: "family: man, man, boy, boy",
                    version: "2.0"
                }, {
                    emoji: "👨‍👨‍👧‍👧",
                    category: 1,
                    name: "family: man, man, girl, girl",
                    version: "2.0"
                }, {
                    emoji: "👩‍👩‍👦",
                    category: 1,
                    name: "family: woman, woman, boy",
                    version: "2.0"
                }, {
                    emoji: "👩‍👩‍👧",
                    category: 1,
                    name: "family: woman, woman, girl",
                    version: "2.0"
                }, {
                    emoji: "👩‍👩‍👧‍👦",
                    category: 1,
                    name: "family: woman, woman, girl, boy",
                    version: "2.0"
                }, {
                    emoji: "👩‍👩‍👦‍👦",
                    category: 1,
                    name: "family: woman, woman, boy, boy",
                    version: "2.0"
                }, {
                    emoji: "👩‍👩‍👧‍👧",
                    category: 1,
                    name: "family: woman, woman, girl, girl",
                    version: "2.0"
                }, {
                    emoji: "👨‍👦",
                    category: 1,
                    name: "family: man, boy",
                    version: "4.0"
                }, {
                    emoji: "👨‍👦‍👦",
                    category: 1,
                    name: "family: man, boy, boy",
                    version: "4.0"
                }, {
                    emoji: "👨‍👧",
                    category: 1,
                    name: "family: man, girl",
                    version: "4.0"
                }, {
                    emoji: "👨‍👧‍👦",
                    category: 1,
                    name: "family: man, girl, boy",
                    version: "4.0"
                }, {
                    emoji: "👨‍👧‍👧",
                    category: 1,
                    name: "family: man, girl, girl",
                    version: "4.0"
                }, {
                    emoji: "👩‍👦",
                    category: 1,
                    name: "family: woman, boy",
                    version: "4.0"
                }, {
                    emoji: "👩‍👦‍👦",
                    category: 1,
                    name: "family: woman, boy, boy",
                    version: "4.0"
                }, {
                    emoji: "👩‍👧",
                    category: 1,
                    name: "family: woman, girl",
                    version: "4.0"
                }, {
                    emoji: "👩‍👧‍👦",
                    category: 1,
                    name: "family: woman, girl, boy",
                    version: "4.0"
                }, {
                    emoji: "👩‍👧‍👧",
                    category: 1,
                    name: "family: woman, girl, girl",
                    version: "4.0"
                }, {
                    emoji: "🗣️",
                    category: 1,
                    name: "speaking head",
                    version: "1.0"
                }, {
                    emoji: "👤",
                    category: 1,
                    name: "bust in silhouette",
                    version: "1.0"
                }, {
                    emoji: "👥",
                    category: 1,
                    name: "busts in silhouette",
                    version: "1.0"
                }, {
                    emoji: "🫂",
                    category: 1,
                    name: "people hugging",
                    version: "13.0"
                }, {
                    emoji: "👣",
                    category: 1,
                    name: "footprints",
                    version: "1.0"
                }, {
                    emoji: "🐵",
                    category: 2,
                    name: "monkey face",
                    version: "1.0"
                }, {
                    emoji: "🐒",
                    category: 2,
                    name: "monkey",
                    version: "1.0"
                }, {
                    emoji: "🦍",
                    category: 2,
                    name: "gorilla",
                    version: "3.0"
                }, {
                    emoji: "🦧",
                    category: 2,
                    name: "orangutan",
                    version: "12.0"
                }, {
                    emoji: "🐶",
                    category: 2,
                    name: "dog face",
                    version: "1.0"
                }, {
                    emoji: "🐕",
                    category: 2,
                    name: "dog",
                    version: "1.0"
                }, {
                    emoji: "🦮",
                    category: 2,
                    name: "guide dog",
                    version: "12.0"
                }, {
                    emoji: "🐕‍🦺",
                    category: 2,
                    name: "service dog",
                    version: "12.0"
                }, {
                    emoji: "🐩",
                    category: 2,
                    name: "poodle",
                    version: "1.0"
                }, {
                    emoji: "🐺",
                    category: 2,
                    name: "wolf",
                    version: "1.0"
                }, {
                    emoji: "🦊",
                    category: 2,
                    name: "fox",
                    version: "3.0"
                }, {
                    emoji: "🦝",
                    category: 2,
                    name: "raccoon",
                    version: "11.0"
                }, {
                    emoji: "🐱",
                    category: 2,
                    name: "cat face",
                    version: "1.0"
                }, {
                    emoji: "🐈",
                    category: 2,
                    name: "cat",
                    version: "1.0"
                }, {
                    emoji: "🐈‍⬛",
                    category: 2,
                    name: "black cat",
                    version: "13.0"
                }, {
                    emoji: "🦁",
                    category: 2,
                    name: "lion",
                    version: "1.0"
                }, {
                    emoji: "🐯",
                    category: 2,
                    name: "tiger face",
                    version: "1.0"
                }, {
                    emoji: "🐅",
                    category: 2,
                    name: "tiger",
                    version: "1.0"
                }, {
                    emoji: "🐆",
                    category: 2,
                    name: "leopard",
                    version: "1.0"
                }, {
                    emoji: "🐴",
                    category: 2,
                    name: "horse face",
                    version: "1.0"
                }, {
                    emoji: "🐎",
                    category: 2,
                    name: "horse",
                    version: "1.0"
                }, {
                    emoji: "🦄",
                    category: 2,
                    name: "unicorn",
                    version: "1.0"
                }, {
                    emoji: "🦓",
                    category: 2,
                    name: "zebra",
                    version: "5.0"
                }, {
                    emoji: "🦌",
                    category: 2,
                    name: "deer",
                    version: "3.0"
                }, {
                    emoji: "🦬",
                    category: 2,
                    name: "bison",
                    version: "13.0"
                }, {
                    emoji: "🐮",
                    category: 2,
                    name: "cow face",
                    version: "1.0"
                }, {
                    emoji: "🐂",
                    category: 2,
                    name: "ox",
                    version: "1.0"
                }, {
                    emoji: "🐃",
                    category: 2,
                    name: "water buffalo",
                    version: "1.0"
                }, {
                    emoji: "🐄",
                    category: 2,
                    name: "cow",
                    version: "1.0"
                }, {
                    emoji: "🐷",
                    category: 2,
                    name: "pig face",
                    version: "1.0"
                }, {
                    emoji: "🐖",
                    category: 2,
                    name: "pig",
                    version: "1.0"
                }, {
                    emoji: "🐗",
                    category: 2,
                    name: "boar",
                    version: "1.0"
                }, {
                    emoji: "🐽",
                    category: 2,
                    name: "pig nose",
                    version: "1.0"
                }, {
                    emoji: "🐏",
                    category: 2,
                    name: "ram",
                    version: "1.0"
                }, {
                    emoji: "🐑",
                    category: 2,
                    name: "ewe",
                    version: "1.0"
                }, {
                    emoji: "🐐",
                    category: 2,
                    name: "goat",
                    version: "1.0"
                }, {
                    emoji: "🐪",
                    category: 2,
                    name: "camel",
                    version: "1.0"
                }, {
                    emoji: "🐫",
                    category: 2,
                    name: "two-hump camel",
                    version: "1.0"
                }, {
                    emoji: "🦙",
                    category: 2,
                    name: "llama",
                    version: "11.0"
                }, {
                    emoji: "🦒",
                    category: 2,
                    name: "giraffe",
                    version: "5.0"
                }, {
                    emoji: "🐘",
                    category: 2,
                    name: "elephant",
                    version: "1.0"
                }, {
                    emoji: "🦣",
                    category: 2,
                    name: "mammoth",
                    version: "13.0"
                }, {
                    emoji: "🦏",
                    category: 2,
                    name: "rhinoceros",
                    version: "3.0"
                }, {
                    emoji: "🦛",
                    category: 2,
                    name: "hippopotamus",
                    version: "11.0"
                }, {
                    emoji: "🐭",
                    category: 2,
                    name: "mouse face",
                    version: "1.0"
                }, {
                    emoji: "🐁",
                    category: 2,
                    name: "mouse",
                    version: "1.0"
                }, {
                    emoji: "🐀",
                    category: 2,
                    name: "rat",
                    version: "1.0"
                }, {
                    emoji: "🐹",
                    category: 2,
                    name: "hamster",
                    version: "1.0"
                }, {
                    emoji: "🐰",
                    category: 2,
                    name: "rabbit face",
                    version: "1.0"
                }, {
                    emoji: "🐇",
                    category: 2,
                    name: "rabbit",
                    version: "1.0"
                }, {
                    emoji: "🐿️",
                    category: 2,
                    name: "chipmunk",
                    version: "1.0"
                }, {
                    emoji: "🦫",
                    category: 2,
                    name: "beaver",
                    version: "13.0"
                }, {
                    emoji: "🦔",
                    category: 2,
                    name: "hedgehog",
                    version: "5.0"
                }, {
                    emoji: "🦇",
                    category: 2,
                    name: "bat",
                    version: "3.0"
                }, {
                    emoji: "🐻",
                    category: 2,
                    name: "bear",
                    version: "1.0"
                }, {
                    emoji: "🐻‍❄️",
                    category: 2,
                    name: "polar bear",
                    version: "13.0"
                }, {
                    emoji: "🐨",
                    category: 2,
                    name: "koala",
                    version: "1.0"
                }, {
                    emoji: "🐼",
                    category: 2,
                    name: "panda",
                    version: "1.0"
                }, {
                    emoji: "🦥",
                    category: 2,
                    name: "sloth",
                    version: "12.0"
                }, {
                    emoji: "🦦",
                    category: 2,
                    name: "otter",
                    version: "12.0"
                }, {
                    emoji: "🦨",
                    category: 2,
                    name: "skunk",
                    version: "12.0"
                }, {
                    emoji: "🦘",
                    category: 2,
                    name: "kangaroo",
                    version: "11.0"
                }, {
                    emoji: "🦡",
                    category: 2,
                    name: "badger",
                    version: "11.0"
                }, {
                    emoji: "🐾",
                    category: 2,
                    name: "paw prints",
                    version: "1.0"
                }, {
                    emoji: "🦃",
                    category: 2,
                    name: "turkey",
                    version: "1.0"
                }, {
                    emoji: "🐔",
                    category: 2,
                    name: "chicken",
                    version: "1.0"
                }, {
                    emoji: "🐓",
                    category: 2,
                    name: "rooster",
                    version: "1.0"
                }, {
                    emoji: "🐣",
                    category: 2,
                    name: "hatching chick",
                    version: "1.0"
                }, {
                    emoji: "🐤",
                    category: 2,
                    name: "baby chick",
                    version: "1.0"
                }, {
                    emoji: "🐥",
                    category: 2,
                    name: "front-facing baby chick",
                    version: "1.0"
                }, {
                    emoji: "🐦",
                    category: 2,
                    name: "bird",
                    version: "1.0"
                }, {
                    emoji: "🐧",
                    category: 2,
                    name: "penguin",
                    version: "1.0"
                }, {
                    emoji: "🕊️",
                    category: 2,
                    name: "dove",
                    version: "1.0"
                }, {
                    emoji: "🦅",
                    category: 2,
                    name: "eagle",
                    version: "3.0"
                }, {
                    emoji: "🦆",
                    category: 2,
                    name: "duck",
                    version: "3.0"
                }, {
                    emoji: "🦢",
                    category: 2,
                    name: "swan",
                    version: "11.0"
                }, {
                    emoji: "🦉",
                    category: 2,
                    name: "owl",
                    version: "3.0"
                }, {
                    emoji: "🦤",
                    category: 2,
                    name: "dodo",
                    version: "13.0"
                }, {
                    emoji: "🪶",
                    category: 2,
                    name: "feather",
                    version: "13.0"
                }, {
                    emoji: "🦩",
                    category: 2,
                    name: "flamingo",
                    version: "12.0"
                }, {
                    emoji: "🦚",
                    category: 2,
                    name: "peacock",
                    version: "11.0"
                }, {
                    emoji: "🦜",
                    category: 2,
                    name: "parrot",
                    version: "11.0"
                }, {
                    emoji: "🐸",
                    category: 2,
                    name: "frog",
                    version: "1.0"
                }, {
                    emoji: "🐊",
                    category: 2,
                    name: "crocodile",
                    version: "1.0"
                }, {
                    emoji: "🐢",
                    category: 2,
                    name: "turtle",
                    version: "1.0"
                }, {
                    emoji: "🦎",
                    category: 2,
                    name: "lizard",
                    version: "3.0"
                }, {
                    emoji: "🐍",
                    category: 2,
                    name: "snake",
                    version: "1.0"
                }, {
                    emoji: "🐲",
                    category: 2,
                    name: "dragon face",
                    version: "1.0"
                }, {
                    emoji: "🐉",
                    category: 2,
                    name: "dragon",
                    version: "1.0"
                }, {
                    emoji: "🦕",
                    category: 2,
                    name: "sauropod",
                    version: "5.0"
                }, {
                    emoji: "🦖",
                    category: 2,
                    name: "T-Rex",
                    version: "5.0"
                }, {
                    emoji: "🐳",
                    category: 2,
                    name: "spouting whale",
                    version: "1.0"
                }, {
                    emoji: "🐋",
                    category: 2,
                    name: "whale",
                    version: "1.0"
                }, {
                    emoji: "🐬",
                    category: 2,
                    name: "dolphin",
                    version: "1.0"
                }, {
                    emoji: "🦭",
                    category: 2,
                    name: "seal",
                    version: "13.0"
                }, {
                    emoji: "🐟",
                    category: 2,
                    name: "fish",
                    version: "1.0"
                }, {
                    emoji: "🐠",
                    category: 2,
                    name: "tropical fish",
                    version: "1.0"
                }, {
                    emoji: "🐡",
                    category: 2,
                    name: "blowfish",
                    version: "1.0"
                }, {
                    emoji: "🦈",
                    category: 2,
                    name: "shark",
                    version: "3.0"
                }, {
                    emoji: "🐙",
                    category: 2,
                    name: "octopus",
                    version: "1.0"
                }, {
                    emoji: "🐚",
                    category: 2,
                    name: "spiral shell",
                    version: "1.0"
                }, {
                    emoji: "🐌",
                    category: 2,
                    name: "snail",
                    version: "1.0"
                }, {
                    emoji: "🦋",
                    category: 2,
                    name: "butterfly",
                    version: "3.0"
                }, {
                    emoji: "🐛",
                    category: 2,
                    name: "bug",
                    version: "1.0"
                }, {
                    emoji: "🐜",
                    category: 2,
                    name: "ant",
                    version: "1.0"
                }, {
                    emoji: "🐝",
                    category: 2,
                    name: "honeybee",
                    version: "1.0"
                }, {
                    emoji: "🪲",
                    category: 2,
                    name: "beetle",
                    version: "13.0"
                }, {
                    emoji: "🐞",
                    category: 2,
                    name: "lady beetle",
                    version: "1.0"
                }, {
                    emoji: "🦗",
                    category: 2,
                    name: "cricket",
                    version: "5.0"
                }, {
                    emoji: "🪳",
                    category: 2,
                    name: "cockroach",
                    version: "13.0"
                }, {
                    emoji: "🕷️",
                    category: 2,
                    name: "spider",
                    version: "1.0"
                }, {
                    emoji: "🕸️",
                    category: 2,
                    name: "spider web",
                    version: "1.0"
                }, {
                    emoji: "🦂",
                    category: 2,
                    name: "scorpion",
                    version: "1.0"
                }, {
                    emoji: "🦟",
                    category: 2,
                    name: "mosquito",
                    version: "11.0"
                }, {
                    emoji: "🪰",
                    category: 2,
                    name: "fly",
                    version: "13.0"
                }, {
                    emoji: "🪱",
                    category: 2,
                    name: "worm",
                    version: "13.0"
                }, {
                    emoji: "🦠",
                    category: 2,
                    name: "microbe",
                    version: "11.0"
                }, {
                    emoji: "💐",
                    category: 2,
                    name: "bouquet",
                    version: "1.0"
                }, {
                    emoji: "🌸",
                    category: 2,
                    name: "cherry blossom",
                    version: "1.0"
                }, {
                    emoji: "💮",
                    category: 2,
                    name: "white flower",
                    version: "1.0"
                }, {
                    emoji: "🏵️",
                    category: 2,
                    name: "rosette",
                    version: "1.0"
                }, {
                    emoji: "🌹",
                    category: 2,
                    name: "rose",
                    version: "1.0"
                }, {
                    emoji: "🥀",
                    category: 2,
                    name: "wilted flower",
                    version: "3.0"
                }, {
                    emoji: "🌺",
                    category: 2,
                    name: "hibiscus",
                    version: "1.0"
                }, {
                    emoji: "🌻",
                    category: 2,
                    name: "sunflower",
                    version: "1.0"
                }, {
                    emoji: "🌼",
                    category: 2,
                    name: "blossom",
                    version: "1.0"
                }, {
                    emoji: "🌷",
                    category: 2,
                    name: "tulip",
                    version: "1.0"
                }, {
                    emoji: "🌱",
                    category: 2,
                    name: "seedling",
                    version: "1.0"
                }, {
                    emoji: "🪴",
                    category: 2,
                    name: "potted plant",
                    version: "13.0"
                }, {
                    emoji: "🌲",
                    category: 2,
                    name: "evergreen tree",
                    version: "1.0"
                }, {
                    emoji: "🌳",
                    category: 2,
                    name: "deciduous tree",
                    version: "1.0"
                }, {
                    emoji: "🌴",
                    category: 2,
                    name: "palm tree",
                    version: "1.0"
                }, {
                    emoji: "🌵",
                    category: 2,
                    name: "cactus",
                    version: "1.0"
                }, {
                    emoji: "🌾",
                    category: 2,
                    name: "sheaf of rice",
                    version: "1.0"
                }, {
                    emoji: "🌿",
                    category: 2,
                    name: "herb",
                    version: "1.0"
                }, {
                    emoji: "☘️",
                    category: 2,
                    name: "shamrock",
                    version: "1.0"
                }, {
                    emoji: "🍀",
                    category: 2,
                    name: "four leaf clover",
                    version: "1.0"
                }, {
                    emoji: "🍁",
                    category: 2,
                    name: "maple leaf",
                    version: "1.0"
                }, {
                    emoji: "🍂",
                    category: 2,
                    name: "fallen leaf",
                    version: "1.0"
                }, {
                    emoji: "🍃",
                    category: 2,
                    name: "leaf fluttering in wind",
                    version: "1.0"
                }, {
                    emoji: "🍇",
                    category: 3,
                    name: "grapes",
                    version: "1.0"
                }, {
                    emoji: "🍈",
                    category: 3,
                    name: "melon",
                    version: "1.0"
                }, {
                    emoji: "🍉",
                    category: 3,
                    name: "watermelon",
                    version: "1.0"
                }, {
                    emoji: "🍊",
                    category: 3,
                    name: "tangerine",
                    version: "1.0"
                }, {
                    emoji: "🍋",
                    category: 3,
                    name: "lemon",
                    version: "1.0"
                }, {
                    emoji: "🍌",
                    category: 3,
                    name: "banana",
                    version: "1.0"
                }, {
                    emoji: "🍍",
                    category: 3,
                    name: "pineapple",
                    version: "1.0"
                }, {
                    emoji: "🥭",
                    category: 3,
                    name: "mango",
                    version: "11.0"
                }, {
                    emoji: "🍎",
                    category: 3,
                    name: "red apple",
                    version: "1.0"
                }, {
                    emoji: "🍏",
                    category: 3,
                    name: "green apple",
                    version: "1.0"
                }, {
                    emoji: "🍐",
                    category: 3,
                    name: "pear",
                    version: "1.0"
                }, {
                    emoji: "🍑",
                    category: 3,
                    name: "peach",
                    version: "1.0"
                }, {
                    emoji: "🍒",
                    category: 3,
                    name: "cherries",
                    version: "1.0"
                }, {
                    emoji: "🍓",
                    category: 3,
                    name: "strawberry",
                    version: "1.0"
                }, {
                    emoji: "🫐",
                    category: 3,
                    name: "blueberries",
                    version: "13.0"
                }, {
                    emoji: "🥝",
                    category: 3,
                    name: "kiwi fruit",
                    version: "3.0"
                }, {
                    emoji: "🍅",
                    category: 3,
                    name: "tomato",
                    version: "1.0"
                }, {
                    emoji: "🫒",
                    category: 3,
                    name: "olive",
                    version: "13.0"
                }, {
                    emoji: "🥥",
                    category: 3,
                    name: "coconut",
                    version: "5.0"
                }, {
                    emoji: "🥑",
                    category: 3,
                    name: "avocado",
                    version: "3.0"
                }, {
                    emoji: "🍆",
                    category: 3,
                    name: "eggplant",
                    version: "1.0"
                }, {
                    emoji: "🥔",
                    category: 3,
                    name: "potato",
                    version: "3.0"
                }, {
                    emoji: "🥕",
                    category: 3,
                    name: "carrot",
                    version: "3.0"
                }, {
                    emoji: "🌽",
                    category: 3,
                    name: "ear of corn",
                    version: "1.0"
                }, {
                    emoji: "🌶️",
                    category: 3,
                    name: "hot pepper",
                    version: "1.0"
                }, {
                    emoji: "🫑",
                    category: 3,
                    name: "bell pepper",
                    version: "13.0"
                }, {
                    emoji: "🥒",
                    category: 3,
                    name: "cucumber",
                    version: "3.0"
                }, {
                    emoji: "🥬",
                    category: 3,
                    name: "leafy green",
                    version: "11.0"
                }, {
                    emoji: "🥦",
                    category: 3,
                    name: "broccoli",
                    version: "5.0"
                }, {
                    emoji: "🧄",
                    category: 3,
                    name: "garlic",
                    version: "12.0"
                }, {
                    emoji: "🧅",
                    category: 3,
                    name: "onion",
                    version: "12.0"
                }, {
                    emoji: "🍄",
                    category: 3,
                    name: "mushroom",
                    version: "1.0"
                }, {
                    emoji: "🥜",
                    category: 3,
                    name: "peanuts",
                    version: "3.0"
                }, {
                    emoji: "🌰",
                    category: 3,
                    name: "chestnut",
                    version: "1.0"
                }, {
                    emoji: "🍞",
                    category: 3,
                    name: "bread",
                    version: "1.0"
                }, {
                    emoji: "🥐",
                    category: 3,
                    name: "croissant",
                    version: "3.0"
                }, {
                    emoji: "🥖",
                    category: 3,
                    name: "baguette bread",
                    version: "3.0"
                }, {
                    emoji: "🫓",
                    category: 3,
                    name: "flatbread",
                    version: "13.0"
                }, {
                    emoji: "🥨",
                    category: 3,
                    name: "pretzel",
                    version: "5.0"
                }, {
                    emoji: "🥯",
                    category: 3,
                    name: "bagel",
                    version: "11.0"
                }, {
                    emoji: "🥞",
                    category: 3,
                    name: "pancakes",
                    version: "3.0"
                }, {
                    emoji: "🧇",
                    category: 3,
                    name: "waffle",
                    version: "12.0"
                }, {
                    emoji: "🧀",
                    category: 3,
                    name: "cheese wedge",
                    version: "1.0"
                }, {
                    emoji: "🍖",
                    category: 3,
                    name: "meat on bone",
                    version: "1.0"
                }, {
                    emoji: "🍗",
                    category: 3,
                    name: "poultry leg",
                    version: "1.0"
                }, {
                    emoji: "🥩",
                    category: 3,
                    name: "cut of meat",
                    version: "5.0"
                }, {
                    emoji: "🥓",
                    category: 3,
                    name: "bacon",
                    version: "3.0"
                }, {
                    emoji: "🍔",
                    category: 3,
                    name: "hamburger",
                    version: "1.0"
                }, {
                    emoji: "🍟",
                    category: 3,
                    name: "french fries",
                    version: "1.0"
                }, {
                    emoji: "🍕",
                    category: 3,
                    name: "pizza",
                    version: "1.0"
                }, {
                    emoji: "🌭",
                    category: 3,
                    name: "hot dog",
                    version: "1.0"
                }, {
                    emoji: "🥪",
                    category: 3,
                    name: "sandwich",
                    version: "5.0"
                }, {
                    emoji: "🌮",
                    category: 3,
                    name: "taco",
                    version: "1.0"
                }, {
                    emoji: "🌯",
                    category: 3,
                    name: "burrito",
                    version: "1.0"
                }, {
                    emoji: "🫔",
                    category: 3,
                    name: "tamale",
                    version: "13.0"
                }, {
                    emoji: "🥙",
                    category: 3,
                    name: "stuffed flatbread",
                    version: "3.0"
                }, {
                    emoji: "🧆",
                    category: 3,
                    name: "falafel",
                    version: "12.0"
                }, {
                    emoji: "🥚",
                    category: 3,
                    name: "egg",
                    version: "3.0"
                }, {
                    emoji: "🍳",
                    category: 3,
                    name: "cooking",
                    version: "1.0"
                }, {
                    emoji: "🥘",
                    category: 3,
                    name: "shallow pan of food",
                    version: "3.0"
                }, {
                    emoji: "🍲",
                    category: 3,
                    name: "pot of food",
                    version: "1.0"
                }, {
                    emoji: "🫕",
                    category: 3,
                    name: "fondue",
                    version: "13.0"
                }, {
                    emoji: "🥣",
                    category: 3,
                    name: "bowl with spoon",
                    version: "5.0"
                }, {
                    emoji: "🥗",
                    category: 3,
                    name: "green salad",
                    version: "3.0"
                }, {
                    emoji: "🍿",
                    category: 3,
                    name: "popcorn",
                    version: "1.0"
                }, {
                    emoji: "🧈",
                    category: 3,
                    name: "butter",
                    version: "12.0"
                }, {
                    emoji: "🧂",
                    category: 3,
                    name: "salt",
                    version: "11.0"
                }, {
                    emoji: "🥫",
                    category: 3,
                    name: "canned food",
                    version: "5.0"
                }, {
                    emoji: "🍱",
                    category: 3,
                    name: "bento box",
                    version: "1.0"
                }, {
                    emoji: "🍘",
                    category: 3,
                    name: "rice cracker",
                    version: "1.0"
                }, {
                    emoji: "🍙",
                    category: 3,
                    name: "rice ball",
                    version: "1.0"
                }, {
                    emoji: "🍚",
                    category: 3,
                    name: "cooked rice",
                    version: "1.0"
                }, {
                    emoji: "🍛",
                    category: 3,
                    name: "curry rice",
                    version: "1.0"
                }, {
                    emoji: "🍜",
                    category: 3,
                    name: "steaming bowl",
                    version: "1.0"
                }, {
                    emoji: "🍝",
                    category: 3,
                    name: "spaghetti",
                    version: "1.0"
                }, {
                    emoji: "🍠",
                    category: 3,
                    name: "roasted sweet potato",
                    version: "1.0"
                }, {
                    emoji: "🍢",
                    category: 3,
                    name: "oden",
                    version: "1.0"
                }, {
                    emoji: "🍣",
                    category: 3,
                    name: "sushi",
                    version: "1.0"
                }, {
                    emoji: "🍤",
                    category: 3,
                    name: "fried shrimp",
                    version: "1.0"
                }, {
                    emoji: "🍥",
                    category: 3,
                    name: "fish cake with swirl",
                    version: "1.0"
                }, {
                    emoji: "🥮",
                    category: 3,
                    name: "moon cake",
                    version: "11.0"
                }, {
                    emoji: "🍡",
                    category: 3,
                    name: "dango",
                    version: "1.0"
                }, {
                    emoji: "🥟",
                    category: 3,
                    name: "dumpling",
                    version: "5.0"
                }, {
                    emoji: "🥠",
                    category: 3,
                    name: "fortune cookie",
                    version: "5.0"
                }, {
                    emoji: "🥡",
                    category: 3,
                    name: "takeout box",
                    version: "5.0"
                }, {
                    emoji: "🦀",
                    category: 3,
                    name: "crab",
                    version: "1.0"
                }, {
                    emoji: "🦞",
                    category: 3,
                    name: "lobster",
                    version: "11.0"
                }, {
                    emoji: "🦐",
                    category: 3,
                    name: "shrimp",
                    version: "3.0"
                }, {
                    emoji: "🦑",
                    category: 3,
                    name: "squid",
                    version: "3.0"
                }, {
                    emoji: "🦪",
                    category: 3,
                    name: "oyster",
                    version: "12.0"
                }, {
                    emoji: "🍦",
                    category: 3,
                    name: "soft ice cream",
                    version: "1.0"
                }, {
                    emoji: "🍧",
                    category: 3,
                    name: "shaved ice",
                    version: "1.0"
                }, {
                    emoji: "🍨",
                    category: 3,
                    name: "ice cream",
                    version: "1.0"
                }, {
                    emoji: "🍩",
                    category: 3,
                    name: "doughnut",
                    version: "1.0"
                }, {
                    emoji: "🍪",
                    category: 3,
                    name: "cookie",
                    version: "1.0"
                }, {
                    emoji: "🎂",
                    category: 3,
                    name: "birthday cake",
                    version: "1.0"
                }, {
                    emoji: "🍰",
                    category: 3,
                    name: "shortcake",
                    version: "1.0"
                }, {
                    emoji: "🧁",
                    category: 3,
                    name: "cupcake",
                    version: "11.0"
                }, {
                    emoji: "🥧",
                    category: 3,
                    name: "pie",
                    version: "5.0"
                }, {
                    emoji: "🍫",
                    category: 3,
                    name: "chocolate bar",
                    version: "1.0"
                }, {
                    emoji: "🍬",
                    category: 3,
                    name: "candy",
                    version: "1.0"
                }, {
                    emoji: "🍭",
                    category: 3,
                    name: "lollipop",
                    version: "1.0"
                }, {
                    emoji: "🍮",
                    category: 3,
                    name: "custard",
                    version: "1.0"
                }, {
                    emoji: "🍯",
                    category: 3,
                    name: "honey pot",
                    version: "1.0"
                }, {
                    emoji: "🍼",
                    category: 3,
                    name: "baby bottle",
                    version: "1.0"
                }, {
                    emoji: "🥛",
                    category: 3,
                    name: "glass of milk",
                    version: "3.0"
                }, {
                    emoji: "☕",
                    category: 3,
                    name: "hot beverage",
                    version: "1.0"
                }, {
                    emoji: "🫖",
                    category: 3,
                    name: "teapot",
                    version: "13.0"
                }, {
                    emoji: "🍵",
                    category: 3,
                    name: "teacup without handle",
                    version: "1.0"
                }, {
                    emoji: "🍶",
                    category: 3,
                    name: "sake",
                    version: "1.0"
                }, {
                    emoji: "🍾",
                    category: 3,
                    name: "bottle with popping cork",
                    version: "1.0"
                }, {
                    emoji: "🍷",
                    category: 3,
                    name: "wine glass",
                    version: "1.0"
                }, {
                    emoji: "🍸",
                    category: 3,
                    name: "cocktail glass",
                    version: "1.0"
                }, {
                    emoji: "🍹",
                    category: 3,
                    name: "tropical drink",
                    version: "1.0"
                }, {
                    emoji: "🍺",
                    category: 3,
                    name: "beer mug",
                    version: "1.0"
                }, {
                    emoji: "🍻",
                    category: 3,
                    name: "clinking beer mugs",
                    version: "1.0"
                }, {
                    emoji: "🥂",
                    category: 3,
                    name: "clinking glasses",
                    version: "3.0"
                }, {
                    emoji: "🥃",
                    category: 3,
                    name: "tumbler glass",
                    version: "3.0"
                }, {
                    emoji: "🥤",
                    category: 3,
                    name: "cup with straw",
                    version: "5.0"
                }, {
                    emoji: "🧋",
                    category: 3,
                    name: "bubble tea",
                    version: "13.0"
                }, {
                    emoji: "🧃",
                    category: 3,
                    name: "beverage box",
                    version: "12.0"
                }, {
                    emoji: "🧉",
                    category: 3,
                    name: "mate",
                    version: "12.0"
                }, {
                    emoji: "🧊",
                    category: 3,
                    name: "ice",
                    version: "12.0"
                }, {
                    emoji: "🥢",
                    category: 3,
                    name: "chopsticks",
                    version: "5.0"
                }, {
                    emoji: "🍽️",
                    category: 3,
                    name: "fork and knife with plate",
                    version: "1.0"
                }, {
                    emoji: "🍴",
                    category: 3,
                    name: "fork and knife",
                    version: "1.0"
                }, {
                    emoji: "🥄",
                    category: 3,
                    name: "spoon",
                    version: "3.0"
                }, {
                    emoji: "🔪",
                    category: 3,
                    name: "kitchen knife",
                    version: "1.0"
                }, {
                    emoji: "🏺",
                    category: 3,
                    name: "amphora",
                    version: "1.0"
                }, {
                    emoji: "🌍",
                    category: 4,
                    name: "globe showing Europe-Africa",
                    version: "1.0"
                }, {
                    emoji: "🌎",
                    category: 4,
                    name: "globe showing Americas",
                    version: "1.0"
                }, {
                    emoji: "🌏",
                    category: 4,
                    name: "globe showing Asia-Australia",
                    version: "1.0"
                }, {
                    emoji: "🌐",
                    category: 4,
                    name: "globe with meridians",
                    version: "1.0"
                }, {
                    emoji: "🗺️",
                    category: 4,
                    name: "world map",
                    version: "1.0"
                }, {
                    emoji: "🗾",
                    category: 4,
                    name: "map of Japan",
                    version: "1.0"
                }, {
                    emoji: "🧭",
                    category: 4,
                    name: "compass",
                    version: "11.0"
                }, {
                    emoji: "🏔️",
                    category: 4,
                    name: "snow-capped mountain",
                    version: "1.0"
                }, {
                    emoji: "⛰️",
                    category: 4,
                    name: "mountain",
                    version: "1.0"
                }, {
                    emoji: "🌋",
                    category: 4,
                    name: "volcano",
                    version: "1.0"
                }, {
                    emoji: "🗻",
                    category: 4,
                    name: "mount fuji",
                    version: "1.0"
                }, {
                    emoji: "🏕️",
                    category: 4,
                    name: "camping",
                    version: "1.0"
                }, {
                    emoji: "🏖️",
                    category: 4,
                    name: "beach with umbrella",
                    version: "1.0"
                }, {
                    emoji: "🏜️",
                    category: 4,
                    name: "desert",
                    version: "1.0"
                }, {
                    emoji: "🏝️",
                    category: 4,
                    name: "desert island",
                    version: "1.0"
                }, {
                    emoji: "🏞️",
                    category: 4,
                    name: "national park",
                    version: "1.0"
                }, {
                    emoji: "🏟️",
                    category: 4,
                    name: "stadium",
                    version: "1.0"
                }, {
                    emoji: "🏛️",
                    category: 4,
                    name: "classical building",
                    version: "1.0"
                }, {
                    emoji: "🏗️",
                    category: 4,
                    name: "building construction",
                    version: "1.0"
                }, {
                    emoji: "🧱",
                    category: 4,
                    name: "brick",
                    version: "11.0"
                }, {
                    emoji: "🪨",
                    category: 4,
                    name: "rock",
                    version: "13.0"
                }, {
                    emoji: "🪵",
                    category: 4,
                    name: "wood",
                    version: "13.0"
                }, {
                    emoji: "🛖",
                    category: 4,
                    name: "hut",
                    version: "13.0"
                }, {
                    emoji: "🏘️",
                    category: 4,
                    name: "houses",
                    version: "1.0"
                }, {
                    emoji: "🏚️",
                    category: 4,
                    name: "derelict house",
                    version: "1.0"
                }, {
                    emoji: "🏠",
                    category: 4,
                    name: "house",
                    version: "1.0"
                }, {
                    emoji: "🏡",
                    category: 4,
                    name: "house with garden",
                    version: "1.0"
                }, {
                    emoji: "🏢",
                    category: 4,
                    name: "office building",
                    version: "1.0"
                }, {
                    emoji: "🏣",
                    category: 4,
                    name: "Japanese post office",
                    version: "1.0"
                }, {
                    emoji: "🏤",
                    category: 4,
                    name: "post office",
                    version: "1.0"
                }, {
                    emoji: "🏥",
                    category: 4,
                    name: "hospital",
                    version: "1.0"
                }, {
                    emoji: "🏦",
                    category: 4,
                    name: "bank",
                    version: "1.0"
                }, {
                    emoji: "🏨",
                    category: 4,
                    name: "hotel",
                    version: "1.0"
                }, {
                    emoji: "🏩",
                    category: 4,
                    name: "love hotel",
                    version: "1.0"
                }, {
                    emoji: "🏪",
                    category: 4,
                    name: "convenience store",
                    version: "1.0"
                }, {
                    emoji: "🏫",
                    category: 4,
                    name: "school",
                    version: "1.0"
                }, {
                    emoji: "🏬",
                    category: 4,
                    name: "department store",
                    version: "1.0"
                }, {
                    emoji: "🏭",
                    category: 4,
                    name: "factory",
                    version: "1.0"
                }, {
                    emoji: "🏯",
                    category: 4,
                    name: "Japanese castle",
                    version: "1.0"
                }, {
                    emoji: "🏰",
                    category: 4,
                    name: "castle",
                    version: "1.0"
                }, {
                    emoji: "💒",
                    category: 4,
                    name: "wedding",
                    version: "1.0"
                }, {
                    emoji: "🗼",
                    category: 4,
                    name: "Tokyo tower",
                    version: "1.0"
                }, {
                    emoji: "🗽",
                    category: 4,
                    name: "Statue of Liberty",
                    version: "1.0"
                }, {
                    emoji: "⛪",
                    category: 4,
                    name: "church",
                    version: "1.0"
                }, {
                    emoji: "🕌",
                    category: 4,
                    name: "mosque",
                    version: "1.0"
                }, {
                    emoji: "🛕",
                    category: 4,
                    name: "hindu temple",
                    version: "12.0"
                }, {
                    emoji: "🕍",
                    category: 4,
                    name: "synagogue",
                    version: "1.0"
                }, {
                    emoji: "⛩️",
                    category: 4,
                    name: "shinto shrine",
                    version: "1.0"
                }, {
                    emoji: "🕋",
                    category: 4,
                    name: "kaaba",
                    version: "1.0"
                }, {
                    emoji: "⛲",
                    category: 4,
                    name: "fountain",
                    version: "1.0"
                }, {
                    emoji: "⛺",
                    category: 4,
                    name: "tent",
                    version: "1.0"
                }, {
                    emoji: "🌁",
                    category: 4,
                    name: "foggy",
                    version: "1.0"
                }, {
                    emoji: "🌃",
                    category: 4,
                    name: "night with stars",
                    version: "1.0"
                }, {
                    emoji: "🏙️",
                    category: 4,
                    name: "cityscape",
                    version: "1.0"
                }, {
                    emoji: "🌄",
                    category: 4,
                    name: "sunrise over mountains",
                    version: "1.0"
                }, {
                    emoji: "🌅",
                    category: 4,
                    name: "sunrise",
                    version: "1.0"
                }, {
                    emoji: "🌆",
                    category: 4,
                    name: "cityscape at dusk",
                    version: "1.0"
                }, {
                    emoji: "🌇",
                    category: 4,
                    name: "sunset",
                    version: "1.0"
                }, {
                    emoji: "🌉",
                    category: 4,
                    name: "bridge at night",
                    version: "1.0"
                }, {
                    emoji: "♨️",
                    category: 4,
                    name: "hot springs",
                    version: "1.0"
                }, {
                    emoji: "🎠",
                    category: 4,
                    name: "carousel horse",
                    version: "1.0"
                }, {
                    emoji: "🎡",
                    category: 4,
                    name: "ferris wheel",
                    version: "1.0"
                }, {
                    emoji: "🎢",
                    category: 4,
                    name: "roller coaster",
                    version: "1.0"
                }, {
                    emoji: "💈",
                    category: 4,
                    name: "barber pole",
                    version: "1.0"
                }, {
                    emoji: "🎪",
                    category: 4,
                    name: "circus tent",
                    version: "1.0"
                }, {
                    emoji: "🚂",
                    category: 4,
                    name: "locomotive",
                    version: "1.0"
                }, {
                    emoji: "🚃",
                    category: 4,
                    name: "railway car",
                    version: "1.0"
                }, {
                    emoji: "🚄",
                    category: 4,
                    name: "high-speed train",
                    version: "1.0"
                }, {
                    emoji: "🚅",
                    category: 4,
                    name: "bullet train",
                    version: "1.0"
                }, {
                    emoji: "🚆",
                    category: 4,
                    name: "train",
                    version: "1.0"
                }, {
                    emoji: "🚇",
                    category: 4,
                    name: "metro",
                    version: "1.0"
                }, {
                    emoji: "🚈",
                    category: 4,
                    name: "light rail",
                    version: "1.0"
                }, {
                    emoji: "🚉",
                    category: 4,
                    name: "station",
                    version: "1.0"
                }, {
                    emoji: "🚊",
                    category: 4,
                    name: "tram",
                    version: "1.0"
                }, {
                    emoji: "🚝",
                    category: 4,
                    name: "monorail",
                    version: "1.0"
                }, {
                    emoji: "🚞",
                    category: 4,
                    name: "mountain railway",
                    version: "1.0"
                }, {
                    emoji: "🚋",
                    category: 4,
                    name: "tram car",
                    version: "1.0"
                }, {
                    emoji: "🚌",
                    category: 4,
                    name: "bus",
                    version: "1.0"
                }, {
                    emoji: "🚍",
                    category: 4,
                    name: "oncoming bus",
                    version: "1.0"
                }, {
                    emoji: "🚎",
                    category: 4,
                    name: "trolleybus",
                    version: "1.0"
                }, {
                    emoji: "🚐",
                    category: 4,
                    name: "minibus",
                    version: "1.0"
                }, {
                    emoji: "🚑",
                    category: 4,
                    name: "ambulance",
                    version: "1.0"
                }, {
                    emoji: "🚒",
                    category: 4,
                    name: "fire engine",
                    version: "1.0"
                }, {
                    emoji: "🚓",
                    category: 4,
                    name: "police car",
                    version: "1.0"
                }, {
                    emoji: "🚔",
                    category: 4,
                    name: "oncoming police car",
                    version: "1.0"
                }, {
                    emoji: "🚕",
                    category: 4,
                    name: "taxi",
                    version: "1.0"
                }, {
                    emoji: "🚖",
                    category: 4,
                    name: "oncoming taxi",
                    version: "1.0"
                }, {
                    emoji: "🚗",
                    category: 4,
                    name: "automobile",
                    version: "1.0"
                }, {
                    emoji: "🚘",
                    category: 4,
                    name: "oncoming automobile",
                    version: "1.0"
                }, {
                    emoji: "🚙",
                    category: 4,
                    name: "sport utility vehicle",
                    version: "1.0"
                }, {
                    emoji: "🛻",
                    category: 4,
                    name: "pickup truck",
                    version: "13.0"
                }, {
                    emoji: "🚚",
                    category: 4,
                    name: "delivery truck",
                    version: "1.0"
                }, {
                    emoji: "🚛",
                    category: 4,
                    name: "articulated lorry",
                    version: "1.0"
                }, {
                    emoji: "🚜",
                    category: 4,
                    name: "tractor",
                    version: "1.0"
                }, {
                    emoji: "🏎️",
                    category: 4,
                    name: "racing car",
                    version: "1.0"
                }, {
                    emoji: "🏍️",
                    category: 4,
                    name: "motorcycle",
                    version: "1.0"
                }, {
                    emoji: "🛵",
                    category: 4,
                    name: "motor scooter",
                    version: "3.0"
                }, {
                    emoji: "🦽",
                    category: 4,
                    name: "manual wheelchair",
                    version: "12.0"
                }, {
                    emoji: "🦼",
                    category: 4,
                    name: "motorized wheelchair",
                    version: "12.0"
                }, {
                    emoji: "🛺",
                    category: 4,
                    name: "auto rickshaw",
                    version: "12.0"
                }, {
                    emoji: "🚲",
                    category: 4,
                    name: "bicycle",
                    version: "1.0"
                }, {
                    emoji: "🛴",
                    category: 4,
                    name: "kick scooter",
                    version: "3.0"
                }, {
                    emoji: "🛹",
                    category: 4,
                    name: "skateboard",
                    version: "11.0"
                }, {
                    emoji: "🛼",
                    category: 4,
                    name: "roller skate",
                    version: "13.0"
                }, {
                    emoji: "🚏",
                    category: 4,
                    name: "bus stop",
                    version: "1.0"
                }, {
                    emoji: "🛣️",
                    category: 4,
                    name: "motorway",
                    version: "1.0"
                }, {
                    emoji: "🛤️",
                    category: 4,
                    name: "railway track",
                    version: "1.0"
                }, {
                    emoji: "🛢️",
                    category: 4,
                    name: "oil drum",
                    version: "1.0"
                }, {
                    emoji: "⛽",
                    category: 4,
                    name: "fuel pump",
                    version: "1.0"
                }, {
                    emoji: "🚨",
                    category: 4,
                    name: "police car light",
                    version: "1.0"
                }, {
                    emoji: "🚥",
                    category: 4,
                    name: "horizontal traffic light",
                    version: "1.0"
                }, {
                    emoji: "🚦",
                    category: 4,
                    name: "vertical traffic light",
                    version: "1.0"
                }, {
                    emoji: "🛑",
                    category: 4,
                    name: "stop sign",
                    version: "3.0"
                }, {
                    emoji: "🚧",
                    category: 4,
                    name: "construction",
                    version: "1.0"
                }, {
                    emoji: "⚓",
                    category: 4,
                    name: "anchor",
                    version: "1.0"
                }, {
                    emoji: "⛵",
                    category: 4,
                    name: "sailboat",
                    version: "1.0"
                }, {
                    emoji: "🛶",
                    category: 4,
                    name: "canoe",
                    version: "3.0"
                }, {
                    emoji: "🚤",
                    category: 4,
                    name: "speedboat",
                    version: "1.0"
                }, {
                    emoji: "🛳️",
                    category: 4,
                    name: "passenger ship",
                    version: "1.0"
                }, {
                    emoji: "⛴️",
                    category: 4,
                    name: "ferry",
                    version: "1.0"
                }, {
                    emoji: "🛥️",
                    category: 4,
                    name: "motor boat",
                    version: "1.0"
                }, {
                    emoji: "🚢",
                    category: 4,
                    name: "ship",
                    version: "1.0"
                }, {
                    emoji: "✈️",
                    category: 4,
                    name: "airplane",
                    version: "1.0"
                }, {
                    emoji: "🛩️",
                    category: 4,
                    name: "small airplane",
                    version: "1.0"
                }, {
                    emoji: "🛫",
                    category: 4,
                    name: "airplane departure",
                    version: "1.0"
                }, {
                    emoji: "🛬",
                    category: 4,
                    name: "airplane arrival",
                    version: "1.0"
                }, {
                    emoji: "🪂",
                    category: 4,
                    name: "parachute",
                    version: "12.0"
                }, {
                    emoji: "💺",
                    category: 4,
                    name: "seat",
                    version: "1.0"
                }, {
                    emoji: "🚁",
                    category: 4,
                    name: "helicopter",
                    version: "1.0"
                }, {
                    emoji: "🚟",
                    category: 4,
                    name: "suspension railway",
                    version: "1.0"
                }, {
                    emoji: "🚠",
                    category: 4,
                    name: "mountain cableway",
                    version: "1.0"
                }, {
                    emoji: "🚡",
                    category: 4,
                    name: "aerial tramway",
                    version: "1.0"
                }, {
                    emoji: "🛰️",
                    category: 4,
                    name: "satellite",
                    version: "1.0"
                }, {
                    emoji: "🚀",
                    category: 4,
                    name: "rocket",
                    version: "1.0"
                }, {
                    emoji: "🛸",
                    category: 4,
                    name: "flying saucer",
                    version: "5.0"
                }, {
                    emoji: "🛎️",
                    category: 4,
                    name: "bellhop bell",
                    version: "1.0"
                }, {
                    emoji: "🧳",
                    category: 4,
                    name: "luggage",
                    version: "11.0"
                }, {
                    emoji: "⌛",
                    category: 4,
                    name: "hourglass done",
                    version: "1.0"
                }, {
                    emoji: "⏳",
                    category: 4,
                    name: "hourglass not done",
                    version: "1.0"
                }, {
                    emoji: "⌚",
                    category: 4,
                    name: "watch",
                    version: "1.0"
                }, {
                    emoji: "⏰",
                    category: 4,
                    name: "alarm clock",
                    version: "1.0"
                }, {
                    emoji: "⏱️",
                    category: 4,
                    name: "stopwatch",
                    version: "1.0"
                }, {
                    emoji: "⏲️",
                    category: 4,
                    name: "timer clock",
                    version: "1.0"
                }, {
                    emoji: "🕰️",
                    category: 4,
                    name: "mantelpiece clock",
                    version: "1.0"
                }, {
                    emoji: "🕛",
                    category: 4,
                    name: "twelve o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕧",
                    category: 4,
                    name: "twelve-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕐",
                    category: 4,
                    name: "one o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕜",
                    category: 4,
                    name: "one-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕑",
                    category: 4,
                    name: "two o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕝",
                    category: 4,
                    name: "two-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕒",
                    category: 4,
                    name: "three o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕞",
                    category: 4,
                    name: "three-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕓",
                    category: 4,
                    name: "four o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕟",
                    category: 4,
                    name: "four-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕔",
                    category: 4,
                    name: "five o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕠",
                    category: 4,
                    name: "five-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕕",
                    category: 4,
                    name: "six o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕡",
                    category: 4,
                    name: "six-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕖",
                    category: 4,
                    name: "seven o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕢",
                    category: 4,
                    name: "seven-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕗",
                    category: 4,
                    name: "eight o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕣",
                    category: 4,
                    name: "eight-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕘",
                    category: 4,
                    name: "nine o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕤",
                    category: 4,
                    name: "nine-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕙",
                    category: 4,
                    name: "ten o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕥",
                    category: 4,
                    name: "ten-thirty",
                    version: "1.0"
                }, {
                    emoji: "🕚",
                    category: 4,
                    name: "eleven o’clock",
                    version: "1.0"
                }, {
                    emoji: "🕦",
                    category: 4,
                    name: "eleven-thirty",
                    version: "1.0"
                }, {
                    emoji: "🌑",
                    category: 4,
                    name: "new moon",
                    version: "1.0"
                }, {
                    emoji: "🌒",
                    category: 4,
                    name: "waxing crescent moon",
                    version: "1.0"
                }, {
                    emoji: "🌓",
                    category: 4,
                    name: "first quarter moon",
                    version: "1.0"
                }, {
                    emoji: "🌔",
                    category: 4,
                    name: "waxing gibbous moon",
                    version: "1.0"
                }, {
                    emoji: "🌕",
                    category: 4,
                    name: "full moon",
                    version: "1.0"
                }, {
                    emoji: "🌖",
                    category: 4,
                    name: "waning gibbous moon",
                    version: "1.0"
                }, {
                    emoji: "🌗",
                    category: 4,
                    name: "last quarter moon",
                    version: "1.0"
                }, {
                    emoji: "🌘",
                    category: 4,
                    name: "waning crescent moon",
                    version: "1.0"
                }, {
                    emoji: "🌙",
                    category: 4,
                    name: "crescent moon",
                    version: "1.0"
                }, {
                    emoji: "🌚",
                    category: 4,
                    name: "new moon face",
                    version: "1.0"
                }, {
                    emoji: "🌛",
                    category: 4,
                    name: "first quarter moon face",
                    version: "1.0"
                }, {
                    emoji: "🌜",
                    category: 4,
                    name: "last quarter moon face",
                    version: "1.0"
                }, {
                    emoji: "🌡️",
                    category: 4,
                    name: "thermometer",
                    version: "1.0"
                }, {
                    emoji: "☀️",
                    category: 4,
                    name: "sun",
                    version: "1.0"
                }, {
                    emoji: "🌝",
                    category: 4,
                    name: "full moon face",
                    version: "1.0"
                }, {
                    emoji: "🌞",
                    category: 4,
                    name: "sun with face",
                    version: "1.0"
                }, {
                    emoji: "🪐",
                    category: 4,
                    name: "ringed planet",
                    version: "12.0"
                }, {
                    emoji: "⭐",
                    category: 4,
                    name: "star",
                    version: "1.0"
                }, {
                    emoji: "🌟",
                    category: 4,
                    name: "glowing star",
                    version: "1.0"
                }, {
                    emoji: "🌠",
                    category: 4,
                    name: "shooting star",
                    version: "1.0"
                }, {
                    emoji: "🌌",
                    category: 4,
                    name: "milky way",
                    version: "1.0"
                }, {
                    emoji: "☁️",
                    category: 4,
                    name: "cloud",
                    version: "1.0"
                }, {
                    emoji: "⛅",
                    category: 4,
                    name: "sun behind cloud",
                    version: "1.0"
                }, {
                    emoji: "⛈️",
                    category: 4,
                    name: "cloud with lightning and rain",
                    version: "1.0"
                }, {
                    emoji: "🌤️",
                    category: 4,
                    name: "sun behind small cloud",
                    version: "1.0"
                }, {
                    emoji: "🌥️",
                    category: 4,
                    name: "sun behind large cloud",
                    version: "1.0"
                }, {
                    emoji: "🌦️",
                    category: 4,
                    name: "sun behind rain cloud",
                    version: "1.0"
                }, {
                    emoji: "🌧️",
                    category: 4,
                    name: "cloud with rain",
                    version: "1.0"
                }, {
                    emoji: "🌨️",
                    category: 4,
                    name: "cloud with snow",
                    version: "1.0"
                }, {
                    emoji: "🌩️",
                    category: 4,
                    name: "cloud with lightning",
                    version: "1.0"
                }, {
                    emoji: "🌪️",
                    category: 4,
                    name: "tornado",
                    version: "1.0"
                }, {
                    emoji: "🌫️",
                    category: 4,
                    name: "fog",
                    version: "1.0"
                }, {
                    emoji: "🌬️",
                    category: 4,
                    name: "wind face",
                    version: "1.0"
                }, {
                    emoji: "🌀",
                    category: 4,
                    name: "cyclone",
                    version: "1.0"
                }, {
                    emoji: "🌈",
                    category: 4,
                    name: "rainbow",
                    version: "1.0"
                }, {
                    emoji: "🌂",
                    category: 4,
                    name: "closed umbrella",
                    version: "1.0"
                }, {
                    emoji: "☂️",
                    category: 4,
                    name: "umbrella",
                    version: "1.0"
                }, {
                    emoji: "☔",
                    category: 4,
                    name: "umbrella with rain drops",
                    version: "1.0"
                }, {
                    emoji: "⛱️",
                    category: 4,
                    name: "umbrella on ground",
                    version: "1.0"
                }, {
                    emoji: "⚡",
                    category: 4,
                    name: "high voltage",
                    version: "1.0"
                }, {
                    emoji: "❄️",
                    category: 4,
                    name: "snowflake",
                    version: "1.0"
                }, {
                    emoji: "☃️",
                    category: 4,
                    name: "snowman",
                    version: "1.0"
                }, {
                    emoji: "⛄",
                    category: 4,
                    name: "snowman without snow",
                    version: "1.0"
                }, {
                    emoji: "☄️",
                    category: 4,
                    name: "comet",
                    version: "1.0"
                }, {
                    emoji: "🔥",
                    category: 4,
                    name: "fire",
                    version: "1.0"
                }, {
                    emoji: "💧",
                    category: 4,
                    name: "droplet",
                    version: "1.0"
                }, {
                    emoji: "🌊",
                    category: 4,
                    name: "water wave",
                    version: "1.0"
                }, {
                    emoji: "🎃",
                    category: 5,
                    name: "jack-o-lantern",
                    version: "1.0"
                }, {
                    emoji: "🎄",
                    category: 5,
                    name: "Christmas tree",
                    version: "1.0"
                }, {
                    emoji: "🎆",
                    category: 5,
                    name: "fireworks",
                    version: "1.0"
                }, {
                    emoji: "🎇",
                    category: 5,
                    name: "sparkler",
                    version: "1.0"
                }, {
                    emoji: "🧨",
                    category: 5,
                    name: "firecracker",
                    version: "11.0"
                }, {
                    emoji: "✨",
                    category: 5,
                    name: "sparkles",
                    version: "1.0"
                }, {
                    emoji: "🎈",
                    category: 5,
                    name: "balloon",
                    version: "1.0"
                }, {
                    emoji: "🎉",
                    category: 5,
                    name: "party popper",
                    version: "1.0"
                }, {
                    emoji: "🎊",
                    category: 5,
                    name: "confetti ball",
                    version: "1.0"
                }, {
                    emoji: "🎋",
                    category: 5,
                    name: "tanabata tree",
                    version: "1.0"
                }, {
                    emoji: "🎍",
                    category: 5,
                    name: "pine decoration",
                    version: "1.0"
                }, {
                    emoji: "🎎",
                    category: 5,
                    name: "Japanese dolls",
                    version: "1.0"
                }, {
                    emoji: "🎏",
                    category: 5,
                    name: "carp streamer",
                    version: "1.0"
                }, {
                    emoji: "🎐",
                    category: 5,
                    name: "wind chime",
                    version: "1.0"
                }, {
                    emoji: "🎑",
                    category: 5,
                    name: "moon viewing ceremony",
                    version: "1.0"
                }, {
                    emoji: "🧧",
                    category: 5,
                    name: "red envelope",
                    version: "11.0"
                }, {
                    emoji: "🎀",
                    category: 5,
                    name: "ribbon",
                    version: "1.0"
                }, {
                    emoji: "🎁",
                    category: 5,
                    name: "wrapped gift",
                    version: "1.0"
                }, {
                    emoji: "🎗️",
                    category: 5,
                    name: "reminder ribbon",
                    version: "1.0"
                }, {
                    emoji: "🎟️",
                    category: 5,
                    name: "admission tickets",
                    version: "1.0"
                }, {
                    emoji: "🎫",
                    category: 5,
                    name: "ticket",
                    version: "1.0"
                }, {
                    emoji: "🎖️",
                    category: 5,
                    name: "military medal",
                    version: "1.0"
                }, {
                    emoji: "🏆",
                    category: 5,
                    name: "trophy",
                    version: "1.0"
                }, {
                    emoji: "🏅",
                    category: 5,
                    name: "sports medal",
                    version: "1.0"
                }, {
                    emoji: "🥇",
                    category: 5,
                    name: "1st place medal",
                    version: "3.0"
                }, {
                    emoji: "🥈",
                    category: 5,
                    name: "2nd place medal",
                    version: "3.0"
                }, {
                    emoji: "🥉",
                    category: 5,
                    name: "3rd place medal",
                    version: "3.0"
                }, {
                    emoji: "⚽",
                    category: 5,
                    name: "soccer ball",
                    version: "1.0"
                }, {
                    emoji: "⚾",
                    category: 5,
                    name: "baseball",
                    version: "1.0"
                }, {
                    emoji: "🥎",
                    category: 5,
                    name: "softball",
                    version: "11.0"
                }, {
                    emoji: "🏀",
                    category: 5,
                    name: "basketball",
                    version: "1.0"
                }, {
                    emoji: "🏐",
                    category: 5,
                    name: "volleyball",
                    version: "1.0"
                }, {
                    emoji: "🏈",
                    category: 5,
                    name: "american football",
                    version: "1.0"
                }, {
                    emoji: "🏉",
                    category: 5,
                    name: "rugby football",
                    version: "1.0"
                }, {
                    emoji: "🎾",
                    category: 5,
                    name: "tennis",
                    version: "1.0"
                }, {
                    emoji: "🥏",
                    category: 5,
                    name: "flying disc",
                    version: "11.0"
                }, {
                    emoji: "🎳",
                    category: 5,
                    name: "bowling",
                    version: "1.0"
                }, {
                    emoji: "🏏",
                    category: 5,
                    name: "cricket game",
                    version: "1.0"
                }, {
                    emoji: "🏑",
                    category: 5,
                    name: "field hockey",
                    version: "1.0"
                }, {
                    emoji: "🏒",
                    category: 5,
                    name: "ice hockey",
                    version: "1.0"
                }, {
                    emoji: "🥍",
                    category: 5,
                    name: "lacrosse",
                    version: "11.0"
                }, {
                    emoji: "🏓",
                    category: 5,
                    name: "ping pong",
                    version: "1.0"
                }, {
                    emoji: "🏸",
                    category: 5,
                    name: "badminton",
                    version: "1.0"
                }, {
                    emoji: "🥊",
                    category: 5,
                    name: "boxing glove",
                    version: "3.0"
                }, {
                    emoji: "🥋",
                    category: 5,
                    name: "martial arts uniform",
                    version: "3.0"
                }, {
                    emoji: "🥅",
                    category: 5,
                    name: "goal net",
                    version: "3.0"
                }, {
                    emoji: "⛳",
                    category: 5,
                    name: "flag in hole",
                    version: "1.0"
                }, {
                    emoji: "⛸️",
                    category: 5,
                    name: "ice skate",
                    version: "1.0"
                }, {
                    emoji: "🎣",
                    category: 5,
                    name: "fishing pole",
                    version: "1.0"
                }, {
                    emoji: "🤿",
                    category: 5,
                    name: "diving mask",
                    version: "12.0"
                }, {
                    emoji: "🎽",
                    category: 5,
                    name: "running shirt",
                    version: "1.0"
                }, {
                    emoji: "🎿",
                    category: 5,
                    name: "skis",
                    version: "1.0"
                }, {
                    emoji: "🛷",
                    category: 5,
                    name: "sled",
                    version: "5.0"
                }, {
                    emoji: "🥌",
                    category: 5,
                    name: "curling stone",
                    version: "5.0"
                }, {
                    emoji: "🎯",
                    category: 5,
                    name: "direct hit",
                    version: "1.0"
                }, {
                    emoji: "🪀",
                    category: 5,
                    name: "yo-yo",
                    version: "12.0"
                }, {
                    emoji: "🪁",
                    category: 5,
                    name: "kite",
                    version: "12.0"
                }, {
                    emoji: "🎱",
                    category: 5,
                    name: "pool 8 ball",
                    version: "1.0"
                }, {
                    emoji: "🔮",
                    category: 5,
                    name: "crystal ball",
                    version: "1.0"
                }, {
                    emoji: "🪄",
                    category: 5,
                    name: "magic wand",
                    version: "13.0"
                }, {
                    emoji: "🧿",
                    category: 5,
                    name: "nazar amulet",
                    version: "11.0"
                }, {
                    emoji: "🎮",
                    category: 5,
                    name: "video game",
                    version: "1.0"
                }, {
                    emoji: "🕹️",
                    category: 5,
                    name: "joystick",
                    version: "1.0"
                }, {
                    emoji: "🎰",
                    category: 5,
                    name: "slot machine",
                    version: "1.0"
                }, {
                    emoji: "🎲",
                    category: 5,
                    name: "game die",
                    version: "1.0"
                }, {
                    emoji: "🧩",
                    category: 5,
                    name: "puzzle piece",
                    version: "11.0"
                }, {
                    emoji: "🧸",
                    category: 5,
                    name: "teddy bear",
                    version: "11.0"
                }, {
                    emoji: "🪅",
                    category: 5,
                    name: "piñata",
                    version: "13.0"
                }, {
                    emoji: "🪆",
                    category: 5,
                    name: "nesting dolls",
                    version: "13.0"
                }, {
                    emoji: "♠️",
                    category: 5,
                    name: "spade suit",
                    version: "1.0"
                }, {
                    emoji: "♥️",
                    category: 5,
                    name: "heart suit",
                    version: "1.0"
                }, {
                    emoji: "♦️",
                    category: 5,
                    name: "diamond suit",
                    version: "1.0"
                }, {
                    emoji: "♣️",
                    category: 5,
                    name: "club suit",
                    version: "1.0"
                }, {
                    emoji: "♟️",
                    category: 5,
                    name: "chess pawn",
                    version: "11.0"
                }, {
                    emoji: "🃏",
                    category: 5,
                    name: "joker",
                    version: "1.0"
                }, {
                    emoji: "🀄",
                    category: 5,
                    name: "mahjong red dragon",
                    version: "1.0"
                }, {
                    emoji: "🎴",
                    category: 5,
                    name: "flower playing cards",
                    version: "1.0"
                }, {
                    emoji: "🎭",
                    category: 5,
                    name: "performing arts",
                    version: "1.0"
                }, {
                    emoji: "🖼️",
                    category: 5,
                    name: "framed picture",
                    version: "1.0"
                }, {
                    emoji: "🎨",
                    category: 5,
                    name: "artist palette",
                    version: "1.0"
                }, {
                    emoji: "🧵",
                    category: 5,
                    name: "thread",
                    version: "11.0"
                }, {
                    emoji: "🪡",
                    category: 5,
                    name: "sewing needle",
                    version: "13.0"
                }, {
                    emoji: "🧶",
                    category: 5,
                    name: "yarn",
                    version: "11.0"
                }, {
                    emoji: "🪢",
                    category: 5,
                    name: "knot",
                    version: "13.0"
                }, {
                    emoji: "👓",
                    category: 6,
                    name: "glasses",
                    version: "1.0"
                }, {
                    emoji: "🕶️",
                    category: 6,
                    name: "sunglasses",
                    version: "1.0"
                }, {
                    emoji: "🥽",
                    category: 6,
                    name: "goggles",
                    version: "11.0"
                }, {
                    emoji: "🥼",
                    category: 6,
                    name: "lab coat",
                    version: "11.0"
                }, {
                    emoji: "🦺",
                    category: 6,
                    name: "safety vest",
                    version: "12.0"
                }, {
                    emoji: "👔",
                    category: 6,
                    name: "necktie",
                    version: "1.0"
                }, {
                    emoji: "👕",
                    category: 6,
                    name: "t-shirt",
                    version: "1.0"
                }, {
                    emoji: "👖",
                    category: 6,
                    name: "jeans",
                    version: "1.0"
                }, {
                    emoji: "🧣",
                    category: 6,
                    name: "scarf",
                    version: "5.0"
                }, {
                    emoji: "🧤",
                    category: 6,
                    name: "gloves",
                    version: "5.0"
                }, {
                    emoji: "🧥",
                    category: 6,
                    name: "coat",
                    version: "5.0"
                }, {
                    emoji: "🧦",
                    category: 6,
                    name: "socks",
                    version: "5.0"
                }, {
                    emoji: "👗",
                    category: 6,
                    name: "dress",
                    version: "1.0"
                }, {
                    emoji: "👘",
                    category: 6,
                    name: "kimono",
                    version: "1.0"
                }, {
                    emoji: "🥻",
                    category: 6,
                    name: "sari",
                    version: "12.0"
                }, {
                    emoji: "🩱",
                    category: 6,
                    name: "one-piece swimsuit",
                    version: "12.0"
                }, {
                    emoji: "🩲",
                    category: 6,
                    name: "briefs",
                    version: "12.0"
                }, {
                    emoji: "🩳",
                    category: 6,
                    name: "shorts",
                    version: "12.0"
                }, {
                    emoji: "👙",
                    category: 6,
                    name: "bikini",
                    version: "1.0"
                }, {
                    emoji: "👚",
                    category: 6,
                    name: "woman’s clothes",
                    version: "1.0"
                }, {
                    emoji: "👛",
                    category: 6,
                    name: "purse",
                    version: "1.0"
                }, {
                    emoji: "👜",
                    category: 6,
                    name: "handbag",
                    version: "1.0"
                }, {
                    emoji: "👝",
                    category: 6,
                    name: "clutch bag",
                    version: "1.0"
                }, {
                    emoji: "🛍️",
                    category: 6,
                    name: "shopping bags",
                    version: "1.0"
                }, {
                    emoji: "🎒",
                    category: 6,
                    name: "backpack",
                    version: "1.0"
                }, {
                    emoji: "🩴",
                    category: 6,
                    name: "thong sandal",
                    version: "13.0"
                }, {
                    emoji: "👞",
                    category: 6,
                    name: "man’s shoe",
                    version: "1.0"
                }, {
                    emoji: "👟",
                    category: 6,
                    name: "running shoe",
                    version: "1.0"
                }, {
                    emoji: "🥾",
                    category: 6,
                    name: "hiking boot",
                    version: "11.0"
                }, {
                    emoji: "🥿",
                    category: 6,
                    name: "flat shoe",
                    version: "11.0"
                }, {
                    emoji: "👠",
                    category: 6,
                    name: "high-heeled shoe",
                    version: "1.0"
                }, {
                    emoji: "👡",
                    category: 6,
                    name: "woman’s sandal",
                    version: "1.0"
                }, {
                    emoji: "🩰",
                    category: 6,
                    name: "ballet shoes",
                    version: "12.0"
                }, {
                    emoji: "👢",
                    category: 6,
                    name: "woman’s boot",
                    version: "1.0"
                }, {
                    emoji: "👑",
                    category: 6,
                    name: "crown",
                    version: "1.0"
                }, {
                    emoji: "👒",
                    category: 6,
                    name: "woman’s hat",
                    version: "1.0"
                }, {
                    emoji: "🎩",
                    category: 6,
                    name: "top hat",
                    version: "1.0"
                }, {
                    emoji: "🎓",
                    category: 6,
                    name: "graduation cap",
                    version: "1.0"
                }, {
                    emoji: "🧢",
                    category: 6,
                    name: "billed cap",
                    version: "5.0"
                }, {
                    emoji: "🪖",
                    category: 6,
                    name: "military helmet",
                    version: "13.0"
                }, {
                    emoji: "⛑️",
                    category: 6,
                    name: "rescue worker’s helmet",
                    version: "1.0"
                }, {
                    emoji: "📿",
                    category: 6,
                    name: "prayer beads",
                    version: "1.0"
                }, {
                    emoji: "💄",
                    category: 6,
                    name: "lipstick",
                    version: "1.0"
                }, {
                    emoji: "💍",
                    category: 6,
                    name: "ring",
                    version: "1.0"
                }, {
                    emoji: "💎",
                    category: 6,
                    name: "gem stone",
                    version: "1.0"
                }, {
                    emoji: "🔇",
                    category: 6,
                    name: "muted speaker",
                    version: "1.0"
                }, {
                    emoji: "🔈",
                    category: 6,
                    name: "speaker low volume",
                    version: "1.0"
                }, {
                    emoji: "🔉",
                    category: 6,
                    name: "speaker medium volume",
                    version: "1.0"
                }, {
                    emoji: "🔊",
                    category: 6,
                    name: "speaker high volume",
                    version: "1.0"
                }, {
                    emoji: "📢",
                    category: 6,
                    name: "loudspeaker",
                    version: "1.0"
                }, {
                    emoji: "📣",
                    category: 6,
                    name: "megaphone",
                    version: "1.0"
                }, {
                    emoji: "📯",
                    category: 6,
                    name: "postal horn",
                    version: "1.0"
                }, {
                    emoji: "🔔",
                    category: 6,
                    name: "bell",
                    version: "1.0"
                }, {
                    emoji: "🔕",
                    category: 6,
                    name: "bell with slash",
                    version: "1.0"
                }, {
                    emoji: "🎼",
                    category: 6,
                    name: "musical score",
                    version: "1.0"
                }, {
                    emoji: "🎵",
                    category: 6,
                    name: "musical note",
                    version: "1.0"
                }, {
                    emoji: "🎶",
                    category: 6,
                    name: "musical notes",
                    version: "1.0"
                }, {
                    emoji: "🎙️",
                    category: 6,
                    name: "studio microphone",
                    version: "1.0"
                }, {
                    emoji: "🎚️",
                    category: 6,
                    name: "level slider",
                    version: "1.0"
                }, {
                    emoji: "🎛️",
                    category: 6,
                    name: "control knobs",
                    version: "1.0"
                }, {
                    emoji: "🎤",
                    category: 6,
                    name: "microphone",
                    version: "1.0"
                }, {
                    emoji: "🎧",
                    category: 6,
                    name: "headphone",
                    version: "1.0"
                }, {
                    emoji: "📻",
                    category: 6,
                    name: "radio",
                    version: "1.0"
                }, {
                    emoji: "🎷",
                    category: 6,
                    name: "saxophone",
                    version: "1.0"
                }, {
                    emoji: "🪗",
                    category: 6,
                    name: "accordion",
                    version: "13.0"
                }, {
                    emoji: "🎸",
                    category: 6,
                    name: "guitar",
                    version: "1.0"
                }, {
                    emoji: "🎹",
                    category: 6,
                    name: "musical keyboard",
                    version: "1.0"
                }, {
                    emoji: "🎺",
                    category: 6,
                    name: "trumpet",
                    version: "1.0"
                }, {
                    emoji: "🎻",
                    category: 6,
                    name: "violin",
                    version: "1.0"
                }, {
                    emoji: "🪕",
                    category: 6,
                    name: "banjo",
                    version: "12.0"
                }, {
                    emoji: "🥁",
                    category: 6,
                    name: "drum",
                    version: "3.0"
                }, {
                    emoji: "🪘",
                    category: 6,
                    name: "long drum",
                    version: "13.0"
                }, {
                    emoji: "📱",
                    category: 6,
                    name: "mobile phone",
                    version: "1.0"
                }, {
                    emoji: "📲",
                    category: 6,
                    name: "mobile phone with arrow",
                    version: "1.0"
                }, {
                    emoji: "☎️",
                    category: 6,
                    name: "telephone",
                    version: "1.0"
                }, {
                    emoji: "📞",
                    category: 6,
                    name: "telephone receiver",
                    version: "1.0"
                }, {
                    emoji: "📟",
                    category: 6,
                    name: "pager",
                    version: "1.0"
                }, {
                    emoji: "📠",
                    category: 6,
                    name: "fax machine",
                    version: "1.0"
                }, {
                    emoji: "🔋",
                    category: 6,
                    name: "battery",
                    version: "1.0"
                }, {
                    emoji: "🔌",
                    category: 6,
                    name: "electric plug",
                    version: "1.0"
                }, {
                    emoji: "💻",
                    category: 6,
                    name: "laptop",
                    version: "1.0"
                }, {
                    emoji: "🖥️",
                    category: 6,
                    name: "desktop computer",
                    version: "1.0"
                }, {
                    emoji: "🖨️",
                    category: 6,
                    name: "printer",
                    version: "1.0"
                }, {
                    emoji: "⌨️",
                    category: 6,
                    name: "keyboard",
                    version: "1.0"
                }, {
                    emoji: "🖱️",
                    category: 6,
                    name: "computer mouse",
                    version: "1.0"
                }, {
                    emoji: "🖲️",
                    category: 6,
                    name: "trackball",
                    version: "1.0"
                }, {
                    emoji: "💽",
                    category: 6,
                    name: "computer disk",
                    version: "1.0"
                }, {
                    emoji: "💾",
                    category: 6,
                    name: "floppy disk",
                    version: "1.0"
                }, {
                    emoji: "💿",
                    category: 6,
                    name: "optical disk",
                    version: "1.0"
                }, {
                    emoji: "📀",
                    category: 6,
                    name: "dvd",
                    version: "1.0"
                }, {
                    emoji: "🧮",
                    category: 6,
                    name: "abacus",
                    version: "11.0"
                }, {
                    emoji: "🎥",
                    category: 6,
                    name: "movie camera",
                    version: "1.0"
                }, {
                    emoji: "🎞️",
                    category: 6,
                    name: "film frames",
                    version: "1.0"
                }, {
                    emoji: "📽️",
                    category: 6,
                    name: "film projector",
                    version: "1.0"
                }, {
                    emoji: "🎬",
                    category: 6,
                    name: "clapper board",
                    version: "1.0"
                }, {
                    emoji: "📺",
                    category: 6,
                    name: "television",
                    version: "1.0"
                }, {
                    emoji: "📷",
                    category: 6,
                    name: "camera",
                    version: "1.0"
                }, {
                    emoji: "📸",
                    category: 6,
                    name: "camera with flash",
                    version: "1.0"
                }, {
                    emoji: "📹",
                    category: 6,
                    name: "video camera",
                    version: "1.0"
                }, {
                    emoji: "📼",
                    category: 6,
                    name: "videocassette",
                    version: "1.0"
                }, {
                    emoji: "🔍",
                    category: 6,
                    name: "magnifying glass tilted left",
                    version: "1.0"
                }, {
                    emoji: "🔎",
                    category: 6,
                    name: "magnifying glass tilted right",
                    version: "1.0"
                }, {
                    emoji: "🕯️",
                    category: 6,
                    name: "candle",
                    version: "1.0"
                }, {
                    emoji: "💡",
                    category: 6,
                    name: "light bulb",
                    version: "1.0"
                }, {
                    emoji: "🔦",
                    category: 6,
                    name: "flashlight",
                    version: "1.0"
                }, {
                    emoji: "🏮",
                    category: 6,
                    name: "red paper lantern",
                    version: "1.0"
                }, {
                    emoji: "🪔",
                    category: 6,
                    name: "diya lamp",
                    version: "12.0"
                }, {
                    emoji: "📔",
                    category: 6,
                    name: "notebook with decorative cover",
                    version: "1.0"
                }, {
                    emoji: "📕",
                    category: 6,
                    name: "closed book",
                    version: "1.0"
                }, {
                    emoji: "📖",
                    category: 6,
                    name: "open book",
                    version: "1.0"
                }, {
                    emoji: "📗",
                    category: 6,
                    name: "green book",
                    version: "1.0"
                }, {
                    emoji: "📘",
                    category: 6,
                    name: "blue book",
                    version: "1.0"
                }, {
                    emoji: "📙",
                    category: 6,
                    name: "orange book",
                    version: "1.0"
                }, {
                    emoji: "📚",
                    category: 6,
                    name: "books",
                    version: "1.0"
                }, {
                    emoji: "📓",
                    category: 6,
                    name: "notebook",
                    version: "1.0"
                }, {
                    emoji: "📒",
                    category: 6,
                    name: "ledger",
                    version: "1.0"
                }, {
                    emoji: "📃",
                    category: 6,
                    name: "page with curl",
                    version: "1.0"
                }, {
                    emoji: "📜",
                    category: 6,
                    name: "scroll",
                    version: "1.0"
                }, {
                    emoji: "📄",
                    category: 6,
                    name: "page facing up",
                    version: "1.0"
                }, {
                    emoji: "📰",
                    category: 6,
                    name: "newspaper",
                    version: "1.0"
                }, {
                    emoji: "🗞️",
                    category: 6,
                    name: "rolled-up newspaper",
                    version: "1.0"
                }, {
                    emoji: "📑",
                    category: 6,
                    name: "bookmark tabs",
                    version: "1.0"
                }, {
                    emoji: "🔖",
                    category: 6,
                    name: "bookmark",
                    version: "1.0"
                }, {
                    emoji: "🏷️",
                    category: 6,
                    name: "label",
                    version: "1.0"
                }, {
                    emoji: "💰",
                    category: 6,
                    name: "money bag",
                    version: "1.0"
                }, {
                    emoji: "🪙",
                    category: 6,
                    name: "coin",
                    version: "13.0"
                }, {
                    emoji: "💴",
                    category: 6,
                    name: "yen banknote",
                    version: "1.0"
                }, {
                    emoji: "💵",
                    category: 6,
                    name: "dollar banknote",
                    version: "1.0"
                }, {
                    emoji: "💶",
                    category: 6,
                    name: "euro banknote",
                    version: "1.0"
                }, {
                    emoji: "💷",
                    category: 6,
                    name: "pound banknote",
                    version: "1.0"
                }, {
                    emoji: "💸",
                    category: 6,
                    name: "money with wings",
                    version: "1.0"
                }, {
                    emoji: "💳",
                    category: 6,
                    name: "credit card",
                    version: "1.0"
                }, {
                    emoji: "🧾",
                    category: 6,
                    name: "receipt",
                    version: "11.0"
                }, {
                    emoji: "💹",
                    category: 6,
                    name: "chart increasing with yen",
                    version: "1.0"
                }, {
                    emoji: "✉️",
                    category: 6,
                    name: "envelope",
                    version: "1.0"
                }, {
                    emoji: "📧",
                    category: 6,
                    name: "e-mail",
                    version: "1.0"
                }, {
                    emoji: "📨",
                    category: 6,
                    name: "incoming envelope",
                    version: "1.0"
                }, {
                    emoji: "📩",
                    category: 6,
                    name: "envelope with arrow",
                    version: "1.0"
                }, {
                    emoji: "📤",
                    category: 6,
                    name: "outbox tray",
                    version: "1.0"
                }, {
                    emoji: "📥",
                    category: 6,
                    name: "inbox tray",
                    version: "1.0"
                }, {
                    emoji: "📦",
                    category: 6,
                    name: "package",
                    version: "1.0"
                }, {
                    emoji: "📫",
                    category: 6,
                    name: "closed mailbox with raised flag",
                    version: "1.0"
                }, {
                    emoji: "📪",
                    category: 6,
                    name: "closed mailbox with lowered flag",
                    version: "1.0"
                }, {
                    emoji: "📬",
                    category: 6,
                    name: "open mailbox with raised flag",
                    version: "1.0"
                }, {
                    emoji: "📭",
                    category: 6,
                    name: "open mailbox with lowered flag",
                    version: "1.0"
                }, {
                    emoji: "📮",
                    category: 6,
                    name: "postbox",
                    version: "1.0"
                }, {
                    emoji: "🗳️",
                    category: 6,
                    name: "ballot box with ballot",
                    version: "1.0"
                }, {
                    emoji: "✏️",
                    category: 6,
                    name: "pencil",
                    version: "1.0"
                }, {
                    emoji: "✒️",
                    category: 6,
                    name: "black nib",
                    version: "1.0"
                }, {
                    emoji: "🖋️",
                    category: 6,
                    name: "fountain pen",
                    version: "1.0"
                }, {
                    emoji: "🖊️",
                    category: 6,
                    name: "pen",
                    version: "1.0"
                }, {
                    emoji: "🖌️",
                    category: 6,
                    name: "paintbrush",
                    version: "1.0"
                }, {
                    emoji: "🖍️",
                    category: 6,
                    name: "crayon",
                    version: "1.0"
                }, {
                    emoji: "📝",
                    category: 6,
                    name: "memo",
                    version: "1.0"
                }, {
                    emoji: "💼",
                    category: 6,
                    name: "briefcase",
                    version: "1.0"
                }, {
                    emoji: "📁",
                    category: 6,
                    name: "file folder",
                    version: "1.0"
                }, {
                    emoji: "📂",
                    category: 6,
                    name: "open file folder",
                    version: "1.0"
                }, {
                    emoji: "🗂️",
                    category: 6,
                    name: "card index dividers",
                    version: "1.0"
                }, {
                    emoji: "📅",
                    category: 6,
                    name: "calendar",
                    version: "1.0"
                }, {
                    emoji: "📆",
                    category: 6,
                    name: "tear-off calendar",
                    version: "1.0"
                }, {
                    emoji: "🗒️",
                    category: 6,
                    name: "spiral notepad",
                    version: "1.0"
                }, {
                    emoji: "🗓️",
                    category: 6,
                    name: "spiral calendar",
                    version: "1.0"
                }, {
                    emoji: "📇",
                    category: 6,
                    name: "card index",
                    version: "1.0"
                }, {
                    emoji: "📈",
                    category: 6,
                    name: "chart increasing",
                    version: "1.0"
                }, {
                    emoji: "📉",
                    category: 6,
                    name: "chart decreasing",
                    version: "1.0"
                }, {
                    emoji: "📊",
                    category: 6,
                    name: "bar chart",
                    version: "1.0"
                }, {
                    emoji: "📋",
                    category: 6,
                    name: "clipboard",
                    version: "1.0"
                }, {
                    emoji: "📌",
                    category: 6,
                    name: "pushpin",
                    version: "1.0"
                }, {
                    emoji: "📍",
                    category: 6,
                    name: "round pushpin",
                    version: "1.0"
                }, {
                    emoji: "📎",
                    category: 6,
                    name: "paperclip",
                    version: "1.0"
                }, {
                    emoji: "🖇️",
                    category: 6,
                    name: "linked paperclips",
                    version: "1.0"
                }, {
                    emoji: "📏",
                    category: 6,
                    name: "straight ruler",
                    version: "1.0"
                }, {
                    emoji: "📐",
                    category: 6,
                    name: "triangular ruler",
                    version: "1.0"
                }, {
                    emoji: "✂️",
                    category: 6,
                    name: "scissors",
                    version: "1.0"
                }, {
                    emoji: "🗃️",
                    category: 6,
                    name: "card file box",
                    version: "1.0"
                }, {
                    emoji: "🗄️",
                    category: 6,
                    name: "file cabinet",
                    version: "1.0"
                }, {
                    emoji: "🗑️",
                    category: 6,
                    name: "wastebasket",
                    version: "1.0"
                }, {
                    emoji: "🔒",
                    category: 6,
                    name: "locked",
                    version: "1.0"
                }, {
                    emoji: "🔓",
                    category: 6,
                    name: "unlocked",
                    version: "1.0"
                }, {
                    emoji: "🔏",
                    category: 6,
                    name: "locked with pen",
                    version: "1.0"
                }, {
                    emoji: "🔐",
                    category: 6,
                    name: "locked with key",
                    version: "1.0"
                }, {
                    emoji: "🔑",
                    category: 6,
                    name: "key",
                    version: "1.0"
                }, {
                    emoji: "🗝️",
                    category: 6,
                    name: "old key",
                    version: "1.0"
                }, {
                    emoji: "🔨",
                    category: 6,
                    name: "hammer",
                    version: "1.0"
                }, {
                    emoji: "🪓",
                    category: 6,
                    name: "axe",
                    version: "12.0"
                }, {
                    emoji: "⛏️",
                    category: 6,
                    name: "pick",
                    version: "1.0"
                }, {
                    emoji: "⚒️",
                    category: 6,
                    name: "hammer and pick",
                    version: "1.0"
                }, {
                    emoji: "🛠️",
                    category: 6,
                    name: "hammer and wrench",
                    version: "1.0"
                }, {
                    emoji: "🗡️",
                    category: 6,
                    name: "dagger",
                    version: "1.0"
                }, {
                    emoji: "⚔️",
                    category: 6,
                    name: "crossed swords",
                    version: "1.0"
                }, {
                    emoji: "🔫",
                    category: 6,
                    name: "pistol",
                    version: "1.0"
                }, {
                    emoji: "🪃",
                    category: 6,
                    name: "boomerang",
                    version: "13.0"
                }, {
                    emoji: "🏹",
                    category: 6,
                    name: "bow and arrow",
                    version: "1.0"
                }, {
                    emoji: "🛡️",
                    category: 6,
                    name: "shield",
                    version: "1.0"
                }, {
                    emoji: "🪚",
                    category: 6,
                    name: "carpentry saw",
                    version: "13.0"
                }, {
                    emoji: "🔧",
                    category: 6,
                    name: "wrench",
                    version: "1.0"
                }, {
                    emoji: "🪛",
                    category: 6,
                    name: "screwdriver",
                    version: "13.0"
                }, {
                    emoji: "🔩",
                    category: 6,
                    name: "nut and bolt",
                    version: "1.0"
                }, {
                    emoji: "⚙️",
                    category: 6,
                    name: "gear",
                    version: "1.0"
                }, {
                    emoji: "🗜️",
                    category: 6,
                    name: "clamp",
                    version: "1.0"
                }, {
                    emoji: "⚖️",
                    category: 6,
                    name: "balance scale",
                    version: "1.0"
                }, {
                    emoji: "🦯",
                    category: 6,
                    name: "white cane",
                    version: "12.0"
                }, {
                    emoji: "🔗",
                    category: 6,
                    name: "link",
                    version: "1.0"
                }, {
                    emoji: "⛓️",
                    category: 6,
                    name: "chains",
                    version: "1.0"
                }, {
                    emoji: "🪝",
                    category: 6,
                    name: "hook",
                    version: "13.0"
                }, {
                    emoji: "🧰",
                    category: 6,
                    name: "toolbox",
                    version: "11.0"
                }, {
                    emoji: "🧲",
                    category: 6,
                    name: "magnet",
                    version: "11.0"
                }, {
                    emoji: "🪜",
                    category: 6,
                    name: "ladder",
                    version: "13.0"
                }, {
                    emoji: "⚗️",
                    category: 6,
                    name: "alembic",
                    version: "1.0"
                }, {
                    emoji: "🧪",
                    category: 6,
                    name: "test tube",
                    version: "11.0"
                }, {
                    emoji: "🧫",
                    category: 6,
                    name: "petri dish",
                    version: "11.0"
                }, {
                    emoji: "🧬",
                    category: 6,
                    name: "dna",
                    version: "11.0"
                }, {
                    emoji: "🔬",
                    category: 6,
                    name: "microscope",
                    version: "1.0"
                }, {
                    emoji: "🔭",
                    category: 6,
                    name: "telescope",
                    version: "1.0"
                }, {
                    emoji: "📡",
                    category: 6,
                    name: "satellite antenna",
                    version: "1.0"
                }, {
                    emoji: "💉",
                    category: 6,
                    name: "syringe",
                    version: "1.0"
                }, {
                    emoji: "🩸",
                    category: 6,
                    name: "drop of blood",
                    version: "12.0"
                }, {
                    emoji: "💊",
                    category: 6,
                    name: "pill",
                    version: "1.0"
                }, {
                    emoji: "🩹",
                    category: 6,
                    name: "adhesive bandage",
                    version: "12.0"
                }, {
                    emoji: "🩺",
                    category: 6,
                    name: "stethoscope",
                    version: "12.0"
                }, {
                    emoji: "🚪",
                    category: 6,
                    name: "door",
                    version: "1.0"
                }, {
                    emoji: "🛗",
                    category: 6,
                    name: "elevator",
                    version: "13.0"
                }, {
                    emoji: "🪞",
                    category: 6,
                    name: "mirror",
                    version: "13.0"
                }, {
                    emoji: "🪟",
                    category: 6,
                    name: "window",
                    version: "13.0"
                }, {
                    emoji: "🛏️",
                    category: 6,
                    name: "bed",
                    version: "1.0"
                }, {
                    emoji: "🛋️",
                    category: 6,
                    name: "couch and lamp",
                    version: "1.0"
                }, {
                    emoji: "🪑",
                    category: 6,
                    name: "chair",
                    version: "12.0"
                }, {
                    emoji: "🚽",
                    category: 6,
                    name: "toilet",
                    version: "1.0"
                }, {
                    emoji: "🪠",
                    category: 6,
                    name: "plunger",
                    version: "13.0"
                }, {
                    emoji: "🚿",
                    category: 6,
                    name: "shower",
                    version: "1.0"
                }, {
                    emoji: "🛁",
                    category: 6,
                    name: "bathtub",
                    version: "1.0"
                }, {
                    emoji: "🪤",
                    category: 6,
                    name: "mouse trap",
                    version: "13.0"
                }, {
                    emoji: "🪒",
                    category: 6,
                    name: "razor",
                    version: "12.0"
                }, {
                    emoji: "🧴",
                    category: 6,
                    name: "lotion bottle",
                    version: "11.0"
                }, {
                    emoji: "🧷",
                    category: 6,
                    name: "safety pin",
                    version: "11.0"
                }, {
                    emoji: "🧹",
                    category: 6,
                    name: "broom",
                    version: "11.0"
                }, {
                    emoji: "🧺",
                    category: 6,
                    name: "basket",
                    version: "11.0"
                }, {
                    emoji: "🧻",
                    category: 6,
                    name: "roll of paper",
                    version: "11.0"
                }, {
                    emoji: "🪣",
                    category: 6,
                    name: "bucket",
                    version: "13.0"
                }, {
                    emoji: "🧼",
                    category: 6,
                    name: "soap",
                    version: "11.0"
                }, {
                    emoji: "🪥",
                    category: 6,
                    name: "toothbrush",
                    version: "13.0"
                }, {
                    emoji: "🧽",
                    category: 6,
                    name: "sponge",
                    version: "11.0"
                }, {
                    emoji: "🧯",
                    category: 6,
                    name: "fire extinguisher",
                    version: "11.0"
                }, {
                    emoji: "🛒",
                    category: 6,
                    name: "shopping cart",
                    version: "3.0"
                }, {
                    emoji: "🚬",
                    category: 6,
                    name: "cigarette",
                    version: "1.0"
                }, {
                    emoji: "⚰️",
                    category: 6,
                    name: "coffin",
                    version: "1.0"
                }, {
                    emoji: "🪦",
                    category: 6,
                    name: "headstone",
                    version: "13.0"
                }, {
                    emoji: "⚱️",
                    category: 6,
                    name: "funeral urn",
                    version: "1.0"
                }, {
                    emoji: "🗿",
                    category: 6,
                    name: "moai",
                    version: "1.0"
                }, {
                    emoji: "🪧",
                    category: 6,
                    name: "placard",
                    version: "13.0"
                }, {
                    emoji: "🏧",
                    category: 7,
                    name: "ATM sign",
                    version: "1.0"
                }, {
                    emoji: "🚮",
                    category: 7,
                    name: "litter in bin sign",
                    version: "1.0"
                }, {
                    emoji: "🚰",
                    category: 7,
                    name: "potable water",
                    version: "1.0"
                }, {
                    emoji: "♿",
                    category: 7,
                    name: "wheelchair symbol",
                    version: "1.0"
                }, {
                    emoji: "🚹",
                    category: 7,
                    name: "men’s room",
                    version: "1.0"
                }, {
                    emoji: "🚺",
                    category: 7,
                    name: "women’s room",
                    version: "1.0"
                }, {
                    emoji: "🚻",
                    category: 7,
                    name: "restroom",
                    version: "1.0"
                }, {
                    emoji: "🚼",
                    category: 7,
                    name: "baby symbol",
                    version: "1.0"
                }, {
                    emoji: "🚾",
                    category: 7,
                    name: "water closet",
                    version: "1.0"
                }, {
                    emoji: "🛂",
                    category: 7,
                    name: "passport control",
                    version: "1.0"
                }, {
                    emoji: "🛃",
                    category: 7,
                    name: "customs",
                    version: "1.0"
                }, {
                    emoji: "🛄",
                    category: 7,
                    name: "baggage claim",
                    version: "1.0"
                }, {
                    emoji: "🛅",
                    category: 7,
                    name: "left luggage",
                    version: "1.0"
                }, {
                    emoji: "⚠️",
                    category: 7,
                    name: "warning",
                    version: "1.0"
                }, {
                    emoji: "🚸",
                    category: 7,
                    name: "children crossing",
                    version: "1.0"
                }, {
                    emoji: "⛔",
                    category: 7,
                    name: "no entry",
                    version: "1.0"
                }, {
                    emoji: "🚫",
                    category: 7,
                    name: "prohibited",
                    version: "1.0"
                }, {
                    emoji: "🚳",
                    category: 7,
                    name: "no bicycles",
                    version: "1.0"
                }, {
                    emoji: "🚭",
                    category: 7,
                    name: "no smoking",
                    version: "1.0"
                }, {
                    emoji: "🚯",
                    category: 7,
                    name: "no littering",
                    version: "1.0"
                }, {
                    emoji: "🚱",
                    category: 7,
                    name: "non-potable water",
                    version: "1.0"
                }, {
                    emoji: "🚷",
                    category: 7,
                    name: "no pedestrians",
                    version: "1.0"
                }, {
                    emoji: "📵",
                    category: 7,
                    name: "no mobile phones",
                    version: "1.0"
                }, {
                    emoji: "🔞",
                    category: 7,
                    name: "no one under eighteen",
                    version: "1.0"
                }, {
                    emoji: "☢️",
                    category: 7,
                    name: "radioactive",
                    version: "1.0"
                }, {
                    emoji: "☣️",
                    category: 7,
                    name: "biohazard",
                    version: "1.0"
                }, {
                    emoji: "⬆️",
                    category: 7,
                    name: "up arrow",
                    version: "1.0"
                }, {
                    emoji: "↗️",
                    category: 7,
                    name: "up-right arrow",
                    version: "1.0"
                }, {
                    emoji: "➡️",
                    category: 7,
                    name: "right arrow",
                    version: "1.0"
                }, {
                    emoji: "↘️",
                    category: 7,
                    name: "down-right arrow",
                    version: "1.0"
                }, {
                    emoji: "⬇️",
                    category: 7,
                    name: "down arrow",
                    version: "1.0"
                }, {
                    emoji: "↙️",
                    category: 7,
                    name: "down-left arrow",
                    version: "1.0"
                }, {
                    emoji: "⬅️",
                    category: 7,
                    name: "left arrow",
                    version: "1.0"
                }, {
                    emoji: "↖️",
                    category: 7,
                    name: "up-left arrow",
                    version: "1.0"
                }, {
                    emoji: "↕️",
                    category: 7,
                    name: "up-down arrow",
                    version: "1.0"
                }, {
                    emoji: "↔️",
                    category: 7,
                    name: "left-right arrow",
                    version: "1.0"
                }, {
                    emoji: "↩️",
                    category: 7,
                    name: "right arrow curving left",
                    version: "1.0"
                }, {
                    emoji: "↪️",
                    category: 7,
                    name: "left arrow curving right",
                    version: "1.0"
                }, {
                    emoji: "⤴️",
                    category: 7,
                    name: "right arrow curving up",
                    version: "1.0"
                }, {
                    emoji: "⤵️",
                    category: 7,
                    name: "right arrow curving down",
                    version: "1.0"
                }, {
                    emoji: "🔃",
                    category: 7,
                    name: "clockwise vertical arrows",
                    version: "1.0"
                }, {
                    emoji: "🔄",
                    category: 7,
                    name: "counterclockwise arrows button",
                    version: "1.0"
                }, {
                    emoji: "🔙",
                    category: 7,
                    name: "BACK arrow",
                    version: "1.0"
                }, {
                    emoji: "🔚",
                    category: 7,
                    name: "END arrow",
                    version: "1.0"
                }, {
                    emoji: "🔛",
                    category: 7,
                    name: "ON! arrow",
                    version: "1.0"
                }, {
                    emoji: "🔜",
                    category: 7,
                    name: "SOON arrow",
                    version: "1.0"
                }, {
                    emoji: "🔝",
                    category: 7,
                    name: "TOP arrow",
                    version: "1.0"
                }, {
                    emoji: "🛐",
                    category: 7,
                    name: "place of worship",
                    version: "1.0"
                }, {
                    emoji: "⚛️",
                    category: 7,
                    name: "atom symbol",
                    version: "1.0"
                }, {
                    emoji: "🕉️",
                    category: 7,
                    name: "om",
                    version: "1.0"
                }, {
                    emoji: "✡️",
                    category: 7,
                    name: "star of David",
                    version: "1.0"
                }, {
                    emoji: "☸️",
                    category: 7,
                    name: "wheel of dharma",
                    version: "1.0"
                }, {
                    emoji: "☯️",
                    category: 7,
                    name: "yin yang",
                    version: "1.0"
                }, {
                    emoji: "✝️",
                    category: 7,
                    name: "latin cross",
                    version: "1.0"
                }, {
                    emoji: "☦️",
                    category: 7,
                    name: "orthodox cross",
                    version: "1.0"
                }, {
                    emoji: "☪️",
                    category: 7,
                    name: "star and crescent",
                    version: "1.0"
                }, {
                    emoji: "☮️",
                    category: 7,
                    name: "peace symbol",
                    version: "1.0"
                }, {
                    emoji: "🕎",
                    category: 7,
                    name: "menorah",
                    version: "1.0"
                }, {
                    emoji: "🔯",
                    category: 7,
                    name: "dotted six-pointed star",
                    version: "1.0"
                }, {
                    emoji: "♈",
                    category: 7,
                    name: "Aries",
                    version: "1.0"
                }, {
                    emoji: "♉",
                    category: 7,
                    name: "Taurus",
                    version: "1.0"
                }, {
                    emoji: "♊",
                    category: 7,
                    name: "Gemini",
                    version: "1.0"
                }, {
                    emoji: "♋",
                    category: 7,
                    name: "Cancer",
                    version: "1.0"
                }, {
                    emoji: "♌",
                    category: 7,
                    name: "Leo",
                    version: "1.0"
                }, {
                    emoji: "♍",
                    category: 7,
                    name: "Virgo",
                    version: "1.0"
                }, {
                    emoji: "♎",
                    category: 7,
                    name: "Libra",
                    version: "1.0"
                }, {
                    emoji: "♏",
                    category: 7,
                    name: "Scorpio",
                    version: "1.0"
                }, {
                    emoji: "♐",
                    category: 7,
                    name: "Sagittarius",
                    version: "1.0"
                }, {
                    emoji: "♑",
                    category: 7,
                    name: "Capricorn",
                    version: "1.0"
                }, {
                    emoji: "♒",
                    category: 7,
                    name: "Aquarius",
                    version: "1.0"
                }, {
                    emoji: "♓",
                    category: 7,
                    name: "Pisces",
                    version: "1.0"
                }, {
                    emoji: "⛎",
                    category: 7,
                    name: "Ophiuchus",
                    version: "1.0"
                }, {
                    emoji: "🔀",
                    category: 7,
                    name: "shuffle tracks button",
                    version: "1.0"
                }, {
                    emoji: "🔁",
                    category: 7,
                    name: "repeat button",
                    version: "1.0"
                }, {
                    emoji: "🔂",
                    category: 7,
                    name: "repeat single button",
                    version: "1.0"
                }, {
                    emoji: "▶️",
                    category: 7,
                    name: "play button",
                    version: "1.0"
                }, {
                    emoji: "⏩",
                    category: 7,
                    name: "fast-forward button",
                    version: "1.0"
                }, {
                    emoji: "⏭️",
                    category: 7,
                    name: "next track button",
                    version: "1.0"
                }, {
                    emoji: "⏯️",
                    category: 7,
                    name: "play or pause button",
                    version: "1.0"
                }, {
                    emoji: "◀️",
                    category: 7,
                    name: "reverse button",
                    version: "1.0"
                }, {
                    emoji: "⏪",
                    category: 7,
                    name: "fast reverse button",
                    version: "1.0"
                }, {
                    emoji: "⏮️",
                    category: 7,
                    name: "last track button",
                    version: "1.0"
                }, {
                    emoji: "🔼",
                    category: 7,
                    name: "upwards button",
                    version: "1.0"
                }, {
                    emoji: "⏫",
                    category: 7,
                    name: "fast up button",
                    version: "1.0"
                }, {
                    emoji: "🔽",
                    category: 7,
                    name: "downwards button",
                    version: "1.0"
                }, {
                    emoji: "⏬",
                    category: 7,
                    name: "fast down button",
                    version: "1.0"
                }, {
                    emoji: "⏸️",
                    category: 7,
                    name: "pause button",
                    version: "1.0"
                }, {
                    emoji: "⏹️",
                    category: 7,
                    name: "stop button",
                    version: "1.0"
                }, {
                    emoji: "⏺️",
                    category: 7,
                    name: "record button",
                    version: "1.0"
                }, {
                    emoji: "⏏️",
                    category: 7,
                    name: "eject button",
                    version: "1.0"
                }, {
                    emoji: "🎦",
                    category: 7,
                    name: "cinema",
                    version: "1.0"
                }, {
                    emoji: "🔅",
                    category: 7,
                    name: "dim button",
                    version: "1.0"
                }, {
                    emoji: "🔆",
                    category: 7,
                    name: "bright button",
                    version: "1.0"
                }, {
                    emoji: "📶",
                    category: 7,
                    name: "antenna bars",
                    version: "1.0"
                }, {
                    emoji: "📳",
                    category: 7,
                    name: "vibration mode",
                    version: "1.0"
                }, {
                    emoji: "📴",
                    category: 7,
                    name: "mobile phone off",
                    version: "1.0"
                }, {
                    emoji: "♀️",
                    category: 7,
                    name: "female sign",
                    version: "4.0"
                }, {
                    emoji: "♂️",
                    category: 7,
                    name: "male sign",
                    version: "4.0"
                }, {
                    emoji: "⚧️",
                    category: 7,
                    name: "transgender symbol",
                    version: "13.0"
                }, {
                    emoji: "✖️",
                    category: 7,
                    name: "multiply",
                    version: "1.0"
                }, {
                    emoji: "➕",
                    category: 7,
                    name: "plus",
                    version: "1.0"
                }, {
                    emoji: "➖",
                    category: 7,
                    name: "minus",
                    version: "1.0"
                }, {
                    emoji: "➗",
                    category: 7,
                    name: "divide",
                    version: "1.0"
                }, {
                    emoji: "♾️",
                    category: 7,
                    name: "infinity",
                    version: "11.0"
                }, {
                    emoji: "‼️",
                    category: 7,
                    name: "double exclamation mark",
                    version: "1.0"
                }, {
                    emoji: "⁉️",
                    category: 7,
                    name: "exclamation question mark",
                    version: "1.0"
                }, {
                    emoji: "❓",
                    category: 7,
                    name: "question mark",
                    version: "1.0"
                }, {
                    emoji: "❔",
                    category: 7,
                    name: "white question mark",
                    version: "1.0"
                }, {
                    emoji: "❕",
                    category: 7,
                    name: "white exclamation mark",
                    version: "1.0"
                }, {
                    emoji: "❗",
                    category: 7,
                    name: "exclamation mark",
                    version: "1.0"
                }, {
                    emoji: "〰️",
                    category: 7,
                    name: "wavy dash",
                    version: "1.0"
                }, {
                    emoji: "💱",
                    category: 7,
                    name: "currency exchange",
                    version: "1.0"
                }, {
                    emoji: "💲",
                    category: 7,
                    name: "heavy dollar sign",
                    version: "1.0"
                }, {
                    emoji: "⚕️",
                    category: 7,
                    name: "medical symbol",
                    version: "4.0"
                }, {
                    emoji: "♻️",
                    category: 7,
                    name: "recycling symbol",
                    version: "1.0"
                }, {
                    emoji: "⚜️",
                    category: 7,
                    name: "fleur-de-lis",
                    version: "1.0"
                }, {
                    emoji: "🔱",
                    category: 7,
                    name: "trident emblem",
                    version: "1.0"
                }, {
                    emoji: "📛",
                    category: 7,
                    name: "name badge",
                    version: "1.0"
                }, {
                    emoji: "🔰",
                    category: 7,
                    name: "Japanese symbol for beginner",
                    version: "1.0"
                }, {
                    emoji: "⭕",
                    category: 7,
                    name: "hollow red circle",
                    version: "1.0"
                }, {
                    emoji: "✅",
                    category: 7,
                    name: "check mark button",
                    version: "1.0"
                }, {
                    emoji: "☑️",
                    category: 7,
                    name: "check box with check",
                    version: "1.0"
                }, {
                    emoji: "✔️",
                    category: 7,
                    name: "check mark",
                    version: "1.0"
                }, {
                    emoji: "❌",
                    category: 7,
                    name: "cross mark",
                    version: "1.0"
                }, {
                    emoji: "❎",
                    category: 7,
                    name: "cross mark button",
                    version: "1.0"
                }, {
                    emoji: "➰",
                    category: 7,
                    name: "curly loop",
                    version: "1.0"
                }, {
                    emoji: "➿",
                    category: 7,
                    name: "double curly loop",
                    version: "1.0"
                }, {
                    emoji: "〽️",
                    category: 7,
                    name: "part alternation mark",
                    version: "1.0"
                }, {
                    emoji: "✳️",
                    category: 7,
                    name: "eight-spoked asterisk",
                    version: "1.0"
                }, {
                    emoji: "✴️",
                    category: 7,
                    name: "eight-pointed star",
                    version: "1.0"
                }, {
                    emoji: "❇️",
                    category: 7,
                    name: "sparkle",
                    version: "1.0"
                }, {
                    emoji: "©️",
                    category: 7,
                    name: "copyright",
                    version: "1.0"
                }, {
                    emoji: "®️",
                    category: 7,
                    name: "registered",
                    version: "1.0"
                }, {
                    emoji: "™️",
                    category: 7,
                    name: "trade mark",
                    version: "1.0"
                }, {
                    emoji: "#️⃣",
                    category: 7,
                    name: "keycap: #",
                    version: "1.0"
                }, {
                    emoji: "*️⃣",
                    category: 7,
                    name: "keycap: *",
                    version: "2.0"
                }, {
                    emoji: "0️⃣",
                    category: 7,
                    name: "keycap: 0",
                    version: "1.0"
                }, {
                    emoji: "1️⃣",
                    category: 7,
                    name: "keycap: 1",
                    version: "1.0"
                }, {
                    emoji: "2️⃣",
                    category: 7,
                    name: "keycap: 2",
                    version: "1.0"
                }, {
                    emoji: "3️⃣",
                    category: 7,
                    name: "keycap: 3",
                    version: "1.0"
                }, {
                    emoji: "4️⃣",
                    category: 7,
                    name: "keycap: 4",
                    version: "1.0"
                }, {
                    emoji: "5️⃣",
                    category: 7,
                    name: "keycap: 5",
                    version: "1.0"
                }, {
                    emoji: "6️⃣",
                    category: 7,
                    name: "keycap: 6",
                    version: "1.0"
                }, {
                    emoji: "7️⃣",
                    category: 7,
                    name: "keycap: 7",
                    version: "1.0"
                }, {
                    emoji: "8️⃣",
                    category: 7,
                    name: "keycap: 8",
                    version: "1.0"
                }, {
                    emoji: "9️⃣",
                    category: 7,
                    name: "keycap: 9",
                    version: "1.0"
                }, {
                    emoji: "🔟",
                    category: 7,
                    name: "keycap: 10",
                    version: "1.0"
                }, {
                    emoji: "🔠",
                    category: 7,
                    name: "input latin uppercase",
                    version: "1.0"
                }, {
                    emoji: "🔡",
                    category: 7,
                    name: "input latin lowercase",
                    version: "1.0"
                }, {
                    emoji: "🔢",
                    category: 7,
                    name: "input numbers",
                    version: "1.0"
                }, {
                    emoji: "🔣",
                    category: 7,
                    name: "input symbols",
                    version: "1.0"
                }, {
                    emoji: "🔤",
                    category: 7,
                    name: "input latin letters",
                    version: "1.0"
                }, {
                    emoji: "🅰️",
                    category: 7,
                    name: "A button (blood type)",
                    version: "1.0"
                }, {
                    emoji: "🆎",
                    category: 7,
                    name: "AB button (blood type)",
                    version: "1.0"
                }, {
                    emoji: "🅱️",
                    category: 7,
                    name: "B button (blood type)",
                    version: "1.0"
                }, {
                    emoji: "🆑",
                    category: 7,
                    name: "CL button",
                    version: "1.0"
                }, {
                    emoji: "🆒",
                    category: 7,
                    name: "COOL button",
                    version: "1.0"
                }, {
                    emoji: "🆓",
                    category: 7,
                    name: "FREE button",
                    version: "1.0"
                }, {
                    emoji: "ℹ️",
                    category: 7,
                    name: "information",
                    version: "1.0"
                }, {
                    emoji: "🆔",
                    category: 7,
                    name: "ID button",
                    version: "1.0"
                }, {
                    emoji: "Ⓜ️",
                    category: 7,
                    name: "circled M",
                    version: "1.0"
                }, {
                    emoji: "🆕",
                    category: 7,
                    name: "NEW button",
                    version: "1.0"
                }, {
                    emoji: "🆖",
                    category: 7,
                    name: "NG button",
                    version: "1.0"
                }, {
                    emoji: "🅾️",
                    category: 7,
                    name: "O button (blood type)",
                    version: "1.0"
                }, {
                    emoji: "🆗",
                    category: 7,
                    name: "OK button",
                    version: "1.0"
                }, {
                    emoji: "🅿️",
                    category: 7,
                    name: "P button",
                    version: "1.0"
                }, {
                    emoji: "🆘",
                    category: 7,
                    name: "SOS button",
                    version: "1.0"
                }, {
                    emoji: "🆙",
                    category: 7,
                    name: "UP! button",
                    version: "1.0"
                }, {
                    emoji: "🆚",
                    category: 7,
                    name: "VS button",
                    version: "1.0"
                }, {
                    emoji: "🈁",
                    category: 7,
                    name: "Japanese “here” button",
                    version: "1.0"
                }, {
                    emoji: "🈂️",
                    category: 7,
                    name: "Japanese “service charge” button",
                    version: "1.0"
                }, {
                    emoji: "🈷️",
                    category: 7,
                    name: "Japanese “monthly amount” button",
                    version: "1.0"
                }, {
                    emoji: "🈶",
                    category: 7,
                    name: "Japanese “not free of charge” button",
                    version: "1.0"
                }, {
                    emoji: "🈯",
                    category: 7,
                    name: "Japanese “reserved” button",
                    version: "1.0"
                }, {
                    emoji: "🉐",
                    category: 7,
                    name: "Japanese “bargain” button",
                    version: "1.0"
                }, {
                    emoji: "🈹",
                    category: 7,
                    name: "Japanese “discount” button",
                    version: "1.0"
                }, {
                    emoji: "🈚",
                    category: 7,
                    name: "Japanese “free of charge” button",
                    version: "1.0"
                }, {
                    emoji: "🈲",
                    category: 7,
                    name: "Japanese “prohibited” button",
                    version: "1.0"
                }, {
                    emoji: "🉑",
                    category: 7,
                    name: "Japanese “acceptable” button",
                    version: "1.0"
                }, {
                    emoji: "🈸",
                    category: 7,
                    name: "Japanese “application” button",
                    version: "1.0"
                }, {
                    emoji: "🈴",
                    category: 7,
                    name: "Japanese “passing grade” button",
                    version: "1.0"
                }, {
                    emoji: "🈳",
                    category: 7,
                    name: "Japanese “vacancy” button",
                    version: "1.0"
                }, {
                    emoji: "㊗️",
                    category: 7,
                    name: "Japanese “congratulations” button",
                    version: "1.0"
                }, {
                    emoji: "㊙️",
                    category: 7,
                    name: "Japanese “secret” button",
                    version: "1.0"
                }, {
                    emoji: "🈺",
                    category: 7,
                    name: "Japanese “open for business” button",
                    version: "1.0"
                }, {
                    emoji: "🈵",
                    category: 7,
                    name: "Japanese “no vacancy” button",
                    version: "1.0"
                }, {
                    emoji: "🔴",
                    category: 7,
                    name: "red circle",
                    version: "1.0"
                }, {
                    emoji: "🟠",
                    category: 7,
                    name: "orange circle",
                    version: "12.0"
                }, {
                    emoji: "🟡",
                    category: 7,
                    name: "yellow circle",
                    version: "12.0"
                }, {
                    emoji: "🟢",
                    category: 7,
                    name: "green circle",
                    version: "12.0"
                }, {
                    emoji: "🔵",
                    category: 7,
                    name: "blue circle",
                    version: "1.0"
                }, {
                    emoji: "🟣",
                    category: 7,
                    name: "purple circle",
                    version: "12.0"
                }, {
                    emoji: "🟤",
                    category: 7,
                    name: "brown circle",
                    version: "12.0"
                }, {
                    emoji: "⚫",
                    category: 7,
                    name: "black circle",
                    version: "1.0"
                }, {
                    emoji: "⚪",
                    category: 7,
                    name: "white circle",
                    version: "1.0"
                }, {
                    emoji: "🟥",
                    category: 7,
                    name: "red square",
                    version: "12.0"
                }, {
                    emoji: "🟧",
                    category: 7,
                    name: "orange square",
                    version: "12.0"
                }, {
                    emoji: "🟨",
                    category: 7,
                    name: "yellow square",
                    version: "12.0"
                }, {
                    emoji: "🟩",
                    category: 7,
                    name: "green square",
                    version: "12.0"
                }, {
                    emoji: "🟦",
                    category: 7,
                    name: "blue square",
                    version: "12.0"
                }, {
                    emoji: "🟪",
                    category: 7,
                    name: "purple square",
                    version: "12.0"
                }, {
                    emoji: "🟫",
                    category: 7,
                    name: "brown square",
                    version: "12.0"
                }, {
                    emoji: "⬛",
                    category: 7,
                    name: "black large square",
                    version: "1.0"
                }, {
                    emoji: "⬜",
                    category: 7,
                    name: "white large square",
                    version: "1.0"
                }, {
                    emoji: "◼️",
                    category: 7,
                    name: "black medium square",
                    version: "1.0"
                }, {
                    emoji: "◻️",
                    category: 7,
                    name: "white medium square",
                    version: "1.0"
                }, {
                    emoji: "◾",
                    category: 7,
                    name: "black medium-small square",
                    version: "1.0"
                }, {
                    emoji: "◽",
                    category: 7,
                    name: "white medium-small square",
                    version: "1.0"
                }, {
                    emoji: "▪️",
                    category: 7,
                    name: "black small square",
                    version: "1.0"
                }, {
                    emoji: "▫️",
                    category: 7,
                    name: "white small square",
                    version: "1.0"
                }, {
                    emoji: "🔶",
                    category: 7,
                    name: "large orange diamond",
                    version: "1.0"
                }, {
                    emoji: "🔷",
                    category: 7,
                    name: "large blue diamond",
                    version: "1.0"
                }, {
                    emoji: "🔸",
                    category: 7,
                    name: "small orange diamond",
                    version: "1.0"
                }, {
                    emoji: "🔹",
                    category: 7,
                    name: "small blue diamond",
                    version: "1.0"
                }, {
                    emoji: "🔺",
                    category: 7,
                    name: "red triangle pointed up",
                    version: "1.0"
                }, {
                    emoji: "🔻",
                    category: 7,
                    name: "red triangle pointed down",
                    version: "1.0"
                }, {
                    emoji: "💠",
                    category: 7,
                    name: "diamond with a dot",
                    version: "1.0"
                }, {
                    emoji: "🔘",
                    category: 7,
                    name: "radio button",
                    version: "1.0"
                }, {
                    emoji: "🔳",
                    category: 7,
                    name: "white square button",
                    version: "1.0"
                }, {
                    emoji: "🔲",
                    category: 7,
                    name: "black square button",
                    version: "1.0"
                }, {
                    emoji: "🏁",
                    category: 8,
                    name: "chequered flag",
                    version: "1.0"
                }, {
                    emoji: "🚩",
                    category: 8,
                    name: "triangular flag",
                    version: "1.0"
                }, {
                    emoji: "🎌",
                    category: 8,
                    name: "crossed flags",
                    version: "1.0"
                }, {
                    emoji: "🏴",
                    category: 8,
                    name: "black flag",
                    version: "1.0"
                }, {
                    emoji: "🏳️",
                    category: 8,
                    name: "white flag",
                    version: "1.0"
                }, {
                    emoji: "🏳️‍🌈",
                    category: 8,
                    name: "rainbow flag",
                    version: "4.0"
                }, {
                    emoji: "🏳️‍⚧️",
                    category: 8,
                    name: "transgender flag",
                    version: "13.0"
                }, {
                    emoji: "🏴‍☠️",
                    category: 8,
                    name: "pirate flag",
                    version: "11.0"
                }, {
                    emoji: "🇦🇨",
                    category: 8,
                    name: "flag: Ascension Island",
                    version: "2.0"
                }, {
                    emoji: "🇦🇩",
                    category: 8,
                    name: "flag: Andorra",
                    version: "2.0"
                }, {
                    emoji: "🇦🇪",
                    category: 8,
                    name: "flag: United Arab Emirates",
                    version: "2.0"
                }, {
                    emoji: "🇦🇫",
                    category: 8,
                    name: "flag: Afghanistan",
                    version: "2.0"
                }, {
                    emoji: "🇦🇬",
                    category: 8,
                    name: "flag: Antigua & Barbuda",
                    version: "2.0"
                }, {
                    emoji: "🇦🇮",
                    category: 8,
                    name: "flag: Anguilla",
                    version: "2.0"
                }, {
                    emoji: "🇦🇱",
                    category: 8,
                    name: "flag: Albania",
                    version: "2.0"
                }, {
                    emoji: "🇦🇲",
                    category: 8,
                    name: "flag: Armenia",
                    version: "2.0"
                }, {
                    emoji: "🇦🇴",
                    category: 8,
                    name: "flag: Angola",
                    version: "2.0"
                }, {
                    emoji: "🇦🇶",
                    category: 8,
                    name: "flag: Antarctica",
                    version: "2.0"
                }, {
                    emoji: "🇦🇷",
                    category: 8,
                    name: "flag: Argentina",
                    version: "2.0"
                }, {
                    emoji: "🇦🇸",
                    category: 8,
                    name: "flag: American Samoa",
                    version: "2.0"
                }, {
                    emoji: "🇦🇹",
                    category: 8,
                    name: "flag: Austria",
                    version: "2.0"
                }, {
                    emoji: "🇦🇺",
                    category: 8,
                    name: "flag: Australia",
                    version: "2.0"
                }, {
                    emoji: "🇦🇼",
                    category: 8,
                    name: "flag: Aruba",
                    version: "2.0"
                }, {
                    emoji: "🇦🇽",
                    category: 8,
                    name: "flag: Åland Islands",
                    version: "2.0"
                }, {
                    emoji: "🇦🇿",
                    category: 8,
                    name: "flag: Azerbaijan",
                    version: "2.0"
                }, {
                    emoji: "🇧🇦",
                    category: 8,
                    name: "flag: Bosnia & Herzegovina",
                    version: "2.0"
                }, {
                    emoji: "🇧🇧",
                    category: 8,
                    name: "flag: Barbados",
                    version: "2.0"
                }, {
                    emoji: "🇧🇩",
                    category: 8,
                    name: "flag: Bangladesh",
                    version: "2.0"
                }, {
                    emoji: "🇧🇪",
                    category: 8,
                    name: "flag: Belgium",
                    version: "2.0"
                }, {
                    emoji: "🇧🇫",
                    category: 8,
                    name: "flag: Burkina Faso",
                    version: "2.0"
                }, {
                    emoji: "🇧🇬",
                    category: 8,
                    name: "flag: Bulgaria",
                    version: "2.0"
                }, {
                    emoji: "🇧🇭",
                    category: 8,
                    name: "flag: Bahrain",
                    version: "2.0"
                }, {
                    emoji: "🇧🇮",
                    category: 8,
                    name: "flag: Burundi",
                    version: "2.0"
                }, {
                    emoji: "🇧🇯",
                    category: 8,
                    name: "flag: Benin",
                    version: "2.0"
                }, {
                    emoji: "🇧🇱",
                    category: 8,
                    name: "flag: St. Barthélemy",
                    version: "2.0"
                }, {
                    emoji: "🇧🇲",
                    category: 8,
                    name: "flag: Bermuda",
                    version: "2.0"
                }, {
                    emoji: "🇧🇳",
                    category: 8,
                    name: "flag: Brunei",
                    version: "2.0"
                }, {
                    emoji: "🇧🇴",
                    category: 8,
                    name: "flag: Bolivia",
                    version: "2.0"
                }, {
                    emoji: "🇧🇶",
                    category: 8,
                    name: "flag: Caribbean Netherlands",
                    version: "2.0"
                }, {
                    emoji: "🇧🇷",
                    category: 8,
                    name: "flag: Brazil",
                    version: "2.0"
                }, {
                    emoji: "🇧🇸",
                    category: 8,
                    name: "flag: Bahamas",
                    version: "2.0"
                }, {
                    emoji: "🇧🇹",
                    category: 8,
                    name: "flag: Bhutan",
                    version: "2.0"
                }, {
                    emoji: "🇧🇻",
                    category: 8,
                    name: "flag: Bouvet Island",
                    version: "2.0"
                }, {
                    emoji: "🇧🇼",
                    category: 8,
                    name: "flag: Botswana",
                    version: "2.0"
                }, {
                    emoji: "🇧🇾",
                    category: 8,
                    name: "flag: Belarus",
                    version: "2.0"
                }, {
                    emoji: "🇧🇿",
                    category: 8,
                    name: "flag: Belize",
                    version: "2.0"
                }, {
                    emoji: "🇨🇦",
                    category: 8,
                    name: "flag: Canada",
                    version: "2.0"
                }, {
                    emoji: "🇨🇨",
                    category: 8,
                    name: "flag: Cocos (Keeling) Islands",
                    version: "2.0"
                }, {
                    emoji: "🇨🇩",
                    category: 8,
                    name: "flag: Congo - Kinshasa",
                    version: "2.0"
                }, {
                    emoji: "🇨🇫",
                    category: 8,
                    name: "flag: Central African Republic",
                    version: "2.0"
                }, {
                    emoji: "🇨🇬",
                    category: 8,
                    name: "flag: Congo - Brazzaville",
                    version: "2.0"
                }, {
                    emoji: "🇨🇭",
                    category: 8,
                    name: "flag: Switzerland",
                    version: "2.0"
                }, {
                    emoji: "🇨🇮",
                    category: 8,
                    name: "flag: Côte d’Ivoire",
                    version: "2.0"
                }, {
                    emoji: "🇨🇰",
                    category: 8,
                    name: "flag: Cook Islands",
                    version: "2.0"
                }, {
                    emoji: "🇨🇱",
                    category: 8,
                    name: "flag: Chile",
                    version: "2.0"
                }, {
                    emoji: "🇨🇲",
                    category: 8,
                    name: "flag: Cameroon",
                    version: "2.0"
                }, {
                    emoji: "🇨🇳",
                    category: 8,
                    name: "flag: China",
                    version: "1.0"
                }, {
                    emoji: "🇨🇴",
                    category: 8,
                    name: "flag: Colombia",
                    version: "2.0"
                }, {
                    emoji: "🇨🇵",
                    category: 8,
                    name: "flag: Clipperton Island",
                    version: "2.0"
                }, {
                    emoji: "🇨🇷",
                    category: 8,
                    name: "flag: Costa Rica",
                    version: "2.0"
                }, {
                    emoji: "🇨🇺",
                    category: 8,
                    name: "flag: Cuba",
                    version: "2.0"
                }, {
                    emoji: "🇨🇻",
                    category: 8,
                    name: "flag: Cape Verde",
                    version: "2.0"
                }, {
                    emoji: "🇨🇼",
                    category: 8,
                    name: "flag: Curaçao",
                    version: "2.0"
                }, {
                    emoji: "🇨🇽",
                    category: 8,
                    name: "flag: Christmas Island",
                    version: "2.0"
                }, {
                    emoji: "🇨🇾",
                    category: 8,
                    name: "flag: Cyprus",
                    version: "2.0"
                }, {
                    emoji: "🇨🇿",
                    category: 8,
                    name: "flag: Czechia",
                    version: "2.0"
                }, {
                    emoji: "🇩🇪",
                    category: 8,
                    name: "flag: Germany",
                    version: "1.0"
                }, {
                    emoji: "🇩🇬",
                    category: 8,
                    name: "flag: Diego Garcia",
                    version: "2.0"
                }, {
                    emoji: "🇩🇯",
                    category: 8,
                    name: "flag: Djibouti",
                    version: "2.0"
                }, {
                    emoji: "🇩🇰",
                    category: 8,
                    name: "flag: Denmark",
                    version: "2.0"
                }, {
                    emoji: "🇩🇲",
                    category: 8,
                    name: "flag: Dominica",
                    version: "2.0"
                }, {
                    emoji: "🇩🇴",
                    category: 8,
                    name: "flag: Dominican Republic",
                    version: "2.0"
                }, {
                    emoji: "🇩🇿",
                    category: 8,
                    name: "flag: Algeria",
                    version: "2.0"
                }, {
                    emoji: "🇪🇦",
                    category: 8,
                    name: "flag: Ceuta & Melilla",
                    version: "2.0"
                }, {
                    emoji: "🇪🇨",
                    category: 8,
                    name: "flag: Ecuador",
                    version: "2.0"
                }, {
                    emoji: "🇪🇪",
                    category: 8,
                    name: "flag: Estonia",
                    version: "2.0"
                }, {
                    emoji: "🇪🇬",
                    category: 8,
                    name: "flag: Egypt",
                    version: "2.0"
                }, {
                    emoji: "🇪🇭",
                    category: 8,
                    name: "flag: Western Sahara",
                    version: "2.0"
                }, {
                    emoji: "🇪🇷",
                    category: 8,
                    name: "flag: Eritrea",
                    version: "2.0"
                }, {
                    emoji: "🇪🇸",
                    category: 8,
                    name: "flag: Spain",
                    version: "1.0"
                }, {
                    emoji: "🇪🇹",
                    category: 8,
                    name: "flag: Ethiopia",
                    version: "2.0"
                }, {
                    emoji: "🇪🇺",
                    category: 8,
                    name: "flag: European Union",
                    version: "2.0"
                }, {
                    emoji: "🇫🇮",
                    category: 8,
                    name: "flag: Finland",
                    version: "2.0"
                }, {
                    emoji: "🇫🇯",
                    category: 8,
                    name: "flag: Fiji",
                    version: "2.0"
                }, {
                    emoji: "🇫🇰",
                    category: 8,
                    name: "flag: Falkland Islands",
                    version: "2.0"
                }, {
                    emoji: "🇫🇲",
                    category: 8,
                    name: "flag: Micronesia",
                    version: "2.0"
                }, {
                    emoji: "🇫🇴",
                    category: 8,
                    name: "flag: Faroe Islands",
                    version: "2.0"
                }, {
                    emoji: "🇫🇷",
                    category: 8,
                    name: "flag: France",
                    version: "1.0"
                }, {
                    emoji: "🇬🇦",
                    category: 8,
                    name: "flag: Gabon",
                    version: "2.0"
                }, {
                    emoji: "🇬🇧",
                    category: 8,
                    name: "flag: United Kingdom",
                    version: "1.0"
                }, {
                    emoji: "🇬🇩",
                    category: 8,
                    name: "flag: Grenada",
                    version: "2.0"
                }, {
                    emoji: "🇬🇪",
                    category: 8,
                    name: "flag: Georgia",
                    version: "2.0"
                }, {
                    emoji: "🇬🇫",
                    category: 8,
                    name: "flag: French Guiana",
                    version: "2.0"
                }, {
                    emoji: "🇬🇬",
                    category: 8,
                    name: "flag: Guernsey",
                    version: "2.0"
                }, {
                    emoji: "🇬🇭",
                    category: 8,
                    name: "flag: Ghana",
                    version: "2.0"
                }, {
                    emoji: "🇬🇮",
                    category: 8,
                    name: "flag: Gibraltar",
                    version: "2.0"
                }, {
                    emoji: "🇬🇱",
                    category: 8,
                    name: "flag: Greenland",
                    version: "2.0"
                }, {
                    emoji: "🇬🇲",
                    category: 8,
                    name: "flag: Gambia",
                    version: "2.0"
                }, {
                    emoji: "🇬🇳",
                    category: 8,
                    name: "flag: Guinea",
                    version: "2.0"
                }, {
                    emoji: "🇬🇵",
                    category: 8,
                    name: "flag: Guadeloupe",
                    version: "2.0"
                }, {
                    emoji: "🇬🇶",
                    category: 8,
                    name: "flag: Equatorial Guinea",
                    version: "2.0"
                }, {
                    emoji: "🇬🇷",
                    category: 8,
                    name: "flag: Greece",
                    version: "2.0"
                }, {
                    emoji: "🇬🇸",
                    category: 8,
                    name: "flag: South Georgia & South Sandwich Islands",
                    version: "2.0"
                }, {
                    emoji: "🇬🇹",
                    category: 8,
                    name: "flag: Guatemala",
                    version: "2.0"
                }, {
                    emoji: "🇬🇺",
                    category: 8,
                    name: "flag: Guam",
                    version: "2.0"
                }, {
                    emoji: "🇬🇼",
                    category: 8,
                    name: "flag: Guinea-Bissau",
                    version: "2.0"
                }, {
                    emoji: "🇬🇾",
                    category: 8,
                    name: "flag: Guyana",
                    version: "2.0"
                }, {
                    emoji: "🇭🇰",
                    category: 8,
                    name: "flag: Hong Kong SAR China",
                    version: "2.0"
                }, {
                    emoji: "🇭🇲",
                    category: 8,
                    name: "flag: Heard & McDonald Islands",
                    version: "2.0"
                }, {
                    emoji: "🇭🇳",
                    category: 8,
                    name: "flag: Honduras",
                    version: "2.0"
                }, {
                    emoji: "🇭🇷",
                    category: 8,
                    name: "flag: Croatia",
                    version: "2.0"
                }, {
                    emoji: "🇭🇹",
                    category: 8,
                    name: "flag: Haiti",
                    version: "2.0"
                }, {
                    emoji: "🇭🇺",
                    category: 8,
                    name: "flag: Hungary",
                    version: "2.0"
                }, {
                    emoji: "🇮🇨",
                    category: 8,
                    name: "flag: Canary Islands",
                    version: "2.0"
                }, {
                    emoji: "🇮🇩",
                    category: 8,
                    name: "flag: Indonesia",
                    version: "2.0"
                }, {
                    emoji: "🇮🇪",
                    category: 8,
                    name: "flag: Ireland",
                    version: "2.0"
                }, {
                    emoji: "🇮🇱",
                    category: 8,
                    name: "flag: Israel",
                    version: "2.0"
                }, {
                    emoji: "🇮🇲",
                    category: 8,
                    name: "flag: Isle of Man",
                    version: "2.0"
                }, {
                    emoji: "🇮🇳",
                    category: 8,
                    name: "flag: India",
                    version: "2.0"
                }, {
                    emoji: "🇮🇴",
                    category: 8,
                    name: "flag: British Indian Ocean Territory",
                    version: "2.0"
                }, {
                    emoji: "🇮🇶",
                    category: 8,
                    name: "flag: Iraq",
                    version: "2.0"
                }, {
                    emoji: "🇮🇷",
                    category: 8,
                    name: "flag: Iran",
                    version: "2.0"
                }, {
                    emoji: "🇮🇸",
                    category: 8,
                    name: "flag: Iceland",
                    version: "2.0"
                }, {
                    emoji: "🇮🇹",
                    category: 8,
                    name: "flag: Italy",
                    version: "1.0"
                }, {
                    emoji: "🇯🇪",
                    category: 8,
                    name: "flag: Jersey",
                    version: "2.0"
                }, {
                    emoji: "🇯🇲",
                    category: 8,
                    name: "flag: Jamaica",
                    version: "2.0"
                }, {
                    emoji: "🇯🇴",
                    category: 8,
                    name: "flag: Jordan",
                    version: "2.0"
                }, {
                    emoji: "🇯🇵",
                    category: 8,
                    name: "flag: Japan",
                    version: "1.0"
                }, {
                    emoji: "🇰🇪",
                    category: 8,
                    name: "flag: Kenya",
                    version: "2.0"
                }, {
                    emoji: "🇰🇬",
                    category: 8,
                    name: "flag: Kyrgyzstan",
                    version: "2.0"
                }, {
                    emoji: "🇰🇭",
                    category: 8,
                    name: "flag: Cambodia",
                    version: "2.0"
                }, {
                    emoji: "🇰🇮",
                    category: 8,
                    name: "flag: Kiribati",
                    version: "2.0"
                }, {
                    emoji: "🇰🇲",
                    category: 8,
                    name: "flag: Comoros",
                    version: "2.0"
                }, {
                    emoji: "🇰🇳",
                    category: 8,
                    name: "flag: St. Kitts & Nevis",
                    version: "2.0"
                }, {
                    emoji: "🇰🇵",
                    category: 8,
                    name: "flag: North Korea",
                    version: "2.0"
                }, {
                    emoji: "🇰🇷",
                    category: 8,
                    name: "flag: South Korea",
                    version: "1.0"
                }, {
                    emoji: "🇰🇼",
                    category: 8,
                    name: "flag: Kuwait",
                    version: "2.0"
                }, {
                    emoji: "🇰🇾",
                    category: 8,
                    name: "flag: Cayman Islands",
                    version: "2.0"
                }, {
                    emoji: "🇰🇿",
                    category: 8,
                    name: "flag: Kazakhstan",
                    version: "2.0"
                }, {
                    emoji: "🇱🇦",
                    category: 8,
                    name: "flag: Laos",
                    version: "2.0"
                }, {
                    emoji: "🇱🇧",
                    category: 8,
                    name: "flag: Lebanon",
                    version: "2.0"
                }, {
                    emoji: "🇱🇨",
                    category: 8,
                    name: "flag: St. Lucia",
                    version: "2.0"
                }, {
                    emoji: "🇱🇮",
                    category: 8,
                    name: "flag: Liechtenstein",
                    version: "2.0"
                }, {
                    emoji: "🇱🇰",
                    category: 8,
                    name: "flag: Sri Lanka",
                    version: "2.0"
                }, {
                    emoji: "🇱🇷",
                    category: 8,
                    name: "flag: Liberia",
                    version: "2.0"
                }, {
                    emoji: "🇱🇸",
                    category: 8,
                    name: "flag: Lesotho",
                    version: "2.0"
                }, {
                    emoji: "🇱🇹",
                    category: 8,
                    name: "flag: Lithuania",
                    version: "2.0"
                }, {
                    emoji: "🇱🇺",
                    category: 8,
                    name: "flag: Luxembourg",
                    version: "2.0"
                }, {
                    emoji: "🇱🇻",
                    category: 8,
                    name: "flag: Latvia",
                    version: "2.0"
                }, {
                    emoji: "🇱🇾",
                    category: 8,
                    name: "flag: Libya",
                    version: "2.0"
                }, {
                    emoji: "🇲🇦",
                    category: 8,
                    name: "flag: Morocco",
                    version: "2.0"
                }, {
                    emoji: "🇲🇨",
                    category: 8,
                    name: "flag: Monaco",
                    version: "2.0"
                }, {
                    emoji: "🇲🇩",
                    category: 8,
                    name: "flag: Moldova",
                    version: "2.0"
                }, {
                    emoji: "🇲🇪",
                    category: 8,
                    name: "flag: Montenegro",
                    version: "2.0"
                }, {
                    emoji: "🇲🇫",
                    category: 8,
                    name: "flag: St. Martin",
                    version: "2.0"
                }, {
                    emoji: "🇲🇬",
                    category: 8,
                    name: "flag: Madagascar",
                    version: "2.0"
                }, {
                    emoji: "🇲🇭",
                    category: 8,
                    name: "flag: Marshall Islands",
                    version: "2.0"
                }, {
                    emoji: "🇲🇰",
                    category: 8,
                    name: "flag: North Macedonia",
                    version: "2.0"
                }, {
                    emoji: "🇲🇱",
                    category: 8,
                    name: "flag: Mali",
                    version: "2.0"
                }, {
                    emoji: "🇲🇲",
                    category: 8,
                    name: "flag: Myanmar (Burma)",
                    version: "2.0"
                }, {
                    emoji: "🇲🇳",
                    category: 8,
                    name: "flag: Mongolia",
                    version: "2.0"
                }, {
                    emoji: "🇲🇴",
                    category: 8,
                    name: "flag: Macao SAR China",
                    version: "2.0"
                }, {
                    emoji: "🇲🇵",
                    category: 8,
                    name: "flag: Northern Mariana Islands",
                    version: "2.0"
                }, {
                    emoji: "🇲🇶",
                    category: 8,
                    name: "flag: Martinique",
                    version: "2.0"
                }, {
                    emoji: "🇲🇷",
                    category: 8,
                    name: "flag: Mauritania",
                    version: "2.0"
                }, {
                    emoji: "🇲🇸",
                    category: 8,
                    name: "flag: Montserrat",
                    version: "2.0"
                }, {
                    emoji: "🇲🇹",
                    category: 8,
                    name: "flag: Malta",
                    version: "2.0"
                }, {
                    emoji: "🇲🇺",
                    category: 8,
                    name: "flag: Mauritius",
                    version: "2.0"
                }, {
                    emoji: "🇲🇻",
                    category: 8,
                    name: "flag: Maldives",
                    version: "2.0"
                }, {
                    emoji: "🇲🇼",
                    category: 8,
                    name: "flag: Malawi",
                    version: "2.0"
                }, {
                    emoji: "🇲🇽",
                    category: 8,
                    name: "flag: Mexico",
                    version: "2.0"
                }, {
                    emoji: "🇲🇾",
                    category: 8,
                    name: "flag: Malaysia",
                    version: "2.0"
                }, {
                    emoji: "🇲🇿",
                    category: 8,
                    name: "flag: Mozambique",
                    version: "2.0"
                }, {
                    emoji: "🇳🇦",
                    category: 8,
                    name: "flag: Namibia",
                    version: "2.0"
                }, {
                    emoji: "🇳🇨",
                    category: 8,
                    name: "flag: New Caledonia",
                    version: "2.0"
                }, {
                    emoji: "🇳🇪",
                    category: 8,
                    name: "flag: Niger",
                    version: "2.0"
                }, {
                    emoji: "🇳🇫",
                    category: 8,
                    name: "flag: Norfolk Island",
                    version: "2.0"
                }, {
                    emoji: "🇳🇬",
                    category: 8,
                    name: "flag: Nigeria",
                    version: "2.0"
                }, {
                    emoji: "🇳🇮",
                    category: 8,
                    name: "flag: Nicaragua",
                    version: "2.0"
                }, {
                    emoji: "🇳🇱",
                    category: 8,
                    name: "flag: Netherlands",
                    version: "2.0"
                }, {
                    emoji: "🇳🇴",
                    category: 8,
                    name: "flag: Norway",
                    version: "2.0"
                }, {
                    emoji: "🇳🇵",
                    category: 8,
                    name: "flag: Nepal",
                    version: "2.0"
                }, {
                    emoji: "🇳🇷",
                    category: 8,
                    name: "flag: Nauru",
                    version: "2.0"
                }, {
                    emoji: "🇳🇺",
                    category: 8,
                    name: "flag: Niue",
                    version: "2.0"
                }, {
                    emoji: "🇳🇿",
                    category: 8,
                    name: "flag: New Zealand",
                    version: "2.0"
                }, {
                    emoji: "🇴🇲",
                    category: 8,
                    name: "flag: Oman",
                    version: "2.0"
                }, {
                    emoji: "🇵🇦",
                    category: 8,
                    name: "flag: Panama",
                    version: "2.0"
                }, {
                    emoji: "🇵🇪",
                    category: 8,
                    name: "flag: Peru",
                    version: "2.0"
                }, {
                    emoji: "🇵🇫",
                    category: 8,
                    name: "flag: French Polynesia",
                    version: "2.0"
                }, {
                    emoji: "🇵🇬",
                    category: 8,
                    name: "flag: Papua New Guinea",
                    version: "2.0"
                }, {
                    emoji: "🇵🇭",
                    category: 8,
                    name: "flag: Philippines",
                    version: "2.0"
                }, {
                    emoji: "🇵🇰",
                    category: 8,
                    name: "flag: Pakistan",
                    version: "2.0"
                }, {
                    emoji: "🇵🇱",
                    category: 8,
                    name: "flag: Poland",
                    version: "2.0"
                }, {
                    emoji: "🇵🇲",
                    category: 8,
                    name: "flag: St. Pierre & Miquelon",
                    version: "2.0"
                }, {
                    emoji: "🇵🇳",
                    category: 8,
                    name: "flag: Pitcairn Islands",
                    version: "2.0"
                }, {
                    emoji: "🇵🇷",
                    category: 8,
                    name: "flag: Puerto Rico",
                    version: "2.0"
                }, {
                    emoji: "🇵🇸",
                    category: 8,
                    name: "flag: Palestinian Territories",
                    version: "2.0"
                }, {
                    emoji: "🇵🇹",
                    category: 8,
                    name: "flag: Portugal",
                    version: "2.0"
                }, {
                    emoji: "🇵🇼",
                    category: 8,
                    name: "flag: Palau",
                    version: "2.0"
                }, {
                    emoji: "🇵🇾",
                    category: 8,
                    name: "flag: Paraguay",
                    version: "2.0"
                }, {
                    emoji: "🇶🇦",
                    category: 8,
                    name: "flag: Qatar",
                    version: "2.0"
                }, {
                    emoji: "🇷🇪",
                    category: 8,
                    name: "flag: Réunion",
                    version: "2.0"
                }, {
                    emoji: "🇷🇴",
                    category: 8,
                    name: "flag: Romania",
                    version: "2.0"
                }, {
                    emoji: "🇷🇸",
                    category: 8,
                    name: "flag: Serbia",
                    version: "2.0"
                }, {
                    emoji: "🇷🇺",
                    category: 8,
                    name: "flag: Russia",
                    version: "1.0"
                }, {
                    emoji: "🇷🇼",
                    category: 8,
                    name: "flag: Rwanda",
                    version: "2.0"
                }, {
                    emoji: "🇸🇦",
                    category: 8,
                    name: "flag: Saudi Arabia",
                    version: "2.0"
                }, {
                    emoji: "🇸🇧",
                    category: 8,
                    name: "flag: Solomon Islands",
                    version: "2.0"
                }, {
                    emoji: "🇸🇨",
                    category: 8,
                    name: "flag: Seychelles",
                    version: "2.0"
                }, {
                    emoji: "🇸🇩",
                    category: 8,
                    name: "flag: Sudan",
                    version: "2.0"
                }, {
                    emoji: "🇸🇪",
                    category: 8,
                    name: "flag: Sweden",
                    version: "2.0"
                }, {
                    emoji: "🇸🇬",
                    category: 8,
                    name: "flag: Singapore",
                    version: "2.0"
                }, {
                    emoji: "🇸🇭",
                    category: 8,
                    name: "flag: St. Helena",
                    version: "2.0"
                }, {
                    emoji: "🇸🇮",
                    category: 8,
                    name: "flag: Slovenia",
                    version: "2.0"
                }, {
                    emoji: "🇸🇯",
                    category: 8,
                    name: "flag: Svalbard & Jan Mayen",
                    version: "2.0"
                }, {
                    emoji: "🇸🇰",
                    category: 8,
                    name: "flag: Slovakia",
                    version: "2.0"
                }, {
                    emoji: "🇸🇱",
                    category: 8,
                    name: "flag: Sierra Leone",
                    version: "2.0"
                }, {
                    emoji: "🇸🇲",
                    category: 8,
                    name: "flag: San Marino",
                    version: "2.0"
                }, {
                    emoji: "🇸🇳",
                    category: 8,
                    name: "flag: Senegal",
                    version: "2.0"
                }, {
                    emoji: "🇸🇴",
                    category: 8,
                    name: "flag: Somalia",
                    version: "2.0"
                }, {
                    emoji: "🇸🇷",
                    category: 8,
                    name: "flag: Suriname",
                    version: "2.0"
                }, {
                    emoji: "🇸🇸",
                    category: 8,
                    name: "flag: South Sudan",
                    version: "2.0"
                }, {
                    emoji: "🇸🇹",
                    category: 8,
                    name: "flag: São Tomé & Príncipe",
                    version: "2.0"
                }, {
                    emoji: "🇸🇻",
                    category: 8,
                    name: "flag: El Salvador",
                    version: "2.0"
                }, {
                    emoji: "🇸🇽",
                    category: 8,
                    name: "flag: Sint Maarten",
                    version: "2.0"
                }, {
                    emoji: "🇸🇾",
                    category: 8,
                    name: "flag: Syria",
                    version: "2.0"
                }, {
                    emoji: "🇸🇿",
                    category: 8,
                    name: "flag: Eswatini",
                    version: "2.0"
                }, {
                    emoji: "🇹🇦",
                    category: 8,
                    name: "flag: Tristan da Cunha",
                    version: "2.0"
                }, {
                    emoji: "🇹🇨",
                    category: 8,
                    name: "flag: Turks & Caicos Islands",
                    version: "2.0"
                }, {
                    emoji: "🇹🇩",
                    category: 8,
                    name: "flag: Chad",
                    version: "2.0"
                }, {
                    emoji: "🇹🇫",
                    category: 8,
                    name: "flag: French Southern Territories",
                    version: "2.0"
                }, {
                    emoji: "🇹🇬",
                    category: 8,
                    name: "flag: Togo",
                    version: "2.0"
                }, {
                    emoji: "🇹🇭",
                    category: 8,
                    name: "flag: Thailand",
                    version: "2.0"
                }, {
                    emoji: "🇹🇯",
                    category: 8,
                    name: "flag: Tajikistan",
                    version: "2.0"
                }, {
                    emoji: "🇹🇰",
                    category: 8,
                    name: "flag: Tokelau",
                    version: "2.0"
                }, {
                    emoji: "🇹🇱",
                    category: 8,
                    name: "flag: Timor-Leste",
                    version: "2.0"
                }, {
                    emoji: "🇹🇲",
                    category: 8,
                    name: "flag: Turkmenistan",
                    version: "2.0"
                }, {
                    emoji: "🇹🇳",
                    category: 8,
                    name: "flag: Tunisia",
                    version: "2.0"
                }, {
                    emoji: "🇹🇴",
                    category: 8,
                    name: "flag: Tonga",
                    version: "2.0"
                }, {
                    emoji: "🇹🇷",
                    category: 8,
                    name: "flag: Turkey",
                    version: "2.0"
                }, {
                    emoji: "🇹🇹",
                    category: 8,
                    name: "flag: Trinidad & Tobago",
                    version: "2.0"
                }, {
                    emoji: "🇹🇻",
                    category: 8,
                    name: "flag: Tuvalu",
                    version: "2.0"
                }, {
                    emoji: "🇹🇼",
                    category: 8,
                    name: "flag: Taiwan",
                    version: "2.0"
                }, {
                    emoji: "🇹🇿",
                    category: 8,
                    name: "flag: Tanzania",
                    version: "2.0"
                }, {
                    emoji: "🇺🇦",
                    category: 8,
                    name: "flag: Ukraine",
                    version: "2.0"
                }, {
                    emoji: "🇺🇬",
                    category: 8,
                    name: "flag: Uganda",
                    version: "2.0"
                }, {
                    emoji: "🇺🇲",
                    category: 8,
                    name: "flag: U.S. Outlying Islands",
                    version: "2.0"
                }, {
                    emoji: "🇺🇳",
                    category: 8,
                    name: "flag: United Nations",
                    version: "4.0"
                }, {
                    emoji: "🇺🇸",
                    category: 8,
                    name: "flag: United States",
                    version: "1.0"
                }, {
                    emoji: "🇺🇾",
                    category: 8,
                    name: "flag: Uruguay",
                    version: "2.0"
                }, {
                    emoji: "🇺🇿",
                    category: 8,
                    name: "flag: Uzbekistan",
                    version: "2.0"
                }, {
                    emoji: "🇻🇦",
                    category: 8,
                    name: "flag: Vatican City",
                    version: "2.0"
                }, {
                    emoji: "🇻🇨",
                    category: 8,
                    name: "flag: St. Vincent & Grenadines",
                    version: "2.0"
                }, {
                    emoji: "🇻🇪",
                    category: 8,
                    name: "flag: Venezuela",
                    version: "2.0"
                }, {
                    emoji: "🇻🇬",
                    category: 8,
                    name: "flag: British Virgin Islands",
                    version: "2.0"
                }, {
                    emoji: "🇻🇮",
                    category: 8,
                    name: "flag: U.S. Virgin Islands",
                    version: "2.0"
                }, {
                    emoji: "🇻🇳",
                    category: 8,
                    name: "flag: Vietnam",
                    version: "2.0"
                }, {
                    emoji: "🇻🇺",
                    category: 8,
                    name: "flag: Vanuatu",
                    version: "2.0"
                }, {
                    emoji: "🇼🇫",
                    category: 8,
                    name: "flag: Wallis & Futuna",
                    version: "2.0"
                }, {
                    emoji: "🇼🇸",
                    category: 8,
                    name: "flag: Samoa",
                    version: "2.0"
                }, {
                    emoji: "🇽🇰",
                    category: 8,
                    name: "flag: Kosovo",
                    version: "2.0"
                }, {
                    emoji: "🇾🇪",
                    category: 8,
                    name: "flag: Yemen",
                    version: "2.0"
                }, {
                    emoji: "🇾🇹",
                    category: 8,
                    name: "flag: Mayotte",
                    version: "2.0"
                }, {
                    emoji: "🇿🇦",
                    category: 8,
                    name: "flag: South Africa",
                    version: "2.0"
                }, {
                    emoji: "🇿🇲",
                    category: 8,
                    name: "flag: Zambia",
                    version: "2.0"
                }, {
                    emoji: "🇿🇼",
                    category: 8,
                    name: "flag: Zimbabwe",
                    version: "2.0"
                }, {
                    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
                    category: 8,
                    name: "flag: England",
                    version: "5.0"
                }, {
                    emoji: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
                    category: 8,
                    name: "flag: Scotland",
                    version: "5.0"
                }, {
                    emoji: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
                    category: 8,
                    name: "flag: Wales",
                    version: "5.0"
                }]
            };

        function Ee(e, o) {
            const i = document.createElement(e);
            return o && (i.className = o), i
        }

        function Ce(e) {
            for (; e.firstChild;) e.removeChild(e.firstChild)
        }
        const Se = "emoji-picker__emoji",
            Oe = {
                ext: ".svg",
                folder: "svg"
            };
        class Ie {
            constructor(e, o) {
                this.events = e, this.options = o
            }
            render() {
                const e = Ee("div", "emoji-picker__preview");
                return this.emoji = Ee("div", "emoji-picker__preview-emoji"), e.appendChild(this.emoji), this.name = Ee("div", "emoji-picker__preview-name"), e.appendChild(this.name), this.events.on("showPreview", e => this.showPreview(e)), this.events.on("hidePreview", () => this.hidePreview()), e
            }
            showPreview(e) {
                let o = e.emoji;
                e.custom ? o = `<img class="emoji-picker__custom-emoji" src="${e.emoji}">` : "twemoji" === this.options.style && (o = ke.parse(e.emoji, Oe)), this.emoji.innerHTML = o, this.name.innerHTML = e.name
            }
            hidePreview() {
                this.emoji.innerHTML = "", this.name.innerHTML = ""
            }
        }

        function Ae(e, o) {
            for (var i = 0; i < o.length; i++) {
                var n = o[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
            }
        }

        function ze(e, o, i) {
            return o in e ? Object.defineProperty(e, o, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[o] = i, e
        }

        function Me(e) {
            for (var o = 1; o < arguments.length; o++) {
                var i = null != arguments[o] ? arguments[o] : {},
                    n = Object.keys(i);
                "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter((function(e) {
                    return Object.getOwnPropertyDescriptor(i, e).enumerable
                })))), n.forEach((function(o) {
                    ze(e, o, i[o])
                }))
            }
            return e
        }

        function Pe(e, o) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, o) {
                var i = [],
                    n = !0,
                    a = !1,
                    r = void 0;
                try {
                    for (var t, s = e[Symbol.iterator](); !(n = (t = s.next()).done) && (i.push(t.value), !o || i.length !== o); n = !0);
                } catch (e) {
                    a = !0, r = e
                } finally {
                    try {
                        n || null == s.return || s.return()
                    } finally {
                        if (a) throw r
                    }
                }
                return i
            }(e, o) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }()
        }
        var Le = function() {},
            _e = {},
            Te = {},
            Ne = {
                mark: Le,
                measure: Le
            };
        try {
            "undefined" != typeof window && (_e = window), "undefined" != typeof document && (Te = document), "undefined" != typeof MutationObserver && MutationObserver, "undefined" != typeof performance && (Ne = performance)
        } catch (a) {}
        var Be = (_e.navigator || {}).userAgent,
            De = void 0 === Be ? "" : Be,
            qe = _e,
            Fe = Te,
            Re = Ne,
            Ve = (qe.document, !!Fe.documentElement && !!Fe.head && "function" == typeof Fe.addEventListener && "function" == typeof Fe.createElement),
            He = (~De.indexOf("MSIE") || De.indexOf("Trident/"), "group"),
            We = qe.FontAwesomeConfig || {};
        Fe && "function" == typeof Fe.querySelector && [
            ["data-family-prefix", "familyPrefix"],
            ["data-replacement-class", "replacementClass"],
            ["data-auto-replace-svg", "autoReplaceSvg"],
            ["data-auto-add-css", "autoAddCss"],
            ["data-auto-a11y", "autoA11y"],
            ["data-search-pseudo-elements", "searchPseudoElements"],
            ["data-observe-mutations", "observeMutations"],
            ["data-mutate-approach", "mutateApproach"],
            ["data-keep-original-source", "keepOriginalSource"],
            ["data-measure-performance", "measurePerformance"],
            ["data-show-missing-icons", "showMissingIcons"]
        ].forEach((function(e) {
            var o = Pe(e, 2),
                i = o[0],
                n = o[1],
                a = function(e) {
                    return "" === e || "false" !== e && ("true" === e || e)
                }(function(e) {
                    var o = Fe.querySelector("script[" + e + "]");
                    if (o) return o.getAttribute(e)
                }(i));
            null != a && (We[n] = a)
        }));
        var Ke = Me({}, {
            familyPrefix: "fa",
            replacementClass: "svg-inline--fa",
            autoReplaceSvg: !0,
            autoAddCss: !0,
            autoA11y: !0,
            searchPseudoElements: !1,
            observeMutations: !0,
            mutateApproach: "async",
            keepOriginalSource: !0,
            measurePerformance: !1,
            showMissingIcons: !0
        }, We);
        Ke.autoReplaceSvg || (Ke.observeMutations = !1);
        var Je = Me({}, Ke);
        qe.FontAwesomeConfig = Je;
        var Ue = qe || {};
        Ue.___FONT_AWESOME___ || (Ue.___FONT_AWESOME___ = {}), Ue.___FONT_AWESOME___.styles || (Ue.___FONT_AWESOME___.styles = {}), Ue.___FONT_AWESOME___.hooks || (Ue.___FONT_AWESOME___.hooks = {}), Ue.___FONT_AWESOME___.shims || (Ue.___FONT_AWESOME___.shims = []);
        var Ge = Ue.___FONT_AWESOME___,
            Xe = [];
        Ve && ((Fe.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Fe.readyState) || Fe.addEventListener("DOMContentLoaded", (function e() {
            Fe.removeEventListener("DOMContentLoaded", e), Xe.map((function(e) {
                return e()
            }))
        }))), void 0 !== e && void 0 !== e.process && e.process.emit, void 0 === n && setTimeout;
        var $e = {
            size: 16,
            x: 0,
            y: 0,
            rotate: 0,
            flipX: !1,
            flipY: !1
        };

        function Ye() {
            for (var e = 12, o = ""; e-- > 0;) o += "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" [62 * Math.random() | 0];
            return o
        }

        function Ze(e) {
            return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }

        function Qe(e) {
            return Object.keys(e || {}).reduce((function(o, i) {
                return o + "".concat(i, ": ").concat(e[i], ";")
            }), "")
        }

        function eo(e) {
            return e.size !== $e.size || e.x !== $e.x || e.y !== $e.y || e.rotate !== $e.rotate || e.flipX || e.flipY
        }

        function oo(e) {
            var o = e.transform,
                i = e.containerWidth,
                n = e.iconWidth,
                a = {
                    transform: "translate(".concat(i / 2, " 256)")
                },
                r = "translate(".concat(32 * o.x, ", ").concat(32 * o.y, ") "),
                t = "scale(".concat(o.size / 16 * (o.flipX ? -1 : 1), ", ").concat(o.size / 16 * (o.flipY ? -1 : 1), ") "),
                s = "rotate(".concat(o.rotate, " 0 0)");
            return {
                outer: a,
                inner: {
                    transform: "".concat(r, " ").concat(t, " ").concat(s)
                },
                path: {
                    transform: "translate(".concat(n / 2 * -1, " -256)")
                }
            }
        }
        var io = {
            x: 0,
            y: 0,
            width: "100%",
            height: "100%"
        };

        function no(e) {
            var o = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
            return e.attributes && (e.attributes.fill || o) && (e.attributes.fill = "black"), e
        }

        function ao(e) {
            var o = e.icons,
                i = o.main,
                n = o.mask,
                a = e.prefix,
                r = e.iconName,
                t = e.transform,
                s = e.symbol,
                m = e.title,
                c = e.maskId,
                d = e.titleId,
                u = e.extra,
                g = e.watchable,
                l = void 0 !== g && g,
                v = n.found ? n : i,
                f = v.width,
                y = v.height,
                h = "fa-w-".concat(Math.ceil(f / y * 16)),
                j = [Je.replacementClass, r ? "".concat(Je.familyPrefix, "-").concat(r) : "", h].filter((function(e) {
                    return -1 === u.classes.indexOf(e)
                })).concat(u.classes).join(" "),
                p = {
                    children: [],
                    attributes: Me({}, u.attributes, {
                        "data-prefix": a,
                        "data-icon": r,
                        class: j,
                        role: u.attributes.role || "img",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 ".concat(f, " ").concat(y)
                    })
                };
            l && (p.attributes["data-fa-i2svg"] = ""), m && p.children.push({
                tag: "title",
                attributes: {
                    id: p.attributes["aria-labelledby"] || "title-".concat(d || Ye())
                },
                children: [m]
            });
            var b = Me({}, p, {
                    prefix: a,
                    iconName: r,
                    main: i,
                    mask: n,
                    maskId: c,
                    transform: t,
                    symbol: s,
                    styles: u.styles
                }),
                w = n.found && i.found ? function(e) {
                    var o, i = e.children,
                        n = e.attributes,
                        a = e.main,
                        r = e.mask,
                        t = e.maskId,
                        s = e.transform,
                        m = a.width,
                        c = a.icon,
                        d = r.width,
                        u = r.icon,
                        g = oo({
                            transform: s,
                            containerWidth: d,
                            iconWidth: m
                        }),
                        l = {
                            tag: "rect",
                            attributes: Me({}, io, {
                                fill: "white"
                            })
                        },
                        v = c.children ? {
                            children: c.children.map(no)
                        } : {},
                        f = {
                            tag: "g",
                            attributes: Me({}, g.inner),
                            children: [no(Me({
                                tag: c.tag,
                                attributes: Me({}, c.attributes, g.path)
                            }, v))]
                        },
                        y = {
                            tag: "g",
                            attributes: Me({}, g.outer),
                            children: [f]
                        },
                        h = "mask-".concat(t || Ye()),
                        j = "clip-".concat(t || Ye()),
                        p = {
                            tag: "mask",
                            attributes: Me({}, io, {
                                id: h,
                                maskUnits: "userSpaceOnUse",
                                maskContentUnits: "userSpaceOnUse"
                            }),
                            children: [l, y]
                        },
                        b = {
                            tag: "defs",
                            children: [{
                                tag: "clipPath",
                                attributes: {
                                    id: j
                                },
                                children: (o = u, "g" === o.tag ? o.children : [o])
                            }, p]
                        };
                    return i.push(b, {
                        tag: "rect",
                        attributes: Me({
                            fill: "currentColor",
                            "clip-path": "url(#".concat(j, ")"),
                            mask: "url(#".concat(h, ")")
                        }, io)
                    }), {
                        children: i,
                        attributes: n
                    }
                }(b) : function(e) {
                    var o = e.children,
                        i = e.attributes,
                        n = e.main,
                        a = e.transform,
                        r = Qe(e.styles);
                    if (r.length > 0 && (i.style = r), eo(a)) {
                        var t = oo({
                            transform: a,
                            containerWidth: n.width,
                            iconWidth: n.width
                        });
                        o.push({
                            tag: "g",
                            attributes: Me({}, t.outer),
                            children: [{
                                tag: "g",
                                attributes: Me({}, t.inner),
                                children: [{
                                    tag: n.icon.tag,
                                    children: n.icon.children,
                                    attributes: Me({}, n.icon.attributes, t.path)
                                }]
                            }]
                        })
                    } else o.push(n.icon);
                    return {
                        children: o,
                        attributes: i
                    }
                }(b),
                k = w.children,
                x = w.attributes;
            return b.children = k, b.attributes = x, s ? function(e) {
                var o = e.prefix,
                    i = e.iconName,
                    n = e.children,
                    a = e.attributes,
                    r = e.symbol;
                return [{
                    tag: "svg",
                    attributes: {
                        style: "display: none;"
                    },
                    children: [{
                        tag: "symbol",
                        attributes: Me({}, a, {
                            id: !0 === r ? "".concat(o, "-").concat(Je.familyPrefix, "-").concat(i) : r
                        }),
                        children: n
                    }]
                }]
            }(b) : function(e) {
                var o = e.children,
                    i = e.main,
                    n = e.mask,
                    a = e.attributes,
                    r = e.styles,
                    t = e.transform;
                if (eo(t) && i.found && !n.found) {
                    var s = {
                        x: i.width / i.height / 2,
                        y: .5
                    };
                    a.style = Qe(Me({}, r, {
                        "transform-origin": "".concat(s.x + t.x / 16, "em ").concat(s.y + t.y / 16, "em")
                    }))
                }
                return [{
                    tag: "svg",
                    attributes: a,
                    children: o
                }]
            }(b)
        }
        var ro = (Je.measurePerformance && Re && Re.mark && Re.measure, function(e, o, i, n) {
            var a, r, t, s = Object.keys(e),
                m = s.length,
                c = void 0 !== n ? function(e, o) {
                    return function(i, n, a, r) {
                        return e.call(o, i, n, a, r)
                    }
                }(o, n) : o;
            for (void 0 === i ? (a = 1, t = e[s[0]]) : (a = 0, t = i); a < m; a++) t = c(t, e[r = s[a]], r, e);
            return t
        });

        function to(e, o) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                n = i.skipHooks,
                a = void 0 !== n && n,
                r = Object.keys(o).reduce((function(e, i) {
                    var n = o[i];
                    return n.icon ? e[n.iconName] = n.icon : e[i] = n, e
                }), {});
            "function" != typeof Ge.hooks.addPack || a ? Ge.styles[e] = Me({}, Ge.styles[e] || {}, r) : Ge.hooks.addPack(e, r), "fas" === e && to("fa", o)
        }
        var so = Ge.styles,
            mo = Ge.shims,
            co = function() {
                var e = function(e) {
                    return ro(so, (function(o, i, n) {
                        return o[n] = ro(i, e, {}), o
                    }), {})
                };
                e((function(e, o, i) {
                    return o[3] && (e[o[3]] = i), e
                })), e((function(e, o, i) {
                    var n = o[2];
                    return e[i] = i, n.forEach((function(o) {
                        e[o] = i
                    })), e
                }));
                var o = "far" in so;
                ro(mo, (function(e, i) {
                    var n = i[0],
                        a = i[1],
                        r = i[2];
                    return "far" !== a || o || (a = "fas"), e[n] = {
                        prefix: a,
                        iconName: r
                    }, e
                }), {})
            };

        function uo(e, o, i) {
            if (e && e[o] && e[o][i]) return {
                prefix: o,
                iconName: i,
                icon: e[o][i]
            }
        }

        function go(e) {
            var o = e.tag,
                i = e.attributes,
                n = void 0 === i ? {} : i,
                a = e.children,
                r = void 0 === a ? [] : a;
            return "string" == typeof e ? Ze(e) : "<".concat(o, " ").concat(function(e) {
                return Object.keys(e || {}).reduce((function(o, i) {
                    return o + "".concat(i, '="').concat(Ze(e[i]), '" ')
                }), "").trim()
            }(n), ">").concat(r.map(go).join(""), "</").concat(o, ">")
        }

        function lo(e) {
            this.name = "MissingIcon", this.message = e || "Icon unavailable", this.stack = (new Error).stack
        }
        co(), Ge.styles, lo.prototype = Object.create(Error.prototype), lo.prototype.constructor = lo;
        var vo = {
                fill: "currentColor"
            },
            fo = {
                attributeType: "XML",
                repeatCount: "indefinite",
                dur: "2s"
            },
            yo = (Me({}, vo, {
                d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
            }), Me({}, fo, {
                attributeName: "opacity"
            }));

        function ho(e) {
            var o = e[0],
                i = e[1],
                n = Pe(e.slice(4), 1)[0];
            return {
                found: !0,
                width: o,
                height: i,
                icon: Array.isArray(n) ? {
                    tag: "g",
                    attributes: {
                        class: "".concat(Je.familyPrefix, "-").concat(He)
                    },
                    children: [{
                        tag: "path",
                        attributes: {
                            class: "".concat(Je.familyPrefix, "-").concat("secondary"),
                            fill: "currentColor",
                            d: n[0]
                        }
                    }, {
                        tag: "path",
                        attributes: {
                            class: "".concat(Je.familyPrefix, "-").concat("primary"),
                            fill: "currentColor",
                            d: n[1]
                        }
                    }]
                } : {
                    tag: "path",
                    attributes: {
                        fill: "currentColor",
                        d: n
                    }
                }
            }
        }

        function jo() {
            Je.autoAddCss && !xo && (function(e) {
                if (e && Ve) {
                    var o = Fe.createElement("style");
                    o.setAttribute("type", "text/css"), o.innerHTML = e;
                    for (var i = Fe.head.childNodes, n = null, a = i.length - 1; a > -1; a--) {
                        var r = i[a],
                            t = (r.tagName || "").toUpperCase();
                        ["STYLE", "LINK"].indexOf(t) > -1 && (n = r)
                    }
                    Fe.head.insertBefore(o, n)
                }
            }(function() {
                var e = "svg-inline--fa",
                    o = Je.familyPrefix,
                    i = Je.replacementClass,
                    n = 'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
                if ("fa" !== o || i !== e) {
                    var a = new RegExp("\\.".concat("fa", "\\-"), "g"),
                        r = new RegExp("\\--".concat("fa", "\\-"), "g"),
                        t = new RegExp("\\.".concat(e), "g");
                    n = n.replace(a, ".".concat(o, "-")).replace(r, "--".concat(o, "-")).replace(t, ".".concat(i))
                }
                return n
            }()), xo = !0)
        }

        function po(e, o) {
            return Object.defineProperty(e, "abstract", {
                get: o
            }), Object.defineProperty(e, "html", {
                get: function() {
                    return e.abstract.map((function(e) {
                        return go(e)
                    }))
                }
            }), Object.defineProperty(e, "node", {
                get: function() {
                    if (Ve) {
                        var o = Fe.createElement("div");
                        return o.innerHTML = e.html, o.children
                    }
                }
            }), e
        }

        function bo(e) {
            var o = e.prefix,
                i = void 0 === o ? "fa" : o,
                n = e.iconName;
            if (n) return uo(ko.definitions, i, n) || uo(Ge.styles, i, n)
        }
        Me({}, vo, {
            cx: "256",
            cy: "364",
            r: "28"
        }), Me({}, fo, {
            attributeName: "r",
            values: "28;14;28;28;14;28;"
        }), Me({}, yo, {
            values: "1;0;1;1;0;1;"
        }), Me({}, vo, {
            opacity: "1",
            d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }), Me({}, yo, {
            values: "1;0;0;0;0;1;"
        }), Me({}, vo, {
            opacity: "0",
            d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }), Me({}, yo, {
            values: "0;0;1;1;0;0;"
        }), Ge.styles, Ge.styles;
        var wo, ko = new(function() {
                function e() {
                    ! function(e, o) {
                        if (!(e instanceof o)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this.definitions = {}
                }
                var o, i;
                return o = e, (i = [{
                    key: "add",
                    value: function() {
                        for (var e = this, o = arguments.length, i = new Array(o), n = 0; n < o; n++) i[n] = arguments[n];
                        var a = i.reduce(this._pullDefinitions, {});
                        Object.keys(a).forEach((function(o) {
                            e.definitions[o] = Me({}, e.definitions[o] || {}, a[o]), to(o, a[o]), co()
                        }))
                    }
                }, {
                    key: "reset",
                    value: function() {
                        this.definitions = {}
                    }
                }, {
                    key: "_pullDefinitions",
                    value: function(e, o) {
                        var i = o.prefix && o.iconName && o.icon ? {
                            0: o
                        } : o;
                        return Object.keys(i).map((function(o) {
                            var n = i[o],
                                a = n.prefix,
                                r = n.iconName,
                                t = n.icon;
                            e[a] || (e[a] = {}), e[a][r] = t
                        })), e
                    }
                }]) && Ae(o.prototype, i), e
            }()),
            xo = !1,
            Eo = (wo = function(e) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = o.transform,
                    n = void 0 === i ? $e : i,
                    a = o.symbol,
                    r = void 0 !== a && a,
                    t = o.mask,
                    s = void 0 === t ? null : t,
                    m = o.maskId,
                    c = void 0 === m ? null : m,
                    d = o.title,
                    u = void 0 === d ? null : d,
                    g = o.titleId,
                    l = void 0 === g ? null : g,
                    v = o.classes,
                    f = void 0 === v ? [] : v,
                    y = o.attributes,
                    h = void 0 === y ? {} : y,
                    j = o.styles,
                    p = void 0 === j ? {} : j;
                if (e) {
                    var b = e.prefix,
                        w = e.iconName,
                        k = e.icon;
                    return po(Me({
                        type: "icon"
                    }, e), (function() {
                        return jo(), Je.autoA11y && (u ? h["aria-labelledby"] = "".concat(Je.replacementClass, "-title-").concat(l || Ye()) : (h["aria-hidden"] = "true", h.focusable = "false")), ao({
                            icons: {
                                main: ho(k),
                                mask: s ? ho(s.icon) : {
                                    found: !1,
                                    width: null,
                                    height: null,
                                    icon: {}
                                }
                            },
                            prefix: b,
                            iconName: w,
                            transform: Me({}, $e, n),
                            symbol: r,
                            title: u,
                            maskId: c,
                            titleId: l,
                            extra: {
                                attributes: h,
                                styles: p,
                                classes: f
                            }
                        })
                    }))
                }
            }, function(e) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                    i = (e || {}).icon ? e : bo(e || {}),
                    n = o.mask;
                return n && (n = (n || {}).icon ? n : bo(n || {})), wo(i, Me({}, o, {
                    mask: n
                }))
            });
        ko.add({
            prefix: "far",
            iconName: "building",
            icon: [448, 512, [], "f1ad", "M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"]
        }, {
            prefix: "fas",
            iconName: "cat",
            icon: [512, 512, [], "f6be", "M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"]
        }, {
            prefix: "fas",
            iconName: "coffee",
            icon: [640, 512, [], "f0f4", "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"]
        }, {
            prefix: "far",
            iconName: "flag",
            icon: [512, 512, [], "f024", "M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z"]
        }, {
            prefix: "far",
            iconName: "frown",
            icon: [496, 512, [], "f119", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"]
        }, {
            prefix: "fas",
            iconName: "futbol",
            icon: [512, 512, [], "f1e3", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"]
        }, {
            prefix: "fas",
            iconName: "history",
            icon: [512, 512, [], "f1da", "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"]
        }, {
            prefix: "fas",
            iconName: "icons",
            icon: [512, 512, [], "f86d", "M116.65 219.35a15.68 15.68 0 0 0 22.65 0l96.75-99.83c28.15-29 26.5-77.1-4.91-103.88C203.75-7.7 163-3.5 137.86 22.44L128 32.58l-9.85-10.14C93.05-3.5 52.25-7.7 24.86 15.64c-31.41 26.78-33 74.85-5 103.88zm143.92 100.49h-48l-7.08-14.24a27.39 27.39 0 0 0-25.66-17.78h-71.71a27.39 27.39 0 0 0-25.66 17.78l-7 14.24h-48A27.45 27.45 0 0 0 0 347.3v137.25A27.44 27.44 0 0 0 27.43 512h233.14A27.45 27.45 0 0 0 288 484.55V347.3a27.45 27.45 0 0 0-27.43-27.46zM144 468a52 52 0 1 1 52-52 52 52 0 0 1-52 52zm355.4-115.9h-60.58l22.36-50.75c2.1-6.65-3.93-13.21-12.18-13.21h-75.59c-6.3 0-11.66 3.9-12.5 9.1l-16.8 106.93c-1 6.3 4.88 11.89 12.5 11.89h62.31l-24.2 83c-1.89 6.65 4.2 12.9 12.23 12.9a13.26 13.26 0 0 0 10.92-5.25l92.4-138.91c4.88-6.91-1.16-15.7-10.87-15.7zM478.08.33L329.51 23.17C314.87 25.42 304 38.92 304 54.83V161.6a83.25 83.25 0 0 0-16-1.7c-35.35 0-64 21.48-64 48s28.65 48 64 48c35.2 0 63.73-21.32 64-47.66V99.66l112-17.22v47.18a83.25 83.25 0 0 0-16-1.7c-35.35 0-64 21.48-64 48s28.65 48 64 48c35.2 0 63.73-21.32 64-47.66V32c0-19.48-16-34.42-33.92-31.67z"]
        }, {
            prefix: "far",
            iconName: "lightbulb",
            icon: [352, 512, [], "f0eb", "M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"]
        }, {
            prefix: "fas",
            iconName: "music",
            icon: [512, 512, [], "f001", "M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"]
        }, {
            prefix: "fas",
            iconName: "search",
            icon: [512, 512, [], "f002", "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"]
        }, {
            prefix: "far",
            iconName: "smile",
            icon: [496, 512, [], "f118", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"]
        }, {
            prefix: "fas",
            iconName: "times",
            icon: [352, 512, [], "f00d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"]
        }, {
            prefix: "fas",
            iconName: "user",
            icon: [448, 512, [], "f007", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"]
        });
        const Co = Eo({
                prefix: "far",
                iconName: "building"
            }).html[0],
            So = Eo({
                prefix: "fas",
                iconName: "cat"
            }).html[0],
            Oo = Eo({
                prefix: "fas",
                iconName: "coffee"
            }).html[0],
            Io = Eo({
                prefix: "far",
                iconName: "flag"
            }).html[0],
            Ao = Eo({
                prefix: "fas",
                iconName: "futbol"
            }).html[0],
            zo = Eo({
                prefix: "far",
                iconName: "frown"
            }).html[0],
            Mo = Eo({
                prefix: "fas",
                iconName: "history"
            }).html[0],
            Po = Eo({
                prefix: "fas",
                iconName: "icons"
            }).html[0],
            Lo = Eo({
                prefix: "far",
                iconName: "lightbulb"
            }).html[0],
            _o = Eo({
                prefix: "fas",
                iconName: "music"
            }).html[0],
            To = Eo({
                prefix: "fas",
                iconName: "search"
            }).html[0],
            No = Eo({
                prefix: "far",
                iconName: "smile"
            }).html[0],
            Bo = Eo({
                prefix: "fas",
                iconName: "times"
            }).html[0],
            Do = Eo({
                prefix: "fas",
                iconName: "user"
            }).html[0];

        function qo(e) {
            const o = document.createElement("img");
            return o.src = e, o
        }

        function Fo() {
            const e = localStorage.getItem("emojiPicker.recent");
            return (e ? JSON.parse(e) : []).filter(e => !!e.emoji)
        }
        class Ro {
            constructor(e, o, i, n, a, r = !0) {
                this.emoji = e, this.showVariants = o, this.showPreview = i, this.events = n, this.options = a, this.lazy = r
            }
            render() {
                this.emojiButton = Ee("button", Se);
                let e = this.emoji.emoji;
                return this.emoji.custom ? e = this.lazy ? No : `<img class="emoji-picker__custom-emoji" src="${this.emoji.emoji}">` : "twemoji" === this.options.style && (e = this.lazy ? No : ke.parse(this.emoji.emoji)), this.emojiButton.innerHTML = e, this.emojiButton.tabIndex = -1, this.emojiButton.dataset.emoji = this.emoji.emoji, this.emoji.custom && (this.emojiButton.dataset.custom = "true"), this.emojiButton.title = this.emoji.name, this.emojiButton.addEventListener("focus", () => this.onEmojiHover()), this.emojiButton.addEventListener("blur", () => this.onEmojiLeave()), this.emojiButton.addEventListener("click", () => this.onEmojiClick()), this.emojiButton.addEventListener("mouseover", () => this.onEmojiHover()), this.emojiButton.addEventListener("mouseout", () => this.onEmojiLeave()), "twemoji" === this.options.style && this.lazy && (this.emojiButton.style.opacity = "0.25"), this.emojiButton
            }
            onEmojiClick() {
                this.emoji.variations && this.showVariants && this.options.showVariants || !this.options.showRecents || function(e, o) {
                    const i = Fo(),
                        n = {
                            emoji: e.emoji,
                            name: e.name,
                            key: e.key || e.name,
                            custom: e.custom
                        };
                    localStorage.setItem("emojiPicker.recent", JSON.stringify([n, ...i.filter(e => !!e.emoji && e.key !== n.key)].slice(0, o.recentsCount)))
                }(this.emoji, this.options), this.events.emit("emoji", {
                    emoji: this.emoji,
                    showVariants: this.showVariants,
                    button: this.emojiButton
                })
            }
            onEmojiHover() {
                this.showPreview && this.events.emit("showPreview", this.emoji)
            }
            onEmojiLeave() {
                this.showPreview && this.events.emit("hidePreview")
            }
        }
        class Vo {
            constructor(e, o, i, n, a = !0) {
                this.showVariants = o, this.events = i, this.options = n, this.lazy = a, this.emojis = e.filter(e => !e.version || parseFloat(e.version) <= parseFloat(n.emojiVersion))
            }
            render() {
                const e = Ee("div", "emoji-picker__container");
                return this.emojis.forEach(o => e.appendChild(new Ro(o, this.showVariants, !0, this.events, this.options, this.lazy).render())), e
            }
        }
        var Ho = function(e, o) {
            return function(e) {
                var o, i;
                o = pe, i = function() {
                    var e = "undefined" == typeof window,
                        o = new Map,
                        i = new Map,
                        a = [];
                    a.total = 0;
                    var r = [],
                        t = [];

                    function s() {
                        o.clear(), i.clear(), r = [], t = []
                    }

                    function m(e) {
                        for (var o = -9007199254740991, i = e.length - 1; i >= 0; --i) {
                            var n = e[i];
                            if (null !== n) {
                                var a = n.score;
                                a > o && (o = a)
                            }
                        }
                        return -9007199254740991 === o ? null : o
                    }

                    function c(e, o) {
                        var i = e[o];
                        if (void 0 !== i) return i;
                        var n = o;
                        Array.isArray(o) || (n = o.split("."));
                        for (var a = n.length, r = -1; e && ++r < a;) e = e[n[r]];
                        return e
                    }

                    function d(e) {
                        return "object" == typeof e
                    }
                    var u = function() {
                            var e = [],
                                o = 0,
                                i = {};

                            function n() {
                                for (var i = 0, n = e[i], a = 1; a < o;) {
                                    var r = a + 1;
                                    i = a, r < o && e[r].score < e[a].score && (i = r), e[i - 1 >> 1] = e[i], a = 1 + (i << 1)
                                }
                                for (var t = i - 1 >> 1; i > 0 && n.score < e[t].score; t = (i = t) - 1 >> 1) e[i] = e[t];
                                e[i] = n
                            }
                            return i.add = function(i) {
                                var n = o;
                                e[o++] = i;
                                for (var a = n - 1 >> 1; n > 0 && i.score < e[a].score; a = (n = a) - 1 >> 1) e[n] = e[a];
                                e[n] = i
                            }, i.poll = function() {
                                if (0 !== o) {
                                    var i = e[0];
                                    return e[0] = e[--o], n(), i
                                }
                            }, i.peek = function(i) {
                                if (0 !== o) return e[0]
                            }, i.replaceTop = function(o) {
                                e[0] = o, n()
                            }, i
                        },
                        g = u();
                    return function l(v) {
                        var f = {
                            single: function(e, o, i) {
                                return e ? (d(e) || (e = f.getPreparedSearch(e)), o ? (d(o) || (o = f.getPrepared(o)), ((i && void 0 !== i.allowTypo ? i.allowTypo : !v || void 0 === v.allowTypo || v.allowTypo) ? f.algorithm : f.algorithmNoTypo)(e, o, e[0])) : null) : null
                            },
                            go: function(e, o, i) {
                                if (!e) return a;
                                var n = (e = f.prepareSearch(e))[0],
                                    r = i && i.threshold || v && v.threshold || -9007199254740991,
                                    t = i && i.limit || v && v.limit || 9007199254740991,
                                    s = (i && void 0 !== i.allowTypo ? i.allowTypo : !v || void 0 === v.allowTypo || v.allowTypo) ? f.algorithm : f.algorithmNoTypo,
                                    u = 0,
                                    l = 0,
                                    y = o.length;
                                if (i && i.keys)
                                    for (var h = i.scoreFn || m, j = i.keys, p = j.length, b = y - 1; b >= 0; --b) {
                                        for (var w = o[b], k = new Array(p), x = p - 1; x >= 0; --x)(S = c(w, C = j[x])) ? (d(S) || (S = f.getPrepared(S)), k[x] = s(e, S, n)) : k[x] = null;
                                        k.obj = w;
                                        var E = h(k);
                                        null !== E && (E < r || (k.score = E, u < t ? (g.add(k), ++u) : (++l, E > g.peek().score && g.replaceTop(k))))
                                    } else if (i && i.key) {
                                        var C = i.key;
                                        for (b = y - 1; b >= 0; --b)(S = c(w = o[b], C)) && (d(S) || (S = f.getPrepared(S)), null !== (O = s(e, S, n)) && (O.score < r || (O = {
                                            target: O.target,
                                            _targetLowerCodes: null,
                                            _nextBeginningIndexes: null,
                                            score: O.score,
                                            indexes: O.indexes,
                                            obj: w
                                        }, u < t ? (g.add(O), ++u) : (++l, O.score > g.peek().score && g.replaceTop(O)))))
                                    } else
                                        for (b = y - 1; b >= 0; --b) {
                                            var S, O;
                                            (S = o[b]) && (d(S) || (S = f.getPrepared(S)), null !== (O = s(e, S, n)) && (O.score < r || (u < t ? (g.add(O), ++u) : (++l, O.score > g.peek().score && g.replaceTop(O)))))
                                        }
                                if (0 === u) return a;
                                var I = new Array(u);
                                for (b = u - 1; b >= 0; --b) I[b] = g.poll();
                                return I.total = u + l, I
                            },
                            goAsync: function(o, i, r) {
                                var t = !1,
                                    s = new Promise((function(s, g) {
                                        if (!o) return s(a);
                                        var l = (o = f.prepareSearch(o))[0],
                                            y = u(),
                                            h = i.length - 1,
                                            j = r && r.threshold || v && v.threshold || -9007199254740991,
                                            p = r && r.limit || v && v.limit || 9007199254740991,
                                            b = (r && void 0 !== r.allowTypo ? r.allowTypo : !v || void 0 === v.allowTypo || v.allowTypo) ? f.algorithm : f.algorithmNoTypo,
                                            w = 0,
                                            k = 0;

                                        function x() {
                                            if (t) return g("canceled");
                                            var u = Date.now();
                                            if (r && r.keys)
                                                for (var v = r.scoreFn || m, E = r.keys, C = E.length; h >= 0; --h) {
                                                    for (var S = i[h], O = new Array(C), I = C - 1; I >= 0; --I)(M = c(S, z = E[I])) ? (d(M) || (M = f.getPrepared(M)), O[I] = b(o, M, l)) : O[I] = null;
                                                    O.obj = S;
                                                    var A = v(O);
                                                    if (null !== A && !(A < j) && (O.score = A, w < p ? (y.add(O), ++w) : (++k, A > y.peek().score && y.replaceTop(O)), h % 1e3 == 0 && Date.now() - u >= 10)) return void(e ? n(x) : setTimeout(x))
                                                } else if (r && r.key) {
                                                    for (var z = r.key; h >= 0; --h)
                                                        if ((M = c(S = i[h], z)) && (d(M) || (M = f.getPrepared(M)), null !== (P = b(o, M, l)) && !(P.score < j) && (P = {
                                                                target: P.target,
                                                                _targetLowerCodes: null,
                                                                _nextBeginningIndexes: null,
                                                                score: P.score,
                                                                indexes: P.indexes,
                                                                obj: S
                                                            }, w < p ? (y.add(P), ++w) : (++k, P.score > y.peek().score && y.replaceTop(P)), h % 1e3 == 0 && Date.now() - u >= 10))) return void(e ? n(x) : setTimeout(x))
                                                } else
                                                    for (; h >= 0; --h) {
                                                        var M, P;
                                                        if ((M = i[h]) && (d(M) || (M = f.getPrepared(M)), null !== (P = b(o, M, l)) && !(P.score < j) && (w < p ? (y.add(P), ++w) : (++k, P.score > y.peek().score && y.replaceTop(P)), h % 1e3 == 0 && Date.now() - u >= 10))) return void(e ? n(x) : setTimeout(x))
                                                    }
                                            if (0 === w) return s(a);
                                            for (var L = new Array(w), _ = w - 1; _ >= 0; --_) L[_] = y.poll();
                                            L.total = w + k, s(L)
                                        }
                                        e ? n(x) : x()
                                    }));
                                return s.cancel = function() {
                                    t = !0
                                }, s
                            },
                            highlight: function(e, o, i) {
                                if (null === e) return null;
                                void 0 === o && (o = "<b>"), void 0 === i && (i = "</b>");
                                for (var n = "", a = 0, r = !1, t = e.target, s = t.length, m = e.indexes, c = 0; c < s; ++c) {
                                    var d = t[c];
                                    if (m[a] === c) {
                                        if (r || (r = !0, n += o), ++a === m.length) {
                                            n += d + i + t.substr(c + 1);
                                            break
                                        }
                                    } else r && (r = !1, n += i);
                                    n += d
                                }
                                return n
                            },
                            prepare: function(e) {
                                if (e) return {
                                    target: e,
                                    _targetLowerCodes: f.prepareLowerCodes(e),
                                    _nextBeginningIndexes: null,
                                    score: null,
                                    indexes: null,
                                    obj: null
                                }
                            },
                            prepareSlow: function(e) {
                                if (e) return {
                                    target: e,
                                    _targetLowerCodes: f.prepareLowerCodes(e),
                                    _nextBeginningIndexes: f.prepareNextBeginningIndexes(e),
                                    score: null,
                                    indexes: null,
                                    obj: null
                                }
                            },
                            prepareSearch: function(e) {
                                if (e) return f.prepareLowerCodes(e)
                            },
                            getPrepared: function(e) {
                                if (e.length > 999) return f.prepare(e);
                                var i = o.get(e);
                                return void 0 !== i || (i = f.prepare(e), o.set(e, i)), i
                            },
                            getPreparedSearch: function(e) {
                                if (e.length > 999) return f.prepareSearch(e);
                                var o = i.get(e);
                                return void 0 !== o || (o = f.prepareSearch(e), i.set(e, o)), o
                            },
                            algorithm: function(e, o, i) {
                                for (var n = o._targetLowerCodes, a = e.length, s = n.length, m = 0, c = 0, d = 0, u = 0;;) {
                                    if (i === n[c]) {
                                        if (r[u++] = c, ++m === a) break;
                                        i = e[0 === d ? m : d === m ? m + 1 : d === m - 1 ? m - 1 : m]
                                    }
                                    if (++c >= s)
                                        for (;;) {
                                            if (m <= 1) return null;
                                            if (0 === d) {
                                                if (i === e[--m]) continue;
                                                d = m
                                            } else {
                                                if (1 === d) return null;
                                                if ((i = e[1 + (m = --d)]) === e[m]) continue
                                            }
                                            c = r[(u = m) - 1] + 1;
                                            break
                                        }
                                }
                                m = 0;
                                var g = 0,
                                    l = !1,
                                    v = 0,
                                    y = o._nextBeginningIndexes;
                                null === y && (y = o._nextBeginningIndexes = f.prepareNextBeginningIndexes(o.target));
                                var h = c = 0 === r[0] ? 0 : y[r[0] - 1];
                                if (c !== s)
                                    for (;;)
                                        if (c >= s) {
                                            if (m <= 0) {
                                                if (++g > a - 2) break;
                                                if (e[g] === e[g + 1]) continue;
                                                c = h;
                                                continue
                                            }--m, c = y[t[--v]]
                                        } else if (e[0 === g ? m : g === m ? m + 1 : g === m - 1 ? m - 1 : m] === n[c]) {
                                    if (t[v++] = c, ++m === a) {
                                        l = !0;
                                        break
                                    }++c
                                } else c = y[c];
                                if (l) var j = t,
                                    p = v;
                                else j = r, p = u;
                                for (var b = 0, w = -1, k = 0; k < a; ++k) w !== (c = j[k]) - 1 && (b -= c), w = c;
                                for (l ? 0 !== g && (b += -20) : (b *= 1e3, 0 !== d && (b += -20)), b -= s - a, o.score = b, o.indexes = new Array(p), k = p - 1; k >= 0; --k) o.indexes[k] = j[k];
                                return o
                            },
                            algorithmNoTypo: function(e, o, i) {
                                for (var n = o._targetLowerCodes, a = e.length, s = n.length, m = 0, c = 0, d = 0;;) {
                                    if (i === n[c]) {
                                        if (r[d++] = c, ++m === a) break;
                                        i = e[m]
                                    }
                                    if (++c >= s) return null
                                }
                                m = 0;
                                var u = !1,
                                    g = 0,
                                    l = o._nextBeginningIndexes;
                                if (null === l && (l = o._nextBeginningIndexes = f.prepareNextBeginningIndexes(o.target)), (c = 0 === r[0] ? 0 : l[r[0] - 1]) !== s)
                                    for (;;)
                                        if (c >= s) {
                                            if (m <= 0) break;
                                            --m, c = l[t[--g]]
                                        } else if (e[m] === n[c]) {
                                    if (t[g++] = c, ++m === a) {
                                        u = !0;
                                        break
                                    }++c
                                } else c = l[c];
                                if (u) var v = t,
                                    y = g;
                                else v = r, y = d;
                                for (var h = 0, j = -1, p = 0; p < a; ++p) j !== (c = v[p]) - 1 && (h -= c), j = c;
                                for (u || (h *= 1e3), h -= s - a, o.score = h, o.indexes = new Array(y), p = y - 1; p >= 0; --p) o.indexes[p] = v[p];
                                return o
                            },
                            prepareLowerCodes: function(e) {
                                for (var o = e.length, i = [], n = e.toLowerCase(), a = 0; a < o; ++a) i[a] = n.charCodeAt(a);
                                return i
                            },
                            prepareBeginningIndexes: function(e) {
                                for (var o = e.length, i = [], n = 0, a = !1, r = !1, t = 0; t < o; ++t) {
                                    var s = e.charCodeAt(t),
                                        m = s >= 65 && s <= 90,
                                        c = m || s >= 97 && s <= 122 || s >= 48 && s <= 57,
                                        d = m && !a || !r || !c;
                                    a = m, r = c, d && (i[n++] = t)
                                }
                                return i
                            },
                            prepareNextBeginningIndexes: function(e) {
                                for (var o = e.length, i = f.prepareBeginningIndexes(e), n = [], a = i[0], r = 0, t = 0; t < o; ++t) a > t ? n[t] = a : (a = i[++r], n[t] = void 0 === a ? o : a);
                                return n
                            },
                            cleanup: s,
                            new: l
                        };
                        return f
                    }()
                }, e.exports ? e.exports = i() : o.fuzzysort = i()
            }(o = {
                exports: {}
            }), o.exports
        }();
        class Wo {
            constructor(e, o) {
                this.message = e, this.iconUrl = o
            }
            render() {
                const e = Ee("div", "emoji-picker__search-not-found"),
                    o = Ee("div", "emoji-picker__search-not-found-icon");
                this.iconUrl ? o.appendChild(qo(this.iconUrl)) : o.innerHTML = zo, e.appendChild(o);
                const i = Ee("h2");
                return i.innerHTML = this.message, e.appendChild(i), e
            }
        }
        class Ko {
            constructor(e, o, i, n, a) {
                if (this.events = e, this.i18n = o, this.options = i, this.focusedEmojiIndex = 0, this.emojisPerRow = this.options.emojisPerRow || 8, this.emojiData = n.filter(e => e.version && parseFloat(e.version) <= parseFloat(i.emojiVersion) && void 0 !== e.category && a.indexOf(e.category) >= 0), this.options.custom) {
                    const e = this.options.custom.map(e => ({
                        ...e,
                        custom: !0
                    }));
                    this.emojiData = [...this.emojiData, ...e]
                }
                this.events.on("hideVariantPopup", () => {
                    setTimeout(() => this.setFocusedEmoji(this.focusedEmojiIndex))
                })
            }
            render() {
                return this.searchContainer = Ee("div", "emoji-picker__search-container"), this.searchField = Ee("input", "emoji-picker__search " + this.options.inputClass), this.searchField.placeholder = this.i18n.search, this.searchContainer.appendChild(this.searchField), this.searchIcon = Ee("span", "emoji-picker__search-icon"), this.options.icons && this.options.icons.search ? this.searchIcon.appendChild(qo(this.options.icons.search)) : this.searchIcon.innerHTML = To, this.searchIcon.addEventListener("click", e => this.onClearSearch(e)), this.searchContainer.appendChild(this.searchIcon), this.searchField.addEventListener("keydown", e => this.onKeyDown(e)), this.searchField.addEventListener("keyup", e => this.onKeyUp(e)), this.searchContainer
            }
            onClearSearch(e) {
                e.stopPropagation(), this.searchField.value && (this.searchField.value = "", this.resultsContainer = null, this.options.icons && this.options.icons.search ? (Ce(this.searchIcon), this.searchIcon.appendChild(qo(this.options.icons.search))) : this.searchIcon.innerHTML = To, this.searchIcon.style.cursor = "default", this.events.emit("hideSearchResults"), setTimeout(() => this.searchField.focus()))
            }
            setFocusedEmoji(e) {
                if (this.resultsContainer) {
                    const o = this.resultsContainer.querySelectorAll("." + Se);
                    o[this.focusedEmojiIndex].tabIndex = -1, this.focusedEmojiIndex = e;
                    const i = o[this.focusedEmojiIndex];
                    i.tabIndex = 0, i.focus()
                }
            }
            handleResultsKeydown(e) {
                if (this.resultsContainer) {
                    const o = this.resultsContainer.querySelectorAll("." + Se);
                    "ArrowRight" === e.key ? this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, o.length - 1)) : "ArrowLeft" === e.key ? this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1)) : "ArrowDown" === e.key ? (e.preventDefault(), this.focusedEmojiIndex < o.length - this.emojisPerRow && this.setFocusedEmoji(this.focusedEmojiIndex + this.emojisPerRow)) : "ArrowUp" === e.key ? (e.preventDefault(), this.focusedEmojiIndex >= this.emojisPerRow && this.setFocusedEmoji(this.focusedEmojiIndex - this.emojisPerRow)) : "Escape" === e.key && this.onClearSearch(e)
                }
            }
            onKeyDown(e) {
                "Escape" === e.key && this.searchField.value && this.onClearSearch(e)
            }
            onKeyUp(e) {
                if ("Tab" !== e.key && "Shift" !== e.key)
                    if (this.searchField.value) {
                        this.options.icons && this.options.icons.clearSearch ? (Ce(this.searchIcon), this.searchIcon.appendChild(qo(this.options.icons.clearSearch))) : this.searchIcon.innerHTML = Bo, this.searchIcon.style.cursor = "pointer";
                        const e = Ho.go(this.searchField.value, this.emojiData, {
                            allowTypo: !0,
                            limit: 100,
                            key: "name"
                        }).map(e => e.obj);
                        this.events.emit("hidePreview"), e.length ? (this.resultsContainer = new Vo(e, !0, this.events, this.options, !1).render(), this.resultsContainer && (this.resultsContainer.querySelector("." + Se).tabIndex = 0, this.focusedEmojiIndex = 0, this.resultsContainer.addEventListener("keydown", e => this.handleResultsKeydown(e)), this.events.emit("showSearchResults", this.resultsContainer))) : this.events.emit("showSearchResults", new Wo(this.i18n.notFound, this.options.icons && this.options.icons.notFound).render())
                    } else this.options.icons && this.options.icons.search ? (Ce(this.searchIcon), this.searchIcon.appendChild(qo(this.options.icons.search))) : this.searchIcon.innerHTML = To, this.searchIcon.style.cursor = "default", this.events.emit("hideSearchResults")
            }
        }
        class Jo {
            constructor(e, o, i) {
                this.events = e, this.emoji = o, this.options = i, this.focusedEmojiIndex = 0
            }
            getEmoji(e) {
                return this.popup.querySelectorAll("." + Se)[e]
            }
            setFocusedEmoji(e) {
                this.getEmoji(this.focusedEmojiIndex).tabIndex = -1, this.focusedEmojiIndex = e;
                const o = this.getEmoji(this.focusedEmojiIndex);
                o.tabIndex = 0, o.focus()
            }
            render() {
                this.popup = Ee("div", "emoji-picker__variant-popup");
                const e = Ee("div", "emoji-picker__variant-overlay");
                e.addEventListener("click", e => {
                    e.stopPropagation(), this.popup.contains(e.target) || this.events.emit("hideVariantPopup")
                }), this.popup.appendChild(new Ro(this.emoji, !1, !1, this.events, this.options, !1).render()), (this.emoji.variations || []).forEach((e, o) => this.popup.appendChild(new Ro({
                    name: this.emoji.name,
                    emoji: e,
                    key: this.emoji.name + o
                }, !1, !1, this.events, this.options, !1).render()));
                const o = this.popup.querySelector("." + Se);
                return this.focusedEmojiIndex = 0, o.tabIndex = 0, setTimeout(() => o.focus()), this.popup.addEventListener("keydown", e => {
                    "ArrowRight" === e.key ? this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, this.popup.querySelectorAll("." + Se).length - 1)) : "ArrowLeft" === e.key ? this.setFocusedEmoji(Math.max(this.focusedEmojiIndex - 1, 0)) : "Escape" === e.key && (e.stopPropagation(), this.events.emit("hideVariantPopup"))
                }), e.appendChild(this.popup), e
            }
        }
        const Uo = {
                search: "Search emojis...",
                categories: {
                    recents: "Recent Emojis",
                    smileys: "Smileys & Emotion",
                    people: "People & Body",
                    animals: "Animals & Nature",
                    food: "Food & Drink",
                    activities: "Activities",
                    travel: "Travel & Places",
                    objects: "Objects",
                    symbols: "Symbols",
                    flags: "Flags",
                    custom: "Custom"
                },
                notFound: "No emojis found"
            },
            Go = {
                recents: Mo,
                smileys: No,
                people: Do,
                animals: So,
                food: Oo,
                activities: Ao,
                travel: Co,
                objects: Lo,
                symbols: _o,
                flags: Io,
                custom: Po
            };
        class Xo {
            constructor(e, o, i) {
                this.options = e, this.events = o, this.i18n = i, this.activeButton = 0, this.buttons = []
            }
            render() {
                const e = Ee("div", "emoji-picker__category-buttons");
                let o = this.options.showRecents ? ["recents", ...this.options.categories || xe.categories] : this.options.categories || xe.categories;
                return this.options.custom && (o = [...o, "custom"]), o.forEach(o => {
                    const i = Ee("button", "emoji-picker__category-button");
                    this.options.icons && this.options.icons.categories && this.options.icons.categories[o] ? i.appendChild(qo(this.options.icons.categories[o])) : i.innerHTML = Go[o], i.tabIndex = -1, i.title = this.i18n.categories[o], e.appendChild(i), this.buttons.push(i), i.addEventListener("click", () => {
                        this.events.emit("categoryClicked", o)
                    })
                }), e.addEventListener("keydown", e => {
                    switch (e.key) {
                        case "ArrowRight":
                            this.events.emit("categoryClicked", o[(this.activeButton + 1) % this.buttons.length]);
                            break;
                        case "ArrowLeft":
                            this.events.emit("categoryClicked", o[0 === this.activeButton ? this.buttons.length - 1 : this.activeButton - 1]);
                            break;
                        case "ArrowUp":
                        case "ArrowDown":
                            e.stopPropagation(), e.preventDefault()
                    }
                }), e
            }
            setActiveButton(e, o = !0) {
                let i = this.buttons[this.activeButton];
                i.classList.remove("active"), i.tabIndex = -1, this.activeButton = e, i = this.buttons[this.activeButton], i.classList.add("active"), i.tabIndex = 0, o && i.focus()
            }
        }
        const $o = {};
        xe.emoji.forEach(e => {
            let o = $o[xe.categories[e.category]];
            o || (o = $o[xe.categories[e.category]] = []), o.push(e)
        });
        class Yo {
            constructor(e, o, i) {
                this.events = e, this.i18n = o, this.options = i, this.currentCategory = 0, this.headers = [], this.focusedIndex = 0, this.handleKeyDown = e => {
                    switch (this.emojis.removeEventListener("scroll", this.highlightCategory), e.key) {
                        case "ArrowRight":
                            this.focusedEmoji.tabIndex = -1, this.focusedIndex === this.currentEmojiCount - 1 && this.currentCategory < this.categories.length - 1 ? (this.options.showCategoryButtons && this.categoryButtons.setActiveButton(++this.currentCategory), this.setFocusedEmoji(0)) : this.focusedIndex < this.currentEmojiCount - 1 && this.setFocusedEmoji(this.focusedIndex + 1);
                            break;
                        case "ArrowLeft":
                            this.focusedEmoji.tabIndex = -1, 0 === this.focusedIndex && this.currentCategory > 0 ? (this.options.showCategoryButtons && this.categoryButtons.setActiveButton(--this.currentCategory), this.setFocusedEmoji(this.currentEmojiCount - 1)) : this.setFocusedEmoji(Math.max(0, this.focusedIndex - 1));
                            break;
                        case "ArrowDown":
                            e.preventDefault(), this.focusedEmoji.tabIndex = -1, this.focusedIndex + this.emojisPerRow >= this.currentEmojiCount && this.currentCategory < this.categories.length - 1 ? (this.currentCategory++, this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory), this.setFocusedEmoji(Math.min(this.focusedIndex % this.emojisPerRow, this.currentEmojiCount - 1))) : this.currentEmojiCount - this.focusedIndex > this.emojisPerRow && this.setFocusedEmoji(this.focusedIndex + this.emojisPerRow);
                            break;
                        case "ArrowUp":
                            if (e.preventDefault(), this.focusedEmoji.tabIndex = -1, this.focusedIndex < this.emojisPerRow && this.currentCategory > 0) {
                                const e = this.getEmojiCount(this.currentCategory - 1);
                                let o = e % this.emojisPerRow;
                                0 === o && (o = this.emojisPerRow);
                                const i = this.focusedIndex,
                                    n = i > o - 1 ? e - 1 : e - o + i;
                                this.currentCategory--, this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory), this.setFocusedEmoji(n)
                            } else this.setFocusedEmoji(this.focusedIndex >= this.emojisPerRow ? this.focusedIndex - this.emojisPerRow : this.focusedIndex)
                    }
                    requestAnimationFrame(() => this.emojis.addEventListener("scroll", this.highlightCategory))
                }, this.addCategory = (e, o) => {
                    const i = Ee("h2", "emoji-picker__category-name");
                    i.innerHTML = this.i18n.categories[e] || Uo.categories[e], this.emojis.appendChild(i), this.headers.push(i), this.emojis.appendChild(new Vo(o, !0, this.events, this.options, "recents" !== e).render())
                }, this.selectCategory = (e, o = !0) => {
                    this.emojis.removeEventListener("scroll", this.highlightCategory), this.focusedEmoji && (this.focusedEmoji.tabIndex = -1);
                    const i = this.categories.indexOf(e);
                    this.currentCategory = i, this.setFocusedEmoji(0, !1), this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory, o);
                    const n = this.headerOffsets[i];
                    this.emojis.scrollTop = n, requestAnimationFrame(() => this.emojis.addEventListener("scroll", this.highlightCategory))
                }, this.highlightCategory = () => {
                    if (document.activeElement && document.activeElement.classList.contains("emoji-picker__emoji")) return;
                    let e = this.headerOffsets.findIndex(e => e >= Math.round(this.emojis.scrollTop));
                    this.emojis.scrollTop + this.emojis.offsetHeight === this.emojis.scrollHeight && (e = -1), 0 === e ? e = 1 : e < 0 && (e = this.headerOffsets.length), this.headerOffsets[e] === this.emojis.scrollTop && e++, this.currentCategory = e - 1, this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory)
                }, this.emojisPerRow = i.emojisPerRow || 8, this.categories = i.categories || xe.categories, i.showRecents && (this.categories = ["recents", ...this.categories]), i.custom && (this.categories = [...this.categories, "custom"])
            }
            updateRecents() {
                if (this.options.showRecents) {
                    $o.recents = Fo();
                    const e = this.emojis.querySelector(".emoji-picker__container");
                    e && e.parentNode && e.parentNode.replaceChild(new Vo($o.recents, !0, this.events, this.options, !1).render(), e)
                }
            }
            render() {
                return this.container = Ee("div", "emoji-picker__emoji-area"), this.options.showCategoryButtons && (this.categoryButtons = new Xo(this.options, this.events, this.i18n), this.container.appendChild(this.categoryButtons.render())), this.emojis = Ee("div", "emoji-picker__emojis"), this.options.showRecents && ($o.recents = Fo()), this.options.custom && ($o.custom = this.options.custom.map(e => ({
                    ...e,
                    custom: !0
                }))), this.categories.forEach(e => this.addCategory(e, $o[e])), requestAnimationFrame(() => {
                    setTimeout(() => {
                        setTimeout(() => this.emojis.addEventListener("scroll", this.highlightCategory))
                    })
                }), this.emojis.addEventListener("keydown", this.handleKeyDown), this.events.on("categoryClicked", this.selectCategory), this.container.appendChild(this.emojis), this.container.querySelectorAll("." + Se)[0].tabIndex = 0, this.container
            }
            reset() {
                this.headerOffsets = Array.prototype.map.call(this.headers, e => e.offsetTop), this.selectCategory(this.options.initialCategory || "smileys", !1), this.currentCategory = this.categories.indexOf(this.options.initialCategory || "smileys"), this.options.showCategoryButtons && this.categoryButtons.setActiveButton(this.currentCategory, !1)
            }
            get currentCategoryEl() {
                return this.emojis.querySelectorAll(".emoji-picker__container")[this.currentCategory]
            }
            get focusedEmoji() {
                return this.currentCategoryEl.querySelectorAll("." + Se)[this.focusedIndex]
            }
            get currentEmojiCount() {
                return this.currentCategoryEl.querySelectorAll("." + Se).length
            }
            getEmojiCount(e) {
                return this.emojis.querySelectorAll(".emoji-picker__container")[e].querySelectorAll("." + Se).length
            }
            setFocusedEmoji(e, o = !0) {
                this.focusedIndex = e, this.focusedEmoji && (this.focusedEmoji.tabIndex = 0, o && this.focusedEmoji.focus())
            }
        }
        const Zo = {
                ext: ".svg",
                folder: "svg"
            },
            Qo = {
                position: "auto",
                autoHide: !0,
                autoFocusSearch: !0,
                showAnimation: !0,
                showPreview: !0,
                showSearch: !0,
                showRecents: !0,
                showVariants: !0,
                showCategoryButtons: !0,
                recentsCount: 50,
                emojiVersion: "12.1",
                theme: "light",
                categories: ["smileys", "people", "animals", "food", "activities", "travel", "objects", "symbols", "flags"],
                style: "native",
                emojisPerRow: 8,
                rows: 6,
                emojiSize: "1.8em",
                initialCategory: "smileys"
            };
        class ei {
            constructor(e = {}) {
                this.events = new k, this.publicEvents = new k, this.pickerVisible = !1, this.options = {
                    ...Qo,
                    ...e
                }, this.options.rootElement || (this.options.rootElement = document.body), this.i18n = {
                    ...Uo,
                    ...e.i18n
                }, this.onDocumentClick = this.onDocumentClick.bind(this), this.onDocumentKeydown = this.onDocumentKeydown.bind(this), this.theme = this.options.theme || "light", this.buildPicker()
            }
            on(e, o) {
                this.publicEvents.on(e, o)
            }
            off(e, o) {
                this.publicEvents.off(e, o)
            }
            buildPicker() {
                if (this.pickerEl = Ee("div", "emoji-picker"), this.updateTheme(this.theme), this.options.showAnimation || this.pickerEl.style.setProperty("--animation-duration", "0s"), this.options.emojisPerRow && this.pickerEl.style.setProperty("--emoji-per-row", this.options.emojisPerRow.toString()), this.options.rows && this.pickerEl.style.setProperty("--row-count", this.options.rows.toString()), this.options.emojiSize && this.pickerEl.style.setProperty("--emoji-size", this.options.emojiSize), this.options.showCategoryButtons || this.pickerEl.style.setProperty("--category-button-height", "0"), this.focusTrap = function(e, o) {
                        var i = document,
                            n = "string" == typeof e ? i.querySelector(e) : e,
                            a = h({
                                returnFocusOnDeactivate: !0,
                                escapeDeactivates: !0
                            }, o),
                            r = {
                                firstTabbableNode: null,
                                lastTabbableNode: null,
                                nodeFocusedBeforeActivation: null,
                                mostRecentlyFocusedNode: null,
                                active: !1,
                                paused: !1
                            },
                            t = {
                                activate: function(e) {
                                    if (!r.active) {
                                        w(), r.active = !0, r.paused = !1, r.nodeFocusedBeforeActivation = i.activeElement;
                                        var o = e && e.onActivate ? e.onActivate : a.onActivate;
                                        return o && o(), m(), t
                                    }
                                },
                                deactivate: s,
                                pause: function() {
                                    !r.paused && r.active && (r.paused = !0, c())
                                },
                                unpause: function() {
                                    r.paused && r.active && (r.paused = !1, w(), m())
                                }
                            };
                        return t;

                        function s(e) {
                            if (r.active) {
                                clearTimeout(v), c(), r.active = !1, r.paused = !1, p.deactivateTrap(t);
                                var o = e && void 0 !== e.onDeactivate ? e.onDeactivate : a.onDeactivate;
                                return o && o(), (e && void 0 !== e.returnFocus ? e.returnFocus : a.returnFocusOnDeactivate) && b((function() {
                                    var e;
                                    k((e = r.nodeFocusedBeforeActivation, d("setReturnFocus") || e))
                                })), t
                            }
                        }

                        function m() {
                            if (r.active) return p.activateTrap(t), v = b((function() {
                                k(u())
                            })), i.addEventListener("focusin", l, !0), i.addEventListener("mousedown", g, {
                                capture: !0,
                                passive: !1
                            }), i.addEventListener("touchstart", g, {
                                capture: !0,
                                passive: !1
                            }), i.addEventListener("click", j, {
                                capture: !0,
                                passive: !1
                            }), i.addEventListener("keydown", f, {
                                capture: !0,
                                passive: !1
                            }), t
                        }

                        function c() {
                            if (r.active) return i.removeEventListener("focusin", l, !0), i.removeEventListener("mousedown", g, !0), i.removeEventListener("touchstart", g, !0), i.removeEventListener("click", j, !0), i.removeEventListener("keydown", f, !0), t
                        }

                        function d(e) {
                            var o = a[e],
                                n = o;
                            if (!o) return null;
                            if ("string" == typeof o && !(n = i.querySelector(o))) throw new Error("`" + e + "` refers to no known node");
                            if ("function" == typeof o && !(n = o())) throw new Error("`" + e + "` did not return a node");
                            return n
                        }

                        function u() {
                            var e;
                            if (!(e = null !== d("initialFocus") ? d("initialFocus") : n.contains(i.activeElement) ? i.activeElement : r.firstTabbableNode || d("fallbackFocus"))) throw new Error("Your focus-trap needs to have at least one focusable element");
                            return e
                        }

                        function g(e) {
                            n.contains(e.target) || (a.clickOutsideDeactivates ? s({
                                returnFocus: !y.isFocusable(e.target)
                            }) : a.allowOutsideClick && a.allowOutsideClick(e) || e.preventDefault())
                        }

                        function l(e) {
                            n.contains(e.target) || e.target instanceof Document || (e.stopImmediatePropagation(), k(r.mostRecentlyFocusedNode || u()))
                        }

                        function f(e) {
                            if (!1 !== a.escapeDeactivates && function(e) {
                                    return "Escape" === e.key || "Esc" === e.key || 27 === e.keyCode
                                }(e)) return e.preventDefault(), void s();
                            (function(e) {
                                return "Tab" === e.key || 9 === e.keyCode
                            })(e) && function(e) {
                                if (w(), e.shiftKey && e.target === r.firstTabbableNode) return e.preventDefault(), void k(r.lastTabbableNode);
                                e.shiftKey || e.target !== r.lastTabbableNode || (e.preventDefault(), k(r.firstTabbableNode))
                            }(e)
                        }

                        function j(e) {
                            a.clickOutsideDeactivates || n.contains(e.target) || a.allowOutsideClick && a.allowOutsideClick(e) || (e.preventDefault(), e.stopImmediatePropagation())
                        }

                        function w() {
                            var e = y(n);
                            r.firstTabbableNode = e[0] || u(), r.lastTabbableNode = e[e.length - 1] || u()
                        }

                        function k(e) {
                            e !== i.activeElement && (e && e.focus ? (e.focus(), r.mostRecentlyFocusedNode = e, function(e) {
                                return e.tagName && "input" === e.tagName.toLowerCase() && "function" == typeof e.select
                            }(e) && e.select()) : k(u()))
                        }
                    }(this.pickerEl, {
                        clickOutsideDeactivates: !0,
                        initialFocus: this.options.showSearch && this.options.autoFocusSearch ? ".emoji-picker__search" : '.emoji-picker__emoji[tabindex="0"]'
                    }), this.pickerContent = Ee("div", "emoji-picker__content"), this.options.plugins) {
                    const e = Ee("div", "emoji-picker__plugin-container");
                    this.options.plugins.forEach(o => {
                        if (!o.render) throw new Error('Emoji Button plugins must have a "render" function.');
                        e.appendChild(o.render(this))
                    }), this.pickerEl.appendChild(e)
                }
                if (this.options.showSearch) {
                    const e = new Ko(this.events, this.i18n, this.options, xe.emoji, (this.options.categories || []).map(e => xe.categories.indexOf(e))).render();
                    this.pickerEl.appendChild(e)
                }
                this.pickerEl.appendChild(this.pickerContent), this.emojiArea = new Yo(this.events, this.i18n, this.options), this.pickerContent.appendChild(this.emojiArea.render()), this.events.on("showSearchResults", e => {
                    Ce(this.pickerContent), e.classList.add("search-results"), this.pickerContent.appendChild(e)
                }), this.events.on("hideSearchResults", () => {
                    this.pickerContent.firstChild !== this.emojiArea.container && (Ce(this.pickerContent), this.pickerContent.appendChild(this.emojiArea.container)), this.emojiArea.reset()
                }), this.options.showPreview && this.pickerEl.appendChild(new Ie(this.events, this.options).render()), this.events.on("emoji", ({
                    emoji: e,
                    showVariants: o
                }) => {
                    e.variations && o && this.options.showVariants ? this.showVariantPopup(e) : (setTimeout(() => this.emojiArea.updateRecents()), e.custom ? this.publicEvents.emit("emoji", {
                        url: e.emoji,
                        name: e.name,
                        custom: !0
                    }) : "twemoji" === this.options.style ? ke.parse(e.emoji, {
                        ...Zo,
                        callback: (o, i) => {
                            this.publicEvents.emit("emoji", {
                                url: `${i.base}${i.size}/${o}${i.ext}`,
                                emoji: e.emoji,
                                name: e.name
                            })
                        }
                    }) : this.publicEvents.emit("emoji", {
                        emoji: e.emoji,
                        name: e.name
                    }), this.options.autoHide && this.hidePicker())
                }), this.wrapper = Ee("div", "emoji-picker__wrapper"), this.wrapper.appendChild(this.pickerEl), this.wrapper.style.display = "none", this.options.zIndex && (this.wrapper.style.zIndex = this.options.zIndex + ""), this.options.rootElement && this.options.rootElement.appendChild(this.wrapper), this.observeForLazyLoad()
            }
            showVariantPopup(e) {
                const o = new Jo(this.events, e, this.options).render();
                o && this.pickerEl.appendChild(o), this.events.on("hideVariantPopup", () => {
                    o && (o.classList.add("hiding"), setTimeout(() => {
                        o && this.pickerEl.removeChild(o)
                    }, 175)), this.events.off("hideVariantPopup")
                })
            }
            observeForLazyLoad() {
                this.observer = new IntersectionObserver(e => {
                    Array.prototype.filter.call(e, e => e.intersectionRatio > 0).map(e => e.target).forEach(e => {
                        if (!e.dataset.loaded)
                            if (e.dataset.custom) {
                                const o = Ee("img", "emoji-picker__custom-emoji");
                                o.src = e.dataset.emoji, e.innerText = "", e.appendChild(o), e.dataset.loaded = !0, e.style.opacity = 1
                            } else "twemoji" === this.options.style && (e.innerHTML = ke.parse(e.dataset.emoji, Zo), e.dataset.loaded = !0, e.style.opacity = "1")
                    })
                }, {
                    root: this.emojiArea.emojis
                }), this.emojiArea.emojis.querySelectorAll("." + Se).forEach(e => {
                    "twemoji" !== this.options.style && "true" !== e.dataset.custom || this.observer.observe(e)
                })
            }
            onDocumentClick(e) {
                this.pickerEl.contains(e.target) || this.hidePicker()
            }
            destroyPicker() {
                this.events.off("emoji"), this.events.off("hideVariantPopup"), this.options.rootElement && (this.options.rootElement.removeChild(this.wrapper), this.popper && this.popper.destroy()), this.observer && this.observer.disconnect(), this.options.plugins && this.options.plugins.forEach(e => {
                    e.destroy && e.destroy()
                })
            }
            hidePicker() {
                this.hideInProgress = !0, this.focusTrap.deactivate(), this.pickerVisible = !1, this.overlay && (document.body.removeChild(this.overlay), this.overlay = void 0), this.emojiArea.emojis.removeEventListener("scroll", this.emojiArea.highlightCategory), this.pickerEl.classList.add("hiding"), setTimeout(() => {
                    this.wrapper.style.display = "none", this.pickerEl.classList.remove("hiding"), this.pickerContent.firstChild !== this.emojiArea.container && (Ce(this.pickerContent), this.pickerContent.appendChild(this.emojiArea.container));
                    const e = this.pickerEl.querySelector(".emoji-picker__search");
                    e && (e.value = ""), this.pickerEl.querySelector(".emoji-picker__variant-overlay") && this.events.emit("hideVariantPopup"), this.hideInProgress = !1, this.popper && this.popper.destroy(), this.publicEvents.emit("hidden")
                }, this.options.showAnimation ? 170 : 0), setTimeout(() => {
                    document.removeEventListener("click", this.onDocumentClick), document.removeEventListener("keydown", this.onDocumentKeydown)
                })
            }
            showPicker(e) {
                if (this.hideInProgress) setTimeout(() => this.showPicker(e), 100);
                else {
                    if (this.pickerVisible = !0, this.wrapper.style.display = "block", window.matchMedia("screen and (max-width: 450px)").matches) {
                        const e = window.getComputedStyle(this.pickerEl),
                            o = document.querySelector("html"),
                            i = o && o.clientHeight,
                            n = o && o.clientWidth,
                            a = parseInt(e.height),
                            r = i ? i / 2 - a / 2 : 0,
                            t = parseInt(e.width),
                            s = n ? n / 2 - t / 2 : 0;
                        this.wrapper.style.position = "fixed", this.wrapper.style.top = r + "px", this.wrapper.style.left = s + "px", this.wrapper.style.zIndex = "5000", this.overlay = Ee("div", "emoji-picker__overlay"), document.body.appendChild(this.overlay)
                    } else "string" == typeof this.options.position ? this.popper = je(e, this.wrapper, {
                        placement: this.options.position
                    }) : this.options.position && (this.options.position.top || this.options.position.left) && (this.wrapper.style.position = "fixed", this.options.position.top && (this.wrapper.style.top = this.options.position.top), this.options.position.bottom && (this.wrapper.style.bottom = this.options.position.bottom), this.options.position.left && (this.wrapper.style.left = this.options.position.left), this.options.position.right && (this.wrapper.style.right = this.options.position.right));
                    this.focusTrap.activate(), setTimeout(() => {
                        document.addEventListener("click", this.onDocumentClick), document.addEventListener("keydown", this.onDocumentKeydown), this.pickerEl.querySelector(this.options.showSearch && this.options.autoFocusSearch ? ".emoji-picker__search" : `.${Se}[tabindex="0"]`).focus()
                    }), this.emojiArea.reset()
                }
            }
            togglePicker(e) {
                this.pickerVisible ? this.hidePicker() : this.showPicker(e)
            }
            isPickerVisible() {
                return this.pickerVisible
            }
            onDocumentKeydown(e) {
                if ("Escape" === e.key) this.hidePicker();
                else if ("Tab" === e.key) this.pickerEl.classList.add("keyboard");
                else if (e.key.match(/^[\w]$/)) {
                    const e = this.pickerEl.querySelector(".emoji-picker__search");
                    e && e.focus()
                }
            }
            setTheme(e) {
                e !== this.theme && (this.pickerEl.classList.remove(this.theme), this.theme = e, this.updateTheme(this.theme))
            }
            updateTheme(e) {
                this.pickerEl.classList.add(e)
            }
        }
    }).call(this, i(1), i(7).setImmediate)
}, , function(e, o, i) {
    e.exports = i(13)
}, , , , , function(e, o) {
    ! function() {
        const e = document.querySelector(".main"),
            o = document.querySelectorAll("[data-toggle-chat]");
        Array.prototype.forEach.call(o, o => {
            o.addEventListener("click", () => {
                e.classList.toggle("is-visible")
            }, !1)
        })
    }()
}, function(e, o) {
    const i = document.getElementById("modal-media-preview");
    i && i.addEventListener("show.bs.modal", (function(e) {
        let o = e.relatedTarget.getAttribute("data-theme-img-url");
        i.querySelector(".modal-preview-url").src = o
    }))
}, function(e, o) {
    [].forEach.call(document.querySelectorAll("[data-horizontal-scroll]"), (function(e) {
        function o(o) {
            o = window.event || o;
            const i = Math.max(-1, Math.min(1, o.wheelDelta || -o.detail));
            e.scrollLeft -= 28 * i, o.preventDefault()
        }
        e.addEventListener ? (e.addEventListener("mousewheel", o, !1), e.addEventListener("DOMMouseScroll", o, !1)) : e.attachEvent("onmousewheel", o)
    }))
}, function(e, o, i) {
    "use strict";
    i.r(o);
    var n = i(0),
        a = i(2),
        r = i.n(a),
        t = (i(6), i(3)),
        s = i(4);
    i(10);
    const m = {
            Android: function() {
                return navigator.userAgent.match(/Android/i)
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i)
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPod|iPad/i)
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i)
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
            },
            any: function() {
                return m.Android() || m.BlackBerry() || m.iOS() || m.Opera() || m.Windows()
            }
        },
        c = document.querySelectorAll("[data-emoji-form]");
    m.any() ? c.forEach(e => {
        e.querySelector("[data-emoji-btn]").style.display = "none"
    }) : c.forEach(e => {
        const o = e.querySelector("[data-emoji-btn]"),
            i = new t.a({
                autoHide: !1,
                emojiSize: "1.125rem",
                position: "top",
                zIndex: 1041,
                recentsCount: 15,
                showSearch: !0,
                showPreview: !1,
                showCategoryButtons: !1,
                emojisPerRow: 10,
                rows: 8,
                inputClass: "form-control",
                initialCategory: null === localStorage.getItem("emojiPicker.recent") ? "smileys" : "recents",
                i18n: {
                    search: "Search",
                    categories: {
                        recents: "Frequently Used",
                        smileys: "Faces & Emotion"
                    },
                    notFound: "Oops! Nothing found!"
                }
            });
        i.on("emoji", o => {
            e.querySelector("[data-emoji-input]").value += o.emoji
        }), o.addEventListener("click", () => {
            i.pickerVisible ? i.hidePicker() : i.showPicker(o)
        })
    }), r()(document.querySelectorAll('[data-autosize="true"]'));
    document.querySelectorAll('[data-theme-toggle="tab"]').forEach(e => {
        e.addEventListener("click", o => {
            o.preventDefault(), new n.a(document.querySelector(e.hash)).show()
        })
    });
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(e => {
        new n.b(e, {
            html: !0
        })
    });
    if (document.querySelector(".chat-body-inner") && document.querySelector(".chat-body-inner")) {
        const e = document.querySelector(".chat-footer");
        new ResizeObserver((function() {
            const o = document.querySelector(".chat-body-inner");
            o && e && o.setAttribute("style", `padding-bottom: ${Number(e.offsetHeight)}px`)
        })).observe(e)
    }
    let url_str = window.location.origin  + "/chat/upload/";
    if (document.querySelector("[data-dropzone-area]")) {
           drop_zone = new s.Dropzone("[data-dropzone-area]", {
            url: url_str,
            clickable: "#dz-btn",
            autoProcessQueue: false,
            uploadMultiple: true,
            parallelUploads: 100,
            paramName: () => "files",
            maxFiles: 100,
            previewsContainer: "#dz-preview-row",
            previewTemplate: '\n<div class="theme-file-preview position-relative mx-2">\n    <div class="avatar avatar-lg dropzone-file-preview">\n        <span class="avatar-text rounded bg-secondary text-body file-title">\n            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>\n        </span>\n    </div>\n\n    <div class="avatar avatar-lg dropzone-image-preview">\n        <img src="#" class="avatar-img rounded file-title" data-dz-thumbnail="" alt="" >\n    </div>\n\n    <a class="badge badge-circle bg-body text-white position-absolute top-0 end-0 m-2" href="#" data-dz-remove="">\n        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>\n    </a>\n</div>\n'
        });

        drop_zone.on("addedfile", (function(e) {
            let o = document.querySelectorAll(".theme-file-preview");
            o = o[o.length - 1].querySelectorAll(".file-title");
            for (let i = 0; i < o.length; i++) o[i].title = e.name
        })), drop_zone.on("addedfiles", (function(o) {
            drop_zone.previewsContainer.classList.add("dz-preview-moved", "pb-10", "pt-3", "px-2")
        })), drop_zone.on("reset", (function(o) {
            drop_zone.previewsContainer.classList.remove("dz-preview-moved", "pb-10", "pt-3", "px-2")
        }))

    }
    i(11);
    window.onload = function() {
        var e;
        e = ".chat-body-inner", (e = document.querySelectorAll(e)).length && e[e.length - 1].scrollIntoView(!1, {
            block: "end"
        })
    };
    i(12)
}]);
