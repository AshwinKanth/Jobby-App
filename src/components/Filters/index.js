import './index.css'

const Filters = props => {
  const onChangeEmployee = event => {
    const {updateEmployee} = props
    updateEmployee(event.target.value)
  }

  const renderEmploymentType = () => {
    const {employmentTypesList} = props
    return (
      <ul className="EmployeeTypeList">
        {employmentTypesList.map(employmentType => (
          <li
            className="employmentTypeItem"
            key={employmentType.employmentTypeId}
            onChange={onChangeEmployee}
          >
            <input
              type="checkbox"
              value={employmentType.employmentTypeId}
              id={employmentType.employmentTypeId}
            />
            <label className="label" htmlFor={employmentType.employmentTypeId}>
              {employmentType.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  const onClickSalary = event => {
    const {updateSalary} = props
    updateSalary(event.target.value)
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return (
      <ul className="salaryList">
        {salaryRangesList.map(eachSalary => (
          <li
            className="salaryListItem"
            onClick={onClickSalary}
            key={eachSalary.salaryRangeId}
          >
            <input
              type="radio"
              value={eachSalary.salaryRangeId}
              name="salary"
              id={eachSalary.salaryRangeId}
            />
            <label htmlFor={eachSalary.salaryRangeId} className="label">
              {eachSalary.label}
            </label>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div className="filters-container">
      <h1 className="employmentHeading">Type of Employment</h1>
      {renderEmploymentType()}
      <hr />
      <h1 className="employmentHeading">Salary Range</h1>
      {renderSalaryRange()}
    </div>
  )
}

export default Filters
