<template>
  <div
    class="main-story-container fill-screen flex-vertical"
    v-if="!storySelected"
  >
    <story-line-container
      v-for="(story, index) in stories"
      :title="story.title"
      :avatar="story.avatar"
      :index="index"
      :sections="story.sections"
      :key="story.title"
    />
  </div>
  <router-view v-else />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { Story } from '../types/StoryJson';
import StoryLineContainer from './story/StoryLineContainer.vue';

const route = useRoute();

const storySelected = computed(() => !/\/mainStory\/?$/.test(route.path));

/* eslint-disable max-len */
const stories: Story[] = [
  {
    title: '序章',
    avatar: '/image/story_cover/prologue.webp',
    sections: [
      {
        title: '序章 1.1',
        story_id: 10001,
        description: {
          TextKr:
            '기묘한 내용의 꿈으로부터 깨어난 직후, 선생님은 총학생회의 간부인 나나가미 린으로부터 총학생회장이 사라졌다는 소식을 전해 듣는다. 총학생회장의 실종으로 인해 학원도시 키보토스는 혼란에 휩싸이게 되고, 이 혼란을 해결하기 위해 선생님은 학생회 임원들과 함께 샬레 동아리실로 향한다.',
          TextJp:
            '奇妙な夢から目覚めた[USERNAME]先生は、連邦生徒会の幹部である七神リンから、連邦生徒会長がいなくなったということを聞かされる。連邦生徒会長の失踪により、現在ここ学園都市キヴォトスは混乱に包まれているのだという。この混乱を解決するため、[USERNAME]先生は生徒会の役員たちと共にシャーレの部室へと向かった。',
          TextTh:
            'หลังจากตื่นขึ้นมาจากฝันประหลาด คุณครูก็ได้ฟังข่าวจากนานากามิ ริน\nที่เป็นสมาชิกบริหารองค์การนักเรียนเรื่องที่ประธานองค์การนักเรียนหายตัวไป\nเนื่องจากประธานองค์การหายตัวไป เมืองแห่งการศึกษาคิโวทอสจึงเกิด\nความโกลาหลขึ้น และเพื่อแก้ไขสิ่งที่เกิดขึ้น คุณครูกับสภานักเรียนจึง\nมุ่งหน้าไปยังห้องชมรมชาเล่ต์',
          TextCn:
            '从奇怪的梦中醒来之后的[USERNAME]老师从联邦学生会的干部七神凛那里听到学生会长失踪的消息。由于学生会长失踪，学园城市基沃托斯陷入了混乱。为了解决这场混乱，老师和学生会的干部一同前往夏莱办公室。',
          TextTw:
            '從莫名其妙的夢中醒來之後，老師從總學生會的幹部七神凛那裡聽到總學生會長消失的消息。由於總學生會長失蹤，學園城市奇普托斯陷入混亂。為了解決這場混亂，老師和學生會的幹部一同前往夏萊社團室。',
          TextEn:
            'Sensei wakes from a bizarre dream and learns from Nanakami Rin that the General Student Council president is missing. The Academy City, Kivotos, is in chaos. Sensei heads to the Schale club room in an attempt to resolve the situation.',
        },
      },
    ],
  },
];
/* eslint-enable max-len */
</script>

<style scoped lang="scss">
.main-story-container {
  margin-top: 24px;
}
</style>
