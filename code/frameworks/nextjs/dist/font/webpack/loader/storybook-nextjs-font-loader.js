"use strict";var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var storybook_nextjs_font_loader_exports={};__export(storybook_nextjs_font_loader_exports,{default:()=>storybookNextjsFontLoader});module.exports=__toCommonJS(storybook_nextjs_font_loader_exports);var import_loader_utils3=__toESM(require("next/dist/compiled/loader-utils3")),import_utils=require("@next/font/dist/google/utils"),cssCache=new Map;async function getFontFaceDeclarations(options){let{fontFamily,weights,styles,selectedVariableAxes,display,variable}=(0,import_utils.validateData)(options.fontFamily,[options.props],null),fontAxes=(0,import_utils.getFontAxes)(fontFamily,weights,styles,selectedVariableAxes),url=(0,import_utils.getUrl)(fontFamily,fontAxes,display);try{let hasCachedCSS=cssCache.has(url),fontFaceCSS=hasCachedCSS?cssCache.get(url):await(0,import_utils.fetchCSSFromGoogleFonts)(url,fontFamily).catch(()=>null);if(hasCachedCSS?cssCache.delete(url):cssCache.set(url,fontFaceCSS),fontFaceCSS===null)throw Error(`Failed to fetch \`${fontFamily}\` from Google Fonts.`);return{id:import_loader_utils3.default.getHashDigest(url,"md5","hex",6),fontFamily,fontFaceCSS,weights,styles,variable}}catch{throw new Error("Google Fonts couldn't be loaded.")}}var import_loader_utils32=__toESM(require("next/dist/compiled/loader-utils3")),import_utils2=require("@next/font/dist/local/utils"),import_path=__toESM(require("path"));async function getFontFaceDeclarations2(options,rootContext){let localFontSrc=options.props.src,parentFolder=options.filename.split("/").slice(0,-1).join("/").replace(rootContext,""),{weight,style,variable}=(0,import_utils2.validateData)("",options.props),id=`font-${import_loader_utils32.default.getHashDigest(Buffer.from(JSON.stringify(localFontSrc)),"md5","hex",6)}`;return{id,fontFamily:id,fontFaceCSS:(()=>{if(typeof localFontSrc=="string"){let localFontPath=import_path.default.join(parentFolder,localFontSrc);return`@font-face {
          font-family: ${id};
          src: url(${localFontPath});
      }`}return localFontSrc.map(font=>{let localFontPath=import_path.default.join(parentFolder,font.path);return`@font-face {
          font-family: ${id};
          src: url(${localFontPath});
          ${font.weight?`font-weight: ${font.weight};`:""}
          ${font.style?`font-style: ${font.style};`:""}
        }`}).join("")})(),weights:weight?[weight]:[],styles:style?[style]:[],variable}}function getCSSMeta(options){let className=getClassName(options),style=getStylesObj(options),variableClassName=`__variable_${className}`,classNamesCSS=`
    .${className} {
      font-family: ${options.fontFamily};
      ${isNextCSSPropertyValid(options.styles)?`font-style: ${options.styles[0]};`:""}
      ${isNextCSSPropertyValid(options.weights)?`font-weight: ${options.weights[0]};`:""}
    }

    ${options.variable?`.${variableClassName} { ${options.variable}: '${options.fontFamily}'; }`:""}
  `,fontFaceCSS=`${changeFontDisplayToSwap(options.fontFaceCSS)}`;return{className,fontFaceCSS,classNamesCSS,style,...options.variable?{variableClassName}:{}}}function getClassName({styles,weights,fontFamily}){let font=fontFamily.replace(" ","-").toLowerCase(),style=isNextCSSPropertyValid(styles)?styles[0]:null,weight=isNextCSSPropertyValid(weights)?weights[0]:null;return`${font}${style?`-${style}`:""}${weight?`-${weight}`:""}`}function getStylesObj({styles,weights,fontFamily}){return{fontFamily,...isNextCSSPropertyValid(styles)?{fontStyle:styles[0]}:{},...isNextCSSPropertyValid(weights)?{fontWeight:weights[0]}:{}}}function isNextCSSPropertyValid(prop){return prop.length===1&&prop[0]!=="variable"}function changeFontDisplayToSwap(css){return css.replaceAll("font-display: optional;","font-display: block;")}function setFontDeclarationsInHead({id,fontFaceCSS,classNamesCSS}){return`
    if (!document.getElementById('id-${id}')) {
      const fontDeclarations = \`${fontFaceCSS}\`;
      const style = document.createElement('style');
      style.setAttribute('id', 'font-face-${id}');
      style.innerHTML = fontDeclarations;
      document.head.appendChild(style);

      const classNamesCSS = \`${classNamesCSS}\`;
      const classNamesStyle = document.createElement('style');
      classNamesStyle.setAttribute('id', 'classnames-${id}');
      classNamesStyle.innerHTML = classNamesCSS;
      document.head.appendChild(classNamesStyle);

    }
  `}async function storybookNextjsFontLoader(){let options=this.getOptions(),rootCtx=this.rootContext,fontFaceDeclaration;if(options.source==="@next/font/google"&&(fontFaceDeclaration=await getFontFaceDeclarations(options)),options.source==="@next/font/local"&&(fontFaceDeclaration=await getFontFaceDeclarations2(options,rootCtx)),typeof fontFaceDeclaration<"u"){let cssMeta=getCSSMeta(fontFaceDeclaration);return`
    ${setFontDeclarationsInHead({fontFaceCSS:cssMeta.fontFaceCSS,id:fontFaceDeclaration.id,classNamesCSS:cssMeta.classNamesCSS})}

    module.exports = {
      className: "${cssMeta.className}", 
      style: ${JSON.stringify(cssMeta.style)}
      ${cssMeta.variableClassName?`, variable: "${cssMeta.variableClassName}"`:""}
    }
    `}return"module.exports = {}"}0&&(module.exports={});
