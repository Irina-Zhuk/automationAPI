import * as supertest from 'supertest'

const request = supertest('http://localhost:8001/api/v1')
import {signUp, tourFunction, reviewFunction} from "../../data/helpers";
import {getUser} from "../../data/user";
import {tour} from "../../data/tour";

describe('REVIEW', () => {


    describe('Positive Testing', function () {
        it("create review", async () => {
            let cookie
            let userId
            let tourId
            let reviewId = ""
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
            await tourFunction(cookie, tourImport)
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
                    reviewId = el.body.data.data._id
                })

            // "should check that number of reviews is correct", async () => {


            await request
                .get('/reviews')
                .set('Cookie', cookie)
                .then((el) => {
                    console.log(el.body, "res")
                    console.log(el.body.data.data[0], "firstReview")
                    let reviews = el.body.data.data
                    expect(el.body.status).toBe('success')
                    expect(el.body.results).toEqual(reviews.length)

                    console.log("searching for review", reviewId)
                    for (let i = 0; i < reviews.length; i++) {
                        // console.log("one of the reviews", reviews[i]._id)
                        if (reviews[i]._id === reviewId) {
                            console.log("found review", reviewId)
                            expect(reviews[i].review).toBe(reviewName)
                            expect(reviews[i].rating).toBe(reviewRating)
                            expect(reviews[i].tour._id).toBe(tourId)
                            expect(reviews[i].tour.name).toBe(tourImport.name)
                        }
                    }
                })
        })


        describe('Negative Testing', function () {
                it("cannot create review when role is guide", async () => {
                    let cookie
                    let userId
                    let tourId
                    let reviewId = ""
                    const userImport = getUser('guide');
                    const tourImport = tour()

                    await signUp(userImport)
                        .then((el) => {
                            console.log(el.body, "____resUser______")
                            expect(el.body.status).toBe('success')
                            cookie = el.headers['set-cookie']
                            userId = el.body.data.user._id
                        })

                    await tourFunction(cookie, tourImport)
                        .then((el) => {
                            console.log(el.body, "____resTour_____")
                            expect(el.body.status).toBe('fail')
                            expect(el.body.message).toBe('You do not have permission to perform this action')
                            // tourId = el.body.data.data._id
                            console.log(tourId, "tourId____resTour_____")
                        })

                    // pass reviewName and reviewRating as params to reviewFunction
                    const reviewName = "My new Tour Review"
                    const reviewRating = 2
                    await reviewFunction(cookie, tourId, userId, reviewName, reviewRating)
                        .then((el) => {
                            console.log(el.body, "___resReview____")
                            expect(el.body.status).toBe('fail')
                            expect(el.body.message).toBe('You do not have permission to perform this action')
                            // expect(el.body.data.data.tour).toBe(tourId)
                            // expect(el.body.data.data.user).toBe(userId)
                            // expect(el.body.data.data.review).toBe(reviewName)
                            // expect(el.body.data.data.rating).toBe(reviewRating)
                            // reviewId = el.body.data.data._id
                        })
                })
                it("cannot create review when role is lead-guide", async () => {
                    let cookie
                    let userId
                    let tourId
                    let reviewId = ""
                    const userImport = getUser('lead-guide');
                    const tourImport = tour()

                    await signUp(userImport)
                        .then((el) => {
                            console.log(el.body, "____resUser______")
                            expect(el.body.status).toBe('success')
                            cookie = el.headers['set-cookie']
                            userId = el.body.data.user._id
                        })

                    await tourFunction(cookie, tourImport)
                        .then((el) => {
                            console.log(el.body, "____resTour_____")
                            expect(el.body.status).toBe('success')
                            tourId = el.body.data.data._id
                            console.log(tourId, "tourId____resTour_____")
                        })

                    // pass reviewName and reviewRating as params to reviewFunction
                    const reviewName = "My new Tour Review"
                    const reviewRating = 2
                    await reviewFunction(cookie, tourId, userId, reviewName, reviewRating)
                        .then((el) => {
                            console.log(el.body, "___resReview____")
                            expect(el.body.status).toBe('fail')
                            expect(el.body.message).toBe('You do not have permission to perform this action')
                            // expect(el.body.data.data.tour).toBe(tourId)
                            // expect(el.body.data.data.user).toBe(userId)
                            // expect(el.body.data.data.review).toBe(reviewName)
                            // expect(el.body.data.data.rating).toBe(reviewRating)
                            // reviewId = el.body.data.data._id
                        })
                })
                // it.only("cannot create review when missing userId", async () => {
                //     let cookie
                //     let userId
                //     let tourId
                //     let reviewId = ""
                //     const userImport = getUser('admin');
                //     const tourImport = tour()
                //
                //     await signUp(userImport)
                //         .then((el) => {
                //             console.log(el.body, "____resUser______")
                //             expect(el.body.status).toBe('success')
                //             cookie = el.headers['set-cookie']
                //             userId = el.body.data.user._id
                //         })
                //     await tourFunction(cookie, tourImport)
                //         .then((el) => {
                //             console.log(el.body, "____resTour_____")
                //             expect(el.body.status).toBe('success')
                //             tourId = el.body.data.data._id
                //             console.log(tourId, "tourId____resTour_____")
                //         })
                //
                //     // pass reviewName and reviewRating as params to reviewFunction
                //     const reviewName = "My new Tour Review"
                //     const reviewRating = 2
                //     await reviewFunction(cookie, tourId, userId = "", reviewName, reviewRating)
                //         .then((el) => {
                //             console.log(el.body, "___resReview____")
                //             expect(el.body.status).toBe('success')
                //             expect(el.body.data.data.tour).toBe(tourId)
                //             expect(el.body.data.data.user).toBe(userId)
                //             expect(el.body.data.data.review).toBe(reviewName)
                //             expect(el.body.data.data.rating).toBe(reviewRating)
                //             reviewId = el.body.data.data._id
                //         })
                //
                // })
                it("cannot create review when missing tourId", async () => {
                    let cookie
                    let userId
                    let tourId
                    let reviewId = ""
                    const userImport = getUser('admin');
                    const tourImport = tour()

                        await signUp(userImport)
                            .then((el) => {
                                console.log(el.body, "____resUser______")
                                expect(el.body.status).toBe('success')
                                cookie = el.headers['set-cookie']
                                userId = el.body.data.user._id
                            })
                        await tourFunction(cookie, tourImport)
                            .then((el) => {
                                console.log(el.body, "____resTour_____")
                                expect(el.body.status).toBe('success')
                                tourId = el.body.data.data._id
                                console.log(tourId, "tourId____resTour_____")
                            })

                        // pass reviewName and reviewRating as params to reviewFunction
                        const reviewName = "My new Tour Review"
                        const reviewRating = 2
                        await reviewFunction(cookie, tourId ="", userId, reviewName, reviewRating)
                            .then((el) => {
                                console.log(el.body, "___resReview____")
                                expect(el.body.status).toBe('error')
                                expect(el.body.message).toBe('Review validation failed: tour: Review must belong to a tour')
                                // expect(el.body.data.data.tour).toBe(tourId)
                                // expect(el.body.data.data.user).toBe(userId)
                                // expect(el.body.data.data.review).toBe(reviewName)
                                // expect(el.body.data.data.rating).toBe(reviewRating)
                                // reviewId = el.body.data.data._id
                            })
                       })
                // ===== it failed because the review is successfully created without rating =====
                it("cannot create review when missing rating", async () => {
                    let cookie
                    let userId
                    let tourId
                    let reviewId = ""
                    const userImport = getUser('admin');
                    const tourImport = tour()

                    await signUp(userImport)
                        .then((el) => {
                            console.log(el.body, "____resUser______")
                            expect(el.body.status).toBe('success')
                            cookie = el.headers['set-cookie']
                            userId = el.body.data.user._id
                        })
                    await tourFunction(cookie, tourImport)
                        .then((el) => {
                            console.log(el.body, "____resTour_____")
                            expect(el.body.status).toBe('success')
                            tourId = el.body.data.data._id
                            console.log(tourId, "tourId____resTour_____")
                        })

                    // pass reviewName and reviewRating as params to reviewFunction
                    const reviewName = "My new Tour Review"
                    const reviewRating = null
                    await reviewFunction(cookie, tourId, userId, reviewName, reviewRating)
                        .then((el) => {
                            console.log(el.body, "___resReview____")
                            expect(el.body.status).toBe('error')

                        })
                })


                it("cannot create review when missing reviewName", async () => {
                    let cookie
                    let userId
                    let tourId
                    let reviewId = ""
                    const userImport = getUser('admin');
                    const tourImport = tour()

                    await signUp(userImport)
                        .then((el) => {
                            console.log(el.body, "____resUser______")
                            expect(el.body.status).toBe('success')
                            cookie = el.headers['set-cookie']
                            userId = el.body.data.user._id
                        })
                    await tourFunction(cookie, tourImport)
                        .then((el) => {
                            console.log(el.body, "____resTour_____")
                            expect(el.body.status).toBe('success')
                            tourId = el.body.data.data._id
                            console.log(tourId, "tourId____resTour_____")
                        })

                    const reviewName = ""
                    const reviewRating = 3
                    await reviewFunction(cookie, tourId, userId, reviewName, reviewRating)
                        .then((el) => {
                            console.log(el.body, "___resReview____")
                            expect(el.body.status).toBe('error')
                            expect(el.body.message).toBe ('Review validation failed: review: Review cannot be empty')
                            // expect(el.body.data.data.tour).toBe(tourId)
                            // expect(el.body.data.data.user).toBe(userId)
                            // expect(el.body.data.data.review).toBe(reviewName)
                            // expect(el.body.data.data.rating).toBe(reviewRating)
                            // reviewId = el.body.data.data._id
                        })
                })
            })
        })
    })




