import { Box, Typography } from '@mui/material';

const data = [
  { label: 'Total Revenue', value: '12,345 Ft', change: '+20.1%' },
  { label: 'Orders', value: '123', change: '+15.2%' },
  { label: 'Products', value: '456', change: '+2.5%' },
  { label: 'Customers', value: '789', change: '-5.3%' },
];

export default function AdminDashboardCard() {
  return (
    <>
      {data.map((box, idx) => (
        <Box key={idx} className="box-card">
            <Typography variant="subtitle2" className="box-title">{box.label}</Typography>
            <Typography variant="h5" className="box-value">{box.value}</Typography>
            <Typography
              className={`change-text ${box.change.startsWith('+') ? 'positive' : 'negative'}`}
            >
              {box.change} from last month
            </Typography>
        </Box>  
      ))}
    </>
  );
}
