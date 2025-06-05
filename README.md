# Shared Shopping List

A collaborative shopping list application that allows multiple users to create, share, and manage shopping lists in real-time.

## Architecture

### Backend
- **Runtime**: Node.js
- **Database**: MySQL
- **API**: RESTful endpoints for list and item management

### Frontend
- **Framework**: React.js
- **Authentication**: Context-based user authentication
- **UI Components**: Custom components for list management

### DevOps
- **Containerization**: Docker with multi-service compose setup
- **CI/CD**: Jenkins pipeline automation
- **Infrastructure**: Ansible for provisioning and deployment
- **Version Control**: Git

## Project Structure

```
├── backend/          # Node.js API server
├── frontend/         # React.js client application
├── ansible/          # Infrastructure automation
├── docker-compose.yml # Multi-container orchestration
└── Jenkinsfile       # CI/CD pipeline configuration
```

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- MySQL 8.0+
- Ansible (for deployment)
- Jenkins (for CI/CD)

## Quick Start

### Development Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd shared-shopping-list
```

2. Start the application with Docker Compose:
```bash
docker-compose up -d
```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Manual Setup

#### Backend
```bash
cd backend
npm install
npm start
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## Database Setup

The MySQL database is automatically initialized with the schema defined in `backend/init.sql` when using Docker Compose.

For manual setup:
1. Create a MySQL database
2. Execute the SQL script in `backend/init.sql`
3. Update database connection settings in backend configuration

## Deployment

### Using Ansible

1. Configure your inventory in `ansible/inventory.ini`
2. Update variables in `ansible/group_vars/webservers.yml`
3. Run the provisioning playbook:
```bash
ansible-playbook -i ansible/inventory.ini ansible/provision.yml
```
4. Deploy the application:
```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

### Using Jenkins

The project includes a Jenkins pipeline that automates:
- Code checkout
- Testing
- Docker image building
- Deployment

Configure Jenkins to use the included `Jenkinsfile` for automated CI/CD.

## API Endpoints

The backend provides RESTful endpoints for:
- User authentication and registration
- Shopping list creation and management
- List item operations (add, edit, delete, mark complete)
- List sharing and collaboration

## Features

- User registration and authentication
- Create and manage multiple shopping lists
- Add, edit, and delete list items
- Mark items as completed
- Share lists with other users
- Real-time collaboration

## Development

### Backend Development
- The API server runs on port 5000
- Database connection configured via environment variables
- RESTful API design with JSON responses

### Frontend Development
- React development server runs on port 3000
- Component-based architecture
- Authentication context for user state management
- Responsive design for mobile and desktop

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
