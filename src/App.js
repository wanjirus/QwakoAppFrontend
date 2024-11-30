import React from 'react';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router';
import { ThemeProvider } from '@material-ui/core/styles';
import GlobalStyles from './GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import routes from './routes';
import { ApiProvider } from './REST-API/api';
import { AuthProvider } from './REST-API/auth';
import config from './REST-API/config';
// import { GenderProvider } from './desc/gender/GenderProvider';
import { GlobalProvider } from './desc/GlobalContext';
import { PropertiesProvider } from './desc/PropertiesContext';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ApiProvider config={config.api}>
        {/* {routing} */}
        <AuthProvider>
          <GlobalProvider>
          <PropertiesProvider>
          {routing}
          </PropertiesProvider>
          </GlobalProvider>
        </AuthProvider>
      </ApiProvider>
    </ThemeProvider>
  );
};

export default App;
 
