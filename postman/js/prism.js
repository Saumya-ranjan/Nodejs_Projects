/* PrismJS 1.28.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+diff+java+json+json5+jsonp&plugins=line-highlight+line-numbers+jsonp-highlight+keep-markup+toolbar+copy-to-clipboard+download-button+match-braces+diff-highlight+treeview */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (e) {
    var n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,
      t = 0,
      r = {},
      a = {
        manual: e.Prism && e.Prism.manual,
        disableWorkerMessageHandler:
          e.Prism && e.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof i
              ? new i(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
            );
          },
          clone: function e(n, t) {
            var r, i;
            switch (((t = t || {}), a.util.type(n))) {
              case "Object":
                if (((i = a.util.objId(n)), t[i])) return t[i];
                for (var l in ((r = {}), (t[i] = r), n))
                  n.hasOwnProperty(l) && (r[l] = e(n[l], t));
                return r;
              case "Array":
                return (
                  (i = a.util.objId(n)),
                  t[i]
                    ? t[i]
                    : ((r = []),
                      (t[i] = r),
                      n.forEach(function (n, a) {
                        r[a] = e(n, t);
                      }),
                      r)
                );
              default:
                return n;
            }
          },
          getLanguage: function (e) {
            for (; e; ) {
              var t = n.exec(e.className);
              if (t) return t[1].toLowerCase();
              e = e.parentElement;
            }
            return "none";
          },
          setLanguage: function (e, t) {
            (e.className = e.className.replace(RegExp(n, "gi"), "")),
              e.classList.add("language-" + t);
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (r) {
              var e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
                [])[1];
              if (e) {
                var n = document.getElementsByTagName("script");
                for (var t in n) if (n[t].src == e) return n[t];
              }
              return null;
            }
          },
          isActive: function (e, n, t) {
            for (var r = "no-" + n; e; ) {
              var a = e.classList;
              if (a.contains(n)) return !0;
              if (a.contains(r)) return !1;
              e = e.parentElement;
            }
            return !!t;
          },
        },
        languages: {
          plain: r,
          plaintext: r,
          text: r,
          txt: r,
          extend: function (e, n) {
            var t = a.util.clone(a.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (e, n, t, r) {
            var i = (r = r || a.languages)[e],
              l = {};
            for (var o in i)
              if (i.hasOwnProperty(o)) {
                if (o == n)
                  for (var s in t) t.hasOwnProperty(s) && (l[s] = t[s]);
                t.hasOwnProperty(o) || (l[o] = i[o]);
              }
            var u = r[e];
            return (
              (r[e] = l),
              a.languages.DFS(a.languages, function (n, t) {
                t === u && n != e && (this[n] = l);
              }),
              l
            );
          },
          DFS: function e(n, t, r, i) {
            i = i || {};
            var l = a.util.objId;
            for (var o in n)
              if (n.hasOwnProperty(o)) {
                t.call(n, o, n[o], r || o);
                var s = n[o],
                  u = a.util.type(s);
                "Object" !== u || i[l(s)]
                  ? "Array" !== u || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i))
                  : ((i[l(s)] = !0), e(s, t, null, i));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          a.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          a.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            a.hooks.run("before-all-elements-highlight", r);
          for (var i, l = 0; (i = r.elements[l++]); )
            a.highlightElement(i, !0 === n, r.callback);
        },
        highlightElement: function (n, t, r) {
          var i = a.util.getLanguage(n),
            l = a.languages[i];
          a.util.setLanguage(n, i);
          var o = n.parentElement;
          o && "pre" === o.nodeName.toLowerCase() && a.util.setLanguage(o, i);
          var s = { element: n, language: i, grammar: l, code: n.textContent };
          function u(e) {
            (s.highlightedCode = e),
              a.hooks.run("before-insert", s),
              (s.element.innerHTML = s.highlightedCode),
              a.hooks.run("after-highlight", s),
              a.hooks.run("complete", s),
              r && r.call(s.element);
          }
          if (
            (a.hooks.run("before-sanity-check", s),
            (o = s.element.parentElement) &&
              "pre" === o.nodeName.toLowerCase() &&
              !o.hasAttribute("tabindex") &&
              o.setAttribute("tabindex", "0"),
            !s.code)
          )
            return a.hooks.run("complete", s), void (r && r.call(s.element));
          if ((a.hooks.run("before-highlight", s), s.grammar))
            if (t && e.Worker) {
              var c = new Worker(a.filename);
              (c.onmessage = function (e) {
                u(e.data);
              }),
                c.postMessage(
                  JSON.stringify({
                    language: s.language,
                    code: s.code,
                    immediateClose: !0,
                  })
                );
            } else u(a.highlight(s.code, s.grammar, s.language));
          else u(a.util.encode(s.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          if ((a.hooks.run("before-tokenize", r), !r.grammar))
            throw new Error(
              'The language "' + r.language + '" has no grammar.'
            );
          return (
            (r.tokens = a.tokenize(r.code, r.grammar)),
            a.hooks.run("after-tokenize", r),
            i.stringify(a.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new s();
          return (
            u(a, a.head, e),
            o(e, a, n, a.head, 0),
            (function (e) {
              for (var n = [], t = e.head.next; t !== e.tail; )
                n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = a.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = a.hooks.all[e];
            if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n);
          },
        },
        Token: i,
      };
    function i(e, n, t, r) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length);
    }
    function l(e, n, t, r) {
      e.lastIndex = n;
      var a = e.exec(t);
      if (a && r && a[1]) {
        var i = a[1].length;
        (a.index += i), (a[0] = a[0].slice(i));
      }
      return a;
    }
    function o(e, n, t, r, s, g) {
      for (var f in t)
        if (t.hasOwnProperty(f) && t[f]) {
          var h = t[f];
          h = Array.isArray(h) ? h : [h];
          for (var d = 0; d < h.length; ++d) {
            if (g && g.cause == f + "," + d) return;
            var v = h[d],
              p = v.inside,
              m = !!v.lookbehind,
              y = !!v.greedy,
              k = v.alias;
            if (y && !v.pattern.global) {
              var x = v.pattern.toString().match(/[imsuy]*$/)[0];
              v.pattern = RegExp(v.pattern.source, x + "g");
            }
            for (
              var b = v.pattern || v, w = r.next, A = s;
              w !== n.tail && !(g && A >= g.reach);
              A += w.value.length, w = w.next
            ) {
              var E = w.value;
              if (n.length > e.length) return;
              if (!(E instanceof i)) {
                var P,
                  L = 1;
                if (y) {
                  if (!(P = l(b, A, e, m)) || P.index >= e.length) break;
                  var S = P.index,
                    O = P.index + P[0].length,
                    j = A;
                  for (j += w.value.length; S >= j; )
                    j += (w = w.next).value.length;
                  if (((A = j -= w.value.length), w.value instanceof i))
                    continue;
                  for (
                    var C = w;
                    C !== n.tail && (j < O || "string" == typeof C.value);
                    C = C.next
                  )
                    L++, (j += C.value.length);
                  L--, (E = e.slice(A, j)), (P.index -= A);
                } else if (!(P = l(b, 0, E, m))) continue;
                S = P.index;
                var N = P[0],
                  _ = E.slice(0, S),
                  M = E.slice(S + N.length),
                  W = A + E.length;
                g && W > g.reach && (g.reach = W);
                var z = w.prev;
                if (
                  (_ && ((z = u(n, z, _)), (A += _.length)),
                  c(n, z, L),
                  (w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))),
                  M && u(n, w, M),
                  L > 1)
                ) {
                  var I = { cause: f + "," + d, reach: W };
                  o(e, n, t, w.prev, A, I),
                    g && I.reach > g.reach && (g.reach = I.reach);
                }
              }
            }
          }
        }
    }
    function s() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function u(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function c(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      (n.next = r), (r.prev = n), (e.length -= a);
    }
    if (
      ((e.Prism = a),
      (i.stringify = function e(n, t) {
        if ("string" == typeof n) return n;
        if (Array.isArray(n)) {
          var r = "";
          return (
            n.forEach(function (n) {
              r += e(n, t);
            }),
            r
          );
        }
        var i = {
            type: n.type,
            content: e(n.content, t),
            tag: "span",
            classes: ["token", n.type],
            attributes: {},
            language: t,
          },
          l = n.alias;
        l &&
          (Array.isArray(l)
            ? Array.prototype.push.apply(i.classes, l)
            : i.classes.push(l)),
          a.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes)
          o +=
            " " +
            s +
            '="' +
            (i.attributes[s] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          i.tag +
          ' class="' +
          i.classes.join(" ") +
          '"' +
          o +
          ">" +
          i.content +
          "</" +
          i.tag +
          ">"
        );
      }),
      !e.document)
    )
      return e.addEventListener
        ? (a.disableWorkerMessageHandler ||
            e.addEventListener(
              "message",
              function (n) {
                var t = JSON.parse(n.data),
                  r = t.language,
                  i = t.code,
                  l = t.immediateClose;
                e.postMessage(a.highlight(i, a.languages[r], r)),
                  l && e.close();
              },
              !1
            ),
          a)
        : a;
    var g = a.util.currentScript();
    function f() {
      a.manual || a.highlightAll();
    }
    if (
      (g &&
        ((a.filename = g.src),
        g.hasAttribute("data-manual") && (a.manual = !0)),
      !a.manual)
    ) {
      var h = document.readyState;
      "loading" === h || ("interactive" === h && g && g.defer)
        ? document.addEventListener("DOMContentLoaded", f)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(f)
        : window.setTimeout(f, 16);
    }
    return a;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/i,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "special-attr": [],
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            { pattern: /^=/, alias: "attr-equals" },
            { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
          ],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var t = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      t["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var n = {};
      (n[a] = {
        pattern: RegExp(
          "(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t,
      }),
        Prism.languages.insertBefore("markup", "cdata", n);
    },
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addAttribute", {
    value: function (a, e) {
      Prism.languages.markup.tag.inside["special-attr"].push({
        pattern: RegExp(
          "(^|[\"'\\s])(?:" +
            a +
            ")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))",
          "i"
        ),
        lookbehind: !0,
        inside: {
          "attr-name": /^[^\s=]+/,
          "attr-value": {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, "language-" + e],
                inside: Prism.languages[e],
              },
              punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
            },
          },
        },
      });
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e =
    /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp(
        "@[\\w-](?:[^;{\\s\"']|\\s+(?!\\s)|" + e.source + ")*?(?:;|(?=\\s*\\{))"
      ),
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0,
        },
      },
    },
    url: {
      pattern: RegExp(
        "\\burl\\((?:" + e.source + "|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)",
        "i"
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp("^" + e.source + "$"), alias: "url" },
      },
    },
    selector: {
      pattern: RegExp(
        "(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|" +
          e.source +
          ")*(?=\\s*\\{)"
      ),
      lookbehind: !0,
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern:
        /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0,
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t && (t.tag.addInlined("style", "css"), t.tag.addAttribute("style", "css"));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      "(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"
    ),
    lookbehind: !0,
  },
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern: RegExp(
        "((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        "regex-source": {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: "language-regex",
          inside: Prism.languages.regex,
        },
        "regex-delimiter": /^\/|\/$/,
        "regex-flags": /^[a-z]+$/,
      },
    },
    "function-variable": {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: "comment" },
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\$\{|\}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
    "string-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: "property",
    },
  }),
  Prism.languages.insertBefore("javascript", "operator", {
    "literal-property": {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: "property",
    },
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined("script", "javascript"),
    Prism.languages.markup.tag.addAttribute(
      "on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)",
      "javascript"
    )),
  (Prism.languages.js = Prism.languages.javascript);
!(function (e) {
  e.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d.*$/m],
  };
  var n = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!",
  };
  Object.keys(n).forEach(function (a) {
    var i = n[a],
      r = [];
    /^\w+$/.test(a) || r.push(/\w+/.exec(a)[0]),
      "diff" === a && r.push("bold"),
      (e.languages.diff[a] = {
        pattern: RegExp("^(?:[" + i + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
        alias: r,
        inside: {
          line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
          prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(a)[0] },
        },
      });
  }),
    Object.defineProperty(e.languages.diff, "PREFIXES", { value: n });
})(Prism);
!(function (e) {
  var n =
      /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    t = "(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*",
    s = {
      pattern: RegExp("(^|[^\\w.])" + t + "[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b"),
      lookbehind: !0,
      inside: {
        namespace: {
          pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
          inside: { punctuation: /\./ },
        },
        punctuation: /\./,
      },
    };
  (e.languages.java = e.languages.extend("clike", {
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: !0,
      greedy: !0,
    },
    "class-name": [
      s,
      {
        pattern: RegExp(
          "(^|[^\\w.])" +
            t +
            "[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)"
        ),
        lookbehind: !0,
        inside: s.inside,
      },
      {
        pattern: RegExp(
          "(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)" +
            t +
            "[A-Z]\\w*\\b"
        ),
        lookbehind: !0,
        inside: s.inside,
      },
    ],
    keyword: n,
    function: [
      e.languages.clike.function,
      { pattern: /(::\s*)[a-z_]\w*/, lookbehind: !0 },
    ],
    number:
      /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern:
        /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0,
    },
  })),
    e.languages.insertBefore("java", "string", {
      "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: "string",
      },
      char: { pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/, greedy: !0 },
    }),
    e.languages.insertBefore("java", "class-name", {
      annotation: {
        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
        lookbehind: !0,
        alias: "punctuation",
      },
      generics: {
        pattern:
          /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: {
          "class-name": s,
          keyword: n,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/,
        },
      },
      import: [
        {
          pattern: RegExp("(\\bimport\\s+)" + t + "(?:[A-Z]\\w*|\\*)(?=\\s*;)"),
          lookbehind: !0,
          inside: {
            namespace: s.inside.namespace,
            punctuation: /\./,
            operator: /\*/,
            "class-name": /\w+/,
          },
        },
        {
          pattern: RegExp(
            "(\\bimport\\s+static\\s+)" + t + "(?:\\w+|\\*)(?=\\s*;)"
          ),
          lookbehind: !0,
          alias: "static",
          inside: {
            namespace: s.inside.namespace,
            static: /\b\w+$/,
            punctuation: /\./,
            operator: /\*/,
            "class-name": /\w+/,
          },
        },
      ],
      namespace: {
        pattern: RegExp(
          "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
            /<keyword>/g,
            function () {
              return n.source;
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
      },
    });
})(Prism);
(Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0,
  },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: { pattern: /\bnull\b/, alias: "keyword" },
}),
  (Prism.languages.webmanifest = Prism.languages.json);
