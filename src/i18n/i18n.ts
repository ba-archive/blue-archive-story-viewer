/* eslint-disable quotes */
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'cn',
  fallbackLocale: 'en',
  messages: {
    cn: {
      language: '语言',
      compatibleWithAppleDevice: '兼容 Apple 设备',
      compatibleWithAppleDeviceDescription:
        '如果 Apple 设备不能正确播放音频，可以尝试开启此选项',
      useSuperSampling: '开启超分辨率',
      useSuperSamplingDescription: '加载使用 ESRGAN 进行超分辨率处理的素材',
      clearCacheText: '清除缓存',
      clearCacheDescription:
        '清除所有缓存内容。当没有遇到显示错误的时候不需要操作',
      clearCacheActionText: '清除',

      // momotalk
      replyTitle: '回复',
      favorScheduleTitle: '羁绊事件',
      goToFavorSchedule: '前往{name}的羁绊剧情',
    },
    jp: {
      language: '言語',
      compatibleWithAppleDevice: 'Apple デバイスとの互換性',
      compatibleWithAppleDeviceDescription:
        'Apple デバイスで音声が正しく再生されない場合は、このオプションを有効にしてみてください',
      useSuperSampling: 'スーパーサンプリングを有効にする',
      useSuperSamplingDescription:
        'イメージを読み込む時に，ESRGANでスケールアップしたイメージを読み込む',
      clearCacheText: 'キャッシュをクリア',
      clearCacheDescription:
        'すべてのキャッシュをクリアします。表示エラーが発生しない場合は操作する必要はありません',
      clearCacheActionText: 'クリア',

      // momotalk
      replyTitle: '返信',
      favorScheduleTitle: '絆ストーリ',
      goToFavorSchedule: '{name}の絆ストーリへ',
    },
    tw: {
      language: '語言',
      compatibleWithAppleDevice: '兼容 Apple 裝置',
      compatibleWithAppleDeviceDescription:
        '如果 Apple 裝置不能正確播放音頻，可以嘗試開啟此選項',
      useSuperSampling: '開啟超分辨率',
      useSuperSamplingDescription: '加載使用 ESRGAN 進行超分辨率處理的素材',
      clearCacheText: '清除快取',
      clearCacheDescription:
        '清除所有快取內容。當沒有遇到顯示錯誤的時候不需要操作',
      clearCacheActionText: '清除',

      // momotalk
      replyTitle: '回覆',
      favorScheduleTitle: '羈絆事件',
      goToFavorSchedule: '前往{name}的羈絆劇情',
    },
    en: {
      language: 'Language',
      compatibleWithAppleDevice: 'Apple device compatibility',
      compatibleWithAppleDeviceDescription:
        'Enable this option if Apple devices cannot play sound correctly',
      useSuperSampling: 'Enable super sampling',
      useSuperSamplingDescription: 'Load assets upscaled by ESRGAN',
      clearCacheText: 'Clear cache',
      clearCacheDescription:
        'Clear all cache. There is no need to do this when there is no display error',
      clearCacheActionText: 'Clear',

      // momotalk
      replyTitle: 'Reply',
      favorScheduleTitle: 'Relationship event',
      goToFavorSchedule: "Go to {name}'s relationship story",
    },
    kr: {
      language: '언어',
      compatibleWithAppleDevice: 'Apple 장치 호환성',
      compatibleWithAppleDeviceDescription:
        'Apple 장치에서 소리가 제대로 재생되지 않는 경우 이 옵션을 사용하십시오',
      useSuperSampling: '슈퍼 샘플링 사용',
      useSuperSamplingDescription: 'ESRGAN으로 확대 된 자산을로드',
      clearCacheText: '캐시 지우기',
      clearCacheDescription:
        '모든 캐시를 지웁니다. 표시 오류가 발생하지 않는 경우 이 작업을 수행할 필요가 없습니다',
      clearCacheActionText: '지우기',

      // momotalk
      replyTitle: '답장',
      favorScheduleTitle: '관계 이벤트',
      goToFavorSchedule: '{name}의 관계 이벤트로 이동',
    },
    th: {
      language: 'ภาษา',
      compatibleWithAppleDevice: 'ความเข้ากันได้กับอุปกรณ์ Apple',
      compatibleWithAppleDeviceDescription:
        'หากอุปกรณ์ Apple ไม่สามารถเล่นเสียงได้อย่างถูกต้อง คุณสามารถเปิดใช้งานตัวเลือกนี้ได้',
      useSuperSampling: 'เปิดใช้งานการสแมปตัวอย่างที่มีคุณภาพสูง',
      useSuperSamplingDescription: 'โหลดสื่อที่ถูกขยายขนาดโดย ESRGAN',
      clearCacheText: 'ล้างแคช',
      clearCacheDescription:
        'ล้างแคชทั้งหมด ไม่จำเป็นต้องทำเมื่อไม่มีข้อผิดพลาดในการแสดงผล',
      clearCacheActionText: 'ล้าง',

      // momotalk
      replyTitle: 'ตอบกลับ',
      favorScheduleTitle: 'เหตุการณ์ความสัมพันธ์',
      goToFavorSchedule: 'ไปที่เหตุการณ์ความสัมพันธ์ของ {name}',
    },
  },
});
