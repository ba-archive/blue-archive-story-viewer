<script setup>
defineProps({
  studentInfo: {
    type: Object,
    required: true,
    default: () => {
      return {
        id: 0,
        familyName: {
          cn: "",
          jp: "",
          en: "",
        },
        name: {
          cn: "",
          jp: "",
          en: "",
        },
        nickname: [],
        rarity: 1,
        club: "",
        affiliation: "",
        type: "Main",
        armorType: "LightArmor",
        weapon: "AR",
        availability: {
          momotalk: false,
          story: false,
        },
      };
    },
  },
});

function getImagePath(id) {
  return `/image/avatar_students/${id}.webp`;
}
</script>

<template>
  <div class="student-container" v-once>
    <img
      class="student-avatar"
      :src="getImagePath(studentInfo.id)"
      :alt="studentInfo.name.cn"
    />
    <div class="name-tag">{{ studentInfo.name.cn }}</div>
  </div>
</template>

<style scoped>
.student-container {
  display: grid;
  grid-template-areas: "avatar";
  place-items: center;
  border-radius: 0.5rem;
  overflow: hidden;
}

.student-avatar {
  grid-area: avatar;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name-tag {
  grid-area: avatar;
  align-self: end;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: var(--color-name-tag);
  padding: 0.2rem 0;
  width: 100%;
  color: var(--color-text-dark);
  font-weight: bold;
  text-align: center;
}
</style>
