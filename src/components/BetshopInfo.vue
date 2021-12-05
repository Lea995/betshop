<template>
<div class="info-container"> 
    <div class="info-div">
        <img src="../assets/ic_bet_shop_location.png" alt="location icon" class="icon align-self">
        <ul class="info"> 
          <li>{{eventBus.selectedMarker.name}}</li>
          <li>{{eventBus.selectedMarker.address}}</li>
          <li>{{eventBus.selectedMarker.city}} - {{eventBus.selectedMarker.county}}</li>          
        </ul>
    </div>

    <div class="info-div set-margin">
        <img src="../assets/ic_bet_shop_phone.png" alt="phone icon" class="icon">
        <p class="info">311-56-44</p>
    </div>

    <div class="info-div">
        <img src="../assets/ic_bet_shop_hours.png" alt="watch icon" class="icon">
        <p class="info">{{workingHours}}</p>
    </div>
</div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: 'BetshopInfo',
  data() {
    return {
        workingHours: null,
        startTime: "08:00",
        endTime: "16:00"
    }
  },
  mounted() {
    this.workHours();
  },
  methods: {
    workHours: function () {
        const now = DateTime.now();
        const start = DateTime.fromISO(this.startTime);
        const end = DateTime.fromISO(this.endTime);

        if (now >= start && now <= end) {
            this.workingHours = "Open now until " + this.endTime; 
        } 
        else if(now < start){
            this.workingHours = "Opens today at " + this.startTime;
        }
        else {
            this.workingHours = "Opens tomorrow at " + this.startTime;
        }    
    }
  }
}
</script>

<style scoped>

.info-container {
    padding: 22px 18px;
    background-color: #fff;
}

ul {
  list-style-type: none;
  text-align: start;
}

ul li {
  padding-bottom: 2px;
}

.icon {
    display: inline-block;
    height: 18px;
    margin-right: 2.5px;
}

.info {
    display: inline-block;
}

.info-div {
    display: flex;
    align-items: center;
}

.set-margin {
    margin: 12px 0;
}

.align-self {
    align-self: start;
}

</style>