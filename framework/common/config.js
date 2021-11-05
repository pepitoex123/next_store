

const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

const ALLOWED_FW = ["shopify","bigcommerce","shopify_local"]

function withFrameworkConfig(defaultConfig = {}) {
    let framework = defaultConfig?.framework?.name


    if(!framework){
        throw new Error("The api framework is missing, please add a valid provider!")
    }

    if(!ALLOWED_FW.includes(framework)){
        throw new Error("The api framework: " + framework + " that you entered is not available")
    }

    if(framework === "shopify_local"){
        framework = "shopify"
    }

    const frameworkNextConfig = require(path.join("../",framework,"next.config"))
    const config = merge(defaultConfig,frameworkNextConfig)

    const tsConfig = require(path.join(process.cwd(),"tsconfig.json"))

    tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`]
    tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`]

    fs.writeFileSync(
        path.join(process.cwd(),"tsconfig.json"),
        prettier.format(JSON.stringify(tsConfig),{parser: "json"})
    )

    return config
}


module.exports = {
    withFrameworkConfig
}