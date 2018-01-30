<template>
    <div>
            <video src="video.sources.src"></video>
    </div>
</template>

<script>

export default {
    data () {
        return {
            video: {
                sources: [{
                    src: 'https://www.youtube.com/watch?v=tVKaN_H35xs',
                    type: 'video/mp4'
                }],
                options: {
                    autoplay: true,
                    volume: 0.6,
                    poster: 'http://covteam.u.qiniudn.com/poster.png'
                }
            }
        }
    },

}
</script>
