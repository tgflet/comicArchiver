
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
    const res = await client.query(`SELECT COUNT(*) FROM parentsComics`);
    const comicCount = res.rows[0].count;
    console.log(`Total Unique Comics: ${comicCount}`);
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
