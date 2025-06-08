import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from "styled-components";

const FiCContainer = styled.div`
    padding: 24px;
    background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
    min-height: 100vh;
    color: #ffffff;
`;

const FiCHeaderSection = styled.div`
    margin-bottom: 32px;
`;

const FiCPageTitle = styled.h1`
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
        content: '📚';
        font-size: 28px;
        -webkit-text-fill-color: initial;
    }
`;

const FiCPageSubtitle = styled.p`
    color: #c1ccdf;
    margin-bottom: 16px;
    font-size: 16px;
    opacity: 0.9;
`;

const FiCActionBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1;
    position: relative;
`;

const FiCStatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const FiCStatItem = styled.div`
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

const FiCAddButton = styled.button`
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
`;

const FiCFilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: center;
    margin-bottom: 24px;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 2;
    position: relative;
`;

const FiCFilterGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 200px;
`;

const FiCFilterLabel = styled.label`
    color: #c1ccdf;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FiCDropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    min-width: 250px;
    z-index: 5000;
`;

const FiCDropdownButton = styled.button`
    width: 100%;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: #3B82F6;
    }

    &:focus {
        outline: none;
        border-color: #3B82F6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &.open {
        border-color: #3B82F6;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        background: rgba(255, 255, 255, 0.15);
    }
`;

const FiCDropdownIcon = styled.svg`
    width: 16px;
    height: 16px;
    transition: transform 0.2s ease;
    color: #c1ccdf;

    &.open {
        transform: rotate(180deg);
    }
`;

const FiCDropdownList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.98) 0%, rgba(12, 17, 78, 0.98) 100%);
    backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-top: none;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
    max-height: 300px;
    overflow-y: auto;
    z-index: 15000;
    margin: 0;
    padding: 0;
    list-style: none;

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

    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.5);
    }
`;

const FiCDropdownItem = styled.li`
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.15s ease;
    font-size: 14px;
    color: #e2e8f0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:last-child {
        border-bottom: none;
    }

    &.selected {
        background-color: rgba(59, 130, 246, 0.3);
        color: #ffffff;
        font-weight: 500;
    }
`;

const FiCSearchInput = styled.input`
    width: 100%;
    padding: 12px 16px;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    font-size: 14px;
    outline: none;
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;

    &::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
        background: rgba(255, 255, 255, 0.1);
        border-bottom-color: #3B82F6;
    }
`;

const FiCNoResults = styled.div`
    padding: 16px;
    text-align: center;
    color: #c1ccdf;
    font-style: italic;
`;

const FiCTableContainer = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin-bottom: 24px;
    z-index: 0;
    position: relative;
`;

const FiCTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const FiCTableHeader = styled.thead`
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const FiCTableHeaderCell = styled.th`
    padding: 20px 24px;
    text-align: left;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FiCTableBody = styled.tbody``;

const FiCTableRow = styled.tr`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        transform: scale(1.005);
    }

    &:last-child {
        border-bottom: none;
    }
`;

const FiCTableCell = styled.td`
    padding: 18px 24px;
    color: #e2e8f0;
    font-size: 14px;
    vertical-align: middle;
`;

const FiCFieldImage = styled.img`
    width: 60px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.1);
        border-color: rgba(255, 255, 255, 0.4);
    }
`;

const FiCActionButton = styled.button`
    background: ${props => props.$variant === 'edit' ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
    color: white;
    border: none;
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 8px;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .icon {
        font-size: 14px;
    }
`;

const FiCPaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
    z-index: 0;
    position: relative;
`;

const FiCPageSizeSelector = styled.select`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    color: #ffffff;
    padding: 8px 12px;
    font-size: 14px;
    margin-left: 8px;

    option {
        background: #1a1d4a;
        color: #ffffff;
    }
`;

const FiCPageButtons = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`;

const FiCPageButton = styled.button`
    background: ${props => props.$active ?
            'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
            'rgba(255, 255, 255, 0.1)'};
    border: 1px solid ${props => props.$active ?
            'rgba(59, 130, 246, 0.5)' :
            'rgba(255, 255, 255, 0.2)'};
    color: ${props => props.$active ? '#ffffff' : '#c1ccdf'};
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background: ${props => props.$active ?
                'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)' :
                'rgba(255, 255, 255, 0.2)'};
        transform: translateY(-1px);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const FiCModalOverlay = styled.div`
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
    z-index: 20000;
    padding: 20px;
