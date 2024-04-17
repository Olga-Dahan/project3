import { NavLink } from "react-router-dom";
import Vacation from "../../../models/Vacation_admin";
import "./VacationCard.css";
import formatPrice from "../../../utils/formatPrice";
import { format } from "date-fns";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Button } from '@mui/joy';
import { IoCalendar } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface VacationCardProps {
    vacation: Vacation,
    deleteFunction: (vacationId: number) => void
}

function VacationCard(props: VacationCardProps): JSX.Element {
    
    function deleteMe() {
        if (!props.vacation.id) return;
        props.deleteFunction(props.vacation.id)
    }


    return (
        <div className="VacationCard">
            <Card sx={{ height: 410, width: 345 }}>
                <CardMedia
                    sx={{ height: '35%' }}
                    image={props.vacation.imageUrl}
                    children={<CardActions>
                        <Button startDecorator={<MdEdit />}><NavLink to={`/vacations-admin/edit/${props.vacation.id}`}>Edit</NavLink></Button>
                        <Button startDecorator={<MdDelete />} onClick={deleteMe}>Delete</Button>
                    </CardActions>}
                />
                <CardContent className="cardContent" sx={{ height: '60%' }}>
                    <Typography sx={{ textAlign: 'left' }} gutterBottom variant="h5" component="div">
                        {props.vacation.destination}
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }} paragraph variant="body2" color="text.secondary">
                        {<IoCalendar />} {format(props.vacation.startDate!, "dd.MM.yyyy")} - {format(props.vacation.endDate!, "dd.MM.yyyy")}
                    </Typography>
                    <Typography sx={{ height: '35%', overflow: 'auto', textAlign: 'left' }} paragraph variant="body2" color="text.secondary">
                        {props.vacation.description}
                    </Typography>
                    <Typography className="price" paragraph variant="body2" color="text.secondary">
                        {formatPrice(props.vacation.price)}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default VacationCard;
