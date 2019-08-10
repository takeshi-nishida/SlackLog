import fs from "fs";
import path from "path";

const dataRoot = path.join(__dirname, "public", "data");
const data = fs.readFileSync(path.join(dataRoot, "channels.json"), 'utf8');
const channels = JSON.parse(data);

channels.forEach(c => {
    const dirname = path.join(dataRoot, c.name);
    const outname = path.join(dirname, "index.json");
    const filenames = fs.readdirSync(dirname).filter(name => name.endsWith(".json") && name !== "index.json");

    const data = `[ ${filenames.map(name => '"' + name + '"').join(",")} ]`;

    fs.writeFile(outname, data, (err) => { if (err) console.log(err) });
});
