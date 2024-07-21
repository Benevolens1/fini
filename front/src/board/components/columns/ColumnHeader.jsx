import React from "react";

export default class ColumnHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="column-title">{this.props.columnTitle}</div>
        <hr />
      </>
    );
  }
}