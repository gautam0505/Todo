// import { Box, Divider, FormGroup, FormLabel, Link, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import baner from "../../../assets/baner.webp";
// import { Inventory2Rounded } from "@mui/icons-material";
// import { systemInfo } from "../../../utils";

// export default function AboutTab() {
//   const [storageUsage, setStorageUsage] = useState<number | undefined>(undefined);

//   useEffect(() => {
//     const getStorageUsage = async () => {
//       const storageUsage = await navigator.storage.estimate();
//       setStorageUsage(storageUsage.usage);
//     };
//     getStorageUsage();
//   }, []);

//   return (
//     <>
      
//       <img src={baner} style={{ width: "100%", height: "auto" }} alt="Todo App Screenshot" />
     
//       {storageUsage !== undefined && storageUsage !== 0 && (
//         <>
//           <Divider sx={{ my: 1 }} />
//           <FormGroup>
//             <FormLabel sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
//               <Inventory2Rounded sx={{ fontSize: "18px" }} />
//               Storage Usage
//             </FormLabel>
//             <Box sx={{ mt: "2px" }}>
//               {storageUsage ? `${(storageUsage / 1024 / 1024).toFixed(2)} MB` : "0 MB"}
//               {systemInfo.os === "iOS" && " / 50 MB"}
//             </Box>
//           </FormGroup>
//         </>
//       )}
//     </>
//   );
// }
