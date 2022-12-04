"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesWebserver = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
class NotesWebserver {
    constructor(properties) {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)({
            origin: properties.corsHeaders["Access-Control-Allow-Origin"],
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        properties.routes.forEach((route) => {
            switch (route.method) {
                case "GET":
                    return this.app.get(route.path, async (req, res) => {
                        const module = await Promise.resolve().then(() => __importStar(require(route.import)));
                        const handler = module[route.action];
                        const response = await handler({
                            headers: req.headers,
                            pathParameters: req.params,
                            queryStringParameters: this.parsedQSToMap(req.query),
                        });
                        Object.keys(response.headers).forEach((k) => {
                            res.setHeader(k, response.headers[k]);
                        });
                        res.status(response.statusCode);
                        res.send(response.body);
                    });
                case "POST":
                    return this.app.post(route.path, body_parser_1.default.raw({ type: () => true }), async (req, res) => {
                        const module = await Promise.resolve().then(() => __importStar(require(route.import)));
                        const handler = module[route.action];
                        const response = await handler({
                            body: req.body.toString("utf-8"),
                            headers: req.headers,
                            pathParameters: req.params,
                            queryStringParameters: this.parsedQSToMap(req.query),
                        });
                        Object.keys(response.headers).forEach((k) => {
                            res.setHeader(k, response.headers[k]);
                        });
                        res.status(response.statusCode);
                        res.send(response.body);
                    });
            }
        });
    }
    listen(port) {
        this.server = this.app.listen(port);
    }
    stop() {
        this.server.close();
    }
    parsedQSToMap(qs) {
        const r = {};
        Object.keys(qs).forEach(k => {
            r[k] = String(qs[k]);
        });
        return r;
    }
}
exports.NotesWebserver = NotesWebserver;
//# sourceMappingURL=notes-webserver.js.map