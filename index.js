'use strict';

const UAParser = require( 'ua-parser-js' );

function prettyParse( input ) {
  const parsed = new UAParser( input );
  const browser = parsed.getBrowser();
  const os = parsed.getOS();
  return `${browser.name} ${browser.version}
        ${os.name}","${os.version}
        `;
}

function prettyParseToArray( input ) {
  const parsed = new UAParser( input );
  const browser = parsed.getBrowser();
  const os = parsed.getOS();
  const device = parsed.getDevice();
  return [browser.name, browser.version, os.name, os.version, device.vendor, device.type];
}

module.exports = {
  prettyParse,
  prettyParseToArray
};
