import React from 'react';
import logo from '../../assets/images/logo.png';
import './styles.less';

const Header = () => {
    return (
        <div id="header">
            <img width="100" src={logo} alt=""/>
        </div>
    );
};
export default Header;