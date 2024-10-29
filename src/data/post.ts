import { faker } from '@faker-js/faker';
export const post = {
    "userId" :205,
    "title" : "My new test",
    "body" : "Just test"
}

export const postFaker = {
    userId: faker.number.int({ min: 1, max: 900 }), // Limits number between 1 and 100
    title: faker.string.alpha({ length: 20 }), // Limits string length to 20 characters
    body: faker.string.alpha({ length: 20 })   // Limits string length to 50 characters
}