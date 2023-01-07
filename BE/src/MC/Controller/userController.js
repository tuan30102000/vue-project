import cloudinary from "../../cloudinary/cloudinary.js"
import listDefalult from "../../constan/listDefault.js"
import method from "../../constan/method.js"
import users from "../Model/users.js"
import Mongoose from "mongoose"
const { ObjectId } = Mongoose.Types
const populateUser = { path: 'friend', select: 'avatarUrl displayName' }
class userController {
    async updateUserInfor(req, res) {
        if (!req.body) return res.status(403).json({ message: 'displayName is emty' })
        try {
            await users.updateOne({ _id: req.user._id, }, {
                displayName: req.body.displayName,
                about: req.body.about,
            })
            res.status(200).json({ message: 'updateDisplayname complete' })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })

        }
    }

    async updateAvt(req, res) {
        const file = req.file
        if (!file) return res.status(403).json({ message: 'file is emty' })
        try {
            const user = req.user
            if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
            const resultClould = await cloudinary.uploader.upload(file.path, { resource_type: 'image', folder: 'FacebookCollection/avatarCollection' })
            await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
            res.status(200).json({ avatarUrl: resultClould.url })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }
    }

    async updateCoverAvt(req, res) {
        const file = req.file
        if (!file) return res.status(403).json({ message: 'file is emty' })
        try {
            const user = req.user
            // if (!listDefalult.listUrlAvtDefault.includes(user.avatarUrl)) await cloudinary.uploader.destroy(method.getClouldDinary(user.avatarUrl))
            const resultClould = await cloudinary.uploader.upload(file.path, { resource_type: 'image', folder: 'FacebookCollection/avatarCollection' })
            await users.updateOne({ _id: req.user._id }, { avatarUrl: resultClould.url })
            res.status(200).json({ avatarUrl: resultClould.url })
        } catch (error) {
            console.log(error)
            res.status(403).json({ message: ' something wrong' })
        }
    }
    async getUserAll(req, res) {
        try {
            const user = await users.find({ _id: { $nin: [...req.user.friend, req.user._id, ...req.user.friendRequest, ...req.user.myRequestFriends] } }).populate({ path: 'friendRequest', select: 'avatarUrl displayName' }).limit(9).select('avatarUrl displayName')
            res.json(user)
        } catch (error) {

        }
    }
    async getUserById(req, res) {
        const { userId } = req.params
        try {
            const user = await users.findById({ _id: userId }).populate(populateUser)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json('user not found')
        }
    }
    async handleFriend(req, res) {
        const { friendId, action } = req.body
        const friend = req.friend
        const requestId = req.user._id
        try {
            if (action == 'request') {
                if (friend.friendRequest.includes(requestId)) return res.status(400).json({ message: 'request is Exist' })
                if (friend.friend.includes(requestId)) return res.status(400).json({ message: 'have made friends' })
                if (req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'Please accept friend' })
                await users.updateOne({ _id: friendId, }, { $addToSet: { friendRequest: ObjectId(requestId) } })
                const userNewest = await users.findByIdAndUpdate({ _id: requestId, }, { $addToSet: { myRequestFriends: ObjectId(friendId) } }, { new: true }).populate(populateUser)
                return res.status(200).json(userNewest)
            }

            if (action == 'accept') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'not friend request' })
                const userNewest = await users.findByIdAndUpdate({ _id: requestId }, {
                    $pull: { friendRequest: ObjectId(friendId), },
                    $addToSet: { friend: ObjectId(friendId) }
                }, { new: true }).populate(populateUser)
                await users.updateOne({ _id: friendId }, {
                    $addToSet: { friend: ObjectId(requestId,) },
                    $pull: { myRequestFriends: ObjectId(requestId) }
                })
                return res.status(200).json(userNewest)
            }

            if (action == 'reject') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'friendRequest it no longer exists' })
                const userNewest = await users.findByIdAndUpdate({ _id: requestId }, { $pull: { friendRequest: ObjectId(friendId) } }, { new: true }).populate(populateUser)
                await users.updateOne({ _id: friendId }, {
                    $pull: { myRequestFriends: ObjectId(requestId) }
                })
                return res.status(200).json(userNewest)
            }

            if (action == 'remove') {
                if (!req.user.friendRequest.includes(friendId)) return res.status(400).json({ message: 'friend it no longer exists' })
                const userNewest = await users.findByIdAndUpdate({ _id: requestId }, { $pull: { friend: ObjectId(friendId) }, }, { new: true }).populate(populateUser)
                await users.updateOne({ _id: friendId }, { $pull: { friend: ObjectId(requestId) } })
                return res.status(200).json(userNewest)
            }
            if (action == 'cancel') {
                if (!req.user.myRequestFriends.includes(friendId)) return res.status(400).json({ message: 'friend it no longer exists' })
                const userNewest = await users.findByIdAndUpdate({ _id: requestId }, { $pull: { myRequestFriends: ObjectId(friendId) } }, { new: true }).populate(populateUser)
                await users.updateOne({ _id: friendId }, { $pull: { friendRequest: ObjectId(requestId) } })
                return res.status(200).json(userNewest)
            }
        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'something wrong' })
        }
    }
    async suggestionsUser(req, res) {
        // try {
        //     const newArr = [...req.user.following, req.user._id]

        //     const num = req.query.num || 10

        //     const users = await Users.aggregate([
        //         { $match: { _id: { $nin: newArr } } },
        //         { $sample: { size: Number(num) } },
        //         { $lookup: { from: 'users', localField: 'followers', foreignField: '_id', as: 'followers' } },
        //         { $lookup: { from: 'users', localField: 'following', foreignField: '_id', as: 'following' } },
        //     ]).project("password")

        //     return res.json({
        //         users,
        //         result: users.length
        //     })

        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }

        try {

        } catch (error) {

        }
    }
    updateSelfIntroduce(req, res) {

    }
    async suggestionsUserAutocomplete(req, res) {
        let q = req.query.suggest ? req.query.suggest : '';
        if (!q) return res.status(200).json([])
        let query = {
            "displayName": { "$regex": q, "$options": "i" },
            
        };
        const user = await users.find(query).limit(6)
        const displayNameSuggestions = user.map(item => item.displayName)
        const setSuggest = new Set(displayNameSuggestions)
        res.status(200).json([...setSuggest])
        try {
        } catch (error) {
            res.status(500).json(error)
            console.log(error)
        }
    }

}

export default new userController()