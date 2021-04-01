import * as postgres from "postgres";
import Migration from "../../migration";

export async function GetExecutedMigrations(sql: postgres): Promise<Migration[]> {
    const migrations = await sql`SELECT id, name, run_date FROM asmr_migrations ORDER BY run_date ASC`;
    return migrations.map((m) => new Migration(m.name));
}
