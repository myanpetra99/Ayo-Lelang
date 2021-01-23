<template>
    <div class="navbar">
        <div >
            <router-link to="/"><img src="@/assets/logo2.png" alt="" class="brand"></router-link>
        </div>
        <div class="nav-item">
            <div v-if="verify">
                 <span>  <router-link to="/user"><header-button class="btn-navbar"><span class="fas fa-user"></span> My Profile </header-button></router-link></span>
                  <div class="dropdown">
                    <header-button class="btn-navbar"><span class="fas fa-caret-down"></span></header-button>
                <div class="dropdown-content">
                 <div class="dropdown-item"><p><span class="fas fa-history"></span>History</p></div>
        
                 <div class="dropdown-item"> <p><span class="fas fa-cog"></span>Settings</p></div>
                   <hr>
                 <div class="dropdown-item" @click="logout"> <p><span class="fa fa-sign-out-alt" ></span>Logout</p></div>
                </div>
                </div>
            </div>
         <div v-else>
               <router-link to="/register"><header-button class="btn-navbar"><span class="fas fa-user-plus"></span> Sign Up </header-button></router-link>
           <router-link to="/login"> <header-button class="btn-navbar"> <span class="fas fa-sign-in-alt"></span> Sign In  </header-button></router-link>
         </div>
        </div>
    </div>
</template>

<script>
import AuthServices from '../../services/AuthServices';
import HeaderButton from './HeaderButton.vue';


export default {
    name: 'AppHeader',
    components:{
        HeaderButton
    
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
             this.$router.push({ name : 'Login'})
        }
    },
}
</script>

<style  scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
 
    .navbar{
    
    width: 100vw;
    background-color: rgb(255, 255, 255);
    display: flex;
    padding: 10px 10px 10px 10px;
    align-items: center;
    -webkit-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    -moz-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
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
        font-family: 'Roboto', sans-serif;
        padding: 5px 5px 5px 5px;
        margin-right: 10px;
    }
    .dropdown {
     position: relative;
     display: inline-block;
}

.dropdown-content {
  right: 0;
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
 
}

.dropdown-content .dropdown-item{
    padding: 2px 1em 2px 1em;
     border-radius: 99999px;
}
.dropdown-content .dropdown-item:hover{
    background-color: #F2F2F2;
    cursor: pointer;
}

.dopdown-item p span{
    right: 0;
}

.dropdown:hover .dropdown-content {
  display: block;
}

    
</style>