import * as supertest from 'supertest'
import {user} from '../../data/user';
const request  = supertest ('http://localhost:8001/api/v1')
describe ('USER SIGNUP', () => {
    it.skip ('Create a new user', async() => {
        const res = await request.post ('/users/signup')
            .send (
                {
                    "name": "Mike",
                    "email": "mike1@gmail.com",
                    "password": "pass1234",
                    "password{Confirm": "pass1234"
                }
            ).expect(201)
            expect(res.body.data.user.name).toBe('Mike')
            expect(res.body.data.user.email).toBe('mike1@gmail.com')
            expect(res.body.status).toBe('success')
            console.log (res.body, 'res')
    })
    it.only ('Create a new user', async() => {
        const res = await request.post ('/users/signup')
            .send (user)
            .expect(201)
        expect(res.body.data.user.name).toBe('Mike')
        expect(res.body.data.user.email).toBe('mike10@gmail.com')
        expect(res.body.status).toBe('success')
        console.log (res.body, 'res')
    })
})