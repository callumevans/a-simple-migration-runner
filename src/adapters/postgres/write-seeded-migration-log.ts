import * as postgres from "postgres";
import Migration from "../../migration";

export async function WriteSeededMigrationLog(sql: postgres, migration: Migration) {
    await sql`UPDATE asmr_migrations SET seed_script_ran = true WHERE name = ${migration.Name}`;
}
