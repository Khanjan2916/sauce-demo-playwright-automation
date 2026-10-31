
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

async function main() {
    const SQL = await initSqlJs();

    // Create SQLite database
    const db = new SQL.Database();

    // Read SQL file
    const sqlPath = path.join(__dirname, 'queries.sql');
    const dbPath = path.join(__dirname, 'sauce-demo.db');

    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Execute SQL queries
    const results = db.exec(sql);

    // Display results
    for (const result of results) {
        console.log('\nQuery Results:');

        console.table(
            result.values.map(row =>
                Object.fromEntries(
                    result.columns.map((column, index) => [
                        column,
                        row[index]
                    ])
                )
            )
        );
    }

    // Save database
    fs.writeFileSync(dbPath, Buffer.from(db.export()));

    db.close();

    console.log('\nDatabase created successfully!');
}

main().catch(console.error);
