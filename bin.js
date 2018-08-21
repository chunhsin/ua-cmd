#!/usr/bin/env node
'use strict';
const uaCmd = require( './' );
const fs = require( 'fs' );
const csv = require( 'fast-csv' );
let data = '';
let out;

/**
 * Usage:
 *   echo "some_user_agent" | ua-cmd
 */
process.stdin.setEncoding( 'utf8' );
process.stdin.on( 'readable', () => {
  let chunk = process.stdin.read();
  if (chunk !== null) {
    data += chunk;
  }
} );
process.stdin.on( 'end', () => {
  data.split( "\n" ).forEach( ( ua ) => {
    out = uaCmd.prettyParse( ua );
    process.stdout.write( `${out}\n` );
  } )
} );

/**
 * Usage:
 *   ua-cmd "some_user_agent"
 *   ua-cmd csv csvPath uaIndex
 */
let uaString = process.argv[2];
if (uaString === 'csv') {

  let csvFile = process.argv[3];
  let uaIndex = process.argv[4];

  csv.fromPath( csvFile )
     .transform( ( data ) => {
       let out = uaCmd.prettyParseToArray( data[uaIndex] );
       return data.concat( out );
     } )
     .pipe( csv.createWriteStream(), {quote: '"'} )
     .pipe( fs.createWriteStream( "out.csv", {encoding: "utf8"} ) )
     .on( "finish", function() {
       console.log( "please check out.csv !" );
       process.stdin.end();
     } );
}
else {
  out = uaCmd.prettyParse( uaString );
  process.stdout.write( `${out}\n` );
  process.stdin.end();
}
