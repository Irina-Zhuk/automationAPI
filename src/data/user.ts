import { faker } from '@faker-js/faker';
import {User} from "./interface";
let password = faker.internet.password();

export const user : User = {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password
}
export function getUser (role : string) :User  {
    const randomUser  = createRandomUser();
    let password = faker.internet.password();
    return {
        name: faker.internet.userName(),
        email: faker.internet.email(),
        password: password,
        passwordConfirm: password,
        role : role
    }

}
export function createRandomUser() {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        avatar: faker.image.avatar(),
        password: faker.internet.password(),
        birthdate: faker.date.birthdate(),
        registeredAt: faker.date.past(),
    };
}
export const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
});