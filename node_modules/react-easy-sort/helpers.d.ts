import { Point } from './types';
/**
 * This function check if a given point is inside of the items rect.
 * If it's not inside any rect, it will return the index of the closest rect
 */
export declare const findItemIndexAtPosition: ({ x, y }: Point, itemsRect: DOMRect[], { fallbackToClosest }?: {
    fallbackToClosest?: boolean | undefined;
}) => number;
//# sourceMappingURL=helpers.d.ts.map