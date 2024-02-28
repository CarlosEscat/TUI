import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface FormValues {
    title: string;
    gender: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: any;
}

const passenger = {
    title: 'MR',
    firstName: 'John',
    lastName: 'Doe',
    gender: 'MALE',
    dateOfBirth: '2001-04-12',
}

const Form = () => {
    const [formValues, setFormValues] = useState<FormValues>({
        title: passenger.title,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        gender: passenger.gender,
        dateOfBirth: passenger.dateOfBirth,
    });

    const [display, setDisplay] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | Date> | any) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement | Date> | any) => {
        const date = event.format('DD-MM-YYYY')
        setFormValues({
            ...formValues,
            dateOfBirth: date,
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDisplay(true)
    };

    const confirmClick = () => {
        const finalData = JSON.stringify(formValues);
        setOpen(true);
    }

    return (
        <div className='formStyle'>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirmed
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Passenger details updated
                    </Typography>
                </Box>
            </Modal>
            <h3>Passenger Information</h3>
            <form onSubmit={handleSubmit}>
                <label className='labels'>Title</label>
                <RadioGroup
                row
                name="title"
                value={formValues.title}
                onChange={handleChange}
                sx={{ alignItems: 'center' }}
                >
                    <FormControlLabel value="MR" control={<Radio />} label="Mr" sx={{ alignItems: 'center' }}/>
                    <FormControlLabel value="MRS" control={<Radio />} label="Mrs" sx={{ alignItems: 'center' }}/>
                </RadioGroup>
                <TextField
                label="First Name"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                sx={{ alignItems: 'center' }}
                margin="normal"
                InputProps={{
                    readOnly: false,
                }}
                />
                <TextField
                label="Last Name"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                margin="normal"
                InputProps={{
                    readOnly: true,
                }}
                /><br />
                <label>Gender</label>
                <RadioGroup
                row
                name="gender"
                value={formValues.gender}
                onChange={handleChange}
                >
                    <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                    <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                </RadioGroup>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    label="Date of Birth"
                    name="dateOfBirth"
                    value={dayjs('2001-04-12')}
                    onChange={handleChangeDate}
                    />
                </LocalizationProvider><br/><br />
                <Button type="submit" name='change' variant="contained">
                    Submit
                </Button><br />
                
            </form>
            {display == true ? (
                    <div className='data'><br /><h3>New Passenger Information</h3>
                        <div className='confirmation'>
                        <label>Title: </label><p>{formValues.title}</p>
                        <label>First Name: </label><p>{formValues.firstName}</p>
                        <label>Last Name: </label><p>{formValues.lastName}</p>
                        <label>Gender: </label><p>{formValues.gender}</p>
                        <label>Date of Birth: </label><p>{formValues.dateOfBirth}</p>
                        <br/>
                        <Button onClick={confirmClick} variant="contained">
                        Confirm
                        </Button>
                        </div>
                    </div>) : (<br/>) }
        </div>
    );
};

export default Form;