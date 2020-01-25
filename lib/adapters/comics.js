
const { Client } = require('pg');
const comicBox = require('./config.json');
const fs = require('fs');
const path = require('path');

/**
 * Adds Comics to the database
 * @param {array} args The user submitted Comic Details
 */
exports.addComic = async function(args) {
    if (args.length === 5) {
        const query = {
            text: `INSERT 
            INTO comicArchive2 (publisher, volume, title, issue, copies, box)
            VALUES ($1, $2::int, $3, $4::int, $5::int, ${comicBox.box})
            ON CONFLICT 
            (title, volume, issue, publisher)
            DO UPDATE SET copies = comicArchive2.copies + $5::int`,
            values : args
        }
        await _addEntry(query);
    } else if(args.length === 4){
        const query = {
            text: `INSERT 
            INTO comicArchive2 (publisher, volume, title, issue, box)
            VALUES ($1, $2::int, $3, $4::int, ${comicBox.box})
            ON CONFLICT 
            (title, volume, issue, publisher)
            DO UPDATE SET copies = comicArchive2.copies + 1`,
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

/**
 * Function for setting the Box to simplify entry
 * @param {array} args The user submitted Comic Details
 */
exports.readBox = async function(args) {
    if(args.length > 1) {
        throw 'Only Enter one Integer'
    }
    if(!parseInt(args[0])){
        throw 'Enter an Integer'
    }
    const destination = path.join(__dirname, '/config.json');

    const newBoxNumber = parseInt(args[0]);

    const currentBox = comicBox;

    currentBox.box = newBoxNumber;

    await fs.writeFileSync(destination, JSON.stringify(currentBox), err => {
        if (err) {
            throw err;
        }
    })

    console.log(`This is the current box ${currentBox.box}`);
}