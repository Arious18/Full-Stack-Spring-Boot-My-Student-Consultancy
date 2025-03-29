import { Box } from "@mui/material";
import { Header, StreamChart } from "../../components/index.jsx";

const Stream = () => {
  return (
    <Box m="20px">
      <Header title="Stream Chart" subtitle="Simple Stream Chart" />
      <Box height="75vh">
        <StreamChart />
      </Box>
    </Box>
  );
};

export default Stream;
