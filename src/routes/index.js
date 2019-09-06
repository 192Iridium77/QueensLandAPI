const router = require("express-promise-json-router")();
import context from "~/context";
// import queries from "~/queries";
// import commands from "~/commands";

router.get("/", function(req, res, next) {
  return Promise.resolve({ health: "ok" });
});

// router.get('/query/:query', (req, res) => {
//   if (!queries || !queries[req.params.query]) throw new Error(`query "${req.params.query}" not found`)
//   return queries[req.params.query](context, req.query)
//     .then(result => {
//       return result;
//     })
//     .catch(err => {
//       console.log('ERR caught', err)
//       return { status: 500, err };
//     });
// })
//
// router.post("/cmd/:cmd", req => {
//   console.log("COMMANDS", commands);
//   if (!commands || !commands[req.params.cmd])
//     throw new Error(`command "${req.params.cmd}" not found`);
//   console.log("CONDITION PASSED");
//   return commands[req.params.cmd](context, req.body);
// });

module.exports = router;