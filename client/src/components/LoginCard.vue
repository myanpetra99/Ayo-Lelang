<template>
    <div id="loginCard">
       <div class="header">
            <h1>Welcome </h1>
       </div>
       <form action="">
             <div class="field">
    <input type="email" name="email" id="email" placeholder="jane.appleseed@example.com" v-model="email">
    <label for="email">Email</label>
        </div>
        <div class="field">
    <input type="password" name="password" id="password" v-model="password">
    <label for="password">Password</label>
        </div>
        <app-button class="login-btn">Login</app-button>
       
        </form>
       
        <h2>or</h2>
<div class="google-signin">
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
</div>
    </div>
</template>

<script>
import PostServices from '../../services/PostServices';
import AppButton from './AppButton.vue'
export default {
  components: { AppButton },
    name: 'LoginCard',
    data() {
      return {
        email : '',
        password : ''
      }
    },
    methods: {
       login : async function(){
         let userData = {};
          userData.email = this.email;
          userData.password = this.password
          await PostServices.login(userData).then(this.$router.go('/'))
       }
    },
}
</script>

<style scoped>
#loginCard{
    min-width: 500px;
    max-width: 500px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    border-radius: 20px;
    justify-content: center;
}

.login-btn{
    width: 100% !important;
}
.header{
    background-color: black;
      border-radius: 20px;
}

.header h1{
    color: white;
}

form {
  margin: 2em 0;
  padding: 1em 2em 0 2em;
}
/**
* Make the field a flex-container, reverse the order so label is on top.
*/
 
.field {
  display: flex;
  flex-flow: column-reverse;
  margin-bottom: 1em;
}
/**
* Add a transition to the label and input.
* I'm not even sure that touch-action: manipulation works on
* inputs, but hey, it's new and cool and could remove the 
* pesky delay.
*/
label, input {
  transition: all 0.2s;
  touch-action: manipulation;
}

input {
  font-size: 1.5em;
  border: 0;
  border-bottom: 1px solid #ccc;
  font-family: inherit;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  cursor: text;
  
}

input:focus {
  outline: 0;
  border-bottom: 1px solid #666;
}

label {
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
/**
* Translate down and scale the label up to cover the placeholder,
* when following an input (with placeholder-shown support).
* Also make sure the label is only on one row, at max 2/3rds of the
* field—to make sure it scales properly and doesn't wrap.
*/
input:placeholder-shown + label {
  cursor: text;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform-origin: left bottom;

}
/**
* By default, the placeholder should be transparent. Also, it should 
* inherit the transition.
*/
::-webkit-input-placeholder {
  opacity: 0;
  transition: inherit;
}
/**
* Show the placeholder when the input is focused.
*/
input:focus::-webkit-input-placeholder {
  opacity: 1;
}
/**
* When the element is focused, remove the label transform.
* Also, do this when the placeholder is _not_ shown, i.e. when 
* there's something in the input at all.
*/
input:not(:placeholder-shown) + label,
input:focus + label {
  transform: translate(0, 0) scale(1);
  cursor: pointer;
}

.google-signin{
    padding: 1em 0 2em 0;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: whitesmoke;
}

</style>