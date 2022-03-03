import { makeStyles } from '@material-ui/core/styles';

const allergieStyles = makeStyles({
    cardAllergie: {
        borderRadius: 16,
        boxShadow: '0px 4px 8px rgba(207, 225, 227, 0.5)',
    },
    contentButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        margin: '8px 0px'
    },
    buttonText: {
        width: '60%',
        fontSize: '16px'
    },
    colorTitle: {
        color: '#A1ADB0',
        marginBottom: '4px'
    },
    spacingRow: {
        padding: '16px 0px'
    },
    chipStatus: {
        fontSize: '12px',
        height: '20px'
    },
    chipActive: {
        backgroundColor: '#BB9AFD1A',
        color: '#AB82FF'
    },
    chipInative: {
        backgroundColor: '#E4EBED',
        color: '#829296'
    },
    typography14: {
        fontSize: '14px'
    },
    typography16: {
        fontSize: '16px'
    },
});

export default allergieStyles;