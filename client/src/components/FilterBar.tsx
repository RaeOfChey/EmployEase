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
}

const FilterBar: React.FC<FilterBarProps> = ({
    location,
    setLocation,
    industry,
    setIndustry,
    experience,
    setExperience,
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
        <Form className="filter-bar">
            <Row>
                <Col md={3}>
                    <Form.Group controlId="location" >
                        <Form.Label>Location</Form.Label>
                        <div className="custom-dropdown">
                            <Form.Select
                                name="location"
                                value={location}
                                onChange={handleInputChange}
                            >
                                <option value="">Select location</option>
                                <option value="remote">Remote</option>
                                <option value="new-york">New York</option>
                                <option value="san-francisco">San Francisco</option>
                                <option value="chicago">Chicago</option>
                                <option value="austin">Austin</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group controlId="industry">
                        <Form.Label>Industry</Form.Label>
                        <div className="custom-dropdown">
                            <Form.Select
                                name="industry"
                                value={industry}
                                onChange={handleInputChange}
                            >
                                <option value="">Select industry</option>
                                <option value="tech">Technology</option>
                                <option value="finance">Finance</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="marketing">Marketing</option>
                            </Form.Select>
                        </div>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group controlId="experience">
                        <Form.Label>Experience Level</Form.Label>
                        <div className="custom-dropdown">
                            <Form.Select
                                name="experience"
                                value={experience}
                                onChange={handleInputChange}
                            >
                                <option value="">Select experience level</option>
                                <option value="internship">Internship</option>
                                <option value="entry-level">Entry Level</option>
                                <option value="associate">Associate</option>
                                <option value="mid-senior-level">Mid-Senior Level</option>
                                <option value="director">Director</option>
                                <option value="executive">Executive</option>
                            </Form.Select>
                        </div>
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
