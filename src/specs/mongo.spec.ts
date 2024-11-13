import * as supertest from 'supertest'
import {signUp} from "../data/helpers";
import {getUser} from "../data/user";

const request = supertest('http://localhost:8001/api/v1')
const {MongoClient, ObjectId} = require('mongodb')
const DATABASE_URL = "mongodb+srv://irinamzh:Updated1234@cluster0.lvzg3fs.mongodb.net/"
 describe ('MONGO_DB', () => {
     let connection
     let db

     beforeAll ( async () => {
         try {
             connection = await MongoClient.connect(DATABASE_URL, {
                 useNewUrlParser: true,
                 useUnifiedTopology: true
             })
             db = await connection.db()
         }catch(error) {
             console.error ('Error connecting to MongoDB', error)
         }
     })
     afterAll( async () => {
         await connection.close()
     })
     it ('should find the document', async () => {
         const users = db.collection ('users')
         console.log(users, "===========users==========")
         const  user = await users.findOne ({name: "Hadley.Koch"})

         expect(user.name).toBe ("Hadley.Koch")
         console.log(user, "===========user==========")
     })
     it ("Verify that user was deleted in MongoDB", async() => {
         const userImport = getUser("user")
         try{
         const res = await signUp(userImport)
         console.log(res.body, '========res========')
         expect(res.statusCode).toBe(201)
         const users = db.collection('users')
         const userData = await users.findOne({name: userImport.name})
         console.log(userData, "===========userData========")
         if (!userData) {
             throw new Error('User not found in MongoDB')
         }
         expect(userData.name).toBe(userImport.name)
         expect(userData.email).toBe(userImport.email.toLowerCase())
         expect(userData.role).toBe('user')
         expect(userData._id.toString()).toEqual(res.body.data.user._id)
         let deleteData = await users.deleteOne({
             _id: new ObjectId(userData._id)
         })
         console.log(deleteData, "==========deleteData=========")
         expect(deleteData.deletedCount).toBe(1)
         let findUser = await users.findOne({_id: userData._id})
         // if (findUser === null) {
         //     throw new Error('User is not deleted from MongoDB')
         } catch (error) {
             console.log("Error in user creation", error)
         }
         })
 })