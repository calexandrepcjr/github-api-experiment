"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveHasManyThroughMetadata = exports.createThroughConstraint = exports.createTargetConstraint = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const lodash_1 = require("lodash");
const __1 = require("../..");
const has_many_helpers_1 = require("./has-many.helpers");
const debug = debug_1.default('loopback:repository:has-many-through-helpers');
/**
 * Creates constraint used to query target
 * @param relationMeta - hasManyThrough metadata to resolve
 * @param throughInstances - Instances of through entities used to constrain the target
 * @internal
 *
 * @example
 * ```ts
 * const resolvedMetadata = {
 *  // .. other props
 *  keyFrom: 'id',
 *  keyTo: 'id',
 *  through: {
 *    model: () => CategoryProductLink,
 *    keyFrom: 'categoryId',
 *    keyTo: 'productId',
 *  },
 * };

 * createTargetConstraint(resolvedMetadata, [
      {
        id: 2,
        categoryId: 2,
        productId: 8,
      }, {
        id: 2,
        categoryId: 2,
        productId: 9,
      }
  ]);
 * ```
 */
function createTargetConstraint(relationMeta, throughInstances) {
    const targetPrimaryKey = relationMeta.keyTo;
    const targetFkName = relationMeta.through.keyTo;
    const fkValues = throughInstances.map((throughInstance) => throughInstance[targetFkName]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constraint = {
        [targetPrimaryKey]: fkValues.length === 1 ? fkValues[0] : { inq: fkValues },
    };
    return constraint;
}
exports.createTargetConstraint = createTargetConstraint;
/**
 * Creates constraint used to query through model
 *
 * @param relationMeta - hasManyThrough metadata to resolve
 * @param fkValue - Value of the foreign key of the source model used to constrain through
 * @param targetInstance - Instance of target entity used to constrain through
 * @internal
 *
 * @example
 * ```ts
 * const resolvedMetadata = {
 *  // .. other props
 *  keyFrom: 'id',
 *  keyTo: 'id',
 *  through: {
 *    model: () => CategoryProductLink,
 *    keyFrom: 'categoryId',
 *    keyTo: 'productId',
 *  },
 * };
 * createThroughConstraint(resolvedMetadata, 1);
 * ```
 */
function createThroughConstraint(relationMeta, fkValue) {
    const sourceFkName = relationMeta.through.keyFrom;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const constraint = { [sourceFkName]: fkValue };
    return constraint;
}
exports.createThroughConstraint = createThroughConstraint;
/**
 * Resolves given hasMany metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * belongsTo metadata
 * @param relationMeta - hasManyThrough metadata to resolve
 * @internal
 */
function resolveHasManyThroughMetadata(relationMeta) {
    var _a, _b, _c, _d, _e, _f;
    // some checks and relationMeta.keyFrom are handled in here
    relationMeta = has_many_helpers_1.resolveHasManyMetaHelper(relationMeta);
    if (!relationMeta.through) {
        const reason = 'through must be specified';
        throw new __1.InvalidRelationError(reason, relationMeta);
    }
    if (!__1.isTypeResolver((_a = relationMeta.through) === null || _a === void 0 ? void 0 : _a.model)) {
        const reason = 'through.model must be a type resolver';
        throw new __1.InvalidRelationError(reason, relationMeta);
    }
    const throughModel = relationMeta.through.model();
    const throughModelProperties = (_b = throughModel.definition) === null || _b === void 0 ? void 0 : _b.properties;
    const targetModel = relationMeta.target();
    const targetModelProperties = (_c = targetModel.definition) === null || _c === void 0 ? void 0 : _c.properties;
    // check if metadata is already complete
    if (relationMeta.through.keyTo &&
        throughModelProperties[relationMeta.through.keyTo] &&
        relationMeta.through.keyFrom &&
        throughModelProperties[relationMeta.through.keyFrom] &&
        relationMeta.keyTo &&
        targetModelProperties[relationMeta.keyTo]) {
        // The explict cast is needed because of a limitation of type inference
        return relationMeta;
    }
    const sourceModel = relationMeta.source;
    debug('Resolved model %s from given metadata: %o', targetModel.modelName, targetModel);
    debug('Resolved model %s from given metadata: %o', throughModel.modelName, throughModel);
    const sourceFkName = (_d = relationMeta.through.keyFrom) !== null && _d !== void 0 ? _d : lodash_1.camelCase(sourceModel.modelName + '_id');
    if (!throughModelProperties[sourceFkName]) {
        const reason = `through model ${throughModel.name} is missing definition of source foreign key`;
        throw new __1.InvalidRelationError(reason, relationMeta);
    }
    const targetFkName = (_e = relationMeta.through.keyTo) !== null && _e !== void 0 ? _e : lodash_1.camelCase(targetModel.modelName + '_id');
    if (!throughModelProperties[targetFkName]) {
        const reason = `through model ${throughModel.name} is missing definition of target foreign key`;
        throw new __1.InvalidRelationError(reason, relationMeta);
    }
    const targetPrimaryKey = (_f = relationMeta.keyTo) !== null && _f !== void 0 ? _f : targetModel.definition.idProperties()[0];
    if (!targetPrimaryKey || !targetModelProperties[targetPrimaryKey]) {
        const reason = `target model ${targetModel.modelName} does not have any primary key (id property)`;
        throw new __1.InvalidRelationError(reason, relationMeta);
    }
    return Object.assign(relationMeta, {
        keyTo: targetPrimaryKey,
        keyFrom: relationMeta.keyFrom,
        through: {
            ...relationMeta.through,
            keyTo: targetFkName,
            keyFrom: sourceFkName,
        },
    });
}
exports.resolveHasManyThroughMetadata = resolveHasManyThroughMetadata;
//# sourceMappingURL=has-many-through.helpers.js.map