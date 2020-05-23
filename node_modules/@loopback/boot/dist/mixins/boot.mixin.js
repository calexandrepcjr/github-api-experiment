"use strict";
// Copyright IBM Corp. 2018,2019. All Rights Reserved.
// Node module: @loopback/boot
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports._bindBooter = exports.BootMixin = exports.Binding = void 0;
const context_1 = require("@loopback/context");
Object.defineProperty(exports, "Binding", { enumerable: true, get: function () { return context_1.Binding; } });
const boot_component_1 = require("../boot.component");
const component_application_booter_1 = require("../booters/component-application.booter");
const keys_1 = require("../keys");
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
function BootMixin(superClass) {
    return class extends superClass {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args) {
            super(...args);
            this.component(boot_component_1.BootComponent);
            // We Dynamically bind the Project Root and Boot Options so these values can
            // be used to resolve an instance of the Bootstrapper (as they are dependencies)
            this.bind(keys_1.BootBindings.PROJECT_ROOT).toDynamicValue(() => this.projectRoot);
            this.bind(keys_1.BootBindings.BOOT_OPTIONS).toDynamicValue(() => { var _a; return (_a = this.bootOptions) !== null && _a !== void 0 ? _a : {}; });
        }
        /**
         * Convenience method to call bootstrapper.boot() by resolving bootstrapper
         */
        async boot() {
            /* eslint-disable @typescript-eslint/ban-ts-ignore */
            // A workaround to access protected Application methods
            const self = this;
            if (this.state === 'booting') {
                // @ts-ignore
                return self.awaitState('booted');
            }
            // @ts-ignore
            self.assertNotInProcess('boot');
            // @ts-ignore
            self.assertInStates('boot', 'created', 'booted');
            if (this.state === 'booted')
                return;
            // @ts-ignore
            self.setState('booting');
            // Get a instance of the BootStrapper
            const bootstrapper = await this.get(keys_1.BootBindings.BOOTSTRAPPER_KEY);
            await bootstrapper.boot();
            // @ts-ignore
            this.setState('booted');
            /* eslint-enable @typescript-eslint/ban-ts-ignore */
        }
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
        booters(...booterCls) {
            return booterCls.map(cls => _bindBooter(this, cls));
        }
        /**
         * Register a booter to boot a sub-application. See
         * {@link createComponentApplicationBooterBinding} for more details.
         *
         * @param subApp - A sub-application with artifacts to be booted
         * @param filter - A binding filter to select what bindings from the sub
         * application should be added to the main application.
         */
        applicationBooter(subApp, filter) {
            const binding = component_application_booter_1.createComponentApplicationBooterBinding(subApp, filter);
            this.add(binding);
            return binding;
        }
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
        // Unfortunately, TypeScript does not allow overriding methods inherited
        // from mapped types. https://github.com/microsoft/TypeScript/issues/38496
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        component(componentCtor, nameOrOptions) {
            const binding = super.component(componentCtor, nameOrOptions);
            this.mountComponentBooters(componentCtor);
            return binding;
        }
        /**
         * Get an instance of a component and mount all it's
         * booters. This function is intended to be used internally
         * by component()
         *
         * @param component - The component to mount booters of
         */
        mountComponentBooters(component) {
            const componentKey = `components.${component.name}`;
            const compInstance = this.getSync(componentKey);
            if (compInstance.booters) {
                this.booters(...compInstance.booters);
            }
        }
    };
}
exports.BootMixin = BootMixin;
/**
 * Method which binds a given Booter to a given Context with the Prefix and
 * Tags expected by the Bootstrapper
 *
 * @param ctx - The Context to bind the Booter Class
 * @param booterCls - Booter class to be bound
 */
function _bindBooter(ctx, booterCls) {
    const binding = context_1.createBindingFromClass(booterCls, {
        namespace: keys_1.BootBindings.BOOTER_PREFIX,
        defaultScope: context_1.BindingScope.SINGLETON,
    }).tag(keys_1.BootTags.BOOTER);
    ctx.add(binding);
    /**
     * Set up configuration binding as alias to `BootBindings.BOOT_OPTIONS`
     * so that the booter can use `@config`.
     */
    if (binding.tagMap.artifactNamespace) {
        ctx
            .configure(binding.key)
            .toAlias(`${keys_1.BootBindings.BOOT_OPTIONS.key}#${binding.tagMap.artifactNamespace}`);
    }
    return binding;
}
exports._bindBooter = _bindBooter;
//# sourceMappingURL=boot.mixin.js.map