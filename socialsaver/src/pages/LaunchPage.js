import React from 'react';
import { useUserContext } from '../context/User';
import SignInController from '../components/SignInController';
import SocialSaver from './SocialSaverPage';

const LaunchPage = () => {
    const { user } = useUserContext();

    return (
        <>
            {user ? <SocialSaver /> : <SignInController />}
        </>
    );
}

export default LaunchPage;
