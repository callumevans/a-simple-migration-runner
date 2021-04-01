import {InitResult} from "./results/init-result";
import Migration from "../migration";

export interface IAdapter {
    Init: () => Promise<InitResult>;
    Close: () => Promise<void>;
    GetExecutedMigrations: () => Promise<Migration[]>;
    ExecuteUpMigration: (migration: Migration) => Promise<void>;
    ExecuteDownMigration: (migration: Migration) => Promise<void>;
    WriteUpMigrationLog: (migration: Migration) => Promise<void>;
    WriteDownMigrationLog: (migration: Migration) => Promise<void>;
}
