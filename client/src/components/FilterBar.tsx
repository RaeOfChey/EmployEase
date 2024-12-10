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
        'Entry Level',
        'Mid Level',
        'Senior Level',
        'management',
        'Internship',
    ];

    const industryOptions = [
        'Construction',
        'Education',
        'Editor',
        'Accounting and Finance',
        'Law',
        'Healthcare',
        'Food and Hospitality Services',
        'Manufacturing and Warehouse',
        'Marketing',
        'Media, PR, and Communications',
        'Real Estate',
        'Retail',
        'Software Engineering',
        'IT',
        'Transportation and Logistics'
    ];

    const locationOptions = [
    'Birmingham, AL',
    'Anchorage, AK',
    'Phoenix, AZ',
    'Little Rock, AR',
    'Los Angeles, CA',
    'Denver, CO',
    'Bridgeport, CT',
    'Wilmington, DE',
    'Jacksonville, FL',
    'Atlanta, GA',
    'Honolulu, HI',
    'Boise, ID',
    'Chicago, IL',
    'Indianapolis, IN',
    'Des Moines, IA',
    'Wichita, KS',
    'Louisville, KY',
    'New Orleans, LA',
    'Portland, ME',
    'Baltimore, MD',
    'Boston, MA',
    'Detroit, MI',
    'Minneapolis, MN',
    'Jackson, MS',
    'Kansas City, MO',
    'Billings, MT',
    'Omaha, NE',
    'Las Vegas, NV',
    'Manchester, NH',
    'Newark, NJ',
    'Albuquerque, NM',
    'New York City, NY',
    'Charlotte, NC',
    'Fargo, ND',
    'Columbus, OH',
    'Oklahoma City, OK',
    'Portland, OR',
    'Philadelphia, PA',
    'Providence, RI',
    'Charleston, SC',
    'Sioux Falls, SD',
    'Nashville, TN',
    'Houston, TX',
    'Salt Lake City, UT',
    'Burlington, VT',
    'Virginia Beach, VA',
    'Seattle, WA',
    'Charleston, WV',
    'Milwaukee, WI',
    'Cheyenne, WY'
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
