import promptly from 'promptly';

import { generateRandomNumber, wellcom } from './help.js';

function checkAnswer(number, answer) {
  if (number % 2 === 0 && answer === 'yes') {
    return true;
  }
  return number % 2 !== 0 && answer === 'no';
}

async function getAnswers(numberQuestion) {
  const countQuestion = numberQuestion + 1;

  const number = generateRandomNumber(0, 100);
  console.log(`Question: ${number}`);

  const answer = await promptly.choose('Your answer?', ['yes', 'no']);

  const status = checkAnswer(number, answer);

  if (status) {
    if (countQuestion > 3) {
      return { status: true, answer };
    }
    console.log('Correct!');
    return getAnswers(countQuestion);
  }

  return { status: false, answer };
}


export default async () => {
  const name = await wellcom();

  console.log('Answer "yes" if the number is even, otherwise answer "no".');
  await showQuestion();
  const { status, answer } = await getAnswers(1);

  if (status) {
    console.log(`Congratulations, ${name}`);
  } else {
    console.log(`'${answer}' is wrong answer ;(. Correct answer was ${answer === 'yes' ? 'no' : 'yes'}. Let's try again, ${name}!`);
  }
};
