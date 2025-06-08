import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useAuth } from "../../../../../Auth/components/AuthContext";

// Modern Styled Components with Glassmorphism Design
const Container = styled.div`
    padding: 24px;
    background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
    min-height: 100vh;
    color: #ffffff;
`;

const HeaderSection = styled.div`
    margin-bottom: 32px;
`;

const PageTitle = styled.h1`
    color: #ffffff;
    margin-bottom: 8px;
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: flex;
    align-items: center;
    gap: 12px;

    &:before {
        content: '🎭';
        font-size: 28px;
        -webkit-text-fill-color: initial;
    }
`;

const PageSubtitle = styled.p`
    color: #c1ccdf;
    margin-bottom: 16px;
    font-size: 16px;
    opacity: 0.9;
`;

const ActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const StatItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #c1ccdf;
    font-size: 14px;
    font-weight: 500;

    .icon {
        font-size: 16px;
        opacity: 0.8;
    }

    .value {
        color: #ffffff;
        font-weight: 700;
    }
`;

const AddButton = styled.button`
    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }

    .icon {
        font-size: 16px;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
`;

const HeroesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
    margin-bottom: 24px;
`;

const HeroCard = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
    }
`;

const HeroImageContainer = styled.div`
    position: relative;
    height: 200px;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-color: #1a1d4a;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
                to bottom,
                rgba(0,0,0,0) 0%,
                rgba(0,0,0,0.3) 50%,
                rgba(0,0,0,0.7) 100%
        );
    }
`;

const HeroOverlay = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    color: white;
    z-index: 2;
`;

const HeroTitle = styled.h3`
    margin: 0 0 8px 0;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroDescription = styled.p`
    margin: 0;
    font-size: 14px;
    opacity: 0.9;
    color: #e2e8f0;
    line-height: 1.4;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const HeroIcon = styled.img`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 40px;
    height: 40px;
    object-fit: contain;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    padding: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatusBadge = styled.div`
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: ${props => props.active ?
            'linear-gradient(135deg, rgba(16, 185, 129, 0.8) 0%, rgba(5, 150, 105, 0.8) 100%)' :
            'linear-gradient(135deg, rgba(239, 68, 68, 0.8) 0%, rgba(220, 38, 38, 0.8) 100%)'
    };
    color: #ffffff;
`;

const OrderBadge = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
    padding: 6px 10px;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.2);
`;

const HeroCardActions = styled.div`
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.3) 0%, rgba(24, 11, 87, 0.3) 100%);
`;

const ActionButton = styled.button`
    background: ${props => props.$variant === 'edit' ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .icon {
        font-size: 14px;
    }
`;

const EmptySlot = styled.div`
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
    backdrop-filter: blur(20px);
    border: 2px dashed rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    height: 284px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #c1ccdf;

    &:hover {
        border-color: rgba(59, 130, 246, 0.5);
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.1) 100%);
        transform: translateY(-2px);
    }

    .icon {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.6;
    }

    .text {
        font-size: 16px;
        font-weight: 600;
        text-align: center;
    }

    .subtext {
        font-size: 14px;
        opacity: 0.7;
        margin-top: 4px;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
`;

