import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import '../App.css';

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Box,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';

const Home = () => {
  const [uesrs, setUsers] = useState([]);
  //   console.log('users', uesrs);
  const [input, setInput] = useState('');
  const [sort, setSort] = useState('');
  const [filteropt, setFilteropt] = useState('');
  const [page, setPage] = useState(3);

  const getData = () => {
    return axios
      .get(' https://react-search-filter-sort-pagi.herokuapp.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };
  console.log('users:', uesrs);
  useEffect(() => {
    getData();
  }, []);

  const formsubmit = (e) => {
    e.preventDefault();
  };

  const handelchange = (e) => {
    setInput(e.target.value);
  };

  // search functionality

  const handlesearch = async () => {
    return await axios
      .get(
        `https://react-search-filter-sort-pagi.herokuapp.com/users?q=${input}`
      )
      .then((res) => {
        setUsers(res.data);
        setInput('');
      })
      .catch((err) => console.log(err));
  };

  // reset functionality
  const handleRest = () => {
    getData();
  };

  // sort functionality
  const sortoption = ['name', 'email', 'Address', 'contact', 'status'];

  const handlesort = async (e) => {
    let value = e.target.value;
    setSort(value);
    return await axios
      .get(
        `https://react-search-filter-sort-pagi.herokuapp.com/users?_sort=${value}&_order=asc`
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // filter
  const handlefilter = async (value) => {
    return await axios
      .get(
        `https://react-search-filter-sort-pagi.herokuapp.com/users?status=${value}`
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  // pagination
  const handlepagination = async () => {
    return await axios
      .get(
        `https://react-search-filter-sort-pagi.herokuapp.com/users?_page=${page}&_limit=3`
      )
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <form action='' onSubmit={formsubmit}>
          <input type='text' onChange={handelchange} value={input} />
          <Button type='submit' className='btn' onClick={() => handlesearch()}>
            Search
          </Button>

          <Button type='submit' className='btn' onClick={() => handleRest()}>
            Reset
          </Button>
        </form>
      </div>
      <Box>
        <TableContainer>
          <Table size='sm'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>name</Th>
                <Th>Email </Th>
                <Th>Address</Th>
                <Th>Contact</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {uesrs.map((item) => {
                return (
                  <Tr key={item.id} className='color'>
                    <Td>{item.id}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.Address}</Td>
                    <Td>{item.contact}</Td>
                    <Td>{item.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <select value={sort} onChange={handlesort}>
          <option value=''>please select option</option>
          {sortoption.map((item) => (
            <option value={item} key={item.id}>
              {item}
            </option>
          ))}
        </select>
      </Box>
      <Box style={{ marginLeft: '600px' }}>
        <h5>Filter by :</h5>
        <Button onClick={() => handlefilter('Active')} bg={'green'}>
          Active
        </Button>
        <Button onClick={() => handlefilter('In-Active')} bg={'red'}>
          In-Active
        </Button>
      </Box>
      <Box>
        <Button onClick={() => handlepagination(setPage(page + 1))}>Next</Button>
        <Button onClick={() => handlepagination(setPage(page - 1))}>Prev</Button>
      </Box>
    </div>
  );
};

export default Home;
