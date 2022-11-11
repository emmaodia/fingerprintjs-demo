# FingerPrintJS-DEMO

This DEMO was built using ReactJS, ExpressJS, NodeJS and an SQLite DB.

To run the project, open 2 separate terminals, one will be for running the `UI` and the second for running the `server`.

<br>
First install the project dependencies using: `npm install`

<br>
To run the UI, use the command: `npm start`
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<br>
To run the server, use the command: `nodemon server/server.js`
Open [http://localhost:5000](http://localhost:5000) to view it in your browser or using the Postman App.

<hr />
The DEMO is separated into the `UI` and the `SERVER` directories.
<hr />

## UI

The UI contains the `signup` and `login` pages with the `fingerprintjs` implemented for the signup. According to the FPJS docs:

> _Wrap your application (or component) in FpjsProvider_

The entire ReactDOM is wrapped using FPJS. Open the `index.js`, you will find the `FpjsProvider` import.

```
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";
```

The React App is wrapped using the FpjsProvider, specifying your API KEY.

```
<FpjsProvider
    cacheLocation="memory"
    loadOptions={{
      apiKey: process.env.REACT_FPJS_KEY,
    // region: "eu",
 }}
>
  ...
</FpjsProvider>
```

The FpjsProvider is used to get the unique `visitorID` which is then parsed to the server via the signup form. The visitorID is used to check for the user authenticating to the App.
