www.mychef.io

# screenshots

![screenshot](screenshots/1.png)

![screenshot hebrew interface](screenshots/2.png)

![screenshot 3](screenshots/3.png)

![screenshot 4](screenshots/4.png)

![screenshot 5](screenshots/5.png)

![screenshot 6](screenshots/6.png)


# Development instructions
## Installation
```bash
cd web-frontend
npm i
cd ../backend/
npm i
```

## Running (after code changes)
```bash
cd web-frontend
npm run build
cp -R ./build/ ../backend/public/
cd ../backend/
npm start
```

## Deployment to Google App Engine
```bash
gcloud app deploy
```
