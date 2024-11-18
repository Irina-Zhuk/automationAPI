import * as supertest from 'supertest'
import {getUser} from "../../data/user";
import {
    tour,
    tourFakersFields, tourValidationsFieldNameLessThan10,
    tourValidationsFieldNameMoreThan40, tourValidationsFieldRatingAverageUndefined,
    tourWithoutReqFields
} from "../../data/tour";
import {signUp} from "../../data/helpers";

const request = supertest('http://localhost:8001/api/v1')

describe('TOURS', () => {
    describe('Positive Testing', () => {
        it.skip('Create Tour', async () => {
            let userImport = getUser("admin");
            const res = await signUp(userImport)
            console.log(res.body, "res")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send({
                    name: "TourForn67",
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
                }).then((el) => {
                    console.log(el.body, "res")
                    expect(el.body.status).toBe('success')
                })
        })


        it('Create Tour', async () => {
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
        })
        it('Create Tour using try and  catch', async () => {
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
        it('Create Tour with role lead-guide', async () => {
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
        it('create tour using faker data', async () => {
            let userImport = getUser("admin");
            let tourImport = tourFakersFields();
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
                    console.log("resLocation", el.body.data.data.locations)
                    expect(el.body.status).toBe('success')

                })
        })
    })
    describe('Negative Testing', () => {
        it('cannot create tour with incorrect role ', async () => {
            let userImport = getUser("user");
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
                    expect(el.body.status).toBe('fail')
                    expect(el.body.message).toBe('You do not have permission to perform this action')
                })
        })
        it('cannot create tour without required fields ', async () => {
            let userImport = getUser("admin");
            let tourImport = tourWithoutReqFields();
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
                    expect(el.body.status).toBe('error')
                    expect(el.body.message).toBe('Tour validation failed: imageCover: A tour must have a cover image, summary: A tour must have a summery, price: A tour must have a price, difficulty: A tour must have a difficulty, duration: A tour must have duration, name: A tour must have a name')
                })
        })

        //validation fails
        it('cannot create tour when name length is less than 10', async () => {
            let userImport = getUser("admin");
            let tourImport = tourValidationsFieldNameLessThan10();
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
                    expect(el.body.status).toBe('error')
                    expect(el.body.message).toBe('Tour validation failed: name: A tour name must have more or equal then 10 characters')

                })
        })

        it('cannot create tour when name length is more than 40', async () => {
            let userImport = getUser("admin");
            let tourImport = tourValidationsFieldNameMoreThan40();
            const res = await signUp(userImport)
            console.log(res.body, "---resUser---")
            expect(res.body.status).toBe('success')
            const cookie = res.headers['set-cookie']
            await request
                .post('/tours')
                .set('Cookie', cookie)
                .send(tourImport)
                .then((el) => {
                    console.log(el.body, "---resTour---")
                    expect(el.body.status).toBe('error')
                    expect(el.body.message).toBe('Tour validation failed: name: A tour name must have less or equal then 40 characters')

                })
        })
        it('cannot create tour when rating average is not validated', async () => {
            let userImport = getUser("admin");
            let tourImport = tourValidationsFieldRatingAverageUndefined();
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
                    expect(el.body.status).toBe('error')
                    expect(el.body.message).toBe('Tour validation failed: ratingsAverage: Rating must be above 1.0')

                })
        })
    })
})

