<script setup>
import axios from "axios";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { filterStudents } from "../util/filterStudents.js";
import StudentShowbox from "./StudentShowbox.vue";

const route = useRoute();

const ready = ref(false);
const students = ref([]);
const initProgress = ref(0);
const studentSelected = ref(false);

studentSelected.value = false;
axios
  .get("/config/json/students.json", {
    onDownloadProgress: (progressEvent) => {
      initProgress.value = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
    },
  })
  .then((response) => {
    try {
      students.value = response.data.sort((a, b) =>
        a.name.cn.localeCompare(b.name.cn, "zh-Hans-CN", {
          sensitivity: "accent",
        })
      );
    } catch (e) {
      students.value = response.data;
    }
    ready.value = true;
  })
  .catch((error) => {
    console.log(error);
  });

watch(
  () => route.path,
  (newRoute) => {
    studentSelected.value = newRoute !== "/archive";
  }
);

const studentsNameList = computed(() => {
  return students.value.map((student) => {
    return {
      id: student.id,
      allNames: [
        student.name.cn,
        student.name.jp,
        student.name.en,
        student.familyName.cn,
        student.familyName.jp,
        student.familyName.en,
        ...student.nickname,
      ],
    };
  });
});

function getCohortAttribute(attributeString, needSort = true) {
  const filtered = [];
  students.value.forEach((student) => {
    if (!filtered.includes(student[attributeString])) {
      filtered.push(student[attributeString]);
    }
  });
  if (needSort) {
    try {
      return filtered.sort((a, b) =>
        a.localeCompare(b, "zh-Hans-CN", { sensitivity: "accent" })
      );
    } catch (e) {
      return filtered;
    }
  }
  return filtered;
}

const armorTypes = {
  LightArmor: { name: "轻装甲", order: 1 },
  HeavyArmor: { name: "重装甲", order: 2 },
  Unarmed: { name: "神秘装甲", order: 3 },
};

function sortArmorType(a, b) {
  return armorTypes[a].order - armorTypes[b].order || -1;
}

const studentRarities = computed(() => getCohortAttribute("rarity", false));
const studentClubs = computed(() => getCohortAttribute("club"));
const studentAffiliations = computed(() => getCohortAttribute("affiliation"));
const studentTypes = computed(() => getCohortAttribute("type", false));
const studentArmorTypes = computed(() =>
  getCohortAttribute("armorType", false).sort(sortArmorType)
);

const studentNameFilter = ref("");
const appliedFilters = ref({
  searchString: studentNameFilter,
  rarity: [],
  club: [],
  affiliation: [],
  type: [],
  armorType: [],
});

watch(
  () => appliedFilters.value,
  (newFilters) => {
    console.log(newFilters);
  }
);

function isActivate(property, value) {
  return appliedFilters.value[property].includes(value) ? "active" : "";
}

function handleFilter(property, value) {
  if (appliedFilters.value[property].includes(value)) {
    appliedFilters.value[property] = appliedFilters.value[property].filter(
      (item) => item !== value
    );
  } else {
    appliedFilters.value[property].push(value);
  }
}

const filteredStudents = computed(() => {
  return filterStudents(
    appliedFilters.value,
    studentsNameList.value,
    students.value
  );
});
</script>

