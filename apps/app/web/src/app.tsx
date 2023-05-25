import { useState, useEffect } from 'react';
import { GetPlugins } from "@metrikube/core"

interface Props {
  getPlugins: GetPlugins
}

export function App({ getPlugins }: Props) {
  const [plugins, setPlugins] = useState<{ id: string, name: string }[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPlugins.execute()
      setPlugins(result)

    }
    fetchData()
  }, [getPlugins])

  return (
    <div>
      <h1>Vite + React</h1>
      {
        plugins.map(plugin => (
          <div key={plugin.id} className="card">
            {plugin.name}
          </div>
        ))
      }
    </div>
  );
}

export default App;
