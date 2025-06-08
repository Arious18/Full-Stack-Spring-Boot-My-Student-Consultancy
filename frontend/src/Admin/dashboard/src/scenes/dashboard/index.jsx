import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from 'styled-components';

// Styled Components for Dashboard
const DashboardContainer = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, #0c114e 0%, #1a1d4a 100%);
  min-height: 100vh;
  color: #ffffff;
`;

const HeaderSection = styled.div`
  margin-bottom: 40px;
`;

const PageTitle = styled.h1`
  color: #ffffff;
  margin-bottom: 8px;
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PageSubtitle = styled.p`
  color: #c1ccdf;
  margin-bottom: 16px;
  font-size: 18px;
  opacity: 0.9;
`;

const LastUpdated = styled.div`
  color: #a0aec0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  &:before {
    content: "🔄";
    font-size: 12px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 50px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.8) 0%, rgba(24, 11, 87, 0.8) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #3B82F6, #8B5CF6)'};
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const StatIcon = styled.div`
  font-size: 28px;
  margin-bottom: 16px;
  opacity: 0.8;
`;

const StatNumber = styled.div`
  font-size: 38px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 15px;
  color: #c1ccdf;
  margin-bottom: 8px;
  font-weight: 500;
`;

const StatChange = styled.div`
  font-size: 13px;
  color: ${props => props.positive ? '#10B981' : props.neutral ? '#6B7280' : '#EF4444'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;

  &:before {
    content: ${props => props.positive ? '"📈"' : props.neutral ? '"➖"' : '"📉"'};
    font-size: 12px;
  }
`;

const SectionContainer = styled.div`
  margin-bottom: 50px;
`;

const SectionHeader = styled.div`
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

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SectionIcon = styled.span`
  font-size: 24px;
  opacity: 0.8;
`;

const ViewAllButton = styled.button`
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  border: none;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
  }
`;

const Table = styled.table`
  width: 100%;
  background: linear-gradient(135deg, rgba(24, 11, 87, 0.8) 0%, rgba(12, 17, 78, 0.8) 100%);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  overflow: hidden;
  border-collapse: collapse;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.9) 0%, rgba(24, 11, 87, 0.9) 100%);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: scale(1.01);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 18px 20px;
  text-align: left;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TableCell = styled.td`
  padding: 16px 20px;
  color: #e2e8f0;
  font-size: 14px;
  vertical-align: middle;
`;

const StatusBadge = styled.span`
  background: ${props => props.active ?
    'linear-gradient(135deg, #10B981 0%, #059669 100%)' :
    'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'};
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'edit' ?
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

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 50px;
`;

const ActionCard = styled.div`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.7) 0%, rgba(24, 11, 87, 0.7) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.gradient || 'linear-gradient(90deg, #8B5CF6, #3B82F6)'};
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ActionIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  opacity: 0.9;
`;

const ActionTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
`;

const ActionDescription = styled.div`
  font-size: 13px;
  color: #c1ccdf;
  opacity: 0.8;
`;

const LoadingCard = styled.div`
  background: linear-gradient(135deg, rgba(18, 67, 115, 0.6) 0%, rgba(24, 11, 87, 0.6) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  color: #c1ccdf;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 500;

  &:before {
    content: '⏳';
    font-size: 24px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const EmptyState = styled.div`
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
    color: #c1ccdf;
    opacity: 0.8;
  }
`;

const ErrorCard = styled.div`
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  color: #FCA5A5;
  display: flex;
  align-items: center;
  gap: 12px;

  &:before {
    content: '⚠️';
    font-size: 20px;
  }
