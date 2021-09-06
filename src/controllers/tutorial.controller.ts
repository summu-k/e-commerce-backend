// import { db } from '../database';
// // const db = require('../models');
// const Tutorial = db.tutorials;
// const Op = db.Sequelize.Op;
// import { Request, Response } from 'express';

// // Create and Save a new Tutorial
// exports.create = (req: Request, res: Response) => {
//   // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: 'Content can not be empty!',
//     });
//     return;
//   }

//   // Create a Tutorial
//   const tutorial = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false,
//   };

//   // Save Tutorial in the database
//   Tutorial.create(tutorial)
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch((err: any) => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while creating the Tutorial.',
//       });
//     });
// };

// // Retrieve all Tutorials from the database.
// exports.findAll = (req: Request, res: Response) => {
//   const title = req.query.title;
//   var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

//   Tutorial.findAll({ where: condition })
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

// // Find a single Tutorial with an id
// exports.findOne = (req: Request, res: Response) => {
//   const id = req.params.id;

//   Tutorial.findByPk(id)
//     .then((data: any) => {
//       res.send(data);
//     })
//     .catch(() => {
//       res.status(500).send({
//         message: 'Error retrieving Tutorial with id=' + id,
//       });
//     });
// };

// // Update a Tutorial by the id in the request
// exports.update = (req: Request, res: Response) => {
//   const id = req.params.id;

//   Tutorial.update(req.body, {
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

//   Tutorial.destroy({
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
//   Tutorial.destroy({
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
//   Tutorial.findAll({ where: { published: true } })
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
