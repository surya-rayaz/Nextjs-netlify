import { IconButton } from "@mui/material";
import AppAvatar from "components/avatars/AppAvatar";
import FlexBox from "components/flexbox/FlexBox";
import { H6 } from "components/Typography";
import Delete from "icons/Delete";
import Edit from "icons/Edit";
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
    // Cell: ({
    //   row: {
    //     original
    //   }
    // }) => {
    //   return <FlexBox alignItems="center" gap={1}>
    //         <AppAvatar src={original.image} sx={{
    //       borderRadius: "10%",
    //       width: 50,
    //       height: 50
    //     }} />
    //         <H6>{original.name1}</H6>
    //       </FlexBox>;
    // }
  },
  //  {
  //   Header: "Producer",
  //   accessor: "producer"
  // },
  {
    Header: "Created",
    accessor: "date"
  },
  //  {
  //   Header: "Category",
  //   accessor: "category"
  // }, {
  //   Header: "Cost",
  //   accessor: "cost",
  //   Cell: ({
  //     value
  //   }) => <H6 fontSize={12}>${value}</H6>
  // }, {
  //   Header: "Extra",
  //   accessor: "extra",
  //   Cell: ({
  //     value
  //   }) => <H6 fontSize={12}>{value}%</H6>
  // }, {
  //   Header: "Price",
  //   accessor: "price",
  //   Cell: ({
  //     value
  //   }) => <H6 fontSize={12}>${value}</H6>
  // }, {
  //   Header: "Priority",
  //   accessor: "priority"
  // }, 


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
        console.log("Edit clicked for row:", row);
      };
  
      const handleDeleteClick = () => {
        // Retrieve the ID from the row object
        const id = row.original.s_no        
  
        // Functionality for delete action
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



export default ColumnShape;