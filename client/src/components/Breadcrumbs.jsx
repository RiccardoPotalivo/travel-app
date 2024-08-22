import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <li
                            key={to}
                            className={`breadcrumb-item ${index === pathnames.length - 1 ? 'active' : ''}`}
                            aria-current={index === pathnames.length - 1 ? 'page' : undefined}
                        >
                            {index === pathnames.length - 1 ? (
                                value
                            ) : (
                                <Link to={to}>{value}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
