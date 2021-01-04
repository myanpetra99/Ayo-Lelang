<template>
    <div>
       <app-header/>
       <div class="content">
           <login-card/>
       </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import LoginCard from '../components/LoginCard.vue'
export default {
  components: { AppHeader, LoginCard },
    name: 'login',
    mounted() {
         if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
    },
}
</script>

<style scoped>
    .content{
        display: flex;
        justify-content: center;
    }
</style>