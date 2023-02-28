var __require=(x=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(x,{get:(a,b)=>(typeof require<"u"?require:a)[b]}):x)(function(x){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+x+'" is not supported')});import deprecate from"util-deprecate";var useNpmWarning=deprecate(()=>{},"`--use-npm` is deprecated and will be removed in Storybook 8.0. \nPlease use the `--package-manager=npm` option instead.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#cli-option---use-npm-deprecated");import chalk2 from"chalk";import{gt,satisfies as satisfies2}from"semver";import{sync as spawnSync}from"cross-spawn";import path2 from"path";import fs2 from"fs";import path,{join as join2}from"path";import fs from"fs";import fse from"fs-extra";import chalk from"chalk";import{satisfies}from"semver";import stripJsonComments from"strip-json-comments";import{dirname,join}from"path";import downloadTarball from"download-tarball";import getNpmTarballUrl from"get-npm-tarball-url";import*as tempy from"tempy";import{minVersion,validRange}from"semver";function ltMajor(versionRange,major){return validRange(versionRange)&&minVersion(versionRange).major<major}function gtMajor(versionRange,major){return validRange(versionRange)&&minVersion(versionRange).major>major}function eqMajor(versionRange,major){return validRange(versionRange)&&minVersion(versionRange).major===major}var externalFrameworks=[{name:"qwik",packageName:"storybook-framework-qwik"},{name:"solid",frameworks:["storybook-solidjs-vite"],renderer:"storybook-solidjs"}],SUPPORTED_RENDERERS=["react","react-native","vue","vue3","angular","mithril","riot","ember","marionette","marko","preact","svelte","qwik","rax","aurelia","solid"],ProjectType=(ProjectType2=>(ProjectType2.UNDETECTED="UNDETECTED",ProjectType2.UNSUPPORTED="UNSUPPORTED",ProjectType2.REACT_SCRIPTS="REACT_SCRIPTS",ProjectType2.REACT="REACT",ProjectType2.REACT_NATIVE="REACT_NATIVE",ProjectType2.REACT_PROJECT="REACT_PROJECT",ProjectType2.WEBPACK_REACT="WEBPACK_REACT",ProjectType2.NEXTJS="NEXTJS",ProjectType2.VUE="VUE",ProjectType2.VUE3="VUE3",ProjectType2.SFC_VUE="SFC_VUE",ProjectType2.ANGULAR="ANGULAR",ProjectType2.EMBER="EMBER",ProjectType2.WEB_COMPONENTS="WEB_COMPONENTS",ProjectType2.MITHRIL="MITHRIL",ProjectType2.MARIONETTE="MARIONETTE",ProjectType2.MARKO="MARKO",ProjectType2.HTML="HTML",ProjectType2.QWIK="QWIK",ProjectType2.RIOT="RIOT",ProjectType2.PREACT="PREACT",ProjectType2.SVELTE="SVELTE",ProjectType2.SVELTEKIT="SVELTEKIT",ProjectType2.RAX="RAX",ProjectType2.AURELIA="AURELIA",ProjectType2.SERVER="SERVER",ProjectType2.NX="NX",ProjectType2.SOLID="SOLID",ProjectType2))(ProjectType||{});var supportedTemplates=[{preset:"SFC_VUE",dependencies:{"vue-loader":versionRange=>ltMajor(versionRange,16),vuetify:versionRange=>ltMajor(versionRange,3)},matcherFunction:({dependencies})=>dependencies.some(Boolean)},{preset:"VUE",dependencies:{vue:versionRange=>ltMajor(versionRange,3),nuxt:versionRange=>ltMajor(versionRange,3)},matcherFunction:({dependencies})=>dependencies.some(Boolean)},{preset:"VUE3",dependencies:{vue:versionRange=>versionRange==="next"||eqMajor(versionRange,3)},matcherFunction:({dependencies})=>dependencies.some(Boolean)},{preset:"EMBER",dependencies:["ember-cli"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"NEXTJS",dependencies:{next:versionRange=>eqMajor(versionRange,9)||gtMajor(versionRange,9)},matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"QWIK",dependencies:["@builder.io/qwik"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"REACT_PROJECT",peerDependencies:["react"],matcherFunction:({peerDependencies})=>peerDependencies.every(Boolean)},{preset:"REACT_NATIVE",dependencies:["react-native","react-native-scripts"],matcherFunction:({dependencies})=>dependencies.some(Boolean)},{preset:"REACT_SCRIPTS",files:["/node_modules/.bin/react-scripts"],dependencies:["react-scripts"],matcherFunction:({dependencies,files})=>dependencies.every(Boolean)||files.every(Boolean)},{preset:"ANGULAR",dependencies:["@angular/core"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"WEB_COMPONENTS",dependencies:["lit-element","lit-html","lit"],matcherFunction:({dependencies})=>dependencies.some(Boolean)},{preset:"MITHRIL",dependencies:["mithril"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"MARIONETTE",dependencies:["backbone.marionette"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"MARKO",dependencies:["marko"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"RIOT",dependencies:["riot"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"PREACT",dependencies:["preact"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"SVELTEKIT",dependencies:["@sveltejs/kit"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"SVELTE",dependencies:["svelte"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"RAX",dependencies:["rax"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"AURELIA",dependencies:["aurelia-bootstrapper"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"SOLID",dependencies:["solid-js"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"WEBPACK_REACT",dependencies:["react","webpack"],matcherFunction:({dependencies})=>dependencies.every(Boolean)},{preset:"REACT",dependencies:["react"],matcherFunction:({dependencies})=>dependencies.every(Boolean)}],unsupportedTemplate={preset:"UNSUPPORTED",dependencies:{nuxt:versionRange=>eqMajor(versionRange,3)},matcherFunction:({dependencies})=>dependencies.some(Boolean)},notInstallableProjectTypes=["UNDETECTED","UNSUPPORTED"],installableProjectTypes=Object.values(ProjectType).filter(type=>!notInstallableProjectTypes.includes(type)).map(type=>type.toLowerCase());var versions_default={"@storybook/addon-a11y":"7.0.0-beta.56","@storybook/addon-actions":"7.0.0-beta.56","@storybook/addon-backgrounds":"7.0.0-beta.56","@storybook/addon-controls":"7.0.0-beta.56","@storybook/addon-docs":"7.0.0-beta.56","@storybook/addon-essentials":"7.0.0-beta.56","@storybook/addon-highlight":"7.0.0-beta.56","@storybook/addon-interactions":"7.0.0-beta.56","@storybook/addon-jest":"7.0.0-beta.56","@storybook/addon-links":"7.0.0-beta.56","@storybook/addon-measure":"7.0.0-beta.56","@storybook/addon-outline":"7.0.0-beta.56","@storybook/addon-storyshots":"7.0.0-beta.56","@storybook/addon-storyshots-puppeteer":"7.0.0-beta.56","@storybook/addon-storysource":"7.0.0-beta.56","@storybook/addon-toolbars":"7.0.0-beta.56","@storybook/addon-viewport":"7.0.0-beta.56","@storybook/addons":"7.0.0-beta.56","@storybook/angular":"7.0.0-beta.56","@storybook/api":"7.0.0-beta.56","@storybook/builder-manager":"7.0.0-beta.56","@storybook/builder-vite":"7.0.0-beta.56","@storybook/builder-webpack5":"7.0.0-beta.56","@storybook/channel-postmessage":"7.0.0-beta.56","@storybook/channel-websocket":"7.0.0-beta.56","@storybook/channels":"7.0.0-beta.56","@storybook/cli":"7.0.0-beta.56","@storybook/client-api":"7.0.0-beta.56","@storybook/client-logger":"7.0.0-beta.56","@storybook/codemod":"7.0.0-beta.56","@storybook/core-client":"7.0.0-beta.56","@storybook/core-common":"7.0.0-beta.56","@storybook/core-events":"7.0.0-beta.56","@storybook/core-server":"7.0.0-beta.56","@storybook/core-webpack":"7.0.0-beta.56","@storybook/csf-plugin":"7.0.0-beta.56","@storybook/csf-tools":"7.0.0-beta.56","@storybook/docs-tools":"7.0.0-beta.56","@storybook/ember":"7.0.0-beta.56","@storybook/html":"7.0.0-beta.56","@storybook/html-vite":"7.0.0-beta.56","@storybook/html-webpack5":"7.0.0-beta.56","@storybook/instrumenter":"7.0.0-beta.56","@storybook/manager-api":"7.0.0-beta.56","@storybook/nextjs":"7.0.0-beta.56","@storybook/node-logger":"7.0.0-beta.56","@storybook/postinstall":"7.0.0-beta.56","@storybook/preact":"7.0.0-beta.56","@storybook/preact-vite":"7.0.0-beta.56","@storybook/preact-webpack5":"7.0.0-beta.56","@storybook/preset-create-react-app":"7.0.0-beta.56","@storybook/preset-html-webpack":"7.0.0-beta.56","@storybook/preset-preact-webpack":"7.0.0-beta.56","@storybook/preset-react-webpack":"7.0.0-beta.56","@storybook/preset-server-webpack":"7.0.0-beta.56","@storybook/preset-svelte-webpack":"7.0.0-beta.56","@storybook/preset-vue-webpack":"7.0.0-beta.56","@storybook/preset-vue3-webpack":"7.0.0-beta.56","@storybook/preset-web-components-webpack":"7.0.0-beta.56","@storybook/preview":"7.0.0-beta.56","@storybook/preview-api":"7.0.0-beta.56","@storybook/preview-web":"7.0.0-beta.56","@storybook/react":"7.0.0-beta.56","@storybook/react-dom-shim":"7.0.0-beta.56","@storybook/react-vite":"7.0.0-beta.56","@storybook/react-webpack5":"7.0.0-beta.56","@storybook/router":"7.0.0-beta.56","@storybook/server":"7.0.0-beta.56","@storybook/server-webpack5":"7.0.0-beta.56","@storybook/source-loader":"7.0.0-beta.56","@storybook/store":"7.0.0-beta.56","@storybook/svelte":"7.0.0-beta.56","@storybook/svelte-vite":"7.0.0-beta.56","@storybook/svelte-webpack5":"7.0.0-beta.56","@storybook/sveltekit":"7.0.0-beta.56","@storybook/telemetry":"7.0.0-beta.56","@storybook/theming":"7.0.0-beta.56","@storybook/types":"7.0.0-beta.56","@storybook/vue":"7.0.0-beta.56","@storybook/vue-vite":"7.0.0-beta.56","@storybook/vue-webpack5":"7.0.0-beta.56","@storybook/vue3":"7.0.0-beta.56","@storybook/vue3-vite":"7.0.0-beta.56","@storybook/vue3-webpack5":"7.0.0-beta.56","@storybook/web-components":"7.0.0-beta.56","@storybook/web-components-vite":"7.0.0-beta.56","@storybook/web-components-webpack5":"7.0.0-beta.56",sb:"7.0.0-beta.56",storybook:"7.0.0-beta.56"};function getCliDir(){return dirname(__require.resolve("@storybook/cli/package.json"))}var resolveUsingBranchInstall=async(packageManager,request)=>{let tempDirectory=tempy.directory(),version=versions_default[request]||await packageManager.latestVersion(request),url=getNpmTarballUrl(request,version,{registry:packageManager.getRegistryURL()});return await downloadTarball({url,dir:tempDirectory}),join(tempDirectory,"package")};async function getRendererDir(packageManager,renderer){let externalFramework=externalFrameworks.find(framework=>framework.name===renderer),frameworkPackageName=externalFramework?.renderer||externalFramework?.packageName||`@storybook/${renderer}`,packageJsonPath=`${frameworkPackageName}/package.json`,errors=[];try{return dirname(__require.resolve(packageJsonPath,{paths:[process.cwd()]}))}catch(e){errors.push(e)}try{return await resolveUsingBranchInstall(packageManager,frameworkPackageName)}catch(e){errors.push(e)}throw new Error(`Cannot find ${packageJsonPath}, ${errors.map(e=>e.stack).join(`

`)}`)}var logger=console;function getBowerJson(){let bowerJsonPath=path.resolve("bower.json");if(!fs.existsSync(bowerJsonPath))return!1;let jsonContent=fs.readFileSync(bowerJsonPath,"utf8");return JSON.parse(jsonContent)}function readFileAsJson(jsonPath,allowComments){let filePath=path.resolve(jsonPath);if(!fs.existsSync(filePath))return!1;let fileContent=fs.readFileSync(filePath,"utf8"),jsonContent=allowComments?stripJsonComments(fileContent):fileContent;try{return JSON.parse(jsonContent)}catch(e){throw logger.error(chalk.red(`Invalid json in file: ${filePath}`)),e}}var writeFileAsJson=(jsonPath,content)=>{let filePath=path.resolve(jsonPath);return fs.existsSync(filePath)?(fs.writeFileSync(filePath,`${JSON.stringify(content,null,2)}
`),!0):!1},commandLog=message=>(process.stdout.write(chalk.cyan(" \u2022 ")+message),(errorMessage,errorInfo)=>{if(errorMessage){if(process.stdout.write(`. ${chalk.red("\u2716")}
`),logger.error(`
     ${chalk.red(errorMessage)}`),!errorInfo)return;let newErrorInfo=errorInfo.split(`
`).map(line=>`     ${chalk.dim(line)}`).join(`
`);logger.error(`${newErrorInfo}
`);return}process.stdout.write(`. ${chalk.green("\u2713")}
`)});function paddedLog(message){let newMessage=message.split(`
`).map(line=>`    ${line}`).join(`
`);logger.log(newMessage)}function getChars(char,amount){let line="";for(let lc=0;lc<amount;lc+=1)line+=char;return line}function codeLog(codeLines,leftPadAmount){let maxLength=0,finalResult=codeLines.map(line=>(maxLength=line.length>maxLength?line.length:maxLength,line)).map(line=>{let rightPadAmount=maxLength-line.length,newLine=line+getChars(" ",rightPadAmount);return newLine=getChars(" ",leftPadAmount||2)+chalk.inverse(` ${newLine} `),newLine}).join(`
`);logger.log(finalResult)}async function getBabelDependencies(packageManager,packageJson){let dependenciesToAdd=[],babelLoaderVersion="^8.0.0-0",babelCoreVersion=packageJson.dependencies["babel-core"]||packageJson.devDependencies["babel-core"];if(babelCoreVersion){let latestCompatibleBabelVersion=await packageManager.latestVersion("babel-core",babelCoreVersion);satisfies(latestCompatibleBabelVersion,"^6.0.0")&&(babelLoaderVersion="^7.0.0")}else if(!packageJson.dependencies["@babel/core"]&&!packageJson.devDependencies["@babel/core"]){let babelCoreInstallVersion=await packageManager.getVersion("@babel/core");dependenciesToAdd.push(`@babel/core@${babelCoreInstallVersion}`)}if(!packageJson.dependencies["babel-loader"]&&!packageJson.devDependencies["babel-loader"]){let babelLoaderInstallVersion=await packageManager.getVersion("babel-loader",babelLoaderVersion);dependenciesToAdd.push(`babel-loader@${babelLoaderInstallVersion}`)}return dependenciesToAdd}function copyTemplate(templateRoot,destination="."){let templateDir=path.resolve(templateRoot,"template-csf/");if(!fs.existsSync(templateDir))throw new Error("Couldn't find template dir");fse.copySync(templateDir,destination,{overwrite:!0})}async function copyTemplateFiles({packageManager,renderer,language,destination,includeCommonAssets=!0}){let languageFolderMapping={["javascript"]:"js",["typescript-3-8"]:"ts-3-8",["typescript-4-9"]:"ts-4-9"},templatePath=async()=>{let baseDir=await getRendererDir(packageManager,renderer),assetsDir=join2(baseDir,"template/cli"),assetsLanguage=join2(assetsDir,languageFolderMapping[language]),assetsJS=join2(assetsDir,languageFolderMapping["javascript"]),assetsTS38=join2(assetsDir,languageFolderMapping["typescript-3-8"]);if(await fse.pathExists(assetsLanguage))return assetsLanguage;if(language==="typescript-4-9"&&await fse.pathExists(assetsTS38))return assetsTS38;if(await fse.pathExists(assetsJS))return assetsJS;if(await fse.pathExists(assetsDir))return assetsDir;throw new Error(`Unsupported renderer: ${renderer} (${baseDir})`)},destinationPath=destination??await(async()=>await fse.pathExists("./src")?"./src/stories":"./stories")();includeCommonAssets&&await fse.copy(join2(getCliDir(),"rendererAssets/common"),destinationPath,{overwrite:!0}),await fse.copy(await templatePath(),destinationPath,{overwrite:!0})}function getStorybookVersionSpecifier(packageJson){let allDeps={...packageJson.dependencies,...packageJson.devDependencies},storybookPackage=Object.keys(allDeps).find(name=>versions_default[name]);if(!storybookPackage)throw new Error("Couldn't find any official storybook packages in package.json");return allDeps[storybookPackage]}var logger2=console;function getPackageDetails(pkg){let idx=pkg.lastIndexOf("@");if(idx<=0)return[pkg,void 0];let packageName=pkg.slice(0,idx),packageVersion=pkg.slice(idx+1);return[packageName,packageVersion]}var JsPackageManager=class{setRegistryURL(url){url?this.executeCommand("npm",["config","set","registry",url]):this.executeCommand("npm",["config","delete","registry"])}getRegistryURL(){let url=this.executeCommand("npm",["config","get","registry"]).trim();return url==="undefined"?void 0:url}constructor(options){this.cwd=options?.cwd}installDependencies(){let done=commandLog("Preparing to install dependencies");done(),logger2.log(),logger2.log(),done=commandLog("Installing dependencies");try{this.runInstall()}catch{done("An error occurred while installing dependencies."),process.exit(1)}done()}packageJsonPath(){return this.cwd?path2.resolve(this.cwd,"package.json"):path2.resolve("package.json")}readPackageJson(){let packageJsonPath=this.packageJsonPath();if(!fs2.existsSync(packageJsonPath))throw new Error(`Could not read package.json file at ${packageJsonPath}`);let jsonContent=fs2.readFileSync(packageJsonPath,"utf8");return JSON.parse(jsonContent)}writePackageJson(packageJson){let packageJsonToWrite={...packageJson};packageJsonToWrite.dependencies&&Object.keys(packageJsonToWrite.dependencies).length===0&&delete packageJsonToWrite.dependencies,packageJsonToWrite.devDependencies&&Object.keys(packageJsonToWrite.devDependencies).length===0&&delete packageJsonToWrite.devDependencies,packageJsonToWrite.dependencies&&Object.keys(packageJsonToWrite.peerDependencies).length===0&&delete packageJsonToWrite.peerDependencies;let content=`${JSON.stringify(packageJsonToWrite,null,2)}
`;fs2.writeFileSync(this.packageJsonPath(),content,"utf8")}retrievePackageJson(){let packageJson;try{packageJson=this.readPackageJson()}catch{this.initPackageJson(),packageJson=this.readPackageJson()}return{...packageJson,dependencies:{...packageJson.dependencies},devDependencies:{...packageJson.devDependencies},peerDependencies:{...packageJson.peerDependencies}}}getAllDependencies(){let{dependencies,devDependencies,peerDependencies}=this.retrievePackageJson();return{...dependencies,...devDependencies,...peerDependencies}}addDependencies(options,dependencies){let{skipInstall}=options;if(skipInstall){let{packageJson}=options,dependenciesMap=dependencies.reduce((acc,dep)=>{let[packageName,packageVersion]=getPackageDetails(dep);return{...acc,[packageName]:packageVersion}},{});options.installAsDevDependencies?packageJson.devDependencies={...packageJson.devDependencies,...dependenciesMap}:packageJson.dependencies={...packageJson.dependencies,...dependenciesMap},this.writePackageJson(packageJson)}else try{this.runAddDeps(dependencies,options.installAsDevDependencies)}catch(e){logger2.error("An error occurred while installing dependencies."),logger2.log(e.message),process.exit(1)}}removeDependencies(options,dependencies){let{skipInstall}=options;if(skipInstall){let{packageJson}=options;dependencies.forEach(dep=>{packageJson.devDependencies&&delete packageJson.devDependencies[dep],packageJson.dependencies&&delete packageJson.dependencies[dep]}),this.writePackageJson(packageJson)}else try{this.runRemoveDeps(dependencies)}catch(e){logger2.error("An error occurred while removing dependencies."),logger2.log(e.message),process.exit(1)}}getVersionedPackages(packages){return Promise.all(packages.map(async pkg=>{let[packageName,packageVersion]=getPackageDetails(pkg);return`${packageName}@${await this.getVersion(packageName,packageVersion)}`}))}getVersions(...packageNames){return Promise.all(packageNames.map(packageName=>this.getVersion(packageName)))}async getVersion(packageName,constraint){let current;/(@storybook|^sb$|^storybook$)/.test(packageName)&&(current=versions_default[packageName]);let latest;try{latest=await this.latestVersion(packageName,constraint)}catch(e){if(current)return logger2.warn(`
     ${chalk2.yellow(e.message)}`),current;logger2.error(`
     ${chalk2.red(e.message)}`),process.exit(1)}return`^${current&&(!constraint||satisfies2(current,constraint))&&gt(current,latest)?current:latest}`}async latestVersion(packageName,constraint){return constraint?(await this.runGetVersions(packageName,!0)).reverse().find(version=>satisfies2(version,constraint)):this.runGetVersions(packageName,!1)}addStorybookCommandInScripts(options){let storybookCmd=`storybook dev -p ${options?.port??6006}`,buildStorybookCmd="storybook build",preCommand=options?.preCommand?this.getRunCommand(options.preCommand):void 0;this.addScripts({storybook:[preCommand,storybookCmd].filter(Boolean).join(" && "),"build-storybook":[preCommand,buildStorybookCmd].filter(Boolean).join(" && ")})}addESLintConfig(){let packageJson=this.retrievePackageJson();this.writePackageJson({...packageJson,eslintConfig:{...packageJson.eslintConfig,overrides:[...packageJson.eslintConfig?.overrides||[],{files:["**/*.stories.*"],rules:{"import/no-anonymous-default-export":"off"}}]}})}addScripts(scripts){let packageJson=this.retrievePackageJson();this.writePackageJson({...packageJson,scripts:{...packageJson.scripts,...scripts}})}addPackageResolutions(versions){let packageJson=this.retrievePackageJson(),resolutions=this.getResolutions(packageJson,versions);this.writePackageJson({...packageJson,...resolutions})}executeCommand(command,args,stdio,cwd){let commandResult=spawnSync(command,args,{cwd:cwd??this.cwd,stdio:stdio??"pipe",encoding:"utf-8",shell:!0});if(commandResult.status!==0)throw new Error(commandResult.stderr??"");return commandResult.stdout??""}};import path3 from"path";import{sync as spawnSync2}from"cross-spawn";import{sync as findUpSync}from"find-up";var NPMProxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="npm"}initPackageJson(){return this.executeCommand("npm",["init","-y"])}getRunStorybookCommand(){return"npm run storybook"}getRunCommand(command){return`npm run ${command}`}getNpmVersion(){return this.executeCommand("npm",["--version"])}getInstallArgs(){return this.installArgs||(this.installArgs=["install"]),this.installArgs}getUninstallArgs(){return this.uninstallArgs||(this.uninstallArgs=["uninstall"]),this.uninstallArgs}runPackageCommand(command,args,cwd){return this.executeCommand("npm",["exec","--",command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{overrides:{...packageJson.overrides,...versions}}}runInstall(){this.executeCommand("npm",this.getInstallArgs(),"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("npm",[...this.getInstallArgs(),...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("npm",[...this.getUninstallArgs(),...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("npm",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.error)throw new Error(parsedOutput.error.summary);return parsedOutput}catch{throw new Error(`Unable to find versions of ${packageName} using npm`)}}};var PNPMProxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="pnpm"}initPackageJson(){return this.executeCommand("pnpm",["init","-y"])}getRunStorybookCommand(){return"pnpm run storybook"}getRunCommand(command){return`pnpm run ${command}`}getPnpmVersion(){return this.executeCommand("pnpm",["--version"])}runPackageCommand(command,args,cwd){return this.executeCommand("pnpm",["exec",command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{overrides:{...packageJson.overrides,...versions}}}runInstall(){this.executeCommand("pnpm",["install"],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("pnpm",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("pnpm",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("pnpm",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.error)throw new Error(parsedOutput.error.summary);return parsedOutput}catch{throw new Error(`Unable to find versions of ${packageName} using pnpm`)}}};var Yarn2Proxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="yarn2"}initPackageJson(){return this.executeCommand("yarn",["init"])}getRunStorybookCommand(){return"yarn storybook"}getRunCommand(command){return`yarn ${command}`}runPackageCommand(command,args,cwd){return this.executeCommand("yarn",[command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{resolutions:{...packageJson.resolutions,...versions}}}runInstall(){this.executeCommand("yarn",[],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("yarn",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("yarn",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let field=fetchAllVersions?"versions":"version",args=["--fields",field,"--json"],commandResult=this.executeCommand("yarn",["npm","info",packageName,...args]);try{return JSON.parse(commandResult)[field]}catch{throw new Error(`Unable to find versions of ${packageName} using yarn 2`)}}};var Yarn1Proxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="yarn1"}initPackageJson(){return this.executeCommand("yarn",["init","-y"])}getRunStorybookCommand(){return"yarn storybook"}getRunCommand(command){return`yarn ${command}`}runPackageCommand(command,args,cwd){return this.executeCommand("yarn",[command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{resolutions:{...packageJson.resolutions,...versions}}}runInstall(){this.executeCommand("yarn",[],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=["--ignore-workspace-root-check",...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("yarn",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=["--ignore-workspace-root-check",...dependencies];this.executeCommand("yarn",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("yarn",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.type==="inspect")return parsedOutput.data;throw new Error(`Unable to find versions of ${packageName} using yarn`)}catch{throw new Error(`Unable to find versions of ${packageName} using yarn`)}}};var NPM_LOCKFILE="package-lock.json",PNPM_LOCKFILE="pnpm-lock.yaml",YARN_LOCKFILE="yarn.lock",JsPackageManagerFactory=class{static getPackageManager({force}={},cwd){if(force==="npm")return new NPMProxy({cwd});if(force==="pnpm")return new PNPMProxy({cwd});if(force==="yarn1")return new Yarn1Proxy({cwd});if(force==="yarn2")return new Yarn2Proxy({cwd});let yarnVersion=getYarnVersion(cwd),closestLockfilePath=findUpSync([YARN_LOCKFILE,PNPM_LOCKFILE,NPM_LOCKFILE],{cwd}),closestLockfile=closestLockfilePath&&path3.basename(closestLockfilePath),hasNPMCommand=hasNPM(cwd),hasPNPMCommand=hasPNPM(cwd);if(yarnVersion&&(closestLockfile===YARN_LOCKFILE||!hasNPMCommand&&!hasPNPMCommand))return yarnVersion===1?new Yarn1Proxy({cwd}):new Yarn2Proxy({cwd});if(hasPNPMCommand&&closestLockfile===PNPM_LOCKFILE)return new PNPMProxy({cwd});if(hasNPMCommand)return new NPMProxy({cwd});throw new Error("Unable to find a usable package manager within NPM, PNPM, Yarn and Yarn 2")}};function hasNPM(cwd){return spawnSync2("npm",["--version"],{cwd,shell:!0}).status===0}function hasPNPM(cwd){return spawnSync2("pnpm",["--version"],{cwd,shell:!0}).status===0}function getYarnVersion(cwd){let yarnVersionCommand=spawnSync2("yarn",["--version"],{cwd,shell:!0});if(yarnVersionCommand.status!==0)return;let yarnVersion=yarnVersionCommand.output.toString().replace(/,/g,"").replace(/"/g,"");return/^1\.+/.test(yarnVersion)?1:2}export{__require,externalFrameworks,SUPPORTED_RENDERERS,supportedTemplates,unsupportedTemplate,installableProjectTypes,versions_default,getCliDir,getBowerJson,readFileAsJson,writeFileAsJson,commandLog,paddedLog,codeLog,getBabelDependencies,copyTemplate,copyTemplateFiles,getStorybookVersionSpecifier,useNpmWarning,getPackageDetails,JsPackageManager,JsPackageManagerFactory};
