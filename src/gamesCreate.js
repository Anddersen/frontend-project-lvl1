import promptly from 'promptly';

import { curry, compose } from './help.js';

export default function createGame(textRule, generateQuestions) {
  async function showRule(textRules) {
    console.log('Welcome to the Brain Games!');
    const name = await promptly.prompt('May I have your name? ');
    console.log(`Hello, ${name}`);
    console.log(textRules);
    return name;
  }

  async function getAnswers(generateQuestion, name) {
    const { status, answer, current } = await generateQuestion(1);
    return {
      status, answer, current, name,
    };
  }

  function showResult(arg) {
    const {
      status, answer, current, name,
    } = arg;

    if (status) {
      console.log(`Congratulations, ${name}`);
    } else {
      console.log(`'${answer}' is wrong answer ;(. Correct answer was '${current}'. Let's try again, ${name}!`);
    }
  }

  const curriedGetAnswers = curry(getAnswers);
  const getAnswersWithFunc = curriedGetAnswers(generateQuestions);

  return compose(showResult, getAnswersWithFunc, showRule)(textRule);
}
