module.exports = {
  stories: ['../src/**/*.story.@(ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-links/register',
    '@storybook/addon-knobs/preset', // TODO remove this dependency as this will be unsupported in Storybook 7
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'none',
  },
};
