import { Outlet, Link, useLocation } from "react-router-dom"

const AuthLayout =()=> {
    const location = useLocation();
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="card w-96 bg-base-100 shadow-xl boarder border-white">
                <div className="card-body">
                    <div className="tabs tabs-boxed mb=4 justify-stretch">
                        <Link to="/auth/login" className={`tab w-full ${location.pathname == "/auth/login"? "tab-active" : ''}`}>
                            Login
                        </Link>
                        <Link to="/auth/signup" className={`tab w-full ${location.pathname == "/auth/signup"? "tab-active" : ''}`}>
                            Signup
                        </Link>
                    </div>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;