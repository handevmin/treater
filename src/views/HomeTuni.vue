
<template>
  <v-container>
    <v-row>
          <v-text-field label="Search" variant="solo" v-model="sKey"></v-text-field>
        </v-row>
        <v-spacer></v-spacer>
        <v-row>
        </v-row>
        <v-row class="mt-8">
            <v-col
              v-for="product,n in filteredProducts" :key="n"
              cols="12"
              sm="4"
              lg="3"
            >
              <ImageCard
                :card="product"
                :images="product.images"
              />
          </v-col>
        </v-row>
        <v-row class="mt-8" v-if="isLoading">
            <v-col
              v-for="n in 8" :key="n"
              cols="12"
              sm="4"
              lg="3"
            >
            <div class="loader-container">

              <v-progress-circular
                  :size="20"
                  :width="5"
                  color="black"
                  indeterminate
              ></v-progress-circular>
            </div>
          </v-col>
        </v-row>
        <v-sheet class="no-result" v-if="!isLoading && filteredProducts.length == 0">
          <h3>{{t('noresult')}}</h3>
        </v-sheet>
      </v-container>
</template>

<script setup>
import {ref,onBeforeMount,watch,reactive} from 'vue'
import ImageCard from '@/components/ImageCard.vue';
import { baseInstance } from '@/api';
import { useI18n } from 'vue-i18n';
const {t} = useI18n();


const products = reactive([])
const sKey = ref('')
watch(sKey,(sKey)=>{
  filteredProducts.value=products.value.filter(product=>product.title.includes(sKey)).map((element, index, array) => {
      return array[array.length - 1 - index];
    });
})
const filteredProducts = ref([])
const isLoading = ref(false)
onBeforeMount(async()=>{

  isLoading.value=true;
  await baseInstance.get('/product')
  .then((res)=>{
    handleResponseData(res.data)
  })
})

function handleResponseData(data){
  products.value = data
    filteredProducts.value = products.value.map((element, index, array) => {
      return array[array.length - 1 - index];
    });    
    isLoading.value= false;
}
</script>
<style>
.no-result{
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader-container{
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
