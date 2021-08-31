const client = require('./client');

let tries = 3;

const sleep = (ms: number) =>
  new Promise<void>((res) => setTimeout(() => res(), ms));

const connect = async () => {
  while (tries) {
    try {
      await client.ping();
      console.log('Connected to elasticsearch cluster');
      return client;
    } catch (err) {
      console.log(err.message);
      console.trace('Elasticsearch cluster is down!');
    }
    console.log(`could not connect to es ${tries} tries left`);
    tries -= 1;
    // wait 30 seconds
    await sleep(30000);
  }
  throw new Error('elastic search cluster is down');
};

export default connect;
