import bodybuilder from "bodybuilder";

export default function({ $elastic }) {
  const body = bodybuilder()
    .query('match_all')
    .build();

  return $elastic.$search({
    index: "suburbs",
    type: "doc",
    body
  }).then((results) => {
    console.log('RESULTS', results)
    return results;
  })
}