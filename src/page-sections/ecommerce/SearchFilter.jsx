import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Card, Slider, styled } from "@mui/material";
import FlexBox from "components/flexbox/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import { useState } from "react"; // styled components

const Dot = styled(Box)(({
  theme,
  active
}) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  marginRight: 8,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.text.secondary
}));
const CountWrapper = styled(Box)(({
  theme
}) => ({
  width: 33,
  height: 18,
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  justifyContent: "center",
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.action.selected
}));

const SearchFilter = () => {
  const [activeCategory, setActiveCategory] = useState("Shoes");
  const [activeSortBy, setActiveSortBy] = useState("Newest");
  const [value, setValue] = useState([100, 1000]);

  const handleChange = (e, value) => {
    setValue(value);
  };

  return <Card sx={{
    padding: 2
  }}>
      <Box>
        <H6>Categories</H6>
        {categories.map(item => <FlexBox key={item.id} alignItems="center" justifyContent="space-between" marginTop={2} onClick={() => setActiveCategory(item.name)} sx={{
        cursor: "pointer",
        color: activeCategory === item.name ? "primary.main" : "text.secondary"
      }}>
            <FlexBox alignItems="center">
              <Dot active={activeCategory === item.name} />
              <Small>{item.name}</Small>
            </FlexBox>
            <CountWrapper>
              <Small>{item.count}</Small>
            </CountWrapper>
          </FlexBox>)}
      </Box>

      <Box marginTop={4}>
        <H6>Sort By</H6>
        {sortBy.map(item => <FlexBox key={item} alignItems="center" marginTop={2} onClick={() => setActiveSortBy(item)} sx={{
        cursor: "pointer",
        color: activeSortBy === item ? "primary.main" : "text.secondary"
      }}>
            <Dot active={activeSortBy === item} />
            <Small>{item}</Small>
          </FlexBox>)}
      </Box>

      <Box marginTop={4}>
        <H6 mb={1}>Price Range</H6>
        <Slider disableSwap color="primary" value={value} valueLabelFormat={value => `$${value}`} onChange={handleChange} valueLabelDisplay="auto" min={100} max={1000} sx={{
        margin: "0 12px",
        width: "calc(100% - 24px)"
      }} />
        <FlexBox alignItems="center" justifyContent="space-between">
          <Tiny fontWeight={500} color="text.secondary">
            Min
          </Tiny>
          <Tiny fontWeight={500} color="text.secondary">
            Max
          </Tiny>
        </FlexBox>
      </Box>

      <Button variant="contained" fullWidth sx={{
      marginTop: 4
    }}>
        View Cart
        <ShoppingCart sx={{
        fontSize: 17,
        marginLeft: 1
      }} />
      </Button>
    </Card>;
};

const categories = [{
  id: 1,
  name: "Shoes",
  count: 8
}, {
  id: 2,
  name: "Furniture",
  count: 12
}, {
  id: 3,
  name: "Clothes",
  count: 70
}, {
  id: 4,
  name: "Accessories",
  count: 45
}, {
  id: 5,
  name: "Others",
  count: 12
}];
const sortBy = ["Newest", "Popular", "Default", "Price: high to low", "Price: low to high"];
export default SearchFilter;