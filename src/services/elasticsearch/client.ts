import { Client } from '@elastic/elasticsearch';

// module.exports = new Client({ node: 'http://localhost:9200' });

const client = new Client({ node: 'http://localhost:9200' });
export { client };
