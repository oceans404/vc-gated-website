function VcGatedContent({ revokeAccess }) {
  return (
    <div>
      <>This is the super secret VC gated content!</>
      <button onClick={() => revokeAccess()}>Revoke access</button>
    </div>
  );
}

export default VcGatedContent;
