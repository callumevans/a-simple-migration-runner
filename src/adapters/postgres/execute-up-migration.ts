import * as postgres from "postgres";
import Migration from "../../migration";

export async function ExecuteUpMigration(sql: postgres, migration: Migration) {
    const path = await migration.UpMigrationPath();

    await sql.begin(async sql => {
        await sql.file(path);
    });
}
