<template>

<div id="formCreate">

<form action="localhost:8081/api/post" method="POST" enctype="multipart/form-data" @submit.prevent="createNew">

    <input type="file" name="image" id="image" @change="onFileSelected($event)">
    <label for="title">Nama barang : </label>
    <input type="text" name="title" id="title" v-model="title" >
    <label for="description">deskripsi : </label>
    <input type="text" name="description" id="description" v-model="description">
    <label for="startPrice">starting price : $</label>
    <input type="number" name="startPrice" id="startPrice" v-model="startPrice">
    <label for="nextBid">next bid : $</label>
    <input type="number" name="nextBid" id="nextBid" v-model="nextBid">
    <label for="startTime">start at : </label>
    <input type="time" name="startTime" id="startTime" v-model="startTime">
    <label for="endTime">end at : </label>
    <input type="time" name="endTime" id="endTime" v-model="endTime">

<h1 v-text="startTime"></h1>
<h1 v-text="endTime"></h1>
<app-button class="form-btn">Create</app-button>
</form>
    </div>
</template>

<script>
import AppButton from './AppButton.vue'
import postServices from '../../services/PostServices'

export default {
  components: { AppButton },
    name: 'CreateForm',
    data() {
        return {
            selectedFile: null,
            title: '',
            description: '',
            startPrice: 0,
            nextBid: 0,
            startTime: null,
            endTime: null,
            image: null
        }
    },
    methods: {
        onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },
         createNew: async function (){
          const fd = new FormData();
          let config = {
            header : {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type' : 'multipart/form-data'
            },
         }  
         
          fd.append('image', this.selectedFile, this.selectedFile.name);
          fd.append('title',this.title)
          fd.append('description',this.description)
          fd.append('startPrice',this.startPrice)
          fd.append('nextBid',this.nextBid)
          fd.append('startTime',this.startTime)
          fd.append('endTime',this.endTime)
          await postServices.createPost(fd, config).then(this.$router.replace('/'))
        },
    },
}
</script>

<style scoped>
form{
    margin-top: 50px;
    width: 240px;
    display: grid;
    border: 1px solid black;
    padding: 10px;
    border-radius: 20px;
}

form > *{
    margin-top: 10px;
}
</style>