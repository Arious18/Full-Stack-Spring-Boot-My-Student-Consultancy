/* eslint-disable react/prop-types */
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { tokens } from "../../../theme.js";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import {
    BarChartOutlined,
    CalendarTodayOutlined,
    ContactsOutlined,
    DashboardOutlined,
    DonutLargeOutlined,
    HelpOutlineOutlined,
    MapOutlined,
    KeyboardArrowLeftOutlined,
    KeyboardArrowRightOutlined,
    PeopleAltOutlined,
    PersonOutlined,
    ReceiptOutlined,
    TimelineOutlined,
    WavesOutlined,
    SchoolOutlined,
    PublicOutlined,
    BusinessOutlined,
    BookOutlined,
    AssignmentOutlined,
    ImageOutlined,
} from "@mui/icons-material";
import avatar from "../../../assets/images/avatar.png";
import logo from "../../../assets/images/logo.png";
import Item from "./Item.jsx";
import { ToggledContext } from "../../../DashboardApp.jsx";
import styled from '@emotion/styled';

// Styled Components for Modern Sidebar with Glassmorphism Scrollbar
const SidebarWrapper = styled(Box)`
    position: relative;
    height: 100%;
`;

const ModernSidebar = styled(Sidebar)`
    .ps-sidebar-container {
        background: linear-gradient(180deg,
        rgba(12, 17, 78, 0.95) 0%,
        rgba(24, 11, 87, 0.95) 50%,
        rgba(18, 67, 115, 0.95) 100%) !important;
        backdrop-filter: blur(20px) !important;
        border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
        box-shadow: 20px 0 40px rgba(0, 0, 0, 0.3) !important;

        /* Beautiful Glassmorphism Scrollbar */
        overflow-y: auto !important;

        &::-webkit-scrollbar {
            width: 8px !important;
        }

        &::-webkit-scrollbar-track {
            background: linear-gradient(180deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.02) 100%) !important;
            border-radius: 8px !important;
            backdrop-filter: blur(10px) !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            margin: 4px !important;
        }

        &::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.6) 0%,
            rgba(139, 92, 246, 0.6) 100%) !important;
            border-radius: 8px !important;
            backdrop-filter: blur(20px) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3) !important;
            transition: all 0.3s ease !important;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.8) 0%,
            rgba(139, 92, 246, 0.8) 100%) !important;
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4) !important;
            transform: scale(1.1) !important;
        }

        &::-webkit-scrollbar-corner {
            background: transparent !important;
        }
    }

    .ps-sidebar-root {
        border: none !important;
    }
`;

const CollapseButton = styled(IconButton)`
    position: absolute !important;
    top: 20px !important;
    right: ${props => props.collapsed ? '-22px' : '-22px'} !important;
    z-index: 1001 !important;
    background: linear-gradient(135deg,
    rgba(59, 130, 246, 0.9) 0%,
    rgba(139, 92, 246, 0.9) 100%) !important;
    border: 2px solid rgba(255, 255, 255, 0.2) !important;
    color: #ffffff !important;
    width: 44px !important;
    height: 44px !important;
    min-width: 44px !important;
    backdrop-filter: blur(20px) !important;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4) !important;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;

    &:hover {
        background: linear-gradient(135deg,
        rgba(59, 130, 246, 1) 0%,
        rgba(139, 92, 246, 1) 100%) !important;
        transform: scale(1.1) !important;
        border-color: rgba(255, 255, 255, 0.4) !important;
        box-shadow: 0 12px 35px rgba(59, 130, 246, 0.6) !important;
    }

    & .MuiSvgIcon-root {
        font-size: 24px !important;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
`;

const BrandContainer = styled(Box)`
    background: linear-gradient(135deg,
    rgba(18, 67, 115, 0.8) 0%,
    rgba(24, 11, 87, 0.8) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 20px;
    margin: 20px 16px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border-color: rgba(255, 255, 255, 0.2);
    }
`;

const UserProfile = styled(Box)`
    background: linear-gradient(135deg,
    rgba(18, 67, 115, 0.6) 0%,
    rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px;
    margin: 16px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        border-color: rgba(255, 255, 255, 0.2);
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 80px !important;
    height: 80px !important;
    margin: 0 auto 16px auto !important;
    border: 3px solid rgba(255, 255, 255, 0.2) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    transition: all 0.3s ease !important;

    &:hover {
        transform: scale(1.05);
        border-color: rgba(255, 255, 255, 0.4) !important;
    }
`;

