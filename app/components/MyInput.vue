<template>
  <UFormField :label="label" :name="name" :required="required" :help="help" :error="error" class="my-form-field"
    :style="labelColor ? `--label-color: ${labelColor}` : undefined">
    <div class="app-input-wrapper" :class="{ 'is-block': block }">
      <UInput :type="type" :placeholder="placeholder" :disabled="disabled" :model-value="modelValue"
        @update:model-value="onUpdate" class="app-input" :class="variantClass" />
      <slot />
    </div>
  </UFormField>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    label?: string;
    name?: string;
    placeholder?: string;
    type?: "text" | "email" | "password" | "number" | "tel";
    disabled?: boolean;
    block?: boolean;
    required?: boolean;
    help?: string;
    error?: string;
    labelColor?: string;
    variant?: "outline" | "solid" | "primary" | "secondary" | "danger";
  }>(),
  {
    type: "text",
    block: true,
    variant: "outline",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const onUpdate = (value: string | number) => {
  emit("update:modelValue", value);
};

const variantClass = computed(() => {
  switch (props.variant) {
    case "secondary":
      return "input-secondary";
    case "outline":
      return "input-outline";
    case "danger":
      return "input-danger";
    case "solid":
      return "input-solid";
    case "primary":
    default:
      return "input-primary";
  }
});

const {
  label,
  name,
  placeholder,
  type,
  disabled,
  block,
  required,
  help,
  error,
  labelColor,
  modelValue,
} = props;
</script>

<style scoped>
.my-form-field :deep([data-slot="label"]) {
  color: var(--label-color, var(--color-cornflower-900)) !important;
}

.my-form-field :deep([data-slot="label"]::after) {
  color: var(--color-primary) !important;
}

.app-input-wrapper {
  width: 100%;
}

.is-block .app-input {
  width: 100%;
  display: block;
}

.app-input {
  width: 100%;
}

.app-input :deep(input) {
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--color-cornflower-200);
  background-color: #ffffff;
  color: var(--color-cornflower-900);
  transition: border-color 150ms ease, box-shadow 150ms ease,
    background-color 150ms ease;
}

.app-input :deep(input:focus) {
  outline: none;
  border-color: var(--color-cornflower-400);
  box-shadow: 0 0 0 3px var(--color-cornflower-50);
}

.input-primary :deep(input) {
  border-color: var(--color-primary);
}

.input-primary :deep(input:focus) {
  border-color: var(--color-cornflower-700);
  box-shadow: 0 0 0 3px var(--color-cornflower-100);
}

.input-secondary :deep(input) {
  border-color: var(--color-secondary);
}

.input-secondary :deep(input:focus) {
  border-color: var(--color-cornflower-500);
  box-shadow: 0 0 0 3px var(--color-cornflower-100);
}

.input-outline :deep(input) {
  background-color: transparent;
  border-color: var(--color-primary);
  color: var(--color-cornflower-900);
}

.input-outline :deep(input:focus) {
  border-color: var(--color-cornflower-700);
  box-shadow: 0 0 0 3px var(--color-cornflower-50);
}

.input-solid :deep(input) {
  background-color: var(--color-cornflower-50);
  border-color: var(--color-cornflower-300);
}

.input-solid :deep(input:focus) {
  border-color: var(--color-cornflower-500);
  box-shadow: 0 0 0 3px var(--color-cornflower-100);
}

.input-danger :deep(input) {
  border-color: #ef4444;
}

.input-danger :deep(input:focus) {
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}

.app-input :deep(input:disabled) {
  opacity: 0.8;
  cursor: not-allowed;
}
</style>
