# Full-Stack Student Consultancy Portal

![Project Banner](/pictures/1.png)

## 📚 Overview

**Full-Stack Student Consultancy Portal** is a comprehensive web application designed to connect international students with universities globally while providing career opportunities and educational news. The platform facilitates exploration of universities across different countries, provides detailed information about educational programs, streamlines the university application process, offers job opportunities, and keeps users updated with the latest educational news.

This portal serves as a centralized hub for international education opportunities, career development, and educational content, making it easier for students to discover educational institutions aligned with their academic and career goals. The system also provides administrators with powerful tools to manage university listings, country information, job postings, news articles, and featured content.

## ✨ Features

### 🔐 User Authentication & Management
- **Secure Authentication**: JWT-based authentication with token expiration
- **Role-based Access Control**: User/Admin roles with different permissions
- **Encrypted Security**: BCrypt password storage for maximum security
- **Profile Management**: Comprehensive user profile with personal information
- **First-time Admin Setup**: Initial system configuration endpoint
- **User Management**: Admin panel for managing user accounts and roles

### 🏫 University Management System
- **University Exploration**: Browse universities filtered by country
- **Detailed Profiles**: University information with descriptions, pricing, and programs
- **Search Functionality**: Advanced text-based search capabilities
- **Country Filtering**: Filter universities by location and country
- **Pricing Information**: Yearly fees, discount options, and financial details
- **Image Management**: Visual content with cloud-based storage

### 💼 Job Portal System
- **Job Postings**: Complete job listing and management system
- **Admin Job Management**: Admins can create, edit, and delete job listings
- **User Job Access**: Students can view and apply for available positions
- **Job Categories**: Organize jobs by industry, type, and location
- **Application Tracking**: Monitor job applications and deadlines
- **Salary Information**: Transparent compensation details
- **Remote Work Options**: Support for remote and on-site positions
- **Application Deadlines**: Time-sensitive job opportunity management

### 📰 News & Content Management
- **News Publishing**: Admin-controlled news article creation and management
- **Content Sharing**: News articles accessible to all users
- **Category Management**: Organize news by topics and importance
- **Breaking News**: Priority news alerts and notifications
- **Article Search**: Find relevant news content quickly
- **Rich Content**: Support for images and detailed article content
- **News Analytics**: Track article views and engagement

### 🎨 Modern Design & User Experience
- **Glassmorphism Design**: Modern, elegant glass-effect UI components
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Elements**: Smooth animations and hover effects
- **Dark Theme**: Modern dark theme with purple and blue accents
- **Intuitive Navigation**: User-friendly interface with consistent patterns
- **Visual Hierarchy**: Clear content organization and typography
- **Accessibility**: WCAG-compliant design for all users

### 🔧 Admin Dashboard & Management
- **Comprehensive Dashboard**: Monitor all system metrics and activities
- **Content Management**: CRUD operations for all entities
- **User Management**: Control user accounts and permissions
- **Analytics Overview**: View system statistics and usage data
- **Hero Section Management**: Control homepage carousel content
- **Image Upload System**: Manage visual content across the platform
- **System Configuration**: Platform settings and customization options

### 🔒 Security & API
- **JWT Authentication**: Stateless, secure token-based authentication
- **Protected Endpoints**: Method-level security for sensitive operations
- **CORS Configuration**: Secure cross-origin resource sharing
- **Input Validation**: Comprehensive data validation and sanitization
- **Role-based Authorization**: Fine-grained access control
- **Secure File Upload**: Protected image and document handling

### ☁️ Cloud Integration
- **Cloudflare R2 Storage**: S3-compatible cloud storage for images
- **CDN Integration**: Fast global content delivery
- **UUID File Naming**: Unique, secure file identification
- **Public URL Generation**: Seamless frontend asset access
- **Content Type Handling**: Proper MIME type management

## 🖥️ Screenshots

### Homepage with Hero Carousel
![Homepage Hero](/pictures/1.png)

### Admin Dashboard Overview
![Admin Dashboard](/pictures/5.png)

### User Management System
![User Management](/pictures/8.png)

### Job Portal Interface
![Job Portal](/pictures/6.png)

### Job Detail View
![Job Details](/pictures/10.png)

### News Section
![News Portal](/pictures/11.png)

### University Listings
![Universities Grid](/pictures/13.png)

### Hero Management Interface
![Hero Management](/pictures/3.png)

### Login Interface
![Login Page](/pictures/12.png)

### Search Functionality
![Search Interface](/pictures/5.png)

## 🛠️ Technology Stack

### Backend Technologies
- **Java 17**: Modern language features with enhanced performance
- **Spring Boot 3.x**: Rapid application development with auto-configuration
- **Spring Security**: Enterprise-grade security framework
- **Spring Data MongoDB**: Simplified data access with automatic repositories
- **JWT (JSON Web Tokens)**: Stateless authentication mechanism
- **MongoDB**: Flexible NoSQL document database
- **AWS SDK for Java**: S3-compatible storage integration (Cloudflare R2)
- **Bean Validation (JSR-303)**: Annotation-based data validation
- **SLF4J/Logback**: Comprehensive logging and monitoring
- **Spring Web MVC**: RESTful API development framework
- **Maven**: Dependency management and build automation

### Frontend Technologies
- **React 18**: Modern component-based UI library with hooks
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Glassmorphism Effects**: Modern glass-effect design components
- **Axios**: Promise-based HTTP client for API communication
- **React Router 6**: Advanced client-side routing
- **React Hook Form**: Efficient form state management
- **Context API**: Global state management for authentication
- **React Error Boundary**: Graceful error handling and recovery
- **Custom Hooks**: Reusable component logic
- **TypeScript Support**: Type-safe development (optional)