`;

const FiCModalContent = styled.div`
    background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 32px;
    width: 100%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const FiCModalTitle = styled.h2`
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

const FiCFormGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
`;

const FiCFormGroup = styled.div`
    margin-bottom: 20px;
`;

const FiCFormLabel = styled.label`
    display: block;
    color: #c1ccdf;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const FiCFormInput = styled.input`
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

const FiCFormTextArea = styled.textarea`
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

const FiCFormSelect = styled.select`
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

const FiCImagePreview = styled.div`
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
    }

    div {
        color: #c1ccdf;
        font-size: 13px;
    }
`;

const FiCButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
`;

const FiCCancelButton = styled.button`
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

const FiCSaveButton = styled.button`
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

const FiCErrorBox = styled.div`
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

const FiCLoadingOverlay = styled.div`
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
    z-index: 19000;
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

const FiCEmptyState = styled.div`
    text-align: center;
    padding: 60px 40px;
    color: #c1ccdf;
    background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
    backdrop-filter: blur(20px);
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 16px;

    .icon {
        font-size: 48px;
        margin-bottom: 20px;
        opacity: 0.6;
    }

    h3 {
        margin: 0 0 12px;
        color: #ffffff;
        font-size: 18px;
    }

    p {
        margin: 0;
        opacity: 0.8;
    }
`;

const FiCPriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const FiCPrice = styled.span`
    color: #10B981;
    font-weight: 700;
    font-size: 15px;
`;

const FiCDiscountPrice = styled.span`
    color: #c1ccdf;
    font-size: 12px;
    text-decoration: line-through;
    opacity: 0.7;
`;

// Professional Dropdown Component
const FiCProfessionalDropdown = ({
                                     options = [],
                                     value,
                                     onChange,
                                     placeholder = "Select an option...",
                                     searchable = true,
                                     displayKey = "name",
                                     valueKey = "id",
                                     allOptionText = "All Options"
                                 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter(option =>
        option[displayKey].toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getSelectedText = () => {
        if (!value) return placeholder;
        if (value === "") return allOptionText;
        const selectedOption = options.find(option => option[valueKey] === value);
        return selectedOption ? selectedOption[displayKey] : placeholder;
    };

    const handleSelect = (optionValue) => {
        onChange({ target: { value: optionValue } });
        setIsOpen(false);
        setSearchTerm('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    return (
        <FiCDropdownContainer ref={dropdownRef} onKeyDown={handleKeyDown}>
            <FiCDropdownButton
                type="button"
                className={isOpen ? 'open' : ''}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{getSelectedText()}</span>
                <FiCDropdownIcon className={isOpen ? 'open' : ''} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </FiCDropdownIcon>
            </FiCDropdownButton>

            {isOpen && (
                <FiCDropdownList>
                    {searchable && (
                        <li>
                            <FiCSearchInput
                                type="text"
                                placeholder={`Search ${placeholder.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </li>
                    )}

                    <FiCDropdownItem
                        className={value === "" ? 'selected' : ''}
                        onClick={() => handleSelect("")}
                    >
                        {allOptionText}
                    </FiCDropdownItem>

                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <FiCDropdownItem
                                key={option[valueKey]}
                                className={value === option[valueKey] ? 'selected' : ''}
                                onClick={() => handleSelect(option[valueKey])}
                            >
                                {option[displayKey]}
                            </FiCDropdownItem>
                        ))
                    ) : searchTerm && (
                        <FiCNoResults>No results found matching "{searchTerm}"</FiCNoResults>
                    )}
                </FiCDropdownList>
            )}
        </FiCDropdownContainer>
    );
};

