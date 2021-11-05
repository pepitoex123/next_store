

const path = require("path");
const fs = require("fs");
const merge = require("deepmerge");
const prettier = require("prettier");

function withFrameworkConfig(defaultConfig = {}) {
    const framework = defaultConfig?.framework.name

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