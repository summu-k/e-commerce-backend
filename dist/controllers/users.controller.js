"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../models/users.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("../utils/auth");
const database_1 = require("../database");
// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
        return;
    }
    // Create a User
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcryptjs_1.default.hashSync(req.body.password),
        is_admin: req.body.is_admin ? req.body.is_admin : false,
    };
    // Save User in the database
    users_model_1.default.create(user)
        .then((data) => {
        res.send(data);
    })
        .catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occurred while creating the Tutorial.',
        });
    });
};
// Find a single User with an email
exports.findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield users_model_1.default.findOne({ where: { email } });
    if (user && bcryptjs_1.default.compareSync(req.body.password, user.password)) {
        const token = auth_1.signToken(user);
        res.send({
            token,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        });
    }
    else {
        res.status(401).send({ message: 'Invalid user or password' });
    }
});
exports.getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield users_model_1.default.findOne({ where: { email: email } });
    if (user && bcryptjs_1.default.compareSync(req.body.password, user.password)) {
        const token = auth_1.signToken(user);
        res.send({
            token,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
        });
    }
    else {
        res.status(401).send({ message: 'Invalid user or password' });
    }
});
exports.seed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ force: true });
        res.send({ data: 'Data synced successfully ' });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});
// Retrieve all Tutorials from the database.
// exports.findAll = (req: Request, res: Response) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
//   User.findAll({ where: condition })
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((err: { message: any }) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving tutorials.',
//       });
//     });
// };
// // Update a Tutorial by the id in the request
// exports.update = (req: Request, res: Response) => {
//   const id = req.params.id;
//   User.update(req.body, {
//     where: { id: id },
//   })
//     .then((num: number) => {
//       if (num == 1) {
//         res.send({
//           message: 'Tutorial was updated successfully.',
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch(() => {
//       res.status(500).send({
//         message: 'Error updating Tutorial with id=' + id,
//       });
//     });
// };
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req: Request, res: Response) => {
//   const id = req.params.id;
//   User.destroy({
//     where: { id: id },
//   })
//     .then((num: number) => {
//       if (num == 1) {
//         res.send({
//           message: 'Tutorial was deleted successfully!',
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
//         });
//       }
//     })
//     .catch(() => {
//       res.status(500).send({
//         message: 'Could not delete Tutorial with id=' + id,
//       });
//     });
// };
// // Delete all Tutorials from the database.
// exports.deleteAll = (req: Request, res: Response) => {
//   User.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums: any) => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch((err: { message: any }) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while removing all tutorials.',
//       });
//     });
// };
// // Find all published Tutorials
// exports.findAllPublished = (req: Request, res: Response) => {
//   User.findAll()
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((err: { message: any }) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving tutorials.',
//       });
//     });
// };
