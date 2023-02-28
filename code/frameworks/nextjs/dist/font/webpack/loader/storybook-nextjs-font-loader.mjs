import"../../../chunk-YPQDI6HO.mjs";import loaderUtils from"next/dist/compiled/loader-utils3";import{fetchCSSFromGoogleFonts,getFontAxes,getUrl,validateData}from"@next/font/dist/google/utils";var cssCache=new Map;async function getFontFaceDeclarations(options){let{fontFamily,weights,styles,selectedVariableAxes,display,variable}=validateData(options.fontFamily,[options.props],null),fontAxes=getFontAxes(fontFamily,weights,styles,selectedVariableAxes),url=getUrl(fontFamily,fontAxes,display);try{let hasCachedCSS=cssCache.has(url),fontFaceCSS=hasCachedCSS?cssCache.get(url):await fetchCSSFromGoogleFonts(url,fontFamily).catch(()=>null);if(hasCachedCSS?cssCache.delete(url):cssCache.set(url,fontFaceCSS),fontFaceCSS===null)throw Error(`Failed to fetch \`${fontFamily}\` from Google Fonts.`);return{id:loaderUtils.getHashDigest(url,"md5","hex",6),fontFamily,fontFaceCSS,weights,styles,variable}}catch{throw new Error("Google Fonts couldn't be loaded.")}}import loaderUtils2 from"next/dist/compiled/loader-utils3";import{validateData as validateData2}from"@next/font/dist/local/utils";import path from"path";async function getFontFaceDeclarations2(options,rootContext){let localFontSrc=options.props.src,parentFolder=options.filename.split("/").slice(0,-1).join("/").replace(rootContext,""),{weight,style,variable}=validateData2("",options.props),id=`font-${loaderUtils2.getHashDigest(Buffer.from(JSON.stringify(localFontSrc)),"md5","hex",6)}`;return{id,fontFamily:id,fontFaceCSS:(()=>{if(typeof localFontSrc=="string"){let localFontPath=path.join(parentFolder,localFontSrc);return`@font-face {
          font-family: ${id};
          src: url(${localFontPath});
      }`}return localFontSrc.map(font=>{let localFontPath=path.join(parentFolder,font.path);return`@font-face {
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
    `}return"module.exports = {}"}export{storybookNextjsFontLoader as default};
