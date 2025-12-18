<template>
  <UButton :type="type" :block="block" :loading="loading" class="app-button" :class="variantClass">
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
    variant?: "outline" | "solid" | "primary" | "secondary" | "danger";
  }>(),
  {
    label: "Sign In",
    block: true,
    type: "submit",
    variant: "primary",
  }
);

const variantClass = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "btn-secondary";
    case "outline":
      return "btn-outline";
    case "danger":
      return "btn-danger";
    case "solid":
      return "btn-solid";
    case "primary":
    default:
      return "btn-primary";
  }
});

const { label, loading, block, type } = props;
</script>

<style scoped>
.app-button {
  margin-top: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: transform 150ms ease, box-shadow 150ms ease, opacity 150ms ease;
}

.app-button:active {
  transform: translateY(1px);
}

.btn-primary {
  background-color: var(--color-cornflower-600) !important;
  border: 1px solid var(--color-cornflower-600);
  color: #ffffff;
}

.btn-primary:hover {
  background-color: var(--color-cornflower-700) !important;
  border-color: var(--color-cornflower-700);
}

.btn-secondary {
  background-color: var(--color-secondary);
  border: 1px solid var(--color-secondary);
  color: #1f2937;
}

.btn-secondary:hover {
  background-color: var(--color-cornflower-300);
  border-color: var(--color-cornflower-300);
}

.btn-outline {
  background-color: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn-outline:hover {
  background-color: var(--color-cornflower-50);
}

.btn-solid {
  background-color: var(--color-cornflower-500);
  border: 1px solid var(--color-cornflower-500);
  color: #ffffff;
}

.btn-solid:hover {
  background-color: var(--color-cornflower-600);
  border-color: var(--color-cornflower-600);
}

.btn-danger {
  background-color: #ef4444;
  border: 1px solid #ef4444;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #dc2626;
  border-color: #dc2626;
}
</style>