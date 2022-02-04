const fs = require("fs");

const planetData = fs.readFileSync("src/data.json", "utf-8");
console.log(planetData);

export default planetData;
