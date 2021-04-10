import * as postgres from "postgres";
import Migration from "../../migration";

export async function ExecuteSeed(sql: postgres, migration: Migration) {
    const path = await migration.SeedPath();

    await sql.begin(async sql => {
        await sql.file(path);
    });
}
