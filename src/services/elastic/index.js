const elasticsearch = require("elasticsearch");
const AwsElastic = require("aws-elasticsearch-client");
import config from "./config";
import { map, toLower, reduce } from "lodash";
import bodyBuilder from "bodybuilder";

let client;

if (process.env.NODE_ENV === "development") {
  client = new elasticsearch.Client(JSON.parse(JSON.stringify(config)));
} else {
  client = AwsElastic(JSON.parse(JSON.stringify(config)));
}

const defaultSize = 2000;
const type = "doc";

client.$index = function({ index, id, body, ...args }) {
  return client.index({ index, type, id, body, ...args });
};

client.$upsert = function({ index, id, body, ...args }) {
  const _body = {
    doc: body,
    doc_as_upsert: true
  };
  return client.update({ index, type, id, body: _body, ...args });
};

client.$exists = function({ index, id }) {
  return client.exists({ index, type, id });
};

client.$search = function(args) {
  args.body.size = args.body.size || defaultSize;
  return client.indices.exists(args).then(exists => {
    console.log('EXISTS', exists)
    if (!exists) return [];
    return client.search(args).then(({ hits: { hits } }) => {
      return map(hits, e => e._source);
    });
  });
};

client.$searchPaged = function(args) {
  args.body.size = args.body.size || defaultSize;
  return client.indices.exists(args).then(exists => {
    if (!exists) return [];
    return client.search(args).then(({ hits: { hits, total } }) => {
      return { results: map(hits, e => e._source), info: { total } };
    });
  });
};

client.$get = function({ index, id }) {
  return client.indices.exists({ index }).then(exists => {
    if (!exists) throw new Error(`Elasticsearch index not found: ${index}`);

    return client.get({ index, type, id }).then(({ _source }) => {
      return _source;
    });
  });
};

client.$getOrEmpty = function({ index, id }) {
  return client.indices.exists({ index }).then(exists => {
    if (!exists) throw new Error(`Elasticsearch index not found: ${index}`);
    return client.exists({ index, type, id }).then(docExists => {
      if (!docExists) return {};

      return client.get({ index, type, id }).then(({ _source }) => {
        return _source;
      });
    });
  });
};

client.$getAgg = function(Agg, id) {
  return this.$get({ index: toLower(Agg.name), id });
};

client.$getAggs = function(Agg, ids) {
  const body = bodyBuilder().query("terms", "id", ids);
  return this.$search({ index: toLower(Agg.name), body });
};

client.$updateByQuery = function({ index, ...args }) {
  return this.updateByQuery({
    index,
    type,
    ...args
  });
};

client.$bulkIndex = function({ index, body, ...args }) {
  const _body = reduce(body, (accumulator, value, i) => {
    accumulator.push({
        index: { _index: index, _type: 'doc' }
      },
      value
    )
    return accumulator;
  }, []);

  return this.bulk({ body: _body })
}

export default client;