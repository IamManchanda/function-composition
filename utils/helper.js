const concat = (array1, array2) => array1.concat(array2);
const length = (array) => array.length;
const head = (array) => array[0];
const tail = (array) => array.slice(1);

function filter(predicateFn, array) {
  if (length(array) === 0) return [];
  const firstItem = head(array);
  const filteredFirst = predicateFn(firstItem) ? [firstItem] : [];
  return concat(filteredFirst, filter(predicateFn, tail(array)));
}

function map(fn, array) {
  if (length(array) === 0) return [];
  return [fn(head(array))].concat(map(fn, tail(array)));
}

function reduce(reducerFn, initialValue, array) {
  if (length(array) === 0) return initialValue;
  const newInitialValue = reducerFn(initialValue, head(array));
  return reduce(reducerFn, newInitialValue, tail(array));
}

module.exports = { length, head, tail, map, reduce };
