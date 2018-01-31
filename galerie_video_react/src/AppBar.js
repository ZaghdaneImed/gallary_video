import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import VideoLibraryIcon from 'material-ui/svg-icons/av/video-library';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ConfigDialog from './ConfigDialog'

const Menu = (props) => (
  <IconMenu
    {...props}
    iconButtonElement={
      <IconButton><MoreVertIcon color="white" /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Paramètres " onClick={() => { this.child.handleOpen()}} />
      <MenuItem primaryText="À propos " />
    </IconMenu>
  );

  const AppBarExampleIcon = () => (
    <div>
      <AppBar
        title="MBDS Galerie"
        iconElementLeft={<IconButton><VideoLibraryIcon /></IconButton>}
        iconElementRight={<Menu />}
      />
      <ConfigDialog ref={instance => { this.child = instance; }}/>
    </div>
  );

  export default AppBarExampleIcon;
