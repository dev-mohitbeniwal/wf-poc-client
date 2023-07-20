'use client';

import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Authorize(Component) {
    return function ProtectedRoute(props) {
        const router = useRouter();
        const jwt = Cookies.get('jwt');

        if (!jwt) {
            router.replace('/login');
            return null;
        }
        
        return <Component {...props} />;
    }
}