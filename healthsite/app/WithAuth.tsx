import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function WithAuth(WrappedComponent: React.ComponentType) {
    const AuthComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = localStorage.getItem('isLoggedIn');

            if(!isLoggedIn){
                router.push('/login')
            }
        }, [router])
       return <WrappedComponent {...props} />
    };

    return AuthComponent;
  
}

export default WithAuth