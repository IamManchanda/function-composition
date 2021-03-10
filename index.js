const { length, head, tail, map, reduce } = require("./utils/helper");

function pipeline(...functions) {
  if (length(functions) === 0) return (input) => input;
  if (length(functions) === 1) return (input) => head(functions)(input);
  return function (input) {
    return pipeline(...tail(functions))(head(functions)(input));
  };
}

const pluralize = (singularWord) => `${singularWord}s`;
const heart = (word) => `I ❤️  ${word}`;
const exclaim = (sentence) => `${sentence}!`;

const showSomeLove = pipeline(pluralize, heart, exclaim);

const pipelineLove = showSomeLove("pipeline");
console.log({ pipelineLove });

const functionLove = showSomeLove("pure function");
console.log({ functionLove });

const coffeeLove = showSomeLove("coffee break");
console.log({ coffeeLove });

const loveSomeShow = pipeline(exclaim, heart, pluralize);
const wrongOrder = loveSomeShow("pipeline");
console.log({ wrongOrder });

const composedPipe = pipeline(pluralize, pipeline(heart, exclaim));
const compositionLove = composedPipe("composition");
console.log({ compositionLove });

const composedPipe2 = pipeline(pipeline(pluralize, heart), exclaim);
const compositionLove2 = composedPipe2("composition");
console.log({ compositionLove2 });

function deSnake(snake_case_string) {
  return snake_case_string.split("_");
}

function capitalizeFirstLetter(string) {
  return `${string.charAt(0).toUpperCase()}${string.substr(1).toLowerCase()}`;
}

function capitalizeAll(stringArray) {
  return map(capitalizeFirstLetter, stringArray);
}

function camelize(stringArray) {
  return [head(stringArray)].concat(capitalizeAll(tail(stringArray)));
}

function concatenate(stringArray) {
  return reduce((acc, str) => acc + str, "", stringArray);
}

function hyphenate(stringArray) {
  return reduce(
    (acc, str) => [acc, str].join("-"),
    head(stringArray),
    tail(stringArray),
  );
}

function snakeToCamel(snake_case_string) {
  const pipe = pipeline(deSnake, camelize, concatenate);
  return pipe(snake_case_string);
}

console.log({
  'snakeToCamel("super_cool_variable")': snakeToCamel("super_cool_variable"),
});

console.log({
  'snakeToCamel("very_long_variables_should_also_work")': snakeToCamel(
    "very_long_variables_should_also_work",
  ),
});

console.log({
  'snakeToCamel("edgecase")': snakeToCamel("edgecase"),
});
