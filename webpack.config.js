/// <binding ProjectOpened='Watch - Development' />
"use strict";

module.exports = {
    entry: "./client/app.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/public/"
    }
}