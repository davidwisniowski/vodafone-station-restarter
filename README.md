## Configuration

Create an environment file in root directory (.env)

```
MS_EMAIL=xxx
MS_PASSWORD=xxx
MS_INTERNAL_BROWSER=1 (or null/empty)
```

## Installation
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