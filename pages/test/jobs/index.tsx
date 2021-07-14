import React, { FunctionComponent, useEffect, useState } from 'react';
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Card from '@components/Card';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const Test: FunctionComponent = () => {
    const [jobList, setJobList] = useState([]);
    const [companyNameID, setCompanyNameID] = useState(null);
    const [postingDateRange, setPostingDateRange] = useState({ value: '1d', label: 'Yesterday' });
    const [selectedValue, setSelectedValue] = useState(null);
    const [loading, setloading] = useState(true);

    /**
     * Whenever page will load it will call zippia API and get the data.
     */
    useEffect(() => {
        setloading(true);
        var reuestPayloadData = {
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "",
            "companyID": companyNameID,
            "locations": [],
            "postingDateRange": postingDateRange,
            "numJobs": 20,
            "previousListingHashes": []
        };

        axios.post('https://www.zippia.com/api/jobs/', reuestPayloadData)
            .then((res) => { setloading(false); setJobList(res?.data?.jobs) })
            .catch((err) => console.log("Error" + JSON.stringify(err)))
    }, [companyNameID, postingDateRange]);

    /**
     * For job options array it's static value.
     */
    const Joboptions = [
        { value: '1d', label: 'Yesterday' },
        { value: '3d', label: 'Last 3 day' },
        { value: '7d', label: 'Last week' },
        { value: '30d', label: 'Last month' }
    ]

    /**
     * Handle change event for company name and show appropriate data
     * @param value for search company name
     */
    const handleChange = (value) => {
        setSelectedValue(value);
        setCompanyNameID(value?.companyID);
    }

    /**
     * Call Zippia Job API and get data from this API.
     * @param companyName Search company data
     * @returns job array
     */
    const loadJobs = (companyName) => {
        return axios.get(`https://www.zippia.com/autocomplete/company/?searchString=${companyName}&indexableOnly=true`)
            .then(res => res.data)
            .catch(err => console.log(err))
    };

    return (
        <React.Fragment>
            <div className="header">
                <h2 className="header-title">Zippia</h2>
            </div>
            <Container>
                <div className="main-cover-title">
                    <h4 className="sub-header-title">Find Best Job</h4>
                    <div className="search-company-name">
                        <AsyncSelect
                            className="search-filter-company"
                            cacheOptions
                            defaultOptions
                            noOptionsMessage={() => 'Loading...'}
                            placeholder="Search jobs by company name"
                            isClearable={true}
                            value={selectedValue}
                            getOptionLabel={e => e.companyName}
                            getOptionValue={e => e.companyID}
                            loadOptions={loadJobs}
                            onChange={handleChange}
                        />
                        <Select
                            className="search-filter-type"
                            classNamePrefix="Search Latest Post Jobs"
                            isClearable={true}
                            isSearchable={true}
                            defaultValue={postingDateRange}
                            onChange={(jobPostSelectedValue) =>
                                setPostingDateRange(jobPostSelectedValue?.value)}
                            name="color"
                            options={Joboptions}
                        />
                    </div>
                </div>
                <br />
                {
                    jobList.length > 0
                        ?
                        <Row>
                            {jobList?.map((jobData, index) => (
                                <Col sm={6} md={4} lg={3} style={{ padding: '15px' }}>
                                    <Card
                                        postedDate={jobData.postedDate}
                                        companyLogo={jobData.companyLogo}
                                        companyInitial={jobData.companyInitial}
                                        estimatedSalary={jobData.estimatedSalary}
                                        skillsets={jobData.skillsets}
                                        jobTitle={jobData.jobTitle}
                                        location={jobData.location}
                                        description={jobData.shortDesc}
                                        company={jobData.companyName}
                                        key={`grid-${index}`}
                                    />
                                </Col>
                            ))}
                        </Row>
                        :
                        loading
                            ?
                            <h5 style={{ padding: '20px', textAlign: 'center' }}>
                                <Spinner animation="border" variant="primary" />
                                &nbsp; Please wait for few mintues, Loading...
                            </h5>
                            :
                            <h5 className="no-job-found">
                                Oops! jobs doesn't found for you.
                            </h5>
                }
            </Container>
        </React.Fragment>
    )
}

export default Test;
