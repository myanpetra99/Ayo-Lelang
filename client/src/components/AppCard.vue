<template>
    <div class="card">
        <div class="card-image">
            <slot name="image" class="image"></slot>
        </div>
         <div class="card-title">
            <slot name="title"></slot>
        </div>
        <div class="card-description">
            <slot name="description"></slot>
        </div>
        <div class="card-price">
            <slot name="starting-price"></slot>
                <slot name="next-bid"></slot>
        </div>
        <div class="card-date">
            <slot name="start"></slot>
                <slot name="end"></slot>
        </div>
       
    </div>
</template>

<script>
import postServices from '../../services/PostServices'

export default {
    name: 'AppCard',
}
</script>

<style scoped>

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  padding: 20px 16px 16px;
  text-align: center;
  max-width: 300px;
  display: flexbox;
  justify-content: center;
  margin: 10px 10px 10px 10px;
  height: 500px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  background-color: #c7c7ff;
  cursor: pointer;
}

.card-title{
    font-size: 30px;
}

.card-description{
    font-size: 15px;
    color: grey;
}

.card-price{
     font-size: 15px;
     color: green;
}

.card-date{
    font-size: 20px;
}

.image{
    min-width: 300px !important;
    max-width: 300px !important;
    max-height: 300px !important;
    min-height: 300px !important;
    object-fit: contain;
}


</style>