const employees = require("../assets/EmployeeList.json")
const EmployeeListReducer = (state = {}) => {
    return Object.assign({}, state, { employeesList:  employees});
}

export default EmployeeListReducer