import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './Card.module.css';

function Cards({
    postedDate, companyLogo, companyInitial, estimatedSalary, skillsets, company, description, location, jobTitle
}) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <div className={styles.logoWrapper}>
                        {
                            companyLogo ?
                                <img src={companyLogo} className={styles.companyLogo} />
                                :
                                <div className={styles.companyInitial}><b>{companyInitial}</b></div>
                        }
                    </div>
                    <div className={styles.jobTitle}>{company}</div>
                    <div className={styles.jobSubTitle}>{jobTitle}</div>
                    <div className={styles.jobLocation}>{location}</div>
                </Card.Title>
                <Card.Text>
                    <div className={styles.jobSkill}>
                        <strong>Skills:  </strong>
                        {skillsets?.join(', ')}
                    </div>
                    <div className={styles.jobFooterContainer}>
                        <p className={styles.jobLocation}><span style={{ color: 'rgba(51,51,51,.8)', fontSize: '13px' }}><b>Salary</b>:</span>{estimatedSalary}</p>
                    </div>
                </Card.Text>
                <div>{postedDate}</div>
                <Card.Link href="#">Apply Now</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default Cards;