import{__commonJS}from"./chunk-NNAAFZ4U.mjs";var require_markup_templating=__commonJS({"../../node_modules/refractor/lang/markup-templating.js"(exports,module){module.exports=markupTemplating;markupTemplating.displayName="markupTemplating";markupTemplating.aliases=[];function markupTemplating(Prism){(function(Prism2){function getPlaceholder(language,index){return"___"+language.toUpperCase()+index+"___"}Object.defineProperties(Prism2.languages["markup-templating"]={},{buildPlaceholders:{value:function(env,language,placeholderPattern,replaceFilter){if(env.language===language){var tokenStack=env.tokenStack=[];env.code=env.code.replace(placeholderPattern,function(match){if(typeof replaceFilter=="function"&&!replaceFilter(match))return match;for(var i=tokenStack.length,placeholder;env.code.indexOf(placeholder=getPlaceholder(language,i))!==-1;)++i;return tokenStack[i]=match,placeholder}),env.grammar=Prism2.languages.markup}}},tokenizePlaceholders:{value:function(env,language){if(env.language!==language||!env.tokenStack)return;env.grammar=Prism2.languages[language];var j=0,keys=Object.keys(env.tokenStack);function walkTokens(tokens){for(var i=0;i<tokens.length&&!(j>=keys.length);i++){var token=tokens[i];if(typeof token=="string"||token.content&&typeof token.content=="string"){var k=keys[j],t=env.tokenStack[k],s=typeof token=="string"?token:token.content,placeholder=getPlaceholder(language,k),index=s.indexOf(placeholder);if(index>-1){++j;var before=s.substring(0,index),middle=new Prism2.Token(language,Prism2.tokenize(t,env.grammar),"language-"+language,t),after=s.substring(index+placeholder.length),replacement=[];before&&replacement.push.apply(replacement,walkTokens([before])),replacement.push(middle),after&&replacement.push.apply(replacement,walkTokens([after])),typeof token=="string"?tokens.splice.apply(tokens,[i,1].concat(replacement)):token.content=replacement}}else token.content&&walkTokens(token.content)}return tokens}walkTokens(env.tokens)}}})})(Prism)}}});export{require_markup_templating};
