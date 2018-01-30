<template>
<div class="panel panel-default" style="float:left;width:100%">
  <div class="panel-heading">
    <h3>List Video</h3>
  </div>
  <div class="panel-body">
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
        <tr v-for="video in Videos">
          <td>
            <star-rating  @rating-selected ="setRating($event, video)" v-bind:increment="0.5" :rating="video.rating" v-bind:max-rating="5" inactive-color="#000" active-color="#cc1166" v-bind:star-size="30">
            </star-rating>
            <br>
          <img :src="video.url.replace('https://www.youtube.com/watch?v=', 'https://img.youtube.com/vi/') + '/hq1.jpg'"  @click="showVideo(video)" width="320" height="200" style="cursor: pointer" frameborder="0">
            <br>
            {{video.title}}

          </td>
          <td>

            <span class="glyphicon glyphicon-trash" v-on:click="removeVideo(video)"></span>
          </td>
        </tr>
      </tbody>
    </table>
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
    removeVideo:function(video){
      videoRef.child(video['.key']).remove();
      toastr.success('video removed successfully');
    },
    setRating: function(rating,video){
      this.rating= rating;
      videoRef.child(video['.key']).update({rating:this.rating});
      console.log(this.rating);
    },

    showVideo:function(video){
    console.log("showed");
        var self = this;
          self.$nextTick()
            .then(function () {
            self.VideoStore.showVal = video;
            self.$forceUpdate();
            console.log(self.VideoStore.showVal);
          });

    }
  }
}
</script>
