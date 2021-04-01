import {AsmrLog} from "../logging";
const pkg = require('../../package.json');

export function Version() {
    AsmrLog(`asmr version ${pkg.version}`);
}
