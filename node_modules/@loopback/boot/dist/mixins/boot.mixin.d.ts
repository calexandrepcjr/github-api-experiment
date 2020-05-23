import { Binding, BindingFilter, BindingFromClassOptions, Constructor, Context } from '@loopback/context';
import { Application, Component, MixinTarget } from '@loopback/core';
import { Bootable, Booter, BootOptions } from '../types';
import { BindingAddress, JSONObject, Provider, ContextSubscriptionManager, ContextEvent, Interceptor, InterceptorBindingOptions, ResolutionOptions, BindingKey, ValueOrPromise, ContextEventObserver, ContextObserver, Subscription, BindingComparator, ContextView, ResolutionSession, BindingCreationPolicy, ContextInspectOptions } from '@loopback/context';
import { Server, ApplicationConfig, ApplicationMetadata, LifeCycleObserver, ServiceOptions } from '@loopback/core';
export { Binding };
/**
 * Mixin for @loopback/boot. This Mixin provides the following:
 * - Implements the Bootable Interface as follows.
 * - Add a `projectRoot` property to the Class
 * - Adds an optional `bootOptions` property to the Class that can be used to
 *    store the Booter conventions.
 * - Adds the `BootComponent` to the Class (which binds the Bootstrapper and default Booters)
 * - Provides the `boot()` convenience method to call Bootstrapper.boot()
 * - Provides the `booter()` convenience method to bind a Booter(s) to the Application
 * - Override `component()` to call `mountComponentBooters`
 * - Adds `mountComponentBooters` which binds Booters to the application from `component.booters[]`
 */
export declare function BootMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        projectRoot: string;
        bootOptions?: BootOptions | undefined;
        /**
         * Convenience method to call bootstrapper.boot() by resolving bootstrapper
         */
        boot(): Promise<void>;
        /**
         * Given a N number of Booter Classes, this method binds them using the
         * prefix and tag expected by the Bootstrapper.
         *
         * @param booterCls - Booter classes to bind to the Application
         *
         * @example
         * ```ts
         * app.booters(MyBooter, MyOtherBooter)
         * ```
         */
        booters(...booterCls: Constructor<Booter>[]): Binding[];
        /**
         * Register a booter to boot a sub-application. See
         * {@link createComponentApplicationBooterBinding} for more details.
         *
         * @param subApp - A sub-application with artifacts to be booted
         * @param filter - A binding filter to select what bindings from the sub
         * application should be added to the main application.
         */
        applicationBooter(subApp: Application & Bootable, filter?: BindingFilter | undefined): Binding<Booter>;
        /**
         * Override to ensure any Booter's on a Component are also mounted.
         *
         * @param component - The component to add.
         *
         * @example
         * ```ts
         *
         * export class ProductComponent {
         *   booters = [ControllerBooter, RepositoryBooter];
         *   providers = {
         *     [AUTHENTICATION_STRATEGY]: AuthStrategy,
         *     [AUTHORIZATION_ROLE]: Role,
         *   };
         * };
         *
         * app.component(ProductComponent);
         * ```
         */
        component<C extends Component = Component>(componentCtor: Constructor<C>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<C>;
        /**
         * Get an instance of a component and mount all it's
         * booters. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount booters of
         */
        mountComponentBooters(component: Constructor<{}>): void;
        readonly options: ApplicationConfig;
        readonly state: string;
        controller: <T_1>(controllerCtor: Constructor<T_1>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_1>;
        server: <T_2 extends Server>(ctor: Constructor<T_2>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_2>;
        servers: <T_3 extends Server>(ctors: Constructor<T_3>[]) => Binding<any>[];
        getServer: <T_4 extends Server>(target: string | Constructor<T_4>) => Promise<T_4>;
        start: () => Promise<void>;
        stop: () => Promise<void>;
        setMetadata: (metadata: ApplicationMetadata) => void;
        lifeCycleObserver: <T_5 extends LifeCycleObserver>(ctor: Constructor<T_5>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_5>;
        service: <S>(cls: Constructor<S | Provider<S>>, nameOrOptions?: string | ServiceOptions | undefined) => Binding<S>;
        interceptor: (interceptor: Interceptor | Constructor<Provider<Interceptor>>, nameOrOptions?: string | InterceptorBindingOptions | undefined) => Binding<Interceptor>;
        readonly name: string;
        readonly subscriptionManager: ContextSubscriptionManager;
        readonly parent: Context | undefined;
        emitEvent: <T_6 extends ContextEvent>(type: string, event: T_6) => void;
        emitError: (err: unknown) => void;
        bind: <ValueType = any>(key: BindingAddress<ValueType>) => Binding<ValueType>;
        add: (binding: Binding<unknown>) => Application;
        configure: <ConfigValueType = any>(key?: string | BindingKey<unknown> | undefined) => Binding<ConfigValueType>;
        getConfigAsValueOrPromise: <ConfigValueType_1>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => ValueOrPromise<ConfigValueType_1 | undefined>;
        getConfig: <ConfigValueType_2>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => Promise<ConfigValueType_2 | undefined>;
        getConfigSync: <ConfigValueType_3>(key: BindingAddress<unknown>, propertyPath?: string | undefined, resolutionOptions?: ResolutionOptions | undefined) => ConfigValueType_3 | undefined;
        unbind: (key: BindingAddress<unknown>) => boolean;
        subscribe: (observer: ContextEventObserver) => Subscription;
        unsubscribe: (observer: ContextEventObserver) => boolean;
        close: () => void;
        isSubscribed: (observer: ContextObserver) => boolean;
        createView: <T_7 = unknown>(filter: BindingFilter, comparator?: BindingComparator | undefined) => ContextView<T_7>;
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
        findOrCreateBinding: <T_8>(key: BindingAddress<T_8>, policy?: BindingCreationPolicy | undefined) => Binding<T_8>;
        getValueOrPromise: <ValueType_9>(keyWithPath: BindingAddress<ValueType_9>, optionsOrSession?: ResolutionSession | ResolutionOptions | undefined) => ValueOrPromise<ValueType_9 | undefined>;
        toJSON: () => JSONObject;
        inspect: (options?: ContextInspectOptions | undefined) => JSONObject;
        addListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        on: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        once: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        prependListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        prependOnceListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeListener: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        off: (event: string | symbol, listener: (...args: any[]) => void) => Application;
        removeAllListeners: (event?: string | symbol | undefined) => Application;
        setMaxListeners: (n: number) => Application;
        getMaxListeners: () => number;
        listeners: (event: string | symbol) => Function[];
        rawListeners: (event: string | symbol) => Function[];
        emit: (event: string | symbol, ...args: any[]) => boolean;
        eventNames: () => (string | symbol)[];
        listenerCount: (type: string | symbol) => number;
    };
} & T;
/**
 * Method which binds a given Booter to a given Context with the Prefix and
 * Tags expected by the Bootstrapper
 *
 * @param ctx - The Context to bind the Booter Class
 * @param booterCls - Booter class to be bound
 */
export declare function _bindBooter(ctx: Context, booterCls: Constructor<Booter>): Binding;
