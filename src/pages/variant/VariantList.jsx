import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

// Dummy data
const rows = [
  {
    id: 1,
    variantName: "Red Hoodie",
    size: "L",
    color: ["Red"],
    retailPrice: 1200,
    wholeSalePrice: 950,
    stockVariant: 20,
    alertVariantStock: 5,
    isActive: true,
    image: [{ url: "/hoodie.png" }],
  },
  {
    id: 2,
    variantName: "Blue T-shirt",
    size: "M",
    color: ["Blue"],
    retailPrice: 500,
    wholeSalePrice: 350,
    stockVariant: 12,
    alertVariantStock: 3,
    isActive: false,
    image: [{ url: "/tshirt.png" }],
  },
  {
    id: 3,
    variantName: "Black Cap",
    size: "Free",
    color: ["Black"],
    retailPrice: 250,
    wholeSalePrice: 150,
    stockVariant: 50,
    alertVariantStock: 10,
    isActive: true,
    image: [{ url: "/cap.png" }],
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function VariantList() {
  const navigate = useNavigate();

  const handleEdit = (row) => {
    console.log("Edit Variant:", row);
    navigate(`/edit-variant/${row.id}`, { state: row });
  };

  const handleDelete = (row) => {
    console.log("Delete Variant:", row);
  };

  const columns = [
    { field: "id", headerName: "Serial", width: 80 },

    {
      field: "variantName",
      headerName: "Variant Name",
      width: 180,
    },

    {
      field: "size",
      headerName: "Size",
      width: 120,
    },

    {
      field: "color",
      headerName: "Color(s)",
      width: 150,
      renderCell: (params) => params.row.color.join(", "),
    },

    {
      field: "retailPrice",
      headerName: "Retail Price",
      width: 140,
      type: "number",
    },

    {
      field: "wholeSalePrice",
      headerName: "Wholesale Price",
      width: 160,
      type: "number",
    },

    {
      field: "stockVariant",
      headerName: "Stock",
      width: 120,
      type: "number",
    },

    {
      field: "alertVariantStock",
      headerName: "Stock Alert",
      width: 150,
      type: "number",
    },

    {
      field: "isActive",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            fontSize: "12px",
            backgroundColor: params.row.isActive ? "#4caf50" : "#f44336",
            color: "white",
          }}
        >
          {params.row.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },

    {
      field: "image",
      headerName: "Image",
      width: 120,
      sortable: false,
      renderCell: (params) => {
        const imgUrl = params.row.image?.[0]?.url;

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
            {imgUrl ? (
              <img
                src={imgUrl}
                alt="variant"
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
    <Paper sx={{ height: 600, width: "100%" }}>
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
