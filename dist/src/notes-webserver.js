"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesWebserver = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const authenticator_1 = require("authentication-module/src/authenticator");
const argon2_hashing_1 = require("authentication-module/src/argon2-hashing");
const jwt_serializer_1 = require("authentication-module/src/jwt-serializer");
class NotesWebserver {
  constructor(properties) {
    this.app = (0, express_1.default)();
    this.app.use((0, cookie_parser_1.default)());
    const authenticator = new authenticator_1.Authenticator({
      userStore: properties.userStore,
      passwordHashingFunction: new argon2_hashing_1.Argon2HashingFunction(),
      authTokensSerializer: new jwt_serializer_1.JWTSerializer(
        properties.jwtSerializerSecretKey
      ),
    });
    this.app.get("/home", (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        const responseToAnonymous =
          "<h1>hello anonymous!</h1><a data-testid='sign-in-link' href='/signin'>Sign in</a>";
        const authToken = req.cookies["Authentication"];
        if (!authToken) {
          res.send(responseToAnonymous);
          return;
        }
        const user = yield authenticator.authenticate(authToken);
        if (!user.isAuthenticated) {
          res.send(responseToAnonymous);
          return;
        }
        res.send(
          `<h1 data-testid='user-greeting'>hello ${user.username}!</h1><form method='post' action='/signout'><button type='submit' data-testid='sign-out-button'>Sign out</button></form>`
        );
      })
    );
    this.app.get("/signin", (req, res) => {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(`<form method='post' action='/signin'>
        <input name='user-login' data-testid='user-login' />
        <input name='user-password' data-testid='user-password' type='password' />
      </form>`);
    });
    this.app.post("/signin", body_parser_1.default.urlencoded(), (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        const signinResult = yield authenticator.signIn(
          req.body["user-login"],
          req.body["user-password"]
        );
        res.cookie("Authentication", signinResult.accessToken);
        res.setHeader("Location", "/home");
        res.sendStatus(303);
      })
    );
    this.app.post("/signout", (req, res) =>
      __awaiter(this, void 0, void 0, function* () {
        res.clearCookie("Authentication");
        res.send(
          `<div data-testid='signout-complete'>You are signed out</div>`
        );
      })
    );
  }
  listen(port) {
    this.server = this.app.listen(port);
  }
  stop() {
    this.server.close();
  }
}
exports.NotesWebserver = NotesWebserver;
//# sourceMappingURL=notes-webserver.js.map
