!function() {
    var a, n, s, d, t, o, e, r, l, i, m,
    u = 5,
    g = "en",
    b = localStorage.getItem("language");
    function h() {
        f(null === b ? g : b);
        var e = document.getElementsByClassName("language");
        e && Array.from(e).forEach(function(t) {
            t.addEventListener("click", function(e) {
                f(t.getAttribute("data-lang"))
            })
        })
    }
    function f(e) {
        document.getElementById("header-lang-img") && ("en" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/us.svg" : "sp" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/spain.svg" : "gr" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/germany.svg" : "it" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/italy.svg" : "ru" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/russia.svg" : "ch" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/china.svg" : "fr" == e ? document.getElementById("header-lang-img").src = "assets/images/flags/french.svg" : "ar" == e && (document.getElementById("header-lang-img").src = "assets/images/flags/ae.svg"), localStorage.setItem("language", e), null == (b = localStorage.getItem("language")) && f(g), (e = new XMLHttpRequest).open("GET", "assets/lang/" + b + ".json"), e.onreadystatechange = function() {
            var a;
            4 === this.readyState && 200 === this.status && (a = JSON.parse(this.responseText), Object.keys(a).forEach(function(t) {
                var e = document.querySelectorAll("[data-key='" + t + "']");
                Array.from(e).forEach(function(e) {
                    e.textContent = a[t]
                })
            }))
        },
        e.send())
    }
    function y() {
        var e;
        document.querySelectorAll(".navbar-nav .collapse") && (e = document.querySelectorAll(".navbar-nav .collapse"), Array.from(e).forEach(function(t) {
            var a = new bootstrap.Collapse(t, {
                toggle: !1
            });
            t.addEventListener("show.bs.collapse", function(e) {
                e.stopPropagation();
                var e = t.parentElement.closest(".collapse");
                e ? (e = e.querySelectorAll(".collapse"), Array.from(e).forEach(function(e) {
                    e = bootstrap.Collapse.getInstance(e);
                    e !== a && e.hide()
                })) : (e = function(e) {
                    for (var t = [], a = e.parentNode.firstChild; a;) 1 === a.nodeType && a !== e && t.push(a),
                    a = a.nextSibling;
                    return t
                } (t.parentElement), Array.from(e).forEach(function(e) {
                    2 < e.childNodes.length && e.firstElementChild.setAttribute("aria-expanded", "false");
                    e = e.querySelectorAll("*[id]");
                    Array.from(e).forEach(function(e) {
                        e.classList.remove("show"),
                        2 < e.childNodes.length && (e = e.querySelectorAll("ul li a"), Array.from(e).forEach(function(e) {
                            e.hasAttribute("aria-expanded") && e.setAttribute("aria-expanded", "false")
                        }))
                    })
                }))
            }),
            t.addEventListener("hide.bs.collapse", function(e) {
                e.stopPropagation();
                e = t.querySelectorAll(".collapse");
                Array.from(e).forEach(function(e) {
                    (childCollapseInstance = bootstrap.Collapse.getInstance(e)).hide()
                })
            })
        }))
    }
    function p(e) {
        if (e) {
            var t = e.offsetTop,
            a = e.offsetLeft,
            n = e.offsetWidth,
            o = e.offsetHeight;
            if (e.offsetParent) for (; e.offsetParent;) t += (e = e.offsetParent).offsetTop,
            a += e.offsetLeft;
            return t >= window.pageYOffset && a >= window.pageXOffset && t + o <= window.pageYOffset + window.innerHeight && a + n <= window.pageXOffset + window.innerWidth
        }
    }
    function v() {
        feather.replace();
        var e = document.documentElement.clientWidth,
        e = (e < 1025 && 767 < e ? ("vertical" == sessionStorage.getItem("data-layout") && document.documentElement.setAttribute("data-sidebar-size", "sm"), document.querySelector(".hamburger-icon") && document.querySelector(".hamburger-icon").classList.add("open")) : 1025 <= e ? ("vertical" == sessionStorage.getItem("data-layout") && document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size")), document.querySelector(".hamburger-icon") && document.querySelector(".hamburger-icon").classList.remove("open")) : e <= 767 && (document.body.classList.remove("vertical-sidebar-enable"), "horizontal" != sessionStorage.getItem("data-layout") && document.documentElement.setAttribute("data-sidebar-size", "lg"), document.querySelector(".hamburger-icon")) && document.querySelector(".hamburger-icon").classList.add("open"), document.querySelectorAll("#navbar-nav > li.nav-item"));
        Array.from(e).forEach(function(e) {
            e.addEventListener("click", S.bind(this), !1),
            e.addEventListener("mouseover", S.bind(this), !1)
        })
    }
    function S(e) {
        if (e.target && e.target.matches("a.nav-link span")) if (0 == p(e.target.parentElement.nextElementSibling)) {
            e.target.parentElement.nextElementSibling.classList.add("dropdown-custom-right"),
            e.target.parentElement.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
            var t = e.target.parentElement.nextElementSibling;
            Array.from(t.querySelectorAll(".menu-dropdown")).forEach(function(e) {
                e.classList.add("dropdown-custom-right")
            })
        } else
        if (1 == p(e.target.parentElement.nextElementSibling) && 1848 <= window.innerWidth) for (var a = document.getElementsByClassName("dropdown-custom-right"); 0 < a.length;) a[0].classList.remove("dropdown-custom-right");
        if (e.target && e.target.matches("a.nav-link")) if (0 == p(e.target.nextElementSibling)) {
            e.target.nextElementSibling.classList.add("dropdown-custom-right"),
            e.target.parentElement.parentElement.parentElement.classList.add("dropdown-custom-right");
            t = e.target.nextElementSibling;
            Array.from(t.querySelectorAll(".menu-dropdown")).forEach(function(e) {
                e.classList.add("dropdown-custom-right")
            })
        } else
        if (1 == p(e.target.nextElementSibling) && 1848 <= window.innerWidth) for (a = document.getElementsByClassName("dropdown-custom-right"); 0 < a.length;) a[0].classList.remove("dropdown-custom-right")
    }
    function I() {
        var e = document.documentElement.clientWidth;
        767 < e && document.querySelector(".hamburger-icon").classList.toggle("open"),
        "horizontal" === document.documentElement.getAttribute("data-layout") && (document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu")),
        "vertical" === document.documentElement.getAttribute("data-layout") && (e < 1025 && 767 < e ? (document.body.classList.remove("vertical-sidebar-enable"), "sm" == document.documentElement.getAttribute("data-sidebar-size") ? document.documentElement.setAttribute("data-sidebar-size", "") : document.documentElement.setAttribute("data-sidebar-size", "sm")) : 1025 < e ? (document.body.classList.remove("vertical-sidebar-enable"), "lg" == document.documentElement.getAttribute("data-sidebar-size") ? document.documentElement.setAttribute("data-sidebar-size", "sm") : document.documentElement.setAttribute("data-sidebar-size", "lg")) : e <= 767 && (document.body.classList.add("vertical-sidebar-enable"), document.documentElement.setAttribute("data-sidebar-size", "lg")))
    }
    function w() {
        document.addEventListener("DOMContentLoaded", function() {
            var e = document.getElementsByClassName("code-switcher");
            Array.from(e).forEach(function(a) {
                a.addEventListener("change", function() {
                    var e = a.closest(".card"),
                    t = e.querySelector(".live-preview"),
                    e = e.querySelector(".code-view");
                    a.checked ? (t.classList.add("d-none"), e.classList.remove("d-none")) : (t.classList.remove("d-none"), e.classList.add("d-none"))
                })
            }),
            feather.replace()
        }),
        window.addEventListener("resize", v),
        v(),
        Waves.init(),
        document.addEventListener("scroll", function() {
            var e;
            (e = document.getElementById("page-topbar")) && (50 <= document.body.scrollTop || 50 <= document.documentElement.scrollTop ? e.classList.add("topbar-shadow") : e.classList.remove("topbar-shadow"))
        }),
        window.addEventListener("load", function() {
            var e;
            document.documentElement.getAttribute("data-layout");
            (e = document.getElementsByClassName("vertical-overlay")) && Array.from(e).forEach(function(e) {
                e.addEventListener("click", function() {
                    document.body.classList.remove("vertical-sidebar-enable"),
                    document.documentElement.setAttribute("data-sidebar-size", sessionStorage.getItem("data-sidebar-size"))
                })
            })
        }),
        document.getElementById("topnav-hamburger-icon") && document.getElementById("topnav-hamburger-icon").addEventListener("click", I);
        var e = sessionStorage.getItem("defaultAttribute");
        JSON.parse(e),
        document.documentElement.clientWidth
    }
    function p(e) {
        if (e) {
            var t = e.offsetTop,
            a = e.offsetLeft,
            n = e.offsetWidth,
            o = e.offsetHeight;
            if (e.offsetParent) for (; e.offsetParent;) t += (e = e.offsetParent).offsetTop,
            a += e.offsetLeft;
            return t >= window.pageYOffset && a >= window.pageXOffset && t + o <= window.pageYOffset + window.innerHeight && a + n <= window.pageXOffset + window.innerWidth
        }
    }
    function L() {
        var e = document.querySelectorAll(".counter-value");
        function s(e) {
            return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        e && Array.from(e).forEach(function(o) { ! function e() {
                var t = +o.getAttribute("data-target"),
                a = +o.innerText,
                n = t / 250;
                n < 1 && (n = 1),
                a < t ? (o.innerText = (a + n).toFixed(0), setTimeout(e, 1)) : o.innerText = s(t),
                s(o.innerText)
            } ()
        })
    }
    function k() {
        document.querySelector(".navbar-menu") && (document.querySelector(".navbar-menu").innerHTML = c),
        document.getElementById("scrollbar").removeAttribute("data-simplebar"),
        document.getElementById("navbar-nav").removeAttribute("data-simplebar"),
        document.getElementById("scrollbar").classList.remove("h-100");
        var a = u,
        n = document.querySelectorAll("ul.navbar-nav > li.nav-item"),
        o = "",
        s = "";
        Array.from(n).forEach(function(e, t) {
            t + 1 === a && (s = e),
            a < t + 1 && (o += e.outerHTML, e.remove()),
            t + 1 === n.length && s.insertAdjacentHTML && s.insertAdjacentHTML("afterend", '<li class="nav-item">\t\t\t\t\t\t<a class="nav-link" href="#sidebarMore" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarMore">\t\t\t\t\t\t\t<i class="las la-briefcase"></i> More\t\t\t\t\t\t</a>\t\t\t\t\t\t<div class="collapse menu-dropdown" id="sidebarMore"><ul class="nav nav-sm flex-column">' + o + "</ul></div>\t\t\t\t\t</li>")
        })
    }
    function z(e) {
        "vertical" == e ? (document.querySelector(".navbar-menu") && (document.querySelector(".navbar-menu").innerHTML = c), document.getElementById("theme-settings-offcanvas") && (document.getElementById("sidebar-size").style.display = "block", document.getElementById("sidebar-view").style.display = "block", document.getElementById("sidebar-color").style.display = "block", document.getElementById("sidebar-img") && (document.getElementById("sidebar-img").style.display = "block"), document.getElementById("layout-position").style.display = "block", document.getElementById("layout-width").style.display = "block"), T()) : "horizontal" == e && (k(), document.getElementById("theme-settings-offcanvas") && (document.getElementById("sidebar-size").style.display = "none", document.getElementById("sidebar-view").style.display = "none", document.getElementById("sidebar-color").style.display = "none", document.getElementById("sidebar-img") && (document.getElementById("sidebar-img").style.display = "none"), document.getElementById("layout-position").style.display = "block", document.getElementById("layout-width").style.display = "block"))
    }
    function x(e) {
        if (e == e) {
            switch (e["data-layout"]) {
            case "vertical":
                q("data-layout", "vertical"),
                sessionStorage.setItem("data-layout", "vertical"),
                document.documentElement.setAttribute("data-layout", "vertical"),
                z("vertical"),
                y();
                break;
            case "horizontal":
                q("data-layout", "horizontal"),
                sessionStorage.setItem("data-layout", "horizontal"),
                document.documentElement.setAttribute("data-layout", "horizontal"),
                z("horizontal");
                break;
            default:
                "vertical" == sessionStorage.getItem("data-layout") && sessionStorage.getItem("data-layout") ? (q("data-layout", "vertical"), sessionStorage.setItem("data-layout", "vertical"), document.documentElement.setAttribute("data-layout", "vertical"), z("vertical"), y()) : "horizontal" == sessionStorage.getItem("data-layout") && (q("data-layout", "horizontal"), sessionStorage.setItem("data-layout", "horizontal"), document.documentElement.setAttribute("data-layout", "horizontal"), z("horizontal"))
            }
            switch (e["data-topbar"]) {
            case "light":
                q("data-topbar", "light"),
                sessionStorage.setItem("data-topbar", "light"),
                document.documentElement.setAttribute("data-topbar", "light");
                break;
            case "dark":
                q("data-topbar", "dark"),
                sessionStorage.setItem("data-topbar", "dark"),
                document.documentElement.setAttribute("data-topbar", "dark");
                break;
            default:
                "dark" == sessionStorage.getItem("data-topbar") ? (q("data-topbar", "dark"), sessionStorage.setItem("data-topbar", "dark"), document.documentElement.setAttribute("data-topbar", "dark")) : (q("data-topbar", "light"), sessionStorage.setItem("data-topbar", "light"), document.documentElement.setAttribute("data-topbar", "light"))
            }
            switch (e["data-layout-style"]) {
            case "default":
                q("data-layout-style", "default"),
                sessionStorage.setItem("data-layout-style", "default"),
                document.documentElement.setAttribute("data-layout-style", "default");
                break;
            case "detached":
                q("data-layout-style", "detached"),
                sessionStorage.setItem("data-layout-style", "detached"),
                document.documentElement.setAttribute("data-layout-style", "detached");
                break;
            default:
                "detached" == sessionStorage.getItem("data-layout-style") ? (q("data-layout-style", "detached"), sessionStorage.setItem("data-layout-style", "detached"), document.documentElement.setAttribute("data-layout-style", "detached")) : (q("data-layout-style", "default"), sessionStorage.setItem("data-layout-style", "default"), document.documentElement.setAttribute("data-layout-style", "default"))
            }
            switch (e["data-sidebar-size"]) {
            case "lg":
                q("data-sidebar-size", "lg"),
                document.documentElement.setAttribute("data-sidebar-size", "lg"),
                sessionStorage.setItem("data-sidebar-size", "lg");
                break;
            case "sm":
                q("data-sidebar-size", "sm"),
                document.documentElement.setAttribute("data-sidebar-size", "sm"),
                sessionStorage.setItem("data-sidebar-size", "sm");
                break;
            case "md":
                q("data-sidebar-size", "md"),
                document.documentElement.setAttribute("data-sidebar-size", "md"),
                sessionStorage.setItem("data-sidebar-size", "md");
                break;
            case "sm-hover":
                q("data-sidebar-size", "sm-hover"),
                document.documentElement.setAttribute("data-sidebar-size", "sm-hover"),
                sessionStorage.setItem("data-sidebar-size", "sm-hover");
                break;
            default:
                "sm" == sessionStorage.getItem("data-sidebar-size") ? (document.documentElement.setAttribute("data-sidebar-size", "sm"), q("data-sidebar-size", "sm"), sessionStorage.setItem("data-sidebar-size", "sm")) : "md" == sessionStorage.getItem("data-sidebar-size") ? (document.documentElement.setAttribute("data-sidebar-size", "md"), q("data-sidebar-size", "md"), sessionStorage.setItem("data-sidebar-size", "md")) : "sm-hover" == sessionStorage.getItem("data-sidebar-size") ? (document.documentElement.setAttribute("data-sidebar-size", "sm-hover"), q("data-sidebar-size", "sm-hover"), sessionStorage.setItem("data-sidebar-size", "sm-hover")) : (document.documentElement.setAttribute("data-sidebar-size", "lg"), q("data-sidebar-size", "lg"), sessionStorage.setItem("data-sidebar-size", "lg"))
            }
            switch (e["data-bs-theme"]) {
            case "light":
                q("data-bs-theme", "light"),
                document.documentElement.setAttribute("data-bs-theme", "light"),
                sessionStorage.setItem("data-bs-theme", "light");
                break;
            case "dark":
                q("data-bs-theme", "dark"),
                document.documentElement.setAttribute("data-bs-theme", "dark"),
                sessionStorage.setItem("data-bs-theme", "dark");
                break;
            default:
                sessionStorage.getItem("data-bs-theme") && "dark" == sessionStorage.getItem("data-bs-theme") ? (sessionStorage.setItem("data-bs-theme", "dark"), document.documentElement.setAttribute("data-bs-theme", "dark"), q("data-bs-theme", "dark")) : (sessionStorage.setItem("data-bs-theme", "light"), document.documentElement.setAttribute("data-bs-theme", "light"), q("data-bs-theme", "light"))
            }
            switch (e["data-layout-width"]) {
            case "fluid":
                q("data-layout-width", "fluid"),
                document.documentElement.setAttribute("data-layout-width", "fluid"),
                sessionStorage.setItem("data-layout-width", "fluid");
                break;
            case "boxed":
                q("data-layout-width", "boxed"),
                document.documentElement.setAttribute("data-layout-width", "boxed"),
                sessionStorage.setItem("data-layout-width", "boxed");
                break;
            default:
                "boxed" == sessionStorage.getItem("data-layout-width") ? (sessionStorage.setItem("data-layout-width", "boxed"), document.documentElement.setAttribute("data-layout-width", "boxed"), q("data-layout-width", "boxed")) : (sessionStorage.setItem("data-layout-width", "fluid"), document.documentElement.setAttribute("data-layout-width", "fluid"), q("data-layout-width", "fluid"))
            }
            switch (e["data-sidebar"]) {
            case "light":
                q("data-sidebar", "light"),
                sessionStorage.setItem("data-sidebar", "light"),
                document.documentElement.setAttribute("data-sidebar", "light");
                break;
            case "dark":
                q("data-sidebar", "dark"),
                sessionStorage.setItem("data-sidebar", "dark"),
                document.documentElement.setAttribute("data-sidebar", "dark");
                break;
            default:
                sessionStorage.getItem("data-sidebar") && "light" == sessionStorage.getItem("data-sidebar") ? (sessionStorage.setItem("data-sidebar", "light"), q("data-sidebar", "light"), document.documentElement.setAttribute("data-sidebar", "light")) : "dark" == sessionStorage.getItem("data-sidebar") && (sessionStorage.setItem("data-sidebar", "dark"), q("data-sidebar", "dark"), document.documentElement.setAttribute("data-sidebar", "dark"))
            }
            switch (e["data-layout-position"]) {
            case "fixed":
                q("data-layout-position", "fixed"),
                sessionStorage.setItem("data-layout-position", "fixed"),
                document.documentElement.setAttribute("data-layout-position", "fixed");
                break;
            case "scrollable":
                q("data-layout-position", "scrollable"),
                sessionStorage.setItem("data-layout-position", "scrollable"),
                document.documentElement.setAttribute("data-layout-position", "scrollable");
                break;
            default:
                sessionStorage.getItem("data-layout-position") && "scrollable" == sessionStorage.getItem("data-layout-position") ? (q("data-layout-position", "scrollable"), sessionStorage.setItem("data-layout-position", "scrollable"), document.documentElement.setAttribute("data-layout-position", "scrollable")) : (q("data-layout-position", "fixed"), sessionStorage.setItem("data-layout-position", "fixed"), document.documentElement.setAttribute("data-layout-position", "fixed"))
            }
        }
    }
    function T() {
        setTimeout(function() {
            var e, t, a = document.getElementById("navbar-nav");
            a && (a = a.querySelector(".nav-item .active"), 300 < (e = a ? a.offsetTop : 0)) && (t = document.getElementsByClassName("app-menu") ? document.getElementsByClassName("app-menu")[0] : "") && t.querySelector(".simplebar-content-wrapper") && setTimeout(function() {
                t.querySelector(".simplebar-content-wrapper").scrollTop = 330 == e ? e + 85 : e
            },
            0)
        },
        250)
    }
    function q(t, a) {
        Array.from(document.querySelectorAll("input[name=" + t + "]")).forEach(function(e) {
            a == e.value ? e.checked = !0 : e.checked = !1,
            e.addEventListener("change", function() {
                document.documentElement.setAttribute(t, e.value),
                sessionStorage.setItem(t, e.value),
                h(),
                "data-layout-width" == t && "boxed" == e.value ? (document.documentElement.setAttribute("data-sidebar-size", "sm-hover"), sessionStorage.setItem("data-sidebar-size", "sm-hover"), document.getElementById("sidebar-size-small-hover").checked = !0) : "data-layout-width" == t && "fluid" == e.value && (document.documentElement.setAttribute("data-sidebar-size", "lg"), sessionStorage.setItem("data-sidebar-size", "lg"), document.getElementById("sidebar-size-default").checked = !0),
                "data-layout" == t && ("vertical" == e.value ? (z("vertical"), y(), feather.replace()) : "horizontal" == e.value && (document.getElementById("sidebarimg-none") && document.getElementById("sidebarimg-none").click(), z("horizontal"), feather.replace()))
            })
        })
    }
    function C(e, t, a, n) {
        var o = document.getElementById(a);
        n.setAttribute(e, t),
        o && document.getElementById(a).click()
    }
    function F() {
        document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.body.classList.remove("fullscreen-enable")
    }
    function N() {
        var e;
        "horizontal" !== document.documentElement.getAttribute("data-layout") && (document.getElementById("navbar-nav") && (e = new SimpleBar(document.getElementById("navbar-nav"))) && e.getContentElement(), document.getElementsByClassName("twocolumn-iconview")[0] && (e = new SimpleBar(document.getElementsByClassName("twocolumn-iconview")[0])) && e.getContentElement(), clearTimeout(m))
    }
    sessionStorage.getItem("defaultAttribute") ? ((a = {})["data-layout"] = sessionStorage.getItem("data-layout"), a["data-sidebar-size"] = sessionStorage.getItem("data-sidebar-size"), a["data-bs-theme"] = sessionStorage.getItem("data-bs-theme"), a["data-layout-width"] = sessionStorage.getItem("data-layout-width"), a["data-sidebar"] = sessionStorage.getItem("data-sidebar"), a["data-layout-position"] = sessionStorage.getItem("data-layout-position"), a["data-layout-style"] = sessionStorage.getItem("data-layout-style"), a["data-topbar"] = sessionStorage.getItem("data-topbar"), x(a)) : (r = document.documentElement.attributes, a = {},
    Array.from(r).forEach(function(e) {
        var t;
        e && e.nodeName && "undefined" != e.nodeName && (t = e.nodeName, a[t] = e.nodeValue, sessionStorage.setItem(t, e.nodeValue))
    }), sessionStorage.setItem("defaultAttribute", JSON.stringify(a)), x(a), (r = document.querySelector('.btn[data-bs-target="#theme-settings-offcanvas"]')) && r.click()),
    n = document.getElementById("search-close-options"),
    s = document.getElementById("search-dropdown"),
    (d = document.getElementById("search-options")) && (d.addEventListener("focus", function() {
        0 < d.value.length ? (s.classList.add("show"), n.classList.remove("d-none")) : (s.classList.remove("show"), n.classList.add("d-none"))
    }), d.addEventListener("keyup", function(e) {
        var o, t;
        0 < d.value.length ? (s.classList.add("show"), n.classList.remove("d-none"), o = d.value.toLowerCase(), t = document.getElementsByClassName("notify-item"), Array.from(t).forEach(function(e) {
            var t, a, n = "";
            e.querySelector("h6") ? (t = e.getElementsByTagName("span")[0].innerText.toLowerCase(), n = (a = e.querySelector("h6").innerText.toLowerCase()).includes(o) ? a : t) : e.getElementsByTagName("span") && (n = e.getElementsByTagName("span")[0].innerText.toLowerCase()),
            n && (e.style.display = n.includes(o) ? "block" : "none")
        })) : (s.classList.remove("show"), n.classList.add("d-none"))
    }), n.addEventListener("click", function() {
        d.value = "",
        s.classList.remove("show"),
        n.classList.add("d-none")
    }), document.body.addEventListener("click", function(e) {
        "search-options" !== e.target.getAttribute("id") && (s.classList.remove("show"), n.classList.add("d-none"))
    })),
    t = document.getElementById("search-close-options"),
    o = document.getElementById("search-dropdown-reponsive"),
    e = document.getElementById("search-options-reponsive"),
    t && o && e && (e.addEventListener("focus", function() {
        0 < e.value.length ? (o.classList.add("show"), t.classList.remove("d-none")) : (o.classList.remove("show"), t.classList.add("d-none"))
    }), e.addEventListener("keyup", function() {
        0 < e.value.length ? (o.classList.add("show"), t.classList.remove("d-none")) : (o.classList.remove("show"), t.classList.add("d-none"))
    }), t.addEventListener("click", function() {
        e.value = "",
        o.classList.remove("show"),
        t.classList.add("d-none")
    }), document.body.addEventListener("click", function(e) {
        "search-options" !== e.target.getAttribute("id") && (o.classList.remove("show"), t.classList.add("d-none"))
    })),
    (r = document.querySelector('[data-toggle="fullscreen"]')) && r.addEventListener("click", function(e) {
        e.preventDefault(),
        document.body.classList.toggle("fullscreen-enable"),
        document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }),
    document.addEventListener("fullscreenchange", F),
    document.addEventListener("webkitfullscreenchange", F),
    document.addEventListener("mozfullscreenchange", F),
    l = document.getElementsByTagName("HTML")[0],
    (i = document.querySelectorAll(".light-dark-mode")) && i.length && i[0].addEventListener("click", function(e) {
        l.hasAttribute("data-bs-theme") && "dark" == l.getAttribute("data-bs-theme") ? C("data-bs-theme", "light", "layout-mode-light", l) : C("data-bs-theme", "dark", "layout-mode-dark", l)
    }),
    w(),
    L(),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(e) {
        return new bootstrap.Tooltip(e)
    }),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
        return new bootstrap.Popover(e)
    }),
    document.getElementById("reset-layout") && document.getElementById("reset-layout").addEventListener("click", function() {
        sessionStorage.clear(),
        window.location.reload()
    }),
    i = document.querySelectorAll("[data-choices]"),
    Array.from(i).forEach(function(e) {
        var t = {},
        a = e.attributes;
        a["data-choices-groups"] && (t.placeholderValue = "This is a placeholder set in the config"),
        a["data-choices-search-false"] && (t.searchEnabled = !1),
        a["data-choices-search-true"] && (t.searchEnabled = !0),
        a["data-choices-removeItem"] && (t.removeItemButton = !0),
        a["data-choices-sorting-false"] && (t.shouldSort = !1),
        a["data-choices-sorting-true"] && (t.shouldSort = !0),
        a["data-choices-multiple-remove"] && (t.removeItemButton = !0),
        a["data-choices-limit"] && (t.maxItemCount = a["data-choices-limit"].value.toString()),
        a["data-choices-limit"] && (t.maxItemCount = a["data-choices-limit"].value.toString()),
        a["data-choices-editItem-true"] && (t.maxItemCount = !0),
        a["data-choices-editItem-false"] && (t.maxItemCount = !1),
        a["data-choices-text-unique-true"] && (t.duplicateItemsAllowed = !1),
        a["data-choices-text-disabled-true"] && (t.addItems = !1),
        a["data-choices-text-disabled-true"] ? new Choices(e, t).disable() : new Choices(e, t)
    }),
    i = document.querySelectorAll("[data-provider]"),
    Array.from(i).forEach(function(e) {
        var t, a, n;
        "flatpickr" == e.getAttribute("data-provider") ? (n = e.attributes, (t = {}).disableMobile = "true", n["data-date-format"] && (t.dateFormat = n["data-date-format"].value.toString()), n["data-enable-time"] && (t.enableTime = !0, t.dateFormat = n["data-date-format"].value.toString() + " H:i"), n["data-altFormat"] && (t.altInput = !0, t.altFormat = n["data-altFormat"].value.toString()), n["data-minDate"] && (t.minDate = n["data-minDate"].value.toString(), t.dateFormat = n["data-date-format"].value.toString()), n["data-maxDate"] && (t.maxDate = n["data-maxDate"].value.toString(), t.dateFormat = n["data-date-format"].value.toString()), n["data-deafult-date"] && (t.defaultDate = n["data-deafult-date"].value.toString(), t.dateFormat = n["data-date-format"].value.toString()), n["data-multiple-date"] && (t.mode = "multiple", t.dateFormat = n["data-date-format"].value.toString()), n["data-range-date"] && (t.mode = "range", t.dateFormat = n["data-date-format"].value.toString()), n["data-inline-date"] && (t.inline = !0, t.defaultDate = n["data-deafult-date"].value.toString(), t.dateFormat = n["data-date-format"].value.toString()), n["data-disable-date"] && ((a = []).push(n["data-disable-date"].value), t.disable = a.toString().split(",")), n["data-week-number"] && ((a = []).push(n["data-week-number"].value), t.weekNumbers = !0), flatpickr(e, t)) : "timepickr" == e.getAttribute("data-provider") && (a = {},
        (n = e.attributes)["data-time-basic"] && (a.enableTime = !0, a.noCalendar = !0, a.dateFormat = "H:i"), n["data-time-hrs"] && (a.enableTime = !0, a.noCalendar = !0, a.dateFormat = "H:i", a.time_24hr = !0), n["data-min-time"] && (a.enableTime = !0, a.noCalendar = !0, a.dateFormat = "H:i", a.minTime = n["data-min-time"].value.toString()), n["data-max-time"] && (a.enableTime = !0, a.noCalendar = !0, a.dateFormat = "H:i", a.minTime = n["data-max-time"].value.toString()), n["data-default-time"] && (a.enableTime = !0, a.noCalendar = !0, a.dateFormat = "H:i", a.defaultDate = n["data-default-time"].value.toString()), n["data-time-inline"] && (a.enableTime = !0, a.noCalendar = !0, a.defaultDate = n["data-time-inline"].value.toString(), a.inline = !0), flatpickr(e, a))
    }),
    Array.from(document.querySelectorAll('.dropdown-menu a[data-bs-toggle="tab"]')).forEach(function(e) {
        e.addEventListener("click", function(e) {
            e.stopPropagation(),
            bootstrap.Tab.getInstance(e.target).show()
        })
    }),
    h(),
    y(),
    T(),
    window.addEventListener("resize", function() {
        m && clearTimeout(m),
        m = setTimeout(N, 2e3)
    })
} ();
var mybutton = document.getElementById("back-to-top");
function scrollFunction() {
    100 < document.body.scrollTop || 100 < document.documentElement.scrollTop ? mybutton.style.display = "block" : mybutton.style.display = "none"
}
function topFunction() {
    document.body.scrollTop = 0,
    document.documentElement.scrollTop = 0
}
mybutton && (window.onscroll = function() {
    scrollFunction()
});