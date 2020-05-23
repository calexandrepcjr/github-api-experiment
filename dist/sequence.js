"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySequence = void 0;
const tslib_1 = require("tslib");
const context_1 = require("@loopback/context");
const rest_1 = require("@loopback/rest");
const SequenceActions = rest_1.RestBindings.SequenceActions;
let MySequence = /** @class */ (() => {
    let MySequence = class MySequence {
        constructor(findRoute, parseParams, invoke, send, reject) {
            this.findRoute = findRoute;
            this.parseParams = parseParams;
            this.invoke = invoke;
            this.send = send;
            this.reject = reject;
            /**
             * Optional invoker for registered middleware in a chain.
             * To be injected via SequenceActions.INVOKE_MIDDLEWARE.
             */
            this.invokeMiddleware = () => false;
        }
        async handle(context) {
            try {
                const { request, response } = context;
                const finished = await this.invokeMiddleware(context);
                if (finished)
                    return;
                const route = this.findRoute(request);
                const args = await this.parseParams(request, route);
                const result = await this.invoke(route, args);
                this.send(response, result);
            }
            catch (err) {
                this.reject(context, err);
            }
        }
    };
    tslib_1.__decorate([
        context_1.inject(SequenceActions.INVOKE_MIDDLEWARE, { optional: true }),
        tslib_1.__metadata("design:type", Function)
    ], MySequence.prototype, "invokeMiddleware", void 0);
    MySequence = tslib_1.__decorate([
        tslib_1.__param(0, context_1.inject(SequenceActions.FIND_ROUTE)),
        tslib_1.__param(1, context_1.inject(SequenceActions.PARSE_PARAMS)),
        tslib_1.__param(2, context_1.inject(SequenceActions.INVOKE_METHOD)),
        tslib_1.__param(3, context_1.inject(SequenceActions.SEND)),
        tslib_1.__param(4, context_1.inject(SequenceActions.REJECT)),
        tslib_1.__metadata("design:paramtypes", [Function, Function, Function, Function, Function])
    ], MySequence);
    return MySequence;
})();
exports.MySequence = MySequence;
//# sourceMappingURL=sequence.js.map