<template>
    <div class="navbar">
        <div >
            <router-link to="/"><img src="@/assets/logo2.png" alt="" class="brand"></router-link>
        </div>
        <div class="nav-item">
           <router-link to="/register"><app-button class="btn-navbar fas fa-user-plus"> Sign Up </app-button></router-link>
           <router-link to="/login"> <app-button class="btn-navbar fas fa-sign-in-alt" > Login   </app-button></router-link>
        </div>
    </div>
</template>

<script>
import AppButton from "./AppButton.vue";

export default {
    name: 'AppHeader',
    components:{
        AppButton
    }
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