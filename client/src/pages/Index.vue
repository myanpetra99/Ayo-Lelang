<template>
<div>
 <App-header/>
 <h1>Barang Hari ini</h1>
<div class="content">
  <div v-for="item in items" :key="item._id" >
    <a :href="'/item/'+item._id" class="card">
     <App-card  class="cardItem">
    <img slot="image" class="image" :src="`http://localhost:8081/`+item.image" alt="" srcset="" >
    <span slot="title" v-text="item.title"></span>
    <span slot="description" v-text="item.description"></span>
    <span slot="starting-price" > Start Bid :  ${{item.startPrice}} |</span>
     <span slot="next-bid" > Next Bid :  ${{item.nextBid}} </span>
      <span slot="start">Time : {{item.startTime}} Until</span>
       <span slot="end"> {{item.endTime}} </span>
      </App-card> 
  </a>
   <app-button v-on:click.native="deletePost(item._id)" class="btn-delete">Delete </app-button>
  </div>
   

</div>
 </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppCard from '@/components/AppCard'
import postServices from '../../services/PostServices'
import AppButton from '../components/AppButton.vue'
export default {
  
    name: 'Index',
    components: { AppHeader, AppCard, AppButton},
    data() {
        return {
            items: []
        }
    },
    async mounted() {
          this.items = await postServices.getPost()
    },
    methods: {
        timeFormat : function(params) {
         var timeSplit = params.split(':'),
        hours,
        minutes,
        meridian;
        hours = timeSplit[0];
        minutes = timeSplit[1];
        if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
        } else if (hours < 12) {
        meridian = 'AM';
       if (hours == 0) {
        hours = 12;
        }
       } else {
        meridian = 'PM';
       }
       if(hours<10){
         hours = '0'+hours
       }
       return hours + ':' + minutes + ' ' + meridian;
      },
      deletePost : async function(id) {
        await postServices.deletePost(id)
        this.items = await postServices.getPost().then(this.$router.replace('/'))
      }
    },
    updated() {
      if(this.items.length >0){
           const date = new Date()
           let hours = date.toTimeString();
        
           let ampm = date.getHours() < 12? ' AM' : ' PM';
     
           let newHours = hours.split(' ')[0] + ampm;
    
           let hourFormatted = this.timeFormat(newHours)
           let i = 0;

              this.items.forEach(element => {
              let startTimeFormatted = this.timeFormat(element.startTime);
              let endTimeFormatted = this.timeFormat(element.endTime);
          
              
              if ( startTimeFormatted > hourFormatted ){ 
                 document.getElementsByClassName("cardItem")[i].classList.add("disabled-card");
                 document.getElementsByClassName("cardItem")[i].setAttribute("data-tooltip", "Event not yet started");
                  document.getElementsByClassName("cardItem")[i].closest("a").removeAttribute("href")
              }
              if ( endTimeFormatted < hourFormatted  ){ 
                 document.getElementsByClassName("cardItem")[i].classList.add("disabled-card");
                 document.getElementsByClassName("cardItem")[i].setAttribute("data-tooltip", "Time Expired");   
                 document.getElementsByClassName("cardItem")[i].closest("a").removeAttribute("href")
              }
            i++
             });
            
        }
    },
   
    
}
</script>

<style  scoped>
  a{
    text-decoration: none;
    color: inherit;
  }

    .content{
        display: flex;
        justify-content: center;
    }

 
    .disabled-card:hover{
    cursor: not-allowed !important;
    background-color: silver !important;
}

[data-tooltip] {
  position: relative;
  z-index: 10;
}

/* Positioning and visibility settings of the tooltip */
[data-tooltip]:before,
[data-tooltip]:after {
  position: absolute;
  visibility: hidden;
  opacity: 0;
  left: 50%;
  bottom: calc(100% + 5px); /* 5px is the size of the arrow */
  pointer-events: none;
  transition: 0.2s;
  will-change: transform;
}

/* The actual tooltip with a dynamic width */
[data-tooltip]:before {
  content: attr(data-tooltip);
  padding: 10px 18px;
  min-width: 50px;
  max-width: 300px;
  width: max-content;
  width: -moz-max-content;
  border-radius: 6px;
  font-size: 14px;
  background-color: rgba(59, 72, 80, 0.9);
  background-image: linear-gradient(30deg,
    rgba(59, 72, 80, 0.44),
    rgba(59, 68, 75, 0.44),
    rgba(60, 82, 88, 0.44));
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
  color: #fff;
  text-align: center;
  white-space: pre-wrap;
  transform: translate(-50%, -5px) scale(0.5);
}

/* Tooltip arrow */
[data-tooltip]:after {
  content: '';
  border-style: solid;
  border-width: 5px 5px 0px 5px; /* CSS triangle */
  border-color: rgba(55, 64, 70, 0.9) transparent transparent transparent;
  transition-duration: 0s; /* If the mouse leaves the element, 
                              the transition effects for the 
                              tooltip arrow are "turned off" */
  transform-origin: top;   /* Orientation setting for the
                              slide-down effect */
  transform: translateX(-50%) scaleY(0);
}

/* Tooltip becomes visible at hover */
[data-tooltip]:hover:before,
[data-tooltip]:hover:after {
  visibility: visible;
  opacity: 1;
}
/* Scales from 0.5 to 1 -> grow effect */
[data-tooltip]:hover:before {
  transition-delay: 0.3s;
  transform: translate(-50%, -5px) scale(1);
}
/* 
  Arrow slide down effect only on mouseenter (NOT on mouseleave)
*/
[data-tooltip]:hover:after {
  transition-delay: 0.5s; /* Starting after the grow effect */
  transition-duration: 0.2s;
  transform: translateX(-50%) scaleY(1);
}
/*
  That's it.
*/


.btn-delete{
    background-color: red;
    left:0;
    top: 180px;
    text-align: center;
    opacity: 0.5;
    transition: opacity .35s ease-in-out; 
}

.btn-delete:hover{
    background-color: rgb(167, 11, 11);
}

.card:hover + .btn-delete {
  opacity: 1;
}

</style>