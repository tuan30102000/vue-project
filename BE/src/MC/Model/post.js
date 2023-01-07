import Mongoose from "mongoose"

const postSchema = new Mongoose.Schema({
    owner: { type: Mongoose.Schema.Types.ObjectId, ref: 'user' },
    imgUrl: {
        type: Array,
        default: []
    },
    content: {
        type: String,
        default: '',
    },
    like: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'user' }]
},
    { timestamps: true })



export default Mongoose.model('post', postSchema)