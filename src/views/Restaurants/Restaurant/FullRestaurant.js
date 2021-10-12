import { RestaurantsStateContext } from '../../../context/Context';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, CssBaseline, Alert, Rating } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

import { } from 'react-router-dom';
import { RestaurantService } from 'services/RestaurantService';
import ChipInput from 'material-ui-chip-input';
import DeleteConfirmation from 'components/Modals/DeleteModals/DeleteConfirmation';



const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            width: 600,
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    chipInputRoot: {
        border: '1px solid red',
        borderRadius: 2
    },
    chip: {
        background: 'linear-gradient(#dd00f3)',
        backgroundSize: '50% 50%',
        // animation: 'rainbow 18s ease infinite'
    },
}));

function FullRestaurant(props) {
    const classes = useStyles();
    //const history = useHistory();

    const [restaurants, setRestaurants] = useContext(RestaurantsStateContext);
    const [restaurant, setRestaurant] = useState(null);
    const [owner, setOwner] = useState(null)
    const [active, setActive] = useState(null)
    const [showDelete, setShowDelete] = useState(false);

    const id = props.match.params.id;
    //const restaurant = restaurants.find(s => s.restaurantId === parseInt(id))
    const initialFormDataState = {
        name: '',
        cuisines: [],
        phone: '',
        priceCategory: '',
        lineOne: '',
        lineTwo: '',
        city: '',
        state: '',
        zip: ''

    };
    const [formData, setFormData] = useState(initialFormDataState);
    const [cuisine, setCuisine] = useState([]);

    const [alertContent] = useState('');
    const [alert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [errorAlertContent, seterrorAlertContent] = useState('');

    const isValid = (formData) => {

        if (formData.name === "") {
            seterrorAlertContent("restaurant name is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.lineOne === "") {
            seterrorAlertContent("address line one is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.city === "") {
            seterrorAlertContent("address city is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.state === "") {
            seterrorAlertContent("address state is empty");
            setErrorAlert(true);
            return false;
        }

        if (formData.zip === "" || isNaN(formData.zip)) {
            seterrorAlertContent("address zip is not valid");
            setErrorAlert(true);
            return false;
        }

        seterrorAlertContent("");
        setErrorAlert(false);
        return true;

    }


    useEffect(() => {
        console.log("FULL RESTAURANT")
        console.log(restaurants)

        if (restaurants.length !== 0) {
            restaurants.find(s => {
                console.log(s)
                console.log(typeof s.id)
                console.log(typeof id)
                return s.id === parseInt(id)
            })
            setRestaurant(restaurants.find(s => s.id === parseInt(id)));
            //console.log(restaurants.find(s => s.id === parseInt(id)))
        } else {
            RestaurantService.getRestaurantById(id).then(r => {
                console.log(r)
                setRestaurant(r.data)
            })
            //console.log()
            //history.push("/admin/restaurants");
        }


    }, [restaurants, id]);

    useEffect(() => {
        console.log(restaurant)

        if (restaurant !== null) {
            setFormData({
                name: restaurant.name,
                cuisines: [],
                phone: restaurant.phone,
                priceCategory: restaurant.priceCategory,
                isActive: restaurant.isActive,
                logo: restaurant.logo,
                raing: restaurant.rating,
                lineOne: restaurant.address.lineOne,
                lineTwo: restaurant.address.lineTwo,
                city: restaurant.address.city,
                state: restaurant.address.state,
                zip: restaurant.address.zip,
            });

            setActive(restaurant.isActive)
            if (owner === null) {
                RestaurantService.getOwnerByRestaurantId(restaurant.id).then(res => {
                    setOwner(res.data)
                })
            }
        }

    }, [restaurant, active, owner]);

    useEffect(() => {
        if (restaurant !== null) {
            setCuisine(restaurant.cuisines.map(r => r.type))
        }
    }, [restaurant]);


    const handleAddChip = chip => {

        setCuisine([...cuisine, chip]);
        console.log(cuisine);
    };

    const handleDeleteChip = (chip, index) => {
        setCuisine(cuisine.filter((c) => c !== chip));
    };


    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log(formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        formData.cuisines = cuisine;
        if (!isValid(formData)) {
            return;
        }

        RestaurantService.updateRestaurant(owner.id, restaurant.id, formData)
            .then(function (response) {

                // RestaurantService.getRestaurantList()
                //     .then(function (r) {
                //         const data = r.data;
                //         setRestaurants(data);

                //         setAlertContent("Restaurant Update Saved Succeed");
                //         setAlert(true);
                //         setTimeout(() => {
                //             history.push("/admin/restaurants");
                //         }, 3000);

                //     })

            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleActivation = () => {
        let newformData = formData
        console.log(active)
        console.log(newformData)
        newformData.isActive = !active
        RestaurantService.updateRestaurant(owner.id, restaurant.id, formData).then(res => {
            console.log(!active)
            console.log(newformData)
            //let newRestaurant = { ...restaurant, isActive: !active }
            //console.log(newRestaurant)
            setRestaurant(restaurant => ({ ...restaurant, isActive: !active }))
            //console.log(restaurant)
            setActive(active => !active)

            setRestaurants([])
        });
    }
    const handleOpen = () => {
        if (active) {
            setShowDelete(true)
        } else {
            handleActivation()
        }
    }
    const handleClose = () => {
        setShowDelete(false)
    }

    return (
        <React.Fragment>
            <CssBaseline />
            {restaurant ?
                <>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Button
                                variant="contained"
                                color={active ? "error" : "success"}
                                onClick={handleOpen}
                                className={classes.button}
                            >
                                {active ? 'DEACTIVATE RESTAURANT' : ' ACTIVATE RESTAURANT'}
                            </Button>
                            <Typography component="h1" variant="h6" align="center">
                                {active ? 'Update Restaurant' : 'NOT ACTIVE'}
                            </Typography>

                            <React.Fragment>
                                {(
                                    <form >
                                        <React.Fragment>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        id="storeName"
                                                        name="name"
                                                        label="Restaurant Name"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        autoComplete="store-name"
                                                        value={formData.name}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Rating name="half-rating" value={restaurant ? restaurant.rating : 0} precision={0.5} readOnly />
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <ChipInput
                                                        label="Restaurant Cuisines"
                                                        value={cuisine === null ? '' : cuisine}
                                                        fullWidth
                                                        onAdd={(chip) => handleAddChip(chip)}
                                                        onDelete={(chip, index) => handleDeleteChip(chip, index)}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="phone"
                                                        name="phone"
                                                        label="Phone Number"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.phone ? formData.phone : ''}
                                                    />
                                                </Grid>



                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="priceCategory"
                                                        name="priceCategory"
                                                        label="priceCategory($, $$, $$$)"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        inputProps={{ maxLength: 3 }}
                                                        value={formData.priceCategory == null ? '$' : formData.priceCategory}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        required
                                                        id="address1"
                                                        name="lineOne"
                                                        label="Address line 1"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.lineOne ? formData.lineOne : ""}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        id="address2"
                                                        name="lineTwo"
                                                        label="Address line 2"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.lineTwo ? formData.lineTwo : ""}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="city"
                                                        name="city"
                                                        label="City"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.city ? formData.city : ""}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="state"
                                                        name="state"
                                                        label="State"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.state ? formData.state : ""}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        required
                                                        id="zip"
                                                        name="zip"
                                                        label="Zip code"
                                                        fullWidth
                                                        onChange={handleInputChange}
                                                        value={formData.zip ? formData.zip : ""}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        id="country"
                                                        name="country"
                                                        label="US"
                                                        // defaultValue="US"
                                                        disabled
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {errorAlert ? <Alert severity='error'>{errorAlertContent}</Alert> : <></>}
                                                </Grid>
                                            </Grid>
                                        </React.Fragment>

                                        <div className={classes.buttons}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleSubmit}
                                                className={classes.button}
                                            >
                                                SAVE
                                            </Button>
                                        </div>
                                        <Grid item xs={12}>
                                            {alert ? <Alert severity='success'>{alertContent}</Alert> : <></>}
                                        </Grid>
                                    </form>
                                )}
                            </React.Fragment>
                        </Paper>
                    </main>
                    <DeleteConfirmation
                        show={showDelete}
                        onHide={handleClose}
                        handleActivation={handleActivation}
                        name={restaurant.name} />
                </> : null}
        </React.Fragment >
    );
}
export default FullRestaurant;