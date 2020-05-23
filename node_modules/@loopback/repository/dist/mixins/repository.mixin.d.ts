import { Binding, BindingFromClassOptions } from '@loopback/context';
import { Application, Component, Constructor, MixinTarget } from '@loopback/core';
import { Class } from '../common-types';
import { SchemaMigrationOptions } from '../datasource';
import { juggler, Repository } from '../repositories';
import { BindingAddress, BindingFilter, JSONObject, Provider, Context, ContextSubscriptionManager, ContextEvent, Interceptor, InterceptorBindingOptions, ResolutionOptions, BindingKey, ValueOrPromise, ContextEventObserver, ContextObserver, Subscription, BindingComparator, ContextView, ResolutionSession, BindingCreationPolicy, ContextInspectOptions } from '@loopback/context';
import { Server, ApplicationConfig, ApplicationMetadata, LifeCycleObserver, ServiceOptions } from '@loopback/core';
/**
 * A mixin class for Application that creates a .repository()
 * function to register a repository automatically. Also overrides
 * component function to allow it to register repositories automatically.
 *
 * @example
 * ```ts
 * class MyApplication extends RepositoryMixin(Application) {}
 * ```
 *
 * Please note: the members in the mixin function are documented in a dummy class
 * called <a href="#RepositoryMixinDoc">RepositoryMixinDoc</a>
 *
 */
