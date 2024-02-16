<template>
  <v-sheet
    class="mx-auto rounded-lg"
  >
    <v-img
      :src="image"
      width="373px"
      height="213px"
      cover
      class="rounded"
      @click="push('Detail')"
    ></v-img>
    <span class="category">액티비티</span>
      <h3 class="line-2 min-height-72" @click="push('Detail')">
        {{ objLocale.title }}
      </h3>
    <div class="d-flex">
      <svg-icon type="mdi" style="color:#EAC258" :path="mdiStar"></svg-icon>
      <span>
        {{randomStars}}({{randomReviewCount}})
      </span>
    </div>
    <span class="price">{{t("currency")}} {{locale == 'en' ? addCommasToNumber(computedPrice.toFixed(2)) : addCommasToNumber(computedPrice.toFixed(0))}}</span>
    <div class="tags">
      <span
        v-for="tag,i in objLocale.keyword" 
        :key="i"
      >
        #{{ tag }}
      </span>
    </div>
  </v-sheet>
</template>

<script setup>
import {ref,toRef,onMounted,watch,computed} from 'vue'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStar } from '@mdi/js';
import {useI18n} from 'vue-i18n'

import { useRouter } from 'vue-router'
const router = useRouter()
function push(name){
  router.push({
        name: name,
        params:{
          uid:props.card._id,
          id:props.card._id
        }
  })
}
const {t,locale} = useI18n({ useScope: 'global' });

const props = defineProps({
  card: Object,
  images:Array
})

const obj = toRef(props,'card')
const objLocale = computed(()=>obj.value[locale.value])

const defaultImg = '/images/default-placeholder.png';
const image=obj.value.en.images ? obj.value.en.images[0] : defaultImg

var randomStars = (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1);
var randomReviewCount = (Math.random() * (2000 - 100) + 100).toFixed(0);

const computedPrice = ref(0);

onMounted(() => {
  computedPrice.value = obj.value.en.price;
    let rate  = 1;
    if(locale.value == 'ja'){
      rate = 9
    }else if(locale.value == 'en'){
      rate = 1300
    }
    computedPrice.value = obj.value.en.price/rate;
    console.log('locale', locale.value);
})

watch(locale, () => {
    let rate  = 1;
    if(locale.value == 'ja'){
      rate = 9
    }else if(locale.value == 'en'){
      rate = 1300
    }
    computedPrice.value = obj.value.en.price/rate;
    console.log('locale in card', locale.value);
  });
  function addCommasToNumber(numberString) {
  // Split the string into integer and decimal parts
  const parts = numberString.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || ''; // Handle the case when there's no decimal part

  // Add commas to the integer part
  const integerWithCommas = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Combine the integer and decimal parts
  const formattedNumber = decimalPart ? `${integerWithCommas}.${decimalPart}` : integerWithCommas;

  return formattedNumber;
}
</script>
<style>
.line-2{
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
          line-clamp: 2; 
  -webkit-box-orient: vertical;
}
.min-height-72{
  min-height: 56.16px;
}
.category{
  color: #FF6DA2;
  font-size: 0.875rem;;
}

.tags{
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  color:#989898
}
.price{
  font-size: 1rem;
  font-weight: 600;
  
} 
</style>