<template>
    <v-container>
        <h1>상품 만들기</h1>
        <p class="sub_text">Gen-ai 이용해 간편하게 상품 및 콘텐츠를 만들고, 판매해요.</p>
        <div class="mt-10">
            <h3>상품 페이지 만들기</h3>
            <v-card variant="outlined" @click="push('CreateByBlog')">
                <div class="d-flex flex-no-wrap justify-space-between align-center pa-3">
                    <div>
                        <v-card-title class="text-h5 font-weight-black">
                            기존 콘텐츠로 만들기
                        </v-card-title>
                        <v-card-subtitle>블로그, 브런치 URL을 입력해, 상품 페이지를 자동 생성해요.</v-card-subtitle>
                    </div>
                    <div>
                        <v-btn
                            variant="text"
                            class="text-h5"
                        >
                        >
                      </v-btn>
                    </div>
                </div>
            </v-card>
            <v-card class="mt-5" variant="outlined" @click="push('Create')">
                <div class="d-flex flex-no-wrap justify-space-between align-center pa-3">
                    <div>
                        <v-card-title class="text-h5 font-weight-black">
                            새로 만들기
                        </v-card-title>
                        <v-card-subtitle>주요 정보를 입력하고, 상품 페이지를 자동 생성해요.</v-card-subtitle>
                    </div>
                    <div>
                        <v-btn
                            variant="text"
                            class="text-h5"
                        >
                        >
                      </v-btn>
                    </div>
                </div>
            </v-card>
        </div>
        <div class="mt-10">
            <h3>블로그 콘텐츠 만들기</h3>
            <v-card variant="outlined" @click="push('CreateBlogByBlog')">
                <div class="d-flex flex-no-wrap justify-space-between align-center pa-3">
                    <div>
                        <v-card-title class="text-h5 font-weight-black">
                            기존 콘텐츠로 만들기
                        </v-card-title>
                        <v-card-subtitle>상품 상세페이지 URL을 입력해, 블로그에 홍보할 콘텐츠를 자동 생성해요.</v-card-subtitle>
                    </div>
                    <div>
                        <v-btn
                            variant="text"
                            class="text-h5"
                        >
                        >
                      </v-btn>
                    </div>
                </div>
            </v-card>
            <v-card class="mt-5" variant="outlined" @click="push('CreateBlog')">
                <div class="d-flex flex-no-wrap justify-space-between align-center pa-3">
                    <div>
                        <v-card-title class="text-h5 font-weight-black">
                            새로 만들기
                        </v-card-title>
                        <v-card-subtitle>주요 정보를 입력하고,블로그에 홍보할 콘텐츠를 자동 생성해요.</v-card-subtitle>
                    </div>
                    <div>
                        <v-btn
                            variant="text"
                            class="text-h5"
                        >
                        >
                      </v-btn>
                    </div>
                </div>
            </v-card>
        </div>
    </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function push(name){
  router.push({
        name: name,
  })
}
</script>
<style>
.sub_text{
    color:"#838383"
}
</style>