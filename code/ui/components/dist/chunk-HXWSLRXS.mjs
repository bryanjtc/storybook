import{__commonJS}from"./chunk-NNAAFZ4U.mjs";var require_gap=__commonJS({"../../node_modules/refractor/lang/gap.js"(exports,module){module.exports=gap;gap.displayName="gap";gap.aliases=[];function gap(Prism){Prism.languages.gap={shell:{pattern:/^gap>[\s\S]*?(?=^gap>|$(?![\s\S]))/m,greedy:!0,inside:{gap:{pattern:/^(gap>).+(?:(?:\r(?:\n|(?!\n))|\n)>.*)*/,lookbehind:!0,inside:null},punctuation:/^gap>/}},comment:{pattern:/#.*/,greedy:!0},string:{pattern:/(^|[^\\'"])(?:'(?:[^\r\n\\']|\\.){1,10}'|"(?:[^\r\n\\"]|\\.)*"(?!")|"""[\s\S]*?""")/,lookbehind:!0,greedy:!0,inside:{continuation:{pattern:/([\r\n])>/,lookbehind:!0,alias:"punctuation"}}},keyword:/\b(?:Assert|Info|IsBound|QUIT|TryNextMethod|Unbind|and|atomic|break|continue|do|elif|else|end|fi|for|function|if|in|local|mod|not|od|or|quit|readonly|readwrite|rec|repeat|return|then|until|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:{pattern:/(^|[^\w.]|\.\.)(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?(?:_[a-z]?)?(?=$|[^\w.]|\.\.)/,lookbehind:!0},continuation:{pattern:/([\r\n])>/,lookbehind:!0,alias:"punctuation"},operator:/->|[-+*/^~=!]|<>|[<>]=?|:=|\.\./,punctuation:/[()[\]{},;.:]/},Prism.languages.gap.shell.inside.gap.inside=Prism.languages.gap}}});export{require_gap};
