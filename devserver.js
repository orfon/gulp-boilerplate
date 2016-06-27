"use strict";

const config = require("./config/development");

const fs = require("fs");
const strings = require("ringo/utils/strings");
const response = require("ringo/jsgi/response");

// look for asset directories
const assetDirs = fs.list("./dist").filter(function(path) {
   return fs.isDirectory(fs.join(".", "dist", path));
});

exports.app = function(req) {
   if (req.pathInfo.indexOf(config.rootPath) === 0) {
      // check if static resource
      for (let i = 0; i < assetDirs.length; i++) {
         if (req.pathInfo.indexOf(config.rootPath + assetDirs[i]) === 0) {
            let filePath = fs.join("dist", req.pathInfo.substr(config.rootPath.length));
            return response.static(module.resolve(filePath));
         }
      }

      // check if it's a html page
      if (strings.endsWith(req.pathInfo, ".html")) {
         // serve the requested html resource
         return response.static(module.resolve("./dist/" + req.pathInfo.split("/").slice(-1)[0]));
      } else {
         // fallback to index.html for all other paths
         return response.static(module.resolve("./dist/index.html"));
      }
   }

   return response.redirect(config.rootPath);
};

// Script to run app from command line
if (require.main === module) {
   require("ringo/httpserver").main(module.id);
}