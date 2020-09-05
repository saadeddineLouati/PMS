import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../../api';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: 'linear-gradient(45deg, #8A2387, #E94057,#F27121)'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const { post } = props
    const classes = useStyles();
    const [author, setAuthor] = useState(false)
    const [isLoading, setIsloading] = useState(true)

    const [openReading, setOpenReading] = useState(false)

    const handleOpenReading = () => {
        setOpenReading(!openReading);
    }
    useEffect(() => {
        api
            .getUser(post.author)
            .then(a => {
                setAuthor(a)
                console.log(a)
                setIsloading(false)
            })
            .catch(err => console.log(err))
    }, [])
    if (isLoading) return "Loading ..."
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {post.created_at}
                </Typography>
                <Typography variant="h5" component="h2">
                    {author.username}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {author.email}
                </Typography>
                <Typography variant="body2" component="p">
                    {post.text.substring(1, 15) + '...'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleOpenReading}>Continue reading</Button>
            </CardActions>
            <Dialog
                open={openReading}
                onClose={handleOpenReading}
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle id="Post details">Details</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {post.text}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleOpenReading} color="primary">
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
