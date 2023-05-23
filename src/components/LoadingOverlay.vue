<template>
  <div v-if="isLoading" class="loading-overlay">
    <div class="spinner"></div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useLoadingStore } from '../stores/loadingStore'

  export default defineComponent({
    name: 'LoadingOverlay',
    setup() {
      const loadingStore = useLoadingStore()
      const isLoading = computed(() => loadingStore.isLoading)

      return {
        isLoading,
      }
    },
  })
</script>

<style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid #ffffff;
    border-top-color: #000000;
    animation: spin 1s infinite linear;
    margin: 0 auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
