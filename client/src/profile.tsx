import { useEffect, useState } from 'react';
import './App.css';
import { getUserInfo } from './client';
import { ClientPrincipal } from './models';

const Profile = () => {
    const [clientPrincipal, setClientPrincipal] = useState<ClientPrincipal | undefined>(undefined);

    useEffect(() =>{
        const initialize = async () =>{
            const userInfo = await getUserInfo();
            setClientPrincipal(userInfo?.clientPrincipal);
        }

        initialize();
    }, [])

    if(!clientPrincipal){
        return <div className='profile'>
            <a href="/.auth/login/google" className="btn btn-link">Log In</a>
        </div>;
    } else{
        return <div className='profile'>
            <div >{clientPrincipal?.userDetails}</div>
            <a href="/.auth/logout" className="btn btn-link">Log Out</a>
        </div>
    }
}

export default Profile;