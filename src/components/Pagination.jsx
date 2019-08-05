import React, {Component} from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
    render() {
        const {page, limit, count, pagePrev, pageNext, pageInput, pageLimit} = this.props;
        let totalPages = 0;

        if (count > 0) {
            totalPages = Math.ceil(count / limit);
        }

        return (
            <div className="pagination ">
              <span>Page:</span>
              <button className="btn btn-rounded mx-2" type="button" onClick={pagePrev} disabled={ page < 1 }>
                <i className="fas fa-chevron-left"/>
              </button>
              <input type="number" name="page" className="input-widget" onChange={pageInput} value={page} />
              <button className="btn btn-rounded mx-2" type="button" onClick={pageNext} disabled={ page >= totalPages -1 }>
                <i className="fas fa-chevron-right"/>
              </button>
              <span className="mr-2">of {totalPages}</span>
              <span className="totals-label"> Total of {count} records</span>
              <div className="page-size ml-4">
              <select name="page-size" className="form-control mr-2" value={this.props.limit} onChange={pageLimit}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              </div>
            </div>
        );
    }
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
};

export default Pagination;
