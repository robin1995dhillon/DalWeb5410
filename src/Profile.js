import React from "react";

const Profile = ({ firstName, lastName, email}) => {
    return (
        <React.Fragment>
        <h3>First Name: {firstName}</h3>
        <h3>Last Name: {lastName} </h3>
        <h3>Email : {email} </h3>
        </React.Fragment>
    );
}

export default Profile;