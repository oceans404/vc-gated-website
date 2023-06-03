import "./App.css";
import { useState } from "react";
import PolygonIDVerifier from "./PolygonIDVerifier";
import VcGatedContent from "./VcGatedContent";

function App() {
  const [provedAccessBirthday, setProvedAccessBirthday] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        {provedAccessBirthday ? (
          <VcGatedContent revokeAccess={() => setProvedAccessBirthday(false)} />
        ) : (
          <>
            <h1>🙈</h1>
            <h2>Viewers must have a birthday before 2023</h2>
            <p>
              This website is VC{" "}
              <a href="https://0xpolygonid.github.io/tutorials/#core-concepts-of-polygon-id-verifiable-credentials-identity-holder-issuer-and-verifier-triangle-of-trust">
                (Verifiable Credential)
              </a>{" "}
              gated.
            </p>
            <PolygonIDVerifier onVerified={setProvedAccessBirthday} />
          </>
        )}
      </header>
    </div>
  );
}

export default App;
