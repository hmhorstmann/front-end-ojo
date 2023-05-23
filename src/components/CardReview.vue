<template>
  <div class="review-card">
    <h3>{{ review.name }}</h3>
    <div class="subtitle">
      <p>Altura: {{ review.review }}cm</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Review } from '../interfaces/ReviewInterface'

  export default defineComponent({
    props: {
      review: {
        type: Object as () => Review,
        required: true,
      },
    },
    setup() {
      return {}
    },
  })
</script>

<style scoped>
  .review-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 268px;
    height: 140px;
    position: relative;
    border: 1px solid #cfcfcf;
    border-radius: 10px 10px 10px 10px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 4px;
    height: 33.52px;
    line-height: 33.52px;
    background: #ffc700;
    border-radius: 10px 10px 0px 0px;
    width: 100%;
    text-align: left;
    padding: 0 1rem;
  }

  .subtitle {
    font-size: 12px;
    padding: 1rem;
    text-align: left;
    box-sizing: border-box;
    width: 100%;
  }
</style>
