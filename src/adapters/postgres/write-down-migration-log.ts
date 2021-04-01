import * as postgres from "postgres";
import Migration from "../../migration";

export async function WriteDownMigrationLog(sql: postgres, migration: Migration) {
    await sql`DELETE FROM asmr_migrations WHERE name = ${migration.Name}`;
}
