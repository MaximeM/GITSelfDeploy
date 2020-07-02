const NK = require( "nk-node" );

let sslForDeploy = ( NK.files.exists( "/var/selfDeploySSLCert" )? NK.files.read( "/var/selfDeploySSLCert" ).trim(): null );

NK.selfDeploy( sslForDeploy, "/var/www/", 0, () => {} );
