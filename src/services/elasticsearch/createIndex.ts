const client = require('./client');
const isIndexExist = require('./isIndexExist');
const addMapping = require('./addMapping');
const {
  PRODUCTS_INDEX,
  mappings: { productsMapping },
} = require('../../constant/es.constants');

const createIndex = async () => {
  try {
    const exists = await isIndexExist(PRODUCTS_INDEX);
    if (!exists) {
      console.log(`Creating index ${PRODUCTS_INDEX}...`);
      await client.indices.create({ index: PRODUCTS_INDEX });
      productsMapping && (await addMapping(PRODUCTS_INDEX, productsMapping));
    } else {
      console.log(`Index ${PRODUCTS_INDEX} exists`);
    }
  } catch (err) {
    console.log(`Unable to create index index ${PRODUCTS_INDEX}...`, err);
  }
};

export {};
module.exports = createIndex;
