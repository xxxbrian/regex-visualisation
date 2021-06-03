const React = require("react")
const ReactDOMServer = require("react-dom/server")
const fs = require("fs")
const path = require("path")
const MinimumRailroad = require("../dest/index.js")
const exportList = [
  {
    name: "characters",
    regex: "/abc/",
    selected: false,
  },
  {
    name: "selected",
    regex: "/abc/",
    selected: true,
  },
]
const classRegexp = / class="[\w-]+"/g
const assetsDir = path.resolve(__dirname, "../src/assets/")

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir)
}

exportList.forEach(({ name, regex, selected }) => {
  const string = ReactDOMServer.renderToString(
    React.createElement(MinimumRailroad, { regex, selected })
  ).replace(classRegexp, "")

  fs.writeFileSync(path.resolve(assetsDir, name + ".svg"), string)
})
