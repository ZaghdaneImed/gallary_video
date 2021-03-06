import React from 'react';
import { videosRef } from './reference';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

const style = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

export default class VideoInput extends React.Component {
  state = {
    url: '',
    id: '',
    title: '',
    description: '',
    stars: 0,
    open: false,
    error: '',
    apiKey:''
  };

  checker = (id, callback) => {
    var result;
    this.setState({
      error: ''
    })
    fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + id + "&key=" + this.state.apiKey)
    .then(resp => resp.json())
    .then((resp) => {
      if (typeof resp.items !== 'undefined') {
        if (resp.items.length > 0) {
          result = resp.items[0].snippet;
          callback (result)
        }
        else {
          this.setState({
            error: 'ce lien est invalide'
          })
          callback (-1)
        }
      }
      if (typeof resp.error !== 'undefined') {
        if (resp.error.errors[0].reason === 'keyInvalid') {
          this.setState({
            error: "la clé de l'api YouTube que vous utilisez n'est pas valide"
          })
          callback (-1)
        }
      }
    })
    .catch((error) => {
      console.log(error);
      callback (-1)
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.checker(this.state.id, (result) => {
      if (result !== -1) {
        const newVideo = {
          id: this.state.id,
          title: this.state.title,
          description: this.state.description,
          stars: 0,
        };
        if (newVideo.id.length) {
          videosRef.push(newVideo);
          this.handleClose()
        }
      }
    })
  };

  getInfoFromYoutubeAPI = () => {
    if (this.state.id === '') {
      this.setState({
        error: 'veuillez indiquer le lien vers le video afin de récupérer les infos depuis YouTube'
      })
    }
    else {
      this.checker(this.state.id, (result) => {
        if (result !== -1) {
          this.setState({
            title: result.title,
            description: result.description,
          })
        }
      })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === 'url') {
      this.setState({
        id: this.getIdFromUrl(event.target.value)
      })
    }
  };

  handleOpen = () => {
    this.setState({open: true});
    this.updateApiKey();
  };

  handleClose = () => {
    this.setState({
      open: false,
      url: '',
      id: '',
      title: '',
      description: '',
      stars: 0,
      error: ''
    });
  };

  updateApiKey = () => {
    this.setState({
      apiKey: localStorage.getItem('apiKey')
    })
  }

  getIdFromUrl = (url) => {
    if (url !== '') {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      return (match&&match[7].length===11)? match[7] : ':(';
    }
    return '';
  }

  render() {
    const actions = [
      <FlatButton
        label="Fermer"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Ajouter"
        primary={true}
        keyboardFocused={true}
        type="submit"
        form="form_add"
      />,
    ];
    return (
      <div>
        <FloatingActionButton style={style} onClick={this.handleOpen} >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Ajout de video"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
            <form id="form_add" onSubmit={this.handleSubmit}>
              <TextField
                hintText="Entrez le lien vers le video"
                floatingLabelText="Lien"
                onChange={this.handleChange}
                value={this.state.url}
                name='url'
                fullWidth
                required
                errorText={this.state.error}
              />
              <br/>
              <br/>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <FlatButton
                  labelPosition="before"
                  label="Récupérer les infos depuis YouTube"
                  style={{color: '#FF0000'}}
                  icon={<FontIcon className="fa fa-youtube-play" />}
                  onClick={this.getInfoFromYoutubeAPI}
                />
              </div>
              <br/>
              <TextField
                hintText="Entrez le titre de video"
                floatingLabelText="Titre"
                onChange={this.handleChange}
                value={this.state.title}
                name='title'
                fullWidth
                required
              />
              <br/>
              <TextField
                hintText="Entrez la description de video"
                floatingLabelText="description"
                multiLine={true}
                rows={1}
                onChange={this.handleChange}
                value={this.state.description}
                name='description'
                fullWidth
                required
              />
            </form>
          </Dialog>
        </div>
      );
    }
  }