!(function (n) {
  var e = /("|')(?:\\(?:\r\n?|\n|.)|(?!\1)[^\\\r\n])*\1/;
  n.languages.json5 = n.languages.extend("json", {
    property: [
      { pattern: RegExp(e.source + "(?=\\s*:)"), greedy: !0 },
      {
        pattern:
          /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/,
        alias: "unquoted",
      },
    ],
    string: { pattern: e, greedy: !0 },
    number:
      /[+-]?\b(?:NaN|Infinity|0x[a-fA-F\d]+)\b|[+-]?(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[eE][+-]?\d+\b)?/,
  });
})(Prism);
(Prism.languages.jsonp = Prism.languages.extend("json", {
  punctuation: /[{}[\]();,.]/,
})),
  Prism.languages.insertBefore("jsonp", "punctuation", {
    function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/,
  });
!(function () {
  if (
    "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    document.querySelector
  ) {
    var e,
      t = "line-numbers",
      i = "linkable-line-numbers",
      n = !0;
    Prism.plugins.lineHighlight = {
      highlightLines: function (r, a, u) {
        var c = (a =
            "string" == typeof a ? a : r.getAttribute("data-line") || "")
            .replace(/\s+/g, "")
            .split(",")
            .filter(Boolean),
          d = +r.getAttribute("data-line-offset") || 0,
          h = (
            (function () {
              if (void 0 === e) {
                var t = document.createElement("div");
                (t.style.fontSize = "13px"),
                  (t.style.lineHeight = "1.5"),
                  (t.style.padding = "0"),
                  (t.style.border = "0"),
                  (t.innerHTML = "&nbsp;<br />&nbsp;"),
                  document.body.appendChild(t),
                  (e = 38 === t.offsetHeight),
                  document.body.removeChild(t);
              }
              return e;
            })()
              ? parseInt
              : parseFloat
          )(getComputedStyle(r).lineHeight),
          f = Prism.util.isActive(r, t),
          p = r.querySelector("code"),
          g = f ? r : p || r,
          m = [],
          v =
            p && g != p
              ? (function (e, t) {
                  var i = getComputedStyle(e),
                    n = getComputedStyle(t);
                  function r(e) {
                    return +e.substr(0, e.length - 2);
                  }
                  return (
                    t.offsetTop +
                    r(n.borderTopWidth) +
                    r(n.paddingTop) -
                    r(i.paddingTop)
                  );
                })(r, p)
              : 0;
        c.forEach(function (e) {
          var t = e.split("-"),
            i = +t[0],
            n = +t[1] || i,
            o =
              r.querySelector('.line-highlight[data-range="' + e + '"]') ||
              document.createElement("div");
          if (
            (m.push(function () {
              o.setAttribute("aria-hidden", "true"),
                o.setAttribute("data-range", e),
                (o.className = (u || "") + " line-highlight");
            }),
            f && Prism.plugins.lineNumbers)
          ) {
            var s = Prism.plugins.lineNumbers.getLine(r, i),
              l = Prism.plugins.lineNumbers.getLine(r, n);
            if (s) {
              var a = s.offsetTop + v + "px";
              m.push(function () {
                o.style.top = a;
              });
            }
            if (l) {
              var c = l.offsetTop - s.offsetTop + l.offsetHeight + "px";
              m.push(function () {
                o.style.height = c;
              });
            }
          } else
            m.push(function () {
              o.setAttribute("data-start", String(i)),
                n > i && o.setAttribute("data-end", String(n)),
                (o.style.top = (i - d - 1) * h + v + "px"),
                (o.textContent = new Array(n - i + 2).join(" \n"));
            });
          m.push(function () {
            o.style.width = r.scrollWidth + "px";
          }),
            m.push(function () {
              g.appendChild(o);
            });
        });
        var y = r.id;
        if (f && Prism.util.isActive(r, i) && y) {
          s(r, i) ||
            m.push(function () {
              r.classList.add(i);
            });
          var b = parseInt(r.getAttribute("data-start") || "1");
          o(".line-numbers-rows > span", r).forEach(function (e, t) {
            var i = t + b;
            e.onclick = function () {
              var e = y + "." + i;
              (n = !1),
                (location.hash = e),
                setTimeout(function () {
                  n = !0;
                }, 1);
            };
          });
        }
        return function () {
          m.forEach(l);
        };
      },
    };
    var r = 0;
    Prism.hooks.add("before-sanity-check", function (e) {
      var t = e.element.parentElement;
      if (a(t)) {
        var i = 0;
        o(".line-highlight", t).forEach(function (e) {
          (i += e.textContent.length), e.parentNode.removeChild(e);
        }),
          i &&
            /^(?: \n)+$/.test(e.code.slice(-i)) &&
            (e.code = e.code.slice(0, -i));
      }
    }),
      Prism.hooks.add("complete", function e(i) {
        var n = i.element.parentElement;
        if (a(n)) {
          clearTimeout(r);
          var o = Prism.plugins.lineNumbers,
            l = i.plugins && i.plugins.lineNumbers;
          s(n, t) && o && !l
            ? Prism.hooks.add("line-numbers", e)
            : (Prism.plugins.lineHighlight.highlightLines(n)(),
              (r = setTimeout(u, 1)));
        }
      }),
      window.addEventListener("hashchange", u),
      window.addEventListener("resize", function () {
        o("pre")
          .filter(a)
          .map(function (e) {
            return Prism.plugins.lineHighlight.highlightLines(e);
          })
          .forEach(l);
      });
  }
  function o(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e));
  }
  function s(e, t) {
    return e.classList.contains(t);
  }
  function l(e) {
    e();
  }
  function a(e) {
    return !!(
      e &&
      /pre/i.test(e.nodeName) &&
      (e.hasAttribute("data-line") || (e.id && Prism.util.isActive(e, i)))
    );
  }
  function u() {
    var e = location.hash.slice(1);
    o(".temporary.line-highlight").forEach(function (e) {
      e.parentNode.removeChild(e);
    });
    var t = (e.match(/\.([\d,-]+)$/) || [, ""])[1];
    if (t && !document.getElementById(e)) {
      var i = e.slice(0, e.lastIndexOf(".")),
        r = document.getElementById(i);
      r &&
        (r.hasAttribute("data-line") || r.setAttribute("data-line", ""),
        Prism.plugins.lineHighlight.highlightLines(r, t, "temporary ")(),
        n &&
          document.querySelector(".temporary.line-highlight").scrollIntoView());
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e = "line-numbers",
      n = /\n(?!$)/g,
      t = (Prism.plugins.lineNumbers = {
        getLine: function (n, t) {
          if ("PRE" === n.tagName && n.classList.contains(e)) {
            var i = n.querySelector(".line-numbers-rows");
            if (i) {
              var r = parseInt(n.getAttribute("data-start"), 10) || 1,
                s = r + (i.children.length - 1);
              t < r && (t = r), t > s && (t = s);
              var l = t - r;
              return i.children[l];
            }
          }
        },
        resize: function (e) {
          r([e]);
        },
        assumeViewportIndependence: !0,
      }),
      i = void 0;
    window.addEventListener("resize", function () {
      (t.assumeViewportIndependence && i === window.innerWidth) ||
        ((i = window.innerWidth),
        r(
          Array.prototype.slice.call(
            document.querySelectorAll("pre.line-numbers")
          )
        ));
    }),
      Prism.hooks.add("complete", function (t) {
        if (t.code) {
          var i = t.element,
            s = i.parentNode;
          if (
            s &&
            /pre/i.test(s.nodeName) &&
            !i.querySelector(".line-numbers-rows") &&
            Prism.util.isActive(i, e)
          ) {
            i.classList.remove(e), s.classList.add(e);
            var l,
              o = t.code.match(n),
              a = o ? o.length + 1 : 1,
              u = new Array(a + 1).join("<span></span>");
            (l = document.createElement("span")).setAttribute(
              "aria-hidden",
              "true"
            ),
              (l.className = "line-numbers-rows"),
              (l.innerHTML = u),
              s.hasAttribute("data-start") &&
                (s.style.counterReset =
                  "linenumber " +
                  (parseInt(s.getAttribute("data-start"), 10) - 1)),
              t.element.appendChild(l),
              r([s]),
              Prism.hooks.run("line-numbers", t);
          }
        }
      }),
      Prism.hooks.add("line-numbers", function (e) {
        (e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
      });
  }
  function r(e) {
    if (
      0 !=
      (e = e.filter(function (e) {
        var n,
          t = ((n = e),
          n
            ? window.getComputedStyle
              ? getComputedStyle(n)
              : n.currentStyle || null
            : null)["white-space"];
        return "pre-wrap" === t || "pre-line" === t;
      })).length
    ) {
      var t = e
        .map(function (e) {
          var t = e.querySelector("code"),
            i = e.querySelector(".line-numbers-rows");
          if (t && i) {
            var r = e.querySelector(".line-numbers-sizer"),
              s = t.textContent.split(n);
            r ||
              (((r = document.createElement("span")).className =
                "line-numbers-sizer"),
              t.appendChild(r)),
              (r.innerHTML = "0"),
              (r.style.display = "block");
            var l = r.getBoundingClientRect().height;
            return (
              (r.innerHTML = ""),
              {
                element: e,
                lines: s,
                lineHeights: [],
                oneLinerHeight: l,
                sizer: r,
              }
            );
          }
        })
        .filter(Boolean);
      t.forEach(function (e) {
        var n = e.sizer,
          t = e.lines,
          i = e.lineHeights,
          r = e.oneLinerHeight;
        (i[t.length - 1] = void 0),
          t.forEach(function (e, t) {
            if (e && e.length > 1) {
              var s = n.appendChild(document.createElement("span"));
              (s.style.display = "block"), (s.textContent = e);
            } else i[t] = r;
          });
      }),
        t.forEach(function (e) {
          for (
            var n = e.sizer, t = e.lineHeights, i = 0, r = 0;
            r < t.length;
            r++
          )
            void 0 === t[r] &&
              (t[r] = n.children[i++].getBoundingClientRect().height);
        }),
        t.forEach(function (e) {
          var n = e.sizer,
            t = e.element.querySelector(".line-numbers-rows");
          (n.style.display = "none"),
            (n.innerHTML = ""),
            e.lineHeights.forEach(function (e, n) {
              t.children[n].style.height = e + "px";
            });
        });
    }
  }
})();
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var t = [];
    o(function (t) {
      if (t && t.meta && t.data) {
        if (t.meta.status && t.meta.status >= 400)
          return "Error: " + (t.data.message || t.meta.status);
        if ("string" == typeof t.data.content)
          return "function" == typeof atob
            ? atob(t.data.content.replace(/\s/g, ""))
            : "Your browser cannot decode base64";
      }
      return null;
    }, "github"),
      o(function (t, e) {
        if (t && t.meta && t.data && t.data.files) {
          if (t.meta.status && t.meta.status >= 400)
            return "Error: " + (t.data.message || t.meta.status);
          var n = t.data.files,
            a = e.getAttribute("data-filename");
          if (null == a)
            for (var r in n)
              if (n.hasOwnProperty(r)) {
                a = r;
                break;
              }
          return void 0 !== n[a]
            ? n[a].content
            : "Error: unknown or missing gist file " + a;
        }
        return null;
      }, "gist"),
      o(function (t) {
        return t && t.node && "string" == typeof t.data ? t.data : null;
      }, "bitbucket");
    var e = 0,
      n = "data-jsonp-status",
      a = "failed",
      r =
        'pre[data-jsonp]:not([data-jsonp-status="loaded"]):not([data-jsonp-status="loading"])';
    Prism.hooks.add("before-highlightall", function (t) {
      t.selector += ", " + r;
    }),
      Prism.hooks.add("before-sanity-check", function (o) {
        var i,
          u = o.element;
        if (u.matches(r)) {
          (o.code = ""), u.setAttribute(n, "loading");
          var s = u.appendChild(document.createElement("CODE"));
          s.textContent = "Loading…";
          var d = o.language;
          s.className = "language-" + d;
          var f = Prism.plugins.autoloader;
          f && f.loadLanguages(d);
          var l = u.getAttribute("data-adapter"),
            c = null;
          if (l) {
            if ("function" != typeof window[l])
              return (
                u.setAttribute(n, a),
                void (s.textContent =
                  ((i = l),
                  '✖ Error: JSONP adapter function "' + i + "\" doesn't exist"))
              );
            c = window[l];
          }
          var p = u.getAttribute("data-jsonp");
          !(function (r, o, i, d) {
            var f = "prismjsonp" + e++,
              l = document.createElement("a");
            (l.href = r),
              (l.href += (l.search ? "&" : "?") + (o || "callback") + "=" + f);
            var p = document.createElement("script");
            (p.src = l.href),
              (p.onerror = function () {
                g(), d();
              });
            var m = setTimeout(function () {
              g(), d();
            }, Prism.plugins.jsonphighlight.timeout);
            function g() {
              clearTimeout(m), document.head.removeChild(p), delete window[f];
            }
            (window[f] = function (e) {
              g(),
                (function (e) {
                  var r = null;
                  if (c) r = c(e, u);
                  else
                    for (
                      var o = 0, i = t.length;
                      o < i && null === (r = t[o].adapter(e, u));
                      o++
                    );
                  null === r
                    ? (u.setAttribute(n, a),
                      (s.textContent =
                        "✖ Error: Cannot parse response (perhaps you need an adapter function?)"))
                    : (u.setAttribute(n, "loaded"),
                      (s.textContent = r),
                      Prism.highlightElement(s));
                })(e);
            }),
              document.head.appendChild(p);
          })(p, u.getAttribute("data-callback"), 0, function () {
            u.setAttribute(n, a),
              (s.textContent = "✖ Error: Timeout loading " + p);
          });
        }
      }),
      (Prism.plugins.jsonphighlight = {
        timeout: 5e3,
        registerAdapter: o,
        removeAdapter: function (e) {
          if (("string" == typeof e && (e = i(e)), "function" == typeof e)) {
            var n = t.findIndex(function (t) {
              return t.adapter === e;
            });
            n >= 0 && t.splice(n, 1);
          }
        },
        highlight: function (t) {
          for (
            var e, n = (t || document).querySelectorAll(r), a = 0;
            (e = n[a++]);

          )
            Prism.highlightElement(e);
        },
      });
  }
  function o(e, n) {
    (n = n || e.name),
      "function" != typeof e || i(e) || i(n) || t.push({ adapter: e, name: n });
  }
  function i(e) {
    if ("function" == typeof e) {
      for (var n = 0; (a = t[n++]); )
        if (a.adapter.valueOf() === e.valueOf()) return a.adapter;
    } else if ("string" == typeof e) {
      var a;
      for (n = 0; (a = t[n++]); ) if (a.name === e) return a.adapter;
    }
    return null;
  }
})();
"undefined" != typeof Prism &&
  "undefined" != typeof document &&
  document.createRange &&
  ((Prism.plugins.KeepMarkup = !0),
  Prism.hooks.add("before-highlight", function (e) {
    if (
      e.element.children.length &&
      Prism.util.isActive(e.element, "keep-markup", !0)
    ) {
      var n = Prism.util.isActive(e.element, "drop-tokens", !1),
        t = 0,
        o = [];
      r(e.element), o.length && (e.keepMarkup = o);
    }
    function d(e) {
      if (
        (function (e) {
          return (
            !n ||
            "span" !== e.nodeName.toLowerCase() ||
            !e.classList.contains("token")
          );
        })(e)
      ) {
        var d = { element: e, posOpen: t };
        o.push(d), r(e), (d.posClose = t);
      } else r(e);
    }
    function r(e) {
      for (var n = 0, o = e.childNodes.length; n < o; n++) {
        var r = e.childNodes[n];
        1 === r.nodeType ? d(r) : 3 === r.nodeType && (t += r.data.length);
      }
    }
  }),
  Prism.hooks.add("after-highlight", function (e) {
    if (e.keepMarkup && e.keepMarkup.length) {
      var n = function (e, t) {
        for (var o = 0, d = e.childNodes.length; o < d; o++) {
          var r = e.childNodes[o];
          if (1 === r.nodeType) {
            if (!n(r, t)) return !1;
          } else
            3 === r.nodeType &&
              (!t.nodeStart &&
                t.pos + r.data.length > t.node.posOpen &&
                ((t.nodeStart = r), (t.nodeStartPos = t.node.posOpen - t.pos)),
              t.nodeStart &&
                t.pos + r.data.length >= t.node.posClose &&
                ((t.nodeEnd = r), (t.nodeEndPos = t.node.posClose - t.pos)),
              (t.pos += r.data.length));
          if (t.nodeStart && t.nodeEnd) {
            var s = document.createRange();
            return (
              s.setStart(t.nodeStart, t.nodeStartPos),
              s.setEnd(t.nodeEnd, t.nodeEndPos),
              (t.node.element.innerHTML = ""),
              t.node.element.appendChild(s.extractContents()),
              s.insertNode(t.node.element),
              s.detach(),
              !1
            );
          }
        }
        return !0;
      };
      e.keepMarkup.forEach(function (t) {
        n(e.element, { node: t, pos: 0 });
      }),
        (e.highlightedCode = e.element.innerHTML);
    }
  }));
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e = [],
      t = {},
      n = function () {};
    Prism.plugins.toolbar = {};
    var a = (Prism.plugins.toolbar.registerButton = function (n, a) {
        var r;
        (r =
          "function" == typeof a
            ? a
            : function (e) {
                var t;
                return (
                  "function" == typeof a.onClick
                    ? (((t = document.createElement("button")).type = "button"),
                      t.addEventListener("click", function () {
                        a.onClick.call(this, e);
                      }))
                    : "string" == typeof a.url
                    ? ((t = document.createElement("a")).href = a.url)
                    : (t = document.createElement("span")),
                  a.className && t.classList.add(a.className),
                  (t.textContent = a.text),
                  t
                );
              }),
          n in t
            ? console.warn(
                'There is a button with the key "' + n + '" registered already.'
              )
            : e.push((t[n] = r));
      }),
      r = (Prism.plugins.toolbar.hook = function (a) {
        var r = a.element.parentNode;
        if (
          r &&
          /pre/i.test(r.nodeName) &&
          !r.parentNode.classList.contains("code-toolbar")
        ) {
          var o = document.createElement("div");
          o.classList.add("code-toolbar"),
            r.parentNode.insertBefore(o, r),
            o.appendChild(r);
          var i = document.createElement("div");
          i.classList.add("toolbar");
          var l = e,
            d = (function (e) {
              for (; e; ) {
                var t = e.getAttribute("data-toolbar-order");
                if (null != t)
                  return (t = t.trim()).length ? t.split(/\s*,\s*/g) : [];
                e = e.parentElement;
              }
            })(a.element);
          d &&
            (l = d.map(function (e) {
              return t[e] || n;
            })),
            l.forEach(function (e) {
              var t = e(a);
              if (t) {
                var n = document.createElement("div");
                n.classList.add("toolbar-item"),
                  n.appendChild(t),
                  i.appendChild(n);
              }
            }),
            o.appendChild(i);
        }
      });
    a("label", function (e) {
      var t = e.element.parentNode;
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute("data-label")) {
        var n,
          a,
          r = t.getAttribute("data-label");
        try {
          a = document.querySelector("template#" + r);
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute("data-url")
                ? ((n = document.createElement("a")).href =
                    t.getAttribute("data-url"))
                : (n = document.createElement("span")),
              (n.textContent = r)),
          n
        );
      }
    }),
      Prism.hooks.add("complete", r);
  }
})();
!(function () {
  function t(t) {
    var e = document.createElement("textarea");
    (e.value = t.getText()),
      (e.style.top = "0"),
      (e.style.left = "0"),
      (e.style.position = "fixed"),
      document.body.appendChild(e),
      e.focus(),
      e.select();
    try {
      var o = document.execCommand("copy");
      setTimeout(function () {
        o ? t.success() : t.error();
      }, 1);
    } catch (e) {
      setTimeout(function () {
        t.error(e);
      }, 1);
    }
    document.body.removeChild(e);
  }
  "undefined" != typeof Prism &&
    "undefined" != typeof document &&
    (Prism.plugins.toolbar
      ? Prism.plugins.toolbar.registerButton("copy-to-clipboard", function (e) {
          var o = e.element,
            n = (function (t) {
              var e = {
                copy: "Copy",
                "copy-error": "Press Ctrl+C to copy",
                "copy-success": "Copied!",
                "copy-timeout": 5e3,
              };
              for (var o in e) {
                for (
                  var n = "data-prismjs-" + o, c = t;
                  c && !c.hasAttribute(n);

                )
                  c = c.parentElement;
                c && (e[o] = c.getAttribute(n));
              }
              return e;
            })(o),
            c = document.createElement("button");
          (c.className = "copy-to-clipboard-button"),
            c.setAttribute("type", "button");
          var r = document.createElement("span");
          return (
            c.appendChild(r),
            u("copy"),
            (function (e, o) {
              e.addEventListener("click", function () {
                !(function (e) {
                  navigator.clipboard
                    ? navigator.clipboard
                        .writeText(e.getText())
                        .then(e.success, function () {
                          t(e);
                        })
                    : t(e);
                })(o);
              });
            })(c, {
              getText: function () {
                return o.textContent;
              },
              success: function () {
                u("copy-success"), i();
              },
              error: function () {
                u("copy-error"),
                  setTimeout(function () {
                    !(function (t) {
                      window.getSelection().selectAllChildren(t);
                    })(o);
                  }, 1),
                  i();
              },
            }),
            c
          );
          function i() {
            setTimeout(function () {
              u("copy");
            }, n["copy-timeout"]);
          }
          function u(t) {
            (r.textContent = n[t]), c.setAttribute("data-copy-state", t);
          }
        })
      : console.warn("Copy to Clipboard plugin loaded before Toolbar plugin."));
})();
"undefined" != typeof Prism &&
  "undefined" != typeof document &&
  document.querySelector &&
  Prism.plugins.toolbar.registerButton("download-file", function (t) {
    var e = t.element.parentNode;
    if (
      e &&
      /pre/i.test(e.nodeName) &&
      e.hasAttribute("data-src") &&
      e.hasAttribute("data-download-link")
    ) {
      var n = e.getAttribute("data-src"),
        a = document.createElement("a");
      return (
        (a.textContent =
          e.getAttribute("data-download-link-label") || "Download"),
        a.setAttribute("download", ""),
        (a.href = n),
        a
      );
    }
  });
