import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Print,
  Search,
  Logout,
  People,
  CheckCircle,
  Cancel,
  Brightness4,
  Brightness7,
  ChevronLeft,
  ChevronRight,
  FirstPage,
  LastPage,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';
import { useThemeMode } from '../contexts/ThemeContext';
import type { Employee, EmployeeFormData } from '../types/employee';
import { EmployeeForm } from '../components/EmployeeForm';

export const Dashboard = () => {
  const { logout, user } = useAuth();
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and search logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = employee.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGender =
        genderFilter === 'all' || employee.gender === genderFilter;
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && employee.isActive) ||
        (statusFilter === 'inactive' && !employee.isActive);

      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, genderFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, genderFilter, statusFilter]);

  // Statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp) => emp.isActive).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddEmployee = () => {
    setFormMode('add');
    setSelectedEmployee(null);
    setFormOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setFormMode('edit');
    setSelectedEmployee(employee);
    setFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete);
      setDeleteDialogOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleFormSubmit = (data: EmployeeFormData) => {
    if (formMode === 'add') {
      addEmployee(data);
    } else if (selectedEmployee) {
      updateEmployee(selectedEmployee.id, data);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Employee List</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                padding: 20px;
              }
              h1 {
                color: #333;
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
              }
              th {
                background-color: #667eea;
                color: white;
              }
              tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              .status {
                font-weight: bold;
              }
              .active {
                color: green;
              }
              .inactive {
                color: red;
              }
            </style>
          </head>
          <body>
            <h1>Employee List</h1>
            <p><strong>Total Employees:</strong> ${totalEmployees}</p>
            <p><strong>Active:</strong> ${activeEmployees} | <strong>Inactive:</strong> ${inactiveEmployees}</p>
            <table>
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Full Name</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredEmployees
                  .map(
                    (emp) => `
                  <tr>
                    <td>${emp.id}</td>
                    <td>${emp.fullName}</td>
                    <td>${emp.gender}</td>
                    <td>${new Date(emp.dateOfBirth).toLocaleDateString()}</td>
                    <td>${emp.state}</td>
                    <td class="status ${emp.isActive ? 'active' : 'inactive'}">
                      ${emp.isActive ? 'Active' : 'Inactive'}
                    </td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <Toolbar>
          <People sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Employee Management Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Welcome, {user?.username}
          </Typography>
          <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <IconButton onClick={toggleTheme} color="inherit" sx={{ mr: 1 }}>
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<Logout />}
            sx={{ textTransform: 'none' }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Total Employees
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {totalEmployees}
                    </Typography>
                  </Box>
                  <People sx={{ fontSize: 60, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Active Employees
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {activeEmployees}
                    </Typography>
                  </Box>
                  <CheckCircle sx={{ fontSize: 60, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Inactive Employees
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {inactiveEmployees}
                    </Typography>
                  </Box>
                  <Cancel sx={{ fontSize: 60, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search and Filter Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Search by employee name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={genderFilter}
                  label="Gender"
                  onChange={(e) => setGenderFilter(e.target.value)}
                >
                  <MenuItem value="all">All Genders</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddEmployee}
                  sx={{
                    textTransform: 'none',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  Add Employee
                </Button>
                <Tooltip title="Print Employee List">
                  <IconButton
                    onClick={handlePrint}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  >
                    <Print />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Employee Table */}
        <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Profile</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Gender</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date of Birth</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 8 }}>
                      <People sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                        No employees found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {searchTerm || genderFilter !== 'all' || statusFilter !== 'all'
                          ? 'Try adjusting your filters'
                          : 'Add your first employee to get started'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmployees.map((employee) => (
                    <TableRow key={employee.id} hover>
                      <TableCell>{employee.id}</TableCell>
                      <TableCell>
                        <Avatar src={employee.profileImage} alt={employee.fullName} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {employee.fullName}
                        </Typography>
                      </TableCell>
                      <TableCell>{employee.gender}</TableCell>
                      <TableCell>
                        {new Date(employee.dateOfBirth).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{employee.state}</TableCell>
                      <TableCell>
                        <Chip
                          label={employee.isActive ? 'Active' : 'Inactive'}
                          color={employee.isActive ? 'success' : 'error'}
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => handleEditEmployee(employee)}
                              sx={{ color: 'primary.main' }}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteClick(employee.id)}
                              sx={{ color: 'error.main' }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredEmployees.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderTop: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of{' '}
                {filteredEmployees.length} employees
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Tooltip title="First Page">
                  <span>
                    <IconButton
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                      size="small"
                    >
                      <FirstPage />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title="Previous Page">
                  <span>
                    <IconButton
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      size="small"
                    >
                      <ChevronLeft />
                    </IconButton>
                  </span>
                </Tooltip>

                <Box sx={{ display: 'flex', gap: 0.5, mx: 1 }}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      variant={currentPage === page ? 'contained' : 'outlined'}
                      size="small"
                      sx={{
                        minWidth: 36,
                        height: 36,
                        p: 0,
                        ...(currentPage === page && {
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }),
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>

                <Tooltip title="Next Page">
                  <span>
                    <IconButton
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      size="small"
                    >
                      <ChevronRight />
                    </IconButton>
                  </span>
                </Tooltip>

                <Tooltip title="Last Page">
                  <span>
                    <IconButton
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                      size="small"
                    >
                      <LastPage />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Employee Form Dialog */}
      <EmployeeForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        employee={selectedEmployee}
        mode={formMode}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
