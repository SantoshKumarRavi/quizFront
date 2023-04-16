import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
  Container,
  CardHeader,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const ScoreCard = ({
  TotalScore = null,
  title = "Score Card",
  icon = null,
}) => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="md"
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: TotalScore ? "100vh" : "76vh",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        container
        alignItems="flex-end"
      >
        <Grid item xs={12} sm={12} md={4}>
          <Card>
            <CardHeader
              title={title}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{
                align: "center",
              }}
              sx={{
                backgroundColor: (theme) => theme.palette.grey[200],
              }}
            />
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "primary.main",
                  }}
                >
                  {TotalScore !== null && (
                    <Typography component="h2" variant="h3" color="white">
                      {TotalScore}
                    </Typography>
                  )}
                  {icon && icon}
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              {TotalScore !== null && (
                <Button
                  fullWidth
                  variant={"contained"}
                  onClick={() => navigate("/quiz")}
                >
                  <ArrowBackIosIcon /> Go Back to Quiz
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ScoreCard;
