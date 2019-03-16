import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
};

function CustomizedInputBase(props) {
  const { classes, ankenName, postalCode, onAddAnken, onAnkenNameInputChange, onPostalCodeInputChange } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} value={ankenName} onChange={onAnkenNameInputChange} placeholder="案件名" />
      <Divider className={classes.divider} />
      <InputBase className={classes.input} value={postalCode} onChange={onPostalCodeInputChange} placeholder="郵便番号" />
    
        <Tooltip placement="bottom" title="案件を追加する">
        <IconButton onClick={onAddAnken} className={classes.iconButton} aria-label="案件追加">
            <AddIcon />
        </IconButton>
        </Tooltip>
      
    </Paper>
  );
}

export default withStyles(styles)(CustomizedInputBase);