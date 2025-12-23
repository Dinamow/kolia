<template>
  <UButton
    :type="type"
    :block="block"
    :loading="loading"
    :variant="variant"
    :color="color"
    :ui="buttonStyles"
    class="app-button"
    :class="buttonClass"
  >
    <slot>{{ label }}</slot>
  </UButton>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    label?: string;
    loading?: boolean;
    block?: boolean;
    type?: "button" | "submit" | "reset";
    variant?: "solid" | "outline" | "soft" | "ghost" | "link" | "subtle";
    color?:
      | "primary"
      | "secondary"
      | "success"
      | "info"
      | "warning"
      | "error"
      | "neutral";
    noMargin?: boolean;
  }>(),
  {
    label: "Sign In",
    block: true,
    type: "submit",
    variant: "solid",
    color: "primary",
  }
);

const buttonClass = computed(() => ({
  "no-margin": props.noMargin,
}));

const buttonStyles = {
  rounded: "rounded-lg",
  padding: {
    sm: "px-6 py-3",
  },
  base: "font-semibold tracking-wide transition-all duration-150 active:translate-y-px",
};
</script>

<style scoped>
.app-button {
  margin-top: 1.5rem;
}

.app-button.no-margin {
  margin-top: 0;
}
</style>
