import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchLockins, Lockin } from "../store/lockin-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const LockinStats: React.FC = () => {
  const { lockins, isLoading, error } = useSelector((state: RootState) => state.lockins);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
     dispatch(fetchLockins())
  }, [])
  
  const gotCompeletedToday = () => {
    const today = new Date().toISOString().split('T')[0]
    return lockins.filter(lockin => lockin.completedDates.includes(today)).length
  }

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

   const getLongestStreak = () => {
      return Math.max(...lockins.map(getStreak),0)
   }

  if(isLoading){
    return <LinearProgress />
  }

  if(error){
    return <Typography color="error">{error}</Typography>
  }

  return <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
    <Typography variant="h6">
       Lockin Statistics
    </Typography>
    <Typography variant="body1">
       Total Lockin: {lockins.length}
    </Typography>
    <Typography variant="body1">
       Completed Today: {gotCompeletedToday()} 
    </Typography>
    <Typography variant="body1">
       Longest Streak: {getLongestStreak()}
    </Typography>
  </Paper>;
};

export default LockinStats;
