import React from "react";

const SynthesizedRow = ({ value, handleChange, textarea, options, ...rest }) => {
    const handleOnChange = (e) => {
        console.log(e.target.value);
        if (handleChange) handleChange(e.target.value);
    }
    switch (textarea) {
    case true:
      return (
        <td>
          <textarea
            value={value}
            onChange={handleOnChange}
            {...rest}
          />
        </td>
      );

    default:
      return (
        <td>
          {options ? (
            <select value={value} onChange={handleOnChange} {...rest}>
              {/* <option value="New">New</option>
              <option value="Assigned">Assigned</option>
              <option value="Fixed">Fixed</option>
              <option value="Closed">Closed</option> */}
              {options.map((option, index) => {
                  return (
                    <option key={index} value={`${option}`}>{`${option}`}</option>
                  )
              })}
            </select>
          ) : (
            <input value={value} onChange={handleOnChange} {...rest}/>
          )}
        </td>
      );
  }
};

const EditIssueRow = ({ labelString, ...rest }) => {
    return(
        <tr>
            <td>{labelString}</td>
            <SynthesizedRow {...rest}/>
        </tr>
    )
};

export default EditIssueRow;
