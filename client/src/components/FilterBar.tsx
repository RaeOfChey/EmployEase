import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

// Define the prop types
interface FilterBarProps {
    location: string;
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    industry: string;
    setIndustry: React.Dispatch<React.SetStateAction<string>>;
    experience: string;
    setExperience: React.Dispatch<React.SetStateAction<string>>;
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    location,
    setLocation,
    industry,
    setIndustry,
    experience,
    setExperience,
    handleFormSubmit
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Update the parent component's state using the setter functions
        if (name === 'location') {
            setLocation(value);
        } else if (name === 'industry') {
            setIndustry(value);
        } else if (name === 'experience') {
            setExperience(value);
        }
    };

    return (
        <Form className="filter-bar custom-filter-bar" onSubmit={handleFormSubmit}>
            <Row>
                <Col md={3}>
                    <Form.Group controlId="location" className="custom-location">
                        <Form.Label>Location</Form.Label>
                            <Form.Select
                                name="location"
                                value={location}
                                onChange={handleInputChange}
                            >
                                <option value="">Select location</option>
                            </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group controlId="industry" className="custom-industry">
                        <Form.Label>Industry</Form.Label>
                            <Form.Select
                                name="industry"
                                value={industry}
                                onChange={handleInputChange}
                            >
                                <option value="">Select industry</option>
                            </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group controlId="experience" className="custom-experience">
                        <Form.Label>Experience Level</Form.Label>
                            <Form.Select
                                name="experience"
                                value={experience}
                                onChange={handleInputChange}
                            >
                                <option value="">Select experience level</option>
                            </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={3} className="d-flex align-items-end">
                    <Button
                        variant='primary'
                        type='submit'
                        className="w-100 custom-search-btn"
                    >
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FilterBar;
