import {GetAdapter} from "./cli-arguments-parser";
import {AsmrError} from "./logging";
import {PostgresAdapter} from "./adapters/postgres/postgres-adapter";

export enum Adapter {
    Postgres,
}

export async function AdapterFactory() {
    const adapter: Adapter = GetAdapter();

    switch (adapter) {
        case Adapter.Postgres:
            return await PostgresAdapter.Build();
        default:
            AsmrError('No adapter specified.');
            return;
    }
}
