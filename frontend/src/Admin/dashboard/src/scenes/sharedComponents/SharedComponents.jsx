import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  margin: 20px;
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
`;

const AddButton = styled(ActionButton)`
  background-color: #4cceac;
  &:hover {
    background-color: #3dbb9a;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #6870fa;
  &:hover {
    background-color: #535ac8;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #db4f4a;
  &:hover {
    background-color: #c04440;
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: #777;
  &:hover {
    background-color: #666;
  }
`;

const SaveButton = styled(ActionButton)`
  background-color: #4cceac;
  &:hover {
    background-color: #3dbb9a;
  }
`;

const ErrorBox = styled.div`
  background-color: #db4f4a;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 4px;
  color: white;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1F2A40;
  color: white;
  border-radius: 4px;
  overflow: hidden;
`;

const TableHeader = styled.thead`
  background-color: #3e4396;
`;

const TableHeaderCell = styled.th`
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #2d3748;
`;

const TableBody = styled.tbody`
  background-color: #1F2A40;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #293145;
  }
`;

const TableCell = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #2d3748;
`;

const PriceText = styled.span`
  color: #4cceac;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1F2A40;
  border-radius: 8px;
  padding: 24px;
  width: 500px;
  border: 2px solid #2d3748;
  color: white;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h4`
  margin-bottom: 16px;
  font-size: 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const FormLabel = styled.h6`
  margin-bottom: 8px;
  font-size: 16px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  background-color: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  background-color: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 4px;
  color: white;
  min-height: 100px;
  resize: vertical;
  box-sizing: border-box;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  background-color: #2d3748;
  border: 1px solid #4a5568;
  border-radius: 4px;
  color: white;
  box-sizing: border-box;
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 16px;
  background-color: #2d3748;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #3e4396;
  margin-top: 16px;
  border-radius: 0 0 4px 4px;
`;

const PageSizeSelector = styled.select`
  padding: 8px;
  border-radius: 4px;
  background-color: #2d3748;
  color: white;
  border: 1px solid #4a5568;
`;

const PageButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${props => props.active ? '#4cceac' : '#2d3748'};
  border: 1px solid ${props => props.active ? '#3dbb9a' : '#4a5568'};
  color: white;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
`;

const FilterLabel = styled.label`
  color: white;
  font-weight: 500;
`;

// SVG Icons as components
const DeleteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EditIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AddIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const SharedComponents = {
    Container,
    FlexEnd,
    AddButton,
    EditButton,
    DeleteButton,
    CancelButton,
    SaveButton,
    ErrorBox,
    Table,
    TableHeader,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    PriceText,
    ModalOverlay,
    ModalContent,
    ModalTitle,
    FormGroup,
    FormLabel,
    FormInput,
    FormTextArea,
    FormSelect,
    ImagePreview,
    ButtonGroup,
    LoadingOverlay,
    Pagination,
    PageSizeSelector,
    PageButtons,
    PageButton,
    FilterContainer,
    FilterLabel,
    AddIcon,
    EditIcon,
    DeleteIcon
};