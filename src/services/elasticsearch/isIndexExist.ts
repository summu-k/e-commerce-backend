const client = require('./client');

const isIndexExist = (ind: string) => {
  return client.exists({
    index: ind,
  });
};

export {};
module.exports = isIndexExist;

// async function run(index: string) {
//   const { body } = await client.exists({
//     index: index,
//   });

//   console.log(body); // true
// }
