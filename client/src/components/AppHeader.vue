<template>
    <div class="navbar">
        <div >
            <router-link to="/"><img src="@/assets/logo2.png" alt="" class="brand"></router-link>
        </div>
        <div class="nav-item">
            <div v-if="verify">
             <app-button class="btn-navbar fas fa-sign-out-alt" @click.native="logout"> Logout </app-button>
            </div>
         <div v-else>
               <router-link to="/register"><app-button class="btn-navbar fas fa-user-plus"> Sign Up </app-button></router-link>
           <router-link to="/login"> <app-button class="btn-navbar fas fa-sign-in-alt" > Login   </app-button></router-link>
         </div>
        </div>
    </div>
</template>

<script>
import AuthServices from '../../services/AuthServices';
import AppButton from "./AppButton.vue";

export default {
    name: 'AppHeader',
    components:{
        AppButton
    },
    computed: {
        verify(){
            return this.$store.getters.getAuth
        }
    },
    methods: {
        async logout(){
            await AuthServices.logout()
             this.$cookies.remove('TOKEN')
             this.$store.dispatch('setAuth')
             this.$route.replace('/')
        }
    },
}
</script>

<style  scoped>

 
    .navbar{
    width: 100vw;
    background-color: rgb(255, 255, 255);
    display: flex;
    padding: 10px 10px 10px 10px;
    align-items: center;
    border-bottom: 1px solid black;
    }

    .brand{
        max-width: 200px;
        max-height: 50px;
    }

    .nav-item{
    display: flex;
    position: absolute;
    right: 0;
    }

    .btn-navbar{
        padding: 5px 5px 5px 5px;
        margin-right: 10px;
    }

    
</style>