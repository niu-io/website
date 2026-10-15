import publicNavigation from './public-navigation.json';

// Website entry points; shared product navigation stays in its upstream snapshot.
export default [
  { label: 'Why Niu?', href: '/blog/why-niu/' },
  ...publicNavigation,
  { label: 'Dashboard', href: '/workspaces/default/' },
];
