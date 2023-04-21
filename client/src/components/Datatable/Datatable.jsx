import "./datatable.scss";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { Pagination, PaginationItem } from "@mui/material";

const Datatable = ({ data, loading, columns }) => {
  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        variant="outlined"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }

  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns}
        pageSize={7}
        disableSelectionOnClick
        density="comfortable"
        getRowId={(row) => row._id}
        rowsPerPageOptions={[7]}
        loading={loading}
        initalState={{
          sortModel: [
            {
              field: "rankNo",
              sort: "desc",
            },
          ],
        }}
        sx={{
          boxShadow: 8,
          "& .MuiDataGrid-cell:hover": {
            color: "black",
            backgroundColor: "#eee",
            fontWeight: "bold",
          },
        }}
        components={{
          Pagination: CustomPagination,
        }}
      />
    </div>
  );
};

export default Datatable;
