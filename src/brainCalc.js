import promptly from 'promptly';

import { generateRandomNumber, wellcom, generateRandomOperation } from './help.js';

function checkAnswer(number1, number2, operation, answer) {
  switch (operation) {
    case '+':
      return { status: number1 + number2 === +answer, current: number1 + number2} ;
    case '-':
      return { status: number1 - number2 === +answer, current: number1 - number2} ;
    case '*':
      return {status :  number1 * number2 === +answer, current: number1 * number2} ;
    default:
      return {status: false, current: 0} ;
  }
}

async function getAnswers(numberQuestion) {
  const countQuestion = numberQuestion + 1;
  const number1 = generateRandomNumber(0, 10);
  const number2 = generateRandomNumber(0, 10);
  const operation = generateRandomOperation();

  console.log(`Question: ${number1} ${operation} ${number2}`);
  const answer = await promptly.prompt('Your answer?');

  const {status, current} = checkAnswer(number1, number2, operation, answer);

  if (status) {
    if (countQuestion > 3) {
      return { status: true, answer, current };
    }
    console.log('Correct!');
    return getAnswers(countQuestion);
  }

  return { status: false, answer, current };
}

export default async () => {
  const name = await wellcom();

  console.log('What is the result of the expression?');
  const { status, answer, current } = await getAnswers(1);

  if (status) {
    console.log(`Congratulations, ${name}`);
  } else {
    console.log(`'${answer}' is wrong answer ;(. Correct answer was ${current}. Let's try again, ${name}!`);
  }
};
