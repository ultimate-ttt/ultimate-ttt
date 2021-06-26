module.exports = {
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-links/register',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'none',
  },
};
