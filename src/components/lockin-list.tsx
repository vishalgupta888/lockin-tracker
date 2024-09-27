import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircle from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Lockin, removeLockin, toggleLockin } from "../store/lockin-slice";

const LockinList: React.FC = () => {
  const { lockins } = useSelector((state: RootState) => state.lockins);

  const today = new Date().toISOString().split("T")[0];

  const dispatch = useDispatch<AppDispatch>();

  const getStreak = (lockin: Lockin) => {
    let streak = 0;
    const currentDate = new Date();
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (lockin.completedDates.includes(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
    >
      {lockins.map((lockin) => {
        return (
          <Paper key={lockin.id} elevation={2} sx={{ p: 2 }}>
            <Grid Container alignItems="center">
              <Grid xs={12} sm={6}>
                <Typography variant="h6">{lockin.name}</Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {lockin.frequency}
                </Typography>
              </Grid>
              <Grid xs={12} sm={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color={
                      lockin.completedDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircle />}
                    onClick={() =>
                      dispatch(
                        toggleLockin({
                          id: lockin.id,
                          date: today,
                        })
                      )
                    }
                  >
                    {lockin.completedDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(removeLockin(lockin.id))}
                  >
                    {" "}
                    Remove{" "}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Current Streak: {getStreak(lockin)} days
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(getStreak(lockin) / 30) * 100}
              sx={{ mt: 1 }}
            />
          </Paper>
        );
      })}
    </Box>
  );
};

export default LockinList;
