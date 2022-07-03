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
const get_one_notebook_1 = require("./routes/get-one-notebook");
const get_edit_notebook_1 = require("./routes/get-edit-notebook");
const post_edit_notebook_1 = require("./routes/post-edit-notebook");
const post_delete_notebook_1 = require("./routes/post-delete-notebook");
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
    {
        method: "GET",
        path: "/notebook/:notebookID",
        import: (0, path_1.join)(__dirname, "./routes/get-one-notebook"),
        action: get_one_notebook_1.getOneNotebookHandler.name,
    },
    {
        method: "GET",
        path: "/notebook/:notebookID/edit",
        import: (0, path_1.join)(__dirname, "./routes/get-edit-notebook"),
        action: get_edit_notebook_1.getEditNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/notebook/:notebookID/edit",
        import: (0, path_1.join)(__dirname, "./routes/post-edit-notebook"),
        action: post_edit_notebook_1.postEditNotebookHandler.name,
    },
    {
        method: "POST",
        path: "/delete-notebook",
        import: (0, path_1.join)(__dirname, "./routes/post-delete-notebook"),
        action: post_delete_notebook_1.deleteOneNotebookHandler.name,
    },
];
//# sourceMappingURL=router.js.map