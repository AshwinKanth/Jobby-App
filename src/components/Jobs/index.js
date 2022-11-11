import Loader from 'react-loader-spinner'

import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'

import JobsCard from '../JobsCard'

import Header from '../Header'
import Profile from '../Profile'
import Filters from '../Filters'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    searchInput: '',
    activeEmploymentId: [],
    activeSalaryRangeId: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchInput, activeEmploymentId, activeSalaryRangeId} = this.state
    const activeEmploymentsIds = activeEmploymentId.join()
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentsIds}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)

      const updatedData = fetchedData.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0
    return showJobsList ? (
      <ul className="allJobs-section">
        {jobsList.map(eachJob => (
          <JobsCard jobCardDetails={eachJob} key={eachJob.id} />
        ))}
      </ul>
    ) : (
      this.renderNoJobsView()
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchButton = () => {
    this.getJobsList()
  }

  updateEmployee = id => {
    this.setState(
      prevState => ({
        activeEmploymentId: [...prevState.activeEmploymentId, id],
      }),
      this.getJobsList,
    )
  }

  updateSalary = activeSalaryRangeId => {
    this.setState({activeSalaryRangeId}, this.getJobsList)
  }

  renderNoJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-found-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  renderJobsListView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-page">
          <div className="profile-options-container">
            <Profile />
            <hr />
            <Filters
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              updateEmployee={this.updateEmployee}
              updateSalary={this.updateSalary}
            />
          </div>
          <div className="jobs-content-container">
            <div className="searchInput-container">
              <input
                className="search-input"
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSearchButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobsListView()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
