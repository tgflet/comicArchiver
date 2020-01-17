#!/usr/bin/env node

const archive = require('../lib');

const commands = process.argv.splice(2);
if ( commands[0] === '--add') {
    const args = commands.splice(1);
    archive.addEntry(args)
    return
}
if(!commands[0]){
    archive.load();
}
