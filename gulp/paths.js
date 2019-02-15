"use strict";
var paths = {};

// Folder naming conventions.
paths.assetsFolderName = "assets";
paths.dataFolderName = "_data";
paths.iconFolderName = "icons";
paths.includesFolderName = "_includes";
paths.imageFolderName = "images";
paths.layoutsFolderName = "_layouts";
paths.scriptFolderName = "javascripts";
paths.siteFolderName = "dist";
paths.sourceFolderName = "src";
paths.stylesFolderName = "stylesheets";
paths.tempFolderName = ".tmp";

paths.prodUrl = "https://mademistakes.com";

// Directory locations.
paths.sourceDir = paths.sourceFolderName + "/";
paths.assetsDir = paths.assetsFolderName + "/";
paths.tempDir = paths.tempFolderName + "/";
paths.siteDir = paths.siteFolderName + "/";

// Source asset files locations.
paths.sassFiles = paths.sourceDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFiles = paths.sourceDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFiles = paths.sourceDir + paths.assetsDir + paths.iconFolderName;
paths.imageFiles = paths.sourceDir + paths.assetsDir + paths.imageFolderName;
paths.fontFiles = paths.sourceDir + paths.assetsDir + paths.fontFolderName;

// Temp asset files locations.
paths.assetFilesTemp = paths.tempDir + paths.assetsFolderName;
paths.sassFilesTemp = paths.tempDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFilesTemp = paths.tempDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFilesTemp = paths.tempDir + paths.assetsDir + paths.iconFolderName;
paths.imageFilesTemp = paths.tempDir + paths.assetsDir + paths.imageFolderName;
paths.fontFilesTemp = paths.tempDir + paths.assetsDir + paths.fontFolderName;

// Site asset files locations.
paths.assetFilesSite = paths.siteDir + paths.assetsFolderName;
paths.sassFilesSite = paths.siteDir + paths.assetsDir + paths.stylesFolderName;
paths.jsFilesSite = paths.siteDir + paths.assetsDir + paths.scriptFolderName;
paths.iconFilesSite = paths.siteDir + paths.assetsDir + paths.iconFolderName;
paths.imageFilesSite = paths.siteDir + paths.assetsDir + paths.imageFolderName;
paths.fontFilesSite = paths.siteDir + paths.assetsDir + paths.fontFolderName;

// Glob patterns by file type.
paths.sassPattern = "/**/*.scss";
paths.jsPattern = "/**/*.js";
paths.imagePattern =
  "/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)";
paths.markdownPattern = "/**/*.+(md|MD|markdown|MARKDOWN)";
paths.htmlPattern = "/**/*.html";
paths.txtPattern = "/**/*.txt";
paths.xmlPattern = "/**/*.{xml,json}";
paths.ymlPattern = "/**/*.yml";

// File globs
paths.htmlFilesGlob = paths.sourceFolderName + paths.htmlPattern;
paths.imageFilesGlob = paths.imageFiles + paths.imagePattern;
paths.jsFilesGlob = paths.jsFiles + paths.jsPattern;
paths.mdFilesGlob = paths.sourceFolderName + paths.markdownPattern;
paths.sassFilesGlob = paths.sassFiles + paths.sassPattern;
paths.txtFilesGlob = paths.sourceFolderName + paths.txtPattern;
paths.xmlFilesGlob = paths.sourceFolderName + paths.xmlPattern;
paths.ymlFilesGlob = paths.sourceFolderName + paths.ymlPattern;

var imageFilesCachePath;

if (process.env.CONTEXT === "production") {
  paths.imageFilesCachePath = "/opt/build/cache/assets/images";
} else {
  paths.imageFilesCachePath = paths.imageFilesSite;
}

module.exports = paths;
