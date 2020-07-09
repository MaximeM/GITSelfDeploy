# Ubuntu-NodeJS-Git-Auto-Deploy

Use an automated service to manage the auto deployment of nodeJS systems on Ubuntu based on Express and PM2

## Step 1

Create a new Server on your favorite hosting company (fasthosts.com?)

## Step 2

Generate an SSH Key for deployments on your server (after setting it up and securing it correctly)

```bash
ssh-keygen -t rsa -b 4096 -C "autodeploy@mydomain.com"
cat ~/.ssh/id_rsa.pub
```

## Step 3

Install SSH Key to GitHub by opening the link to your repository in Github.com, click on settings and then click on Deploy Keys and add the key from Step 2 to that list, you will have to enter your password to confirm in this step.
You do NOT need Write access on this Deployment Key to use this package, this system will only read from Github.

## Step 4

Setup a hostname

```bash
echo "mydomain.com" > /etc/hostname
```

## Step 5

Install Stack and auto deployer on server

```bash
apt update
apt -y upgrade
apt -y autoremove
apt install -y git mongodb nodejs npm certbot nginx python3-certbot-nginx
npm install -g pm2
pm2 startup
rm -rf /var/selfDeploy
mkdir /var/selfDeploy
cd /var/selfDeploy
git clone git@github.com:Encke/Ubuntu-NodeJS-Git-Auto-Deploy .
npm i
```

## Step 6

Install the repository and start it in pm2
Note: Please replace MYUSERNAMEINGITHUB with the Github User and MYREPOSITORYINGITHUB with the repository name

```bash
cd /var
rm -rf www/
mkdir www/
cd www/
git clone git@github.com:MYUSERNAMEINGITHUB/MYREPOSITORYINGITHUB .
npm i
pm2 start index.js
cd /var/selfDeploy
pm2 start selfDeploy.js
pm2 save
```

## Step 7

Setup webhook for updates by opening the repository link in Github.com and click on settings, then click on Webhooks and add "http://mydomain.com:3420/" to the list set to only POST and send the event.

## Step 8

Reboot to lock in the changes and be sure it all automatically starts up!

```bash
reboot
```

## Step 9 (Optional)

Install SSL for the webhook in your repository, if using letsencrypt you are almost done

```bash
echo "/etc/letsencrypt/live/mydomain.com" > /var/selfDeploySSLCert
```

# Your Repo is now ready for auto-deployments!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
