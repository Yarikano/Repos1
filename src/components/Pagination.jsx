import { Pagination } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
const PagginationComponent = ({
	totalPosts,
	paginate,
	current,
	isCheckedFilter,
	filterPosts
}) => {
	const [currentFilter, setCurrentFilter] = useState(null);
	const pageCount = () => {
		if (!isCheckedFilter) {
			setCurrentFilter(totalPosts);
		} else {
			setCurrentFilter(filterPosts.length);
		}
	};
	useEffect(() => {
		pageCount();
	});
	return (
		<Pagination
			total={currentFilter}
			current={current}
			onChange={number => {
				paginate(number);
			}}
		/>
	);
};
export default PagginationComponent;
