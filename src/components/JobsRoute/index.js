import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../JobsCard'
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

const apiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
  failure: 'Failure',
  initial: 'INITIAL',
}

class JobsRoute extends Component {
  state = {
    searchInput: '',
    jobsData: [],
    activeEmploymentId: [],
    minimumSalary: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, activeEmploymentId, minimumSalary} = this.state

    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${activeEmploymentId}&minimum_package=${minimumSalary}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        Location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobsData: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobs = () => {
    const {jobsData} = this.state
    return jobsData.length > 0 ? (
      <div>
        <ul className="jobs-container">
          {jobsData.map(eachJob => (
            <JobsCard jobCardDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="noJobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="noJobs-image"
        />
        <h1 className="noJobs-heading">No Jobs Found</h1>
        <p className="noJobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchButton = () => {
    this.getJobs()
  }

  renderSearchContainer = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="text"
          className="searchInput"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        {/* eslint-disable-next-line */}
        <button
          data-testid="searchButton"
          type="button"
          className="search-button"
          onClick={this.onSearchButton}
          value={searchInput}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  updateEmployee = type => {
    const {activeEmploymentId} = this.state

    const inputNotInList = activeEmploymentId.filter(
      eachItem => eachItem === type,
    )
    // console.log(inputNotInList)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          activeEmploymentId: [...prevState.activeEmploymentId, type],
        }),
        this.getJobs,
      )
    } else {
      const filteredData = activeEmploymentId.filter(
        eachItem => eachItem !== type,
      )
      // console.log(filteredData)

      this.setState({activeEmploymentId: filteredData}, this.getJobs)
    }
  }

  updateSalary = salaryRangeId => {
    this.setState({minimumSalary: salaryRangeId}, this.getJobs)
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
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
      <h1 className="failureHeading">Oops! Something Went Wrong</h1>
      <p className="failureDescription">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobs()
      case apiStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobsPage">
          <div className="profile_filters_container">
            <Profile />
            <Filters
              employmentTypesList={employmentTypesList}
              updateEmployee={this.updateEmployee}
              salaryRangesList={salaryRangesList}
              updateSalary={this.updateSalary}
            />
          </div>
          <div className="search_jobDetails-container">
            {this.renderSearchContainer()}
            {this.renderJobsViews()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsRoute
