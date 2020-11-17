import promptly from 'promptly';
import { generateRandomNumber, getGcd } from './help.js';
import createGame from './gamesCreate.js';

function checkAnswer(number1, number2, answer) {
  const gcd = getGcd(number1, number2);
  if (+gcd === +answer) {
    return { status: true, current: gcd };
  }
  return { status: false, current: gcd };
}

async function generateQuestions(numberQuestion) {
  const countQuestion = numberQuestion + 1;

  const number1 = generateRandomNumber(0, 50);
  const number2 = generateRandomNumber(0, 50);
  console.log(`Question: ${number1} ${number2}`);

  const answer = await promptly.prompt('Your answer?');
  const { status, current } = await checkAnswer(number1, number2, answer);

  if (status) {
    console.log('Correct!');
    if (countQuestion > 3) {
      return { status: true, answer, current };
    }
    return generateQuestions(countQuestion);
  }

  return { status: false, answer, current };
}

export default () => createGame('Find the greatest common divisor of given numbers.', generateQuestions);
