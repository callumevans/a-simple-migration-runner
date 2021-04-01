#!/usr/bin/env node

import {Command} from "./command";
import {Init} from "./commands/init";
import {Create} from "./commands/create";
import {Version} from "./commands/version";
import {AsmrError} from "./logging";
import {Remove} from "./commands/remove";
import {Up} from "./commands/up";
import {Down} from "./commands/down";
import {Reset} from "./commands/reset";
import {GetCommand} from "./cli-arguments-parser";
import {List} from "./commands/list";
import {Help} from "./commands/help";

export async function main() {
    const command = GetCommand();

    switch (command) {
        case Command.Init:
            await Init();
            break;
        case Command.Create:
            await Create();
            break;
        case Command.Version:
            Version();
            break;
        case Command.Remove:
            await Remove();
            break;
        case Command.Up:
            await Up();
            break;
        case Command.Down:
            await Down();
            break;
        case Command.Reset:
            await Reset();
            break;
        case Command.List:
            await List();
            break;
        case Command.Help:
            Help();
            break;
        default:
            AsmrError('Invalid command. Usage: \'asmr init | create | remove | up | down | reset | list | help | version\'');
    }
}

main().catch((err) => AsmrError(err));
