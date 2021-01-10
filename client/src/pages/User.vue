<template>
  <div>
      <app-header/>
        <div v-if="user">
        <h1>This is user page</h1>
        <h1>first name : {{user.firstName}}</h1>
        <h1>last name  : {{user.lastName}}</h1>
        <h1>email is : {{user.email}}</h1>
    </div> 
  </div>
</template>

<script>
import UserServices from '../../services/UserServices'
import AppHeader from '../components/AppHeader.vue'
export default {
  components: { AppHeader },
    
    name: 'User',
    data() {
        return {
            user : {}
        }
    },
   async mounted() {
        this.user  = await UserServices.getUser()
    },
}
</script>

<style>

</style>