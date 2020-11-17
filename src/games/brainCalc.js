import promptly from 'promptly';
import { generateRandomNumber, generateRandomOperation } from '../help.js';
import createGame from '../gamesCreate.js';

function checkAnswer(number1, number2, operation, answer) {
  switch (operation) {
    case '+':
      return { status: number1 + number2 === +answer, current: number1 + number2 };
    case '-':
      return { status: number1 - number2 === +answer, current: number1 - number2 };
    case '*':
      return { status: number1 * number2 === +answer, current: number1 * number2 };
    default:
      return { status: false, current: 0 };
  }
}

async function generateQuestions(numberQuestion) {
  const countQuestion = numberQuestion + 1;

  const number1 = generateRandomNumber(0, 10);
  const number2 = generateRandomNumber(0, 10);
  const operation = generateRandomOperation();

  console.log(`Question: ${number1} ${operation} ${number2}`);

  const answer = await promptly.prompt('Your answer?');
  const { status, current } = await checkAnswer(number1, number2, operation, answer);

  if (status) {
    console.log('Correct!');
    if (countQuestion > 3) {
      return { status: true, answer, current };
    }
    return generateQuestions(countQuestion);
  }

  return { status: false, answer, current };
}

export default () => createGame('What is the result of the expression?', generateQuestions);
