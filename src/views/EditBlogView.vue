<template>
<v-container>
    <div class="d-flex justify-space-between">
        <h1>블로그 컨텐츠 만들기</h1>
        <div class="d-flex">
            <v-btn variant="outlined" class="mr-3" @click="router.push('CreateMode')">이전</v-btn>
            <v-btn variant="outlined" @click="loadingDialog = true">등록</v-btn>
        </div>
    </div>
    <div>
        <v-row class="mt-10 mb-1">
            <v-col cols="12">
                <v-sheet
                    border
                    class="d-flex align-content-start flex-wrap"
                    min-height="200"
                    :elevation="1"
                >
                    <v-sheet
                    v-for="image,n in data.images"
                    :key="n"
                    class="ma-1 download"
                    @click="downloadImg(image)"
                    >
                        <v-img
                            :width="150"
                            :height="90"
                            aspect-ratio="1/1"
                            :src="image"
                        ></v-img>
                        <div class="download_icon_container">
                            <svg-icon class = "icon" type="mdi" :path="mdiArrowDownBoldBoxOutline"></svg-icon>
                        </div>
                    </v-sheet>
                </v-sheet>
                <p>* 이미지를 클릭해 다운로드 하세요.</p>
                <p>* 혹은 우클릭 후 이미지를 다른 이름으로 저장하세요. </p>
            </v-col>
        </v-row>
    </div>
    <div>
      <v-btn-toggle
        v-model="lang"
        shaped
        mandatory
      >
        <v-btn value = 'ko' @click="changeLocale('ko')">
          한국어
        </v-btn>
        <v-btn value = 'en' @click="changeLocale('en')">
          영어
        </v-btn>
        <v-btn value = 'ja' @click="changeLocale('ja')">
          일본어
        </v-btn>
      </v-btn-toggle>
    </div>
    <div>
        <div class="d-flex justify-space-between mb-2">
            <h2>제목</h2>
            <v-btn variant="outlined" @click="copyToClipboard(post.title,'제목이')">복사</v-btn>
        </div>
        <v-text-field 
        readonly
        v-model= "post.title"
        variant="outlined"
        ></v-text-field>
    </div>
    <div>
        <div class="d-flex justify-space-between mb-2">
            <h2>상품 소개</h2>
            <v-btn variant="outlined" @click="copyToClipboard(post.description,'상품 소개가')">복사</v-btn>
        </div>
        <v-textarea
        readonly
        variant="outlined" v-model="post.description"></v-textarea>
    </div>
    <v-snackbar
    v-model="snackbar"
  >
    {{ snackbarMessage }}

    <template v-slot:actions>
      <v-btn
        color="pink"
        variant="text"
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</v-container>
<v-dialog
v-model="loadingDialog"
width="auto"
>
<v-card>
  <v-card-text>
    <div class="d-flex justify-center mb-10">
    </div>
    <h2 class="text-center">
        컨텐츠를 복사해 블로그에 등록해주세요.
    </h2>
    <p  class="text-center">
        추후 블로그 연동 기능이 추가 됩니다.
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
import { ref, onMounted,watch } from 'vue';
import { useGenOptionStore } from '@/store/generate';
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n';
  import SvgIcon from '@jamescoyle/vue-icon';
import { mdiArrowDownBoldBoxOutline } from '@mdi/js';
const {locale} = useI18n();

const lang = ref(locale)

const router = useRouter()

const genOptions = useGenOptionStore()
const data = ref({  
  images:[],
})
const post =ref({
  title:"제목입니다.",
  description:"상세 설명 입니다.",
})

const loadingDialog = ref(false)
const completeDialog = ref(false)

onMounted(()=>{
  data.value = genOptions.result
  post.value = data.value[locale.value]
})

watch(locale, () => {    
  post.value = genOptions.result[locale.value]
});
function changeLocale(inputLocale){
  if(inputLocale=='ko'||inputLocale=='ja'||inputLocale=='en'){
    post.value = genOptions.result[inputLocale]
  }
}

const snackbar = ref(false)
const snackbarMessage = ref('')
function copyToClipboard(text,message) {
  navigator.clipboard.writeText(text)
    .then(() => {
        snackbarMessage.value =message+" 클립보드에 복사되었습니다."
        snackbar.value=true;
        setTimeout(()=>snackbar.value=false,3000)
    })
    .catch(err => {
      console.error('Failed to copy text:', err);
    });
}
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime
  });
}

function downloadImg(imgSrc) {
  var image = new Image();
  image.crossOrigin = "anonymous";
  image.src = imgSrc;
  var fileName = image.src.split("/").pop();
  image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.getContext('2d').drawImage(this, 0, 0);
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(dataURLtoBlob(canvas.toDataURL()), fileName);
    } else {
      var link = document.createElement('a');
      link.href = canvas.toDataURL();
      link.download = fileName;
      link.click();
    }
  };
}
</script>
<style>
.download_icon_container .icon{
  width:100%;
  color: #000;
}
.download_icon_container{
  background-color: #ffffff70;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  cursor: pointer;
}
.download{
  position: relative;
}
.download:hover .download_icon_container{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>