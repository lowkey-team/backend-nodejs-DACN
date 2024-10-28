import User from "~/models/UserModel";

class UserService {
    static async getAllUsers() {
        return await User.getAll();
    }

    static async createUser(userData) {
        return await User.create(userData);
    }

    static async updateUser(id, userData) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        return await User.update(id, userData);
    }

    static async deleteUser(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        return await User.delete(id);
    }

    static async findUserById(id) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Người dùng không tồn tại');
        }
        return user;
    }
}

export default UserService;