const BrandText = styled(Typography)`
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    font-weight: 800 !important;
    font-size: 24px !important;
    letter-spacing: 2px !important;
    text-transform: uppercase !important;
    margin: 0 !important;
    text-shadow: 0 2px 10px rgba(255, 255, 255, 0.1) !important;
`;

const UserName = styled(Typography)`
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%) !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
    background-clip: text !important;
    font-weight: 700 !important;
    margin-bottom: 4px !important;
`;

const UserRole = styled(Typography)`
    color: rgba(193, 204, 223, 0.8) !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    padding: 6px 16px !important;
    background: rgba(59, 130, 246, 0.2) !important;
    border-radius: 25px !important;
    display: inline-block !important;
    border: 1px solid rgba(59, 130, 246, 0.3) !important;
    backdrop-filter: blur(10px) !important;
`;

const SectionTitle = styled(Typography)`
    color: rgba(255, 255, 255, 0.7) !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 1.5px !important;
    margin: 32px 20px 16px 20px !important;
    position: relative !important;

    &:before {
        content: '';
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #3B82F6, #8B5CF6);
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
    }
`;

const MenuContainer = styled(Menu)`
    .ps-menu-button {
        margin: 6px 12px !important;
        border-radius: 16px !important;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        border: 1px solid transparent !important;
        backdrop-filter: blur(10px) !important;

        &:hover {
            background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.25) 0%,
            rgba(139, 92, 246, 0.25) 100%) !important;
            border-color: rgba(255, 255, 255, 0.15) !important;
            transform: translateX(8px) !important;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
        }

        &.ps-active {
            background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.4) 0%,
            rgba(139, 92, 246, 0.4) 100%) !important;
            border-color: rgba(59, 130, 246, 0.6) !important;
            box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4) !important;
            transform: translateX(4px) !important;

            .ps-menu-icon,
            .ps-menu-label {
                color: #60A5FA !important;
            }
        }
    }

    .ps-menu-icon {
        color: rgba(255, 255, 255, 0.7) !important;
        font-size: 22px !important;
        transition: all 0.3s ease !important;
    }

    .ps-menu-label {
        color: rgba(255, 255, 255, 0.9) !important;
        font-weight: 500 !important;
        font-size: 15px !important;
        transition: all 0.3s ease !important;
    }
`;

const StatusIndicator = styled(Box)`
    margin: 32px 16px 20px 16px;
    padding: 20px;
    background: linear-gradient(135deg,
    rgba(16, 185, 129, 0.15) 0%,
    rgba(5, 150, 105, 0.15) 100%);
    border: 1px solid rgba(16, 185, 129, 0.4);
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px rgba(16, 185, 129, 0.2);
    }
`;

const PulsingDot = styled(Box)`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #10B981;
    box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
    animation: pulse 2s infinite;

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
            transform: scale(1);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.1);
        }
    }
`;

