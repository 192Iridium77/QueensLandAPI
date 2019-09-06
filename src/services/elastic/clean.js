import elastic from "./index";

elastic.indices.delete({ index: '*'}).then(() => {
  console.log("All indices deleted");
});
