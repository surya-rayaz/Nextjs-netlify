import { Add, WarehouseRounded, Warning, WarningAmber, WarningAmberRounded, CheckCircle } from "@mui/icons-material";
import { TabContext, TabList } from "@mui/lab";
import { Button, Card, Grid, Tab, useMediaQuery } from "@mui/material";
import { Box, } from "@mui/system";
import FlexBox from "components/flexbox/FlexBox";
import getLayout from "components/getLayout";
import SearchInput from "components/input-fields/SearchInput";
import MoreOptions from "components/MoreOptions";
import { H2 } from "components/Typography";
import AddCounter from "page-sections/counter/AddCounter";
import CreateProject from "page-sections/uko-projects/CreateProject";
import ProjectCard from "page-sections/uko-projects/ProjectCard";
import TabLabel from "page-sections/uko-projects/TabLabel";
import axios from 'axios';
import AppTextField from "components/input-fields/AppTextField";
import { H6 } from "components/Typography";
import { Checkbox, styled, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FlexRowAlign from "components/flexbox/FlexRowAlign";
import Scrollbar from "components/ScrollBar";
import BlankCheckBoxIcon from "icons/BlankCheckBoxIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from "react-table";
import LIST_COUNTERS from "__fakeData__/admin/list_counters";
import { lightTheme } from "../../constants";
import AppModal from "components/AppModal";
import Delete from "icons/Delete";
import { IconButton } from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import Edit from "icons/Edit";

const StyledAppModal = styled(AppModal)(({
  theme
}) => ({
  width: 400,
  [theme.breakpoints.down(400)]: {
    width: 300
  }
}));



const BodyTableCell = styled(TableCell)(() => ({
  fontSize: 12,
  fontWeight: 600,
  borderBottom: 0,
  transition: "color 0.3s",
  "&:first-of-type": {
    paddingLeft: 24
  },
  "&:last-of-type": {
    textAlign: "center"
  },
  "&:nth-child(9)": {
    maxWidth: 50,
    textAlign: "center"
  }
}));
const HeadTableCell = styled(BodyTableCell)(({
  theme,
  get_id
}) => ({
  color: theme.palette.text.disabled
}));

const BodyTableRow = styled(TableRow)(({
  theme,
  select_row
}) => ({
  transition: "background-color 0.3s",
  backgroundColor: select_row ? theme.palette.primary[400] : theme.palette.background.paper,
  "& td:first-of-type": {
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px"
  },
  "& td:last-of-type": {
    textAlign: "center",
    borderTopRightRadius: "4px",
    borderBottomRightRadius: "4px"
  },
  "& td": {
    color: select_row ? "white" : "inherit"
  }
})); // custom select checkbox include





const Counterlist = () => {
  const [value, setValue] = useState("0");
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [checktype, setchecktype] = useState({

    "type": "",
    "value": ""
  });

  const [projectMoreEl, setProjectMoreEl] = useState(null);
  const downSM = useMediaQuery(theme => theme.breakpoints.down("sm"));


  const [DATA, setDATA] = useState([]);



  console.log("mainnn", DATA.length)

  useEffect(() => {

    getcounters()

  }, [])


  const [deletepopup, setdeletepopup] = useState(false);

  const getcounters = async (value) => {



    console.log("value", value)
    const array = [
      {
        s_no: 1,
        name: "Counter 1",
        date: "03 Jul 2023"
      }, {
        s_no: 2,
        name: "Counter 2",
        date: "04 Jul 2023"

      }, {
        s_no: 3,
        name: "Counter 3",
        date: "05 Jul 2023"

      }, {
        s_no: 4,
        name: "Counter 4",
        date: "06 Jul 2023"

      },

    ]

    setDATA(array)



  }

  const ColumnShape = [
    {
      Header: "S No.",
      accessor: "s_no",
      Cell: ({
        value
      }) => <H6 fontSize={12}>{value}</H6>
    },

    {
      Header: "Name",
      accessor: "name",
      Cell: ({
        value
      }) => <H6 fontSize={12}>{value}</H6>

    },

    {
      Header: "Created",
      accessor: "date"
    },

    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => {
        const style = {
          fontSize: 19,
          transition: "color 0.3s",
          color: row.isSelected ? "white" : "text.disabled"
        };

        const handleEditClick = () => {
          // Functionality for edit action
          const id = row.original

          console.log("Edit clicked for row:", id);
          var data = { ...checktype }
          data.type = "Update"
          data.value = row.original.name
          setchecktype(data)
          setcoutername(row.original.name)
          setEditModal(true)


        };

        const handleDeleteClick = () => {
          // Retrieve the ID from the row object

          setdeletepopup(true)

          const id = row.original.s_no
          console.log("Delete clicked for row ID:", id);

        };

        return (
          <FlexBox justifyContent="center">
            <IconButton onClick={handleEditClick}>
              <Edit sx={style} />
            </IconButton>
            <IconButton onClick={handleDeleteClick}>
              <Delete sx={style} />
            </IconButton>
          </FlexBox>
        );
      }
    }





  ];

  const tableData = useMemo(() => DATA);
  const columns = useMemo(() => ColumnShape, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    // pageOptions,
    // gotoPage,
    setGlobalFilter,
    state,
    selectedFlatRows
  } = useTable({
    columns,
    data: tableData
  }, useGlobalFilter, useSortBy, usePagination, useRowSelect, hooks => {
    hooks.visibleColumns
    // .push(columns => [{
    // id: "selection",
    // Header: ({
    //   getToggleAllRowsSelectedProps
    // }) => <SelectCheckBox {...getToggleAllRowsSelectedProps()} />,
    // Cell: ({
    //   row
    // }) => <SelectCheckBox {...row.getToggleRowSelectedProps()} />
    // }, ...columns]);
  }); // search input

  const [searchValue, setSearchValue] = useState(state.globalFilter);

  const handleSearch = value => setGlobalFilter(value || undefined); // find selected row
  const [coutername, setcoutername] = useState(checktype.value);

  const [Response, setResponse] = useState("");
  const [ResponseModal, setResponseModal] = useState(false);

  const selectRow = id => selectedFlatRows.find(item => item.id === id);

  const getarray = (newValue) => {


    console.log("newValue", newValue)

    if (newValue == true) {


      getcounters()
    }
    setResponseModal(true)
    setResponse("Counter Added Sucessfully")

  };

  const UpdateCounter = () => {
    setResponseModal(true)
    setResponse("Counter Updated Sucessfully")
    setEditModal(false)

  };

  const DeleteCounter = () => {
    setResponseModal(true)
    setResponse("Counter Deleted Sucessfully")
    setdeletepopup(false)

  };

  const handleProjectMoreClose = () => setProjectMoreEl(null);


  const projectList = ["in-progress", "upcoming", "blocked", "projects-total", "in-progress", "upcoming", "blocked", "projects-total", "upcoming"];
  const filterList = projectList.filter(item => value === "0" || item === "upcoming" && value === "1" || item === "blocked" && value === "2" || item === "projects-total" && value === "2");
  return <Box pt={2} pb={4}>
    <TabContext value={value}>
      <Grid container spacing={3}>


        <Grid item xs={12}>
          <FlexBox justifyContent="space-between" flexWrap="wrap">
            <SearchInput bordered={false} placeholder="Find Counter" sx={{
              maxWidth: downSM ? "100%" : 270,
              marginBottom: downSM ? 1 : 0
            }} />
            <Button fullWidth={downSM} variant="contained" startIcon={<Add />} onClick={() => {

              setOpenModal(true)
            }} sx={{
              fontSize: 12
            }}>
              Add Counter
            </Button>
            <AddCounter response={(value) => getarray(value)} open={openModal} checktype={checktype} setOpen={setOpenModal} />
          </FlexBox>
        </Grid>
      </Grid>
      <Scrollbar autoHide={false}>
        <Table {...getTableProps()} sx={{
          minWidth: 900,
          borderSpacing: "0 10px",
          borderCollapse: "separate"
        }}>
          <TableHead>
            {headerGroups.map((headerGroup, index) => <TableRow key={index} {...headerGroup.getHeaderGroupProps()} sx={{
              backgroundColor: theme => lightTheme(theme) ? "primary.100" : "divider"
            }}>
              {headerGroup.headers.map((column, index) => <HeadTableCell key={index}  {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
              </HeadTableCell>)}
            </TableRow>)}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              const selected = selectRow(row.id);

              return (
                <BodyTableRow
                  key={index}
                  {...row.getRowProps()}
                  select_row={selected}
                // onClick={rowClick && rowClick(row.original)}
                >
                  {row.cells.map((cell, index) => (
                    <BodyTableCell get_id={() => console.log("val")} key={index}>
                      {cell.render("Cell")}


                    </BodyTableCell>
                  ))}

                </BodyTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>

    </TabContext>
    <StyledAppModal open={editModal} handleClose={() => setEditModal(false)}>
      <Box mb={2}>
        <H6 mb={1}>Update Counter</H6>
        <AppTextField value={coutername} onChange={(e) => setcoutername(e.target.value)} fullWidth size="small" placeholder="Counter name" />

        <FlexBox style={{ marginTop: 20 }} alignItems="center" gap={1}>
          <Checkbox disableRipple checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />} icon={<BlankCheckBoxIcon fontSize="small" color="primary" />} />
          <H6 fontSize={17} >Show on display screen</H6>
        </FlexBox>
      </Box>


      <FlexBox mt={4} gap={2}>
        <Button variant="contained" fullWidth onClick={() => UpdateCounter()}>
          Update
        </Button>

        <Button variant="outlined" fullWidth onClick={() => setEditModal(false)}>
          Cancel
        </Button>
      </FlexBox>
    </StyledAppModal>;

    <StyledAppModal open={deletepopup} handleClose={() => setdeletepopup(false)}>
      <Box mb={2}>
        <H6 fontSize={17} mb={5}>Oops ! , 'Do you want to delete ?</H6>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Warning style={{ fontSize: "5em" }} color="warning" fontSize="large"></Warning>
        </div>

      </Box>

      <FlexBox mt={4} gap={2}>
        <Button style={{ backgroundColor: "red" }} variant="contained" fullWidth onClick={() => DeleteCounter()}>
          Yes
        </Button>

        <Button variant="outlined" fullWidth onClick={() => setdeletepopup(false)}>
          No
        </Button>
      </FlexBox>
    </StyledAppModal>;

    <StyledAppModal open={ResponseModal} handleClose={() => setResponseModal(false)}>
      <Box mb={2}>

        <div style={{  textAlign: "center" }}>
          <CheckCircle style={{ fontSize: "5em" }} color="success" fontSize="large"></CheckCircle>

          <H6 fontSize={17} mb={5}>{Response}</H6>
        </div>

      </Box>

      <FlexBox mt={4} gap={2}>
        <Button style={{ backgroundColor: "red" }} variant="contained" fullWidth onClick={() => setResponseModal(false)}>
          Yes
        </Button>
      </FlexBox>
    </StyledAppModal>;

  </Box>;
};

// ==============================================================

Counterlist.getLayout = getLayout; // ==============================================================

export default Counterlist;

