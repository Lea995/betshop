<template>
<div class="map-container">
  <GmapMap
    :center='center'
    :zoom='15'
    ref = 'myMap'
    style='width:100%;  height: 580px;'
  >
    <GmapMarker
      :key="index"
      v-for="(marker, index) in betshops"
      :position="marker.location"
      :clickable="true"
      :icon="setPin(index)"
      @click="toggleInfo(marker, index)"
    />
  </GmapMap>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GoogleMap',
  data() {
    let pinNormal = 'data:image/png;base64,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';
    let pinActive = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABBCAYAAACXfCfjAAAACXBIWXMAAAsSAAALEgHS3X78AAAIbUlEQVRo3tWae2zT1xXHP3YT4gKandeAdDYOhfFogPDY6ObRJKOExVtD+GNa0MojtCOrKKVBxVCFCSISVmhVChRBoB1h/AFFk5qEYlhpRehw0SoeiTANMKDGWR40YP9+LSxOInH3hx0nwXbys5NAeqQrJffec+8595zv+Z17rlX0kd7+NDEdSAemAjogVaVC9/A8IZCAakACaoCqNZnNVX3dXxWh0EuB+UAOfadyoAIoX5PZLA2oAlv/mbgRWAIY6X+SgO3Ae5Z5yhVRpMDWE4npwP4BEjyYIkWW3zS/1y8KbDmeuBHYwKOnKmDB2qyeraHqRfj9wFIeH0lCiIx15jvVYSvwljXhcQvf6VKCjHW/Da5EUAX++knCRpXqsbhNUPKF4Iw3fxeohCqI8OnAKQYfVfuU6IYJddd/Nh9N0AnBfiFgELZUIQK9Qv2QqV4XAuMgVQAheL2kMiG9q8xRHX8UVyTohGBVJJ/m2eMtTNHnoh2qx9Mu47z7JdcarVxtOk5ru4whwcQUfS4/HZmFJloLgPOujaMXVyL/ry48PHhDelUABorLE5aiYn+4wj833sLs8Wsicurbsp0PTmdEgGoy1ufcqepmASFYhQh/rZ+NWe4X5uCZHDztMqMTTPz86XxGJ/wSTbSW27KdGudhrjVa8bR/R+bkYqYYchmhTUE8iEj3JR1WUAFs+jjBCHwTyUrrc5oB2Hcqg9uyXTHfyswLaIfqKS5PjDQqxf5lwR1J7Tv9nEiB1SG0dL8uPF6gxnkYQ7wJQ7wpkr1z/C4kHog0lUL0xkRrSR2dy/gkM542GU+7DMD4UVnU3DqkaI1ZY/PRDdWjM+Qy1ZALgKdd5t/XS/midqvSj1saUBblQ3aqEv+PidayeHYFI3UpADiabcREeaNK5pRiauuttPoUCkWjE01kTinhSoOVmluH8bTLGBNNpE20kDbRQpNk52qDVUk0Su8EscCoBL/zppYwUpdCk2Tno7OLke47AdANMzBvajF/+MXfOXB6fkh+3TAD82e+z0dfLuZKFyEd33oP4tlx+cwam8+VeqsSIxgB1BuOxKcr9bsJSVkAXGmw4r7n9Pe77zk5bFuMdL+OtEmWkPzzZ+7ksG0RtfXWgDFHs62reyhqG47Ep6sRXnsoaZ627wDQRGmDjpd/9SqaKC26oYaAsQlJZk5cLKTJbQ/Ka0wwAYQcD9XUYcyl2uEFaWpybsg5x6sLcd93BvTX1ltplOwh+SY8ZQbg7LVS5fILjGrxAJ1SjrNXS/G0y2iitYzUpoR1Uj013VADumF6HN/avLhSygtGNQKdeABKWkurzNmrpX43UsrXW9M9qe/0/zB5o4T3Eq2YdMMMHWEskswjKDVIdv/a4a6pRiApN7WeacneD0+jyx6mm+hDB4dWmUa3Hd0wPcmJpjBBLARK28SfeIHW6LbT0iYFnTPhqSyyphcH9MdE/4iMyZaQa9f+1xv7e5oTpFWFFYU6FPC0yUHHzTNKmKg3c+x8YcBYo9vOzaYzrDCfJiZaG4hHn+8kjzCFFQPUm190VSkFTCcO9N1ArInS8sfnDqKJ1vIP26sh+W822bDV7mFNzkWSf2zqxj9tTG7n4SiVR1DdkUo4lFTdGlyXSB5hIna4gZfnVvJ5zRYA5kxd602pbdm9IvvC9UOMik3h5bmVfF1npdFlZ/rTucQO9waHr+usSqODtHmxS1IBrDsQ97GSQq1miJblmZWMiksJGDt4apF3cwWkGaJlQ+7NgP5Gl529n2bjaZMVVe7eWuLK6LBAjRIFPK0yO46mMUlvZlTcZGaM7XJyTqvi0Odp9QrovufEfa+O2OF6bjbZ+OSrQn96roBOd94HBOXh1D8vO620tMk8n2rx903Sm7msUIknh2h9CtSx90R2X2qnXgW25LmqLX+Lk3wPFIro979634cLO0lxKcxJXUtLq0yDy86YkSZmjFvIMwaz/6TPXC7l/PVDaIZoeWFWSbfMM5Jy49ZlroBLfbnSWujMcQv9rnPkixXkmytJiktheVZl8MvrcAMvzCrpJjjAjUZbpAqUBxa2BBVKg+/caV7Xabhrp+GundJj2bQ8BLzLt6wc+GwRe6zZ/Mu+J2D83H8OcfLClkgTwIqgtdE39sW6e3OjpPjJFCw4DUDZyRe5fMvq9+uk+MkAuO45cX/vDPD7Z4xm4oYbqL97yc8Xifu88yd3bEBlrotpenQj1/dOdh/LxtMq0+C65O9vaZO50XgmJF9Lm8y5a4foByoLWlr0pbLbe1OgxSNzo/7M46tRq9jeY3l9dWnsRSCVwUlV7+a7M0JWp31g3t5fN60BaEWKXmgKdsd+84heJMMhx7ZX3Mk9vg90sULRD+H0e3zkW7VrUFnBsX1F4OmHtsDgs0JBRO/Er+0cFFao2rHSnRH6Ut9zCTVvEBx/Uc+fhd4eInboFF12BojKdr4m5fU0IUpBHbtACNLDSbX7iSSVKrTvK3Qh2LlKcgBFj+H0i3auknotuil+VV2xTXcK36PCowDurgJJ0fOlWvGSgrxwqnh9aBKCPOWlRYW0a7XkEFDwCOJO0a7VkkN5chomvfLOgEal8t1vSAvCYYiKYJM8ITAOQMrtUKmUu07EFgD489u6VLw/yenP0DptzxqpOlymJyLZ6dxJT9OMuTFXgdx+Ej6v1CKfiIRRHemOpRa53BeZ+oraslKLXBapHE/05djOf9ZaPeN5TV/wUL53nbywLzKo+2r7vevkPCEoi+C3DtUQPmj71QIddOHz1orpc8KyRDWQse9NWRoUCviV+LVGBzyrRPgPCvsufMRhtCd6qUS7FNgWIsSWfVgo5/Xnfv2uAMBLxVqjEOzvkvxJKhV5H66Xy/kh0bJNWuOyTdoBzWD/D4J01xuE3DXZAAAAAElFTkSuQmCC';
    return {
      center: { lat: 48.137154, lng: 11.576124 },
      betshops: [],
      selectedMarker: null,
      infoOpened: false,
      selectedIndex: null,
      pinNormal,
      pinActive,
    }
  },
   created () {
     navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
     });
     axios
       .get('https://interview.superology.dev/betshops', {
         params: {
           boundingBox:`${this.center.lat+0.024086},${this.center.lng+0.024086},${this.center.lat-0.024086},${this.center.lng-0.024086}`
         }
       })
       .then(response =>
         (this.betshops = response.data.betshops)
       ).catch(function (error) {
         console.log(error);
       })
   },
  mounted() {
    
  },
  methods: {
    setPin(index) {
      if(this.selectedIndex === index) return this.pinActive;
      return this.pinNormal;

    },
    toggleInfo: function(marker, index) {
      this.selectedMarker = marker;
      this.selectedIndex = index;
      this.eventBus.selectedMarker = this.selectedMarker;
      this.eventBus.infoOpened = !this.infoOpened;

    }
  },
}
</script>
<style scoped>
.map-container {
  border: 2px solid white;
  width: 400px;
}
</style>