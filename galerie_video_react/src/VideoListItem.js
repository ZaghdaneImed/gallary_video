import React from 'react';
import { videosRef } from './reference';
import VideoEdit from './VideoEdit';

import YouTube from 'react-youtube';
import {
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
  Media
} from 'react-md';
import { Rating } from 'material-ui-rating'


const style = { maxWidth: 510 };

export default class VideoListItem extends React.Component {


  handleChange = (value) => {
    const { key } = this.props.video;
    videosRef.child(key).update({ stars: value });
  };

  deleteVideo = () => {
    const { key } = this.props.video;
    videosRef.child(key).remove();
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  render() {
    const { video } = this.props;
    return (
      <div className="">
        <VideoEdit passedVal={video} ref={instance => { this.child = instance; }}/>
        <Card style={style} className="">
          <Media>
            <YouTube
              videoId={video.id}
              onReady={this._onReady}
            />
          </Media>
          <CardTitle
            title={video.title}
          />
          <CardActions expander>
            <Button flat onClick={() => { this.child.handleOpen()}}>Modifier</Button>
            <Button flat onClick={this.deleteVideo}>Supprimer</Button>
            <Rating
              value={video.stars}
              max={5}
              onChange={(value) => this.handleChange(value)}
            />
          </CardActions>
          <CardText expandable>
            <p>
              {video.description}
            </p>
          </CardText>
        </Card>
      </div>
    );
  }
}
