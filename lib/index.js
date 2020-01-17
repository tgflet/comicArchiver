
const { Client } = require('pg');
const comics = require('./adapters/comics')
/**
 * Returns results
 */
exports.load = async function() {
    const client = new Client({
        database: 'comicDB'
    });
    await client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        } else {
            console.log('connected')
        }
    });
    const res = await client.query('SELECT * from comicArchive')
    console.log(res.rows);
    client.end();

}

exports.addEntry = async (args) => {
    try{
        await comics.addComic(args);
    } catch (err) {
        console.error(err);
    }
}
// load();