import UserService from '~/services/UserServices';

class UserController {
    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async createUser(req, res) {
        try {
            const newUser = await UserService.createUser(req.body);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        try {
            const updatedUser = await UserService.updateUser(id, req.body);
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        try {
            const result = await UserService.deleteUser(id);
            if (result) {
                res.status(200).json({ message: 'Người dùng đã bị xóa' });
            } else {
                res.status(404).json({ message: 'Người dùng không tồn tại' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async findUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await UserService.findUserById(id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    
}

export default UserController;
