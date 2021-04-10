import * as postgres from "postgres";
import {IAdapter} from "../adapter-interface";
import {InitResult} from "../results/init-result";
import {Init} from "./init";
import Migration from "../../migration";
import {GetConnectionString} from "../../cli-arguments-parser";
import {GetExecutedMigrations} from "./get-executed-migrations";
import {ExecuteUpMigration} from "./execute-up-migration";
import {ExecuteDownMigration} from "./execute-down-migration";
import {WriteUpMigrationLog} from "./write-up-migration-log";
import {WriteDownMigrationLog} from "./write-down-migration-log";
import {ExecuteSeed} from "./execute-seed";
import {WriteSeededMigrationLog} from "./write-seeded-migration-log";
import {GetSeededMigrations} from "./get-seeded-migrations";

export class PostgresAdapter implements IAdapter {
    private connectionString: string;
    private sql: postgres;

    static async Build(): Promise<PostgresAdapter> {
        const adapter = new PostgresAdapter();

        adapter.connectionString = GetConnectionString();
        adapter.sql = await postgres(adapter.connectionString);

        return adapter;
    }

    private constructor() {
    }

    async Init(): Promise<InitResult> {
        return await Init(this.sql);
    }

    async Close(): Promise<void> {
        await this.sql.end();
    }

    async GetExecutedMigrations(): Promise<Migration[]> {
        return await GetExecutedMigrations(this.sql);
    }

    async GetSeededMigrations(): Promise<Migration[]> {
        return await GetSeededMigrations(this.sql);
    }

    async ExecuteUpMigration(migration: Migration): Promise<void> {
        await ExecuteUpMigration(this.sql, migration);
    }

    async ExecuteDownMigration(migration: Migration): Promise<void> {
        await ExecuteDownMigration(this.sql, migration);
    }

    async WriteUpMigrationLog(migration: Migration): Promise<void> {
        await WriteUpMigrationLog(this.sql, migration);
    }

    async WriteDownMigrationLog(migration: Migration): Promise<void> {
        await WriteDownMigrationLog(this.sql, migration);
    }

    async ExecuteSeed(migration: Migration): Promise<void> {
        await ExecuteSeed(this.sql, migration);
    }

    async WriteSeededMigrationLog(migration: Migration): Promise<void> {
        await WriteSeededMigrationLog(this.sql, migration);
    }
}
