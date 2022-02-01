/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import './AdminNavbar.styles.scss';

import date_ranges from '../../assets/data/dateranges.json';

import React, { useContext } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

//Papa parser for CSV files
import Papa from 'papaparse';

import { DataContext } from 'contexts/DataContext';

import { transpose } from 'csvUtils';

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
  Spinner
} from "reactstrap";

function AdminNavbar(props) {

  console.log('navbar loaded');  

  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);


  const [color, setcolor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  

  const { setdataLoading, dataLoading, setData } = useContext(DataContext);

  



  const daterange_click = (e)=>{
    e.preventDefault()
    console.log('Daterange clicked',e.target.dataset.url);
    load_data(e.target.dataset.url);
  }

  let latest_daterange = date_ranges[date_ranges.length-1];

  console.log('latest daterange: ',latest_daterange);

  const load_data = (url)=>{
    
    setdataLoading(true);

    Papa.parse(url, {
        worker: true, // Don't bog down the main thread if its a big file,
        download: true,
        complete: function(result, file) {

            let data_arrays = transpose(result.data);

            setData(data_arrays);

            // let p1_speed_array = [];

            // console.log(result.data[0][18], result.data[1][18]);

            // for (var i = 1; i < result.data.length-1; i++) {
            //   p1_speed_array.push(parseInt(result.data[i][18]));
            // }

            // let p1 = maxMinAvg(p1_speed_array);

            setdataLoading(false);
        }
    });
  }

  const {logo } = props;

  return (
    <>
    
    <DataContext.Consumer>
      {({changeData})=>(
        <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand className='navbar-logo' href="#pablo" onClick={(e) => e.preventDefault()}>
              <img src={logo.imgSrc} alt="react-logo" />
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <InputGroup className="search-bar">
                <Button color="link" onClick={toggleModalSearch}>
                  <i className="tim-icons icon-zoom-split" />
                  <span className="d-lg-none d-md-block">Search</span>
                </Button>
              </InputGroup>

              <UncontrolledDropdown group>
                <DropdownToggle caret color="secondary" className='small-btn' data-toggle="dropdown" size='sm'>
                  {
                   dataLoading?<Spinner/>:latest_daterange.daterange 
                  }
                </DropdownToggle>
                <DropdownMenu className="dropdown-black dropdown-menu-right">
                    
                    {
                      date_ranges.map((range, i)=>{
                        return(
                          <DropdownItem key={i} onClick={daterange_click} data-url={range.url}>
                            {range.daterange}
                          </DropdownItem>
                        )
                      })
                    }

                </DropdownMenu>
            </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li">
                    <DropdownItem className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      )}
    </DataContext.Consumer>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