### Database & Storage
- **MongoDB**: Primary database for application data
- **Cloudflare R2**: Object storage for images and files
- **GridFS**: Large file storage within MongoDB
- **Database Indexing**: Optimized query performance
- **Data Validation**: Schema validation and constraints

### DevOps & Deployment
- **Docker**: Containerization for consistent deployments
- **Cloudflare Workers**: Serverless frontend hosting
- **CI/CD Pipeline**: Automated testing and deployment
- **Environment Configuration**: Multi-environment support
- **Health Monitoring**: Application health checks and metrics
- **Logging**: Centralized logging and error tracking

## 🏗️ System Architecture

The application follows a modern microservices-inspired architecture:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   React SPA     │◄──►│   Spring Boot    │◄──►│    MongoDB      │
│   Frontend      │    │     Backend      │    │    Database     │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        ▼                        │
         │               ┌──────────────────┐               │
         │               │                  │               │
         └──────────────►│  Cloudflare R2   │◄──────────────┘
                         │     Storage      │
                         │                  │
                         └──────────────────┘
```

### Backend Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                       │
│     (Controllers: Auth, University, Job, News, Hero)            │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                        Service Layer                            │
│   (Business Logic: UserService, UniversityService, JobService)  │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Repository Layer                           │
│  (Data Access: UserRepo, UniversityRepo, JobRepo, NewsRepo)     │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                       Data Layer                                │
│     (Models: User, University, Country, Job, News, Hero)        │
└─────────────────────────────────────────────────────────────────┘
```

### Cross-Cutting Concerns
- **Security**: JWT filters, CORS configuration, input validation
- **Storage**: File upload service, image processing
- **Monitoring**: Health checks, metrics, logging
- **Error Handling**: Global exception handlers
- **Caching**: Response caching and optimization

## 🚀 Getting Started

### Prerequisites
- **Java 17+**: OpenJDK or Oracle JDK
- **Node.js 18+**: Latest LTS version recommended
- **MongoDB 6.0+**: Community or Atlas cloud version
- **Cloudflare R2**: Account for file storage
- **Git**: Version control system
- **Maven 3.8+**: Build automation (or use wrapper)

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/student-consultancy-portal.git
   cd student-consultancy-portal/backend
   ```

2. **Configure Environment Variables**:
   Create `application.properties`:
   ```properties
   # Server Configuration
   server.port=8080
   server.servlet.context-path=/api
   
   # Database Configuration
   spring.data.mongodb.uri=mongodb://localhost:27017/student_consultancy
   spring.data.mongodb.auto-index-creation=true
   spring.data.mongodb.database=student_consultancy
   
   # JWT Configuration
   jwt.secret=your-256-bit-secret-key-here
   jwt.expiration=86400000
   jwt.refresh-expiration=604800000
   
   # Cloudflare R2 Configuration
   aws.accessKey=your-r2-access-key
   aws.secretKey=your-r2-secret-key
   aws.region=auto
   aws.bucketName=student-consultancy-storage
   aws.endpoint=https://your-account-id.r2.cloudflarestorage.com
   
   # File Upload Configuration
   spring.servlet.multipart.max-file-size=10MB
   spring.servlet.multipart.max-request-size=50MB
   
   # Logging Configuration
   logging.level.root=INFO
   logging.level.com.consultancy=DEBUG
   logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n
   
   # CORS Configuration
   cors.allowed-origins=http://localhost:5173,https://your-frontend-domain.com
   cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
   cors.allowed-headers=*
   cors.allow-credentials=true
   ```

3. **Build and Run**:
   ```bash
   # Using Maven Wrapper (recommended)
   ./mvnw clean compile
   ./mvnw spring-boot:run
   
   # Or using installed Maven
   mvn clean compile
   mvn spring-boot:run
   ```

4. **Verify Backend**:
   ```bash
   curl http://localhost:8080/api/debug/health
   ```

### Frontend Setup

1. **Navigate to Frontend**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   # or using yarn
   yarn install
   ```

3. **Configure Environment**:
   Create `.env.local`:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_APP_TITLE=Student Consultancy Portal
   VITE_DEFAULT_LANGUAGE=en
   VITE_ENABLE_ANALYTICS=false
   VITE_CLOUDFLARE_ANALYTICS_TOKEN=your-token-here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8080/api`

### Initial System Setup

1. **Create First Admin Account**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/setup-admin \
     -H "Content-Type: application/json" \
     -d '{
       "name": "System Admin",
       "surname": "Administrator", 
       "email": "admin@consultancy.com",
       "password": "SecureAdmin123!"
     }'
   ```

2. **Login and Get JWT Token**:
   ```bash
   curl -X POST http://localhost:8080/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@consultancy.com",
       "password": "SecureAdmin123!"
     }'
   ```

3. **Access Admin Dashboard**:
   - Login with admin credentials
   - Navigate to Admin Panel in the application
   - Start adding countries, universities, jobs, and news

## 📝 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/auth/register` | Register new user | `{name, surname, email, password}` | JWT + user data |
| POST | `/auth/login` | User login | `{email, password}` | JWT + user data |
| POST | `/auth/setup-admin` | Create first admin | `{name, surname, email, password}` | JWT + admin data |
| POST | `/auth/register-admin` | Create admin (admin only) | `{name, surname, email, password}` | JWT + admin data |
| GET | `/auth/profile` | Get current user profile | - | User details |
| PUT | `/auth/profile` | Update user profile | `{name, bio, phoneNumber, ...}` | Updated user |
| POST | `/auth/refresh` | Refresh JWT token | `{refreshToken}` | New JWT |

