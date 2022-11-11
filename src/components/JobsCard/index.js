import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsCard = props => {
  const {jobCardDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobCardDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link-item">
      <li className="job-list-item">
        <div className="job-card">
          <div className="logo-container">
            <img
              src={companyLogoUrl}
              alt="compony logo"
              className="compony-logo"
            />
          </div>
          <div className="title-rating-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="details-container">
          <div className="location-type-container">
            <div className="location-container">
              <GoLocation className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="job-type-container">
              <BsBriefcaseFill className="type-icon" />
              <p className="employmentType">{employmentType}</p>
            </div>
          </div>
          <p className="packagePerAnnum">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="description-heading">Description</h1>
        <p className="jobDescription">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
