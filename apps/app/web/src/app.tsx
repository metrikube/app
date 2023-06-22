import { useQuery } from '@tanstack/react-query';
import { GetPlugins } from "@metrikube/core"
import { Switch } from './components/atoms/Switch';
import Sidebar from './components/organisms/Sidebar';

interface Props {
  getPlugins: GetPlugins
}

export function App({ getPlugins }: Props) {
  // const { isLoading, isSuccess, data: plugins } = useQuery({
  //   queryKey: ['plugins'],
  //   queryFn: async () => getPlugins.execute()
  // })

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default App;
