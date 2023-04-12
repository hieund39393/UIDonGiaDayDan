import './app.css';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import NormalLoginForm from './pages/login/Login';
import { PrivateRoute } from '~/components/PrivateRoute';
import { useSelector } from 'react-redux';
import privateRoutes from '~/routes/route';
import { useCallback } from 'react';

function App() {
    const currentUser = useSelector((state) => state.currentUser);
    const renderRouters = useCallback(() => {
        return privateRoutes.map(({ path, title, component: Component, permissionCode, parentTitle }, index) => {
            return (
                <Route
                    key={index}
                    exact
                    path={path}
                    element={
                        <PrivateRoute
                            title={title}
                            parentTitle={parentTitle}
                            currentUser={currentUser}
                            permissionCode={permissionCode}
                        >
                            <Component />
                        </PrivateRoute>
                    }
                />
            );
        });
    }, []);

    return (
        <Router>
            <Routes>
                {renderRouters()}

                <Route
                    exac
                    path="/"
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                ></Route>
                <Route path="/login" element={<NormalLoginForm />} />
            </Routes>
        </Router>
    );
}

export default App;
