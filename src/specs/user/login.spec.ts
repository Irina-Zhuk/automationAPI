import * as supertest from 'supertest'
import {signUp, logIn, signUp2} from "../../data/helpers";
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
        it('login user option 2', async () => {
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
        })
        it('login user option 3 using try and catch', async () => {
            try {
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

            } catch (error) {
                console.log ('Error during login process', error);
                // throw Error (error)
            }
        })
        it('login user option 4 using then', async () => {
            signUp(userImport)
                .then ((res) =>{
                   expect (res.body.status).toBe('success');
                return logIn ({
                    email: userImport.email,
                    password : userImport.password,
                })
        })
                .then ((res2) =>{
                    expect (res2.statusCode).toBe(201);
        })
                .catch ((err) => {
                    console.log (err)
                    })
                })
                })

        it('login user option 5 using .end without Promise', (done) => {
            signUp2(userImport).end ((err,res) => {
            if(err) return done (err)
            expect (res.body.status).toBe('success');
            done()
            })
        })
})

    describe('NEGATIVE TESTING', () => {
        let userImport = getUser();
        // signUp(userImport).then (el => {
        //     expect (el.body.status).toBe('success')
        //     console.log(el.body, 'res')
        // })
        it('get error when trying login without email - option 1', async () => {
            await signUp(userImport).then (el => {     //вынесено вверх до it
                expect (el.body.status).toBe('success')
                console.log(el.body, 'res')
            })
            await logIn({
                email: '',
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Please provide email and password!')
            })
        })
        it.only('get error when trying login without email using try and catch - option 2', async () => {

        try {
            await signUp(userImport).then (el => {
                expect (el.body.status).toBe('success')
                console.log(el.body, 'res')
            })
            await logIn({
                email: '',
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Please provide email and password!')
                console.log(el2.body, 'res')
            })

        } catch (error) {
            console.log ('Error during login process', error);
            // throw Error (error)
        }
    })
        it('get error when trying login without email using try and catch - option 3', async () => {

            try {
                await signUp(userImport).then (el => {
                    expect (el.body.status).toBe('success')
                    console.log(el.body, 'res')
                })
                await logIn({
                    email: '',
                    password : userImport.password,
                }).then(el2 =>  {
                    expect (el2.body.status).toBe('fail')
                    expect(el2.body.message).toBe('Please provide email and password!')
                    console.log(el2.body, 'res')
                })

            } catch (error) {
                console.log ('Error during login process', error);
                // throw Error (error)
            }
        })

        it.only('get error when trying login without email using .end without Promise - option 4', (done) => {
            signUp2({
                email: userImport.email,
                password : '',
            }).end ((err,res) => {
                if(err) return done (err)
                expect (res.body.status).toBe('error');
                expect(res.body.message).toBe('User validation failed: name: Please tell us your name!, password: Please provide a password, passwordConfirm: Please confirm your password')
                done()
            })
        })

        // it('login user option 5 using .end without Promise', (done) => {
        //     signUp2(userImport).end ((err,res) => {
        //         if(err) return done (err)
        //         expect (res.body.status).toBe('success');
        //         done()
        //     })
        // })


        it('get error when trying login with wrong password', async () => {
            await signUp(userImport).then (el => {
                expect (el.body.status).toBe('success')
                console.log(el.body, 'res')
            })
            await logIn({
                email: userImport.email,
                password : '123123',
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Incorrect email or password')
            })
        })

        it('get error when trying login with wrong user email', async () => {
            await signUp(userImport).then (el => {
                expect (el.body.status).toBe('success')
                console.log(el.body, 'res')
            })
            await logIn({
                email: '13132@mail.com',
                password : userImport.password,
            }).then(el2 =>  {
                expect (el2.body.status).toBe('fail')
                expect(el2.body.message).toBe('Incorrect email or password')
            })

        })
    })

