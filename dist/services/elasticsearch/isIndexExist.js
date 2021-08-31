"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client = require('./client');
const isIndexExist = (ind) => {
    return client.exists({
        index: ind,
    });
};
module.exports = isIndexExist;
// async function run(index: string) {
//   const { body } = await client.exists({
//     index: index,
//   });
//   console.log(body); // true
// }
