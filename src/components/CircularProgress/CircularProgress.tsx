import * as React from 'react';
import CircularProgress, {
   CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(
   props: CircularProgressProps & { value: number },
) {
   return (
      <Box sx={{
         position: 'relative',
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'}}>
         <div className="circular-progress-percentage">{Math.round(props.value)}%</div>
         <CircularProgress variant="determinate" {...props} />
      </Box>
   );
}

const percentage = (value: number| undefined, totalValue: number | undefined) => {

   if (value && totalValue) {
      return (value / totalValue) * 100
   }
}

export default function CircularStatic({noTickets, noTotalTickets}: {noTickets: number | undefined, noTotalTickets: number | undefined}) {
   const [progress, setProgress] = React.useState(2);

   React.useEffect(() => {
         setProgress(percentage(noTickets, noTotalTickets))
      }, );

   return <CircularProgressWithLabel value={progress} />;
}