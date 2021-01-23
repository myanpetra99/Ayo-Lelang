<template>
    <div v-if="item" >
        <app-header/>
        <div class="row">
        <div id="content">
         <img class="image" :src="`http://localhost:8081/`+item.image" alt="item.title" >
         <h1 v-text="item.title"></h1>
         <h3 v-text="item.description"></h3>
         <h3>Starting Price : ${{item.startPrice}}</h3>
          <h1>Current price : ${{currentPrice}}</h1>
         <input type="number"  v-model="inputPrice" :step="nextBid" id="inputBid" :min="this.currentPrice+nextBid">

         <app-button v-on:click.native="increment" :class="{disabled : pending}" >+ {{nextBid}}</app-button>
        <app-button v-on:click.native="bid" :class="{disabled : pending}" id="bidButton"> Bid Now</app-button>
    <h5>My name : {{username}}</h5>
        </div>
         <div id="rtBox">
           <h1>Realtime Bid</h1>
             <div id="rtBoxContent" v-if="bidder">
               
               <div v-for="i in bidder.length" :key="i" class="notif-line">
                <div class="name">
                  <p>{{ bidder[i-1].users.firstName }} {{ bidder[i-1].users.lastName }}</p>
                </div>
                 <div class="message">
                   <p> Has bid for $ {{ bidder[i-1].userlog.bid }}</p>
                </div>
                 <div class="time">
                   {{ bidder[i-1].userlog.bidAt }}
                </div>
              
             </div>
           </div>
         </div>
        </div>
    </div>
</template>

<script>
import postServices from '../../services/PostServices'
import AppButton from '@/components/AppButton.vue'
import AppHeader from '../components/AppHeader.vue'
import io from 'socket.io-client';



export default {
  components: { AppButton, AppHeader },
    name: 'item',
    data() {
        return {
            username : '',
            item: {},
            socket: io(),
            id : this.$route.params.id,
            item: undefined,
            nextBid : 0,
            currentPrice : 0,
            pending: false,
            inputPrice : 0,
            bidder : [],
            socketBid : {
              users : {
                firstName : '',
                lastName : ''
              },
              userlog : {
                bid : 0,
                bidAt : null,
              }
            }
        }
    },
    sockets: {
        connect: function () {
            this.$socket.emit('join', this.id)
        },
        dataBid: function(data){
          console.log('Client Received Bid')
            this.bidder.push(data)
            this.currentPrice = data.userlog.bid
            this.inputPrice = data.userlog.bid
        }
    },
    async mounted() {
        let datas = await postServices.getOne(this.id)
        if (datas.user.verified == false) {
          this.$swal({
           icon: "error",
          title: 'Oops',
          text: 'Please verify your account before continue',
          showCancelButton: true,
          confirmButtonText: 'I want to verify now!',
          cancelButtonText: 'Later',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            this.$router.push({name : 'User'})
          }
        })
          this.$router.push({ name: 'Index', params: { initialError: 'Please Verify your account' }})
        } else {
          this.item = datas.post
          this.bidder = datas.userLogs
          this.username = datas.user.firstName +' '+ datas.user.lastName
          this.socketBid.users.firstName = datas.user.firstName
          this.socketBid.users.lastName = datas.user.lastName
          this.nextBid = this.item.nextBid;
          this.currentPrice = this.item.currentPrice? this.item.currentPrice : this.item.startPrice;
          this.inputPrice = this.item.currentPrice? this.item.currentPrice+this.item.nextBid : this.item.startPrice+this.item.nextBid;
        }  
    },
    updated() {
        let oldTime = localStorage.getItem('pending') || mull
        var currentTime = new Date();
        if((oldTime - currentTime.getTime() )   < 0 || oldTime ==null){
            this.pending = false;
            localStorage.removeItem('pending')
        }else{
            this.pending = true;
            this.setTooltip()
        }
    },
    methods: {
        increment: function () {
            this.inputPrice = parseInt(this.inputPrice) + parseInt(this.nextBid);
        },
        setTooltip: function() {
            document.getElementById('bidButton').setAttribute("data-tooltip", "Please Wait For Next Bid")
            document.getElementById('bidButton').setAttribute("disabled", true)
        },
        bid: async function () {
            var newTime = new Date();
            newTime.setSeconds(newTime.getSeconds() + 60);
            localStorage.setItem('pending',newTime.getTime())
            this.pending = true;
            this.setTooltip(latestBid)
            this.currentPrice = parseInt(this.inputPrice)
            let latestBid = {}
            latestBid.user = this.username
            latestBid.price = parseInt(this.currentPrice)
            this.socketBid.userlog.bid = parseInt(this.currentPrice)
            this.socketBid.userlog.bidAt = new Date
            this.$socket.emit('user-bid', this.socketBid)
            await postServices.bid(this.id,latestBid.user,latestBid.price)
        }
    },
    computed:{
      highestPrice: function(){
        if(this.item.currentPrice){
          return this.item.currentPrice
        }else{
          return this.currentPrice
        }
      }
    }
}
</script>

<style scoped>
    .image{
        max-width: 300px;
        margin-top: 1rem;
    }

    .disabled{
        cursor: not-allowed !important;
        background-color: gray !important;
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
.row{
  display: flex;
  justify-content: center;
}
#content{
flex: 70%;
}
#rtBox{
 flex: 30%;
 margin-top: 10px;
}

#rtBoxContent{
  max-height: 500px;
  overflow-y: auto;
  width: 100%;
  overflow-x: hidden;
  border: 1px solid rgb(82, 82, 82);
  display: grid;
  justify-content: center;
  border-radius: 10px 10px 10px 10px;
  display: inline-block;
}

.notif-line{
  background-color: rgba(255, 255, 255, 0.911);
  padding: 2px 2px 0px 0px;
  margin: 10px;
  min-width: 100%;
  display: inline-block;
}

#rtBox p{
color: rgb(77, 77, 77);
font-weight: bold;
font-size: 15px;
display: inline;
}

</style>