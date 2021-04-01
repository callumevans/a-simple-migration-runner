import * as postgres from "postgres";
import Migration from "../../migration";
import * as packageInfo from "../../../package.json";

export async function WriteUpMigrationLog(sql: postgres, migration: Migration) {
    await sql`INSERT INTO asmr_migrations (name, run_date, asmr_version) VALUES (${migration.Name}, ${new Date()}, ${packageInfo.version.toString()})`;
}