const ModalContent = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 32px;
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const ModalTitle = styled.h2`
    color: #ffffff;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
    background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const FormLabel = styled.label`
    display: block;
    color: #c1ccdf;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FormInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const FormTextArea = styled.textarea`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    min-height: 100px;
    resize: vertical;
    font-family: inherit;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const FormSelect = styled.select`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    color: #ffffff;
    font-size: 14px;
    transition: all 0.2s ease;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: #3B82F6;
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const ImagePreview = styled.div`
    margin-top: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    text-align: center;

    img {
        max-width: 150px;
        max-height: 100px;
        border-radius: 8px;
        margin-bottom: 8px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    div {
        color: #c1ccdf;
        font-size: 13px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`;

const CancelButton = styled.button`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #c1ccdf;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-1px);
    }
`;

const SaveButton = styled.button`
    background: linear-gradient(135deg, #10B981 0%, #059669 100%);
    border: none;
    color: white;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    }
`;

const ErrorBox = styled.div`
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    padding: 16px 20px;
    margin-bottom: 24px;
    color: #FCA5A5;
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;

    &:before {
        content: '⚠️';
        font-size: 18px;
    }
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;

    &:before {
        content: '⏳';
        font-size: 32px;
        margin-right: 12px;
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AdminHeroes = () => {
    const { user } = useAuth();
    const [heroes, setHeroes] = useState([]);
    const [formHero, setFormHero] = useState(null);
    const [newHero, setNewHero] = useState({
        header: "",
        description: "",
        order: 0,
        active: true
    });
    const [selectedBackgroundFile, setSelectedBackgroundFile] = useState(null);
    const [selectedIconFile, setSelectedIconFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Base URL for your backend
    const BASE_URL = "http://localhost:8080";

    // Helper function to construct full image URL
    const getImageUrl = (imagePath) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `${BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    };

    // Get auth headers
    const getAuthHeaders = () => {
        return {
            'Authorization': `Bearer ${user?.token || localStorage.getItem('token')}`
        };
    };

    const fetchHeroes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/heroes`, {
                headers: getAuthHeaders()
            });

            // Process heroes to ensure proper image URLs
            const processedHeroes = response.data.map(hero => ({
                ...hero,
                backgroundImage: getImageUrl(hero.backgroundImage),
                iconImage: hero.iconImage ? getImageUrl(hero.iconImage) : null
            }));

            setHeroes(processedHeroes);
            setError(null);
        } catch (error) {
            console.error("Error fetching heroes:", error);
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                setError("Authentication failed. Please log in again.");
            } else {
                setError("Failed to load heroes. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    const handleEdit = (hero) => {
        setFormHero({ ...hero });
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("header", formHero.header);
            formData.append("description", formHero.description || "");
            formData.append("order", formHero.order || 0);
            formData.append("active", formHero.active);

            if (selectedBackgroundFile) {
                formData.append("backgroundImage", selectedBackgroundFile);
            }

            if (selectedIconFile) {
                formData.append("iconImage", selectedIconFile);
            }

            const response = await axios.put(
                `${BASE_URL}/api/heroes/${formHero.id}`,
                formData,
                {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Process the updated hero
            const updatedHero = {
                ...response.data,
                backgroundImage: getImageUrl(response.data.backgroundImage),
                iconImage: response.data.iconImage ? getImageUrl(response.data.iconImage) : null
            };

            setHeroes(heroes.map((h) => (h.id === formHero.id ? updatedHero : h)));
            setFormHero(null);
            setSelectedBackgroundFile(null);
            setSelectedIconFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating hero:", error);
            setError("Failed to update hero. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        if (heroes.length >= 5) {
            setError("Maximum of 5 hero sliders allowed.");
            return;
        }
        setIsAddingNew(true);
        setFormHero(null);
        setNewHero({
            header: "",
            description: "",
            order: heroes.length + 1,
            active: true
        });
        setSelectedBackgroundFile(null);
        setSelectedIconFile(null);
    };

    const handleCreateNew = async () => {
        if (!selectedBackgroundFile) {
            setError("Please select a background image.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("header", newHero.header);
            formData.append("description", newHero.description || "");
            formData.append("order", newHero.order || 0);
            formData.append("active", newHero.active);
            formData.append("backgroundImage", selectedBackgroundFile);

            if (selectedIconFile) {
                formData.append("iconImage", selectedIconFile);
            }

            const response = await axios.post(
                `${BASE_URL}/api/heroes`,
                formData,
                {
                    headers: {
                        ...getAuthHeaders(),
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Process the new hero
            const newCreatedHero = {
                ...response.data,
                backgroundImage: getImageUrl(response.data.backgroundImage),
                iconImage: response.data.iconImage ? getImageUrl(response.data.iconImage) : null
            };

            setHeroes([...heroes, newCreatedHero]);
            setNewHero({
                header: "",
                description: "",
                order: 0,
                active: true
            });
            setIsAddingNew(false);
            setSelectedBackgroundFile(null);
            setSelectedIconFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating hero:", error);
            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);

                if (error.response.status === 401 || error.response.status === 403) {
                    setError("Authentication failed. Please log in again.");
                } else if (error.response.status === 404) {
                    setError("API endpoint not found. Please check if the backend is properly configured.");
                } else {
                    setError(`Failed to create hero. Status: ${error.response.status}. ${error.response.data?.message || ''}`);
                }
            } else {
                setError("Failed to create hero. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this hero slider?")) {
            setIsLoading(true);
            try {
                await axios.delete(`${BASE_URL}/api/heroes/${id}`, {
                    headers: getAuthHeaders()
                });
                setHeroes(heroes.filter((h) => h.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting hero:", error);
                setError("Failed to delete hero. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCancel = () => {
        setFormHero(null);
        setIsAddingNew(false);
        setSelectedBackgroundFile(null);
        setSelectedIconFile(null);
        setError(null);
    };

    const handleInputChange = (e, isEditing) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === "order") {
            parsedValue = parseInt(value) || 0;
        } else if (name === "active") {
            parsedValue = value === "true";
        }

        if (isEditing) {
            setFormHero({ ...formHero, [name]: parsedValue });
        } else {
            setNewHero({ ...newHero, [name]: parsedValue });
        }
    };

    // Calculate stats
    const activeHeroes = heroes.filter(hero => hero.active).length;
    const inactiveHeroes = heroes.filter(hero => !hero.active).length;

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Hero Sliders Management</PageTitle>
                <PageSubtitle>
                    Manage the hero sliders that appear on the homepage. Maximum of 5 sliders allowed.
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{heroes.length}/5</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">✅</span>
                        <span>Active: <span className="value">{activeHeroes}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">⏸️</span>
                        <span>Inactive: <span className="value">{inactiveHeroes}</span></span>
                    </StatItem>
                </StatsContainer>
                <AddButton
                    onClick={handleAddNew}
                    disabled={heroes.length >= 5}
                >
                    <span className="icon">➕</span>
                    Add New Hero
                </AddButton>
            </ActionBar>

            <HeroesGrid>
                {heroes.map((hero) => (
                    <HeroCard key={hero.id}>
                        <HeroImageContainer backgroundImage={hero.backgroundImage}>
                            <StatusBadge active={hero.active}>
                                {hero.active ? 'Active' : 'Inactive'}
                            </StatusBadge>

                            {hero.iconImage && (
                                <HeroIcon
                                    src={hero.iconImage}
                                    alt="Hero Icon"
                                    onError={(e) => {
                                        console.error('Icon image failed to load:', hero.iconImage);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}

                            <OrderBadge>
                                Order #{hero.order}
                            </OrderBadge>

                            <HeroOverlay>
                                <HeroTitle>{hero.header}</HeroTitle>
                                <HeroDescription>
                                    {hero.description?.length > 80
                                        ? `${hero.description.substring(0, 80)}...`
                                        : hero.description
                                    }
                                </HeroDescription>
                            </HeroOverlay>
                        </HeroImageContainer>

                        <HeroCardActions>
                            <ActionButton
                                $variant="edit"
                                onClick={() => handleEdit(hero)}
                            >
                                <EditIcon className="icon" />
                                Edit
                            </ActionButton>
                            <ActionButton
                                $variant="delete"
                                onClick={() => handleDelete(hero.id)}
                            >
                                <DeleteIcon className="icon" />
                                Delete
                            </ActionButton>
                        </HeroCardActions>
                    </HeroCard>
                ))}

                {heroes.length < 5 && (
                    <EmptySlot onClick={handleAddNew}>
                        <div className="icon">➕</div>
                        <div className="text">Add New Hero</div>
                        <div className="subtext">Create a new hero slider</div>
                    </EmptySlot>
                )}
            </HeroesGrid>

            {isLoading && <LoadingOverlay>Loading heroes...</LoadingOverlay>}

            {(formHero || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New Hero Slider" : "Edit Hero Slider"}
                        </ModalTitle>

                        <FormGroup>
                            <FormLabel>Header</FormLabel>
                            <FormInput
                                type="text"
                                name="header"
                                value={isAddingNew ? newHero.header : formHero.header}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter hero header text"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormTextArea
                                name="description"
                                value={isAddingNew ? newHero.description : formHero.description}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter hero description"
                                rows={4}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Display Order</FormLabel>
                            <FormInput
                                type="number"
                                name="order"
                                value={isAddingNew ? newHero.order : formHero.order}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter display order"
                                min="1"
                                max="5"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Status</FormLabel>
                            <FormSelect
                                name="active"
                                value={(isAddingNew ? newHero.active : formHero.active).toString()}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                            >
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </FormSelect>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Background Image {isAddingNew && "(Required)"}</FormLabel>
                            <FormInput
                                type="file"
                                onChange={(e) => setSelectedBackgroundFile(e.target.files[0])}
                                required={isAddingNew}
                                accept="image/*"
                            />
                        </FormGroup>

                        {(!isAddingNew && formHero && formHero.backgroundImage) ? (
                            <ImagePreview>
                                <img
                                    src={formHero.backgroundImage}
                                    alt="Background Preview"
                                    onError={(e) => {
                                        console.error('Background image failed to load:', formHero.backgroundImage);
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
                                    }}
                                />
                                <div>Current background image</div>
                            </ImagePreview>
                        ) : selectedBackgroundFile ? (
                            <ImagePreview>
                                <div>📎 New background image selected: {selectedBackgroundFile.name}</div>
                            </ImagePreview>
                        ) : null}

                        <FormGroup>
                            <FormLabel>Icon Image (Optional)</FormLabel>
                            <FormInput
                                type="file"
                                onChange={(e) => setSelectedIconFile(e.target.files[0])}
                                accept="image/*"
                            />
                        </FormGroup>

                        {(!isAddingNew && formHero && formHero.iconImage) ? (
                            <ImagePreview>
                                <img
                                    src={formHero.iconImage}
                                    alt="Icon Preview"
                                    onError={(e) => {
                                        console.error('Icon image failed to load:', formHero.iconImage);
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDE1MCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI1NSIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPg==';
                                    }}
                                />
                                <div>Current icon image</div>
                            </ImagePreview>
                        ) : selectedIconFile ? (
                            <ImagePreview>
                                <div>📎 New icon image selected: {selectedIconFile.name}</div>
                            </ImagePreview>
                        ) : null}

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel}>
                                Cancel
                            </CancelButton>
                            <SaveButton onClick={isAddingNew ? handleCreateNew : handleSave}>
                                {isAddingNew ? "Create Hero" : "Save Changes"}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminHeroes;