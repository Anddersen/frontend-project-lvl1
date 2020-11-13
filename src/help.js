import promptly from "promptly";

export function generateRandomNumber(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
}

export function generateRandomOperation() {
    const number = generateRandomNumber(0,2);
    return ['+','-','*'][number];
}

export async function wellcom() {
    console.log('Welcome to the Brain Games!');
    const name = await promptly.prompt('May I have your name? ');
    console.log(`Hello, ${name}`);
    return name;
}