### University Management

| Method | Endpoint | Description | Access | Request Format |
|--------|----------|-------------|--------|----------------|
| GET | `/universities` | List all universities | Public | Query params: `country`, `search` |
| GET | `/universities/{id}` | Get university details | Public | Path variable |
| POST | `/universities` | Create university | Admin | Multipart: `name`, `description`, `about`, `yearlyPrice`, `countryId`, `image` |
| PUT | `/universities/{id}` | Update university | Admin | Multipart form data |
| DELETE | `/universities/{id}` | Delete university | Admin | Path variable |
| GET | `/universities/by-country/{countryId}` | Universities by country | Public | Path variable |
| GET | `/universities/search` | Search universities | Public | Query: `?q=searchTerm` |

### Job Portal Endpoints

| Method | Endpoint | Description | Access | Request Body |
|--------|----------|-------------|--------|--------------|
| GET | `/jobs` | List all active jobs | Public | Query params: `type`, `location`, `search` |
| GET | `/jobs/{id}` | Get job details | Public | Path variable |
| POST | `/jobs` | Create job posting | Admin | `{title, company, description, requirements, salary, location, type, deadline}` |
| PUT | `/jobs/{id}` | Update job | Admin | Full job object |
| DELETE | `/jobs/{id}` | Delete job | Admin | Path variable |
| GET | `/jobs/search` | Search jobs | Public | Query: `?q=searchTerm&type=Full Time` |
| POST | `/jobs/{id}/apply` | Apply for job | User | `{coverLetter, resume}` |
| GET | `/jobs/{id}/applications` | Get job applications | Admin | Path variable |

### News Management

| Method | Endpoint | Description | Access | Request Format |
|--------|----------|-------------|--------|----------------|
| GET | `/news` | List all published news | Public | Query params: `category`, `search` |
| GET | `/news/{id}` | Get news article | Public | Path variable |
| POST | `/news` | Create news article | Admin | Multipart: `title`, `content`, `category`, `image`, `breaking` |
| PUT | `/news/{id}` | Update news article | Admin | Multipart form data |
| DELETE | `/news/{id}` | Delete news article | Admin | Path variable |
| GET | `/news/breaking` | Get breaking news | Public | - |
| GET | `/news/categories` | List news categories | Public | - |
| POST | `/news/{id}/share` | Share news article | User | `{platform, message}` |

### Country Management

| Method | Endpoint | Description | Access | Request Format |
|--------|----------|-------------|--------|----------------|
| GET | `/countries` | List all countries | Public | - |
| GET | `/countries/{id}` | Get country details | Public | Path variable |
| POST | `/countries` | Create country | Admin | Multipart: `name`, `description`, `image` |
| PUT | `/countries/{id}` | Update country | Admin | Multipart form data |
| DELETE | `/countries/{id}` | Delete country | Admin | Path variable |
| GET | `/countries/{id}/universities` | Universities in country | Public | Path variable |

### Hero Section Management

| Method | Endpoint | Description | Access | Request Format |
|--------|----------|-------------|--------|----------------|
| GET | `/heroes` | List all heroes | Public | - |
| GET | `/heroes/active` | List active heroes only | Public | - |
| POST | `/heroes` | Create hero slide | Admin | Multipart: `header`, `description`, `backgroundImage`, `order`, `active` |
| PUT | `/heroes/{id}` | Update hero slide | Admin | Multipart form data |
| DELETE | `/heroes/{id}` | Delete hero slide | Admin | Path variable |
| PUT | `/heroes/{id}/toggle` | Toggle hero active status | Admin | - |

### Admin Dashboard

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/admin/dashboard` | Get dashboard statistics | Admin |
| GET | `/admin/users` | List all users | Admin |
| PUT | `/admin/users/{id}/role` | Update user role | Admin |
| GET | `/admin/analytics` | System analytics | Admin |
| GET | `/admin/logs` | System logs | Admin |

## 💾 Database Schema

### Enhanced User Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "surname": "String", 
  "email": "String (unique, indexed)",
  "password": "String (BCrypt hashed)",
  "roles": ["USER", "ADMIN"],
  "profile": {
    "dateOfBirth": "LocalDate",
    "phoneNumber": "String",
    "address": "String",
    "nationality": "String", 
    "gender": "String",
    "profilePicture": "String",
    "bio": "String",
    "socialLinks": {
      "linkedin": "String",
      "github": "String"
    }
  },
  "preferences": {
    "newsletter": "Boolean",
    "jobAlerts": "Boolean",
    "language": "String"
  },
  "createdDate": "LocalDateTime",
  "lastLoginDate": "LocalDateTime",
  "active": "Boolean"
}
```

