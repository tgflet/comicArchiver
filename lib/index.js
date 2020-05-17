
const { Client } = require('pg');
const comics = require('./adapters/comics')
/**
 * Returns results
 */
exports.status = async function() {
    const client = new Client({
        database: 'comicDB'
    });
    await client.connect(err => {
        if (err) {
            console.error('connection error', err.stack)
        }
    });
    const res = await client.query(`SELECT SUM(copies) as gross, COUNT(*) as count FROM comicArchive`);
    const comicCount = res.rows[0];
    console.log(`Total Unique Comics: ${comicCount.count}`);
    console.log(`Total Comics: ${comicCount.gross}`);
    client.end();

}

exports.addEntry = async (args) => {
    try{
        await comics.addComic(args);
    } catch (err) {
        console.error(err);
    }
}
exports.setBox = async (args) => {
    try {
        await comics.readBox(args);
    } catch (err) {
        console.error(err);
    }
}