export declare function RepositoryMixin<T extends MixinTarget<Application>>(superClass: T): {
    new (...args: any[]): {
        /**
         * Add a repository to this application.
         *
         * @param repoClass - The repository to add.
         * @param nameOrOptions - Name or options for the binding
         *
         * @example
         * ```ts
         *
         * class NoteRepo {
         *   model: any;
         *
         *   constructor() {
         *     const ds: juggler.DataSource = new juggler.DataSource({
         *       name: 'db',
         *       connector: 'memory',
         *     });
         *
         *     this.model = ds.createModel(
         *       'note',
         *       {title: 'string', content: 'string'},
         *       {}
         *     );
         *   }
         * };
         *
         * app.repository(NoteRepo);
         * ```
         */
        repository<R extends Repository<any>>(repoClass: Class<R>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<R>;
        /**
         * Retrieve the repository instance from the given Repository class
         *
         * @param repo - The repository class to retrieve the instance of
         */
        getRepository<R_2 extends Repository<any>>(repo: Class<R_2>): Promise<R_2>;
        /**
         * Add the dataSource to this application.
         *
         * @param dataSource - The dataSource to add.
         * @param nameOrOptions - The binding name or options of the datasource;
         * defaults to dataSource.name
         *
         * @example
         * ```ts
         *
         * const ds: juggler.DataSource = new juggler.DataSource({
         *   name: 'db',
         *   connector: 'memory',
         * });
         *
         * app.dataSource(ds);
         *
         * // The datasource can be injected with
         * constructor(@inject('datasources.db') dataSource: DataSourceType) {
         *
         * }
         * ```
         */
        dataSource<D extends juggler.DataSource>(dataSource: D | Class<D>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<D>;
        /**
         * Register a model class as a binding in the target context
         * @param modelClass - Model class
         */
        model<M extends Class<unknown>>(modelClass: M): Binding<M>;
        /**
         * Add a component to this application. Also mounts
         * all the components repositories.
         *
         * @param component - The component to add.
         * @param nameOrOptions - Name or options for the binding.
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
        component<C extends Component = Component>(componentCtor: Constructor<C>, nameOrOptions?: string | BindingFromClassOptions | undefined): Binding<C>;
        /**
         * Get an instance of a component and mount all it's
         * repositories. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount repositories of
         */
        mountComponentRepositories(component: Class<unknown>): void;
        /**
         * Update or recreate the database schema for all repositories.
         *
         * **WARNING**: By default, `migrateSchema()` will attempt to preserve data
         * while updating the schema in your target database, but this is not
         * guaranteed to be safe.
         *
         * Please check the documentation for your specific connector(s) for
         * a detailed breakdown of behaviors for automigrate!
         *
         * @param options - Migration options, e.g. whether to update tables
         * preserving data or rebuild everything from scratch.
         */
        migrateSchema(options?: SchemaMigrationOptions): Promise<void>;
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
 * Interface for an Application mixed in with RepositoryMixin
 */
export interface ApplicationWithRepositories extends Application {
    repository<R extends Repository<any>>(repo: Class<R>, name?: string): Binding<R>;
    getRepository<R extends Repository<any>>(repo: Class<R>): Promise<R>;
    dataSource<D extends juggler.DataSource>(dataSource: Class<D> | D, name?: string): Binding<D>;
    model<M extends Class<unknown>>(modelClass: M): Binding<M>;
    component(component: Class<unknown>, name?: string): Binding;
    mountComponentRepositories(component: Class<unknown>): void;
    migrateSchema(options?: SchemaMigrationOptions): Promise<void>;
}
/**
 * A dummy class created to generate the tsdoc for the members in repository
 * mixin. Please don't use it.
 *
 * The members are implemented in function
 * <a href="#RepositoryMixin">RepositoryMixin</a>
 */
export declare class RepositoryMixinDoc {
    constructor(...args: any[]);
    /**
     * Add a repository to this application.
     *
     * @param repo - The repository to add.
     *
     * @example
     * ```ts
     *
     * class NoteRepo {
     *   model: any;
     *
     *   constructor() {
     *     const ds: juggler.DataSource = new juggler.DataSource({
     *       name: 'db',
     *       connector: 'memory',
     *     });
     *
     *     this.model = ds.createModel(
     *       'note',
     *       {title: 'string', content: 'string'},
     *       {}
     *     );
     *   }
     * };
     *
     * app.repository(NoteRepo);
     * ```
     */
    repository(repo: Class<Repository<any>>): Binding;
    /**
     * Retrieve the repository instance from the given Repository class
     *
     * @param repo - The repository class to retrieve the instance of
     */
    getRepository<R extends Repository<any>>(repo: Class<R>): Promise<R>;
    /**
     * Add the dataSource to this application.
     *
     * @param dataSource - The dataSource to add.
     * @param name - The binding name of the datasource; defaults to dataSource.name
     *
     * @example
     * ```ts
     *
     * const ds: juggler.DataSource = new juggler.DataSource({
     *   name: 'db',
     *   connector: 'memory',
     * });
     *
     * app.dataSource(ds);
     *
     * // The datasource can be injected with
     * constructor(@inject('datasources.db') dataSource: DataSourceType) {
     *
     * }
     * ```
     */
    dataSource(dataSource: Class<juggler.DataSource> | juggler.DataSource, name?: string): Binding;
    /**
     * Add a component to this application. Also mounts
     * all the components repositories.
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
    component(component: Class<{}>): Binding;
    /**
     * Get an instance of a component and mount all it's
     * repositories. This function is intended to be used internally
     * by component()
     *
     * @param component - The component to mount repositories of
     */
    mountComponentRepository(component: Class<{}>): void;
    /**
     * Update or recreate the database schema for all repositories.
     *
     * **WARNING**: By default, `migrateSchema()` will attempt to preserve data
     * while updating the schema in your target database, but this is not
     * guaranteed to be safe.
     *
     * Please check the documentation for your specific connector(s) for
     * a detailed breakdown of behaviors for automigrate!
     *
     * @param options - Migration options, e.g. whether to update tables
     * preserving data or rebuild everything from scratch.
     */
    migrateSchema(options?: SchemaMigrationOptions): Promise<void>;
}
/**
 * Create a binding for the given model class
 * @param modelClass - Model class
 */
export declare function createModelClassBinding<M extends Class<unknown>>(modelClass: M): Binding<M>;
