import Pagination from "@material-ui/lab/Pagination";

const CustomPagination = ({ count, onPageChange }: any) => {
    return (
        <Pagination
            count={count}
            onChange={(_, page) => onPageChange(page)}
        />
    );
};

export default CustomPagination;