<template>
  <div class="fill-screen center">
    <div class="content-wrapper flex-vertical acrylic rounded">
      <div class="loading" v-if="!ready">
        <div class="spinner">
          <span>{{ initProgress }}%</span>
        </div>
      </div>
      <div id="student-selector-container" v-if="ready && !studentSelected">
        <input
          type="text"
          id="name-filter"
          :placeholder="studentNameFilter ? '' : '输入学生姓名进行搜索'"
          v-model="studentNameFilter"
          @focus="$event.target.select()"
        />
        <div id="student-filter">
          <div class="filter-group">
            <h2 class="filter-label">稀有度</h2>
            <div class="filter-options">
              <div
                class="filter-tag"
                role="checkbox"
                v-for="rarity in studentRarities"
                :class="isActivate('rarity', rarity)"
                :key="rarity"
                @click="handleFilter('rarity', rarity)"
              >
                ★ {{ rarity }}
              </div>
            </div>
          </div>

          <div class="filter-group">
            <h2 class="filter-label">学校</h2>
            <div class="filter-options">
              <div
                class="filter-tag"
                role="checkbox"
                v-for="affiliation in studentAffiliations"
                :class="isActivate('affiliation', affiliation)"
                :key="affiliation"
                @click="handleFilter('affiliation', affiliation)"
              >
                {{ affiliation }}
              </div>
            </div>
          </div>
          <div class="filter-group">
            <h2 class="filter-label">战术作用</h2>
            <div class="filter-options">
              <div
                class="filter-tag tactic-type"
                :class="`${studentType.toLowerCase()} ${isActivate(
                  'type',
                  studentType
                )}`"
                role="checkbox"
                v-for="studentType in studentTypes"
                :key="studentType"
                @click="handleFilter('type', studentType)"
              >
                {{ studentType }}
              </div>
            </div>
          </div>
          <div class="filter-group">
            <h2 class="filter-label">装甲类型</h2>
            <div class="filter-options">
              <div
                class="filter-tag armor-type"
                :class="`${armorType.toLowerCase()} ${isActivate(
                  'armorType',
                  armorType
                )}`"
                role="checkbox"
                v-for="armorType in studentArmorTypes"
                :key="armorType"
                @click="handleFilter('armorType', armorType)"
              >
                {{ armorTypes[armorType].name || armorType }}
              </div>
            </div>
          </div>
          <div class="filter-group">
            <h2 class="filter-label">社团</h2>
            <div class="filter-options">
              <div
                class="filter-tag"
                role="checkbox"
                v-for="club in studentClubs"
                :class="isActivate('club', club)"
                :key="club"
                @click="handleFilter('club', club)"
              >
                {{ club }}
              </div>
            </div>
          </div>
        </div>

        <div id="student-list">
          <router-link
            class="student-showcase"
            v-for="student in students"
            :key="student.id"
            :to="`/archive/${student.id}`"
            @click="studentSelected = true"
            v-show="filteredStudents.includes(student.id)"
          >
            <StudentShowbox :student-info="student" />
          </router-link>
        </div>
      </div>
      <router-view v-if="studentSelected" />
    </div>
  </div>
</template>

<style scoped lang="scss">
#student-selector-container {
  grid-gap: 1rem;
  display: grid;
  grid-template-columns: min-content auto;
  grid-template-areas:
    "name-filter name-filter"
    "filter list";
  justify-items: center;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}

#name-filter {
  grid-area: name-filter;
  border: none;
  border-radius: 0.5rem;
  background-color: #d7d9e1b3;
  padding: 0.5rem;
  width: calc(100% - 2rem);
  color: var(--color-text-glass-panel);
  font-size: 1.5rem;
  text-align: center;

  &:focus {
    outline: none;
    box-shadow: 0 0 0.5rem 2px #b3b3b3;
  }
}

#student-filter {
  display: flex;
  grid-area: filter;
  flex-direction: column;
  padding-left: 1rem;
  width: 20rem;
  overflow-y: scroll;
}

.filter-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.filter-tag {
  transition: all 0.175s ease-in-out;
  cursor: pointer;
  margin: 0.25rem;
  border-radius: 0.5rem;
  background-color: #ffffffb3;
  padding: 0.25rem 0.5rem;
  color: var(--color-text-dark);
  font-weight: bold;
  font-size: 1rem;
  user-select: none;

  &.active {
    background-color: var(--color-text-dark);
    color: var(--color-text-light);
  }
}

.tactic-type {
  font-weight: bolder;
  font-family: Bender, sans-serif;
  text-transform: uppercase;

  &.striker {
    color: var(--color-text-striker);

    &.active {
      background-color: var(--color-text-striker);
      color: var(--color-text-light);
    }
  }

  &.special {
    color: var(--color-text-special);

    &.active {
      background-color: var(--color-text-special);
      color: var(--color-text-light);
    }
  }
}

.armor-type {
  &.lightarmor {
    color: var(--color-text-light-armor);

    &.active {
      background-color: var(--color-text-light-armor);
      color: var(--color-text-light);
    }
  }
  &.heavyarmor {
    color: var(--color-text-heavy-armor);

    &.active {
      background-color: var(--color-text-heavy-armor);
      color: var(--color-text-light);
    }
  }
  &.unarmed {
    color: var(--color-text-unarmed);

    &.active {
      background-color: var(--color-text-unarmed);
      color: var(--color-text-light);
    }
  }
}

#student-list {
  grid-gap: 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 7rem);
  grid-auto-rows: min-content;
  grid-area: list;
  justify-content: space-between;
  content-visibility: auto;
  padding: 0 1rem 1rem 1rem;
  width: 100%;
  overflow-x: visible;
  overflow-y: scroll;
}

.student-showcase {
  display: inline-block;
  transition: all 0.375s ease-in-out;
  box-shadow: 0.2rem 0.2rem 0.5rem hsla(0deg, 0%, 0%, 0.1);
  border-radius: 0.5rem;
  width: fit-content;
  height: fit-content;
  text-decoration: none;

  &:hover {
    scale: 1.01;
    box-shadow: 0.2rem 0.2rem 1rem hsla(0deg, 0%, 0%, 0.3);
  }
}

.loading {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  & .spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: spin 1s linear infinite;
    border: 0.2rem solid;
    border-color: var(--color-text-dark) transparent;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;

    & span {
      animation: spin 1s linear infinite;
      animation-direction: reverse;
    }
  }
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
