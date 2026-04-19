import { type SQLiteTableWithColumns, type TableConfig } from "drizzle-orm/sqlite-core";

export function matchTable<T>() {
  return <C extends TableConfig>(
    table: SQLiteTableWithColumns<C> & { [K in keyof T]: any }
  ): table is SQLiteTableWithColumns<C> & { [K in keyof T]: any } => {
    return true; // Type-only check
  };
}
