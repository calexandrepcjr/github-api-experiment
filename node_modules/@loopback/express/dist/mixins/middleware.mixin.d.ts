import { Binding, BindingAddress, Constructor, Context, MixinTarget, Provider } from '@loopback/core';
import { ExpressMiddlewareFactory, ExpressRequestHandler, Middleware, MiddlewareBindingOptions } from '../types';
import { JSONObject, ContextSubscriptionManager, ContextEvent, ResolutionOptions, BindingKey, BindingFilter, ValueOrPromise, ContextEventObserver, ContextObserver, Subscription, BindingComparator, ContextView, ResolutionSession, BindingCreationPolicy, ContextInspectOptions } from '@loopback/context';
export declare function MiddlewareMixin<T extends MixinTarget<Context>>(superClass: T): {
    new (...args: any[]): {
        /**
         * Bind an Express middleware to this server context
         *
         * @example
         * ```ts
         * import myExpressMiddlewareFactory from 'my-express-middleware';
         * const myExpressMiddlewareConfig= {};
         * const myExpressMiddleware = myExpressMiddlewareFactory(myExpressMiddlewareConfig);
         * server.expressMiddleware('middleware.express.my', myExpressMiddleware);
         * // Or
         * server.expressMiddleware('middleware.express.my', [myExpressMiddleware]);
         * ```
         * @param key - Middleware binding key
         * @param middleware - Express middleware handler function(s)
         *
         */
        expressMiddleware(key: BindingAddress, middleware: ExpressRequestHandler | ExpressRequestHandler[], options?: MiddlewareBindingOptions | undefined): Binding<Middleware>;
        /**
         * Bind an Express middleware to this server context
         *
         * @example
         * ```ts
         * import myExpressMiddlewareFactory from 'my-express-middleware';
         * const myExpressMiddlewareConfig= {};
         * const myExpressMiddleware = myExpressMiddlewareFactory(myExpressMiddlewareConfig);
         * server.expressMiddleware('middleware.express.my', myExpressMiddleware);
         * // Or
         * server.expressMiddleware('middleware.express.my', [myExpressMiddleware]);
         * ```
         * @param key - Middleware binding key
         * @param middleware - Express middleware handler function(s)
         *
         */
        expressMiddleware<CFG>(middlewareFactory: ExpressMiddlewareFactory<CFG>, middlewareConfig?: CFG | undefined, options?: MiddlewareBindingOptions | undefined): Binding<Middleware>;
        /**
         * Bind an Express middleware to this server context
         *
         * @example
         * ```ts
         * import myExpressMiddlewareFactory from 'my-express-middleware';
         * const myExpressMiddlewareConfig= {};
         * const myExpressMiddleware = myExpressMiddlewareFactory(myExpressMiddlewareConfig);
         * server.expressMiddleware('middleware.express.my', myExpressMiddleware);
         * // Or
         * server.expressMiddleware('middleware.express.my', [myExpressMiddleware]);
         * ```
         * @param key - Middleware binding key
         * @param middleware - Express middleware handler function(s)
         *
         */
        expressMiddleware<CFG_1>(factoryOrKey: string | BindingKey<Middleware> | ExpressMiddlewareFactory<CFG_1>, configOrHandler: ExpressRequestHandler | ExpressRequestHandler[] | CFG_1, options?: MiddlewareBindingOptions | undefined): Binding<Middleware>;
        /**
         * Register a middleware function or provider class
         *
         * @example
         * ```ts
         * const log: Middleware = async (requestCtx, next) {
         *   // ...
         * }
         * server.middleware(log);
         * ```
         *
         * @param middleware - Middleware function or provider class
         * @param options - Middleware binding options
         */
        middleware(middleware: Middleware | Constructor<Provider<Middleware>>, options?: MiddlewareBindingOptions): Binding<Middleware>;
        readonly name: string;
        readonly subscriptionManager: ContextSubscriptionManager;
        readonly parent: Context | undefined;
        emitEvent: <T_1 extends ContextEvent>(type: string, event: T_1) => void;
        emitError: (err: unknown) => void;
        bind: <ValueType = any>(key: BindingAddress<ValueType>) => Binding<ValueType>;
        add: (binding: Binding<unknown>) => Context;
        configure: <ConfigValueType = any>(key?: string | BindingKey<unknown> | undefined) => Binding<ConfigValueType>;
        getConfigAsValueOrPromise: <ConfigValueType_1>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => ValueOrPromise<ConfigValueType_1 | undefined>;
        getConfig: <ConfigValueType_2>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => Promise<ConfigValueType_2 | undefined>;
        getConfigSync: <ConfigValueType_3>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => ConfigValueType_3 | undefined;
        unbind: (key: BindingAddress<unknown>) => boolean;
        subscribe: (observer: ContextEventObserver) => Subscription;
        unsubscribe: (observer: ContextEventObserver) => boolean;
        close: () => void;
        isSubscribed: (observer: ContextObserver) => boolean;
        createView: <T_2 = unknown>(filter: BindingFilter, comparator?: BindingComparator | undefined) => ContextView<T_2>;
        contains: (key: BindingAddress<unknown>) => boolean;
        isBound: (key: BindingAddress<unknown>) => boolean;
        getOwnerContext: (key: BindingAddress<unknown>) => Context | undefined;
        find: <ValueType_1 = any>(pattern?: string | RegExp | BindingFilter | undefined) => Readonly<Binding<ValueType_1>>[];
        findByTag: <ValueType_2 = any>(tagFilter: string | RegExp | Record<string, any>) => Readonly<Binding<ValueType_2>>[];
        get: {
            <ValueType_3>(keyWithPath: BindingAddress<ValueType_3>, session?: ResolutionSession | undefined): Promise<ValueType_3>;
            <ValueType_4>(keyWithPath: BindingAddress<ValueType_4>, options: ResolutionOptions): Promise<ValueType_4 | undefined>;
        };
        getSync: {
            <ValueType_5>(keyWithPath: BindingAddress<ValueType_5>, session?: ResolutionSession | undefined): ValueType_5;
            <ValueType_6>(keyWithPath: BindingAddress<ValueType_6>, options?: ResolutionOptions | undefined): ValueType_6 | undefined;
        };
        getBinding: {
            <ValueType_7 = any>(key: BindingAddress<ValueType_7>): Binding<ValueType_7>;
            <ValueType_8>(key: BindingAddress<ValueType_8>, options?: {
                optional?: boolean | undefined;
            } | undefined): Binding<ValueType_8> | undefined;
        };
        findOrCreateBinding: <T_3>(key: BindingAddress<T_3>, policy?: BindingCreationPolicy | undefined) => Binding<T_3>;
        getValueOrPromise: <ValueType_9>(keyWithPath: BindingAddress<ValueType_9>, optionsOrSession?: ResolutionOptions | ResolutionSession | undefined) => ValueOrPromise<ValueType_9 | undefined>;
        toJSON: () => JSONObject;
        inspect: (options?: ContextInspectOptions | undefined) => JSONObject;
        addListener: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        on: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        once: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        prependListener: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        removeListener: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        off: (event: string | symbol, listener: (...args: any[]) => void) => Context;
        removeAllListeners: (event?: string | symbol | undefined) => Context;
        setMaxListeners: (n: number) => Context;
        getMaxListeners: () => number;
        listeners: (event: string | symbol) => Function[];
        rawListeners: (event: string | symbol) => Function[];
        emit: (event: string | symbol, ...args: any[]) => boolean;
        eventNames: () => (string | symbol)[];
        listenerCount: (type: string | symbol) => number;
    };
} & T;
