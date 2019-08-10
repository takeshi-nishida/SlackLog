"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const core_1 = require("@material-ui/core/");
let channels;
let users;
let logs;
let counts;
function loadSlackExports() {
    return __awaiter(this, void 0, void 0, function* () {
        users = yield fetchJson("/data/users.json");
        channels = yield fetchJson("/data/channels.json");
        logs = new Map(yield Promise.all(channels.map(c => fetchChannelLog(c))));
    });
}
function fetchJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url);
        return response.json();
    });
}
function fetchChannelLog(c) {
    return __awaiter(this, void 0, void 0, function* () {
        const index = yield fetchJson(`/data/${c.name}/index.json`);
        const allJson = yield Promise.all(index.map(name => fetchJson(`/data/${c.name}/${name}`)));
        return [c, allJson.reduce((arr, v) => arr.concat(v), [])];
    });
}
function count() {
    counts = new Map();
    users.forEach(u => {
        const m = channels.map(c => [c, countMessagesOfUser(u, c)]);
        counts.set(u, new Map(m));
    });
}
function countMessagesOfUser(u, c) {
    return logs.get(c).filter(m => m.user === u.id).length;
}
const App = () => react_1.default.createElement(react_1.default.Fragment, null,
    react_1.default.createElement(core_1.Table, { size: "small" },
        react_1.default.createElement(core_1.TableHead, null,
            react_1.default.createElement(core_1.TableRow, null,
                react_1.default.createElement(core_1.TableCell, null, "name"),
                react_1.default.createElement(core_1.TableCell, null, "\u6C0F\u540D"),
                channels.map(c => (react_1.default.createElement(core_1.TableCell, null, c.name))))),
        react_1.default.createElement(core_1.TableBody, null, users.map(u => (react_1.default.createElement(core_1.TableRow, { key: u.id },
            react_1.default.createElement(core_1.TableCell, null, u.name),
            react_1.default.createElement(core_1.TableCell, null, u.real_name),
            channels.map(c => (react_1.default.createElement(core_1.TableCell, null, counts.get(u).get(c))))))))));
loadSlackExports().then(() => {
    count();
    react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById("root"));
});
//# sourceMappingURL=app.js.map