import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    lightBrand: {
        width: '240px',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2em',
        fontWeight: 'bold',
        color: '#2196f3',
        alignItems: 'center'
    },
    darkBrand: {
        width: '240px',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '2em',
        fontWeight: 'bold',
        color: 'red',
        alignItems: 'center'
    },
    fBrand: {
        fontSize: '1.5em'
    },
    mBrand: {
        fontSize: '1.25em'
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))