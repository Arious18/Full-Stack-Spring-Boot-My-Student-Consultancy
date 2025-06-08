import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styled from 'styled-components';

// Modern Styled Components with Glassmorphism Design
const Container = styled.div`
  padding: 16px;
  background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
  min-height: 100vh;
  color: #ffffff;
  max-width: 100vw;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

const PageTitle = styled.h1`
  color: #ffffff;
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  gap: 12px;

  &:before {
    content: '🏛️';
    font-size: 24px;
    -webkit-text-fill-color: initial;
  }

  @media (max-width: 768px) {
    font-size: 22px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const PageSubtitle = styled.p`
  color: #c1ccdf;
  margin-bottom: 16px;
  font-size: 14px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

// Enhanced Filter Container with fixed z-index
const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
  flex: 1;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const FilterLabel = styled.label`
  color: #c1ccdf;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Professional Dropdown Components with proper z-index
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 200px;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: #3B82F6;
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    outline: none;
    border-color: #3B82F6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &.open {
    border-color: #3B82F6;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const DropdownIcon = styled.svg`
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  color: #c1ccdf;
  
  &.open {
    transform: rotate(180deg);
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.98) 0%, rgba(12, 17, 78, 0.98) 100%);
  backdrop-filter: blur(25px);
  border: 1px solid #3B82F6;
  border-top: none;
  border-radius: 0 0 12px 12px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
  max-height: 250px;
  overflow-y: auto;
  z-index: 2000;
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

const DropdownItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  font-size: 13px;
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
    color: #60A5FA;
    font-weight: 600;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 13px;
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

const NoResults = styled.div`
  padding: 16px;
  text-align: center;
  color: #c1ccdf;
  font-style: italic;
  font-size: 13px;
`;

// Professional Dropdown Component
const ProfessionalDropdown = ({
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
        <DropdownContainer ref={dropdownRef} onKeyDown={handleKeyDown}>
            <DropdownButton
                type="button"
                className={isOpen ? 'open' : ''}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{getSelectedText()}</span>
                <DropdownIcon className={isOpen ? 'open' : ''} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </DropdownIcon>
            </DropdownButton>

            {isOpen && (
                <DropdownList>
                    {searchable && (
                        <li>
                            <SearchInput
                                type="text"
                                placeholder={`Search ${placeholder.toLowerCase()}...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </li>
                    )}
                    <DropdownItem
                        className={value === "" ? 'selected' : ''}
                        onClick={() => handleSelect("")}
                    >
                        {allOptionText}
                    </DropdownItem>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <DropdownItem
                                key={option[valueKey]}
                                className={value === option[valueKey] ? 'selected' : ''}
                                onClick={() => handleSelect(option[valueKey])}
                            >
                                {option[displayKey]}
                            </DropdownItem>
                        ))
                    ) : searchTerm && (
                        <NoResults>No results found matching "{searchTerm}"</NoResults>
                    )}
                </DropdownList>
            )}
        </DropdownContainer>
    );
};

const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 5;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 14px 16px;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #c1ccdf;
  font-size: 13px;
  font-weight: 500;

  .icon {
    font-size: 14px;
    opacity: 0.8;
  }

  .value {
    color: #ffffff;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  border: none;
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }

  .icon {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    font-size: 12px;
  }
`;

const TableContainer = styled.div`
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  overflow-x: auto;
  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;

  @media (max-width: 768px) {
    min-width: 900px;
  }
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const TableHeaderCell = styled.th`
  padding: 16px 20px;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 11px;
  }
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableCell = styled.td`
  padding: 14px 20px;
  color: #e2e8f0;
  font-size: 13px;
  vertical-align: middle;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 12px;
    max-width: 150px;
  }
`;

const UniversityImage = styled.img`
  width: 45px;
  height: 35px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 28px;
  }
`;

const PriceText = styled.span`
  color: #10B981;
  font-weight: 700;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const ActionButton = styled.button`
  background: ${props => props.$variant === 'edit' ?
    'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
    'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 6px;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .icon {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    padding: 5px 8px;
    font-size: 10px;
    margin-bottom: 4px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    padding: 14px 16px;
  }
`;

const PageSizeSelector = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  padding: 6px 10px;
  font-size: 13px;
  margin-left: 8px;

  option {
    background: #1a1d4a;
    color: #ffffff;
  }
`;

const PageButtons = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PageButton = styled.button`
  background: ${props => props.$active ?
    'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)' :
    'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$active ?
    'rgba(59, 130, 246, 0.5)' :
    'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$active ? '#ffffff' : '#c1ccdf'};
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
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
  z-index: 3000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.95) 0%, rgba(12, 17, 78, 0.95) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 28px;
  width: 100%;
  max-width: 550px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    padding: 20px;
    margin: 10px;
    max-width: calc(100vw - 20px);
  }
`;

const ModalTitle = styled.h2`
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  display: block;
  color: #c1ccdf;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
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
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
  min-height: 80px;
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
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 13px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ImagePreview = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;

  img {
    max-width: 120px;
    max-height: 80px;
    border-radius: 8px;
    margin-bottom: 6px;
  }

  div {
    color: #c1ccdf;
    font-size: 12px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #c1ccdf;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
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
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 13px;
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
  padding: 14px 16px;
  margin-bottom: 20px;
  color: #FCA5A5;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 13px;

  &:before {
    content: '⚠️';
    font-size: 16px;
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
  z-index: 2999;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;

  &:before {
    content: '⏳';
    font-size: 28px;
    margin-right: 10px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 30px;
  color: #c1ccdf;
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.4) 0%, rgba(24, 11, 87, 0.4) 100%);
  backdrop-filter: blur(20px);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 16px;

  .icon {
    font-size: 40px;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  h3 {
    margin: 0 0 10px;
    color: #ffffff;
    font-size: 16px;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
    
    .icon {
      font-size: 32px;
    }
    
    h3 {
      font-size: 14px;
    }
    
    p {
      font-size: 12px;
    }
  }
`;

const AdminUniversities = () => {
    const [universities, setUniversities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [formUniversity, setFormUniversity] = useState(null);
    const [newUniversity, setNewUniversity] = useState({
        name: "",
        description: "",
        about: "",
        yearlyPrice: 0,
        discountPrice: 0,
        countryId: "",
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch Countries and Universities
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const countriesResponse = await axios.get("http://localhost:8080/countries");
            setCountries(countriesResponse.data);

            let universitiesResponse;
            if (selectedCountryId) {
                universitiesResponse = await axios.get(`http://localhost:8080/universities/by-country/${selectedCountryId}`);
            } else {
                universitiesResponse = await axios.get("http://localhost:8080/universities");
            }
            setUniversities(universitiesResponse.data);
            setTotalCount(universitiesResponse.data.length);
            setError(null);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load universities. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchData();
    }, [selectedCountryId]);

    const handleEdit = (university) => {
        setFormUniversity({
            ...university,
        });
        setIsAddingNew(false);
    };

    const handleSave = async () => {
        if (!formUniversity.countryId) {
            setError("Please select a country.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", formUniversity.name);
            formData.append("description", formUniversity.description || "");
            formData.append("about", formUniversity.about || "");
            formData.append("yearlyPrice", formUniversity.yearlyPrice);
            formData.append("discountPrice", formUniversity.discountPrice || 0);
            formData.append("countryId", formUniversity.countryId);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.put(
                `http://localhost:8080/universities/${formUniversity.id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setUniversities(universities.map((u) => (u.id === formUniversity.id ? response.data : u)));
            setFormUniversity(null);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error updating university:", error);
            setError("Failed to update university. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNew = () => {
        setIsAddingNew(true);
        setFormUniversity(null);
        setNewUniversity({
            name: "",
            description: "",
            about: "",
            yearlyPrice: 0,
            discountPrice: 0,
            countryId: selectedCountryId || "",
        });
        setSelectedFile(null);
    };

    const handleCreateNew = async () => {
        if (!newUniversity.countryId) {
            setError("Please select a country.");
            return;
        }
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", newUniversity.name);
            formData.append("description", newUniversity.description || "");
            formData.append("about", newUniversity.about || "");
            formData.append("yearlyPrice", newUniversity.yearlyPrice);
            formData.append("discountPrice", newUniversity.discountPrice || 0);
            formData.append("countryId", newUniversity.countryId);
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            const response = await axios.post(
                "http://localhost:8080/universities",
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setUniversities([...universities, response.data]);
            setNewUniversity({
                name: "",
                description: "",
                about: "",
                yearlyPrice: 0,
                discountPrice: 0,
                countryId: "",
            });
            setIsAddingNew(false);
            setSelectedFile(null);
            setError(null);
        } catch (error) {
            console.error("Error creating university:", error);
            setError("Failed to create university. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this university?")) {
            setIsLoading(true);
            try {
                await axios.delete(`http://localhost:8080/universities/${id}`);
                setUniversities(universities.filter((u) => u.id !== id));
                setError(null);
            } catch (error) {
                console.error("Error deleting university:", error);
                if (error.response && error.response.status === 400) {
                    setError("Cannot delete university because it has associated faculties");
                } else {
                    setError("Failed to delete university. Please try again.");
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleCancel = () => {
        setFormUniversity(null);
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

        if (name === "yearlyPrice" || name === "discountPrice") {
            parsedValue = parseFloat(value) || 0;
        }

        if (isEditing) {
            setFormUniversity({ ...formUniversity, [name]: parsedValue });
        } else {
            setNewUniversity({ ...newUniversity, [name]: parsedValue });
        }
    };

    const pageCount = Math.ceil(totalCount / pageSize);
    const displayedUniversities = universities.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const getCountryName = (countryId) => {
        const country = countries.find((c) => c.id === countryId);
        return country ? country.name : "Unknown";
    };

    const getEffectivePrice = (university) => {
        return university.discountPrice && university.discountPrice < university.yearlyPrice
            ? university.discountPrice
            : university.yearlyPrice;
    };

    return (
        <Container>
            <HeaderSection>
                <PageTitle>Universities Management</PageTitle>
                <PageSubtitle>
                    Manage universities and their information across different countries
                </PageSubtitle>
            </HeaderSection>

            {error && <ErrorBox>{error}</ErrorBox>}

            <FilterContainer>
                <FilterGroup>
                    <FilterLabel>Filter by Country:</FilterLabel>
                    <ProfessionalDropdown
                        options={countries}
                        value={selectedCountryId}
                        onChange={(e) => setSelectedCountryId(e.target.value)}
                        placeholder="countries"
                        searchable={true}
                        displayKey="name"
                        valueKey="id"
                        allOptionText="All Countries"
                    />
                </FilterGroup>
            </FilterContainer>

            <ActionBar>
                <StatsContainer>
                    <StatItem>
                        <span className="icon">📊</span>
                        <span>Total: <span className="value">{totalCount}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">💰</span>
                        <span>Avg Price: <span className="value">${universities.length > 0 ? Math.round(universities.reduce((sum, u) => sum + getEffectivePrice(u), 0) / universities.length).toLocaleString() : 0}</span></span>
                    </StatItem>
                    <StatItem>
                        <span className="icon">🌍</span>
                        <span>Countries: <span className="value">{new Set(universities.map(u => u.countryId)).size}</span></span>
                    </StatItem>
                </StatsContainer>
                <AddButton onClick={handleAddNew}>
                    <span className="icon">➕</span>
                    Add New University
                </AddButton>
            </ActionBar>

            {universities.length === 0 && !isLoading ? (
                <EmptyState>
                    <div className="icon">🏛️</div>
                    <h3>No Universities Found</h3>
                    <p>Start by adding universities to your system</p>
                </EmptyState>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHeader>
                                <tr>
                                    <TableHeaderCell>University Name</TableHeaderCell>
                                    <TableHeaderCell>Country</TableHeaderCell>
                                    <TableHeaderCell>Description</TableHeaderCell>
                                    <TableHeaderCell>Yearly Price</TableHeaderCell>
                                    <TableHeaderCell>Image</TableHeaderCell>
                                    <TableHeaderCell>Actions</TableHeaderCell>
                                </tr>
                            </TableHeader>
                            <TableBody>
                                {displayedUniversities.map((university) => (
                                    <TableRow key={university.id}>
                                        <TableCell>
                                            <strong style={{ color: '#ffffff', fontSize: '14px' }}>
                                                {university.name}
                                            </strong>
                                        </TableCell>
                                        <TableCell>
                                            <span style={{ color: '#60A5FA' }}>
                                                {getCountryName(university.countryId)}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div title={university.description}>
                                                {university.description && university.description.length > 80
                                                    ? `${university.description.substring(0, 80)}...`
                                                    : university.description || "No description available"}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <PriceText>${getEffectivePrice(university).toLocaleString()}</PriceText>
                                            {university.discountPrice && university.discountPrice < university.yearlyPrice && (
                                                <div style={{
                                                    textDecoration: 'line-through',
                                                    color: '#EF4444',
                                                    fontSize: '11px',
                                                    marginTop: '2px'
                                                }}>
                                                    ${Number(university.yearlyPrice).toLocaleString()}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {university.imageUrl ? (
                                                <UniversityImage
                                                    src={university.imageUrl}
                                                    alt={university.name}
                                                />
                                            ) : (
                                                <div style={{
                                                    color: '#64748b',
                                                    fontStyle: 'italic',
                                                    fontSize: '11px'
                                                }}>
                                                    No image
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                                                <ActionButton
                                                    $variant="edit"
                                                    onClick={() => handleEdit(university)}
                                                >
                                                    <span className="icon">✏️</span>
                                                    Edit
                                                </ActionButton>
                                                <ActionButton
                                                    $variant="delete"
                                                    onClick={() => handleDelete(university.id)}
                                                >
                                                    <span className="icon">🗑️</span>
                                                    Delete
                                                </ActionButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <PaginationContainer>
                        <div style={{ color: '#c1ccdf', fontSize: '13px' }}>
                            <span>Items per page:</span>
                            <PageSizeSelector value={pageSize} onChange={handlePageSizeChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </PageSizeSelector>
                        </div>
                        <PageButtons>
                            <PageButton
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                            >
                                ← Previous
                            </PageButton>
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
                                    <PageButton
                                        key={pageNum}
                                        $active={pageNum === currentPage}
                                        onClick={() => handlePageChange(pageNum)}
                                    >
                                        {pageNum + 1}
                                    </PageButton>
                                );
                            })}
                            <PageButton
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pageCount - 1 || pageCount === 0}
                            >
                                Next →
                            </PageButton>
                        </PageButtons>
                    </PaginationContainer>
                </>
            )}

            {isLoading && <LoadingOverlay>Loading universities...</LoadingOverlay>}

            {(formUniversity || isAddingNew) && (
                <ModalOverlay>
                    <ModalContent>
                        <ModalTitle>
                            {isAddingNew ? "Add New University" : "Edit University"}
                        </ModalTitle>

                        <FormGroup>
                            <FormLabel>University Name</FormLabel>
                            <FormInput
                                type="text"
                                name="name"
                                value={isAddingNew ? newUniversity.name : formUniversity.name}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter university name"
                                required
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Country</FormLabel>
                            <FormSelect
                                name="countryId"
                                value={isAddingNew ? newUniversity.countryId : formUniversity.countryId}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                required
                                disabled={selectedCountryId && isAddingNew}
                            >
                                <option value="" disabled>Select a country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </FormSelect>
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>Description</FormLabel>
                            <FormTextArea
                                name="description"
                                value={isAddingNew ? newUniversity.description : formUniversity.description}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter university description"
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormLabel>About</FormLabel>
                            <FormTextArea
                                name="about"
                                value={isAddingNew ? newUniversity.about : formUniversity.about}
                                onChange={(e) => handleInputChange(e, !isAddingNew)}
                                placeholder="Enter detailed information about the university"
                            />
                        </FormGroup>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <FormGroup>
                                <FormLabel>Yearly Price ($)</FormLabel>
                                <FormInput
                                    type="number"
                                    name="yearlyPrice"
                                    value={isAddingNew ? newUniversity.yearlyPrice : formUniversity.yearlyPrice}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter yearly price"
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormLabel>Discount Price ($)</FormLabel>
                                <FormInput
                                    type="number"
                                    name="discountPrice"
                                    value={isAddingNew ? newUniversity.discountPrice : formUniversity.discountPrice}
                                    onChange={(e) => handleInputChange(e, !isAddingNew)}
                                    placeholder="Enter discount price (optional)"
                                />
                            </FormGroup>
                        </div>

                        <FormGroup>
                            <FormLabel>University Image</FormLabel>
                            <FormInput
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </FormGroup>

                        {(!isAddingNew && formUniversity && formUniversity.imageUrl) ? (
                            <ImagePreview>
                                <img
                                    src={formUniversity.imageUrl}
                                    alt="Current university image"
                                />
                                <div>Current university image</div>
                            </ImagePreview>
                        ) : selectedFile ? (
                            <ImagePreview>
                                <div>📎 New image selected: {selectedFile.name}</div>
                            </ImagePreview>
                        ) : null}

                        <ButtonGroup>
                            <CancelButton onClick={handleCancel}>
                                Cancel
                            </CancelButton>
                            <SaveButton onClick={isAddingNew ? handleCreateNew : handleSave}>
                                {isAddingNew ? "Create University" : "Save Changes"}
                            </SaveButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};

export default AdminUniversities;