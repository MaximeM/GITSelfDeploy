const { execSync }	= require( 'child_process' )
const express				= require( 'express' )
const fs						= require( 'fs' )
const http					= require( 'http' )
const https					= require( 'https' )

const config        = require( './config' )

const SSLKey = ( ( config.ssl && fs.existsSync( config.ssl + '/privkey.pem' ) )? fs.readFileSync( ( config.ssl + '/privkey.pem' ), 'utf8' ).trim(): null )
const SSLCert = ( ( config.ssl && fs.existsSync( config.ssl + '/fullchain.pem' ) )? fs.readFileSync( ( config.ssl + '/fullchain.pem' ), 'utf8' ).trim(): null )

const checkAndRunDeploy = ( req, res ) => {
  try	{
    console.log( req.params )
    //console.log( module.exports.shell( '/bin/sh ' + __dirname + '/gitDeploy.sh ' + deployTo + ' ' + parseInt( pm2ProcessNumber ).toString() ) )
  }	catch( e )	{
    console.log( e )
  }
  res.end( '' )
}

const app	= express()
app.use( express.urlencoded( { limit: '50mb', extended: false } ) )
app.use( express.json( { limit: '50mb', extended: false } ) )

app.post( '/', checkAndRunDeploy )
app.get( '*', res => res.end( '' ) )

if( SSLKey && SSLCert )	{
  https.createServer( { key: SSLKey, cert: SSLCert }, app ).listen( config.port, () => console.log( 'Githook enabled with SSL' ) )
}	else {
  http.createServer( app ).listen( config.port, () => console.log( 'Githook enabled UNSECURE' ) )
}
