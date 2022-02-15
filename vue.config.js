const path = require("path")
const plusWebpack =  require('unplugin-element-plus/webpack')
console.log(plusWebpack);
function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {

    chainWebpack:(config)=>{
        // console.log(config)
        config.resolve.alias.set("@",resolve("./src"));
    },
    configureWebpack: {
        plugins: [
          require('unplugin-element-plus/webpack').default({
            // options
          }),
        ],
      },
    
}