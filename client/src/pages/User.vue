<template>
  <div>
      <app-header/>
        <div v-if="user">
        <div class="user">
          <div class="banner">
            
          </div>
       <div class="content">
         <profile-picture :userImage="image" @update:photo="getUpdated"></profile-picture>
         
         
          <div class="user-info">
              <div v-if="user.verified == true">
                      <i class="fas fa-check-circle" style="color : blue">VERIFIED</i>
              </div>
              <h1>{{user.firstName}} {{user.lastName}}</h1>
        <h3>email</h3>
        <h3>{{user.email}}</h3>
        <h3>phone</h3>
        <h3>{{user.phone ? user.phone : "You haven't input your phone number"}}</h3>
         <div  v-if="user.verified == false"><a href="">Click here to verify your account</a></div>
   
          </div>
       </div>
        </div>

    </div> 
  </div>
</template>

<script>
import UserServices from '../../services/UserServices'
import AppHeader from '../components/AppHeader.vue'
import ProfilePicture from '../components/ProfilePicture.vue'
export default {
  components: { AppHeader, ProfilePicture },
    name: 'User',
    data() {
        return {
            user : {}
        }
    },
   async mounted() {
        this.user  = await UserServices.getUser()
    },
    methods: {
     async getUpdated(val){
       this.user = await UserServices.getUser()
       this.user = await UserServices.getUser()
      }
    },
    computed: {
      image: function() {
        const image = this.user.image ? 'http://localhost:8081/'+this.user.image : 'https://ui-avatars.com/api/?name='+ this.user.firstName+ '+' + this.user.lastName+'?format=png';

        return image
  },
},
}
</script>

<style>
.banner{
  background: url('https://picsum.photos/820/360');
  width: 100%;
  height: 360px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}



.content{
  height: fit-content;
}

.content .user-info{
 
  padding: 100px;
      -webkit-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    -moz-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
}

</style>