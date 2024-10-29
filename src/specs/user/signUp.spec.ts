import * as supertest from 'supertest'
import {user, getUser} from '../../data/user';

const request = supertest('http://localhost:8001/api/v1')
describe('USER SIGNUP', () => {

    describe('POSITIVE TESTING', () => {
        it('Create a new user', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "Mike",
                        "email": "mike1@gmail.com",
                        "password": "pass1234",
                        "passwordConfirm": "pass1234"
                    }
                ).expect(201)
            expect(res.body.data.user.name).toBe('Mike')
            expect(res.body.data.user.email).toBe('mike1@gmail.com')
            expect(res.body.status).toBe('success')
            console.log(res.body, 'res')
        })
        it('Create a new user', async () => {
            const res = await request.post('/users/signup')
                .send({
                    "name": "Mike",
                    "email": "mike10@gmail.com",
                    "password": "pass1234",
                    "passwordConfirm": "pass1234"
                })
                .expect(201)
            expect(res.body.data.user.name).toBe('Mike')
            expect(res.body.data.user.email).toBe('mike10@gmail.com')
            expect(res.body.status).toBe('success')
            console.log(res.body, 'res')
        })
        it('Create a new user using faker', async () => {
            const res = await request.post('/users/signup')
                .send(user)
                .expect(201)
            console.log(res.body, 'res')
            expect(res.body.data.user.name).toBe(user.name)
            expect(res.body.data.user.email).toBe(user.email.toLowerCase())
            expect(res.body.status).toBe('success')
        })

        it('Create a new user using faker and function', function (done) {
            let userImport = getUser()
            const res = request
                .post('/users/signup')
                .send(userImport)
                .expect(201)
                .end(function (err, res) {
                    if (err) return done(err)
                    console.log(res.body, 'res')
                    expect(res.body.data.user.name).toBe(userImport.name)
                    expect(res.body.data.user.email).toBe(userImport.email.toLowerCase())
                    expect(res.body.status).toBe('success')
                    return done ()
                })
        })
    })
    describe('NEGATIVE TESTING', () => {
        it('should not create a new user with an existing email', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "Mike",
                        "email": "mike10@gmail.com",
                        "password": "pass1234",
                        "passwordConfirm": "pass1234"
                    }
                ).expect(500)
            console.log(res.body, 'res')
            // expect(res.body.status).toBe('error')
            // expect(res.body.message).toBe('')

        })
        it('should not create a new user with an empty name', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "",
                        "email": "mike10@gmail.com",
                        "password": "pass1234",
                        "passwordConfirm": "pass1234"
                    }
                ).expect(500)
            console.log(res.body, 'res')
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: name: Please tell us your name!')
        })
        it.only('should not create a new user with an empty name  using function without async', function (done) {

            const res = request
                .post('/users/signup')
                .send(
                    {
                "name": "",
                "email": "mike10@gmail.com",
                "password": "pass1234",
                "passwordConfirm": "pass1234"
                }
                )
                .expect(500)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(500)
                    console.log(res.body, 'res')
                    expect(res.body.status).toBe('error')
                    expect(res.body.message).toBe('User validation failed: name: Please tell us your name!')
                    return done ()
                })
             })

        it('should not create a new user with an empty email', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "Mike",
                        "email": "",
                        "password": "pass1234",
                        "passwordConfirm": "pass1234"
                    }
                ).expect(500)
            console.log(res.body, 'res')
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: email: Please provide your email')

        })
        it('should not create a new user with an empty password', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "Mike",
                        "email": "mike10@gmail.com",
                        "password": "",
                        "passwordConfirm": ""
                    }
                ).expect(500)
            console.log(res.body, 'res')
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: password: Please provide a password, passwordConfirm: Please confirm your password')

        })
        it('should not create a new user with wrong password confirmation', async () => {
            const res = await request.post('/users/signup')
                .send(
                    {
                        "name": "Mike",
                        "email": "mike10@gmail.com",
                        "password": "pass1234",
                        "passwordConfirm": "pass1212"
                    }
                ).expect(500)
            console.log(res.body, 'res')
            expect(res.body.status).toBe('error')
            expect(res.body.message).toBe('User validation failed: passwordConfirm: Passwords are not the same!')


        })
    })
})