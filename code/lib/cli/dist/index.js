var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __export=(target,all)=>{for(var name in all)__defProp(target,name,{get:all[name],enumerable:!0})},__copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod)),__toCommonJS=mod=>__copyProps(__defProp({},"__esModule",{value:!0}),mod);var src_exports={};__export(src_exports,{JsPackageManager:()=>JsPackageManager,JsPackageManagerFactory:()=>JsPackageManagerFactory,getPackageDetails:()=>getPackageDetails,useNpmWarning:()=>useNpmWarning});module.exports=__toCommonJS(src_exports);var import_util_deprecate=__toESM(require("util-deprecate")),useNpmWarning=(0,import_util_deprecate.default)(()=>{},"`--use-npm` is deprecated and will be removed in Storybook 8.0. \nPlease use the `--package-manager=npm` option instead.\nRead more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#cli-option---use-npm-deprecated");var import_node_path=__toESM(require("path")),import_cross_spawn2=require("cross-spawn"),import_find_up=require("find-up");var import_chalk2=__toESM(require("chalk")),import_semver3=require("semver"),import_cross_spawn=require("cross-spawn"),import_path=__toESM(require("path")),import_fs=__toESM(require("fs"));var import_fs_extra=__toESM(require("fs-extra")),import_chalk=__toESM(require("chalk")),import_semver2=require("semver"),import_strip_json_comments=__toESM(require("strip-json-comments"));var import_download_tarball=__toESM(require("download-tarball")),import_get_npm_tarball_url=__toESM(require("get-npm-tarball-url")),tempy=__toESM(require("tempy"));var import_semver=require("semver");var ProjectType=(ProjectType2=>(ProjectType2.UNDETECTED="UNDETECTED",ProjectType2.UNSUPPORTED="UNSUPPORTED",ProjectType2.REACT_SCRIPTS="REACT_SCRIPTS",ProjectType2.REACT="REACT",ProjectType2.REACT_NATIVE="REACT_NATIVE",ProjectType2.REACT_PROJECT="REACT_PROJECT",ProjectType2.WEBPACK_REACT="WEBPACK_REACT",ProjectType2.NEXTJS="NEXTJS",ProjectType2.VUE="VUE",ProjectType2.VUE3="VUE3",ProjectType2.SFC_VUE="SFC_VUE",ProjectType2.ANGULAR="ANGULAR",ProjectType2.EMBER="EMBER",ProjectType2.WEB_COMPONENTS="WEB_COMPONENTS",ProjectType2.MITHRIL="MITHRIL",ProjectType2.MARIONETTE="MARIONETTE",ProjectType2.MARKO="MARKO",ProjectType2.HTML="HTML",ProjectType2.QWIK="QWIK",ProjectType2.RIOT="RIOT",ProjectType2.PREACT="PREACT",ProjectType2.SVELTE="SVELTE",ProjectType2.SVELTEKIT="SVELTEKIT",ProjectType2.RAX="RAX",ProjectType2.AURELIA="AURELIA",ProjectType2.SERVER="SERVER",ProjectType2.NX="NX",ProjectType2.SOLID="SOLID",ProjectType2))(ProjectType||{});var notInstallableProjectTypes=["UNDETECTED","UNSUPPORTED"],installableProjectTypes=Object.values(ProjectType).filter(type=>!notInstallableProjectTypes.includes(type)).map(type=>type.toLowerCase());var versions_default={"@storybook/addon-a11y":"7.0.0-beta.56","@storybook/addon-actions":"7.0.0-beta.56","@storybook/addon-backgrounds":"7.0.0-beta.56","@storybook/addon-controls":"7.0.0-beta.56","@storybook/addon-docs":"7.0.0-beta.56","@storybook/addon-essentials":"7.0.0-beta.56","@storybook/addon-highlight":"7.0.0-beta.56","@storybook/addon-interactions":"7.0.0-beta.56","@storybook/addon-jest":"7.0.0-beta.56","@storybook/addon-links":"7.0.0-beta.56","@storybook/addon-measure":"7.0.0-beta.56","@storybook/addon-outline":"7.0.0-beta.56","@storybook/addon-storyshots":"7.0.0-beta.56","@storybook/addon-storyshots-puppeteer":"7.0.0-beta.56","@storybook/addon-storysource":"7.0.0-beta.56","@storybook/addon-toolbars":"7.0.0-beta.56","@storybook/addon-viewport":"7.0.0-beta.56","@storybook/addons":"7.0.0-beta.56","@storybook/angular":"7.0.0-beta.56","@storybook/api":"7.0.0-beta.56","@storybook/builder-manager":"7.0.0-beta.56","@storybook/builder-vite":"7.0.0-beta.56","@storybook/builder-webpack5":"7.0.0-beta.56","@storybook/channel-postmessage":"7.0.0-beta.56","@storybook/channel-websocket":"7.0.0-beta.56","@storybook/channels":"7.0.0-beta.56","@storybook/cli":"7.0.0-beta.56","@storybook/client-api":"7.0.0-beta.56","@storybook/client-logger":"7.0.0-beta.56","@storybook/codemod":"7.0.0-beta.56","@storybook/core-client":"7.0.0-beta.56","@storybook/core-common":"7.0.0-beta.56","@storybook/core-events":"7.0.0-beta.56","@storybook/core-server":"7.0.0-beta.56","@storybook/core-webpack":"7.0.0-beta.56","@storybook/csf-plugin":"7.0.0-beta.56","@storybook/csf-tools":"7.0.0-beta.56","@storybook/docs-tools":"7.0.0-beta.56","@storybook/ember":"7.0.0-beta.56","@storybook/html":"7.0.0-beta.56","@storybook/html-vite":"7.0.0-beta.56","@storybook/html-webpack5":"7.0.0-beta.56","@storybook/instrumenter":"7.0.0-beta.56","@storybook/manager-api":"7.0.0-beta.56","@storybook/nextjs":"7.0.0-beta.56","@storybook/node-logger":"7.0.0-beta.56","@storybook/postinstall":"7.0.0-beta.56","@storybook/preact":"7.0.0-beta.56","@storybook/preact-vite":"7.0.0-beta.56","@storybook/preact-webpack5":"7.0.0-beta.56","@storybook/preset-create-react-app":"7.0.0-beta.56","@storybook/preset-html-webpack":"7.0.0-beta.56","@storybook/preset-preact-webpack":"7.0.0-beta.56","@storybook/preset-react-webpack":"7.0.0-beta.56","@storybook/preset-server-webpack":"7.0.0-beta.56","@storybook/preset-svelte-webpack":"7.0.0-beta.56","@storybook/preset-vue-webpack":"7.0.0-beta.56","@storybook/preset-vue3-webpack":"7.0.0-beta.56","@storybook/preset-web-components-webpack":"7.0.0-beta.56","@storybook/preview":"7.0.0-beta.56","@storybook/preview-api":"7.0.0-beta.56","@storybook/preview-web":"7.0.0-beta.56","@storybook/react":"7.0.0-beta.56","@storybook/react-dom-shim":"7.0.0-beta.56","@storybook/react-vite":"7.0.0-beta.56","@storybook/react-webpack5":"7.0.0-beta.56","@storybook/router":"7.0.0-beta.56","@storybook/server":"7.0.0-beta.56","@storybook/server-webpack5":"7.0.0-beta.56","@storybook/source-loader":"7.0.0-beta.56","@storybook/store":"7.0.0-beta.56","@storybook/svelte":"7.0.0-beta.56","@storybook/svelte-vite":"7.0.0-beta.56","@storybook/svelte-webpack5":"7.0.0-beta.56","@storybook/sveltekit":"7.0.0-beta.56","@storybook/telemetry":"7.0.0-beta.56","@storybook/theming":"7.0.0-beta.56","@storybook/types":"7.0.0-beta.56","@storybook/vue":"7.0.0-beta.56","@storybook/vue-vite":"7.0.0-beta.56","@storybook/vue-webpack5":"7.0.0-beta.56","@storybook/vue3":"7.0.0-beta.56","@storybook/vue3-vite":"7.0.0-beta.56","@storybook/vue3-webpack5":"7.0.0-beta.56","@storybook/web-components":"7.0.0-beta.56","@storybook/web-components-vite":"7.0.0-beta.56","@storybook/web-components-webpack5":"7.0.0-beta.56",sb:"7.0.0-beta.56",storybook:"7.0.0-beta.56"};var logger=console;var commandLog=message=>(process.stdout.write(import_chalk.default.cyan(" \u2022 ")+message),(errorMessage,errorInfo)=>{if(errorMessage){if(process.stdout.write(`. ${import_chalk.default.red("\u2716")}
`),logger.error(`
     ${import_chalk.default.red(errorMessage)}`),!errorInfo)return;let newErrorInfo=errorInfo.split(`
`).map(line=>`     ${import_chalk.default.dim(line)}`).join(`
`);logger.error(`${newErrorInfo}
`);return}process.stdout.write(`. ${import_chalk.default.green("\u2713")}
`)});var logger2=console;function getPackageDetails(pkg){let idx=pkg.lastIndexOf("@");if(idx<=0)return[pkg,void 0];let packageName=pkg.slice(0,idx),packageVersion=pkg.slice(idx+1);return[packageName,packageVersion]}var JsPackageManager=class{setRegistryURL(url){url?this.executeCommand("npm",["config","set","registry",url]):this.executeCommand("npm",["config","delete","registry"])}getRegistryURL(){let url=this.executeCommand("npm",["config","get","registry"]).trim();return url==="undefined"?void 0:url}constructor(options){this.cwd=options==null?void 0:options.cwd}installDependencies(){let done=commandLog("Preparing to install dependencies");done(),logger2.log(),logger2.log(),done=commandLog("Installing dependencies");try{this.runInstall()}catch{done("An error occurred while installing dependencies."),process.exit(1)}done()}packageJsonPath(){return this.cwd?import_path.default.resolve(this.cwd,"package.json"):import_path.default.resolve("package.json")}readPackageJson(){let packageJsonPath=this.packageJsonPath();if(!import_fs.default.existsSync(packageJsonPath))throw new Error(`Could not read package.json file at ${packageJsonPath}`);let jsonContent=import_fs.default.readFileSync(packageJsonPath,"utf8");return JSON.parse(jsonContent)}writePackageJson(packageJson){let packageJsonToWrite={...packageJson};packageJsonToWrite.dependencies&&Object.keys(packageJsonToWrite.dependencies).length===0&&delete packageJsonToWrite.dependencies,packageJsonToWrite.devDependencies&&Object.keys(packageJsonToWrite.devDependencies).length===0&&delete packageJsonToWrite.devDependencies,packageJsonToWrite.dependencies&&Object.keys(packageJsonToWrite.peerDependencies).length===0&&delete packageJsonToWrite.peerDependencies;let content=`${JSON.stringify(packageJsonToWrite,null,2)}
`;import_fs.default.writeFileSync(this.packageJsonPath(),content,"utf8")}retrievePackageJson(){let packageJson;try{packageJson=this.readPackageJson()}catch{this.initPackageJson(),packageJson=this.readPackageJson()}return{...packageJson,dependencies:{...packageJson.dependencies},devDependencies:{...packageJson.devDependencies},peerDependencies:{...packageJson.peerDependencies}}}getAllDependencies(){let{dependencies,devDependencies,peerDependencies}=this.retrievePackageJson();return{...dependencies,...devDependencies,...peerDependencies}}addDependencies(options,dependencies){let{skipInstall}=options;if(skipInstall){let{packageJson}=options,dependenciesMap=dependencies.reduce((acc,dep)=>{let[packageName,packageVersion]=getPackageDetails(dep);return{...acc,[packageName]:packageVersion}},{});options.installAsDevDependencies?packageJson.devDependencies={...packageJson.devDependencies,...dependenciesMap}:packageJson.dependencies={...packageJson.dependencies,...dependenciesMap},this.writePackageJson(packageJson)}else try{this.runAddDeps(dependencies,options.installAsDevDependencies)}catch(e){logger2.error("An error occurred while installing dependencies."),logger2.log(e.message),process.exit(1)}}removeDependencies(options,dependencies){let{skipInstall}=options;if(skipInstall){let{packageJson}=options;dependencies.forEach(dep=>{packageJson.devDependencies&&delete packageJson.devDependencies[dep],packageJson.dependencies&&delete packageJson.dependencies[dep]}),this.writePackageJson(packageJson)}else try{this.runRemoveDeps(dependencies)}catch(e){logger2.error("An error occurred while removing dependencies."),logger2.log(e.message),process.exit(1)}}getVersionedPackages(packages){return Promise.all(packages.map(async pkg=>{let[packageName,packageVersion]=getPackageDetails(pkg);return`${packageName}@${await this.getVersion(packageName,packageVersion)}`}))}getVersions(...packageNames){return Promise.all(packageNames.map(packageName=>this.getVersion(packageName)))}async getVersion(packageName,constraint){let current;/(@storybook|^sb$|^storybook$)/.test(packageName)&&(current=versions_default[packageName]);let latest;try{latest=await this.latestVersion(packageName,constraint)}catch(e){if(current)return logger2.warn(`
     ${import_chalk2.default.yellow(e.message)}`),current;logger2.error(`
     ${import_chalk2.default.red(e.message)}`),process.exit(1)}return`^${current&&(!constraint||(0,import_semver3.satisfies)(current,constraint))&&(0,import_semver3.gt)(current,latest)?current:latest}`}async latestVersion(packageName,constraint){return constraint?(await this.runGetVersions(packageName,!0)).reverse().find(version=>(0,import_semver3.satisfies)(version,constraint)):this.runGetVersions(packageName,!1)}addStorybookCommandInScripts(options){let storybookCmd=`storybook dev -p ${(options==null?void 0:options.port)??6006}`,buildStorybookCmd="storybook build",preCommand=options!=null&&options.preCommand?this.getRunCommand(options.preCommand):void 0;this.addScripts({storybook:[preCommand,storybookCmd].filter(Boolean).join(" && "),"build-storybook":[preCommand,buildStorybookCmd].filter(Boolean).join(" && ")})}addESLintConfig(){var _a;let packageJson=this.retrievePackageJson();this.writePackageJson({...packageJson,eslintConfig:{...packageJson.eslintConfig,overrides:[...((_a=packageJson.eslintConfig)==null?void 0:_a.overrides)||[],{files:["**/*.stories.*"],rules:{"import/no-anonymous-default-export":"off"}}]}})}addScripts(scripts){let packageJson=this.retrievePackageJson();this.writePackageJson({...packageJson,scripts:{...packageJson.scripts,...scripts}})}addPackageResolutions(versions){let packageJson=this.retrievePackageJson(),resolutions=this.getResolutions(packageJson,versions);this.writePackageJson({...packageJson,...resolutions})}executeCommand(command,args,stdio,cwd){let commandResult=(0,import_cross_spawn.sync)(command,args,{cwd:cwd??this.cwd,stdio:stdio??"pipe",encoding:"utf-8",shell:!0});if(commandResult.status!==0)throw new Error(commandResult.stderr??"");return commandResult.stdout??""}};var NPMProxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="npm"}initPackageJson(){return this.executeCommand("npm",["init","-y"])}getRunStorybookCommand(){return"npm run storybook"}getRunCommand(command){return`npm run ${command}`}getNpmVersion(){return this.executeCommand("npm",["--version"])}getInstallArgs(){return this.installArgs||(this.installArgs=["install"]),this.installArgs}getUninstallArgs(){return this.uninstallArgs||(this.uninstallArgs=["uninstall"]),this.uninstallArgs}runPackageCommand(command,args,cwd){return this.executeCommand("npm",["exec","--",command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{overrides:{...packageJson.overrides,...versions}}}runInstall(){this.executeCommand("npm",this.getInstallArgs(),"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("npm",[...this.getInstallArgs(),...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("npm",[...this.getUninstallArgs(),...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("npm",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.error)throw new Error(parsedOutput.error.summary);return parsedOutput}catch{throw new Error(`Unable to find versions of ${packageName} using npm`)}}};var PNPMProxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="pnpm"}initPackageJson(){return this.executeCommand("pnpm",["init","-y"])}getRunStorybookCommand(){return"pnpm run storybook"}getRunCommand(command){return`pnpm run ${command}`}getPnpmVersion(){return this.executeCommand("pnpm",["--version"])}runPackageCommand(command,args,cwd){return this.executeCommand("pnpm",["exec",command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{overrides:{...packageJson.overrides,...versions}}}runInstall(){this.executeCommand("pnpm",["install"],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("pnpm",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("pnpm",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("pnpm",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.error)throw new Error(parsedOutput.error.summary);return parsedOutput}catch{throw new Error(`Unable to find versions of ${packageName} using pnpm`)}}};var Yarn2Proxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="yarn2"}initPackageJson(){return this.executeCommand("yarn",["init"])}getRunStorybookCommand(){return"yarn storybook"}getRunCommand(command){return`yarn ${command}`}runPackageCommand(command,args,cwd){return this.executeCommand("yarn",[command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{resolutions:{...packageJson.resolutions,...versions}}}runInstall(){this.executeCommand("yarn",[],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=[...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("yarn",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=[...dependencies];this.executeCommand("yarn",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let field=fetchAllVersions?"versions":"version",args=["--fields",field,"--json"],commandResult=this.executeCommand("yarn",["npm","info",packageName,...args]);try{return JSON.parse(commandResult)[field]}catch{throw new Error(`Unable to find versions of ${packageName} using yarn 2`)}}};var Yarn1Proxy=class extends JsPackageManager{constructor(){super(...arguments);this.type="yarn1"}initPackageJson(){return this.executeCommand("yarn",["init","-y"])}getRunStorybookCommand(){return"yarn storybook"}getRunCommand(command){return`yarn ${command}`}runPackageCommand(command,args,cwd){return this.executeCommand("yarn",[command,...args],void 0,cwd)}getResolutions(packageJson,versions){return{resolutions:{...packageJson.resolutions,...versions}}}runInstall(){this.executeCommand("yarn",[],"inherit")}runAddDeps(dependencies,installAsDevDependencies){let args=["--ignore-workspace-root-check",...dependencies];installAsDevDependencies&&(args=["-D",...args]),this.executeCommand("yarn",["add",...args],"inherit")}runRemoveDeps(dependencies){let args=["--ignore-workspace-root-check",...dependencies];this.executeCommand("yarn",["remove",...args],"inherit")}runGetVersions(packageName,fetchAllVersions){let args=[fetchAllVersions?"versions":"version","--json"],commandResult=this.executeCommand("yarn",["info",packageName,...args]);try{let parsedOutput=JSON.parse(commandResult);if(parsedOutput.type==="inspect")return parsedOutput.data;throw new Error(`Unable to find versions of ${packageName} using yarn`)}catch{throw new Error(`Unable to find versions of ${packageName} using yarn`)}}};var NPM_LOCKFILE="package-lock.json",PNPM_LOCKFILE="pnpm-lock.yaml",YARN_LOCKFILE="yarn.lock",JsPackageManagerFactory=class{static getPackageManager({force}={},cwd){if(force==="npm")return new NPMProxy({cwd});if(force==="pnpm")return new PNPMProxy({cwd});if(force==="yarn1")return new Yarn1Proxy({cwd});if(force==="yarn2")return new Yarn2Proxy({cwd});let yarnVersion=getYarnVersion(cwd),closestLockfilePath=(0,import_find_up.sync)([YARN_LOCKFILE,PNPM_LOCKFILE,NPM_LOCKFILE],{cwd}),closestLockfile=closestLockfilePath&&import_node_path.default.basename(closestLockfilePath),hasNPMCommand=hasNPM(cwd),hasPNPMCommand=hasPNPM(cwd);if(yarnVersion&&(closestLockfile===YARN_LOCKFILE||!hasNPMCommand&&!hasPNPMCommand))return yarnVersion===1?new Yarn1Proxy({cwd}):new Yarn2Proxy({cwd});if(hasPNPMCommand&&closestLockfile===PNPM_LOCKFILE)return new PNPMProxy({cwd});if(hasNPMCommand)return new NPMProxy({cwd});throw new Error("Unable to find a usable package manager within NPM, PNPM, Yarn and Yarn 2")}};function hasNPM(cwd){return(0,import_cross_spawn2.sync)("npm",["--version"],{cwd,shell:!0}).status===0}function hasPNPM(cwd){return(0,import_cross_spawn2.sync)("pnpm",["--version"],{cwd,shell:!0}).status===0}function getYarnVersion(cwd){let yarnVersionCommand=(0,import_cross_spawn2.sync)("yarn",["--version"],{cwd,shell:!0});if(yarnVersionCommand.status!==0)return;let yarnVersion=yarnVersionCommand.output.toString().replace(/,/g,"").replace(/"/g,"");return/^1\.+/.test(yarnVersion)?1:2}0&&(module.exports={JsPackageManager,JsPackageManagerFactory,getPackageDetails,useNpmWarning});
