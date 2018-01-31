import React from 'react';
import VideoInput from './VideoInput';
import VideoList from './VideoList';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './AppBar'

const App = () => (
  <div className="App">
    <MuiThemeProvider>
      <div>
        <AppBar/>
        <div className="Content">
          <VideoInput />
          <VideoList />
        </div>
      </div>
    </MuiThemeProvider>
  </div>
);

export default App;
