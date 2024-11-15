import * as supertest from 'supertest'

const request = supertest('http://localhost:8001/api/v1')
import {signUp, tourFunction,reviewFunction} from "../../data/helpers";
import {getUser} from "../../data/user";
import {tour} from "../../data/tour";

describe("REVIEW", function () {
    it("create review", async () => {
        let cookie
        let userId
        let tourId
        const userImport = getUser('admin');
        const tourImport = tour()

        await signUp(userImport)
            .then((el) => {
                console.log(el.body, "____resUser______")
                expect(el.body.status).toBe('success')
                cookie = el.headers['set-cookie']
                userId = el.body.data.user._id
            })
        // await request
        //     .post('/tours')
        //     .set('Cookie', cookie)
        //     .send(tourImport)
        //     .then((el) => {
        //         console.log(el.body, "res")
        //         expect(el.body.status).toBe('success')
        //         tourId = el.body.data._id
        //     })
        await tourFunction (cookie, tourImport)
               .then((el) => {
                console.log(el.body, "____resTour_____")
                expect(el.body.status).toBe('success')
                tourId = el.body.data.data._id
                console.log(tourId, "tourId____resTour_____")
            })

        // await request
        //     .post('/reviews')
        //     .send({
        //         review: "My new Tour Review",
        //         tour: tourId,
        //         user: userId,
        //         rating: 2
        //     })

        // pass reviewName and reviewRating as params to reviewFunction
        const reviewName = "My new Tour Review"
        const reviewRating = 2
        await reviewFunction(cookie, tourId, userId, reviewName, reviewRating)
            .then((el) => {
                console.log(el.body, "___resReview____")
                expect(el.body.status).toBe('success')
                expect(el.body.data.data.tour).toBe(tourId)
                expect(el.body.data.data.user).toBe(userId)
                expect(el.body.data.data.review).toBe(reviewName)
                expect(el.body.data.data.rating).toBe(reviewRating)
            })
    })
})
