module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      ["module-resolver", {
        "root": ["./"],
        "alias": {
          "@src": "./src",
          "@components": "./src/components",
          "@store": "./src/store/ducks",
          "@services": "./src/services",
          "@styles": "./src/assets/styles",
          "@img": "./src/assets/img",
          "@svg": "./src/assets/svg",
          "@pages": "./src/pages",
        },
        "extensions": [
          ".js",
          ".ios.js",
          ".android.js"
        ]
      }]
    ]
  };
  