import { DataObject, Entity, HasManyDefinition } from '../..';
export declare type HasManyThroughResolvedDefinition = HasManyDefinition & {
    keyTo: string;
    keyFrom: string;
    through: {
        keyTo: string;
        keyFrom: string;
    };
};
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
export declare function createTargetConstraint<Target extends Entity, Through extends Entity>(relationMeta: HasManyThroughResolvedDefinition, throughInstances: Through[]): DataObject<Target>;
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
export declare function createThroughConstraint<Through extends Entity, ForeignKeyType>(relationMeta: HasManyThroughResolvedDefinition, fkValue: ForeignKeyType): DataObject<Through>;
/**
 * Resolves given hasMany metadata if target is specified to be a resolver.
 * Mainly used to infer what the `keyTo` property should be from the target's
 * belongsTo metadata
 * @param relationMeta - hasManyThrough metadata to resolve
 * @internal
 */
export declare function resolveHasManyThroughMetadata(relationMeta: HasManyDefinition): HasManyThroughResolvedDefinition;
