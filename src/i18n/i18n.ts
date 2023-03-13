/* eslint-disable quotes */
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  locale: 'cn',
  fallbackLocale: 'en',
  messages: {
    cn: {
      compatibleWithAppleDevice: '兼容 Apple 设备',
      compatibleWithAppleDeviceDescription:
        '如果 Apple 设备不能正确播放音频，可以尝试开启此选项',
      useSuperSampling: '开启超分辨率',
      useSuperSamplingDescription: '加载使用 ESRGAN 进行超分辨率处理的素材',
      replyTitle: '回复',
      favorScheduleTitle: '羁绊事件',
      goToFavorSchedule: '前往{name}的羁绊剧情',
    },
    jp: {
      compatibleWithAppleDevice: 'Apple デバイスとの互換性',
      compatibleWithAppleDeviceDescription:
        'Apple デバイスで音声が正しく再生されない場合は、このオプションを有効にしてみてください',
      useSuperSampling: 'スーパーサンプリングを有効にする',
      useSuperSamplingDescription:
        'イメージを読み込む時に，ESRGANでスケールアップしたイメージを読み込む',
      replyTitle: '返信',
      favorScheduleTitle: '絆ストーリ',
      goToFavorSchedule: '{name}の絆ストーリへ',
    },
    tw: {
      compatibleWithAppleDevice: '兼容 Apple 裝置',
      compatibleWithAppleDeviceDescription:
        '如果 Apple 裝置不能正確播放音頻，可以嘗試開啟此選項',
      useSuperSampling: '開啟超分辨率',
      useSuperSamplingDescription: '加載使用 ESRGAN 進行超分辨率處理的素材',
      replyTitle: '回覆',
      favorScheduleTitle: '羈絆事件',
      goToFavorSchedule: '前往{name}的羈絆劇情',
    },
    en: {
      compatibleWithAppleDevice: 'Apple device compatibility',
      compatibleWithAppleDeviceDescription:
        'Enable this option if Apple devices cannot play sound correctly',
      useSuperSampling: 'Enable super sampling',
      useSuperSamplingDescription: 'Load assets upscaled by ESRGAN',
      replyTitle: 'Reply',
      favorScheduleTitle: 'Relationship event',
      goToFavorSchedule: "Go to {name}'s relationship story",
    },
  },
});
