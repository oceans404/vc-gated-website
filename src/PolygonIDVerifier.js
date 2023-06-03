function PolygonIDVerifier({ onVerified }) {
  return (
    <div>
      <button onClick={() => onVerified(true)}>Prove access rights</button>
    </div>
  );
}

export default PolygonIDVerifier;
