var __create=Object.create;var __defProp=Object.defineProperty;var __getOwnPropDesc=Object.getOwnPropertyDescriptor;var __getOwnPropNames=Object.getOwnPropertyNames;var __getProtoOf=Object.getPrototypeOf,__hasOwnProp=Object.prototype.hasOwnProperty;var __copyProps=(to,from,except,desc)=>{if(from&&typeof from=="object"||typeof from=="function")for(let key of __getOwnPropNames(from))!__hasOwnProp.call(to,key)&&key!==except&&__defProp(to,key,{get:()=>from[key],enumerable:!(desc=__getOwnPropDesc(from,key))||desc.enumerable});return to};var __toESM=(mod,isNodeMode,target)=>(target=mod!=null?__create(__getProtoOf(mod)):{},__copyProps(isNodeMode||!mod||!mod.__esModule?__defProp(target,"default",{value:mod,enumerable:!0}):target,mod));var React5=__toESM(require("react")),import_manager_api=require("@storybook/manager-api");var PARAM_KEY="test",ADDON_ID="storybookjs/test",PANEL_ID=`${ADDON_ID}/panel`,ADD_TESTS=`${ADDON_ID}/add_tests`;var import_react4=__toESM(require("react")),import_theming3=require("@storybook/theming"),import_components2=require("@storybook/components"),import_react_resize_detector=require("react-resize-detector");var import_react2=__toESM(require("react")),import_theming2=require("@storybook/theming"),import_components=require("@storybook/components");var import_react=__toESM(require("react")),import_theming=require("@storybook/theming"),positiveConsoleRegex=/\[32m(.*?)\[39m/,negativeConsoleRegex=/\[31m(.*?)\[39m/,positiveType="positive",negativeType="negative",endToken="[39m",failStartToken="[31m",passStartToken="[32m",stackTraceStartToken="at",titleEndToken=":",TestDetail=class{},StackTrace=import_theming.styled.pre(({theme})=>({background:theme.color.lighter,paddingTop:4,paddingBottom:4,paddingLeft:6,borderRadius:2,overflow:"auto",margin:"10px 30px 10px 30px",whiteSpace:"pre"})),Results=import_theming.styled.div({paddingTop:10,marginLeft:31,marginRight:30}),Description=import_theming.styled.div(({theme})=>({paddingBottom:10,paddingTop:10,borderBottom:theme.appBorderColor,marginLeft:31,marginRight:30,overflowWrap:"break-word"})),StatusColor=import_theming.styled.strong(({status,theme})=>({color:status===positiveType?theme.color.positive:theme.color.negative,fontWeight:500})),colorizeText=(msg,type)=>type?msg.split(type===positiveType?positiveConsoleRegex:negativeConsoleRegex).map((i,index)=>index%2?import_react.default.createElement(StatusColor,{key:`${type}_${i}`,status:type},i):i):[msg],getConvertedText=msg=>{let elementArray=[];return msg&&msg.split(/\[2m/).join("").split(/\[22m/).forEach(element=>{element&&element.trim()&&(element.indexOf(failStartToken)>-1&&element.indexOf(failStartToken)<element.indexOf(endToken)?elementArray=elementArray.concat(colorizeText(element,negativeType)):element.indexOf(passStartToken)>-1&&element.indexOf(passStartToken)<element.indexOf(endToken)?elementArray=elementArray.concat(colorizeText(element,positiveType)):elementArray=elementArray.concat(element))}),elementArray},getTestDetail=msg=>{let lines=msg.split(`
`).filter(Boolean),testDetail=new TestDetail;testDetail.description=getConvertedText(lines[0]),testDetail.stackTrace="",testDetail.result=[];for(let index=1;index<lines.length;index+=1){let current=lines[index],next=lines[index+1];if(current.trim().toLowerCase().indexOf(stackTraceStartToken)===0)testDetail.stackTrace+=`${current.trim()}
`;else if(current.trim().indexOf(titleEndToken)>-1){let title,value=null;current.trim().indexOf(titleEndToken)===current.length-1?(title=current.trim(),value=getConvertedText(next),index+=1):(title=current.substring(0,current.indexOf(titleEndToken)).trim(),value=getConvertedText(current.substring(current.indexOf(titleEndToken),current.length))),testDetail.result=[...testDetail.result,title," ",...value,import_react.default.createElement("br",{key:index})]}else testDetail.result=[...testDetail.result," ",...getConvertedText(current)]}return testDetail},Message=props=>{let{msg}=props,detail=getTestDetail(msg);return import_react.default.createElement(import_react.Fragment,null,detail.description?import_react.default.createElement(Description,null,detail.description):null,detail.result?import_react.default.createElement(Results,null,detail.result):null,detail.stackTrace?import_react.default.createElement(StackTrace,null,detail.stackTrace):null)},Message_default=Message;var Wrapper=import_theming2.styled.div(({theme,status})=>({display:"flex",width:"100%",borderTop:`1px solid ${theme.appBorderColor}`,"&:hover":{background:status==="failed"?theme.background.hoverable:null}})),HeaderBar=import_theming2.styled.div(({theme,status})=>({padding:theme.layoutMargin,paddingLeft:theme.layoutMargin-3,background:"none",color:"inherit",textAlign:"left",cursor:status==="failed"?"pointer":null,borderLeft:"3px solid transparent",width:"100%",display:"flex","&:focus":{outline:"0 none",borderLeft:`3px solid ${theme.color.secondary}`}})),Icon=(0,import_theming2.styled)(import_components.Icons)(({theme})=>({height:10,width:10,minWidth:10,color:theme.textMutedColor,marginRight:10,transition:"transform 0.1s ease-in-out",alignSelf:"center",display:"inline-flex"})),capitalizeFirstLetter=text=>text.charAt(0).toUpperCase().concat(text.slice(1));function Result(props){let[isOpen,setIsOpen]=(0,import_react2.useState)(!1),onToggle=()=>{setIsOpen(!isOpen)},{fullName,title,failureMessages,status}=props;return import_react2.default.createElement(import_react2.Fragment,null,import_react2.default.createElement(Wrapper,{status},import_react2.default.createElement(HeaderBar,{onClick:onToggle,role:"button",status},status==="failed"?import_react2.default.createElement(Icon,{icon:"arrowdown",color:(0,import_theming2.convert)(import_theming2.themes.light).textMutedColor,style:{transform:`rotate(${isOpen?0:-90}deg)`}}):null,import_react2.default.createElement("div",null,capitalizeFirstLetter(fullName)||capitalizeFirstLetter(title)))),isOpen?import_react2.default.createElement(import_react2.Fragment,null,failureMessages.map((msg,i)=>import_react2.default.createElement(Message_default,{msg,key:i}))):null)}var import_react3=__toESM(require("react")),import_core_events=require("@storybook/core-events");var provideTests=Component=>{var _a;return _a=class extends import_react3.Component{constructor(){super(...arguments);this.state={};this.onAddTests=({kind,storyName,tests})=>{this.setState({kind,storyName,tests})}}componentDidMount(){this.mounted=!0;let{api}=this.props;this.stopListeningOnStory=api.on(import_core_events.STORY_CHANGED,()=>{let{kind,storyName,tests}=this.state;this.mounted&&(kind||storyName||tests)&&this.onAddTests({})}),api.on(ADD_TESTS,this.onAddTests)}componentWillUnmount(){this.mounted=!1;let{api}=this.props;this.stopListeningOnStory(),api.off(ADD_TESTS,this.onAddTests)}render(){let{active}=this.props,{tests}=this.state;return active?import_react3.default.createElement(Component,{tests}):null}},_a.defaultProps={active:!1},_a};var StatusTypes={PASSED_TYPE:"passed",FAILED_TYPE:"failed",PENDING_TYPE:"pending",TODO_TYPE:"todo"},List=import_theming3.styled.ul({listStyle:"none",fontSize:14,padding:0,margin:0}),Item=import_theming3.styled.li({display:"block",padding:0}),ProgressWrapper=import_theming3.styled.div({position:"relative",height:10,width:30,display:"flex",top:-2}),SuiteHead=import_theming3.styled.div({display:"flex",alignItems:"baseline",position:"absolute",zIndex:2,right:20,marginTop:15}),UnstyledSuiteTotals=({result,className,width})=>import_react4.default.createElement("div",{className},import_react4.default.createElement(import_react4.Fragment,null,width>325&&result.assertionResults?import_react4.default.createElement("div",null,result.assertionResults.length," ",result.assertionResults.length>1?"tests":"test"):null,width>280&&result.endTime&&result.startTime?import_react4.default.createElement("div",null,result.endTime-result.startTime,"ms"):null)),SuiteTotals=(0,import_theming3.styled)(UnstyledSuiteTotals)(({theme})=>({display:"flex",alignItems:"center",color:theme.color.dark,fontSize:"14px",marginTop:-5,"& > *":{marginRight:10}})),SuiteProgressPortion=import_theming3.styled.div(({color,progressPercent})=>({height:6,top:3,width:`${progressPercent}%`,backgroundColor:color})),getTestsByTypeMap=result=>{let testsByType=new Map;return result.assertionResults.forEach(assertion=>{testsByType.set(assertion.status,testsByType.get(assertion.status)?testsByType.get(assertion.status).concat(assertion):[assertion])}),testsByType},getColorByType=type=>{switch(type){case StatusTypes.PASSED_TYPE:return(0,import_theming3.convert)(import_theming3.themes.light).color.positive;case StatusTypes.FAILED_TYPE:return(0,import_theming3.convert)(import_theming3.themes.light).color.negative;case StatusTypes.PENDING_TYPE:return(0,import_theming3.convert)(import_theming3.themes.light).color.warning;case StatusTypes.TODO_TYPE:return(0,import_theming3.convert)(import_theming3.themes.light).color.purple;default:return null}},TestPanel=({test})=>{let{ref,width}=(0,import_react_resize_detector.useResizeDetector)(),{result}=test;if(!result||!result.assertionResults)return import_react4.default.createElement(import_components2.Placeholder,null,"This story has tests configured, but no file was found");let testsByType=getTestsByTypeMap(result),sortedTestsByCount=[...testsByType.entries()].sort((a,b)=>a[1].length-b[1].length);return import_react4.default.createElement("section",{ref},import_react4.default.createElement(SuiteHead,null,import_react4.default.createElement(SuiteTotals,{result,width}),width>240?import_react4.default.createElement(ProgressWrapper,null,sortedTestsByCount.map(entry=>import_react4.default.createElement(SuiteProgressPortion,{key:`progress-portion-${entry[0]}`,color:getColorByType(entry[0]),progressPercent:entry[1]?entry[1].length/result.assertionResults.length*100:0}))):null),import_react4.default.createElement(import_components2.TabsState,{initial:"failing-tests",backgroundColor:(0,import_theming3.convert)(import_theming3.themes.light).background.hoverable},import_react4.default.createElement("div",{id:"failing-tests",title:`${testsByType.get(StatusTypes.FAILED_TYPE)?testsByType.get(StatusTypes.FAILED_TYPE).length:0} Failed`,color:getColorByType(StatusTypes.FAILED_TYPE)},import_react4.default.createElement(List,null,testsByType.get(StatusTypes.FAILED_TYPE)?testsByType.get(StatusTypes.FAILED_TYPE).map(res=>import_react4.default.createElement(Item,{key:res.fullName||res.title},import_react4.default.createElement(Result,{...res}))):import_react4.default.createElement(import_components2.Placeholder,{key:`no-tests-${StatusTypes.FAILED_TYPE}`},"This story has no failing tests."))),import_react4.default.createElement("div",{id:"passing-tests",title:`${testsByType.get(StatusTypes.PASSED_TYPE)?testsByType.get(StatusTypes.PASSED_TYPE).length:0} Passed`,color:getColorByType(StatusTypes.PASSED_TYPE)},import_react4.default.createElement(List,null,testsByType.get(StatusTypes.PASSED_TYPE)?testsByType.get(StatusTypes.PASSED_TYPE).map(res=>import_react4.default.createElement(Item,{key:res.fullName||res.title},import_react4.default.createElement(Result,{...res}))):import_react4.default.createElement(import_components2.Placeholder,{key:`no-tests-${StatusTypes.PASSED_TYPE}`},"This story has no passing tests."))),import_react4.default.createElement("div",{id:"pending-tests",title:`${testsByType.get(StatusTypes.PENDING_TYPE)?testsByType.get(StatusTypes.PENDING_TYPE).length:0} Pending`,color:getColorByType(StatusTypes.PENDING_TYPE)},import_react4.default.createElement(List,null,testsByType.get(StatusTypes.PENDING_TYPE)?testsByType.get(StatusTypes.PENDING_TYPE).map(res=>import_react4.default.createElement(Item,{key:res.fullName||res.title},import_react4.default.createElement(Result,{...res}))):import_react4.default.createElement(import_components2.Placeholder,{key:`no-tests-${StatusTypes.PENDING_TYPE}`},"This story has no pending tests."))),import_react4.default.createElement("div",{id:"todo-tests",title:`${testsByType.get(StatusTypes.TODO_TYPE)?testsByType.get(StatusTypes.TODO_TYPE).length:0} Todo`,color:getColorByType(StatusTypes.TODO_TYPE)},import_react4.default.createElement(List,null,testsByType.get(StatusTypes.TODO_TYPE)?testsByType.get(StatusTypes.TODO_TYPE).map(res=>import_react4.default.createElement(Item,{key:res.fullName||res.title},import_react4.default.createElement(Result,{...res}))):import_react4.default.createElement(import_components2.Placeholder,{key:`no-tests-${StatusTypes.TODO_TYPE}`},"This story has no tests todo.")))))},Content=(0,import_theming3.styled)(({tests,className})=>import_react4.default.createElement("div",{className},tests.map(test=>import_react4.default.createElement(TestPanel,{key:test.name,test}))))({flex:"1 1 0%"}),Panel=({tests})=>import_react4.default.createElement(import_components2.ScrollArea,{vertical:!0},tests?import_react4.default.createElement(Content,{tests}):import_react4.default.createElement(import_components2.Placeholder,null,import_react4.default.createElement(import_react4.Fragment,null,"No tests found"),import_react4.default.createElement(import_react4.Fragment,null,"Learn how to\xA0",import_react4.default.createElement(import_components2.Link,{href:"https://github.com/storybookjs/storybook/tree/master/addons/jest",target:"_blank",withArrow:!0},"add Jest test results to your story"))));Panel.defaultProps={tests:null};var Panel_default=provideTests(Panel);import_manager_api.addons.register(ADDON_ID,api=>{import_manager_api.addons.addPanel(PANEL_ID,{title:"Tests",render:({active,key})=>React5.createElement(Panel_default,{key,api,active}),paramKey:PARAM_KEY})});
