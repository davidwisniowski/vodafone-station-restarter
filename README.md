A restart script for the Vodafone Station. The script must run on a Linux environment with nodejs and can be stored in a cronjob.

## Configuration

Create an environment file in root directory (.env)

```
STATION_ADDRESS=http://192.168.0.1 (router address)
DEBUG=false (true/false)
PASSWORD=xxx (your password)
INTERNAL_BROWSER=true (true/false)
```

## Linux Installation
```
// install requirements (chromium, nodejs, npm)
apt install chromium-browser
apt install nodejs
apt install npm

// in project
npm install 
```

## Execute

```
// execute
node -r dotenv/config restart.js dotenv_config_path=.env