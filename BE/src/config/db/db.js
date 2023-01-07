import Mongoose from "mongoose"

const db = {
    async connect() {
        console.log(process.env.MONGODB_URL)
        try {
            await Mongoose.connect(process.env.MONGODB_URL)
            console.log('connect sucessfully')
        } catch (error) {
            console.log('connect fail', error)
        }
    }
}

export default db