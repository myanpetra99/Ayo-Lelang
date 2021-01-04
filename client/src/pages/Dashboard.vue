<template>
    <div>
       <app-header/>
       <div class="content">
           <create-form/>
       </div>
    </div>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'
import CreateForm from '../components/CreateForm.vue'
export default {
  components: { AppHeader, CreateForm },
    name: 'Dashboard',
}
</script>

<style scoped>
    .content{
        display: flex;
        justify-content: center;
    }
</style>