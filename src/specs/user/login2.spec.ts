import * as supertest from 'supertest'
import {signUp, logIn, signUp2, deleteFunction, deleteFunction2} from "../../data/helpers";
import {user, getUser} from '../../data/user';
const request = supertest('http://localhost:8001/api/v1')
describe('USER LOGIN', () => {

    describe('POSITIVE TESTING', () => {
        let userImport = getUser();
        let cookie: string
        beforeEach (async() => {
            await signUp(userImport)
        })
        it('login user', async () => {
            await logIn({
                email: userImport.email,
                password : userImport.password,
            }).then((response) =>  {
                console.log(response.body)
                expect (response.body.status).toBe('success')
                expect (response.body.data.user.role).toBe('user')
            })
    })
        it('delete user', async () => {
            let reslogin = await logIn({
                email: userImport.email,
                password : userImport.password,
            })
                console.log(reslogin)
                expect (reslogin.body.status).toBe('success')
                expect (reslogin.body.data.user.role).toBe('user')
                cookie = reslogin.headers['set-cookie']
                const deleteData = await deleteFunction(cookie[0])
            console.log(deleteData)
                expect (deleteData.body.status).toBe('success')
                expect (deleteData.body.massage).toBe('User deleted successfully')
            })
        })

    describe('NEGATIVE TESTING', () => {
        let userImport = getUser();
        let cookie: string
        beforeEach (async() => {
            await signUp(userImport)
        })
        it('cannot delete user with invalid token - option 1', async () => {
            let reslogin = await logIn({
                email: userImport.email,
                password : userImport.password,
            })
            console.log(reslogin)
            expect (reslogin.body.status).toBe('success')
            expect (reslogin.body.data.user.role).toBe('user')
            cookie = reslogin.headers['set-cookie']
            const deleteData = await deleteFunction("123")
            console.log(deleteData)
            expect (deleteData.body.status).toBe('fail')
            expect (deleteData.body.massage).toBe(undefined)
        })

        it('cannot delete user with invalid token - option 2 - using try and catch', async () => {
            try {
            await logIn({
                email: userImport.email,
                password : userImport.password,
            }). then (el => {
                expect (el.body.status).toBe('success')
                expect (el.body.data.user.role).toBe('user')
                cookie = el.headers['set-cookie']
            })

            await deleteFunction("123").then (el2 => {
                 expect (el2.body.status).toBe('fail')
                 expect (el2.body.massage).toBe(undefined)
                })
            }
            catch (error) {
                console.log ('Error during login process', error);
                // throw Error (error)
            }
        })

        it('cannot delete user with invalid token - option 3 - using .end without Promise',  (done) => {
            deleteFunction2("123").end ((err,res) => {
                if(err) return done (err)
                expect (res.body.status).toBe('fail');
                expect (res.body.massage).toBe(undefined)
                done()
            })
        })


        it('cannot delete user with empty token - option 1 using async/await', async () => {
            let reslogin = await logIn({
                email: userImport.email,
                password : userImport.password,
            })
            console.log(reslogin)
            expect (reslogin.body.status).toBe('success')
            expect (reslogin.body.data.user.role).toBe('user')
            cookie = reslogin.headers['set-cookie']
            const deleteData = await deleteFunction("")
            console.log(deleteData)
            expect (deleteData.body.status).toBe('fail')
            expect (deleteData.body.massage).toBe(undefined)
        })
})
})





        // it('login user option 3 using try and catch', async () => {
        //     try {
        //         await signUp(userImport).then (el => {
        //             expect (el.body.status).toBe('success')
        //             console.log(el.body, 'res')
        //         })
        //         await logIn({
        //             email: userImport.email,
        //             password : userImport.password,
        //         }).then(el2 =>  {
        //             expect (el2.body.status).toBe('success')
        //         })
        //
        //     } catch (error) {
        //         console.log ('Error during login process', error);
        //         // throw Error (error)
        //     }



