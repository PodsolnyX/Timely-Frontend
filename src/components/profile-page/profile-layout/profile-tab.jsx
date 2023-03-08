import { NavLink } from 'react-router-dom';
const ProfileTab = ({title, to}) => {
    return (<div className="col-sm-12 col-md-4">
        <NavLink to={to} className={({ isActive }) => isActive ? "active-link-profile" : "non-active-link-profile"}>
            <h5>{title}</h5>
        </NavLink>
    </div>)
}

export default ProfileTab;