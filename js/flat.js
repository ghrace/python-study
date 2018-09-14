var arr1 = [1, 2, [3, 4]];
arr1.flat(); 

export function flatten (arr: Array<any>): Array<any> {
    return Array.prototype.concat.apply([], arr)
  }