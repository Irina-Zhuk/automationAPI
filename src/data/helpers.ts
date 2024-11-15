import * as supertest from 'supertest'
import {user} from "./user";
const request = supertest('http://localhost:8001/api/v1')

export function signUp2(user:string | object | undefined) {
    return  request.post('/users/signup').send(user)
}



// beginner level
export function signUp(user:object): Promise<any> {
        return new Promise ((resolve, reject) => {
            request
                .post('/users/signup')
                .send (user)
                .end((err, res) => {
                    if (err) return reject(err);
                    else resolve(res);
            });
        });
}




//advanced level
// export async function logIn(user:string | object | undefined){
//     await request.post('/users/login').send(user)
//  }
export function logIn(user:object): Promise<any> {
    return new Promise ((resolve, reject) => {
        request
            .post('/users/login')
            .send (user)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res);
            });
    });
}


export function deleteFunction(cookie:string): Promise<any> {
    return new Promise ((resolve, reject) => {
        request
            .delete('/users/deleteMe')
            .set ("Cookie", cookie)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res);
            });
    });
}

//то же самое в более простом варианте

export function deleteFunction2(cookie:string) {
    return request.delete('/users/deleteMe').set("Cookie", cookie);
}
export function login2(user:string | object | undefined) {
    return request.post('/users/login').send(user);
}

export function tourFunction(cookie:string, tourData:object ): Promise<any> {
    return new Promise ((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookie)
            .send (tourData)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res);
            });
    });
}

export function reviewFunction(
    cookie:string,
    tourId:string,
    userId:string,
    reviewName:string,
    reviewRating:number
): Promise<any> {
    return new Promise ((resolve, reject) => {
        const body = {
            review: reviewName,
            tour: tourId,
            user: userId,
            rating: reviewRating
        }
        console.log(body, "___requestReview___")
        request
            .post('/reviews')
            .set('Cookie', cookie)
            .send(body)
            .end((err, res) => {
                if (err) return reject(err);
                else resolve(res);
            });
    });
}