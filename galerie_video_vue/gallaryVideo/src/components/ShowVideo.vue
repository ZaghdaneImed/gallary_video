<template>
<div class="panel panel-default" style="float:left;width:64%;margin-right: 10px;">
  <div class="panel-heading">
    <h3 style="font-weight: bold;">Video</h3>
  </div>
  <div class="panel-body">
    <template  v-if="this.VideoStore.showVal != null">
      <star-rating  @rating-selected ="setRating($event, VideoStore.showVal)" v-bind:increment="0.5" :rating="VideoStore.showVal.rating" v-bind:max-rating="5" inactive-color="#000" active-color="#cc1166" v-bind:star-size="30">
      </star-rating>
      <br>
      <iframe :src="this.VideoStore.showVal.url.replace('watch?v=', 'embed/')" width="520" height="400" frameborder="0"></iframe>
      <div  v-if="this.VideoStore.editVideo != null">
      <table class="table table-striped">
      <thead>
        <tr>
          <th>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
        <label>Title</label>

        </td>
        <td>
        <input v-model="VideoStore.showVal.title" class="form-control"/>

        <td/>
        </tr>
        <tr>
        <td>
        <label>Description</label>
        </td>
        <td>
        <textarea v-model="VideoStore.showVal.description" class="form-control"/>
        </td>
        </tr>
        </tbody>
        </table>
        <button v-on:click="updateVideo(VideoStore.showVal)" class="btn btn-primary"> Save </button>

      </div>
      <div v-else>
        {{this.VideoStore.showVal.title}}
        <br>
        {{this.VideoStore.showVal.description}}
        <br>
      <span class="glyphicon glyphicon-edit" v-on:click="editVideoo(VideoStore.showVal)" style="float: right;"></span>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import {db} from '../firebase';
import VideoStore from '../stores/VideoStore';
import toastr from 'toastr';
import StarRating from 'vue-star-rating';
let videoRef = db.ref('videos');

export default {
  data: {
    rating: 0
  },
  data() {
    return {
      VideoStore: VideoStore.data
    }
  },
  components: {
      StarRating
    },
  firebase: {
    Videos: {
      source: db.ref('videos'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  methods:{
  editVideoo:function(video){
  var self = this;
    self.VideoStore.editVideo = video;
    self.$forceUpdate();
  },
  setRating: function(rating,video){
    this.rating= rating;
    videoRef.child(video['.key']).update({rating:this.rating});
    console.log(this.rating);
  },
  updateVideo:function(video){
       console.log(video.title);
        videoRef.child(video['.key']).update({title:video.title});
        videoRef.child(video['.key']).update({description:video.description});
        toastr.success('video updated successfully');
        var self = this;
          self.VideoStore.editVideo = null;
          self.$forceUpdate();
  }
  }
}
</script>
