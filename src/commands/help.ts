import {AsmrLog} from "../logging";
import HexColours from "../hex-colours";
const pkg = require('../../package.json');

const Commands = [
    { key: 'init', desc: `creates the schema required by asmr in target database` },
    { key: 'create', desc: 'creates a new migration' },
    { key: 'remove', desc: 'removes a migration' },
    { key: 'up', desc: 'runs all up migrations that have not yet been run' },
    { key: 'down', desc: 'runs the last n downwards migrations (default 1) for migrations that have been run' },
    { key: 'reset', desc: 'runs all downwards migrations for migrations that have been run' },
    { key: 'list', desc: 'lists all migrations, highlighting migrations that have already been run' },
    { key: 'help', desc: 'displays asmr user guide' },
    { key: 'version', desc: 'displays currently running asmr version' },
];

const LongestCommandKey = Math.max(...Commands.map(comm => comm.key.length));

export function Help() {
    WriteHeader('asmr ~ a simple migration runner');

    WriteHeader('Version');
    WriteIndented(`${pkg.version}`);

    WriteHeader('Usage');

    for (const command of Commands) {
        const gap = LongestCommandKey - command.key.length + 2;
        WriteIndented(`${command.key}${' '.repeat(gap)}${command.desc}`)
    }
}

function WriteHeader(message) {
    AsmrLog('\n');
    AsmrLog(message);
}

function WriteIndented(message) {
    AsmrLog(`  ${message}`, HexColours.Grey);
}
