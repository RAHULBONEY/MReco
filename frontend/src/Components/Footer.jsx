import { Box, Typography, Link, Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2c2c2c",
        color: "#ffffff",
        borderTop: "1px solid #444444",
        width: "100%",
        padding: "20px 0",
        position: "fixed",
        bottom: 0,
        left: 0,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="body2" color="inherit" align="center">
            {"© "}
            {new Date().getFullYear()}
            <span style={{ marginLeft: "8px" }}>MRec</span>{" "}
          </Typography>
          <Box>
            <Link
              href="/about"
              color="inherit"
              sx={{
                mx: 1,
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
                fontWeight: "medium",
              }}
            >
              About Us
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
