import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import UpdateForm from './components/UpdateForm';
import Home from './components/Home';
import Library from './components/Library';
import LegalAdvice from './components/LegalAdvice';
import MiningPlan from './components/MiningPlan';
import FAQ from './components/FAQ';
import MainLibrary from './components/MainLibrary';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:username/profile" element={<Profile />} />
          <Route path="/:username/update" element={<UpdateForm />} />
          <Route path="/:username/library" element={<Library />} />
          <Route path="/:username/legal-advice" element={<LegalAdvice />} />
          <Route path="/:username/miningplan" element={<MiningPlan />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mainlibrary" element={<MainLibrary />} />
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
