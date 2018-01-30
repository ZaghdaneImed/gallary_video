<template>
  <div id="app" class="container" style="width: 100%;background: #333;">
    <div class="page-header" style="background: whitesmoke;height: 100px;width: 103%;padding: 10px;margin-top: 2px;margin-left: -15px;">
      <img src="./assets/youtube.png"  width="60" height="60" style="cursor: pointer;float: left;margin-top: 10px;">
      <h1 style="font-weight: bold;margin-left: 10px;float:left">MBDS Gallery Video</h1>
    </div>

    <AddVideo/>
    <div  v-if="this.VideoStore.showVal != null">
      <ShowVideo/>
      <ListVideo/>
    </div>
    <div  v-if="this.VideoStore.showVal == null">
        <ListVideoHome/>
    </div>



</div>

</template>

<script>


import toastr from 'toastr'

import ShowVideo from './components/ShowVideo'
import AddVideo from './components/AddVideo'
import Footer from './components/Footer'
import ListVideo from './components/ListVideo'
import ListVideoHome from './components/ListVideoHome'
import {db} from './firebase';
import VideoStore from './stores/VideoStore';

let videoRef = db.ref('videos');

export default {
  name: 'app',
  components: {
      Footer,
      ListVideo,
      ListVideoHome,
      AddVideo,
      ShowVideo
  },
  data() {
    return {
      VideoStore: VideoStore.data
    }
  },

  methods:{

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
