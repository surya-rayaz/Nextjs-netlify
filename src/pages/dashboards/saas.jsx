import { Box, Grid, useTheme } from "@mui/material";
import getLayout from "components/getLayout";
import BucketIcon from "icons/BucketIcon";
import EarningIcon from "icons/EarningIcon";
import PeopleIcon from "icons/PeopleIcon";
import WindowsLogoIcon from "icons/WindowsLogoIcon";
import Analytics from "page-sections/dashboards/SaaS/Analytics";
import SaaSCard from "page-sections/dashboards/SaaS/Card";
import Footer from "page-sections/dashboards/SaaS/Footer";
import RecentOrders from "page-sections/dashboards/SaaS/RecentOrders";
import TopSelling from "page-sections/dashboards/SaaS/TopSelling";
import TotalSpent from "page-sections/dashboards/SaaS/TotalSpent";

const SaaS = () => {
  const theme = useTheme();
  const cardList = [{
    price: 574,
    Icon: BucketIcon,
    title: "All Spending",
    color: theme.palette.primary.main
  }, {
    price: 521,
    title: "Earnings",
    Icon: EarningIcon,
    color: theme.palette.primary.purple
  }, {
    price: 684,
    Icon: WindowsLogoIcon,
    title: "Weekly revenue",
    color: theme.palette.primary.red
  }, {
    price: 321,
    Icon: PeopleIcon,
    title: "New Clients",
    color: theme.palette.primary.yellow
  }];
  return <Box pt={2} pb={4}>
      <Grid container spacing={{
      xs: 2,
      sm: 3,
      md: 4
    }}>
        {cardList.map((card, index) => <Grid item lg={3} xs={6} key={index}>
            <SaaSCard card={card} />
          </Grid>)}
      </Grid>

      <Grid container spacing={4} pt={4}>
        <Grid item lg={8} md={7} xs={12}>
          <TotalSpent />
        </Grid>

        <Grid item lg={4} md={5} xs={12}>
          <Analytics />
        </Grid>

        <Grid item lg={8} md={7} xs={12}>
          <RecentOrders />
        </Grid>

        <Grid item lg={4} md={5} xs={12}>
          <TopSelling />
        </Grid>

        <Grid item xs={12}>
          <Footer imageLink="/static/illustration/sass-dashboard.svg" />
        </Grid>
      </Grid>
    </Box>;
}; // ==============================================================


SaaS.getLayout = getLayout; // ==============================================================

export default SaaS;