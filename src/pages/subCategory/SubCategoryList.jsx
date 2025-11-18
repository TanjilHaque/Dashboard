import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

// Dummy Data
const rows = [
  {
    id: 1,
    name: "Gaming Laptops",
    category: "Electronics",
    image: "/laptop.png",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Footwear",
    image: "/shoes.png",
  },
  {
    id: 3,
    name: "Smart Watches",
    category: "Gadgets",
    image: "/watch.png",
  },
  {
    id: 4,
    name: "DSLR Cameras",
    category: "Electronics",
    image: "/camera.png",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function SubCategoryList() {
  const navigate = useNavigate();

  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    navigate(`/edit-subcategory/${row.id}`, { state: row });
  };

  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
  };

  const columns = [
    { field: "id", headerName: "Serial", width: 100 },
    { field: "name", headerName: "Sub-Category Name", width: 200 },
    { field: "category", headerName: "Category", width: 180 },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const imageUrl = params.row.image;

        return (
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              overflow: "hidden",
              border: "1px solid #ddd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5f5f5",
            }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 10, color: "#777" }}>No Image</span>
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{
          border: 0,
          "& .MuiDataGrid-cell": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeader": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            width: "100%",
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeaderDraggableContainer": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "fit-content",
          },
        }}
      />
    </Paper>
  );
}
