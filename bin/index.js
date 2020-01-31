#!/usr/bin/env node

const archive = require('../lib');

const commands = process.argv.splice(2);
if ( commands[0] === '--add') {
    const args = commands.splice(1);
    archive.addEntry(args)
    return
} else if (commands[0] === '--box') {
    const args = commands.splice(1);
    archive.setBox(args)
    return
}
if(!commands[0]){
    archive.status();
}
