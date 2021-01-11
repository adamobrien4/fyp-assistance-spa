import { Typography } from "@material-ui/core";

export default function ErrorComponent({error}) {
    console.log(error);
    return <Typography variant="h6">An Error Occurred: {error.errorCode}</Typography>;
}