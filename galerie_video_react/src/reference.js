import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAJnfwej0jBZeoSX7sdE5s-BfYJZMwSiMs",
  authDomain: "helloworld-fcb42.firebaseapp.com",
  databaseURL: "https://helloworld-fcb42.firebaseio.com",
};
firebase.initializeApp(config);

const rootRef = firebase.database().ref();
export const videosRef = rootRef.child('videos');
