<script setup lang="ts">
/** Type definitions */
export type ButtonSize = 'small' | 'large' | 'default'
export type ButtonType = 'button' | 'submit' | 'reset'
export type ButtonTheme =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'link'

export interface ButtonProps {
  message?: string
  label?: string
  tag?: string
  size?: ButtonSize
  theme?: ButtonTheme
  loading?: boolean
  error?: boolean
  warning?: boolean
  disabled?: boolean
  type?: ButtonType
}

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  size: 'default',
  theme: 'default',
  loading: false,
  warning: false,
  error: false,
  disabled: false,
  type: 'button',
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function onClick(event: MouseEvent): void {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <component
    v-bind="$attrs"
    :is="tag"
    :class="[
      `b-button b-button--size-${size} b-button--theme-${theme}`,
      {
        'b-button--state-loading': loading,
        'b-button--state-disabled': disabled,
        'b-button--state-error': error,
        'b-button--state-warning': warning,
      },
    ]"
    @click="onClick"
    :disabled="loading || disabled"
    :type="type"
  >
    <div class="b-button__content">
      <slot name="icon-left" />
      <slot name="default">{{ label }}</slot>
      <slot name="icon-right" />
    </div>
    <slot name="message">{{ message }}</slot>
  </component>
</template>

<style lang="scss">
.b-button {
  box-sizing: border-box;
  border: none;
  position: relative;
  font-size: var(--b-button-font-size, 1rem);

  padding-inline: var(--b-button-padding-inline);
  padding-block: var(--b-button-padding-block);
  border-radius: var(--b-border-radius, 0.5rem);

  display: flex;
  align-items: center;
  gap: var(--b-button-gap, 0.5rem);

  &:focus-visible {
    outline: 2px solid var(--b-color-primary, var(--base-tertiary));
    outline-offset: 2px;
  }

  &:not(:disabled) {
    cursor: pointer;
  }

  &:where(:disabled) {
    cursor: not-allowed;
  }

  &__content {
    transition: 150ms var(--b-easing-function, var(--easing-function));
  }

  /* Sizes */
  &--size {
    &-default {
      --b-button-padding-block: 0.6rem;
      --b-button-padding-inline: 1rem;
    }

    &-small {
      --b-button-padding-block: 0.25rem;
      --b-button-padding-inline: 0.6rem;
    }
    &-large {
      --b-button-padding-block: 0.8rem;
      --b-button-padding-inline: 1rem;
      --b-button-font-size: 1.2rem;
    }
  }

  /* Themes */
  &--theme {
    &-default {
      background-color: transparent;
      color: var(--b-color-primary, var(--text-primary-1));

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: var(--b-color-slate, var(--base-primary));
        opacity: 0.06;
        z-index: -1;
      }

      &:not(:disabled):where(:hover, :focus-visible) {
        &::before {
          opacity: 0.1;
        }
      }

      &:not(:disabled):active {
        &::before {
          opacity: 0.12;
        }
      }
    }

    &-primary {
      background-color: var(--b-color-primary, var(--base-primary));
      color: var(--b-color-primary-contrast, var(--text-primary-1));

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background-color: var(--base-primary-2);
        opacity: 0;
        z-index: 1;
      }

      &:not(:disabled):where(:hover, :focus-visible) {
        &::before {
          opacity: 0.1;
        }
      }

      &:not(:disabled):active {
        &::before {
          opacity: 0.15;
        }
      }
    }

    &-secondary {
      background-color: transparent;
      color: var(--b-color-primary, var(--base-secondary));
      border: 1px solid var(--b-color-primary, var(--base-secondary));

      &:not(:disabled):active {
        background-color: transparent;
        border-color: var(--b-color-primary--active, var(--base-secondary));
      }
    }

    &-tertiary {
      background-color: transparent;
      color: var(--b-color-primary, var(--base-tertiary));
      border: 1px solid transparent;

      &:not(:disabled):where(:hover, :focus-visible) {
        border-color: var(--b-color-primary, var(--base-tertiary));
      }
    }

    &-link {
      padding: 0;
      color: var(--b-color-primary, var(--base-primary));

      &:not(:disabled):where(:hover, :focus-visible) {
        text-decoration: underline;
      }
    }
  }

  /* States */
  &--state {
    &-loading {
      cursor: wait;

      &:after {
        content: '';
        height: 0.75rem;
        aspect-ratio: 1;
        border-radius: 20rem;

        position: absolute;
        left: 50%;
        top: 50%;
        translate: -50% -50%;

        border: 2px solid transparent;
        border-right-color: currentColor;
        border-top-color: currentColor;

        animation: spin 1s linear infinite;
      }

      .b-button__content {
        opacity: 0;
        translate: 0 0.15rem;
      }
    }

    &-error {
      cursor: not-allowed;
      border: 2px solid var(--b-border, var(--base-error-3));
      background-color: var(--b-color-primary, var(--base-error-1));
    }

    &-warning {
      cursor: not-allowed;
      border: 2px solid var(--b-border, var(--base-warning-3));
      background-color: var(--b-color-primary, var(--base-warning-1));
    }

    &-disabled {
      opacity: 0.5;
    }
  }
}
</style>