!(function () {
  if ("undefined" != typeof Prism && "undefined" != typeof document) {
    var e = { "(": ")", "[": "]", "{": "}" },
      t = { "(": "brace-round", "[": "brace-square", "{": "brace-curly" },
      n = { "${": "{" },
      r = 0,
      c = /^(pair-\d+-)(close|open)$/;
    Prism.hooks.add("complete", function (c) {
      var i = c.element,
        d = i.parentElement;
      if (d && "PRE" == d.tagName) {
        var u = [];
        if (
          (Prism.util.isActive(i, "match-braces") && u.push("(", "[", "{"),
          0 != u.length)
        ) {
          d.__listenerAdded ||
            (d.addEventListener("mousedown", function () {
              var e = d.querySelector("code"),
                t = s("brace-selected");
              Array.prototype.slice
                .call(e.querySelectorAll("." + t))
                .forEach(function (e) {
                  e.classList.remove(t);
                });
            }),
            Object.defineProperty(d, "__listenerAdded", { value: !0 }));
          var f = Array.prototype.slice.call(
              i.querySelectorAll("span." + s("token") + "." + s("punctuation"))
            ),
            h = [];
          u.forEach(function (c) {
            for (
              var i = e[c], d = s(t[c]), u = [], p = [], v = 0;
              v < f.length;
              v++
            ) {
              var m = f[v];
              if (0 == m.childElementCount) {
                var b = m.textContent;
                (b = n[b] || b) === c
                  ? (h.push({ index: v, open: !0, element: m }),
                    m.classList.add(d),
                    m.classList.add(s("brace-open")),
                    p.push(v))
                  : b === i &&
                    (h.push({ index: v, open: !1, element: m }),
                    m.classList.add(d),
                    m.classList.add(s("brace-close")),
                    p.length && u.push([v, p.pop()]));
              }
            }
            u.forEach(function (e) {
              var t = "pair-" + r++ + "-",
                n = f[e[0]],
                c = f[e[1]];
              (n.id = t + "open"),
                (c.id = t + "close"),
                [n, c].forEach(function (e) {
                  e.addEventListener("mouseenter", a),
                    e.addEventListener("mouseleave", o),
                    e.addEventListener("click", l);
                });
            });
          });
          var p = 0;
          h.sort(function (e, t) {
            return e.index - t.index;
          }),
            h.forEach(function (e) {
              e.open
                ? (e.element.classList.add(s("brace-level-" + ((p % 12) + 1))),
                  p++)
                : ((p = Math.max(0, p - 1)),
                  e.element.classList.add(s("brace-level-" + ((p % 12) + 1))));
            });
        }
      }
    });
  }
  function s(e) {
    var t = Prism.plugins.customClass;
    return t ? t.apply(e, "none") : e;
  }
  function i(e) {
    var t = c.exec(e.id);
    return document.querySelector(
      "#" + t[1] + ("open" == t[2] ? "close" : "open")
    );
  }
  function a() {
    Prism.util.isActive(this, "brace-hover", !0) &&
      [this, i(this)].forEach(function (e) {
        e.classList.add(s("brace-hover"));
      });
  }
  function o() {
    [this, i(this)].forEach(function (e) {
      e.classList.remove(s("brace-hover"));
    });
  }
  function l() {
    Prism.util.isActive(this, "brace-select", !0) &&
      [this, i(this)].forEach(function (e) {
        e.classList.add(s("brace-selected"));
      });
  }
})();
!(function () {
  if ("undefined" != typeof Prism) {
    var e = /^diff-([\w-]+)/i,
      i =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,
      a = RegExp(
        "(?:__|[^\r\n<])*(?:\r\n?|\n|(?:__|[^\r\n<])(?![^\r\n]))".replace(
          /__/g,
          function () {
            return i.source;
          }
        ),
        "gi"
      ),
      s = !1;
    Prism.hooks.add("before-sanity-check", function (i) {
      var a = i.language;
      e.test(a) &&
        !i.grammar &&
        (i.grammar = Prism.languages[a] = Prism.languages.diff);
    }),
      Prism.hooks.add("before-tokenize", function (i) {
        s ||
          Prism.languages.diff ||
          Prism.plugins.autoloader ||
          ((s = !0),
          console.warn(
            "Prism's Diff Highlight plugin requires the Diff language definition (prism-diff.js).Make sure the language definition is loaded or use Prism's Autoloader plugin."
          ));
        var a = i.language;
        e.test(a) &&
          !Prism.languages[a] &&
          (Prism.languages[a] = Prism.languages.diff);
      }),
      Prism.hooks.add("wrap", function (s) {
        var r, n;
        if ("diff" !== s.language) {
          var g = e.exec(s.language);
          if (!g) return;
          (r = g[1]), (n = Prism.languages[r]);
        }
        var f = Prism.languages.diff && Prism.languages.diff.PREFIXES;
        if (f && s.type in f) {
          var u,
            l = s.content
              .replace(i, "")
              .replace(/&lt;/g, "<")
              .replace(/&amp;/g, "&"),
            t = l.replace(/(^|[\r\n])./g, "$1");
          u = n ? Prism.highlight(t, n, r) : Prism.util.encode(t);
          var o,
            m = new Prism.Token("prefix", f[s.type], [/\w+/.exec(s.type)[0]]),
            d = Prism.Token.stringify(m, s.language),
            c = [];
          for (a.lastIndex = 0; (o = a.exec(u)); ) c.push(d + o[0]);
          /(?:^|[\r\n]).$/.test(l) && c.push(d),
            (s.content = c.join("")),
            n && s.classes.push("language-" + r);
        }
      });
  }
})();
"undefined" != typeof Prism &&
  ((Prism.languages.treeview = {
    "treeview-part": {
      pattern: /^.+/m,
      inside: {
        "entry-line": [
          { pattern: /\|-- |├── /, alias: "line-h" },
          { pattern: /\| {3}|│ {3}/, alias: "line-v" },
          { pattern: /`-- |└── /, alias: "line-v-last" },
          { pattern: / {4}/, alias: "line-v-gap" },
        ],
        "entry-name": { pattern: /.*\S.*/, inside: { operator: / -> / } },
      },
    },
  }),
  Prism.hooks.add("wrap", function (e) {
    if ("treeview" === e.language && "entry-name" === e.type) {
      var t = e.classes,
        n = /(^|[^\\])\/\s*$/;
      if (n.test(e.content))
        (e.content = e.content.replace(n, "$1")), t.push("dir");
      else {
        e.content = e.content.replace(/(^|[^\\])[=*|]\s*$/, "$1");
        for (
          var a = e.content.toLowerCase().replace(/\s+/g, "").split(".");
          a.length > 1;

        )
          a.shift(), t.push("ext-" + a.join("-"));
      }
      "." === e.content[0] && t.push("dotfile");
    }
  }));
