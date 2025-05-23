import React from 'react';
import { Container, Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const ContentSection = styled(Box)(({ theme }) => ({
  padding: '2rem 0',
  '& p': {
    marginBottom: '1.5rem',
    lineHeight: '1.8',
    fontSize: '1.1rem',
  }
}));

const QuestionPaper = styled(Paper)(({ theme }) => ({
  marginBottom: '2rem',
  padding: '1.5rem',
  borderLeft: '5px solid #1976d2',
}));

const FAQ: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <ContentSection>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Mines and Minerals Law Ecosystem FAQ
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/home')}>Back to Home</Button>
        </Box>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            1. What is the Mines and Minerals Law Ecosystem?
          </Typography>
          <Typography variant="body1">
            The Mines and Minerals Law Ecosystem is a comprehensive web platform designed to support students, researchers, government officials, mineral dealers, lessees, firms, and companies with curated resources, legal tools, and a digital library focused on mining and mineral laws.
          </Typography>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            2. Who can register on this platform?
          </Typography>
          <Typography variant="body1" gutterBottom>
            The following categories of users can register:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Students" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Researchers" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Officials (Govt/PSU)" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Mineral Dealers" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Firms and Lessees" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Companies" />
            </ListItem>
          </List>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            3. What are the registration fees?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Registration is mandatory for accessing the services and is a one-time fee:
          </Typography>
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>User Category</strong></TableCell>
                  <TableCell><strong>Registration Fee (INR)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Students & Researchers</TableCell>
                  <TableCell>₹1,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Officials, Mineral Dealers, Firms & Lessees</TableCell>
                  <TableCell>₹2,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Companies</TableCell>
                  <TableCell>₹5,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            4. What services are included with registration?
          </Typography>
          <Typography variant="body1" gutterBottom>
            Registration gives access to:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Legal updates and policy changes" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Case law summaries" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Regulatory guidance" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Notifications and circulars" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Community discussions and forums" />
            </ListItem>
          </List>
          <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic' }}>
            Note: Access to the digital Library requires an additional annual subscription.
          </Typography>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            5. What are the charges for Library access?
          </Typography>
          <Typography variant="body1" gutterBottom>
            The library contains premium materials such as full legal texts, analysis, archived documents, and exclusive research reports. The annual fees for access are:
          </Typography>
          <TableContainer component={Paper} sx={{ my: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  <TableCell><strong>User Category</strong></TableCell>
                  <TableCell><strong>Annual Library Access Fee (INR)</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Students</TableCell>
                  <TableCell>₹5,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Researchers</TableCell>
                  <TableCell>₹7,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Officials, Mineral Dealers, Firms & Lessees</TableCell>
                  <TableCell>₹15,000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Companies</TableCell>
                  <TableCell>₹25,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            6. Can I access the platform without paying the Library fee?
          </Typography>
          <Typography variant="body1">
            Yes. You can still benefit from several core features such as legal updates, forums, and basic guidance with only the registration fee. However, the library content is only accessible after subscribing to the respective annual library access plan.
          </Typography>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            7. Is the payment secure?
          </Typography>
          <Typography variant="body1">
            Yes, we use secure payment gateways to ensure your transactions are protected.
          </Typography>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            8. Can I upgrade my account or switch categories?
          </Typography>
          <Typography variant="body1">
            Yes, you can request an upgrade or switch category by contacting our support team. Additional fees may apply based on your new category.
          </Typography>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            9. How do I get support if I face any issues?
          </Typography>
          <Typography variant="body1" gutterBottom>
            You can reach our support team via:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="• Email: rajshekhar.it@gmail.com" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Phone: +917091627631" />
            </ListItem>
          </List>
        </QuestionPaper>

        <QuestionPaper elevation={3}>
          <Typography variant="h6" gutterBottom>
            10. Is there a refund policy?
          </Typography>
          <Typography variant="body1">
            Fees are non-refundable once paid, as we provide immediate access to digital services and resources. Please ensure you choose the correct category before registering.
          </Typography>
        </QuestionPaper>
      </ContentSection>
    </Container>
  );
};

export default FAQ;