const StatusText = styled(Typography)`
    color: #34D399 !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
`;

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { toggled, setToggled } = useContext(ToggledContext);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <SidebarWrapper>
            <CollapseButton
                collapsed={collapsed}
                onClick={() => setCollapsed(!collapsed)}
            >
                {collapsed ? <KeyboardArrowRightOutlined /> : <KeyboardArrowLeftOutlined />}
            </CollapseButton>

            <ModernSidebar
                rootStyles={{
                    border: 0,
                    height: "100%",
                }}
                collapsed={collapsed}
                onBackdropClick={() => setToggled(false)}
                toggled={toggled}
                breakPoint="md"
            >
                {/* Brand Header */}
                {!collapsed && (
                    <BrandContainer>
                        <BrandText>
                            TmTalyp
                        </BrandText>
                    </BrandContainer>
                )}

                {/* User Profile */}
                {!collapsed && (
                    <UserProfile>
                        <StyledAvatar
                            alt="avatar"
                            src={avatar}
                        />
                        <Box>
                            <UserName variant="h5">
                                Omruzak
                            </UserName>
                            <UserRole>
                                VP Fancy Admin
                            </UserRole>
                        </Box>
                    </UserProfile>
                )}

                <Box mb={3} pl={collapsed ? undefined : "0"}>
                    {/* Main Navigation */}
                    <MenuContainer
                        menuItemStyles={{
                            button: {
                                ":hover": {
                                    background: "transparent",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                            },
                        }}
                    >
                        <Item
                            title="Main Page"
                            path="/"
                            colors={colors}
                            icon={<DashboardOutlined />}
                        />
                    </MenuContainer>

                    {/* Data Section */}
                    <SectionTitle>
                        {!collapsed ? "Data Management" : ""}
                    </SectionTitle>
                    <MenuContainer
                        menuItemStyles={{
                            button: {
                                ":hover": {
                                    background: "transparent",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                            },
                        }}
                    >
                        <Item
                            title="Dashboard"
                            path="/dashboard"
                            colors={colors}
                            icon={<BarChartOutlined />}
                        />
                        <Item
                            title="Manage Team"
                            path="/dashboard/users"
                            colors={colors}
                            icon={<PeopleAltOutlined />}
                        />
                        <Item
                            title="Countries"
                            path="/dashboard/AdminCountries"
                            colors={colors}
                            icon={<PublicOutlined />}
                        />
                        <Item
                            title="Universities"
                            path="/dashboard/AdminUniversities"
                            colors={colors}
                            icon={<SchoolOutlined />}
                        />
                        <Item
                            title="Faculties"
                            path="/dashboard/AdminFaculties"
                            colors={colors}
                            icon={<BusinessOutlined />}
                        />
                        <Item
                            title="Fields"
                            path="/dashboard/AdminFields"
                            colors={colors}
                            icon={<BookOutlined />}
                        />
                        <Item
                            title="Application Forms"
                            path="/dashboard/AdminForm"
                            colors={colors}
                            icon={<AssignmentOutlined />}
                        />
                    </MenuContainer>

                    {/* Content Section */}
                    <SectionTitle>
                        {!collapsed ? "News" : ""}
                    </SectionTitle>
                    <MenuContainer
                        menuItemStyles={{
                            button: {
                                ":hover": {
                                    background: "transparent",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                            },
                        }}
                    >
                        <Item
                            title="News"
                            path="/dashboard/adminNews"
                            colors={colors}
                            icon={<ImageOutlined />}
                        />
                    </MenuContainer>

                    {/* Jobs Section */}
                    <SectionTitle>
                        {!collapsed ? "Jobs" : ""}
                    </SectionTitle>
                    <MenuContainer
                        menuItemStyles={{
                            button: {
                                ":hover": {
                                    background: "transparent",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                            },
                        }}
                    >
                        <Item
                            title="Job Management"
                            path="/dashboard/adminJobs"
                            colors={colors}
                            icon={<ImageOutlined />}
                        />
                        <Item
                            title="Job Applications"
                            path="/dashboard/adminJobApplication"
                            colors={colors}
                            icon={<AssignmentOutlined />}
                        />
                    </MenuContainer>

                    {/* Contact & Info Section */}
                    <SectionTitle>
                        {!collapsed ? "Contact & Info" : ""}
                    </SectionTitle>
                    <MenuContainer
                        menuItemStyles={{
                            button: {
                                ":hover": {
                                    background: "transparent",
                                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                },
                            },
                        }}
                    >
                        <Item
                            title="Hero Images"
                            path="/dashboard/heroes"
                            colors={colors}
                            icon={<ImageOutlined />}
                        />
                        <Item
                            title="Calendar"
                            path="/dashboard/calendar"
                            colors={colors}
                            icon={<CalendarTodayOutlined />}
                        />
                        <Item
                            title="FAQ Page"
                            path="/dashboard/faq"
                            colors={colors}
                            icon={<HelpOutlineOutlined />}
                        />
                    </MenuContainer>

                    {/* System Status Indicator */}
                    {!collapsed && (
                        <StatusIndicator>
                            <PulsingDot />
                            <StatusText>
                                System Online
                            </StatusText>
                        </StatusIndicator>
                    )}
                </Box>
            </ModernSidebar>
        </SidebarWrapper>
    );
};

export default SideBar;