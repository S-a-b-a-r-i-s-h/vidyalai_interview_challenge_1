import React from 'react';
// import { WindowWidthProvider } from '../components/hooks/useWindowWidth';
import { WindowWidthProvider } from '../components/hooks/WindowWidthContext';
const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  </WindowWidthProvider>  
  
);

export default App;
