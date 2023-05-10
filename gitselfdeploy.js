const { execSync }	= require( 'child_process' )
const express				= require( 'express' )
const fs						= require( 'fs' )
const http					= require( 'http' )
const https					= require( 'https' )
const bodyParser    = require( 'body-parser' )

const config        = require( './config' )

const SSLKey = ( ( config.ssl && fs.existsSync( config.ssl + '/privkey.pem' ) )? fs.readFileSync( ( config.ssl + '/privkey.pem' ), 'utf8' ).trim(): null )
const SSLCert = ( ( config.ssl && fs.existsSync( config.ssl + '/fullchain.pem' ) )? fs.readFileSync( ( config.ssl + '/fullchain.pem' ), 'utf8' ).trim(): null )

const checkAndRunDeploy = ( req, res ) => {
 
  let requestData = null
  try	{
    requestData = JSON.parse( req.body.payload )
    console.log( 'Githook triggered ' + requestData)
  }	catch( e )	{}
  if( requestData && requestData.ref && ( requestData.ref == config.branch ) ) {
    try	{
      console.log( 'Githook running deploy' );
      console.log( execSync( 'git pull', { cwd: config.deployTo } ).toString(), execSync( 'npm i', { cwd: config.deployTo } ).toString(), execSync( ( 'pm2 reload ' + config.pm2ProcessIndex + ' --update-env' ), { cwd: config.deployTo } ).toString() )
    }	catch( e )	{
      console.log( e )
    }
  }
  res.end( '' )
}

const app	= express()

app.use( bodyParser.urlencoded( { extended: false } ) )

app.use( bodyParser.json() )

app.post( '/', checkAndRunDeploy )

app.get( '*', res => res.end( '' ) )

if( SSLKey && SSLCert )	{
  https.createServer( { key: SSLKey, cert: SSLCert }, app ).listen( config.port, () => console.log( 'Githook enabled with SSL' ) )
}	else {
  http.createServer( app ).listen( config.port, () => console.log( 'Githook enabled UNSECURE' ) )
}
