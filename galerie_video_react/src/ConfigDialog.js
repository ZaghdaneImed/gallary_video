import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

export default class ConfigDialog extends React.Component {
  state = {
    apiKey: '',
    open: false,
  };
  componentDidMount = () => {
    console.log(localStorage.getItem('apiKey'));
    if (localStorage.getItem('apiKey') == null) {
      this.handleOpen()
    }
    this.setState({
      apiKey: localStorage.getItem('apiKey')
    })
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('apiKey', this.state.apiKey);
    this.handleClose();
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    if (localStorage.getItem('apiKey') == null) {
      this.handleOpen()
    }
  };

  render() {
    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Enregistrer"
        primary={true}
        keyboardFocused={true}
        type="submit"
        form="form_conf"
      />,
    ];

    return (
      <div>
        <Dialog
          title="Paramètres"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Cette clé vous permet d'utiliser l'Api YouTube pour pouvoir recuperer les info sur vos videos
          <br/>
          Pour avoir une cliquer <a target="_blank" rel="noopener noreferrer" href="https://console.developers.google.com/apis/credentials">ici</a>
          <br/>
          <form id="form_conf" onSubmit={this.handleSubmit}>
          <TextField
            hintText="Entrez votre clé"
            floatingLabelText="Clé Api YouTube"
            fullWidth
            name='apiKey'
            value={this.state.apiKey}
            onChange={this.handleChange}
            required
          />
        </form>
        </Dialog>
      </div>
    );
  }
}
