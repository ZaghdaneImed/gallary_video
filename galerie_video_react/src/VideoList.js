import React from 'react';
import VideoListItem from './VideoListItem';
import { videosRef } from './reference';
import CircularProgress from 'material-ui/CircularProgress';
import {GridList} from 'material-ui/GridList';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: '85%',
    height: '100%',
    overflowY: 'auto',
  },
  gridItem: {
    margin: '5%'
  },
};

export default class VideoList extends React.Component {
  state = {
    videos: [],
    videosLoading: true
  };

  componentDidMount() {
    videosRef.on('value', snap => {
      const videos = [];
      snap.forEach(shot => {
        videos.push({ ...shot.val(), key: shot.key });
      });
      this.setState({ videos, videosLoading: false });
    });
  }

  render() {
    const { videos, videosLoading } = this.state;

    let videoList;
    if (videosLoading) {
      videoList = <div className="VideoList-empty"><CircularProgress size={120} thickness={5} /></div>;
    } else if (videos.length) {
      videoList = (
        <div style={styles.root}>
          <GridList
            cellHeight='100%'
            style={styles.gridList} >
            {videos.map(video => (
              <div style={styles.gridItem}>
                <VideoListItem key={video.key} video={video} />
              </div>
            ))}
          </GridList>
        </div>
      );
    } else {
      videoList = <div className="VideoList-empty">Pas de video</div>;
    }
    return videoList;
  }
}
