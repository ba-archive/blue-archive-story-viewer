<template>
  <div class="error-container">
    <img src="/src/assets/network-error.svg" alt="Network Error" />
    <div class="error-message">
      <p>页面走丢了！</p>
      <p>
        你可以
        <router-link to="/">返回首页</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>

<style scoped lang="scss">
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  user-select: none;

  img {
    width: 20rem;
  }

  p {
    text-align: center;
  }

  .error-content {
    margin-top: 1rem;
    color: #ff3d00;
  }
}

@media (max-width: 768px) {
  .error-container {
    word-wrap: anywhere;
    max-width: calc(100vw - 2rem);
  }
}
</style>
