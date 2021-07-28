const questions = {
  group:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges",
  lookAround:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#other_assertions",
  ranges:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges",
  class:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes",
  backReference:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges#types",
  wordBoundaryAssertion:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Assertions#boundary-type_assertions",
  quantifier:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Quantifiers",
}
export type QuestionKey = keyof typeof questions

export const isQuestionKey = (key: string): key is QuestionKey => {
  return [
    "group",
    "lookAround",
    "ranges",
    "class",
    "backReference",
    "wordBoundaryAssertion",
    "quantifier",
  ].includes(key)
}
export default questions
