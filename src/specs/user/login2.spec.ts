import * as supertest from 'supertest'
import {signUp, logIn, signUp2, deleteFunction} from "../../data/helpers";
import {user, getUser} from '../../data/user';
const request = supertest('http://localhost:8001/api/v1')
describe('USER LOGIN', () => {

    describe('POSITIVE TESTING', () => {
        let userImport = getUser();
        let cookie: string
        beforeEach (async() => {
            await signUp(userImport)
        })
        it.skip('login user', async () => {
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
})
    describe('NEGATIVE TESTING', () => {
        let userImport = getUser();
        let cookie: string
        beforeEach (async() => {
            await signUp(userImport)
        })
        it.only('cannot delete user with invalid token - option 1', async () => {
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
        })
        // it('cannot delete user with empty token', async () => {
        //     let reslogin = await logIn({
        //         email: userImport.email,
        //         password : userImport.password,
        //     })
        //     console.log(reslogin)
        //     expect (reslogin.body.status).toBe('success')
        //     expect (reslogin.body.data.user.role).toBe('user')
        //     cookie = reslogin.headers['set-cookie']
        //     const deleteData = await deleteFunction("")
        //     console.log(deleteData)
        //     expect (deleteData.body.status).toBe('success')
        //     expect (deleteData.body.massage).toBe('User deleted successfully')
        // })
        // })

