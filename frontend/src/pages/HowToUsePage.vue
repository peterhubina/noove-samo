<template>
  <div class="grid grid-rows-[auto_1fr] pt-10 px-11">
    <h2 class="text-3xl font-medium">How to use</h2>
    <div class="content-center justify-self-center p-11">
      <VideoTutorial/>
    </div>
  </div>
</template>

<script>
import VideoTutorial from 'components/VideoTutorial.vue';

export default {
  name: 'HowToUsePage',
  components: {VideoTutorial},
}

</script>
