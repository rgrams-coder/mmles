import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ContentSection = styled(Box)(({ theme }) => ({
  padding: '2rem 0',
  '& p': {
    marginBottom: '1.5rem',
    lineHeight: '1.8',
    fontSize: '1.1rem',
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: '2rem',
  marginBottom: '2rem',
  '& .MuiTypography-root': {
    marginBottom: '1rem',
  }
}));

const CheckItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  '& .MuiSvgIcon-root': {
    color: theme.palette.success.main,
    marginRight: '0.5rem',
  }
}));

const MainLibrary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <ContentSection>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Digital Library
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>Back to Home</Button>
        </Box>

        <StyledPaper elevation={3}>
          <Typography variant="body1">
            Our Digital Library is a specialized knowledge hub curated for the mining and minerals sector. It offers comprehensive, high-value legal resources tailored for professionals, academics, and businesses operating within the framework of mineral laws.
          </Typography>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            🔍 What's Inside?
          </Typography>
          <Typography variant="body1">
            The library gives you access to:
          </Typography>

          <Box sx={{ my: 2 }}>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Full Legal Texts – Acts, rules, notifications, and amendments related to mining and minerals</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Expert Analysis – In-depth interpretations, commentaries, and practical insights</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Archived Documents – Historical legislation, case laws, and policy papers</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Exclusive Research Reports – Sector-specific studies, impact assessments, and whitepapers</Typography>
            </CheckItem>
          </Box>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            💼 Annual Library Access Fees
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>User Category</strong></TableCell>
                  <TableCell><strong>Annual Fee (INR)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>🎓 Students</TableCell>
                  <TableCell>₹5,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>🧪 Researchers</TableCell>
                  <TableCell>₹7,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>🏛️ Officials, Mineral Dealers, Firms & Lessees</TableCell>
                  <TableCell>₹15,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>🏢 Companies</TableCell>
                  <TableCell>₹25,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            📥 Why Subscribe?
          </Typography>

          <Box sx={{ mb: 4 }}>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Stay compliant with evolving regulations</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Gain deep legal and operational insights</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Make informed decisions with verified resources</Typography>
            </CheckItem>
            <CheckItem>
              <CheckCircleOutlineIcon />
              <Typography>Support academic and professional research</Typography>
            </CheckItem>
          </Box>

          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            📌 Library access is available only after registration. Please ensure you're registered under the appropriate category to subscribe.
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            For any queries or subscription support, contact us at support@minesmineralslaw.in
          </Typography>
        </StyledPaper>
      </ContentSection>
    </Container>
  );
};

export default MainLibrary;