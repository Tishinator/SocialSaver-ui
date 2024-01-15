import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useUserContext } from '../context/User';
import "./css/Header.css"
import { useNavigate } from 'react-router-dom';


function Header() {
    const {user, setUser, logout} = useUserContext();
    let navigate = useNavigate();

    function logoutAndNavigate(){
        logout();
        navigate('/');
    }

  return (
    <Navbar variant="dark" bg="dark">
      <Container>
        <Navbar.Brand>Social Saver</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            { user ? <div>
                        <span className='sign-in-text'>Signed in as:</span><NavDropdown className='sign-in-text' title={user.name} menuVariant="dark">
                                                        <NavDropdown.Item onClick={logoutAndNavigate}>Logout</NavDropdown.Item>
                                                   </NavDropdown>
                    </div>: 
                    <div></div>}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;