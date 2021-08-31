const client = require('./client');

const addMapping = (ind: string, mapping: Object) => {
  return client.indices.putMapping({
    index: ind,
    body: mapping,
    includeTypeName: true,
  });
};

export {};
module.exports = addMapping;
