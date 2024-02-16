<template>
    <v-container>
        <div>
            <p class="sub_text">블로그 콘텐츠 페이지 만들기</p>
            <h1>기존 콘텐츠로 만들기</h1>
        </div>
        <div class="pl-5 mt-10">
            <h3>블로그 콘텐츠 주요 정보 입력하기</h3>
            <p class="sub_text">블로그 콘텐츠 생성의 기준이 될 주요 정보를 입력해주세요.</p>
        </div>
        <v-textarea variant="outlined" v-model="content"></v-textarea>
        <div class="d-flex justify-end">

            <P :class="isCountValid">{{ count }}/{{ limit }}</P>
        </div>
        
        <div class="d-flex justify-end">
            <v-btn variant="outlined" @click="push('CreateMode')">
                이전
            </v-btn>
            <v-btn variant="outlined" class="ml-3" @click="generate()">
                생성하기
            </v-btn>
        </div>
        <div>
            <p>
                Tip. 좋은 상세페이지가 나오려면? 
            </p>
            <p class="sub_text">
               * 주요 지명이 포함되면 좋아요.
            </p>
            <p class="sub_text">
               * 특징과 차별점이 나타나면 좋아요.
            </p>
            <p class="sub_text">
               * 위치 및 일정이 나와있으면 좋아요.
            </p>
            <p class="sub_text">
               * 기타 주의사항 및 숙지해야할 정보가 있으면 좋아요.
            </p>
        </div>
    </v-container>
</template>

<script setup>
import {ref,computed} from 'vue'
import { useRouter } from 'vue-router'
import { useGenOptionStore } from '../store/generate.js';

const genOptions = useGenOptionStore();

const router = useRouter()
const content =ref("");
const limit = 1000;
const count = computed(()=>{
    return content.value.length;
})
const isCountValid = computed(()=>count.value >= limit ? 'red' : '')

function push(name){
  router.push({
        name: name,
  })
}
function generate(){
    genOptions.setContent(content)
    genOptions.setOption(4)
    router.push({
        name: "Generate",
        params:{
            data:{
                content:content,
                option:4,
            }
        }
    })
}
</script>
<style>
.sub_text{
    color:"#838383"
}
.red{
    color:#f40000
}
</style>