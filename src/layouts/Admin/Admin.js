
import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/infabytes_logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

import { DataContext } from "contexts/DataContext";

import { transpose } from "csvUtils";

import date_ranges from '../../assets/data/dateranges.json';

import Papa from 'papaparse';

var ps;

function Admin(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  console.log('admin loaded');

  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(mainPanelRef.current, {
  //       suppressScrollX: true,
  //       wheelSpeed: 0.1
  //     });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //       document.documentElement.classList.add("perfect-scrollbar-off");
  //       document.documentElement.classList.remove("perfect-scrollbar-on");
  //     }
  //   };
  // });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return "Infaweb "+routes[i].name;
      }
    }
    return "InfaWeb";
  };

  let latest_daterange = date_ranges[date_ranges.length-1];
  
  const [dataLoading, setdataLoading] = React.useState(false);
  //initializing the data in state
  const [data, setData] = React.useState(undefined);
  
  React.useEffect(() => {
    setdataLoading(true);
    console.log('loading started adminjs mount');

    const fetchData = async()=>{
      Papa.parse(latest_daterange.url, {
        worker: true, // Don't bog down the main thread if its a big file,
        download: true,
        complete: await function(result, file) {
            console.log('parsing complete read admin', result);

            let data_arrays = transpose(result.data);            

            setData(data_arrays);

            setdataLoading(false);
        }
      });
    }

    fetchData();
    

  }, []);

  
    
  

  // setData(load_data(latest_daterange.url));
  const data_value = {data, dataLoading, setData, setdataLoading};

  

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (

        <DataContext.Provider value={data_value}>
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://www.infabytes.com/",
                text: "INFABYTES SOLUTIONS",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar

                logo={{
                  outterLink: "https://www.creative-tim.com/",
                  text: "Creative Tim",
                  imgSrc: logo,
                }}

                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              
                <Switch>
                  {getRoutes(routes)}
                  <Redirect from="*" to="/admin/dashboard" />
                </Switch>
              
              {
                // we don't want the Footer to be rendered on map page
                location.pathname === "/admin/maps" ? null : <Footer fluid />
              }
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          
        </React.Fragment>
        </DataContext.Provider>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
