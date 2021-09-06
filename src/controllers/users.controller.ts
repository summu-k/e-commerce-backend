import Users from '../models/users.model';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/auth';
import { Request, Response } from 'express';
import { sequelize } from '../database';

// Create and Save a new User
exports.create = (req: Request, res: Response) => {
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
    password: bcrypt.hashSync(req.body.password),
    is_admin: req.body.is_admin ? req.body.is_admin : false,
  };

  // Save User in the database
  Users.create(user)
    .then((data: any) => {
      res.send(data);
    })
    .catch((err: any) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Tutorial.',
      });
    });
};

// Find a single User with an email
exports.findOne = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user: any = await Users.findOne({ where: { email: email } });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
};


exports.getAll = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user: any = await Users.findOne({ where: { email: email } });

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } else {
    res.status(401).send({ message: 'Invalid user or password' });
  }
};



exports.seed = async (req: Request, res: Response) => {
  try {
    await sequelize.sync({ force: true });
    res.send({ data: 'Data synced successfully ' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

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
