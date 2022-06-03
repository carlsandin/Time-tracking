import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Time from "../models/timeModel.js";
import User from "../models/userModel.js";

export default {
    times: async(args) => {
        const times = await Time.find({
            date: args.test.date,
            creator: args.test.creator,
        });
        try {
            return times;
        } catch (error) {
            throw new Error();
        }
    },

    allTimes: async(args) => {
        const allTimes = await Time.find({ creator: args.filter.creator });
        try {
            return allTimes;
        } catch (error) {
            throw new Error();
        }
    },
    deleteTime: async(id) => {
        try {
            await Time.findByIdAndDelete(id.id);
            return "Success";
        } catch (error) {
            console.log(error);
            throw new Error("Failed to delete");
        }
    },
    user: async(args) => {
        const user = await User.findOne({ _id: args.current.id });
        try {
            return user;
        } catch (error) {
            throw error;
        }
    },
    login: async({ email, password }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("No user found");
        }

        const comparePwd = await bcrypt.compare(password, user.password);

        if (!comparePwd) {
            throw new Error("Password is incorrect");
        }

        const token = jwt.sign({ userId: user.id, email: user.email },
            "secrettokenkey", {
                expiresIn: "3d",
            }
        );

        return {
            userId: user.id,
            email: user.email,
            displayName: user.displayName,
            createdAt: new Date(user.createdAt).toString(),
            token: token,
            tokenExpire: 8,
        };
    },

    createTime: async(args, req) => {
        if (!req.isAuth) {
            throw new Error("You don't have access!");
        }
        const time = new Time({
            title: args.timeInput.title,
            creator: args.timeInput.creator,
            date: args.timeInput.date,
            project: args.timeInput.project,
            startTime: args.timeInput.startTime,
            endTime: args.timeInput.endTime,
            h: args.timeInput.h,
            m: args.timeInput.m,
            s: args.timeInput.s,
        });

        try {
            await time.save();
            return time;
        } catch (error) {
            throw err;
        }
    },
    createUser: async(args) => {
        const exist = await User.findOne({ email: args.userInput.email });
        const pwd = bcrypt.hashSync(args.userInput.password, 12);
        const user = new User({
            email: args.userInput.email,
            password: pwd,
            avatar: args.userInput.avatar,
            displayName: args.userInput.displayName,
        });

        try {
            if (exist) return new Error("User already exists");
            await user.save();
            return user;
        } catch (error) {
            return error.message;
        }
    },
    updateTime: async(args) => {
        const update = {
            _id: args.update._id,
            title: args.update.title,
            creator: args.update.creator,
            date: args.update.date,
            project: args.update.project,
            startTime: args.update.startTime,
            endTime: args.update.endTime,
            h: args.update.h,
            m: args.update.m,
            s: args.update.s,
        };
        try {
            const updatedTime = await Time.findByIdAndUpdate(update._id, update, {
                new: true,
            });
            return updatedTime;
        } catch (error) {
            console.log(error);
        }
    },
};