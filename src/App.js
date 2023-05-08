import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { publicRouter } from '~/routes';
import { LayoutDefault } from './components/Layout';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRouter.map((route, index) => {
            let Layout = LayoutDefault;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
