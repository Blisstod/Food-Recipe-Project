const { User, DeletedUser } = require('../models/userModel');
const bcrypt = require('bcrypt');


class AdminService {
    async getAllUsers() {
        try {
            const users = await User.find({});
            const deletedUsers = await DeletedUser.find({});
            return { users, deletedUsers };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async addUser(username, email, password, role) {
        try {
            let userExists = await User.findOne({ email });
            if (userExists) {
                throw new Error('User with that Email already exists!');
            }

            userExists = await User.findOne({ username });
            if (userExists) {
                throw new Error('User with that Username already exists!');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role
            });

            const user = await newUser.save();
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async editUser(userId, username, email, password, role) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const updatedData = { username, email, role, updateDate: new Date() };

            if (password) {
                const salt = await bcrypt.genSalt(10);
                updatedData.password = await bcrypt.hash(password, salt);
            }

            const updated = await User.findByIdAndUpdate(userId, updatedData, { new: true });
            return updated;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteUser(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const deletedUser = new DeletedUser({ ...user.toObject(), deletionDate: new Date() });
            await deletedUser.save();

            await User.deleteOne({_id: userId});
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getUserDetails(userId) {
        try {
            const user = await User.findById(userId, '-password');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new AdminService();
