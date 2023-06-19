import { useQuery } from '@tanstack/react-query';
import { GetPlugins } from "@metrikube/core"
import { Switch } from './components/atoms/Switch';

interface Props {
  getPlugins: GetPlugins
}

export function App({ getPlugins }: Props) {
  const { isLoading, isSuccess, data: plugins } = useQuery({
    queryKey: ['plugins'],
    queryFn: async () => getPlugins.execute()
  })

  if (isLoading) return (
    <div>Loading...</div>
  )

  return (
    <div>
      <h1>Vite + React</h1>
      <Switch/>
      {
        isSuccess && plugins.map(plugin => (
          <div key={plugin.id} className="card">
            {plugin.name}
          </div>
        ))
      }
    </div>
  );
}

export default App;
