import { faker } from '@faker-js/faker';
export function tour(){
    return {
        name: faker.lorem.word({length:{min:10, max:20}}),
        duration: 10,
        description: "Could be",
        maxGroupSize: 10,
        summary: "Test tour",
        difficulty: difficulty(),
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
    }
}
function difficulty (){
    const array = ['easy', 'medium', 'difficult']
    const index = Math.floor(Math.random() * array.length)
    return array [index]
    }

export function tourWithoutReqFields(){
    return {

        description: "Could be",
        rating: 4.8,
        ratingsAverage: 4.9,
        guides: [],
        startDates: ["2024-04-04"],
        startLocation: {
            type: "Point",
            coordinates: [-74.005974, 40.712776],
        },
    }
}

export function tourValidationsFields(){
    return {

        name: faker.lorem.word({length:{min:10, max:40}}),
        duration: faker.number.int(200),
        description: faker.lorem.word({length:{min:10, max:40}}),
        maxGroupSize: faker.number.int(200),
        summary: faker.lorem.word({length:{min:10, max:200}}),
        difficulty: difficulty(),
        price: faker.number.int(50000),
        rating: faker.number.float({ min: 1, max: 100, fractionDigits: 1 }),
        imageCover: imageCover(),
        ratingsAverage: getRatingsAverage(),
        guides: [],
        startDates: [faker.date.future({years:1})],
        startLocation: {
            type: "Point",
            coordinates: [faker.location.nearbyGPSCoordinate()]

        },
    }
}
function imageCover (){
    const imagesArray = ['tour-1-cover.jpeg', 'tour-2-cover.jpeg', 'tour-3-cover.jpeg', 'tour-4-cover.jpeg', 'tour-5-cover.jpeg', 'tour-6-cover.jpeg', 'tour-7-cover.jpeg', 'tour-8-cover.jpeg', 'tour-9-cover.jpeg'];
    const randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)];
    return imagesArray [randomImage]
}
function getRatingsAverage() {

    const randomRating = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });
    return randomRating || 4.5; // Default to 4.5 if for some reason it's undefined
}

// startDates: [faker.date.future({years:1})],
// Artur
// export function tour5(){
//     return {
//         name: faker.lorem.word({length:{min:10,max:40}}),
//         duration: faker.number.int(100),
//         description: faker.lorem.word({length:{min:5,max:9}}),
//         maxGroupSize: faker.number.int(20),
//         summary: faker.lorem.word({length:{min:5,max:10}}),
//         difficulty: difficulty(),
//         price: faker.number.int(300),
//         rating: faker.number.float({ min: 1.1, max: 4.9 }),
//         imageCover: "tour-3-cover.jpg",
//         ratingsAverage: faker.number.float({ min: 1, max: 5 }),
//         guides: [],
//         startDates: faker.date.between({ from: '2024-11-01T00:00:00.000Z', to: '2025-12-12T00:00:00.000Z'}),
//         startLocation: {
//             type: "Point",
//             coordinates: [faker.location.latitude({ max: 10, min: -10 }), faker.location.longitude({ max: 10, min: -10 })],
//         },
//     }
// }

