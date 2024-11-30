import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    ListItem,
    List,


} from '@material-ui/core';
import { Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';




function FAQPage() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [focusedResultIndex, setFocusedResultIndex] = useState(-1);


    const [formData, setFormData] = useState({
        email: '',
        description: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g., send the data to your server
        console.log('Form submitted:', formData);
        // Clear the form fields after submission
        setFormData({
            email: '',
            description: '',
        });
    };


    const handleSearch = () => {
        const filteredResults = faqs.filter((faq) =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredResults);

        if (filteredResults.length > 0) {
            setFocusedResultIndex(0);
        } else {
            setFocusedResultIndex(-1);
        }
    };

    const faqs = [
        {
            question: 'How do I log in to Elimu Trees?',
            answer:
                'To log in to Elimu Trees, go to the login page and enter your Nemis username and password. Click the "Login" button to access your account.',
        },
        {
            question: 'How can I reset my password?',
            answer:
                'If you need to reset your password, you can do so from your Nemis account because the login details are all the same across the Ministries websites. While on the Nemis portal, follow the instructions to reset your password.',
        },
    ];


    return (
        <Container style={{ marginTop: '65px', height: 'auto', marginBottom: '20px' }} sx={{ maxWidth: '100%' }} maxWidth={false}>

            <Paper elevation={3} sx={{ padding: '10px', height: '200px' }}>
                <Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="h4" style={{ marginBottom: '10px' }} sx={{ fontSize: { xs: 12, sm: 16, md: 24 } }} >
                            Looking for help? Here are our most frequently asked questions.
                        </Typography>
                        <Typography variant="body1" style={{ color: 'brown' }} sx={{ fontSize: { xs: 10, sm: 12, md: 20 } }}>
                            Everything you need to know about ElimuTrees. Can't find the answer to a question you have? Worry not! Just fill out the form below, and our team will respond.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ textAlign: { xs: 'center', sm: 'center', md: 'right' } }} >
                        <Button
                            variant="outlined"
                            color="primary"
                            style={{ borderColor: 'blueviolet', color: 'black', width: '150px', borderRadius: '20px', marginRight:'0' }}
                            onClick={handleSearch}
                            startIcon={<SearchIcon />}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            <Grid containerSpacing="2">
                <Grid item xs={12} md={6} lg={6}>
                    <div style={{ justifyContent: 'space-around' }}>
                        <Typography variant="h3" >Frequently Asked Questions</Typography>
                        <Typography variant="h4">Welcome To ElimuTrees</Typography>
                        <Typography variant="body1">
                            If you have any questions check if they have been answered in this page, otherwise,
                            reach out to us via our socials
                        </Typography>
                        <ul>
                            {faqs.map((faq, index) => (
                                <li key={index}>
                                    <Typography variant="h4">{faq.question}</Typography>
                                    <Typography variant="body1">{faq.answer}</Typography>
                                </li>
                            ))}
                        </ul>

                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <form onSubmit={handleSubmit}>
                        <Typography variant="h3" style={{ padding: "5px" }}>
                            Question? Send us an email
                        </Typography>
                        <TextField
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Tell Us Today..."
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Grid>

        </Container>
    );
};

export default FAQPage;