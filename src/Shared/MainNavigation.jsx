import React from "react";
import { NavLink } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import SpaIcon from "@mui/icons-material/Spa";
const StudentMainNav = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Home
        </Typography>
      </NavLink>
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Student's Feed
        </Typography>
      </NavLink>
      <NavLink
        to="/question"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Question Bank
        </Typography>
      </NavLink>
      <NavLink
        to="/market"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Market Place
        </Typography>
      </NavLink>
      <NavLink
        to="/alumni"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Alumni
        </Typography>
      </NavLink>

      <NavLink
        to="/tolet"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          TO-LET
        </Typography>
      </NavLink>
    </>
  );
};

const AlumniMainNav = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Home
        </Typography>
      </NavLink>
      <NavLink
        to="/alumnipanel"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Alumni Panel
        </Typography>
      </NavLink>
      <NavLink
        to="/feed"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Student's Feed
        </Typography>
      </NavLink>
      <NavLink
        to="/question"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Question Bank
        </Typography>
      </NavLink>
      <NavLink
        to="/market"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Market Place
        </Typography>
      </NavLink>
      <NavLink
        to="/alumni"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Alumni
        </Typography>
      </NavLink>

      <NavLink
        to="/tolet"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          TO-LET
        </Typography>
      </NavLink>
    </>
  );
};

const GuestMainNav = () => {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Home
        </Typography>
      </NavLink>
      <NavLink
        to="/market"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          Market Place
        </Typography>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `nav-link ${isActive ? "active-link" : ""}`
        }
      >
        <Typography variant="button" className="link" sx={{ mx: 2, my: 2 }}>
          About Us
        </Typography>
      </NavLink>
    </>
  );
};

export { GuestMainNav, StudentMainNav, AlumniMainNav };
