import React from "react";
import { useUserContext } from "../context/User";

function SocialSaver() {
    const {user} = useUserContext();
    return (
        <div>
            <div>Welcome to Social Saver!</div>
            <h1>Hello {user.name}!</h1>
        </div>
    );
};

export default SocialSaver;
