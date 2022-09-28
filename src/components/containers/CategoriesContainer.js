import React from "react";
import { connect } from "react-redux";
import { fetchCategories } from "../../features/categories/categoriesSlice.js";

class CategoriesContainer extends React.PureComponent {
	componentDidMount() {
		this.props.dispatch(fetchCategories());
	}

	render() {
		const { value, status, error } = this.props.categories;

		return this.props.children({
			value,
			status,
			error,
		});
	}
}

function mapStateToProps(state) {
	const { categories } = state;
	return {
		categories,
	};
}

export default connect(mapStateToProps)(CategoriesContainer);
