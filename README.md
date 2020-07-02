# Ubuntu-NodeJS-Git-Auto-Deploy
Automatically Deploy versions from GITHUB
PM2 Based NodeJS System to enable auto deployments even if the main repo has errors running

Step 1: Create a new Server
Step 2: Generate an SSH Key
  #ssh-keygen -t rsa -b 4096 -C "selfdeploy@mydomain.com" ; cat ~/.ssh/id_rsa.pub
Step 3: Install SSH Key to GitHub
  open your repository link and click on settings, then Deploy Keys and add the key from Step 2 to that list.
Step 4: Setup a hostname (and install NGINX server host configuration)
  #echo "newserver.com" > /etc/hostname
Step 5: Install Stack and auto deployer on server
  #apt update ; apt -y upgrade ; apt -y autoremove ; apt install -y git mongodb nodejs npm certbot nginx python3-certbot-nginx ; npm install -g pm2 ; pm2 startup; rm -rf /var/selfDeploy ; mkdir /var/selfDeploy ; cd /var/selfDeploy ; git clone git@github.com:Encke/Ubuntu-NodeJS-Git-Auto-Deploy . ; npm i
Step 6: Install your repository
  #cd /var ; rm -rf www/ ; mkdir www/ ; cd www/ ; git clone git@github.com:MYUSERNAMEINGITHUB/MYREPOSITORYINGITHUB . ; npm i ; pm2 start index.js ; cd /var/selfDeploy ; pm2 start index.js ; pm2 save
Step 7: Setup webhook for updates
  open your repository link and click on settings, then Webhooks and add "http://IPOFTHESERVER:3420/" to the list set to only POST and send the event.
Step 8: Reboot
  #reboot

Your Repo is now ready for auto-deployments!

#Note ... to install SSL in your repo, please place the let's encrypt base path for the certificate in the file
  /var/selfDeploySSLCert
the content should be only the path with no extra spaces
    /etc/letsencrypt/live/mywebsite.com
