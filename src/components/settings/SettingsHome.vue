<template>
  <div id="settings-home" class="flex-vertical center fill-screen">
    <div class="settings-panel flex-vertical rounded-medium">
      <div class="settings-panel__row">
        <div class="settings-panel__row__text">
          <p>{{ t('language') }}</p>
        </div>
        <div class="settings-panel__row__action">
          <language-selector />
        </div>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__row__text">
          <p>{{ t('compatibleWithAppleDevice') }}</p>
          <p class="settings-panel__row__text__description">
            {{ t('compatibleWithAppleDeviceDescription') }}
          </p>
        </div>
        <div class="settings-panel__row__action">
          <neu-switch
            :checked="useMp3SwitchValue"
            @update:value="handleAppleCompatibleSwitchChange"
          />
        </div>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__row__text">
          <p>{{ t('useSuperSampling') }}</p>
          <p class="settings-panel__row__text__description">
            {{ t('useSuperSamplingDescription') }}
          </p>
        </div>
        <div class="settings-panel__row__action">
          <neu-switch
            :checked="useSuperSamplingSwitchValue"
            @update:value="handleSuperSamplingSwitchChange"
          />
        </div>
      </div>
      <div class="settings-panel__row">
        <div class="settings-panel__row__text">
          <p>{{ t('clearCacheText') }}</p>
          <p class="settings-panel__row__text__description">
            {{ t('clearCacheDescription') }}
          </p>
        </div>
        <div class="settings-panel__row__action">
          <div
            class="user-action-button rounded-small"
            role="button"
            @click="handleClearCache"
          >
            {{ t('clearCacheActionText') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSettingsStore } from '../../store/settings';
import LanguageSelector from '../widgets/LanguageSelector.vue';
import NeuSwitch from '../widgets/NeuUI/NeuSwitch.vue';

const { t } = useI18n();
const settingsStore = useSettingsStore();

const useMp3SwitchValue: Ref<boolean> = ref(settingsStore.getUseMp3);
const useSuperSamplingSwitchValue: Ref<boolean> = ref(
  settingsStore.getUseSuperSampling
);

function handleAppleCompatibleSwitchChange(value: boolean) {
  settingsStore.setUseMp3(value);
}

function handleSuperSamplingSwitchChange(value: boolean) {
  settingsStore.setUseSuperSampling(value);
}

function handleClearCache() {
  caches.keys().then(cacheNames => {
    const clearedCacheList: string[] = [];
    const clearableCaches = cacheNames.filter(
      cacheName => !cacheName.startsWith('workbox')
    );
    clearableCaches.forEach(cacheName => {
      console.log('Deleting cache: ' + cacheName);
      caches.delete(cacheName);
      clearedCacheList.push(cacheName);
    });

    alert('Cache cleared!\n' + clearedCacheList.join('\n'));
  });
}
</script>

<style scoped lang="scss">
.settings-panel {
  align-items: stretch;
  gap: 1rem;
  transition: all 0.375s ease-in-out;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: var(--color-card-background);
  padding: 20px;
  width: 100%;
  max-width: 600px;

  &__row {
    display: grid;
    grid-template-columns: auto max-content;
    flex: 1;
    width: 100%;

    &__text {
      font-weight: bold;

      &__description {
        color: #999;
        font-weight: normal;
        font-size: 0.8rem;
      }
    }

    &__action {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