### Job Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "company": "String",
  "description": "String",
  "requirements": ["String"],
  "responsibilities": ["String"],
  "qualifications": ["String"],
  "salary": {
    "min": "Double",
    "max": "Double", 
    "currency": "String",
    "period": "String"
  },
  "location": "String",
  "type": "String (Full Time, Part Time, Contract, Remote)",
  "category": "String",
  "skills": ["String"],
  "experience": "String",
  "education": "String",
  "benefits": ["String"],
  "applicationDeadline": "LocalDateTime",
  "postedDate": "LocalDateTime",
  "active": "Boolean",
  "urgent": "Boolean",
  "featured": "Boolean",
  "views": "Integer",
  "applications": ["ObjectId"],
  "createdBy": "ObjectId (User)"
}
```

### News Collection  
```json
{
  "_id": "ObjectId",
  "title": "String",
  "content": "String",
  "summary": "String",
  "category": "String",
  "tags": ["String"],
  "author": "ObjectId (User)",
  "publishDate": "LocalDateTime",
  "updatedDate": "LocalDateTime", 
  "imageUrl": "String",
  "imageFileName": "String",
  "breaking": "Boolean",
  "featured": "Boolean",
  "views": "Integer",
  "likes": ["ObjectId"],
  "shares": "Integer",
  "status": "String (DRAFT, PUBLISHED, ARCHIVED)",
  "seo": {
    "metaTitle": "String",
    "metaDescription": "String",
    "keywords": ["String"]
  }
}
```

### University Collection (Enhanced)
```json
{
  "_id": "ObjectId",
  "name": "String",
  "description": "String", 
  "about": "String",
  "countryId": "ObjectId",
  "location": {
    "city": "String",
    "address": "String",
    "coordinates": {
      "lat": "Double",
      "lng": "Double"
    }
  },
  "pricing": {
    "yearlyPrice": "Double",
    "discountPrice": "Double",
    "currency": "String",
    "scholarships": ["String"]
  },
  "programs": ["String"],
  "rankings": {
    "world": "Integer",
    "national": "Integer",
    "subject": "Map<String, Integer>"
  },
  "imageUrl": "String",
  "imageFileName": "String",
  "gallery": ["String"],
  "contact": {
    "website": "String",
    "email": "String", 
    "phone": "String"
  },
  "accreditation": ["String"],
  "establishedYear": "Integer",
  "studentCount": "Integer",
  "internationalStudents": "Integer",
  "campusSize": "String",
  "featured": "Boolean",
  "active": "Boolean"
}
```

## 🔒 Security Implementation

### Authentication & Authorization
- **JWT Token Security**: 256-bit secret keys with configurable expiration
- **Refresh Token System**: Long-lived refresh tokens for seamless re-authentication
- **Password Security**: BCrypt with configurable work factor (minimum 12 rounds)
- **Role-based Access**: Fine-grained permissions for different user types
- **Session Management**: Stateless JWT with secure cookie options

### API Security
- **Input Validation**: Comprehensive validation using Bean Validation
- **SQL Injection Prevention**: MongoDB's document-based approach with parameterized queries
- **XSS Protection**: Input sanitization and output encoding
- **CSRF Protection**: Token-based CSRF protection for state-changing operations
- **Rate Limiting**: Request throttling to prevent abuse
- **CORS Security**: Restrictive CORS policies with specific origin allowlisting

### File Upload Security
- **File Type Validation**: Strict MIME type checking
- **File Size Limits**: Configurable upload size restrictions
- **Virus Scanning**: Integration with security scanning services
- **Secure Storage**: Cloud-based storage with proper access controls
- **Content Validation**: Image processing and validation

### Infrastructure Security
- **HTTPS Enforcement**: TLS 1.2+ for all communications
- **Security Headers**: Comprehensive security header implementation
- **Environment Isolation**: Separate configurations for different environments
- **Secrets Management**: Secure handling of sensitive configuration data
- **Audit Logging**: Comprehensive security event logging

## 🎨 Design System & UI/UX

### Glassmorphism Design
- **Glass Effects**: Translucent components with backdrop blur
- **Layered Interfaces**: Multi-level depth and transparency
- **Subtle Borders**: Refined border styling with opacity
- **Gradient Backgrounds**: Smooth color transitions
- **Shadow Systems**: Multiple shadow layers for depth

### Color Palette
```css
/* Primary Colors */
--primary-purple: #6366f1
--primary-blue: #3b82f6
--primary-dark: #1e1b4b

/* Glass Effects */
--glass-bg: rgba(255, 255, 255, 0.1)
--glass-border: rgba(255, 255, 255, 0.2)
--backdrop-blur: blur(10px)

/* Status Colors */
--success: #10b981
--warning: #f59e0b  
--error: #ef4444
--info: #06b6d4
```

### Typography System
- **Headings**: Inter font family with varied weights
- **Body Text**: Optimized for readability across devices
- **Code**: Fira Code for technical content
- **Responsive Scaling**: Fluid typography system

### Component Library
- **Cards**: Glass-effect containers with hover animations
- **Buttons**: Multiple variants with state management
- **Forms**: Consistent styling with validation states
- **Navigation**: Responsive navigation with active states
- **Modals**: Backdrop blur with smooth animations

## 🔍 Common Issues & Solutions

### Development Issues

**CORS Errors During Development**:
```javascript
// Frontend: Add to vite.config.js
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
}
```

**JWT Token Expiration**:
```javascript
// Frontend: Implement token refresh
const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh');
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    // Redirect to login
  }
};
```

### Database Issues

**MongoDB Connection Problems**:
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check connection string
mongo "mongodb://localhost:27017/student_consultancy"
```

### File Upload Issues

**Image Upload Failures**:
```java
// Backend: Check file size limits
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=50MB
```

### Performance Optimization

**Database Indexing**:
```javascript
// MongoDB indexes
db.universities.createIndex({"name": "text", "description": "text"})
db.jobs.createIndex({"title": "text", "company": "text"})
db.news.createIndex({"publishDate": -1})
```

## 📊 Project Structure

