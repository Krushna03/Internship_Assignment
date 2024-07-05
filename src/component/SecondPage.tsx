import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from './DepartmentList';
import { Post } from '../Post';


const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/', { state: { fromSecondPage: true } });
    } else {
      axios.get<Post[]>(API_URL)
        .then((response) => {
          setPosts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
          setLoading(false);
        });
    }
  }, [navigate]);


  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];


  return (
    <Container maxWidth="lg">
      <Box mt={2}>
        
        <Typography variant="h4" gutterBottom>Post List</Typography>

        {loading ? (
          <Typography mt={5}>Loading...</Typography>
        ) : (
          <div style={{ height: 600, width: '100%' }}>
            <DataGrid 
              rows={posts} 
              columns={columns} 
              pageSize={10} 
              rowsPerPageOptions={[10]} 
            />
          </div>
        )}
      </Box>

      <Box mt={5}>
        <Typography variant="h4" gutterBottom>Department List</Typography>
        <DepartmentList />
      </Box>
      
    </Container>
  );
};

export default SecondPage;
