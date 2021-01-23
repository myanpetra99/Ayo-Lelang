<template>
            <div class="profile-picture">
            
           <img :src="userImage ?  userImage : `https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png`" alt="" width="200px" v-on:click="inputHandler">
                <input type="file" style="width:200px" ref="inp" @change="eventHandler($event)">
         </div>
</template>

<script>
import userServices from '../../services/UserServices'
export default {
    props: ['userImage'],
    name: 'ProfilePicture',
    data() {
        return {
            selectedFile : null
        }
    },
    methods: {
        inputHandler : function(){
           this.$refs.inp.click()
        },
        eventHandler : async function(e){
            this.selectedFile = e.target.files[0]
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);
            await userServices.changePhoto(fd).then(
                this.$emit('update:photo', 'test')
            )
            
        }
    },
    omputed: {
      image: function() {
        return this.user.image;
  },
},
}
</script>

<style scoped>


img{
  border-radius: 200px 200px 200px 200px;
-moz-border-radius: 200px 200px 200px 200px;
-webkit-border-radius: 200px 200px 200px 200px;
border: 0px solid #000000;
  width: 200px;
  height: 200px;
  margin: -100px;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
    -webkit-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    -moz-box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
    box-shadow: 3px 11px 20px -19px rgba(0,0,0,0.68);
display: flex;
justify-content: center;
object-fit: cover;
}

input{
    display: none;
}



img:hover {
  display: block;
transition: 500ms;
 cursor: pointer;

}
</style>