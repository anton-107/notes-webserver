"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const path_1 = require("path");
const get_home_1 = require("./routes/get-home");
const get_new_notebook_1 = require("./routes/get-new-notebook");
const get_signin_1 = require("./routes/get-signin");
const post_notebook_1 = require("./routes/post-notebook");
const post_signin_1 = require("./routes/post-signin");
const post_signout_1 = require("./routes/post-signout");
exports.routes = [
    {
        method: "GET",
        path: "/home",
        import: (0, path_1.join)(__dirname, "./routes/get-home"),
        action: get_home_1.getHomeHandler.name,
    },
    {
        method: "GET",
        path: "/signin",
        import: (0, path_1.join)(__dirname, "./routes/get-signin"),
        action: get_signin_1.getSigninHandler.name,
    },
    {
        method: "POST",
        path: "/signin",
        import: (0, path_1.join)(__dirname, "./routes/post-signin"),
        action: post_signin_1.postSigninHandler.name,
    },
    {
        method: "POST",
        path: "/signout",
        import: (0, path_1.join)(__dirname, "./routes/post-signout"),
        action: post_signout_1.postSignoutHandler.name,
    },
    {
        method: "GET",
        path: "/new-notebook",
        import: (0, path_1.join)(__dirname, "./routes/get-new-notebook"),
        action: get_new_notebook_1.getNewNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/notebook",
        import: (0, path_1.join)(__dirname, "./routes/post-notebook"),
        action: post_notebook_1.postNotebookHandler.name,
    },
];
//# sourceMappingURL=router.js.map