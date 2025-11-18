import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

// TEMP DUMMY DATA — replace with API data
const rows = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Phones",
    price: 1200,
    stock: 10,
    image: "/finsweet.jpeg",
  },
  {
    id: 2,
    name: "PS5",
    category: "Gaming",
    price: 600,
    stock: 25,
    image: "/ps5.png",
  },
  {
    id: 3,
    name: "Xbox Series S",
    category: "Gaming",
    price: 500,
    stock: 14,
    image: "/xboxs.png",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function ProductList() {
  const navigate = useNavigate();

  const handleEdit = (row) => {
    console.log("Edit Product:", row);
    navigate(`/edit-product/${row.id}`, { state: row });
  };

  const handleDelete = (row) => {
    console.log("Delete Product:", row);
  };

  const columns = [
    { field: "id", headerName: "Serial", width: 100 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "category", headerName: "Category", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      type: "number",
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 120,
      type: "number",
    },
    {
      field: "image",
      headerName: "Image",
      width: 120,
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
      field: "actions",
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
    <Paper sx={{ height: 500, width: "100%" }}>
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
        }}
      />
    </Paper>
  );
}
