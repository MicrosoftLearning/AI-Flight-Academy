<script setup lang="ts">
import DefaultTheme from "vitepress/theme";
import BuildBadge from "./BuildBadge.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <BuildBadge />
    </template>
  </Layout>
</template>
