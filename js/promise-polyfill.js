! function (e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n;
        n = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, n.promisePolyfill = e()
    }
}(function () {
    return function e(n, t, o) {
        function r(f, u) {
            if (!t[f]) {
                if (!n[f]) {
                    var c = "function" == typeof require && require;
                    if (!u && c) return c(f, !0);
                    if (i) return i(f, !0);
                    var s = new Error("Cannot find module '" + f + "'");
                    throw s.code = "MODULE_NOT_FOUND", s
                }
                var l = t[f] = {
                    exports: {}
                };
                n[f][0].call(l.exports, function (e) {
                    var t = n[f][1][e];
                    return r(t ? t : e)
                }, l, l.exports, e, n, t, o)
            }
            return t[f].exports
        }
        for (var i = "function" == typeof require && require, f = 0; f < o.length; f++) r(o[f]);
        return r
    }({
        1: [function (e, n, t) {
            "use strict";

            function o(e) {
                var n = this.constructor;
                return this.then(function (t) {
                    return n.resolve(e()).then(function () {
                        return t
                    })
                }, function (t) {
                    return n.resolve(e()).then(function () {
                        return n.reject(t)
                    })
                })
            }

            function r() {}

            function i(e, n) {
                return function () {
                    e.apply(n, arguments)
                }
            }

            function f(e) {
                if (!(this instanceof f)) throw new TypeError("Promises must be constructed via new");
                if ("function" != typeof e) throw new TypeError("not a function");
                this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], d(e, this)
            }

            function u(e, n) {
                for (; 3 === e._state;) e = e._value;
                return 0 === e._state ? void e._deferreds.push(n) : (e._handled = !0, void f._immediateFn(function () {
                    var t = 1 === e._state ? n.onFulfilled : n.onRejected;
                    if (null === t) return void(1 === e._state ? c : s)(n.promise, e._value);
                    var o;
                    try {
                        o = t(e._value)
                    } catch (e) {
                        return void s(n.promise, e)
                    }
                    c(n.promise, o)
                }))
            }

            function c(e, n) {
                try {
                    if (n === e) throw new TypeError("A promise cannot be resolved with itself.");
                    if (n && ("object" == typeof n || "function" == typeof n)) {
                        var t = n.then;
                        if (n instanceof f) return e._state = 3, e._value = n, void l(e);
                        if ("function" == typeof t) return void d(i(t, n), e)
                    }
                    e._state = 1, e._value = n, l(e)
                } catch (n) {
                    s(e, n)
                }
            }

            function s(e, n) {
                e._state = 2, e._value = n, l(e)
            }

            function l(e) {
                2 === e._state && 0 === e._deferreds.length && f._immediateFn(function () {
                    e._handled || f._unhandledRejectionFn(e._value)
                });
                for (var n = 0, t = e._deferreds.length; n < t; n++) u(e, e._deferreds[n]);
                e._deferreds = null
            }

            function a(e, n, t) {
                this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof n ? n : null, this.promise = t
            }

            function d(e, n) {
                var t = !1;
                try {
                    e(function (e) {
                        t || (t = !0, c(n, e))
                    }, function (e) {
                        t || (t = !0, s(n, e))
                    })
                } catch (e) {
                    if (t) return;
                    t = !0, s(n, e)
                }
            }
            var p = setTimeout;
            f.prototype.catch = function (e) {
                return this.then(null, e)
            }, f.prototype.then = function (e, n) {
                var t = new this.constructor(r);
                return u(this, new a(e, n, t)), t
            }, f.prototype.finally = o, f.all = function (e) {
                return new f(function (n, t) {
                    function o(e, f) {
                        try {
                            if (f && ("object" == typeof f || "function" == typeof f)) {
                                var u = f.then;
                                if ("function" == typeof u) return void u.call(f, function (n) {
                                    o(e, n)
                                }, t)
                            }
                            r[e] = f, 0 === --i && n(r)
                        } catch (e) {
                            t(e)
                        }
                    }
                    if (!e || "undefined" == typeof e.length) throw new TypeError("Promise.all accepts an array");
                    var r = Array.prototype.slice.call(e);
                    if (0 === r.length) return n([]);
                    for (var i = r.length, f = 0; f < r.length; f++) o(f, r[f])
                })
            }, f.resolve = function (e) {
                return e && "object" == typeof e && e.constructor === f ? e : new f(function (n) {
                    n(e)
                })
            }, f.reject = function (e) {
                return new f(function (n, t) {
                    t(e)
                })
            }, f.race = function (e) {
                return new f(function (n, t) {
                    for (var o = 0, r = e.length; o < r; o++) e[o].then(n, t)
                })
            }, f._immediateFn = "function" == typeof setImmediate && function (e) {
                setImmediate(e)
            } || function (e) {
                p(e, 0)
            }, f._unhandledRejectionFn = function (e) {
                "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
            }, n.exports = f
        }, {}]
    }, {}, [1])(1)
});