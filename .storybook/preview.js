export const argTypes = {
  theme: { control: 'select', options: ['light', 'dark'] },
}

export const args = { theme: 'light' }

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
