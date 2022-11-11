import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Component} from 'react'
import './index.css'

import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: [],
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getFormattedSkillData = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  getFormattedLifeCompanyData = life => ({
    description: life.description,
    imageUrl: life.image_url,
  })

  getFormattedData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    packagePerAnnum: job.package_per_annum,
    rating: job.rating,
    title: job.title,
    id: job.id,
    companyWebsiteUrl: job.company_website_url,
    skills: job.skills.map(eachSkill => this.getFormattedSkillData(eachSkill)),
    lifeAtCompany: this.getFormattedLifeCompanyData(job.life_at_company),
  })

  getFormattedSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
    id: job.id,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(
        eachSimilarJob => this.getFormattedSimilarJobData(eachSimilarJob),
      )
      this.setState({
        jobItemData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobItemData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobItemData
    return (
      <div className="bg-container">
        <div className="job-item-details-container">
          <div className="logo-title-star-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="compony-logo"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="star-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-job-type-salary-container">
            <div className="location-job-type-container">
              <div className="location-container">
                <GoLocation className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="type-icon" />
                <p className="employmentType">{employmentType}</p>
              </div>
            </div>
            <p className="packagePerAnnum">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-url">
            <h1 className="description">Description</h1>
            <a href={companyWebsiteUrl} className="visit">
              Visit
            </a>
          </div>
          <p className="jobDescription">{jobDescription}</p>
          <h1 className="description">Skills</h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-item">
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="skill-heading">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="lifeAtCompany-heading">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="lifeAtCompany-description">
              {lifeAtCompany.description}
            </p>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="similar-jobs-title">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobsData.map(eachSimilarJob => (
            <SimilarJobs
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button" onClick={this.getJobItemDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobs-loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobItem-details-container">
        <Header />
        {this.renderJobItemDetailsView()}
      </div>
    )
  }
}

export default JobItemDetails
