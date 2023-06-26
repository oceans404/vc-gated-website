# This is a Verifiable Credential (VC) Gated Website


The code below still works as of June 2023, but for the best developer experience, **use my fullstack template instead** - [fullstack-polygon-id-vc-gated-dapp](https://github.com/oceans404/fullstack-polygon-id-vc-gated-dapp) - It includes both the server and frontend and is everything you need to set up a KYCAgeCredential VC gated dapp with Polygon ID.


-----

## Deprecated repo

(use above repo)

- Website: https://birthday-gated-website.on.fleek.co/
- In order to see the gated part of the website, you need a [KYCAgeCredential Verifiable Credential](https://www.notion.so/oceans404/How-to-get-a-KYCAgeCredential-Verifiable-Credential-f3d34e7c98ec4147b6b2fae79066c4f6?pvs=4) with a birthday after January 1, 2023, held in the Polygon ID Mobile wallet app.

<img width="1292" alt="Screenshot 2023-06-06 at 10 30 51 AM" src="https://github.com/oceans404/vc-gated-website/assets/91382964/53fe84f1-18ae-4050-9517-5e54ec1de982">

## How to run locally


#### 0. Follow Verifier server setup instructions

Read through the server readme and follow local server setup instructions: 
https://github.com/oceans404/vc-verifier#local-server-setup

#### 1. ⭐ Star this repo so you have it for future reference, then clone it and install dependencies

```bash
git clone https://github.com/oceans404/vc-gated-website
cd vc-gated-website
npm i
```

#### 2. Create a .env file by copying my sample

```bash
cp .env.sample .env;
```

Update the REACT_APP_VERIFICATION_SERVER_URL variable to your hosted server url from step 7: https://github.com/oceans404/vc-verifier#7-hosting-the-server-optional

Or, if you haven't hosted the server using Render, set REACT_APP_VERIFICATION_SERVER_URL="http://localhost:3000" because that's where the you are running the server locally. Don't set REACT_APP_VERIFICATION_SERVER_URL to your ngrok forwarding address or you'll face CORS errors.


#### 3. Start the frontend

```bash
npm start
```

Visit http://localhost:8080/


#### 4. Optional: host your website using Fleek

I've documented a similar hosting process here: https://github.com/oceans404/fullstack-sockets-demo#deploy-your-frontend


## Logic flow

This frontend interacts with my [verifier server](https://github.com/oceans404/vc-verifier) to
- Watch for events emitted by socket for the user's specific sessionId
  - frontend: https://github.com/oceans404/vc-gated-website/blob/main/src/PolygonIDVerifier.js#L48
  - backend:   
    - getAuthQr in progress https://github.com/oceans404/vc-verifier/blob/main/index.js#L63 
    - getAuthQr done: https://github.com/oceans404/vc-verifier/blob/main/index.js#L86
    - handleVerification in progress: https://github.com/oceans404/vc-verifier/blob/main/index.js#L100
    - handleVerification done: https://github.com/oceans404/vc-verifier/blob/main/index.js#L135
- Request the QR code containing the birthday query (zk request) for display
  - frontend fetch: https://github.com/oceans404/vc-gated-website/blob/main/src/PolygonIDVerifier.js#L62
  - backend getAuthQr: https://github.com/oceans404/vc-verifier/blob/main/index.js#L37
  - backend birthday query: https://github.com/oceans404/vc-verifier/blob/main/proofRequest.js
- Report verification result to the rest of the app: https://github.com/oceans404/vc-gated-website/blob/main/src/App.js#L39
