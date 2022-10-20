<script setup>
import { computed } from "vue";

const props = defineProps({
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

const availability = computed(() => {
  return !!(
    props.studentInfo.availability.momotalk ||
    props.studentInfo.availability.story
  );
});
</script>

<template>
  <div
    class="student-container"
    :class="availability ? '' : 'unavailable'"
    v-once
  >
    <img
      class="student-avatar"
      :src="getImagePath(studentInfo.id)"
      :alt="studentInfo.name.cn"
    />
    <div class="name-tag">{{ studentInfo.name.cn }}</div>
  </div>
</template>

<style scoped lang="scss">
.student-container {
  display: grid;
  position: relative;
  grid-template-areas: "avatar";
  place-items: center;
  border-radius: 0.5rem;
  overflow: hidden;

  &.unavailable {
    cursor: not-allowed;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      background-color: hsla(0deg, 0%, 0%, 0.3);
      width: 100%;
      height: 100%;
      content: "";
    }

    &::after {
      position: absolute;
      opacity: 0.8;
      filter: drop-shadow(0 0 1rem #fff);
      width: 25%;
      height: 25%;
      content: url("/src/assets/padlock.svg");
    }
  }
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
  color: var(--color-text-main);
  font-weight: bold;
  text-align: center;
}
</style>
