import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  MenuOutlined,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
  SearchOutlined,
  LogoutOutlined,
  DashboardOutlined,
  EmailOutlined,
} from "@mui/icons-material";
import { ToggledContext } from "../../../DashboardApp.jsx";

// Modern Styled Components with Glassmorphism Design
const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const MenuButton = styled.button`
  display: ${props => props.isMobile ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: ${props => props.isVisible ? 'flex' : 'none'};
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;
  min-width: 280px;

  &:focus-within {
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 466px) {
    display: ${props => props.isVisible && props.isExpanded ? 'flex' : 'none'};
    position: absolute;
    top: 60px;
    left: 16px;
    right: 16px;
    min-width: auto;
    z-index: 1000;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  border: none;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%);
  }
`;

const MobileSearchButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 466px) {
    display: flex;
  }
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 18px;
  height: 18px;
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: #ffffff;
  border: 2px solid rgba(24, 11, 87, 0.8);
`;

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  min-width: 220px;
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 1000;
`;

const DropdownHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.div`
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
`;

const UserRole = styled.div`
  color: #c1ccdf;
  font-size: 12px;
  opacity: 0.8;
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }

  &:last-child {
    border-bottom: none;
  }

  .icon {
    opacity: 0.7;
  }
`;

const NotificationPanel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 320px;
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  z-index: 1000;
`;

const NotificationHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
`;

const NotificationTitle = styled.h3`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
`;

const NotificationList = styled.div`
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const NotificationItem = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const NotificationText = styled.div`
  color: #e2e8f0;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
`;

const NotificationTime = styled.div`
  color: #c1ccdf;
  font-size: 12px;
  opacity: 0.7;
`;

const EmptyNotifications = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: #c1ccdf;

  .icon {
    font-size: 32px;
    margin-bottom: 12px;
    opacity: 0.5;
  }

  .text {
    font-size: 14px;
    opacity: 0.8;
  }
`;

const Navbar = () => {
  const { toggled, setToggled } = useContext(ToggledContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isXsDevice, setIsXsDevice] = useState(window.innerWidth <= 466);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      text: "New application submitted for Computer Science program",
      time: "2 minutes ago",
      type: "application"
    },
    {
      id: 2,
      text: "University approval status updated",
      time: "1 hour ago",
      type: "update"
    },
    {
      id: 3,
      text: "System maintenance scheduled for tonight",
      time: "3 hours ago",
      type: "system"
    }
  ];

  // Sample user data
  const user = {
    name: "John Admin",
    role: "Administrator",
    avatar: "JA"
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsXsDevice(window.innerWidth <= 466);
    };

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Implement search functionality here
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMobileSearch = () => {
    setSearchExpanded(!searchExpanded);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout functionality here
  };

  return (
      <NavbarContainer>
        <LeftSection>
          <MenuButton
              isMobile={isMobile}
              onClick={() => setToggled(!toggled)}
          >
            <MenuOutlined />
          </MenuButton>

          {/*<SearchContainer isVisible={!isXsDevice} isExpanded={searchExpanded}>*/}
          {/*  <SearchInput*/}
          {/*      placeholder="Search applications, users, universities..."*/}
          {/*      value={searchTerm}*/}
          {/*      onChange={(e) => setSearchTerm(e.target.value)}*/}
          {/*      onKeyPress={handleSearchKeyPress}*/}
          {/*  />*/}
          {/*  <SearchButton onClick={handleSearch}>*/}
          {/*    <SearchOutlined />*/}
          {/*  </SearchButton>*/}
          {/*</SearchContainer>*/}

          {searchExpanded && isXsDevice && (
              <SearchContainer isVisible={true} isExpanded={searchExpanded}>
                <SearchInput
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                />
                <SearchButton onClick={handleSearch}>
                  <SearchOutlined />
                </SearchButton>
              </SearchContainer>
          )}
        </LeftSection>

        <RightSection>
          {isXsDevice && (
              <MobileSearchButton onClick={toggleMobileSearch}>
                <SearchOutlined />
              </MobileSearchButton>
          )}

          <DropdownContainer ref={notificationRef}>
            <IconButton onClick={() => setShowNotifications(!showNotifications)}>
              <NotificationsOutlined />
              {notifications.length > 0 && (
                  <NotificationBadge>{notifications.length}</NotificationBadge>
              )}
            </IconButton>

            <NotificationPanel isOpen={showNotifications}>
              <NotificationHeader>
                <NotificationTitle>Notifications</NotificationTitle>
              </NotificationHeader>
              <NotificationList>
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationItem key={notification.id}>
                          <NotificationText>{notification.text}</NotificationText>
                          <NotificationTime>{notification.time}</NotificationTime>
                        </NotificationItem>
                    ))
                ) : (
                    <EmptyNotifications>
                      <div className="icon">🔔</div>
                      <div className="text">No new notifications</div>
                    </EmptyNotifications>
                )}
              </NotificationList>
            </NotificationPanel>
          </DropdownContainer>

          <IconButton>
            <SettingsOutlined />
          </IconButton>

          <DropdownContainer ref={userMenuRef}>
            <IconButton onClick={() => setShowUserMenu(!showUserMenu)}>
              <PersonOutlined />
            </IconButton>

            <DropdownMenu isOpen={showUserMenu}>
              <DropdownHeader>
                <UserInfo>
                  <UserAvatar>{user.avatar}</UserAvatar>
                  <UserDetails>
                    <UserName>{user.name}</UserName>
                    <UserRole>{user.role}</UserRole>
                  </UserDetails>
                </UserInfo>
              </DropdownHeader>

              <DropdownItem onClick={() => console.log('Dashboard clicked')}>
                <DashboardOutlined className="icon" />
                Dashboard
              </DropdownItem>

              <DropdownItem onClick={() => console.log('Profile clicked')}>
                <PersonOutlined className="icon" />
                My Profile
              </DropdownItem>

              <DropdownItem onClick={() => console.log('Messages clicked')}>
                <EmailOutlined className="icon" />
                Messages
              </DropdownItem>

              <DropdownItem onClick={() => console.log('Settings clicked')}>
                <SettingsOutlined className="icon" />
                Settings
              </DropdownItem>

              <DropdownItem onClick={handleLogout}>
                <LogoutOutlined className="icon" />
                Logout
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
        </RightSection>
      </NavbarContainer>
  );
};

export default Navbar;