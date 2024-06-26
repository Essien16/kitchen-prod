const glob = require("glob");
const express = require("express");

const router = express.Router();

glob
    .sync("*.js", {
        cwd: __dirname,
        ignore: "index.js"
    })
    .forEach((file) => {
        console.log(`Loading route file: ${file}`);
        const fileRoutes = require(`./${file}`);
        if (!fileRoutes || !fileRoutes.router || !fileRoutes.baseUrl) {
            console.error(`Error with route file: ${file}`);
        } else {
            console.log(`Using route: ${fileRoutes.baseUrl}`);
            router.use(fileRoutes.baseUrl, fileRoutes.router);
        }
    });

module.exports = router;
