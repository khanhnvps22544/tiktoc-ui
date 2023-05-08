import { HeaderOnly } from '~/components/Layout';

import Following from '~/pages/Following';
import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
const publicRouter = [
  { path: '/', component: Home },
  { path: '/following', component: Following },
  { path: '/profile', component: Profile, layout: null },
  { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRouter = [];

export { publicRouter, privateRouter };
