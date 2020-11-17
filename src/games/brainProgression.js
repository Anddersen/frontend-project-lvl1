import promptly from 'promptly';
import { generateRandomNumber } from '../help.js';
import createGame from '../gamesCreate.js';

function checkAnswer(answer, correctElements) {
  return +answer === +correctElements;
}

function generateString() {
  const length = generateRandomNumber(5, 20);
  const lengthProgression = generateRandomNumber(0, 10);
  const hideElement = generateRandomNumber(5, length - 1);

  const cash = {
    stringInArray: [],
    correctElements: '',
  };

  function getData(currentLength) {
    const countLength = currentLength + 1;
    if (countLength === 1) {
      cash.stringInArray.push(generateRandomNumber(5, 20));
      return getData(countLength);
    }

    if (countLength === hideElement) {
      const lastElement = cash.stringInArray[cash.stringInArray.length - 1];
      cash.stringInArray.push('...');
      cash.correctElements = +lastElement + +lengthProgression;
      return getData(countLength);
    }

    if (countLength === length) {
      return { string: cash.stringInArray.join(' '), correctElements: cash.correctElements };
    }

    const lastElement = cash.stringInArray[cash.stringInArray.length - 1];
    const currentLastElement = lastElement === '...' ? cash.correctElements : lastElement;
    cash.stringInArray.push(+currentLastElement + +lengthProgression);

    return getData(countLength);
  }

  return getData(0);
}

async function generateQuestions(numberQuestion) {
  const countQuestion = numberQuestion + 1;

  const { string, correctElements } = generateString();

  console.log(`Question: ${string}`);

  const answer = await promptly.prompt('Your answer?');
  const status = await checkAnswer(answer, correctElements);

  if (status) {
    console.log('Correct!');
    if (countQuestion > 3) {
      return { status: true, answer, current: correctElements };
    }
    return generateQuestions(countQuestion);
  }

  return { status: false, answer, current: correctElements };
}

export default () => createGame('What number is missing in the progression?', generateQuestions);
