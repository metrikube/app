import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app';
import { GetPluginsUsecase } from "@metrikube/core"
import { PluginAdapterImpl } from '@metrikube/infrastructure';
import { axiosInstance } from './config/axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const pluginAdapter = new PluginAdapterImpl(axiosInstance)
const getPluginsUsecase = new GetPluginsUsecase(pluginAdapter)


root.render(
  <StrictMode>
    <App getPlugins={getPluginsUsecase} />
  </StrictMode>
);
