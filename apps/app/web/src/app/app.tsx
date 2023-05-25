import NxWelcome from './nx-welcome';
import { core } from '@metrikube/core';

export function App() {
  const a = core();

  return (
    <div>
      <NxWelcome title={a} />
    </div>
  );
}

export default App;
