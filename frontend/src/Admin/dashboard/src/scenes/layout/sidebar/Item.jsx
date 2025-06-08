/* eslint-disable react/prop-types */
import { MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import styled from '@emotion/styled';

const StyledMenuItem = styled(MenuItem)`
  .ps-menu-button {
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.1), 
        transparent);
      transition: left 0.5s ease;
    }
    
    &:hover:before {
      left: 100%;
    }
    
    /* Active state styling */
    &.ps-active {
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 60%;
        background: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
        border-radius: 0 4px 4px 0;
        box-shadow: 0 0 12px rgba(59, 130, 246, 0.6);
      }
    }
  }
`;

const Item = ({ title, path, icon }) => {
    const location = useLocation();
    const isActive = path === location.pathname;

    return (
        <StyledMenuItem
            component={<Link to={path} />}
            to={path}
            icon={icon}
            className={isActive ? 'ps-active' : ''}
            rootStyles={{
                color: isActive ? "#60A5FA" : "rgba(255, 255, 255, 0.9)",
                ".ps-menu-icon": {
                    color: isActive ? "#60A5FA !important" : "rgba(255, 255, 255, 0.7) !important",
                },
                ".ps-menu-label": {
                    color: isActive ? "#60A5FA !important" : "rgba(255, 255, 255, 0.9) !important",
                    fontWeight: isActive ? "600 !important" : "500 !important",
                },
            }}
        >
            {title}
        </StyledMenuItem>
    );
};

export default Item;