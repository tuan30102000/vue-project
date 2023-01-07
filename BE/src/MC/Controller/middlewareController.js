import jwt from "jsonwebtoken"
import post from "../Model/post.js";
import users from "../Model/users.js";
class middlewareController {
    async verifyToken(req, res, next) {
        const token = req.headers.accesstoken;
        if (!token) return res.status(401).json("You're not authenticated");

        const accessToken = token.split(" ")[1];
        //token is not valid
        try {
            const user = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY)
            const userData = await users.findById(user._id)
            if (!userData) return res.status(403).json({ message: 'token is not valid' })
            req.user = userData
            next()
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'something wrong' })
        }
        //token valid
    }

    async verifyPost(req, res, next) {
        try {
            const postCurrent = await post.findById(req.params.postId)
            if (!postCurrent) return res.status(403).json({ message: 'post not found' })
            req.postCurrent = postCurrent
            next()
            // if (req.user._id.toString() != postCurrent.owner.toString()) return res.status(403).json({ message: 'not enough jurisdiction' })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'can connect Db' })
        }
    }
    async isOwmerPost(req, res, next) {
        const { postCurrent } = req
        if (req.user._id.toString() != postCurrent.owner.toString()) return res.status(403).json({ message: 'not enough jurisdiction' })
        next()
    }
    async checkFrienExist(req, res, next) {
        const requestId = req.user._id
        const { friendId, action } = req.body
        const actionList = ['request', 'accept', 'reject', 'remove','cancel']
        if (!actionList.includes(action)) return res.status(403).json({ message: 'action not found' })
        if (friendId == requestId) return res.status(400).json({ message: 'can add yourself' })
        try {
            const friend = await users.findById(friendId)
            if (!friend) return res.status(403).json({ message: 'user not Exist' })
            req.friend = friend
            next()
        } catch (error) {

        }
    }
}

export default new middlewareController()