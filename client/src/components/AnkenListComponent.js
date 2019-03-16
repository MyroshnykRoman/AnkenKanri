import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class CheckboxListSecondary extends React.Component {
  state = {
    checked: [1],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes, ankens, deleteAnken } = this.props;

    return (
      <List dense className={classes.root}>
        {ankens.map(anken => (
          <ListItem key={anken.ankenId} button>
            <ListItemText primary={anken.ankenName} secondary={`${anken.postalCode} ${anken.prefecture}`} />
            <ListItemSecondaryAction>
            <Button onClick={() => {deleteAnken(anken.ankenId)}} color="primary" className={classes.button}>
                削除
            </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    );
  }
}


export default withStyles(styles)(CheckboxListSecondary);