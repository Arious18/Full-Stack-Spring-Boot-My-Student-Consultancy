import React, { useState } from 'react';
import styled from 'styled-components';
import { Header } from "../../components/index.jsx";
import AdminCountries from '../AdminCountries/index.jsx';
import AdminUniversities from '../UniversityAdmin/index.jsx';
import AdminFaculties from '../AdminFaculties/index.jsx';
import AdminFields from '../AdminFields/index.jsx';

// Styled Components
const Container = styled.div`
  margin: 0;
  padding: 0;
  background-color: #141b2d;
  min-height: 100vh;
  color: white;
`;

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #2d3748;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 16px 24px;
  cursor: pointer;
  font-weight: ${props => props.active ? '600' : '400'};
  background-color: ${props => props.active ? '#1F2A40' : 'transparent'};
  border-bottom: 2px solid ${props => props.active ? '#4cceac' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#1F2A40' : '#1a2035'};
  }
`;

const ContentArea = styled.div`
  padding: 0 20px;
`;

const TableComponent = () => {
    const [activeTab, setActiveTab] = useState('countries');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Container>
            <Header />
            <TabContainer>
                <Tab
                    active={activeTab === 'countries'}
                    onClick={() => handleTabChange('countries')}
                >
                    Countries
                </Tab>
                <Tab
                    active={activeTab === 'universities'}
                    onClick={() => handleTabChange('universities')}
                >
                    Universities
                </Tab>
                <Tab
                    active={activeTab === 'faculties'}
                    onClick={() => handleTabChange('faculties')}
                >
                    Faculties
                </Tab>
                <Tab
                    active={activeTab === 'fields'}
                    onClick={() => handleTabChange('fields')}
                >
                    Fields
                </Tab>
            </TabContainer>
            <ContentArea>
                {activeTab === 'countries' && <AdminCountries />}
                {activeTab === 'universities' && <AdminUniversities />}
                {activeTab === 'faculties' && <AdminFaculties />}
                {activeTab === 'fields' && <AdminFields />}
            </ContentArea>
        </Container>
    );
};

export default TableComponent;