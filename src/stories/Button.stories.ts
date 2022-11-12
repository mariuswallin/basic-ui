import Button from '../../src/components/Button/Button.vue'

import type { Meta, StoryFn } from '@storybook/vue3'

const argTypes = {
  size: {
    control: 'select',
    options: ['small', 'large'],
  },
}

export default {
  title: 'Button',
  component: Button,
  argTypes,
} as Meta<typeof Button>

export const Small: StoryFn = {
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args" />',
  }),
  args: {
    label: 'Button',
  },
}

// export const Secondary: Story = {
//   render: (args) => ({
//     components: { Button },
//     setup() {
//       return { args }
//     },
//     template: '<Button v-bind="args" />',
//   }),
//   args: {
//     ...Primary.args,
//     label: '😄👍😍💯',
//   },
// }

// message?: string
// label?: string
// tag?: string
// size?: ButtonSize
// theme?: ButtonTheme
// loading?: boolean
// error?: boolean
// warning?: boolean
// disabled?: boolean
// type?: ButtonType
