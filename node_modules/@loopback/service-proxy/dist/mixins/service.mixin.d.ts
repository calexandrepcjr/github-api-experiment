import { Binding, BindingFromClassOptions, Provider, Constructor } from '@loopback/context';
import { Application, MixinTarget, ServiceOptions, Component } from '@loopback/core';
import { BindingAddress, BindingFilter, JSONObject, Context, ContextSubscriptionManager, ContextEvent, Interceptor, InterceptorBindingOptions, ResolutionOptions, BindingKey, ValueOrPromise, ContextEventObserver, ContextObserver, Subscription, BindingComparator, ContextView, ResolutionSession, BindingCreationPolicy, ContextInspectOptions } from '@loopback/context';
import { Server, ApplicationConfig, ApplicationMetadata, LifeCycleObserver } from '@loopback/core';
/**
 * Interface for classes with `new` operator.
 */
export interface Class<T> {
    new (...args: any[]): T;
}
/**
 * A mixin class for Application that creates a .serviceProvider()
 * function to register a service automatically. Also overrides
 * component function to allow it to register repositories automatically.
 *
 * @example
 * ```ts
 * class MyApplication extends ServiceMixin(Application) {}
 * ```
 *
 * Please note: the members in the mixin function are documented in a dummy class
 * called <a href="#ServiceMixinDoc">ServiceMixinDoc</a>
 *
 */
export declare function ServiceMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        /**
         * Add a service to this application.
         *
         * @deprecated Use app.service() instead
         *
         * @param provider - The service provider to register.
         *
         * @example
         * ```ts
         * export interface GeocoderService {
         *   geocode(address: string): Promise<GeoPoint[]>;
         * }
         *
         * export class GeocoderServiceProvider implements Provider<GeocoderService> {
         *   constructor(
         *     @inject('services.geocoder')
         *     protected dataSource: juggler.DataSource = new GeocoderDataSource(),
         *   ) {}
         *
         *   value(): Promise<GeocoderService> {
         *     return getService(this.dataSource);
         *   }
         * }
         *
         * app.serviceProvider(GeocoderServiceProvider);
         * ```
         */
        serviceProvider<S>(provider: Constructor<Provider<S>>, nameOrOptions?: string | ServiceOptions | undefined): Binding<S>;
        /**
         * Add a component to this application. Also mounts
         * all the components services.
         *
         * @param component - The component to add.
         *
         * @example
         * ```ts
         *
         * export class ProductComponent {
         *   controllers = [ProductController];
         *   repositories = [ProductRepo, UserRepo];
         *   providers = {
         *     [AUTHENTICATION_STRATEGY]: AuthStrategy,
         *     [AUTHORIZATION_ROLE]: Role,
         *   };
         * };
         *
         * app.component(ProductComponent);
         * ```
         */
        component<T_1 extends Component = Component>(componentCtor: Constructor<T_1>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<T_1>;
        /**
         * Get an instance of a component and mount all it's
         * services. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount services of
         */
        mountComponentServices<T_2 extends Component = Component>(component: Constructor<T_2>, componentBindingKey?: string | BindingKey<T_2> | undefined): void;
        readonly options: ApplicationConfig;
        readonly state: string;
        controller: <T_3>(controllerCtor: Constructor<T_3>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_3>;
        server: <T_4 extends Server>(ctor: Constructor<T_4>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_4>;
        servers: <T_5 extends Server>(ctors: Constructor<T_5>[]) => Binding<any>[];
        getServer: <T_6 extends Server>(target: string | Constructor<T_6>) => Promise<T_6>;
        start: () => Promise<void>;
        stop: () => Promise<void>;
        setMetadata: (metadata: ApplicationMetadata) => void;
        lifeCycleObserver: <T_7 extends LifeCycleObserver>(ctor: Constructor<T_7>, nameOrOptions?: string | BindingFromClassOptions | undefined) => Binding<T_7>;
        service: <S_2>(cls: Constructor<S_2 | Provider<S_2>>, nameOrOptions?: string | ServiceOptions | undefined) => Binding<S_2>;
        interceptor: (interceptor: Interceptor | Constructor<Provider<Interceptor>>, nameOrOptions?: string | InterceptorBindingOptions | undefined) => Binding<Interceptor>;
        readonly name: string;
        readonly subscriptionManager: ContextSubscriptionManager;
        readonly parent: Context | undefined;
        emitEvent: <T_8 extends ContextEvent>(type: string, event: T_8) => void;
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
        createView: <T_9 = unknown>(filter: BindingFilter, comparator?: BindingComparator | undefined) => ContextView<T_9>;
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
        findOrCreateBinding: <T_10>(key: BindingAddress<T_10>, policy?: BindingCreationPolicy | undefined) => Binding<T_10>;
        getValueOrPromise: <ValueType_9>(keyWithPath: BindingAddress<ValueType_9>, optionsOrSession?: ResolutionOptions | ResolutionSession | undefined) => ValueOrPromise<ValueType_9 | undefined>;
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
 * Interface for an Application mixed in with ServiceMixin
 */
export interface ApplicationWithServices extends Application {
    serviceProvider<S>(provider: Class<Provider<S>>, name?: string): Binding<S>;
    component(component: Class<{}>, name?: string): Binding;
    mountComponentServices(component: Class<{}>): void;
}
/**
 * A dummy class created to generate the tsdoc for the members in service
 * mixin. Please don't use it.
 *
 * The members are implemented in function
 * <a href="#ServiceMixin">ServiceMixin</a>
 */
export declare class ServiceMixinDoc {
    constructor(...args: any[]);
    /**
     * Add a service to this application.
     *
     * @param provider - The service provider to register.
     *
     * @example
     * ```ts
     * export interface GeocoderService {
     *   geocode(address: string): Promise<GeoPoint[]>;
     * }
     *
     * export class GeocoderServiceProvider implements Provider<GeocoderService> {
     *   constructor(
     *     @inject('datasources.geocoder')
     *     protected dataSource: juggler.DataSource = new GeocoderDataSource(),
     *   ) {}
     *
     *   value(): Promise<GeocoderService> {
     *     return getService(this.dataSource);
     *   }
     * }
     *
     * app.serviceProvider(GeocoderServiceProvider);
     * ```
     */
    serviceProvider<S>(provider: Class<Provider<S>>): Binding<S>;
    /**
     * Add a component to this application. Also mounts
     * all the components services.
     *
     * @param component - The component to add.
     *
     * @example
     * ```ts
     *
     * export class ProductComponent {
     *   controllers = [ProductController];
     *   repositories = [ProductRepo, UserRepo];
     *   providers = {
     *     [AUTHENTICATION_STRATEGY]: AuthStrategy,
     *     [AUTHORIZATION_ROLE]: Role,
     *   };
     * };
     *
     * app.component(ProductComponent);
     * ```
     */
    component(component: Class<unknown>): Binding;
    /**
     * Get an instance of a component and mount all it's
     * services. This function is intended to be used internally
     * by component()
     *
     * @param component - The component to mount services of
     */
    mountComponentServices(component: Class<unknown>): void;
}
