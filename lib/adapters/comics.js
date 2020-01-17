
const { Client } = require('pg');

/**
 * Adds Comics to the database
 * @param {array} args The user submitted Comic Details
 */
exports.addComic = async function(args) {
    if (args.length === 5) {
        const query = {
            text: `INSERT 
            INTO comicArchive (publisher, volume, title, issue, copies)
            VALUES ($1, $2::int, $3, $4::int, $5::int)
            ON CONFLICT 
            (title, volume, issue, publisher)
            DO UPDATE SET copies = comicArchive.copies + $5::int`,
            values : args
        }
        await _addEntry(query);
    } else if(args.length === 4){
        const query = {
            text: `INSERT 
            INTO comicArchive (publisher, volume, title, issue)
            VALUES ($1, $2::int, $3, $4::int)
            ON CONFLICT 
            (title, volume, issue, publisher)
            DO UPDATE SET copies = comicArchive.copies + 1`,
            values : args
        }
        await _addEntry(query);
    } else {
        throw 'Insufficient Parameters';
    }
}

/**
 * Wrapper method to insert values.
 * @param {object} query The query object to add
 * @param {string} query.text The sql command to execute
 * @param {array} query.values The inputted command values
 * @private
 */
async function _addEntry(query) {
    const client = new Client({
        database: 'comicDB'
    })
    await client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        }
    })
    await client.query(query, (err, res) => {
        if (err) {
            throw err;
        } else {
            console.log('Success');
            client.end()
        }
    })
}