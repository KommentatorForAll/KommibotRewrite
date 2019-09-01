const fs = require("fs");

module.exports = (id, prefixes) => {
  const path = "./SETTINGS/" + id;
  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    if (!fs.existsSync(path + "/prefixes.txt")) {
      fs.writeFileSync(path + "/prefixes.txt", prefixes.join("\n"));
    }

    if (!fs.existsSync(path + "/unfähig.txt")) {
      fs.writeFileSync(path + "/unfähig.txt", "0");
    }

    if (!fs.existsSync(path + "/cookies.txt")) {
      fs.writeFileSync(path + "/cookies.txt", "0");
    }

    if (!fs.existsSync(path + "/abgehoben.txt")) {
      fs.writeFileSync(path + "/abgehoben.txt", "0");
    }
  }
  catch (err) {
    console.log(err)
  }
}
