<template lang="">
    <div>
        
    </div>
</template>
<!-- <script setup>
// import { created } from 'vue'
(function () {
    console.log(this)
})()
</script> -->
<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({ location: { default: '/' } })
const router=useRouter()
router.replace(props.location)
// export default {
//     name: 'Redirect',
//     props: { location: '/' },
//     mounted() {
//         this.$router.replace(this.location)

//     }
// }
// </script>
<style scoped>
div {
    width: 0px;
    height: 0px;
}
</style>