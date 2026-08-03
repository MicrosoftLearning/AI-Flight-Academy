<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import BuildBar from "./BuildBar.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <BuildBar />
    </template>
  </Layout>
</template>
