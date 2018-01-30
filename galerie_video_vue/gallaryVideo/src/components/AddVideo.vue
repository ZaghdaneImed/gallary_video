<template>
<div class="panel panel-default">
  <div class="panel-heading" >
    <h3 style="font-weight: bold;">Add Video</h3>
  </div>
  <div class="panel-body">
    <form id="form" class="form-inline" v-on:submit.prevent="addVideo">
      <div class="form-group" style="width: 347px;">
        <label for="videoTitle" style="width: 108px;font-size: 20px;text-align: left;">Title</label>
        <input type="text" id="videoTitle" ref="title" class="form-control" v-model="newVideo.title" style="width: 235px;">
      </div>
      <div class="form-group" style="width: 460px;">
        <label for="videoUrl" style="width: 55px;font-size: 20px;">Url</label>
        <input type="text" id="videoUrl" class="form-control" v-model="newVideo.url" style="width: 363px;">
      </div>
      <br><br>
      <div class="form-group" style="width: 800px;margin-left: 70px;">
        <label for="videoDescription" style="font-size: 20px;">Description</label>
        <textarea id="videoDescription" ref="description" class="form-control" v-model="newVideo.description" style="width: 680px;"/>
      </div>
      <input type="submit" class="btn btn-primary" value="Add Video">
    </form>
  </div>
</div>
</template>

<script>
import {db} from '../firebase';
import toastr from 'toastr';
let videoRef = db.ref('videos');

export default {
  data(){
    return{
      newVideo:{
        title:'',
        description:'',
        url:'',
        rating:0
      }
    }
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
    addVideo:function(){
      if(this.newVideo.title ===''){
        toastr.error('video title is empty');
        this.$refs.title.focus()
      }else{
        if(this.newVideo.description ===''){
          toastr.error('video description is empty');
          this.$refs.description.focus()
        }else{
          videoRef.push(this.newVideo);
          toastr.success('video added successfully');
          this.newVideo.title = '';
          this.newVideo.url = '';
          this.newVideo.description = '';
          this.newVideo.rating = 0;
        }
      }
    }
  }
}
</script>
