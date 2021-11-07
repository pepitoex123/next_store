
const {withFrameworkConfig} = require("./framework/common/config")


module.exports = withFrameworkConfig({
  framework: {
    name: "shopify"
  },
  reactStrictMode: true,
})


console.log("next.config.js", JSON.stringify(module.exports,null,2))
