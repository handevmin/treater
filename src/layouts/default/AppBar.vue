<template>
  <v-container class="bg-white-lighten-2 mt-0">
    <v-row justify="between">
      <v-col class="">
        <RouterLink class="text-decoration-none" to="/">
          <img class="cursor-point" height="36" src="../../assets/treater_logo.png"/>
        </RouterLink>
      </v-col>
      <v-col class="d-flex justify-end" justify="end">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-2"
              color="primary"
              v-bind="props"
            >
              {{locale}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
            v-for="loc in availableLocales" 
            :key="`locale-${loc}`"
            :value="loc"
            @click="onSelectMenu(loc)"
            >
              <v-list-item-title>{{ loc }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
          <v-btn @click="push('CreateMode')" class="mr-2" variant="outlined">
            {{ t("create_a_product") }}
          </v-btn>
        <v-btn
          variant="outlined"
        >
        {{ t("log_in") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {useI18n} from 'vue-i18n'
import { useRouter } from 'vue-router'
const {t,availableLocales,locale} = useI18n({ useScope: 'global' });

const router = useRouter()
function push(name){
  router.push({
        name: name,
  })
}

function onSelectMenu(newLocale){
  locale.value = newLocale;
}
</script>
<style>
.cursor-point{
  cursor: pointer;
}
</style>