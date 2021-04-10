import * as fs from "fs";
import * as glob from "glob-promise";

const MIGRATION_NAME_REGEX = new RegExp("\\/migrations\\/(.*)");
const MIGRATION_FRIENDLY_NAME_REGEX = new RegExp(/(?<=\-)\s*(.*)/g);

export default class Migration {
    public readonly Name: string;

    public get FriendlyName(): string {
        return this.Name.match(MIGRATION_FRIENDLY_NAME_REGEX)[0];
    }

    public async UpMigrationPath(): Promise<string> {
        const directory = await this.Directory();
        const path = `${directory}/up.sql`;

        if (!fs.existsSync(path)) {
            throw `No up.sql file for migration '${this.Name}'`;
        }

        return path;
    }

    public async DownMigrationPath(): Promise<string> {
        const directory = await this.Directory();
        const path = `${directory}/down.sql`;

        if (!fs.existsSync(path)) {
            throw `No down.sql file for migration '${this.Name}'`;
        }

        return path;
    }

    public async SeedPath(): Promise<string> {
        const directory = await this.Directory();
        const path = `${directory}/seed.sql`;

        if (!fs.existsSync(path)) {
            throw `No seed.sql file for migration '${this.Name}'`;
        }

        return path;
    }

    public static async GetAllMigrations(): Promise<Migration[]> {
        const migrationDirs = await glob(`./migrations/**-**`, { matchBase: false });

        const migrations: Migration[] = [];

        for (const mig of migrationDirs) {
            const name = MIGRATION_NAME_REGEX.exec(mig)[1];

            if (!name) {
                continue;
            }

            migrations.push(new Migration(name));
        }

        return migrations;
    }

    private async Directory(): Promise<string> {
        const paths = await glob(`./migrations/${this.Name}`);

        if (!paths || paths?.length < 1) {
            throw `No container directory for migration '${this.Name}'`;
        }

        return paths[0];
    }

    constructor(name: string) {
        this.Name = name;
    }
}
