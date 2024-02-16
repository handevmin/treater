<template>
  <v-app id="inspire">
    <v-main class="bg-white-lighten-3">
      <v-container>
        <v-row class="mb-10">
          <v-col class="pa-1" cols="12">
            
            <h1 >{{post.title}}</h1>
            <div>
              <svg-icon type="mdi" :path="path"></svg-icon>(100)
              <svg-icon type="mdi" :path="mdiMapMarker"></svg-icon>{{objLocale.place}}</div>
            <v-sheet
              elevation="5"
              rounded="lg"
            >
            <v-carousel
            cycle  
            >
              <v-carousel-item
                v-for="image,i in objLocale.images"
                :key="i"
                :src="image"
                cover
              ></v-carousel-item>
            </v-carousel>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-sheet
              rounded="lg"
            >
            <v-divider class="mb-2 mt-3 mb-3"/>
            <h2>
              {{ t("key_points") }}
            </h2>
            <pre>{{ attract_point }}
            </pre>
            <v-divider class="mb-2 mt-15 mb-3"/>
            <h2 >
              {{ t("activity_introduction") }}
            </h2>
            <pre>{{ objLocale.description }}
            </pre>
            <v-divider class="mb-2 mt-15 mb-3"/>
            <h2 >
              {{ t("location") }}
            </h2>
            <p>
              {{ objLocale.place }}
            </p>
            <v-divider class="mb-2 mt-15 mb-3"/>
            <h2 >
              {{ t("notices") }}
            </h2>
            <h3 class="mt-3">
              {{ t("refund_policy") }}
            </h3>
            <pre>{{objLocale.refundpolicy}}
            </pre>
            <h3 class="mt-3">
              {{ t("must_confirm") }}
            </h3>
            <p>
              {{objLocale.checkpoint}}
            </p>
            </v-sheet>
          </v-col>
          <v-col cols="4">
            <v-sheet
            border
            >
              <div class="pa-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <h3>{{t('price')}}</h3>
                </div>
                <div>
                  <div class="small-text">{{t("one_person")}}</div>
                  <p class="text-align-end">{{t("currency")}} {{locale == 'en' ? addCommasToNumber(computedPrice.toFixed(2)) : addCommasToNumber(computedPrice.toFixed(0))}}</p>
                </div>
              </div>
              <div class="pa-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <h5 class="text-regular max-width-50">{{t('select_guests_required')}}</h5>
                </div>
                <div class="d-flex">
                  <v-chip class="mr-3" @click="number++">+</v-chip>
                  <p>{{number}}</p>
                  <v-chip class="ml-3" @click="number--">-</v-chip>
                </div>
              </div>
              <div class="pa-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <h5 class="text-regular">{{t('date')}}</h5>
                </div>
                <div>
                  <input type="date" v-model="date">
                </div>
              </div>
              <div class="pa-5 d-flex flex-no-wrap justify-space-between">
                <div>
                  <h4>{{t('total')}}</h4>
                </div>
                <div>
                  <p>{{t("currency")}} {{
                    locale == 'en' ? addCommasToNumber(totalPrice.toFixed(2)) : addCommasToNumber(totalPrice.toFixed(0))}}</p>
                </div>
              </div>
              <v-divider class="mb-2 my-2"/>
              <div class="width-100 d-flex justify-center">
                <div class="d-flex justify-end width-90">
                  <v-btn
                    variant="text"
                    density="compact"
                    class="pa-0 small-text"
                  >{{t('contact_us')}}</v-btn>
                </div>
              </div>
              <div class="d-flex justify-center">
                  <v-btn
                    variant="outlined"
                    width="90%"
                    class="mb-2"
                  >{{t('reservation')}}</v-btn>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import {onMounted,ref,computed,watch } from 'vue';
  import { useRoute } from 'vue-router';
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiStar, mdiMapMarker } from '@mdi/js';
  import {baseInstance} from '../api'
  import { useI18n } from 'vue-i18n';
  const {t,locale} = useI18n();
  const props = defineProps({
    uid: String
  })
  const route = useRoute();
  const path  = ref(mdiStar)
  
  const post = ref({})
  const price = ref(0);
  const computedPrice = ref(0);
  const number = ref(2);
  const date =new Date().toISOString().substring(0,10)

  const totalPrice = computed(() => computedPrice.value*number.value)
  const attract_point = ref('')
  const default_refundpolicy = "예약일시 이전 환불 가능\n예약일시 이후 환불 불가\n자세한 환불정책은 고객센터를 확인해주세요."
  async function request(id){
    await baseInstance.get(`/product/${id}`).then(
      (res)=>{
        handleResult(res.data);
      }
    )
  }
  onMounted(() => {
    console.log(props.uid)
    request(route.params.uid);
  })
  watch(locale, () => {
    let rate  =1;
    if(locale.value == 'ja'){
      rate = 9
    }else if(locale.value == 'en'){
      rate = 1300
    }
    computedPrice.value = price.value/rate;
    attract_point.value=post.value[locale.value].point
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

  const objLocale = computed(()=>{
    return post.value[locale.value] ??{}
  })

  function handleResult(data){
    post.value = data
    console.log(post.value)
    price.value = post.value.en.price;
    computedPrice.value = post.value.en.price;
    post.value.en.point = post.value.en.point.replace(/\d+\./g, "\n$&")
    if(!post.value.refundpolicy){
      post.value.en.refundpolicy=default_refundpolicy
    } 

    let rate  =1;
    if(locale.value == 'ja'){
      rate = 9
    }else if(locale.value == 'en'){
      rate = 1300
    }
    computedPrice.value = price.value/rate;

    attract_point.value=post.value[locale.value].point
  }

</script>

<style>
p{
  color: #000;
}
.small-text{
  font-size: 13px;
  text-align: end;
}
.width-90{
  width: 90%;
}
.width-100{
  width: 100%;
}
.text-regular{
  font-weight: 400;
}
.max-width-50{
  max-width: 70%;
}
.text-align-end{
  text-align: end;
}
pre{
  font-family: Roboto,sans-serif;
  white-space: pre-wrap; /* pre tag내에 word wrap */
}
</style>