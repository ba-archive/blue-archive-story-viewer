<script setup lang="ts">
import axios from "axios";
import { Ref, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AppliedFilter } from "../types/AppliedFilter";
import { Student, StudentAttributes, StudentNames } from "../types/Student";
import { filterStudents } from "../util/filterStudents";
import StudentShowbox from "./StudentShowbox.vue";

const route = useRoute();

const ready = ref(false);
const students: Ref<Student[]> = ref([]);
const initProgress = ref(0);
const studentSelected = ref(false);

studentSelected.value = !/\/archive\/?$/.test(route.path);

axios
  .get("/config/json/students.json", {
    onDownloadProgress: (progressEvent) => {
      initProgress.value = Math.floor(
        ((progressEvent.loaded || 0) * 100) / (progressEvent.total || 1)
      );
    },
  })
  .then((response) => {
    try {
      students.value = response.data.sort((a: Student, b: Student) =>
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
    studentSelected.value = !/\/archive\/?$/.test(newRoute);
  }
);

const studentsNameList = computed<StudentNames[]>(() => {
  return students.value.map((student) => {
    return {
      id: student.id,
      allNames: [
        student.name.cn,
        student.name.jp,
        student.name.en,
        ...student.nickname,
      ],
    };
  });
});

function getCohortAttribute(
  attribute: string,
  needSort = true
): (string | number)[] {
  const filtered: (string | number)[] = [];
  students.value.forEach((student: Student) => {
    if (!filtered.includes(student[attribute as keyof StudentAttributes])) {
      filtered.push(student[attribute as keyof StudentAttributes]);
    }
  });
  if (needSort) {
    try {
      return filtered.sort((a, b) =>
        a
          .toString()
          .localeCompare(b.toString(), "zh-Hans-CN", { sensitivity: "accent" })
      );
    } catch (e) {
      return filtered;
    }
  }
  return filtered;
}

const armorTypes = [
  {
    string: "LightArmor",
    name: "轻装甲",
    order: 1,
  },
  {
    string: "HeavyArmor",
    name: "重装甲",
    order: 2,
  },
  {
    string: "Unarmed",
    name: "神秘装甲",
    order: 3,
  },
];

function sortArmorType(a: string | number, b: string | number): number {
  const armorTypeA = armorTypes.find((type) => type.string === a) || {
    name: "0",
  };
  const armorTypeB = armorTypes.find((type) => type.string === b) || {
    name: "1",
  };
  return armorTypeA.name.localeCompare(armorTypeB.name, "zh-Hans-CN", {
    sensitivity: "accent",
  });
}

const studentRarities = computed(() => getCohortAttribute("rarity", false));
const studentClubs = computed(() => getCohortAttribute("club"));
const studentAffiliations = computed(() => getCohortAttribute("affiliation"));
const studentTypes = computed(() => getCohortAttribute("type", false));
const studentArmorTypes = computed(() =>
  getCohortAttribute("armorType", false).sort((a, b) => sortArmorType(a, b))
);

const studentNameFilter = ref("");
const appliedFilters: Ref<AppliedFilter> = ref({
  searchString: studentNameFilter,
  rarity: [],
  club: [],
  affiliation: [],
  type: [],
  armorType: [],
});

const previousFilters = localStorage.getItem("appliedFilters")
  ? JSON.parse(localStorage.getItem("appliedFilters") || "{}")
  : false;
if (previousFilters) {
  appliedFilters.value.searchString = previousFilters.searchString || "";
  appliedFilters.value.rarity = previousFilters.rarity || [];
  appliedFilters.value.club = previousFilters.club || [];
  appliedFilters.value.affiliation = previousFilters.affiliation || [];
  appliedFilters.value.type = previousFilters.type || [];
  appliedFilters.value.armorType = previousFilters.armorType || [];
}

function isActivate(property: string, value: string | number) {
  return (
    appliedFilters.value[property as keyof AppliedFilter] as (string | number)[]
  ).includes(value)
    ? "active"
    : "";
}

function handleFilter(property: string, value: string | number) {
  if (
    (
      appliedFilters.value[property as keyof AppliedFilter] as (
        | string
        | number
      )[]
    ).includes(value)
  ) {
    (appliedFilters.value[property as keyof AppliedFilter] as (
      | string
      | number
    )[]) = (
      appliedFilters.value[property as keyof AppliedFilter] as (
        | string
        | number
      )[]
    ).filter((item: string | number) => item !== value);
  } else {
    (
      appliedFilters.value[property as keyof AppliedFilter] as (
        | string
        | number
      )[]
    ).push(value);
  }
}

const filteredStudents = computed<number[]>(() => {
  localStorage.setItem("appliedFilters", JSON.stringify(appliedFilters.value));
  return filterStudents(
    appliedFilters.value,
    studentsNameList.value,
    students.value
  );
});

function handleFocus(event: Event) {
  (event.target as HTMLInputElement).select();
}
</script>

<template>
  <div class="loading" v-if="!ready">
    <div class="spinner">
      <span>{{ initProgress }}%</span>
    </div>
  </div>
  <div id="student-selector-container" v-if="ready && !studentSelected">
    <input
      type="text"
      id="name-filter"
      class="rounded-medium"
      :placeholder="studentNameFilter ? '' : '在学生姓名/黑话内搜索…'"
      v-model="studentNameFilter"
      @focus="handleFocus"
      autocomplete="off"
    />
    <div id="student-filter">
      <div class="filter-group">
        <h2 class="filter-label">稀有度</h2>
        <div class="filter-options">
          <div
            class="filter-tag rounded-small"
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
            class="filter-tag rounded-small"
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
            class="filter-tag tactic-type rounded-small"
            :class="`${studentType.toString().toLowerCase()} ${isActivate(
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
            class="filter-tag armor-type rounded-small"
            :class="`${armorType.toString().toLowerCase()} ${isActivate(
              'armorType',
              armorType
            )}`"
            role="checkbox"
            v-for="armorType in studentArmorTypes"
            :key="armorType"
            @click="handleFilter('armorType', armorType)"
          >
            {{
              armorTypes.find((el) => armorType === el.string)?.name ||
              armorType
            }}
          </div>
        </div>
      </div>
      <div class="filter-group">
        <h2 class="filter-label">社团</h2>
        <div class="filter-options">
          <div
            class="filter-tag rounded-small"
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
        class="student-showcase rounded-small"
        v-for="student in students"
        :key="student.id"
        :to="`/archive/${student.id}/momotalk`"
        @click="studentSelected = true"
        v-show="filteredStudents.includes(student.id)"
      >
        <StudentShowbox :student-info="student" />
      </router-link>
    </div>
  </div>
  <router-view v-if="studentSelected" />
</template>

<style scoped lang="scss">
#student-selector-container {
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
  transition: all 0.125s ease-in-out;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border: none;
  background-color: #d7d9e1b3;
  padding: 0.5rem;
  width: calc(100% - 2rem);
  color: var(--color-text-glass-panel);
  font-size: 1.5rem;
  text-align: center;

  &:focus {
    outline: none;
    box-shadow: var(--style-shadow-near) inset;
  }
}

#student-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  width: 100%;
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

.filter-label {
  color: var(--color-text-main);
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
  box-shadow: var(--style-shadow-far);
  background-color: var(--color-tag-background);
  padding: 0.25rem 0.5rem;
  color: var(--color-text-main);
  font-weight: bold;
  font-size: 1rem;
  user-select: none;

  &.active {
    box-shadow: 0 0 0 transparent;
    background-color: var(--color-tag-active-background);
    color: var(--color-tag-active);
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
      color: var(--color-text-contrast);
    }
  }

  &.special {
    color: var(--color-text-special);

    &.active {
      background-color: var(--color-text-special);
      color: var(--color-text-contrast);
    }
  }
}

.armor-type {
  &.lightarmor {
    color: var(--color-text-light-armor);

    &.active {
      background-color: var(--color-text-light-armor);
      color: var(--color-text-contrast);
    }
  }
  &.heavyarmor {
    color: var(--color-text-heavy-armor);

    &.active {
      background-color: var(--color-text-heavy-armor);
      color: var(--color-text-contrast);
    }
  }
  &.unarmed {
    color: var(--color-text-unarmed);

    &.active {
      background-color: var(--color-text-unarmed);
      color: var(--color-text-contrast);
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
  height: available;
  overflow-y: scroll;
}

.student-showcase {
  display: inline-block;
  transition: all 0.375s ease-in-out;
  box-shadow: var(--style-shadow-far);
  width: fit-content;
  height: fit-content;
  text-decoration: none;

  &:hover {
    scale: 1.01;
    box-shadow: var(--style-shadow-farther);
  }
}

.loading {
  display: flex;
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
    border-color: var(--color-text-main) transparent;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    color: var(--color-text-main);

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
