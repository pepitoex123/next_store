

const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");

function withFrameworkConfig(defaultConfig = {}) {
    const framework = "shopify"

    const frameworkNextConfig = require(path.join("../",framework,"next.config"))
    const config = merge(defaultConfig,frameworkNextConfig)

    const tsConfig = require(path.join(process.cwd(),"tsconfig.json"))

    tsConfig.compilerOptions.paths["@framework"] = [`framework/${framework}`]
    tsConfig.compilerOptions.paths["@framework/*"] = [`framework/${framework}/*`]

    fs.writeFileSync(
        path.join(process.cwd(),"tsconfig.json"),
        JSON.stringify(tsConfig,null,2)
    )

    return config
}


module.exports = {
    withFrameworkConfig
}