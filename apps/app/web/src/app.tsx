import { useState, useEffect } from 'react';
import { GetPlugins, GetPluginsUsecase } from "@metrikube/core"

interface Props {
  getPlugins?: GetPlugins
}


export function App({ getPlugins = new GetPluginsUsecase() }: Props) {
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
          <div className="card">
            {plugin.name}
          </div>
        ))
      }
    </div>
  );
}

export default App;
