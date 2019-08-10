"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dataRoot = path_1.default.join(__dirname, "public", "data");
const data = fs_1.default.readFileSync(path_1.default.join(dataRoot, "channels.json"), 'utf8');
const channels = JSON.parse(data);
channels.forEach(c => {
    const dirname = path_1.default.join(dataRoot, c.name);
    const outname = path_1.default.join(dirname, "index.json");
    const filenames = fs_1.default.readdirSync(dirname).filter(name => name.endsWith(".json") && name !== "index.json");
    const data = `[ ${filenames.map(name => '"' + name + '"').join(",")} ]`;
    fs_1.default.writeFile(outname, data, (err) => { if (err)
        console.log(err); });
});
//# sourceMappingURL=data-index-gen.js.map