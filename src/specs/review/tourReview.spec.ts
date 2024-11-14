import * as supertest from 'supertest'
const request = supertest('http://localhost:8001/api/v1')
import {signUp} from "../../data/helpers";
import {getUser} from "../../data/user";
import {tour} from "../../data/tour";

describe("REVIEW", function () {
    it("create review", async () =>{
        let cookie;
        let userId
        let tourId
        const userImport = getUser('admin');
        const tourImport = tour()
        await signUp(userImport)
            .then((el) => {
                console.log(el.body, "res")
                expect(el.body.status).toBe('success')
            cookie = el.headers['set-cookie']
            userId = el.body.data.user._id
    })
        await request
            .post('/tours')
            .set('Cookie', cookie)
            .send(tourImport)
            .then((el) => {
                console.log(el.body, "res")
                expect(el.body.status).toBe('success')
                tourId = el.body.data._id
            })
        await request
        .post('/reviews')
            .send({
                review: "My new Tour Review",
                tour: tourId,
                user: userId,
                rating: 3
            })
})
})
