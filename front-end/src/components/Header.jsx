import React, {useState} from 'react';
import styled from 'styled-components';
import logo from '../asset/images/suhwagdam_logo.png';
import {Link} from 'react-router-dom';
import {RxHamburgerMenu} from "react-icons/rx";
import {IoCloseOutline} from "react-icons/io5";

const HeaderContainer = styled.div`
    border-bottom: 1px solid lightgray;
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    
    @media (max-width: 639px) {
        height: 100px;
    }
`;

const Logo = styled(Link)`
    margin: auto;
    height: 100px;
    justify-content: center;
    justify-items: center;
    left: 340px;
    top: 20px;
    display: flex;  
    
    @media (max-width: 1599px) {
        height: 90px;
    }
    @media (max-width: 1399px) {
        height: 90px;
    }
    @media (max-width: 1299px) {
        height: 80px;
    }
    @media (max-width: 1199px) {
        height: 70px;
    }

    @media (max-width: 849px) {
        height: 70px;
    }

    @media (max-width: 639px) {
        height: 65px;
        margin-left: 15px;
    }
`;

const Login = styled.div`
    width: 150px;
    height: 50px;
    align-items: center;
    justify-content: space-around;
    display: flex;
    padding: 0 20px 0 20px;
    font-size: 20px;
    margin: auto;

    P {
        margin: 0 5px;
        cursor: pointer;
        color: #404040;

        &:hover {
            color: #5AC463;
            text-decoration: underline;
        }
    }
    
    @media (max-width: 639px) {
        display: none;
    }
`;   

const HamburgerBtn = styled.div`
    display: none;

    @media (max-width: 639px) {
        /* border: 1px solid black; */
        width: 25px;
        height: 25px;
        display: block;
        position: absolute;
        right: 50px;
        top: 20px;
        font-size: 48px;
        color: #404040;
        z-index: 999;
    }
`;

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{width: '100%'}}>
            <HeaderContainer>
                <Logo to={'/'}><img style={{ width: '100%', height: '100%' }} src={ logo } alt='Suhwagdam Logo'></img></Logo>
                <HamburgerBtn onClick={ toggleMenu }>
                    { isOpen ? <IoCloseOutline /> : <RxHamburgerMenu />}
                </HamburgerBtn>
               
                <Login visible={ visible }>
                    <Link to='/login' style={{ textDecoration: 'none' }}><p>로그인</p></Link>
                    |
                    <Link to='/join' style={{ textDecoration: 'none' }}><p>회원가입</p></Link>
                </Login>
            </HeaderContainer>
            {/*<Sidebar isOpen={isOpen} />*/}
        </div>
    );
};

export default Header;