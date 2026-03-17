const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = path.resolve(__dirname);

// EAS may execute Metro with cwd at ./android; force root so Expo config resolution works.
if (process.cwd() !== projectRoot) {
    process.chdir(projectRoot);
}

const config = getDefaultConfig(projectRoot);

config.projectRoot = projectRoot;
config.watchFolders = [projectRoot];

module.exports = withNativeWind(config, {
    input: path.resolve(projectRoot, "global.css"),
    configPath: path.resolve(projectRoot, "tailwind.config.js"),
});
