
"use strict";
const Database = require('better-sqlite3');


const db = new Database('log.db');
const leg = 1;


const stmt = db.prepare(`
    SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`
    );

let row = stmt.get();

if (row === undefined) {

    console.log('Your database appears to be empty. I will initialize it now.');

    const sqlInit = `
        CREATE TABLE accesslog ( 
            id INTEGER PRIMARY KEY,         
            remoteaddr TEXT,
            remoteuser TEXT,
            time TEXT,
            method TEXT,
            url TEXT,
            protocol TEXT,
            httpversion TEXT,
            status TEXT,
            referer TEXT,
            useragent TEXT
            );
        
    `;

    db.exec(sqlInit);

    console.log('Your database has been initialized with a new table and two entries containing a username and password.');
} else {

    console.log('Database exists.')
}
// Export all of the above as a module so that we can use it elsewhere.
module.exports = db