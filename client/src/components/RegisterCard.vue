<template>
    <div id="loginCard">
       <div class="header">
             <router-link to="/"><img src="@/assets/logo2.png" alt="" class="brand"></router-link>
             <h3>register</h3>
       </div>

           <div class="field">
    <input  class="input" type="text" name="firstName" id="firstName" v-model="firstname" placeholder="first name" required>
    <label for="firstName">first name</label>
        </div>
          <div class="field">
    <input class="input" type="text" name="lastName" id="lastName" v-model="lastname" placeholder="last name" required>
    <label for="lastName">last name</label>
        </div>
        <div class="field">
    <input class="input" type="email" name="email" id="email" v-model="email" placeholder="e.g abc@yourmail.com" required>
    <label for="email">Email</label>
        </div>
            <div class="field">
    <input class="input" type="password" name="password1" id="password1" v-model="password1" @keyup ="validate" @focus="showValidation"  @blur="hideValidation" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required>
    <label for="password1">Password</label>
        </div>
              <div class="field">
    <input class="input" type="password" name="password2" id="password2" @keyup ="validate" @focus="showValidation" v-model="password2" @blur="hideValidation">
    <label for="password2">re-type password</label>
        </div>
        <div>
          <p v-if="!match && show==true" class="danger">Password do not match</p>
          <p v-if="match && show==true" class="success">Password match!</p>
        </div>
        <input type="checkbox" name="tos" id="tos" required>
        <label for="tos">I have read and agreed with the <u>terms and conditions.</u></label>
        
        <app-button @click.native="register" class="login-btn">Register</app-button>
       
       
        <h2>or</h2>
<div class="google-signin">
      <div class="g-signin2" data-onsuccess="onSignIn"></div>
</div>
    </div>
</template>

<script>
import postServices from '../../services/PostServices'
import AppButton from './AppButton.vue'
export default {
  components: { AppButton },
  data() {
      return {
          firstname : '',
          lastname : '',
          email : '',
          password1 : '',
          password2 : '',
          match : false,
          show : false,
      }
  },
    name: 'RegisterCard',
    methods: {
        register : async function(){
          let userData = {};
          userData.firstname = this.firstname;
          userData.lastname = this.lastname;
          userData.email = this.email;
          userData.password = this.password2

            await postServices.register(userData).then(this.$router.go('/login'))
        },
        validate : function(){
        this.password1 == this.password2 ? this.match = true : this.match = false
        },
        showValidation : function(){
          this.show = true
        },
        hideValidation : function(){
          this.show = false
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
    background-color: rgb(255, 255, 255);
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
label, .input {
  transition: all 0.2s;
  touch-action: manipulation;
}


.input {
  font-size: 1.5em;
  border: 0;
  border-bottom: 1px solid #ccc;
  font-family: inherit;
  -webkit-appearance: none;
  border-radius: 0;
  padding: 0;
  cursor: text;
  
}

.input:focus {
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
.input:placeholder-shown + label {
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
.input:focus::-webkit-input-placeholder {
  opacity: 1;
}
/**
* When the element is focused, remove the label transform.
* Also, do this when the placeholder is _not_ shown, i.e. when 
* there's something in the input at all.
*/
.input:not(:placeholder-shown) + label,
.input:focus + label {
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

.danger{
  color: rgb(255, 0, 0);
  font-weight: bold;
}

.success{
  color: green;
    font-weight: bold;
}

</style>