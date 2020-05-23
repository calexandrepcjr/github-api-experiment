"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const github_user_service_1 = require("../services/github-user.service");
let UsersController = /** @class */ (() => {
    let UsersController = class UsersController {
        constructor(githubUserService, req) {
            this.githubUserService = githubUserService;
            this.req = req;
        }
        async since(since) {
            const users = await this.githubUserService.since(since);
            console.log("USERS", users);
            return {
                users: users.body,
                next: this.nextLink(users.headers.link.toString()),
            };
        }
        nextLink(link) {
            return link.split(";")[0].replace(/<|>/gi, "");
        }
    };
    tslib_1.__decorate([
        rest_1.get("/users", {
            responses: {
                "200": {
                    description: "This endpoint must return a list of GitHub users and the link for the next page. ",
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    users: {
                                        description: "List of Github users",
                                        type: "array",
                                        items: {
                                            type: "object",
                                        },
                                    },
                                    next: {
                                        description: "Next users page URL",
                                        type: "string",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }),
        tslib_1.__param(0, rest_1.param.query.number("since")),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Number]),
        tslib_1.__metadata("design:returntype", Promise)
    ], UsersController.prototype, "since", null);
    UsersController = tslib_1.__decorate([
        tslib_1.__param(0, core_1.service(github_user_service_1.GithubUserProvider)),
        tslib_1.__param(1, core_1.inject(rest_1.RestBindings.Http.REQUEST)),
        tslib_1.__metadata("design:paramtypes", [Object, Object])
    ], UsersController);
    return UsersController;
})();
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map