# Employee Management Dashboard

A modern, feature-rich employee management system built with React, TypeScript, and Material-UI. This application provides a comprehensive solution for managing employee data with authentication, CRUD operations, search/filter capabilities, and a beautiful, responsive user interface.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Material-UI](https://img.shields.io/badge/Material--UI-7.3.7-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)

## 📸 Screenshots

### Login Page
Modern gradient design with secure authentication

### Dashboard
Comprehensive employee management interface with statistics, search, and filters

## ✨ Features

### 🔐 Authentication
- **Secure Login Page** with form validation
- **Mock Authentication** system (accepts any username/password for demo)
- **Protected Routes** - Dashboard accessible only after login
- **Session Persistence** using localStorage
- **Logout Functionality** with redirect to login page
- **Password visibility toggle** for better UX

### 📊 Dashboard Summary
- **Total Employees Card** - Shows total number of employees with purple gradient
- **Active Employees Card** - Displays active employee count with green gradient
- **Inactive Employees Card** - Shows inactive employee count with red gradient
- **Real-time Statistics** - Updates automatically when data changes

### 👥 Employee Management

#### Employee List Table
Displays a comprehensive table with the following columns:
- **Employee ID** - Unique identifier
- **Profile Image** - Avatar display
- **Full Name** - Employee's complete name
- **Gender** - Male, Female, or Other
- **Date of Birth** - Formatted date display
- **State** - US State of residence
- **Status** - Active/Inactive with colored chip
- **Actions** - Edit and Delete buttons

#### CRUD Operations
- ✅ **Create** - Add new employees with comprehensive form
- ✅ **Read** - View all employees in organized table
- ✅ **Update** - Edit existing employee information
- ✅ **Delete** - Remove employees with confirmation dialog

### 📝 Employee Form
Comprehensive form for adding and editing employees:

- **Profile Image Upload**
  - Image file picker
  - Real-time preview before save
  - Required field validation
  
- **Full Name**
  - Text input with validation
  - Required field
  
- **Gender**
  - Dropdown selection (Male, Female, Other)
  - Required field
  
- **Date of Birth**
  - Date picker input
  - Age validation (18-100 years)
  - Required field
  
- **State**
  - Dropdown with all 50 US states
  - Searchable select
  - Required field
  
- **Active/Inactive Status**
  - Toggle switch
  - Clear visual indicator

#### Form Validation
- Required field checks
- Age range validation (18-100 years)
- Real-time error messages
- Image upload requirement
- Empty field prevention

### 🔍 Search & Filter
- **Search by Name** - Real-time text search
- **Filter by Gender** - Dropdown (All, Male, Female, Other)
- **Filter by Status** - Dropdown (All, Active, Inactive)
- **Combined Filtering** - All filters work together
- **Live Results** - Instant updates as you type/select

### 🖨️ Print Functionality
- Print formatted employee list
- Includes statistics summary
- Print-friendly styling
- Shows filtered results
- Opens in new window

### 🎨 Modern UI/UX
- **Material-UI Components** throughout
- **Gradient Color Schemes** for visual appeal
- **Responsive Design** - Mobile, tablet, and desktop
- **Smooth Animations** and transitions
- **Loading States** - Graceful data loading
- **Empty States** - Helpful messages when no data
- **Confirmation Dialogs** - Prevent accidental actions
- **Tooltips** - Contextual help on hover
- **Professional Typography** - Clean and readable

## 🛠️ Tech Stack

### Core Technologies
- **React** 19.2.0 - UI framework
- **TypeScript** 5.9.3 - Type-safe JavaScript
- **Vite** 7.2.4 - Build tool and dev server

### UI Framework
- **Material-UI (MUI)** 7.3.7 - Component library
- **MUI Icons** 7.3.7 - Icon components
- **Emotion** 11.14.0 - CSS-in-JS styling

### Routing & Navigation
- **React Router DOM** 7.x - Client-side routing
- Protected routes implementation
- Route guards and redirects

### State Management
- **React Context API** - Global state management
- **Custom Hooks** - Reusable logic (useAuth, useEmployees)
- **localStorage** - Data persistence

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Babel React Compiler** - Performance optimization

## 📁 Project Structure

```
employee-management-dashboard-app/
├── src/
│   ├── components/
│   │   ├── EmployeeForm.tsx      # Add/Edit employee form component
│   │   └── ProtectedRoute.tsx    # Route protection wrapper
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Authentication state management
│   │   ├── EmployeeContext.tsx   # Employee data management
│   │   └── ThemeContext.tsx      # Material-UI theme configuration
│   ├── data/
│   │   └── states.ts             # US states data (50 states)
│   ├── pages/
│   │   ├── Login.tsx             # Login page component
│   │   └── Dashboard.tsx         # Main dashboard with employee list
│   ├── types/
│   │   └── employee.ts           # TypeScript type definitions
│   ├── App.tsx                   # Main app component with routing
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global styles
│   └── App.css                   # App-specific styles
├── public/
│   └── vite.svg                  # Public assets
├── backend/                      # Backend code (not used in this project)
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn** package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-dashboard-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to the URL shown in terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The production-ready files will be generated in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📖 Usage Guide

### 1. Login to the Application

1. Open the application in your browser
2. You'll be automatically redirected to the login page
3. Enter any username and password (mock authentication accepts all credentials)
   - Example: Username: `admin`, Password: `password`
4. Click "Sign In"
5. You'll be redirected to the dashboard

### 2. View Dashboard Statistics

Upon login, you'll see three statistics cards:
- **Total Employees** - Complete count of all employees
- **Active Employees** - Count of currently active employees
- **Inactive Employees** - Count of inactive employees

### 3. Browse Employee List

The main table displays all employees with:
- Profile pictures
- Personal information
- Current status
- Action buttons

### 4. Add a New Employee

1. Click the **"Add Employee"** button
2. Upload a profile image (click "Upload Photo")
3. Preview the image before saving
4. Fill in all required fields:
   - Full Name
   - Gender (select from dropdown)
   - Date of Birth (must be 18-100 years old)
   - State (select from dropdown)
   - Status (toggle Active/Inactive)
5. Click **"Add Employee"** to save
6. The form validates all fields before submission

### 5. Edit an Employee

1. Find the employee in the list
2. Click the **Edit** icon (pencil) in the Actions column
3. The form opens with existing data pre-filled
4. Modify any fields you want to change
5. Click **"Save Changes"**

### 6. Delete an Employee

1. Find the employee in the list
2. Click the **Delete** icon (trash) in the Actions column
3. A confirmation dialog appears
4. Click **"Delete"** to confirm or **"Cancel"** to abort
5. Employee is permanently removed from the list

### 7. Search Employees

1. Use the search box at the top of the table
2. Type any part of an employee's name
3. Results filter automatically as you type
4. Search is case-insensitive

### 8. Filter Employees

#### By Gender:
1. Click the "Gender" dropdown
2. Select: All Genders, Male, Female, or Other
3. Table updates immediately

#### By Status:
1. Click the "Status" dropdown
2. Select: All Status, Active, or Inactive
3. Table updates immediately

#### Combined Filtering:
- Use search, gender filter, and status filter together
- All filters work simultaneously
- Results update in real-time

### 9. Print Employee List

1. Click the **Print** icon button (printer icon)
2. A new window opens with a formatted table
3. The print preview includes:
   - Statistics summary
   - All filtered employees
   - Professional formatting
4. Use your browser's print dialog (Ctrl+P or Cmd+P)
5. Print to paper or save as PDF

### 10. Logout

1. Click the **"Logout"** button in the top navigation bar
2. You'll be redirected to the login page
3. Session is cleared from localStorage

## 🎨 Design Decisions & Assumptions

### Authentication
- **Mock Authentication**: Implemented for demonstration purposes. Accepts any non-empty username and password.
- **Session Persistence**: Uses localStorage to maintain login state across page refreshes.
- **Security Note**: In production, implement proper backend authentication with JWT tokens or session cookies.

### Data Storage
- **localStorage as Mock API**: Employee data is stored in browser's localStorage.
- **Initial Seed Data**: Application comes with 5 pre-populated employees for demonstration.
- **Data Persistence**: All CRUD operations persist across browser sessions.
- **Production Note**: Replace with real backend API (REST or GraphQL).

### UI/UX Decisions
- **Material-UI**: Chosen for professional, consistent design system.
- **Gradient Colors**: Used to create visually appealing, modern interface.
- **Responsive Design**: Mobile-first approach with breakpoints for all devices.
- **Empty States**: Provide helpful guidance when no data is available.
- **Confirmation Dialogs**: Prevent accidental data loss on delete operations.
- **Real-time Feedback**: Immediate visual feedback for all user actions.

### Form Validation
- **Age Range**: Set to 18-100 years as reasonable employment age range.
- **Required Fields**: All fields except ID are required for data completeness.
- **Image Preview**: Shows uploaded image before save for user confidence.
- **Error Messages**: Clear, actionable feedback for validation failures.

### Component Architecture
- **Reusable Components**: EmployeeForm used for both add and edit operations.
- **Context API**: Separates concerns (Auth, Employee data, Theme).
- **Protected Routes**: Ensures security at the route level.
- **Type Safety**: TypeScript interfaces for all data structures.

### State Management
- **React Context API**: Sufficient for this application's complexity.
- **Custom Hooks**: Encapsulate context logic (useAuth, useEmployees).
- **Production Note**: For larger applications, consider Redux or Zustand.

### Performance Considerations
- **useMemo**: Used for filtering logic to prevent unnecessary recalculations.
- **Component Optimization**: Functional components with proper hook usage.
- **Image Optimization**: Profile images loaded on-demand.

## 🔐 Demo Credentials

Since this uses mock authentication, you can login with **any** username and password combination:

**Examples:**
- Username: `admin` | Password: `admin123`
- Username: `demo` | Password: `demo`
- Username: `test` | Password: `test`
- Or any other combination you prefer!

## 📊 Sample Data

The application includes 5 pre-populated employees:

1. **John Doe** - Male, California, Active
2. **Jane Smith** - Female, New York, Active
3. **Michael Johnson** - Male, Texas, Inactive
4. **Emily Davis** - Female, Florida, Active
5. **Robert Wilson** - Male, Illinois, Active

All sample employees have profile images from [pravatar.cc](https://pravatar.cc).

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px (single column layout)
- **Tablet**: 768px - 1023px (two column layout)
- **Desktop**: 1024px - 1439px (full layout)
- **Large Desktop**: 1440px+ (expanded layout)

## 🎯 Features Checklist

### Authentication Module
- ✅ Login page with form validation
- ✅ Mock authentication system
- ✅ Protected routes
- ✅ Session persistence
- ✅ Logout functionality
- ✅ Password visibility toggle

### Dashboard Module
- ✅ Total employees statistics
- ✅ Active/Inactive employee counts
- ✅ Employee list table
- ✅ Profile image display
- ✅ Status chips (colored)

### Employee Management
- ✅ Add employee form
- ✅ Edit employee form
- ✅ Delete with confirmation
- ✅ Form validation
- ✅ Image upload with preview
- ✅ All required fields

### Search & Filter
- ✅ Search by name
- ✅ Filter by gender
- ✅ Filter by status
- ✅ Combined filtering
- ✅ Real-time results

### Additional Features
- ✅ Print employee list
- ✅ Empty states
- ✅ Loading states
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Tooltips
- ✅ Smooth animations

### Code Quality
- ✅ TypeScript
- ✅ ESLint configured
- ✅ Clean code structure
- ✅ Reusable components
- ✅ Type-safe props
- ✅ Proper file organization

## 🚧 Known Limitations

1. **Mock Authentication**: No real backend authentication
2. **Client-side Storage**: Data stored in localStorage (not secure for production)
3. **No Pagination**: All employees displayed at once (fine for small datasets)
4. **No Sorting**: Table columns are not sortable
5. **Image Storage**: Images stored as base64 (not optimal for production)

## 🔮 Future Enhancements

Potential features for future versions:

### Backend Integration
- [ ] REST API integration
- [ ] Real authentication with JWT
- [ ] Database storage (PostgreSQL/MongoDB)
- [ ] Secure image upload to cloud storage

### Advanced Features
- [ ] Pagination for large datasets
- [ ] Column sorting (ascending/descending)
- [ ] Advanced search with multiple fields
- [ ] Bulk operations (delete multiple, export)
- [ ] Employee profile details page
- [ ] Activity logs and audit trail
- [ ] Role-based access control (Admin, Manager, Viewer)

### Export & Import
- [ ] Export to Excel (XLSX)
- [ ] Export to CSV
- [ ] Export to PDF
- [ ] Import from Excel/CSV
- [ ] Bulk upload functionality

### UI/UX Improvements
- [ ] Dark mode toggle
- [ ] Custom themes
- [ ] Accessibility improvements (WCAG 2.1)
- [ ] Keyboard shortcuts
- [ ] Advanced filters (date range, multi-select)

### Notifications
- [ ] Email notifications
- [ ] In-app notifications
- [ ] Toast messages for actions
- [ ] Confirmation emails

### Analytics
- [ ] Dashboard analytics
- [ ] Employee statistics
- [ ] Charts and graphs
- [ ] Reports generation

## 🐛 Troubleshooting

### Port already in use
If port 5173 is already in use:
```bash
# Vite will automatically try another port (5174, 5175, etc.)
# Or specify a custom port:
npm run dev -- --port 3000
```

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### TypeScript errors
```bash
# Rebuild TypeScript
npm run build
```

### Browser not updating
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Restart development server

## 📄 License

This project is created for educational purposes as part of a React.js assessment.

## 👨‍💻 Author

Developed as a React.js assignment demonstrating:
- Modern React development with hooks
- TypeScript integration
- Material-UI component library
- State management patterns
- Authentication and routing
- Form handling and validation
- Responsive design principles
- Clean code architecture

## 🙏 Acknowledgments

- **React Team** - For the amazing React library
- **Material-UI Team** - For the excellent component library
- **Vite Team** - For the lightning-fast build tool
- **TypeScript Team** - For type safety
- **pravatar.cc** - For placeholder profile images

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the usage guide
3. Check browser console for errors
4. Ensure all dependencies are installed

## 📝 Notes

- This is a **demonstration project** using mock data and authentication
- **Not production-ready** without proper backend implementation
- For production use:
  - Implement real backend API
  - Add proper authentication (OAuth, JWT)
  - Use secure database storage
  - Implement proper security measures
  - Add comprehensive testing
  - Set up CI/CD pipeline
  - Add monitoring and logging
  - Implement proper error handling

---

**Built with ❤️ using React, TypeScript, and Material-UI**

**Status: ✅ Ready for Development**