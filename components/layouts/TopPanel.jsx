import React, { useContext } from 'react';
import { Nav, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faNoteSticky, faHome } from '@fortawesome/free-solid-svg-icons';
import AppContext from '@/context/AppContext';
import { StatusControl } from '@/components/';

const navItems = _ => {
    const { currentInfo, getTotalProccessedUrl, getErrorListLength } = useContext(AppContext);
    return [
        {
            href: '/',
            face: 'Home',
            icon: faHome,
            variant: 'primary',
            data: currentInfo.remaining,
        },
        {
            href: '/logs/urls',
            face: 'Url Logs',
            icon: faNoteSticky,
            variant: 'success',
            data: getTotalProccessedUrl(),
        },
        {
            href: '/logs/errors',
            face: 'Error Logs',
            icon: faBomb,
            variant: 'danger',
            data: getErrorListLength(),
        }
    ]
};

const TopPanel = _ => {
    const navList = navItems().map(({ href, face, icon, variant, data }, index) => (
        <Nav.Item key={index}>
            <Link className={`nav-link text-${variant}`} href={href}>
                <span className='d-flex justify-content-center align-items-start'>
                    <div>
                        <FontAwesomeIcon className='mx-2' icon={icon} />
                        {face}
                    </div>
                    {data > 0 && <Badge className='mx-1' bg={variant} pill>{data}</Badge>}
                </span>
            </Link>
        </Nav.Item>
    ));

    return (
        <Nav className='justify-content-between' variant='tabs' defaultActiveKey={'/'}>
            <div className='d-flex'>
                {navList}
            </div>
            <div className='d-flex'>
                <StatusControl />
            </div>
        </Nav>
    );
}

export default TopPanel;