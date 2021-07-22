const characterColumns = [
  {
    title: "Photo",
    dataIndex: "image",
    customRender: "image",
  },
  {
    title: "Character ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    customRender: "gender",
  },
  {
    title: "Species",
    dataIndex: "species",
  },
  {
    title: "Last Episode",
    dataIndex: "episode",
    customRender: "episode",
  },
  {
    title: "Add to Favorites",
    dataIndex: "",
    customRender: "action",
  },
];

export { characterColumns };
