import React from "react";
import { Typography, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { TextDecrypt } from "./TextDecrypt";
import Resume from "../../settings/resume.json";
import { FirstName, LastName } from "../../utils/getName";

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: "auto",
        marginBottom: "auto",
        "@media (max-width: 768px)": {
            marginLeft: theme.spacing(4),
        },
    },
}));


var date = new Date();
    var hour = date.getHours();
    var time = `${
        (hour < 4 && "night") ||
        (hour < 12 && "morning") ||
        (hour < 18 && "afternoon") ||
        (hour < 22 && "evening") ||
        "night"
    }`;
    var days = [
        "weekend",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "weekend",
    ];
    var day = days[date.getDay()];

export const Content = () => {
    const classes = useStyles();

    return (
        <Container component="main" className={`${classes.main}`} maxWidth="sm">
            <Typography variant="h2" component="h1" gutterBottom>
                <TextDecrypt text={`${Resume.basics.x_title} ${FirstName} ${LastName}`} />
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                <TextDecrypt text={`a ${Resume.basics.job}`} />
                <TextDecrypt text={`from the ${Resume.basics.location.country}.`} />
            </Typography>
            <Typography variant="h6" component="h3" gutterBottom>
                Have a good {day === "weekend" ? day : time}.
            </Typography>
        </Container>
    );
};