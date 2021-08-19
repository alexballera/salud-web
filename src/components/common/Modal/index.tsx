import { createStyles, makeStyles, Theme, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Modal, { ModalProps as ModalPropsMD } from '@material-ui/core/Modal';
import { useState, useEffect } from 'react';

enum ModalProperties {
  width = 572,
  height = 689,
  minWidth = 430,
  minHeight = 150,
  leftSpace = 25,
  rightSpace = 25,
  topSpace = 56,
  bottomSpace = 25
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      [theme.breakpoints.up('sm')]: {
        display: 'flex'
      }
    },
    root: {
      backgroundColor: theme.palette.background.default,
      display: 'flow-root',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100%'
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: `${ModalProperties.width}px`,
        maxHeight: `${ModalProperties.height}px`,
        minWidth: `${ModalProperties.minWidth}px`,
        minHeight: `${ModalProperties.minHeight}px`,
        margin: 'auto'
      }
    },
    header: {
      float: 'right'
    },
    content: {
      marginTop: `${ModalProperties.topSpace}px`,
      paddingLeft: `${ModalProperties.leftSpace}px`,
      paddingRight: `${ModalProperties.rightSpace}px`,
      marginBottom: `${ModalProperties.bottomSpace}px`,
      overflowY: 'auto',
      [theme.breakpoints.down('sm')]: {
        maxHeight: `calc(100% - ${ModalProperties.topSpace}px - ${ModalProperties.bottomSpace}px)`
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: `calc(${ModalProperties.height}px - ${ModalProperties.topSpace}px - ${ModalProperties.bottomSpace}px)`
      }
    }
  })
);

type ModalProps = ModalPropsMD;

export default function ModalCustom(props: ModalProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(props.open || false);

  useEffect(() => {
    if (typeof props.open === 'boolean' && props.open !== open) {
      setOpen(props.open);
    }
  }, [props.open]);

  const handleBackdropClick = () => {
    setOpen(false);
    props.onClose(null, 'backdropClick');
  };

  const handleEscapeKeyDown = () => {
    setOpen(false);
    props.onClose(null, 'escapeKeyDown');
  };

  return (
    <Modal
      {...props}
      keepMounted
      open={open}
      onBackdropClick={handleBackdropClick}
      onEscapeKeyDown={handleEscapeKeyDown}
      className={classes.modal}
      data-testid="modal"
    >
      <div className={classes.root} data-testid="modal-white-box">
        <div className={classes.header}>
          <IconButton
            onClick={handleBackdropClick}
            color="inherit"
            aria-label="close"
            component="span"
            data-testid="modal-close-button"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.content}>{props.children}</div>
      </div>
    </Modal>
  );
}
