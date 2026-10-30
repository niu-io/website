import publicNavigation from './public-navigation.json';

// Website entry points; shared product navigation stays in its upstream snapshot.
export default [
  { label: 'Blog', href: '/blog/' },
  ...publicNavigation.filter(item => !['Why Niu?', 'Blog', 'API', 'SDK'].includes(item.label)),
];
