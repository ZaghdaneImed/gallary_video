import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyDnI-eLCtPSGpB5e4AngpeKTbWbyk59QcQ",
    authDomain: "vue-gallery-video.firebaseapp.com",
    databaseURL: "https://vue-gallery-video.firebaseio.com",
    projectId: "vue-gallery-video",
    storageBucket: "vue-gallery-video.appspot.com",
    messagingSenderId: "33403114559"

});
//let videoRef = db.ref('videos');
// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database();
