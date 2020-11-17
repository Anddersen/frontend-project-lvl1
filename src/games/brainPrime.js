import promptly from 'promptly';
import { isPrime, generateRandomNumber } from '../help.js';
import createGame from '../gamesCreate.js';

function checkAnswer(number, answer) {
  const prime = isPrime(number);

  if (prime && answer === 'yes') {
    return true;
  }
  return !prime && answer === 'no';
}

async function generateQuestions(numberQuestion) {
  const countQuestion = numberQuestion + 1;

  const number = generateRandomNumber(0, 20);
  console.log(`Question: ${number}`);

  const answer = await promptly.choose('Your answer?', ['yes', 'no']);

  const status = await checkAnswer(number, answer);

  if (status) {
    console.log('Correct!');
    if (countQuestion > 3) {
      return { status: true, answer, current: answer };
    }
    return generateQuestions(countQuestion);
  }

  return { status: false, answer, current: answer === 'yes' ? 'no' : 'yes' };
}

export default () => createGame('Answer "yes" if given number is prime. Otherwise answer "no"', generateQuestions);
