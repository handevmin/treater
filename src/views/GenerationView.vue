<template>
    <v-container>
        <div class="pa-10 ma-10">
            <div class="d-flex justify-center">
                <div>
                    <div class="d-flex justify-center mb-10">
                        <v-progress-circular
                            :size="170"
                            :width="18"
                            color="black"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                    <h1 class="text-center">
                        Gen-ai가 콘텐츠를 생성중이에요 
                    </h1>
                    <p  class="text-center">
                        화면을 유지해주세요. 이동하면, 콘텐츠 생성이 중단되요!
                    </p>
                </div>
            </div>
        </div>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';
import {baseInstance} from '../api'
import { useGenOptionStore } from '../store/generate.js';
import { useRouter } from 'vue-router'
const router = useRouter()
const genOptions = useGenOptionStore();
onMounted(async()=>{
    let path = genOptions.option < 3 ? "/generator/product" : "/generator/blog";
    let name = genOptions.option < 3 ? 'Edit' : 'EditBlog';
    
    await baseInstance.post(path,{
        user_text:genOptions.content,
        option:genOptions.option
    }).then((res)=>{
        genOptions.setResult(res.data);
        router.push({
            name: name,
        })
    })
})
// const content = ref("")
// const option = ref("");

</script>
