import './index.css'

const Filters = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachEmployee => {
      const {updateEmployee} = props

      const onChangeEmployee = () =>
        updateEmployee(eachEmployee.employmentTypeId)

      return (
        <li
          className="employee-list-item"
          key={eachEmployee.employmentTypeId}
          onChange={onChangeEmployee}
        >
          <input
            type="checkbox"
            className="employeeInput"
            id={eachEmployee.employmentTypeId}
            value={eachEmployee.employmentTypeId}
          />
          <label
            className="employee-label"
            htmlFor={eachEmployee.employmentTypeId}
          >
            {eachEmployee.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachSalary => {
      const {updateSalary} = props

      const onChangeSalary = () => updateSalary(eachSalary.salaryRangeId)

      return (
        <li
          key={eachSalary.salaryRangeId}
          className="salarayRange-list-item"
          onClick={onChangeSalary}
        >
          <input
            className="salaryInput"
            type="radio"
            id={eachSalary.salaryRangeId}
            value={eachSalary.label}
            name="salary"
          />
          <label className="salaryLabel" htmlFor={eachSalary.salaryRangeId}>
            {eachSalary.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="filters-container">
      <h1 className="filters-heading">Type of Employment</h1>
      {renderEmploymentList()}
      <hr />
      <h1 className="filters-heading">Salary Range</h1>
      {renderSalaryRange()}
    </div>
  )
}

export default Filters