```
student-consultancy-portal/
├── backend/
│   ├── src/main/java/com/consultancy/
│   │   ├── auth/
│   │   │   ├── controller/AuthController.java
│   │   │   ├── service/UserService.java
│   │   │   ├── model/User.java
│   │   │   ├── repository/UserRepository.java
│   │   │   └── dto/LoginRequest.java
│   │   ├── university/
│   │   │   ├── controller/UniversityController.java
│   │   │   ├── service/UniversityService.java
│   │   │   ├── model/University.java
│   │   │   └── repository/UniversityRepository.java
│   │   ├── job/
│   │   │   ├── controller/JobController.java
│   │   │   ├── service/JobService.java
│   │   │   ├── model/Job.java
│   │   │   └── repository/JobRepository.java
│   │   ├── news/
│   │   │   ├── controller/NewsController.java
│   │   │   ├── service/NewsService.java
│   │   │   ├── model/News.java
│   │   │   └── repository/NewsRepository.java
│   │   ├── country/
│   │   ├── hero/
│   │   ├── config/
│   │   │   ├── SecurityConfig.java
│   │   │   ├── WebConfig.java
│   │   │   └── AwsConfig.java
│   │   ├── security/
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── JwtUtil.java
│   │   └── ConsultancyApplication.java
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── application-prod.properties
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   ├── university/
│   │   │   │   ├── UniversityCard.jsx
│   │   │   │   └── UniversityDetail.jsx
│   │   │   ├── job/
│   │   │   │   ├── JobCard.jsx
│   │   │   │   ├── JobDetail.jsx
│   │   │   │   └── JobApplication.jsx
│   │   │   ├── news/
│   │   │   │   ├── NewsCard.jsx
│   │   │   │   └── NewsDetail.jsx
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── UserManagement.jsx
│   │   │       └── ContentManager.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Universities.jsx
│   │   │   ├── Jobs.jsx
│   │   │   ├── News.jsx
│   │   │   ├── Login.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useApi.js
│   │   │   └── useLocalStorage.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── universityService.js
│   │   │   ├── jobService.js
│   │   │   └── newsService.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── components.css
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   │   └── assets/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.backend
│   └── Dockerfile.frontend
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
├── scripts/
│   ├── setup.sh
│   ├── deploy.sh
│   └── backup.sh
├── .gitignore
├── LICENSE
└── README.md
```

## 🔄 CI/CD Pipeline

The project includes a comprehensive continuous integration and deployment pipeline:

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Set up JDK 17
        uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Run backend tests
        run: |
          cd backend
          ./mvnw clean test
      - name: Generate test report
        uses: dorny/test-reporter@v1
        if: success() || failure()
        with:
          name: Backend Tests
          path: backend/target/surefire-reports/*.xml
          reporter: java-junit

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      - name: Run linting
        run: |
          cd frontend
          npm run lint
      - name: Run tests
        run: |
          cd frontend
          npm run test
      - name: Build frontend
        run: |
          cd frontend
          npm run build

  deploy:
    needs: [backend-tests, frontend-tests]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: echo "Deploying to production..."
```

### Deployment Strategies

1. **Backend Deployment**:
   - JAR file deployment to cloud services
   - Docker containerization
   - Health check endpoints
   - Rolling updates with zero downtime

2. **Frontend Deployment**:
   - Static site deployment to Cloudflare Workers
   - CDN integration for global performance
   - Environment-specific builds
   - Asset optimization and caching

3. **Database Migration**:
   - Automated schema updates
   - Data migration scripts
   - Backup before deployment
   - Rollback procedures

## 🚀 Deployment Guide

### Docker Deployment

1. **Build Docker Images**:
   ```bash
   # Backend
   docker build -f docker/Dockerfile.backend -t consultancy-backend .
   
   # Frontend
   docker build -f docker/Dockerfile.frontend -t consultancy-frontend .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

3. **Environment Variables**:
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     backend:
       image: consultancy-backend
       environment:
         - MONGODB_URI=mongodb://mongo:27017/consultancy
         - JWT_SECRET=${JWT_SECRET}
         - AWS_ACCESS_KEY=${AWS_ACCESS_KEY}
         - AWS_SECRET_KEY=${AWS_SECRET_KEY}
       ports:
         - "8080:8080"
       depends_on:
         - mongo
     
     frontend:
       image: consultancy-frontend
       environment:
         - VITE_API_BASE_URL=http://backend:8080/api
       ports:
         - "80:80"
       depends_on:
         - backend
     
     mongo:
       image: mongo:6.0
       volumes:
         - mongo_data:/data/db
       ports:
         - "27017:27017"
   
   volumes:
     mongo_data:
   ```

### Cloud Deployment

#### AWS Deployment
```bash
# Deploy backend to AWS Elastic Beanstalk
eb init consultancy-backend
eb create production
eb deploy

# Deploy frontend to AWS S3 + CloudFront
aws s3 sync frontend/dist s3://consultancy-frontend-bucket
aws cloudfront create-invalidation --distribution-id E123456789 --paths "/*"
```

#### Google Cloud Deployment
```bash
# Deploy to Google Cloud Run
gcloud run deploy consultancy-backend \
  --image gcr.io/project-id/consultancy-backend \
  --platform managed \
  --region us-central1

# Deploy frontend to Firebase Hosting
npm install -g firebase-tools
firebase deploy --only hosting
```

#### Azure Deployment
```bash
# Deploy to Azure App Service
az webapp create --resource-group consultancy-rg --plan consultancy-plan --name consultancy-app
az webapp deployment source config --name consultancy-app --resource-group consultancy-rg --repo-url https://github.com/user/repo
```

## 📊 Monitoring & Analytics

### Application Monitoring

1. **Health Checks**:
   ```java
   @RestController
   @RequestMapping("/api/health")
   public class HealthController {
       
       @GetMapping
       public ResponseEntity<Map<String, String>> health() {
           Map<String, String> status = new HashMap<>();
           status.put("status", "UP");
           status.put("timestamp", Instant.now().toString());
           status.put("version", "1.0.0");
           return ResponseEntity.ok(status);
       }
       
       @GetMapping("/detailed")
       public ResponseEntity<Map<String, Object>> detailedHealth() {
           // Database connectivity check
           // External service checks
           // Memory usage
           // Disk space
           return ResponseEntity.ok(healthData);
       }
   }
   ```

2. **Metrics Collection**:
   ```properties
   # application.properties
   management.endpoints.web.exposure.include=health,metrics,info,prometheus
   management.endpoint.health.show-details=always
   management.metrics.export.prometheus.enabled=true
   ```

3. **Logging Configuration**:
   ```xml
   <!-- logback-spring.xml -->
   <configuration>
       <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
           <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
               <providers>
                   <timestamp/>
                   <logLevel/>
                   <loggerName/>
                   <message/>
                   <mdc/>
                   <stackTrace/>
               </providers>
           </encoder>
       </appender>
       
       <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
           <file>logs/application.log</file>
           <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
               <fileNamePattern>logs/application.%d{yyyy-MM-dd}.log</fileNamePattern>
               <maxHistory>30</maxHistory>
           </rollingPolicy>
       </appender>
       
       <root level="INFO">
           <appender-ref ref="STDOUT"/>
           <appender-ref ref="FILE"/>
       </root>
   </configuration>
   ```

### Performance Optimization

1. **Database Optimization**:
   ```javascript
   // MongoDB indexes for better performance
   db.universities.createIndex({"name": "text", "description": "text"})
   db.universities.createIndex({"countryId": 1})
   db.universities.createIndex({"featured": 1, "active": 1})
   
   db.jobs.createIndex({"title": "text", "company": "text", "description": "text"})
   db.jobs.createIndex({"active": 1, "applicationDeadline": 1})
   db.jobs.createIndex({"type": 1, "location": 1})
   
   db.news.createIndex({"publishDate": -1})
   db.news.createIndex({"category": 1, "breaking": 1})
   db.news.createIndex({"title": "text", "content": "text"})
   
   db.users.createIndex({"email": 1}, {"unique": true})
   db.users.createIndex({"roles": 1})
   ```

2. **Caching Strategy**:
   ```java
   @Service
   @CacheConfig(cacheNames = "universities")
   public class UniversityService {
       
       @Cacheable(key = "#countryId")
       public List<University> getUniversitiesByCountry(String countryId) {
           return universityRepository.findByCountryId(countryId);
       }
       
       @CacheEvict(allEntries = true)
       public University saveUniversity(University university) {
           return universityRepository.save(university);
       }
   }
   ```

3. **Frontend Optimization**:
   ```javascript
   // Lazy loading for routes
   const Universities = lazy(() => import('./pages/Universities'));
   const Jobs = lazy(() => import('./pages/Jobs'));
   const News = lazy(() => import('./pages/News'));
   
   // Image optimization
   const OptimizedImage = ({ src, alt, ...props }) => (
     <img
       src={src}
       alt={alt}
       loading="lazy"
       onError={(e) => {
         e.target.src = '/assets/placeholder.jpg';
       }}
       {...props}
     />
   );
   
   // API response caching
   const useApiCache = (key, fetcher, options = {}) => {
     const [data, setData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     
     useEffect(() => {
       const cachedData = localStorage.getItem(`cache_${key}`);
       if (cachedData && !options.forceRefresh) {
         const { data: cached, timestamp } = JSON.parse(cachedData);
         const isExpired = Date.now() - timestamp > (options.ttl || 300000); // 5 min default
         
         if (!isExpired) {
           setData(cached);
           setLoading(false);
           return;
         }
       }
       
       fetcher()
         .then(result => {
           setData(result);
           localStorage.setItem(`cache_${key}`, JSON.stringify({
             data: result,
             timestamp: Date.now()
           }));
         })
         .catch(setError)
         .finally(() => setLoading(false));
     }, [key, options.forceRefresh]);
     
     return { data, loading, error };
   };
   ```

## 🧪 Testing Strategy

### Backend Testing

1. **Unit Tests**:
   ```java
   @ExtendWith(MockitoExtension.class)
   class UniversityServiceTest {
       
       @Mock
       private UniversityRepository universityRepository;
       
       @InjectMocks
       private UniversityService universityService;
       
       @Test
       void shouldCreateUniversity() {
           // Given
           University university = new University("Test University", "Description");
           when(universityRepository.save(any(University.class)))
               .thenReturn(university);
           
           // When
           University result = universityService.createUniversity(university);
           
           // Then
           assertThat(result.getName()).isEqualTo("Test University");
           verify(universityRepository).save(university);
       }
   }
   ```

2. **Integration Tests**:
   ```java
   @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
   @Testcontainers
   class UniversityControllerIntegrationTest {
       
       @Container
       static MongoDBContainer mongoDBContainer = new MongoDBContainer("mongo:6.0");
       
       @Autowired
       private TestRestTemplate restTemplate;
       
       @Autowired
       private UniversityRepository universityRepository;
       
       @Test
       void shouldCreateAndRetrieveUniversity() {
           // Given
           University university = new University("Integration Test University", "Test Description");
           
           // When
           ResponseEntity<University> createResponse = restTemplate.postForEntity(
               "/api/universities", university, University.class);
           
           // Then
           assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
           assertThat(createResponse.getBody().getName()).isEqualTo("Integration Test University");
       }
   }
   ```

### Frontend Testing

1. **Component Tests**:
   ```javascript
   import { render, screen, fireEvent } from '@testing-library/react';
   import { BrowserRouter } from 'react-router-dom';
   import UniversityCard from '../components/university/UniversityCard';
   
   const mockUniversity = {
     id: '1',
     name: 'Test University',
     description: 'Test Description',
     yearlyPrice: 10000,
     imageUrl: 'test-image.jpg'
   };
   
   const renderWithRouter = (component) => {
     return render(
       <BrowserRouter>
         {component}
       </BrowserRouter>
     );
   };
   
   describe('UniversityCard', () => {
     test('renders university information correctly', () => {
       renderWithRouter(<UniversityCard university={mockUniversity} />);
       
       expect(screen.getByText('Test University')).toBeInTheDocument();
       expect(screen.getByText('Test Description')).toBeInTheDocument();
       expect(screen.getByText('$10,000')).toBeInTheDocument();
     });
     
     test('navigates to university detail on click', () => {
       renderWithRouter(<UniversityCard university={mockUniversity} />);
       
       const learnMoreButton = screen.getByText('Learn More');
       fireEvent.click(learnMoreButton);
       
       // Assert navigation occurred
     });
   });
   ```

2. **API Testing**:
   ```javascript
   import { describe, test, expect, beforeEach } from 'vitest';
   import { universityService } from '../services/universityService';
   
   describe('University Service', () => {
     beforeEach(() => {
       // Setup mock API responses
       global.fetch = vi.fn();
     });
     
     test('fetches universities successfully', async () => {
       const mockUniversities = [
         { id: '1', name: 'University 1' },
         { id: '2', name: 'University 2' }
       ];
       
       fetch.mockResolvedValueOnce({
         ok: true,
         json: async () => mockUniversities
       });
       
       const universities = await universityService.getAll();
       
       expect(universities).toEqual(mockUniversities);
       expect(fetch).toHaveBeenCalledWith('/api/universities');
     });
   });
   ```

### End-to-End Testing

```javascript
// cypress/e2e/university-flow.cy.js
describe('University Management Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login('admin@consultancy.com', 'password123');
  });
  
  it('should create, edit, and delete a university', () => {
    // Navigate to admin panel
    cy.get('[data-cy=admin-panel]').click();
    cy.get('[data-cy=universities-tab]').click();
    
    // Create university
    cy.get('[data-cy=add-university]').click();
    cy.get('[data-cy=university-name]').type('Cypress Test University');
    cy.get('[data-cy=university-description]').type('Test Description');
    cy.get('[data-cy=yearly-price]').type('15000');
    cy.get('[data-cy=submit-university]').click();
    
    // Verify creation
    cy.contains('Cypress Test University').should('be.visible');
    
    // Edit university
    cy.get('[data-cy=edit-university]').first().click();
    cy.get('[data-cy=university-name]').clear().type('Updated University Name');
    cy.get('[data-cy=submit-university]').click();
    
    // Verify edit
    cy.contains('Updated University Name').should('be.visible');
    
    // Delete university
    cy.get('[data-cy=delete-university]').first().click();
    cy.get('[data-cy=confirm-delete]').click();
    
    // Verify deletion
    cy.contains('Updated University Name').should('not.exist');
  });
});
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow

1. **Fork the Repository**:
   ```bash
   git clone https://github.com/your-username/student-consultancy-portal.git
   cd student-consultancy-portal
   git remote add upstream https://github.com/original-author/student-consultancy-portal.git
   ```

2. **Create Feature Branch**:
   ```bash
   git checkout -b feature/amazing-new-feature
   # or
   git checkout -b fix/important-bug-fix
   ```

3. **Development Setup**:
   ```bash
   # Install pre-commit hooks
   npm install -g @commitlint/cli @commitlint/config-conventional
   echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
   
   # Setup development environment
   ./scripts/setup.sh
   ```

### Code Standards

1. **Java Code Style**:
   ```xml
   <!-- Backend: Google Java Format -->
   <plugin>
     <groupId>com.spotify.fmt</groupId>
     <artifactId>fmt-maven-plugin</artifactId>
     <version>2.19</version>
     <executions>
       <execution>
         <goals>
           <goal>format</goal>
         </goals>
       </execution>
     </executions>
   </plugin>
   ```

2. **JavaScript/React Standards**:
   ```json
   {
     "extends": [
       "eslint:recommended",
       "@typescript-eslint/recommended",
       "plugin:react/recommended",
       "plugin:react-hooks/recommended"
     ],
     "rules": {
       "react/prop-types": "off",
       "react/react-in-jsx-scope": "off",
       "@typescript-eslint/explicit-function-return-type": "off"
     }
   }
   ```

3. **Commit Message Convention**:
   ```bash
   # Format: type(scope): description
   feat(auth): add JWT refresh token functionality
   fix(university): resolve image upload validation issue
   docs(readme): update API documentation
   style(ui): improve glassmorphism effects
   refactor(job): optimize job search performance
   test(news): add comprehensive news service tests
   ```

### Pull Request Process

1. **Before Submitting**:
   ```bash
   # Run all tests
   cd backend && ./mvnw test
   cd ../frontend && npm test
   
   # Check code formatting
   cd backend && ./mvnw fmt:check
   cd ../frontend && npm run lint
   
   # Build both applications
   cd backend && ./mvnw clean package
   cd ../frontend && npm run build
   ```

2. **PR Requirements**:
   - All tests passing
   - Code coverage maintained or improved
   - Documentation updated if needed
   - Screenshots for UI changes
   - Performance impact assessment

3. **Review Process**:
   - At least one maintainer approval required
   - All automated checks must pass
   - Code review feedback addressed
   - Merge after approval and CI success

### Bug Reports

When reporting bugs, please include:

```markdown
**Bug Description**
A clear description of what the bug is.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- Device: [e.g. Desktop, Mobile]

**Additional Context**
Any other relevant information.
```

## 📄 License

This project is licensed under the MIT License:

```
MIT License

Copyright (c) 2025 Azat Vepakulyyev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 👥 Team & Contributors

### Core Team
- **[Azat Vepakulyyev](https://github.com/Arious18)** - Lead Developer & Architect
  - Full-stack development
  - System architecture and design
  - DevOps and deployment

### Contributors
We appreciate all contributors who have helped improve this project. See our [Contributors Guide](CONTRIBUTING.md) for how to get involved.

### Special Thanks
- **Beta Testers**: Community members who provided valuable feedback
- **Code Reviewers**: Developers who helped improve code quality
- **Documentation Writers**: Contributors who enhanced project documentation

## 🔗 Related Projects

- **[University Data API](https://github.com/example/university-data)** - External university information service
- **[Job Board Integration](https://github.com/example/job-api)** - Third-party job posting services
- **[News Aggregator](https://github.com/example/news-service)** - Educational news content provider

## 📈 Roadmap

### Upcoming Features

**Version 2.0 (Q2 2025)**:
- [ ] Real-time chat system for student-advisor communication
- [ ] AI-powered university recommendation engine
- [ ] Video interview scheduling for job applications
- [ ] Mobile application (React Native)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] Payment integration for application fees

**Version 2.1 (Q3 2025)**:
- [ ] Social features (student forums, groups)
- [ ] Document management system
- [ ] Email notification system
- [ ] Advanced search with filters
- [ ] University comparison tool
- [ ] Student testimonials and reviews
- [ ] Calendar integration for deadlines

**Version 3.0 (Q4 2025)**:
- [ ] Machine learning for personalized content
- [ ] Blockchain certificates and credentials
- [ ] Virtual campus tours
- [ ] Scholarship matching system
- [ ] Career guidance and counseling tools
- [ ] Integration with external education platforms

### Technical Improvements
- [ ] Microservices architecture migration
- [ ] GraphQL API implementation
- [ ] Redis caching layer
- [ ] Elasticsearch for advanced search
- [ ] Kubernetes deployment
- [ ] Monitoring with Prometheus and Grafana
- [ ] A/B testing framework

## 🙏 Acknowledgements

We extend our gratitude to the following:

### Technologies & Frameworks
- **[Spring Boot](https://spring.io/projects/spring-boot)** - Powerful Java framework for backend development
- **[React](https://reactjs.org/)** - Modern frontend library for building user interfaces
- **[MongoDB](https://www.mongodb.com/)** - Flexible NoSQL database solution
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling
- **[Cloudflare](https://www.cloudflare.com/)** - Global cloud platform for performance and security

### Development Tools
- **[JWT.io](https://jwt.io/)** - JSON Web Token implementation and debugging
- **[Postman](https://www.postman.com/)** - API development and testing platform
- **[Docker](https://www.docker.com/)** - Containerization platform
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD automation
- **[IntelliJ IDEA](https://www.jetbrains.com/idea/)** - Powerful Java IDE
- **[Visual Studio Code](https://code.visualstudio.com/)** - Versatile code editor

### Design Resources
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[Glassmorphism.com](https://glassmorphism.com/)** - Glass-effect design inspiration
- **[Tailwind UI](https://tailwindui.com/)** - Professional component examples
- **[Unsplash](https://unsplash.com/)** - High-quality stock photography

### Community & Support
- **Stack Overflow Community** - Technical problem solving and guidance
- **GitHub Open Source Community** - Collaborative development platform
- **Spring Community** - Framework support and best practices
- **React Community** - Frontend development resources and tutorials

## 📞 Support & Contact

### Getting Help

1. **Documentation**: Check our comprehensive [documentation](./docs/) first
2. **FAQ**: Visit our [FAQ section](./docs/FAQ.md) for common questions
3. **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/Arious18/student-consultancy-portal/issues)
4. **Discussions**: Join community discussions in [GitHub Discussions](https://github.com/Arious18/student-consultancy-portal/discussions)

### Contact Information

- **Developer**: Azat Vepakulyyev
- **Email**: azatvepakulyyev@gmail.com
- **Blog**: [Personal Blog](https://blog.azatvepakulyyev.workers.dev/)
- **LinkedIn**: [Professional Profile](https://linkedin.com/in/azat-vepakulyyev)
- **GitHub**: [@Arious18](https://github.com/Arious18)

### Business Inquiries

For business partnerships, enterprise licensing, or custom development:
- **Business Email**: business@azatvepakulyyev.com
- **Response Time**: Within 24-48 hours
- **Consultation**: Available for technical consultation and system architecture

### Community

- **Discord Server**: [Join our community](https://discord.gg/student-consultancy) (Coming Soon)
- **Newsletter**: Subscribe for updates and announcements
- **Twitter**: [@AzatVepakulyyev](https://twitter.com/azatvepakulyyev) for project updates

---

<div align="center">

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Arious18/student-consultancy-portal&type=Date)](https://star-history.com/#Arious18/student-consultancy-portal&Date)

---

**Made with ❤️ by [Azat Vepakulyyev](https://github.com/Arious18)**

*"Connecting students worldwide with their dream educational opportunities"*

[![GitHub followers](https://img.shields.io/github/followers/Arious18?style=social)](https://github.com/Arious18)
[![Twitter Follow](https://img.shields.io/twitter/follow/azatvepakulyyev?style=social)](https://twitter.com/azatvepakulyyev)

</div>
