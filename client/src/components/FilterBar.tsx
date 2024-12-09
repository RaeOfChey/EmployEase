import React from 'react';
import { Form, Button, Col, Row, DropdownButton } from 'react-bootstrap';

// Define the prop types
interface FilterBarProps {
    location: string[];
    setLocation: React.Dispatch<React.SetStateAction<string[]>>;
    industry: string[];
    setIndustry: React.Dispatch<React.SetStateAction<string[]>>;
    experience: string[];
    setExperience: React.Dispatch<React.SetStateAction<string[]>>;
    handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
    location,
    setLocation,
    industry,
    setIndustry,
    experience,
    setExperience,
    handleFormSubmit,
}) => {
    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string[]>>,
        currentValue: string[]
    ) => {
        const { value, checked } = e.target;
        if (checked) {
            setter([...currentValue, value]);
        } else {
            setter(currentValue.filter((item) => item !== value));
        }
    };

    const experienceOptions = [
        'Internship',
        'Entry Level',
        'Associate',
        'Mid-Senior Level',
        'Director',
        'Executive',
    ];

    const industryOptions = [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Retail',
        'Manufacturing',
        'Construction',
        'Real Estate',
        'Marketing',
        'Transportation',
        'Hospitality',
        'Government',
        'Media',
        'Telecommunications',
        'Energy',
    ];

    const locationOptions = [
        'New York, NY',
        'Los Angeles, CA',
        'Chicago, IL',
        'Houston, TX',
        'Phoenix, AZ',
        'Philadelphia, PA',
        'San Antonio, TX',
        'San Diego, CA',
        'Dallas, TX',
        'San Jose, CA',
    ];

    return (
        <Form className="filter-bar custom-filter-bar" onSubmit={handleFormSubmit}>
            <Row>
                <Col md={3}>
                <Form.Label>Location</Form.Label>
                    <DropdownButton title="Select location" className="custom-location">
                        {locationOptions.map((loc) => (
                            <Form.Check
                                key={loc}
                                type="checkbox"
                                label={loc}
                                value={loc}
                                checked={location.includes(loc)}
                                onChange={(e) =>
                                    handleCheckboxChange(e, setLocation, location)
                                }
                            />
                        ))}
                    </DropdownButton>
                </Col>

                <Col md={3}>
                <Form.Label>Industry</Form.Label>
                    <DropdownButton title="Select industry" className="custom-industry">
                        {industryOptions.map((ind) => (
                            <Form.Check
                                key={ind}
                                type="checkbox"
                                label={ind}
                                value={ind}
                                checked={industry.includes(ind)}
                                onChange={(e) =>
                                    handleCheckboxChange(e, setIndustry, industry)
                                }
                            />
                        ))}
                    </DropdownButton>
                </Col>

                <Col md={3}>
                <Form.Label>Experience Level</Form.Label>
                    <DropdownButton title="Select experience level" className="custom-experience">
                        {experienceOptions.map((exp) => (
                            <Form.Check
                                key={exp}
                                type="checkbox"
                                label={exp}
                                value={exp}
                                checked={experience.includes(exp)}
                                onChange={(e) =>
                                    handleCheckboxChange(e, setExperience, experience)
                                }
                            />
                        ))}
                    </DropdownButton>
                </Col>

                <Col md={3} className="d-flex align-items-end">
                    <Button
                        variant="primary"
                        type="submit"
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
