import{__commonJS}from"./chunk-NNAAFZ4U.mjs";var require_java=__commonJS({"../../node_modules/highlight.js/lib/languages/java.js"(exports,module){var decimalDigits="[0-9](_*[0-9])*",frac=`\\.(${decimalDigits})`,hexDigits="[0-9a-fA-F](_*[0-9a-fA-F])*",NUMERIC={className:"number",variants:[{begin:`(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))[eE][+-]?(${decimalDigits})[fFdD]?\\b`},{begin:`\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${frac})[fFdD]?\\b`},{begin:`\\b(${decimalDigits})[fFdD]\\b`},{begin:`\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))[pP][+-]?(${decimalDigits})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${hexDigits})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function java(hljs){var JAVA_IDENT_RE="[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",GENERIC_IDENT_RE=JAVA_IDENT_RE+"(<"+JAVA_IDENT_RE+"(\\s*,\\s*"+JAVA_IDENT_RE+")*>)?",KEYWORDS="false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do",ANNOTATION={className:"meta",begin:"@"+JAVA_IDENT_RE,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]};let NUMBER=NUMERIC;return{name:"Java",aliases:["jsp"],keywords:KEYWORDS,illegal:/<\/|#/,contains:[hljs.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},hljs.C_LINE_COMMENT_MODE,hljs.C_BLOCK_COMMENT_MODE,hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,{className:"class",beginKeywords:"class interface enum",end:/[{;=]/,excludeEnd:!0,relevance:1,keywords:"class interface enum",illegal:/[:"\[\]]/,contains:[{beginKeywords:"extends implements"},hljs.UNDERSCORE_TITLE_MODE]},{beginKeywords:"new throw return else",relevance:0},{className:"class",begin:"record\\s+"+hljs.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,excludeEnd:!0,end:/[{;=]/,keywords:KEYWORDS,contains:[{beginKeywords:"record"},{begin:hljs.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[hljs.UNDERSCORE_TITLE_MODE]},{className:"params",begin:/\(/,end:/\)/,keywords:KEYWORDS,relevance:0,contains:[hljs.C_BLOCK_COMMENT_MODE]},hljs.C_LINE_COMMENT_MODE,hljs.C_BLOCK_COMMENT_MODE]},{className:"function",begin:"("+GENERIC_IDENT_RE+"\\s+)+"+hljs.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:KEYWORDS,contains:[{begin:hljs.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[hljs.UNDERSCORE_TITLE_MODE]},{className:"params",begin:/\(/,end:/\)/,keywords:KEYWORDS,relevance:0,contains:[ANNOTATION,hljs.APOS_STRING_MODE,hljs.QUOTE_STRING_MODE,NUMBER,hljs.C_BLOCK_COMMENT_MODE]},hljs.C_LINE_COMMENT_MODE,hljs.C_BLOCK_COMMENT_MODE]},NUMBER,ANNOTATION]}}module.exports=java}});export default require_java();
