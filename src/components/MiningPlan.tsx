import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface MiningPlanRequest {
  status: string; // Added status field, will need to be populated or have a default
  // Assuming 'id' is equivalent to '_id' from the backend for consistency with LegalAdvice.tsx
  // If not, adjust accordingly or ensure backend provides a consistent 'id'.
  id: string;
  _id: string; // Keep _id for backend compatibility if necessary, or map to id
  title: string;
  description: string;
  filePath?: string;
  submittedAt: string;
  username: string;
  // status: 'pending' | 'in-progress' | 'completed'; // Example status types
}

interface UserData {
  username: string;
  // Add other user data fields if necessary
}

const MiningPlanService: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previousRequests, setPreviousRequests] = useState<MiningPlanRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserDataAndQueries = async () => {
      setIsLoading(true);
      try {
        // Fetch user data (optional, but good for context or if username from URL isn't enough)
        const userResponse = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!userResponse.ok) throw new Error('Failed to fetch user profile');
        const fetchedUserData = await userResponse.json();
        setUserData(fetchedUserData);

        // Fetch previous mining plan requests
        const requestsResponse = await fetch(`http://localhost:5000/api/mining-plan/queries/${username}`, { // Assuming endpoint remains the same for now
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!requestsResponse.ok) throw new Error('Failed to fetch mining plan requests');
        const requestsData = await requestsResponse.json();
        // Map backend data to MiningPlanRequest, adding a placeholder status
        const mappedRequests = requestsData.map((req: any) => ({ ...req, id: req._id, status: 'Pending' })); 
        setPreviousRequests(mappedRequests);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchUserDataAndQueries();
    }
  }, [navigate, username]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const token = localStorage.getItem('token');
    if (!token || !username) {
      setError('Authentication required or user context missing.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', username); // Make sure backend expects username
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('http://localhost:5000/api/mining-plan/submit', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type': 'multipart/form-data' is set automatically by browser with FormData
        },
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccess('Mining plan query submitted successfully!');
        setTitle('');
        setDescription('');
        setFile(null);
        // Refresh previous queries
        // Add a placeholder status for the new request
        const newRequest = { ...responseData.query, id: responseData.query._id, status: 'Pending' };
        setPreviousRequests(prev => [newRequest, ...prev]);
      } else {
        setError(responseData.message || 'Failed to submit mining plan query.');
      }
    } catch (err) {
      console.error('Error submitting query:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during submission.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Mining Plan Service
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Submit New Request
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          multiline
                          rows={4}
                          margin="normal"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                          sx={{ mt: 1, mb: 1 }}
                        >
                          UPLOAD FILE
                          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                        </Button>
                        {file && <Typography sx={{ ml: 2, display: 'inline' }}>{file.name}</Typography>}
                      </Grid>
                      <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading} size="large" sx={{ textTransform: 'uppercase' }}>
                          {isLoading ? <CircularProgress size={24} /> : 'SUBMIT REQUEST'}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Previous Requests
                  </Typography>
                  {isLoading && !previousRequests.length && <CircularProgress />}
                  {!isLoading && previousRequests.length === 0 && (
                    <Typography>No previous requests found.</Typography>
                  )}
                  {previousRequests.length > 0 && (
                    <TableContainer component={Paper} sx={{ mt: 2 }}>
                      <Table aria-label="previous requests table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>File</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {previousRequests.map((request) => (
                            <TableRow key={request.id || request._id}>
                              <TableCell component="th" scope="row">
                                {request.title}
                              </TableCell>
                              <TableCell>{request.status}</TableCell>
                              <TableCell>{new Date(request.submittedAt).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {request.filePath ? (
                                  <Button 
                                    size="small" 
                                    onClick={() => window.open(`http://localhost:5000/${request.filePath}`, '_blank')}
                                  >
                                    View File
                                  </Button>
                                ) : (
                                  'No file'
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default MiningPlanService;