const AdminFields = () => {
    const [fields, setFields] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [selectedUniversityId, setSelectedUniversityId] = useState("");
    const [selectedFacultyId, setSelectedFacultyId] = useState("");
    const [formField, setFormField] = useState(null);
    const [newField, setNewField] = useState({
        name: "",
        description: "",
        price: 0,
        discountPrice: 0,
        facultyId: "",
        languages: "",
        deposit: 0,
        language: "",
        languagePercentage: 0,
        duration: 0
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch Countries, Universities, and Faculties
    const fetchCountriesUniversitiesAndFaculties = async () => {
        setIsLoading(true);
        try {
            const countriesResponse = await axios.get("http://localhost:8080/countries");
            setCountries(countriesResponse.data || []);

            let universitiesResponse;
            if (selectedCountryId) {
                universitiesResponse = await axios.get(`http://localhost:8080/universities/by-country/${selectedCountryId}`);
            } else {
                universitiesResponse = await axios.get("http://localhost:8080/universities");
            }
            setUniversities(universitiesResponse.data || []);

            let facultiesResponse;
            if (selectedUniversityId) {
                facultiesResponse = await axios.get(`http://localhost:8080/faculties/university/${selectedUniversityId}`);
            } else {
                facultiesResponse = await axios.get("http://localhost:8080/faculties");
            }
            setFaculties(facultiesResponse.data || []);

            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Fields
    const fetchFields = async () => {
        setIsLoading(true);
        try {
            let fieldsResponse;
            if (selectedFacultyId) {
                fieldsResponse = await axios.get(`http://localhost:8080/fields/faculty/${selectedFacultyId}`);
            } else {
                fieldsResponse = await axios.get("http://localhost:8080/fields");
            }
            setFields(fieldsResponse.data || []);
            setTotalCount((fieldsResponse.data || []).length);
            setError(null);
        } catch (error) {
            console.error("Error fetching fields:", error);
            setError("Failed to load fields. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchCountriesUniversitiesAndFaculties();
    }, [selectedCountryId, selectedUniversityId]);

    // When faculty filter changes
    useEffect(() => {
        fetchFields();
    }, [selectedFacultyId]);

    // When country or university filter changes, reset faculty filter
    useEffect(() => {
        setSelectedFacultyId("");
    }, [selectedCountryId, selectedUniversityId]);

    const handleEdit = (field) => {
        setFormField({
            ...field,
            languages: field.languages || "",
            deposit: field.deposit || 0,
            language: field.language || "",
            languagePercentage: field.languagePercentage || 0,
            duration: field.duration || 0
        });
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        if (!formField.facultyId) {
            setError("Please select a faculty.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", formField.name);
            formData.append("description", formField.description || "");
            formData.append("price", formField.price);
            formData.append("discountPrice", formField.discountPrice || 0);
            formData.append("facultyId", formField.facultyId);
            formData.append("languages", formField.languages || "");
            formData.append("deposit", formField.deposit || 0);
            formData.append("language", formField.language || "");
            formData.append("languagePercentage", formField.languagePercentage || 0);
            formData.append("duration", formField.duration || 0);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:8080/fields/${formField.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setFields(fields.map((f) => (f.id === formField.id ? response.data : f)));
            setFormField(null);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating field:", error);
            setError("Failed to update field. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setFormField(null);
        setNewField({
            name: "",
            description: "",
            price: 0,
            discountPrice: 0,
            facultyId: selectedFacultyId || "",
            languages: "",
            deposit: 0,
            language: "",
            languagePercentage: 0,
            duration: 0
        });
        setSelectedFile(null);
    };

    const handleCreateNew = async () => {
        if (!newField.facultyId) {
            setError("Please select a faculty.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", newField.name);
            formData.append("description", newField.description || "");
            formData.append("price", newField.price);
            formData.append("discountPrice", newField.discountPrice || 0);
            formData.append("facultyId", newField.facultyId);
            formData.append("languages", newField.languages || "");
            formData.append("deposit", newField.deposit || 0);
            formData.append("language", newField.language || "");
            formData.append("languagePercentage", newField.languagePercentage || 0);
            formData.append("duration", newField.duration || 0);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.post(
                "http://localhost:8080/fields",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setFields([...fields, response.data]);
            setNewField({
                name: "",
                description: "",
                price: 0,
                discountPrice: 0,
                facultyId: "",
                languages: "",
                deposit: 0,
                language: "",
                languagePercentage: 0,
                duration: 0
            });
            setIsAddingNew(false);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating field:", error);
            setError("Failed to create field. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this field?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:8080/fields/${id}`);
                setFields(fields.filter((f) => f.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting field:", error);
                setError("Failed to delete field. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        setFormField(null);
        setIsAddingNew(false);
        setSelectedFile(null);
        setError(null);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handleInputChange = (e, isEditing) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === "price" || name === "discountPrice" || name === "deposit") {
            parsedValue = parseFloat(value) || 0;
        } else if (name === "languagePercentage" || name === "duration") {
            parsedValue = parseInt(value) || 0;
        }

        if (isEditing) {
            setFormField({ ...formField, [name]: parsedValue });
        } else {
            setNewField({ ...newField, [name]: parsedValue });
        }
    };

    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedFields = fields.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const getFacultyName = (facultyId) => {
        const faculty = faculties.find((f) => f.id === facultyId);
        return faculty ? faculty.name : "Unknown";
    };

    const getEffectivePrice = (field) => {
        return field.discountPrice && field.discountPrice < field.price
            ? field.discountPrice
            : field.price;
    };

    const filteredUniversities = selectedCountryId
        ? universities.filter(uni => uni.countryId === selectedCountryId)
        : universities;

    const filteredFaculties = selectedUniversityId
        ? faculties.filter(fac => fac.universityId === selectedUniversityId)
        : faculties;

    return (
        <FiCContainer>
            <FiCHeaderSection>
                <FiCPageTitle>Fields Management</FiCPageTitle>
                <FiCPageSubtitle>
                    Manage academic fields and study programs across universities
                </FiCPageSubtitle>
            </FiCHeaderSection>

            {error && <FiCErrorBox>{error}</FiCErrorBox>}

            <FiCFilterContainer>
                <FiCFilterGroup>
                    <FiCFilterLabel>Filter by Country:</FiCFilterLabel>
                    <FiCProfessionalDropdown
                        options={countries}
                        value={selectedCountryId}
                        onChange={(e) => setSelectedCountryId(e.target.value)}
                        placeholder="countries"
                        searchable={true}
                        displayKey="name"
                        valueKey="id"
                        allOptionText="All Countries"
                    />
                </FiCFilterGroup>

                <FiCFilterGroup>
                    <FiCFilterLabel>Filter by University:</FiCFilterLabel>
                    <FiCProfessionalDropdown
                        options={filteredUniversities}
                        value={selectedUniversityId}
                        onChange={(e) => setSelectedUniversityId(e.target.value)}
                        placeholder="universities"
                        searchable={true}
                        displayKey="name"
                        valueKey="id"
                        allOptionText="All Universities"
                    />
                </FiCFilterGroup>

                <FiCFilterGroup>
                    <FiCFilterLabel>Filter by Faculty:</FiCFilterLabel>
                    <FiCProfessionalDropdown
                        options={filteredFaculties}
                        value={selectedFacultyId}
                        onChange={(e) => setSelectedFacultyId(e.target.value)}
                        placeholder="faculties"
                        searchable={true}
                        displayKey="name"
                        valueKey="id"
                        allOptionText="All Faculties"
                    />
                </FiCFilterGroup>
            </FiCFilterContainer>

            <FiCActionBar>
                <FiCStatsContainer>
                    <FiCStatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{totalCount}</span></span>
                    </FiCStatItem>
                    <FiCStatItem>
                        <span className="icon">🎯</span>
                        <span>Active: <span className="value">{fields.filter(f => f.active !== false).length}</span></span>
                    </FiCStatItem>
                    <FiCStatItem>
                        <span className="icon">💰</span>
                        <span>Avg Price: <span className="value">${fields.length > 0 ? Math.round(fields.reduce((sum, f) => sum + getEffectivePrice(f), 0) / fields.length).toLocaleString() : 0}</span></span>
                    </FiCStatItem>
                </FiCStatsContainer>
                <FiCAddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New Field
                </FiCAddButton>
            </FiCActionBar>

            {fields.length === 0 && !isLoading ? (
                <FiCEmptyState>
                    <div className="icon">📚</div>
                    <h3>No Fields Found</h3>
                    <p>Start by adding your first academic field to organize study programs</p>
                </FiCEmptyState>
            ) : (
                <>
                    <FiCTableContainer>
                        <FiCTable>
                            <FiCTableHeader>
                                <tr>
                                    <FiCTableHeaderCell>Field Name</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Faculty</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Price</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Deposit</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Language</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Duration</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Image</FiCTableHeaderCell>
                                    <FiCTableHeaderCell>Actions</FiCTableHeaderCell>
                                </tr>
                            </FiCTableHeader>
                            <FiCTableBody>
                                {displayedFields.map((field) => (
                                    <FiCTableRow key={field.id}>
                                        <FiCTableCell>
                                            <strong style={{ color: '#ffffff', fontSize: '15px' }}>
                                                {field.name}
                                            </strong>
                                            {field.description && (
                                                <div style={{
                                                    color: '#c1ccdf',
                                                    fontSize: '12px',
                                                    marginTop: '4px',
                                                    opacity: 0.8
                                                }}>
                                                    {field.description.length > 50
                                                        ? `${field.description.substring(0, 50)}...`
                                                        : field.description}
                                                </div>
                                            )}
                                        </FiCTableCell>
                                        <FiCTableCell>{getFacultyName(field.facultyId)}</FiCTableCell>
                                        <FiCTableCell>
                                            <FiCPriceContainer>
                                                <FiCPrice>${getEffectivePrice(field).toLocaleString()}</FiCPrice>
                                                {field.discountPrice && field.discountPrice < field.price && (
                                                    <FiCDiscountPrice>${field.price.toLocaleString()}</FiCDiscountPrice>
                                                )}
                                            </FiCPriceContainer>
                                        </FiCTableCell>
                                        <FiCTableCell>
                                            <span style={{ color: '#10B981', fontWeight: '600' }}>
                                                ${(field.deposit || 0).toLocaleString()}
                                            </span>
                                        </FiCTableCell>
                                        <FiCTableCell>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                <span style={{ color: '#ffffff', fontWeight: '500' }}>
                                                    {field.language || 'N/A'}
                                                </span>
                                                <span style={{ color: '#c1ccdf', fontSize: '12px' }}>
                                                    {field.languagePercentage || 0}%
                                                </span>
                                            </div>
                                        </FiCTableCell>
                                        <FiCTableCell>
                                            <span style={{ color: '#ffffff', fontWeight: '500' }}>
                                                {field.duration || 0} years
                                            </span>
                                        </FiCTableCell>
                                        <FiCTableCell>
                                            {field.imageUrl ? (
                                                <FiCFieldImage
                                                    src={field.imageUrl}
                                                    alt={field.name}
                                                />
                                            ) : (
                                                <div style={{
                                                    color: '#64748b',
                                                    fontStyle: 'italic',
                                                    fontSize: '13px'
                                                }}>
                                                    No image
                                                </div>
                                            )}
                                        </FiCTableCell>
                                        <FiCTableCell>
                                            <div style={{ display: "flex", gap: "8px" }}>
                                                <FiCActionButton
                                                    $variant="edit"
                                                    onClick={() => handleEdit(field)}
                                                >
                                                    <span className="icon">✏️</span>
                                                    Edit
                                                </FiCActionButton>
                                                <FiCActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDelete(field.id)}
                                                >
                                                    <span className="icon">🗑️</span>
                                                    Delete
                                                </FiCActionButton>
                                            </div>
                                        </FiCTableCell>
                                    </FiCTableRow>
                                ))}
                            </FiCTableBody>
                        </FiCTable>
                    </FiCTableContainer>

                    <FiCPaginationContainer>
                        <div style={{ color: '#c1ccdf' }}>
                            <span>Items per page:</span>
                            <FiCPageSizeSelector value={pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </FiCPageSizeSelector>
                        </div>
                        <FiCPageButtons>
                            <FiCPageButton
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                ← Previous
                            </FiCPageButton>
                            {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                                let pageNum = i;
                                if (pageCount > 5) {
                                    if (currentPage > 1 && currentPage < pageCount - 2) {
                                        pageNum = currentPage - 2 + i;
                                    } else if (currentPage >= pageCount - 2) {
                                        pageNum = pageCount - 5 + i;
                                    }
                                }
                                return (
                                    <FiCPageButton
                                        key={pageNum}
                                        $active={pageNum === currentPage}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum + 1}
                                    </FiCPageButton>
                                );
                            })}
                            <FiCPageButton
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pageCount - 1 || pageCount === 0}
                            >
                                Next →
                            </FiCPageButton>
                        </FiCPageButtons>
                    </FiCPaginationContainer>
                </>
            )}

            {isLoading && <FiCLoadingOverlay>Loading fields...</FiCLoadingOverlay>}

            {(formField || isAddingNew) && (
                <FiCModalOverlay>
                    <FiCModalContent>
                        <FiCModalTitle>
                            {isAddingNew ? "Add New Field" : "Edit Field"}
                        </FiCModalTitle>

                        <FiCFormGrid>
                            <FiCFormGroup>
                                <FiCFormLabel>Field Name</FiCFormLabel>
                                <FiCFormInput
                                    type="text"
                                    name="name"
                                    value={isAddingNew ? newField.name : formField.name}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter field name"
                                    required
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Faculty</FiCFormLabel>
                                <FiCFormSelect
                                    name="facultyId"
                                    value={isAddingNew ? newField.facultyId : formField.facultyId}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    required
                                    disabled={(selectedFacultyId && isAddingNew) || filteredFaculties.length === 0}
                                >
                                    <option value="" disabled>Select a faculty</option>
                                    {filteredFaculties.map((fac) => (
                                        <option key={fac.id} value={fac.id}>
                                            {fac.name}
                                        </option>
                                    ))}
                                </FiCFormSelect>
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Price ($)</FiCFormLabel>
                                <FiCFormInput
                                    type="number"
                                    name="price"
                                    value={isAddingNew ? newField.price : formField.price}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter price"
                                    required
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Discount Price ($)</FiCFormLabel>
                                <FiCFormInput
                                    type="number"
                                    name="discountPrice"
                                    value={isAddingNew ? newField.discountPrice : formField.discountPrice}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter discount price (optional)"
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Deposit ($)</FiCFormLabel>
                                <FiCFormInput
                                    type="number"
                                    name="deposit"
                                    value={isAddingNew ? newField.deposit : formField.deposit}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter deposit amount"
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Study Language</FiCFormLabel>
                                <FiCFormInput
                                    type="text"
                                    name="language"
                                    value={isAddingNew ? newField.language : formField.language}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter study language"
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Language Percentage (%)</FiCFormLabel>
                                <FiCFormInput
                                    type="number"
                                    name="languagePercentage"
                                    value={isAddingNew ? newField.languagePercentage : formField.languagePercentage}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter language percentage"
                                    min="0"
                                    max="100"
                                />
                            </FiCFormGroup>

                            <FiCFormGroup>
                                <FiCFormLabel>Duration (Years)</FiCFormLabel>
                                <FiCFormInput
                                    type="number"
                                    name="duration"
                                    value={isAddingNew ? newField.duration : formField.duration}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter program duration"
                                    min="1"
                                    max="10"
                                />
                            </FiCFormGroup>
                        </FiCFormGrid>

                        <FiCFormGroup>
                            <FiCFormLabel>Description</FiCFormLabel>
                            <FiCFormTextArea
                                name="description"
                                value={isAddingNew ? newField.description : formField.description}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter field description and program details"
                                rows={4}
                            />
                        </FiCFormGroup>

                        <FiCFormGroup>
                            <FiCFormLabel>Languages (JSON format)</FiCFormLabel>
                            <FiCFormTextArea
                                name="languages"
                                value={isAddingNew ? newField.languages : formField.languages}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder='e.g., {"English": 80, "Turkish": 20}'
                                rows={3}
                            />
                        </FiCFormGroup>

                        <FiCFormGroup>
                            <FiCFormLabel>Field Image</FiCFormLabel>
                            <FiCFormInput
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </FiCFormGroup>

                        {(!isAddingNew && formField && formField.imageUrl) ? (
                            <FiCImagePreview>
                                <img
                                    src={formField.imageUrl}
                                    alt="Current image"
                                />
                                <div>Current field image</div>
                            </FiCImagePreview>
                        ) : selectedFile ? (
                            <FiCImagePreview>
                                <div>📎 New image selected: {selectedFile.name}</div>
                            </FiCImagePreview>
                        ) : null}

                        <FiCButtonGroup>
                            <FiCCancelButton onClick={handleCancel}>
                                Cancel
                            </FiCCancelButton>
                            <FiCSaveButton onClick={isAddingNew ? handleCreateNew : handleSave}>
                                {isAddingNew ? "Create Field" : "Save Changes"}
                            </FiCSaveButton>
                        </FiCButtonGroup>
                    </FiCModalContent>
                </FiCModalOverlay>
            )}
        </FiCContainer>
    );
};

export default AdminFields;