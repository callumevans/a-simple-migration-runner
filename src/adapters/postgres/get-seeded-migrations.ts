import * as postgres from "postgres";
import Migration from "../../migration";

export async function GetSeededMigrations(sql: postgres): Promise<Migration[]> {
    const migrations = await sql`
        SELECT 
            id,
            name, 
            run_date 
        FROM asmr_migrations 
        WHERE seed_script_ran = true
        ORDER BY id ASC`;
    return migrations.map((m) => new Migration(m.name));
}
