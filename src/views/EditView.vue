<template>
<v-container>
    <div class="d-flex justify-space-between">
        <h1>상품 페이지 만들기</h1>
        <div class="d-flex">
            <v-btn variant="outlined" class="mr-3" @click="router.push('CreateMode')">이전</v-btn>
            <v-btn variant="outlined" @click="register">등록</v-btn>
        </div>
    </div>
    <div>
        <v-row class="mt-10 mb-1">
            <v-col cols="2" class="align-self-center">
                <v-sheet border :elevation="1" class="pa-2" >
                    <div class="d-flex justify-center">
                        <svg-icon 
                        width= "100"
                        height= "100"
                        type="mdi" 
                        :path="mdiImageMultiple"></svg-icon>
                    </div>
                    <div class="d-flex justify-center pb-2">
                        <v-sheet border rounded class="pa-1">사진 {{ post.images.length ? post.images.length:0}}/10</v-sheet>
                    </div>
                </v-sheet>
            </v-col>
            <v-col cols="10">
                <v-sheet
                    border
                    class="d-flex align-content-start flex-wrap"
                    min-height="200"
                    :elevation="1"
                >
                    <v-sheet
                    v-for="image,n in post.images"
                    :key="n"
                    class="ma-1"
                    >
                        <v-img
                            :width="150"
                            :height="90"
                            aspect-ratio="1/1"
                            :src="image"
                        ></v-img>
                    </v-sheet>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
    <div>
        <h2>제목</h2>
        <v-text-field 
        v-model= "post.title" 
        :rules="[
            () => !!post.title || '제목은 필수 항목입니다.',
            () => !!post.title && post.title.length <= titleLimit || `제목은 ${titleLimit}글자 이하로 적어주세요`
        ]"
        counter="25"
        variant="outlined"
        ></v-text-field>
    </div>
    <div>
        <h2>가격(1인당)</h2>
        <p>엔화, 달러 적용시 환율은 자동적용 됩니다.</p>
        <v-text-field v-model= "post.price" variant="outlined"></v-text-field>
    </div>
    <div>
        <h2>핵심 포인트</h2>
        <v-textarea 
        :rules="[
            () => !!post.attract_point || '핵심 포인트는 필수 항목입니다.',
            () => !!post.attract_point && post.attract_point.length <= pointLimit || `핵심 포인트는 ${pointLimit}글자 이하로 적어주세요`
        ]"
        counter="300"
        variant="outlined" v-model="post.attract_point" ></v-textarea>
    </div>
    <div>
        <h2>상품 소개</h2>
        <v-textarea
        :rules="[
            () => !!post.description || '상품 소개는 필수 항목입니다.',
            () => !!post.description && post.description.length <= descriptionLimit || `상품 소개는 ${descriptionLimit}글자 이하로 적어주세요`
        ]"
        counter="5000" 
        variant="outlined" v-model="post.description"></v-textarea>
    </div>
    <div>
        <h2>장소</h2>
        <v-text-field  variant="outlined" v-model="post.place"></v-text-field >
    </div>
    <div>
        <h2>유의사항(확인필수)</h2>
        <v-textarea variant="outlined" v-model="post.checkpoint"></v-textarea>
    </div>
    <div>
        <h2>환불정책</h2>
        <v-textarea variant="outlined" v-model="post.refundpolicy"></v-textarea>
    </div>
</v-container>
<v-dialog
v-model="loadingDialog"
width="auto"
>
<v-card>
  <v-card-text>
    <div class="d-flex justify-center mb-10">
        <v-progress-circular
            :size="100"
            :width="10"
            color="black"
            indeterminate
        ></v-progress-circular>
    </div>
    <h2 class="text-center">
        다국어 페이지를 생성중이에요.
    </h2>
    <p  class="text-center">
        취소시 상품 페이지 등록이 완료되지 않아요.
    </p>  
    </v-card-text>
  <v-card-actions>
    <v-btn color="primary" block @click="loadingDialog = false">취소</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
<v-dialog
v-model="completeDialog"
width="auto"
>
<v-card>
  <v-card-text>
    생성이 완료 되었어요.
  </v-card-text>
  <v-card-actions>
    <v-btn color="primary" block @click="router.push({name:'Home'})">확인</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGenOptionStore } from '@/store/generate';
import { useRouter } from 'vue-router'
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiImageMultiple  } from '@mdi/js';
import {baseInstance} from '../api'
const router = useRouter()

const genOptions = useGenOptionStore()
const post =ref({
    title:"",
    price:0,
    point:"",
    description:"",
    place:"",
    checkpoint:"",
    refundpolicy:"",
    attract_point:"",
    images:[],
})

const titleLimit = 25;
const pointLimit = 300;
const descriptionLimit = 5000;
const loadingDialog = ref(false)
const completeDialog = ref(false)
async function register(){
    loadingDialog.value = true;
    post.value.price = isNaN(post.value.price) ? 0 : post.value.price;
    await baseInstance.post('/product/new',{
            title:post.value.title,
            description:post.value.description,
            keyword: genOptions.result.keywords,
            keywords_eng: genOptions.result.keywords_engs,
            images: post.value.images,
            price:Number(post.value.price),
            point:post.value.attract_point,
            place:post.value.place,
            checkpoint:post.value.checkpoint,
            refundpolicy:post.value.refundpolicy,
            attractive_point:post.value.attract_point,
    }).then(()=>{
        loadingDialog.value = false
        completeDialog.value = true
    })
}

onMounted(()=>{
    post.value=genOptions.result
    post.value.point=genOptions.result.attract_point
    post.value.attractive_point=genOptions.result.attract_point
    post.value.price = isNaN(post.value.price) ? 0 : post.value.price;
})
</script>