import * as supertest from 'supertest'
import {post} from '../data/post';
import {user} from "../data/user";
const request  = supertest ('https://jsonplaceholder.typicode.com/')
describe ('CREATE POST', () => {
    it ('Create a new post', async() => {
        const res = await request.post ('/posts')
            .send (
                {
                    "userId" :202,
                    "title" : "My new test",
                    "body" : "Just test"
                }
            ).expect(201)
        expect(res.body.title).toBe('My new test')
        expect(res.body.body).toBe('Just test')
        expect(res.body.userId).toBe(202)
        console.log (res.body, 'res')
    })
    it ('Create a new post', async() => {
        const res = await request.post ('/posts')
            .send (post)
            .expect(201)
        expect(res.body.title).toBe('My new test')
        expect(res.body.body).toBe('Just test')
        expect(res.body.userId).toBe(205)
        console.log (res.body, 'res')
    })
})