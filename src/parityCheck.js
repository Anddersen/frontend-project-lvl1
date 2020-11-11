import promptly from 'promptly';

function generateRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

function validationNUmber(number, answer) {
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
  const checkValid = validationNUmber(number, answer);
  if (checkValid) {
    if (countQuestion > 3) {
      return true;
    }
    return getAnswers(countQuestion);
  }
  console.log(`'${answer}' is wrong answer ;(. Correct answer was ${answer === 'yes' ? 'no' : 'yes'}. Let's try again, Bill!`);
  return false;
}

export default async () => {
  console.log('Welcome to the Brain Games!');
  const name = await promptly.prompt('May I have your name? ');
  console.log(`Hello, ${name}`);

  console.log('Answer "yes" if the number is even, otherwise answer "no".');

  const result = await getAnswers(1);

  if (result) {
    console.log(`Congratulations,${name}`);
  }
};
