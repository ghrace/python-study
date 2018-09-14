var arr1 = [1, 2, [3, 4]];
arr1.flat(); 

export function flatten (arr: Array<any>): Array<any> {
    return Array.prototype.concat.apply([], arr)
  }
/**
 * 空函数，什么都不做，用于初始化一些值为函数的变量。
 */
export function noop (a?: any, b?: any, c?: any) {}

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false

/**
 * Return same value
 */
export const identity = (_: any) => _