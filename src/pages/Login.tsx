import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useThemeMode } from '../contexts/ThemeContext';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [touched, setTouched] = useState({ username: false, password: false });
  
  const { login } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();

  // Clean validation with concise messages
  const validateUsername = (value: string): string => {
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      return 'Username is required';
    }
    
    if (trimmedValue.length < 3 || trimmedValue.length > 20) {
      return 'Username must be 3-20 characters';
    }
    
    const startsWithLetterOrNumber = /^[a-zA-Z0-9]/;
    if (!startsWithLetterOrNumber.test(trimmedValue)) {
      return 'Must start with a letter or number';
    }
    
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(trimmedValue)) {
      return 'Only letters, numbers, dots, underscores, hyphens allowed';
    }
    
    return '';
  };

  const validatePassword = (value: string): string => {
    if (!value) {
      return 'Password is required';
    }
    
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    
    if (value.length > 50) {
      return 'Password is too long';
    }
    
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    
    if (!hasLetter || !hasNumber) {
      return 'Password must contain letters and numbers';
    }
    
    return '';
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    
    if (touched.username) {
      const error = validateUsername(value);
      setUsernameError(error);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (touched.password) {
      const error = validatePassword(value);
      setPasswordError(error);
    }
  };

  const handleUsernameBlur = () => {
    setTouched({ ...touched, username: true });
    const error = validateUsername(username);
    setUsernameError(error);
  };

  const handlePasswordBlur = () => {
    setTouched({ ...touched, password: true });
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Mark all fields as touched
    setTouched({ username: true, password: true });
    
    // Validate all fields
    const usernameValidationError = validateUsername(username);
    const passwordValidationError = validatePassword(password);
    
    setUsernameError(usernameValidationError);
    setPasswordError(passwordValidationError);
    
    // If there are any validation errors, don't proceed
    if (usernameValidationError || passwordValidationError) {
      setError('Please fix the errors below');
      return;
    }
    
    // Trim values before submitting
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    
    const success = login(trimmedUsername, trimmedPassword);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
        position: 'relative',
      }}
    >
      {/* Theme Toggle Button */}
      <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Tooltip>

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            padding: { xs: 4, sm: 6 },
            borderRadius: 4,
            backdropFilter: 'blur(10px)',
            maxWidth: 480,
            mx: 'auto',
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <LoginIcon
              sx={{
                fontSize: 56,
                color: 'primary.main',
                mb: 2.5,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.95rem' }}>
              Sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleUsernameChange}
              onBlur={handleUsernameBlur}
              error={touched.username && !!usernameError}
              helperText={touched.username && usernameError}
              sx={{ 
                mb: 2.5,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={touched.password && !!passwordError}
              helperText={touched.password && passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ 
                mb: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                py: 1.75,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 12px rgba(103, 126, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                  boxShadow: '0 6px 16px rgba(103, 126, 234, 0.5)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>

          <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem', display: 'block', mb: 1.5 }}>
              Username: 3-20 characters · Password: 6+ characters
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', display: 'block', opacity: 0.7 }}>
              Try: admin / admin123  or  john.doe / secure99
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
