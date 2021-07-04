import React from 'react';
import { connect } from 'react-redux';

class EmployeeListPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let employeesList = this.props.employees
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>AGE</th>
            <th>GENDER</th>
            <th>EMAIL</th>
            <th>PHONE NO.</th>
          </tr>
        </thead>
        <tbody>
          {
              employeesList.map(function(item, key) {
                return (
                  <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.gender}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneNo}</td>
                  </tr>
                )
              })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employeesList
  }
}

export default connect(mapStateToProps)(EmployeeListPage);
