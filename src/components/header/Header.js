import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from "axios";
import {logout} from '../../store/reducers'
import './header.css'
import {Navbar, Nav} from "react-bootstrap";

function Header() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.authReducer)
  const {user, isLogged} = auth
  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout')
      localStorage.removeItem('logInOnStartUp')
      dispatch(logout())
      window.location.href = '/'
    } catch (err) {
      window.location.href = '/'
    }
  }
  // const userLink = () => {
  //   return(
  //     <>
  //     <li className={'user_info'}>
  //       <Link to={`/users/${user.id}`}>
  //         <div>
  //           <img src={user.profilePicture} alt={''}/>
  //         </div>
  //         <div>
  //           {user.login}
  //           <br/>
  //           <span className={'user_role'}>{user.role}</span>
  //         </div>
  //       </Link>
  //     </li>
  //     <li>
  //       <Link to={'/'} onClick={handleLogout}>Logout</Link>
  //     </li>
  //     </>
  //   )
  // }
  const userLink = () => {
    return (
      <>
        <Nav.Link className={'user_info'} href={`/users/${user.id}`}>
          <div>
            <img src={user.profilePicture} alt={''}/>
          </div>
          <div>
            {user.login}<br/>
            <span className={'user_role'}>{user.role}</span>
          </div>
        </Nav.Link>
        <Nav.Link href={'/'} onSelect={handleLogout}>Logout</Nav.Link>
      </>
    )
  }
    return (
        // <header>
        //     <div className={'logo'}>
        //         <h1><Link to={'/'}>USOF</Link></h1>
        //     </div>
        //
        //     <ul className={'nav_menu'}>
        //         <li><Link to={'/posts'}>posts</Link></li>
        //         <li><Link to={'/categories'}>categories</Link></li>
        //         <li><Link to={'/users'}>users</Link></li>
        //       {
        //         isLogged
        //         ? userLink()
        //         : <li><Link to={'/login'}><i className="fas fa-user"></i>Sing in</Link></li>
        //       }
        //     </ul>
        // </header>
      <Navbar bg={'dark'} variant={'dark'} expand={'lg'}>
        <Navbar.Brand href={'/'}>USOF</Navbar.Brand>
        <Navbar.Toggle aria-controls={'basic-navbar-nav'} />
        <Navbar.Collapse id={'basic-navbar-nav'}>
          <Nav className={'ml-auto'}>
            <Nav.Link href={'/posts'}>Posts</Nav.Link>
            <Nav.Link href={'/categories'}>Categories</Nav.Link>
            <Nav.Link href={'/users'}>Users</Nav.Link>
            {isLogged ? userLink() :
            <Nav.Link href={'/login'}><i className="fas fa-user"></i>Sing in</Nav.Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default Header