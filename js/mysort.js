function swap (array, left, right) {
  let rightValue = array[right]
  array[right] = array[left]
  array[left] = rightValue
}

const bubble = arr => {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    let hasChange = false;
    for (let j = 0; j < length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
        hasChange = true;
      }
    }
    if (!hasChange) break;
  }
  return arr
}