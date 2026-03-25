<template>
  <RouterView />
  <ToastMessages />
</template>

<script setup>
import { RouterView } from 'vue-router'
import ToastMessages from './components/ToastMessages.vue'
</script>
