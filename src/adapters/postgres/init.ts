import {InitResult, InitResultType} from "../results/init-result";
import * as postgres from "postgres";

export async function Init(sql: postgres): Promise<InitResult> {
    try {
        const result = await sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'asmr_migrations')`;

        if (result[0].exists) {
            return new InitResult(InitResultType.AlreadyExists);
        }

        await sql`CREATE TABLE asmr_migrations (id SERIAL PRIMARY KEY, name text UNIQUE, run_date timestamp, asmr_version text);`;
    } catch(err) {
        return new InitResult(InitResultType.Error, err);
    }

    return new InitResult(InitResultType.Initialised);
}
