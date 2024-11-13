import * as supertest from 'supertest'
import {getUser} from "../../data/user";
import {tour, tourValidationsFields, tourWithoutReqFields} from "../../data/tour";
import {signUp} from "../../data/helpers";
const request = supertest('http://localhost:8001/api/v1')

describe('TOURS', () => {
    describe ('Positive Testing', () => {
    it.skip ('Create Tour', async () => {
        let userImport = getUser("admin");
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe('success')
        const cookie = res.headers['set-cookie']
        await request
        .post('/tours')
        .set('Cookie', cookie)
        .send ({
            name: "TourForn64",
            duration: 10,
            description: "Could be",
            maxGroupSize: 10,
            summary: "Test tour",
            difficulty: "easy",
            price: 100,
            rating: 4.8,
            imageCover: "tour-3-cover.jpg",
            ratingsAverage: 4.9,
            guides: [],
            startDates: ["2024-04-04"],
            startLocation: {
                type: "Point",
                coordinates: [-74.005974, 40.712776],
            },
        }).then ((el) => {
                console.log(el.body, "res")
                expect(el.body.status).toBe('success')
            })
        })


    it.skip ('Create Tour', async () => {
        let userImport = getUser("admin");
        let tourImport = tour();
        const res = await signUp(userImport)
        console.log(res.body, "res")
        expect(res.body.status).toBe('success')
        const cookie = res.headers['set-cookie']
        await request
            .post('/tours')
            .set('Cookie', cookie)
            .send (tourImport)
            .then ((el) => {
                console.log(el.body, "res")
                expect(el.body.status).toBe('success')
            })
    })
    it.skip ('Create Tour using try and  catch', async () => {
        try {
            let userImport = getUser("admin");
            let tourImport = tour();
            const res = await signUp(userImport)
            console.log(res.body, "res")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send(tourImport)
                .then((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('success')
                })
        } catch (error) {
            console.log("Error during createTour", error)
        }
    })
        it ('Create Tour with role lead-guide', async () => {
            try {
                let userImport = getUser("lead-guide");
                let tourImport = tour();
                const res = await signUp(userImport)
                console.log(res.body, "res")
                expect(res.body.status).toBe('success')
                const cookie = res.headers['set-cookie']
                await request
                    .post('/tours')
                    .set('Cookie', cookie)
                    .send(tourImport)
                    .then((el) => {
                        console.log(el.body, "res")
                        expect(el.body.status).toBe('success')
                    })
            } catch (error) {
                console.log("Error during createTour", error)
            }
        })
    })
    describe ('Negative Testing', () => {
        it ('cannot create tour with incorrect role ', async () => {
            let userImport = getUser("user");
            let tourImport = tour();
            const res = await signUp(userImport)
            console.log(res.body, "res")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send (tourImport)
                .then ((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('fail')
                    expect(el.body.message).toBe('You do not have permission to perform this action')
                })
        })
        it ('cannot create tour without required fields ', async () => {
            let userImport = getUser("admin");
            let tourImport = tourWithoutReqFields();
            const res = await signUp(userImport)
            console.log(res.body, "res")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send (tourImport)
                .then ((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('error')
                    expect(el.body.message).toBe('Tour validation failed: imageCover: A tour must have a cover image, summary: A tour must have a summery, price: A tour must have a price, difficulty: A tour must have a difficulty, duration: A tour must have duration, name: A tour must have a name')
                })
        })

        //validation fails
        it.only ('cannot create tour when validation is not met', async () => {
            let userImport = getUser("admin");
            let tourImport = tourValidationsFields();
            const res = await signUp(userImport)
            console.log(res.body, "res")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send (tourImport)
                .then ((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('success')

                })
        })
    })
})

