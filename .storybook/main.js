module.exports = {
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions/preset',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/preset',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-viewport/register',
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'none',
  },
};
