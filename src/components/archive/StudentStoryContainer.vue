<template>
  <div class="flex-vertical rounded-small">
    <div class="title">// 这里本应该展示{{ studentName }}的好感剧情</div>
    <router-link to="/contribute">
      <img
        class="hire"
        src="/src/assets/eat_people.webp"
        alt="代码滞销帮帮我们"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStudentStore } from '../../store/students';

const studentStore = useStudentStore();
const route = useRoute();

const student = computed(() => {
  const id = parseInt(route.params.id as string);
  return studentStore.getStudentById(id);
});

const studentName = computed(() => {
  return student.value?.name.cn;
});
</script>

<style scoped lang="scss">
img.hire {
  cursor: pointer;
  margin: 0 auto;
  max-width: 20rem;
}
</style>
