import { GetPlugins } from "@metrikube/core"
import Dashboard from "./pages/Dashboard";

export function App() {
  // const { isLoading, isSuccess, data: plugins } = useQuery({
  //   queryKey: ['plugins'],
  //   queryFn: async () => getPlugins.execute()
  // })

  return (
    <Dashboard />
  );
}

export default App;
