module.exports = function override(config, env) {
  config.resolve.extensionAlias = {
    ".js": [".ts", ".js"],
    ".jsx": [".tsx", ".jsx"],
  }
  return config
}
