import { Add } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Avatar, Box, Button, Checkbox, Stack, styled } from "@mui/material";
import AppModal from "components/AppModal";
import FlexBox from "components/flexbox/FlexBox";
import AppTextField from "components/input-fields/AppTextField";
import ImageUploadInput from "components/input-fields/ImageUploadInput";
import { H6 } from "components/Typography";
import { useState } from "react"; // custom styled components
import BlankCheckBoxIcon from "icons/BlankCheckBoxIcon";
import CheckBoxIcon from "icons/CheckBoxIcon";
import axios from 'axios';

const StyledAppModal = styled(AppModal)(({
  theme
}) => ({
  width: 400,
  [theme.breakpoints.down(400)]: {
    width: 300
  }
})); // -------------------------------------------------------------------

// -------------------------------------------------------------------
const AddCategory = ({ open, setOpen, response,checktype }) => {



  const [date, setDate] = useState(new Date());
  const [coutername, setcoutername] = useState("");
  

  const CategoryAdd = async () => {

    setOpen(false)
    response(true)

  }

  const funtioncall = (e) => {


    console.log("e", e.target.value)
  }

  return <StyledAppModal open={open} handleClose={() => setOpen(false)}>
    <Box mb={2}>
      <H6 mb={1}>Add Category</H6>
      <AppTextField onChange={(e) => setcoutername(e.target.value)} fullWidth size="small" placeholder="Category name" />

      <FlexBox style={{ marginTop: 20 }} alignItems="center" gap={1}>
        <Checkbox disableRipple checkedIcon={<CheckBoxIcon fontSize="small" color="primary" />} icon={<BlankCheckBoxIcon fontSize="small" color="primary" />} />
        <H6 fontSize={17} >Show on display screen</H6>
      </FlexBox>
    </Box>


    <FlexBox mt={4} gap={2}>
      <Button variant="contained" fullWidth onClick={() => CategoryAdd()}>
        Add
      </Button>

      <Button variant="outlined" fullWidth onClick={() => setOpen(false)}>
        Cancel
      </Button>
    </FlexBox>
  </StyledAppModal>;
};

export default AddCategory;





