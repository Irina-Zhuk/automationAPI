import * as supertest from 'supertest'
import {signUp, logIn} from "../../data/helpers";
import {user, getUser} from '../../data/user';
const request = supertest('http://localhost:8001/api/v1')
describe('USER LOGIN', () => {
    let userImport = getUser();

    describe('POSITIVE TESTING', () => {
        let userImport = getUser();

        it('login user', async () => {
            // const res = await request.post('/users/signup').send(userImport)
            //    .expect(201)
            // const res = await signUp(userImport)
            // })
            await signUp(userImport).then (el => {
                expect (el.body.status).toBe('success')
                console.log(el.body, 'res')
            })
            await logIn({
                email: userImport.email,
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('success')
            })
            // const loginRes = await request.post('/users/login').send(
            //     {
            //         email: userImport.email,
            //         password : userImport.password,
            //     })
            // .expect (200)
        })
        })
    describe('NEGATIVE TESTING', () => {
        let userImport = getUser();
        signUp(userImport).then (el => {
            expect (el.body.status).toBe('success')
            console.log(el.body, 'res')
        })
        it('get error when trying login without email', async () => {
            // await signUp(userImport).then (el => {
            //     expect (el.body.status).toBe('success')
            //     console.log(el.body, 'res')
            // })
            await logIn({
                email: '',
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Please provide email and password!')
            })
        })
        it('get error when trying login without password', async () => {
            // await signUp(userImport).then (el => {
            //     expect (el.body.status).toBe('success')
            //     console.log(el.body, 'res')
            // })
            await logIn({
                email: userImport.email,
                password : '',
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Please provide email and password!')
            })
        })

        it('get error when trying login with wrong password', async () => {
            // await signUp(userImport).then (el => {
            //     expect (el.body.status).toBe('success')
            //     console.log(el.body, 'res')
            // })
            await logIn({
                email: userImport.email,
                password : '123123',
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Incorrect email or password')
            })
        })

        it('get error when trying login with wrong user email', async () => {
            // await signUp(userImport).then (el => {
            //     expect (el.body.status).toBe('success')
            //     console.log(el.body, 'res')
            // })
            await logIn({
                email: '13132@mail.com',
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Incorrect email or password')
            })

        })
    })
})

