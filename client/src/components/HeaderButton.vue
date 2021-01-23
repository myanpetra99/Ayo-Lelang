<template>
        <button>
           <slot></slot>
        </button>
</template>

<script>

export default {
    name: 'HeaderButton',
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
    background-color: white;
    color: rgb(0, 0, 0);
    font-size: 20px;
    transition: 0.3s;
    border-radius: 20px;
    border: none;
}

button:hover{
    background-color: #F2F2F2;
    cursor: pointer;
}

</style>