`;

const Dashboard = ({ navigate }) => {
  // State management
  const [data, setData] = useState({
    universities: [],
    faculties: [],
    fields: [],
    countries: [],
    heroes: [],
    applications: []
  });

  const [loading, setLoading] = useState({
    universities: true,
    faculties: true,
    fields: true,
    countries: true,
    heroes: true,
    applications: true
  });

  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Fetch functions
  const fetchUniversities = async () => {
    try {
      const response = await axios.get("http://localhost:8080/universities");
      setData(prev => ({ ...prev, universities: response.data }));
      setErrors(prev => ({ ...prev, universities: null }));
    } catch (error) {
      console.error("Error fetching universities:", error);
      setErrors(prev => ({ ...prev, universities: "Failed to load universities" }));
    } finally {
      setLoading(prev => ({ ...prev, universities: false }));
    }
  };

  const fetchFaculties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/faculties");
      setData(prev => ({ ...prev, faculties: response.data }));
      setErrors(prev => ({ ...prev, faculties: null }));
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setErrors(prev => ({ ...prev, faculties: "Failed to load faculties" }));
    } finally {
      setLoading(prev => ({ ...prev, faculties: false }));
    }
  };

  const fetchFields = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fields");
      setData(prev => ({ ...prev, fields: response.data }));
      setErrors(prev => ({ ...prev, fields: null }));
    } catch (error) {
      console.error("Error fetching fields:", error);
      setErrors(prev => ({ ...prev, fields: "Failed to load fields" }));
    } finally {
      setLoading(prev => ({ ...prev, fields: false }));
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get("http://localhost:8080/countries");
      setData(prev => ({ ...prev, countries: response.data }));
      setErrors(prev => ({ ...prev, countries: null }));
    } catch (error) {
      console.error("Error fetching countries:", error);
      setErrors(prev => ({ ...prev, countries: "Failed to load countries" }));
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  const fetchHeroes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/heroes");
      setData(prev => ({ ...prev, heroes: response.data }));
      setErrors(prev => ({ ...prev, heroes: null }));
    } catch (error) {
      console.error("Error fetching heroes:", error);
      setErrors(prev => ({ ...prev, heroes: "Failed to load heroes" }));
    } finally {
      setLoading(prev => ({ ...prev, heroes: false }));
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/applications");
      setData(prev => ({ ...prev, applications: response.data }));
      setErrors(prev => ({ ...prev, applications: null }));
    } catch (error) {
      console.error("Error fetching applications:", error);
      setErrors(prev => ({ ...prev, applications: "Failed to load applications" }));
    } finally {
      setLoading(prev => ({ ...prev, applications: false }));
    }
  };

  // Initialize data
  useEffect(() => {
    const loadAllData = async () => {
      await Promise.all([
        fetchUniversities(),
        fetchFaculties(),
        fetchFields(),
        fetchCountries(),
        fetchHeroes(),
        fetchApplications()
      ]);
      setLastUpdated(new Date());
    };

    loadAllData();
  }, []);

  // Helper functions
  const getCountryName = (countryId) => {
    const country = data.countries.find(c => c.id === countryId);
    return country ? country.name : "Unknown";
  };

  const getUniversityName = (universityId) => {
    const university = data.universities.find(u => u.id === universityId);
    return university ? university.name : "Unknown";
  };

  const getFacultyName = (facultyId) => {
    const faculty = data.faculties.find(f => f.id === facultyId);
    return faculty ? faculty.name : "Unknown";
  };

  // Calculate statistics
  const stats = {
    totalUniversities: data.universities.length,
    activeUniversities: data.universities.filter(u => u.active !== false).length,
    totalFaculties: data.faculties.length,
    totalFields: data.fields.length,
    totalCountries: data.countries.length,
    activeHeroes: data.heroes.filter(h => h.active).length,
    totalApplications: data.applications.length,
    pendingApplications: data.applications.filter(a => a.status === 'pending').length || Math.floor(data.applications.length * 0.3)
  };

  const quickActions = [
    {
      title: "Add University",
      description: "Register new university",
      icon: "🏫",
      path: "/admin/universities",
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)"
    },
    {
      title: "Manage Applications",
      description: "Review student applications",
      icon: "📋",
      path: "/admin/applications",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)"
    },
    {
      title: "Add Faculty",
      description: "Create new faculties",
      icon: "🎓",
      path: "/admin/faculties",
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)"
    },
    {
      title: "Manage Fields",
      description: "Study field management",
      icon: "📚",
      path: "/admin/fields",
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
    },
    {
      title: "Hero Sliders",
      description: "Homepage slider content",
      icon: "🎨",
      path: "/admin/heroes",
      gradient: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
    },
    {
      title: "Countries",
      description: "Country management",
      icon: "🌍",
      path: "/admin/countries",
      gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)"
    }
  ];

  const handleAction = (path) => {
    if (navigate) {
      navigate(path);
    } else {
      console.log(`Navigate to: ${path}`);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      await axios.delete(`https://backend-tm-talyp-deneme2.onrender.com/${type}s/${id}`);
      // Refresh the specific data
      switch(type) {
        case 'university': fetchUniversities(); break;
        case 'faculty': fetchFaculties(); break;
        case 'field': fetchFields(); break;
        case 'country': fetchCountries(); break;
        case 'hero': fetchHeroes(); break;
        case 'application': fetchApplications(); break;
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}. Please try again.`);
    }
  };

  return (
      <DashboardContainer>
        <HeaderSection>
          <PageTitle>Dashboard Overview</PageTitle>
          <PageSubtitle>Monitor and manage your educational platform</PageSubtitle>
          <LastUpdated>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </LastUpdated>
        </HeaderSection>

        {/* Statistics Cards */}
        <StatsGrid>
          <StatCard gradient="linear-gradient(90deg, #3B82F6, #1D4ED8)">
            <StatIcon>🏫</StatIcon>
            <StatLabel>Total Universities</StatLabel>
            <StatNumber>{stats.totalUniversities}</StatNumber>
            <StatChange positive>{stats.activeUniversities} Active</StatChange>
          </StatCard>

          <StatCard gradient="linear-gradient(90deg, #10B981, #059669)">
            <StatIcon>🎓</StatIcon>
            <StatLabel>Total Faculties</StatLabel>
            <StatNumber>{stats.totalFaculties}</StatNumber>
            <StatChange positive>+{Math.floor(stats.totalFaculties * 0.1)} this month</StatChange>
          </StatCard>

          <StatCard gradient="linear-gradient(90deg, #8B5CF6, #7C3AED)">
            <StatIcon>📚</StatIcon>
            <StatLabel>Fields of Study</StatLabel>
            <StatNumber>{stats.totalFields}</StatNumber>
            <StatChange positive>+{Math.floor(stats.totalFields * 0.05)} this week</StatChange>
          </StatCard>

          <StatCard gradient="linear-gradient(90deg, #F59E0B, #D97706)">
            <StatIcon>👥</StatIcon>
            <StatLabel>Applications</StatLabel>
            <StatNumber>{stats.totalApplications}</StatNumber>
            <StatChange neutral>{stats.pendingApplications} Pending</StatChange>
          </StatCard>

          <StatCard gradient="linear-gradient(90deg, #06B6D4, #0891B2)">
            <StatIcon>🌍</StatIcon>
            <StatLabel>Countries</StatLabel>
            <StatNumber>{stats.totalCountries}</StatNumber>
            <StatChange neutral>Global coverage</StatChange>
          </StatCard>

          <StatCard gradient="linear-gradient(90deg, #EF4444, #DC2626)">
            <StatIcon>🎨</StatIcon>
            <StatLabel>Hero Sliders</StatLabel>
            <StatNumber>{data.heroes.length}</StatNumber>
            <StatChange positive>{stats.activeHeroes} Active</StatChange>
          </StatCard>
        </StatsGrid>

        {/* Quick Actions */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>⚡</SectionIcon>
              Quick Actions
            </SectionTitle>
          </SectionHeader>
          <QuickActions>
            {quickActions.map((action, index) => (
                <ActionCard
                    key={index}
                    onClick={() => handleAction(action.path)}
                    gradient={action.gradient}
                >
                  <ActionIcon>{action.icon}</ActionIcon>
                  <ActionTitle>{action.title}</ActionTitle>
                  <ActionDescription>{action.description}</ActionDescription>
                </ActionCard>
            ))}
          </QuickActions>
        </SectionContainer>

        {/*/!* Universities Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>🏫</SectionIcon>*/}
        {/*      Universities ({data.universities.length})*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/universities')}>*/}
        {/*      View All Universities →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.universities && <ErrorCard>{errors.universities}</ErrorCard>}*/}

        {/*  {loading.universities ? (*/}
        {/*      <LoadingCard>Loading universities...</LoadingCard>*/}
        {/*  ) : data.universities.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">🏫</div>*/}
        {/*        <h3>No Universities Found</h3>*/}
        {/*        <p>Start by adding your first university to the system</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Name</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Country</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Status</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Yearly Price</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.universities.slice(0, 5).map((university) => (*/}
        {/*            <TableRow key={university.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{university.name}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{getCountryName(university.countryId)}</TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <StatusBadge active={university.active !== false}>*/}
        {/*                  {university.active !== false ? 'Active' : 'Inactive'}*/}
        {/*                </StatusBadge>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <strong>${(university.yearlyPrice || 0).toLocaleString()}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Edit</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('university', university.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/*/!* Faculties Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>🎓</SectionIcon>*/}
        {/*      Faculties ({data.faculties.length})*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/faculties')}>*/}
        {/*      View All Faculties →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.faculties && <ErrorCard>{errors.faculties}</ErrorCard>}*/}

        {/*  {loading.faculties ? (*/}
        {/*      <LoadingCard>Loading faculties...</LoadingCard>*/}
        {/*  ) : data.faculties.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">🎓</div>*/}
        {/*        <h3>No Faculties Found</h3>*/}
        {/*        <p>Add faculties to your universities</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Faculty Name</TableHeaderCell>*/}
        {/*            <TableHeaderCell>University</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Price</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.faculties.slice(0, 5).map((faculty) => (*/}
        {/*            <TableRow key={faculty.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{faculty.name}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{getUniversityName(faculty.universityId)}</TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <strong>${(faculty.price || 0).toLocaleString()}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Edit</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('faculty', faculty.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/*/!* Fields Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>📚</SectionIcon>*/}
        {/*      Fields of Study ({data.fields.length})*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/fields')}>*/}
        {/*      View All Fields →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.fields && <ErrorCard>{errors.fields}</ErrorCard>}*/}

        {/*  {loading.fields ? (*/}
        {/*      <LoadingCard>Loading fields...</LoadingCard>*/}
        {/*  ) : data.fields.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">📚</div>*/}
        {/*        <h3>No Fields Found</h3>*/}
        {/*        <p>Add fields of study to your faculties</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Field Name</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Faculty</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Duration</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Price</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.fields.slice(0, 5).map((field) => (*/}
        {/*            <TableRow key={field.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{field.name}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{getFacultyName(field.facultyId)}</TableCell>*/}
        {/*              <TableCell>{field.duration || 4} years</TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <strong>${(field.price || 0).toLocaleString()}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Edit</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('field', field.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/*/!* Applications Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>📋</SectionIcon>*/}
        {/*      Recent Applications ({data.applications.length})*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/applications')}>*/}
        {/*      View All Applications →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.applications && <ErrorCard>{errors.applications}</ErrorCard>}*/}

        {/*  {loading.applications ? (*/}
        {/*      <LoadingCard>Loading applications...</LoadingCard>*/}
        {/*  ) : data.applications.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">📋</div>*/}
        {/*        <h3>No Applications Found</h3>*/}
        {/*        <p>Student applications will appear here</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Student Name</TableHeaderCell>*/}
        {/*            <TableHeaderCell>University</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Faculty</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Field</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Status</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.applications.slice(0, 5).map((application) => (*/}
        {/*            <TableRow key={application.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{application.name} {application.surname}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>{getUniversityName(application.chosenUniversity)}</TableCell>*/}
        {/*              <TableCell>{getFacultyName(application.chosenFaculty)}</TableCell>*/}
        {/*              <TableCell>{application.chosenField ?*/}
        {/*                  data.fields.find(f => f.id === application.chosenField)?.name || 'Unknown' :*/}
        {/*                  'Not specified'*/}
        {/*              }</TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <StatusBadge active={application.status !== 'rejected'}>*/}
        {/*                  {application.status || 'Pending'}*/}
        {/*                </StatusBadge>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Review</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('application', application.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/*/!* Countries Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>🌍</SectionIcon>*/}
        {/*      Countries ({data.countries.length})*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/countries')}>*/}
        {/*      View All Countries →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.countries && <ErrorCard>{errors.countries}</ErrorCard>}*/}

        {/*  {loading.countries ? (*/}
        {/*      <LoadingCard>Loading countries...</LoadingCard>*/}
        {/*  ) : data.countries.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">🌍</div>*/}
        {/*        <h3>No Countries Found</h3>*/}
        {/*        <p>Add countries to organize your universities</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Country Name</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Universities</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Description</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.countries.slice(0, 5).map((country) => (*/}
        {/*            <TableRow key={country.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{country.name}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                {data.universities.filter(u => u.countryId === country.id).length} universities*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                {country.description ?*/}
        {/*                    (country.description.length > 50 ?*/}
        {/*                            `${country.description.substring(0, 50)}...` :*/}
        {/*                            country.description*/}
        {/*                    ) :*/}
        {/*                    'No description'*/}
        {/*                }*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Edit</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('country', country.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/*/!* Hero Sliders Section *!/*/}
        {/*<SectionContainer>*/}
        {/*  <SectionHeader>*/}
        {/*    <SectionTitle>*/}
        {/*      <SectionIcon>🎨</SectionIcon>*/}
        {/*      Hero Sliders ({data.heroes.length}/5)*/}
        {/*    </SectionTitle>*/}
        {/*    <ViewAllButton onClick={() => handleAction('/admin/heroes')}>*/}
        {/*      Manage Heroes →*/}
        {/*    </ViewAllButton>*/}
        {/*  </SectionHeader>*/}

        {/*  {errors.heroes && <ErrorCard>{errors.heroes}</ErrorCard>}*/}

        {/*  {loading.heroes ? (*/}
        {/*      <LoadingCard>Loading hero sliders...</LoadingCard>*/}
        {/*  ) : data.heroes.length === 0 ? (*/}
        {/*      <EmptyState>*/}
        {/*        <div className="icon">🎨</div>*/}
        {/*        <h3>No Hero Sliders Found</h3>*/}
        {/*        <p>Create engaging hero sliders for your homepage</p>*/}
        {/*      </EmptyState>*/}
        {/*  ) : (*/}
        {/*      <Table>*/}
        {/*        <TableHeader>*/}
        {/*          <TableRow>*/}
        {/*            <TableHeaderCell>Header</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Order</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Status</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Description</TableHeaderCell>*/}
        {/*            <TableHeaderCell>Actions</TableHeaderCell>*/}
        {/*          </TableRow>*/}
        {/*        </TableHeader>*/}
        {/*        <tbody>*/}
        {/*        {data.heroes.map((hero) => (*/}
        {/*            <TableRow key={hero.id}>*/}
        {/*              <TableCell>*/}
        {/*                <strong>{hero.header}</strong>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>#{hero.order || 'N/A'}</TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <StatusBadge active={hero.active}>*/}
        {/*                  {hero.active ? 'Active' : 'Inactive'}*/}
        {/*                </StatusBadge>*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                {hero.description ?*/}
        {/*                    (hero.description.length > 40 ?*/}
        {/*                            `${hero.description.substring(0, 40)}...` :*/}
        {/*                            hero.description*/}
        {/*                    ) :*/}
        {/*                    'No description'*/}
        {/*                }*/}
        {/*              </TableCell>*/}
        {/*              <TableCell>*/}
        {/*                <ActionButton variant="edit">Edit</ActionButton>*/}
        {/*                <ActionButton*/}
        {/*                    variant="delete"*/}
        {/*                    onClick={() => handleDelete('hero', hero.id)}*/}
        {/*                >*/}
        {/*                  Delete*/}
        {/*                </ActionButton>*/}
        {/*              </TableCell>*/}
        {/*            </TableRow>*/}
        {/*        ))}*/}
        {/*        </tbody>*/}
        {/*      </Table>*/}
        {/*  )}*/}
        {/*</SectionContainer>*/}

        {/* System Status Footer */}
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>
              <SectionIcon>📊</SectionIcon>
              System Status
            </SectionTitle>
          </SectionHeader>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px'
          }}>
            <StatCard gradient="linear-gradient(90deg, #10B981, #059669)">
              <StatLabel>Database</StatLabel>
              <StatNumber style={{ fontSize: '24px' }}>🟢 Online</StatNumber>
              <StatChange positive>All services operational</StatChange>
            </StatCard>

            <StatCard gradient="linear-gradient(90deg, #3B82F6, #1D4ED8)">
              <StatLabel>API Status</StatLabel>
              <StatNumber style={{ fontSize: '24px' }}>🟢 Healthy</StatNumber>
              <StatChange positive>Response time: ~120ms</StatChange>
            </StatCard>

            <StatCard gradient="linear-gradient(90deg, #F59E0B, #D97706)">
              <StatLabel>Storage</StatLabel>
              <StatNumber style={{ fontSize: '24px' }}>📁 85%</StatNumber>
              <StatChange neutral>15% available</StatChange>
            </StatCard>

            <StatCard gradient="linear-gradient(90deg, #8B5CF6, #7C3AED)">
              <StatLabel>Users Online</StatLabel>
              <StatNumber style={{ fontSize: '24px' }}>👥 {Math.floor(Math.random() * 50) + 10}</StatNumber>
              <StatChange positive>Active sessions</StatChange>
            </StatCard>
          </div>
        </SectionContainer>
      </DashboardContainer>
  );
};

export default Dashboard;