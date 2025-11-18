import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router";

const rows = [
  {
    id: 1,
    dateAdded: "Snow",
    title: "Jon",
    priority: 35,
    image: "/finsweet.jpeg",
  },
  {
    id: 2,
    dateAdded: "Lannister",
    title: "Cersei",
    priority: 42,
    image: "/ps5.png",
  },
  {
    id: 3,
    dateAdded: "Lannister",
    title: "Jaime",
    priority: 45,
    image: "/xboxs.png",
  },
  {
    id: 4,
    dateAdded: "Stark",
    title: "Arya",
    priority: 16,
    image: "/finsweet.jpeg",
  },
  {
    id: 5,
    dateAdded: "Targaryen",
    title: "Daenerys",
    priority: 1,
    image: "/ps5.png",
  },
  {
    id: 6,
    dateAdded: "Melisandre",
    title: null,
    priority: 150,
    image: "/xboxs.png",
  },
  { id: 7, dateAdded: "Clifford", title: "Ferrara", priority: 44 },
  { id: 8, dateAdded: "Frances", title: "Rossini", priority: 36 },
  { id: 9, dateAdded: "Roxie", title: "Harvey", priority: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function BannerList() {
  const navigate = useNavigate();
  const handleEdit = (row) => {
    console.log("Edit clicked for:", row);
    navigate(`/edit-banner/${row.id}`, { state: row });
  };

  const handleDelete = (row) => {
    console.log("Delete clicked for:", row);
  };

  const columns = [
    { field: "id", headerName: "Serial", width: 170 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "dateAdded", headerName: "Date Added", width: 150 },
    {
      field: "priority",
      headerName: "Priority",
      type: "number",
      width: 120,
    },
    {
      field: "image",
      headerName: "Image",
      width: 220,
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
            justifyContent: "center", // centers text content only
            textAlign: "center",
          },
          "& .MuiDataGrid-columnHeader": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // centers text content only
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
