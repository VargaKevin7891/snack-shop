import { Box, Typography } from "@mui/material"

export default function AdminHeader({ title, subtitle, children}){
    return (
      <Box className="admin-header">
        <Box>
          <Typography variant="h4">{title}</Typography>
          <Typography variant="subtitle1">{subtitle}</Typography>
        </Box>
        {children}
      </Box>
    )
};