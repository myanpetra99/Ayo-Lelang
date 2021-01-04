<template>
        <button>
           <slot></slot>
        </button>
</template>

<script>
export default {
    name: 'AppButton',
     props: {
    type: String,
    disabled: Boolean
  },
}
</script>

<style scoped>

button{
padding: 5px 5px 5px 5px;
text-align: center;
background-color: rgb(104, 128, 236);
color: white;
font-size: 20px;
transition: 0.3s;
border-radius: 20px;
border: none;
}

button:hover{
    background-color: rgb(153, 201, 245);
}

</style>