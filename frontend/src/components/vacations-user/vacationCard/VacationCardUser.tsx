import Vacation from "../../../models/Vacation";
import "./VacationCardUser.css";
import formatPrice from "../../../utils/formatPrice";
import { format } from "date-fns";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Button } from '@mui/joy';
import { FcLike } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";
import { IoCalendar } from "react-icons/io5";


interface VacationCardUserProps {
    vacation: Vacation,
    followUnfollowFunction: (vacationId: number) => void

}

enum Boolean {
    FALSE = 0,
    TRUE = 1
}

function VacationCardUser(props: VacationCardUserProps): JSX.Element {

    function followUnfollow() {
        props.followUnfollowFunction(props.vacation.id!)
    }

    return (
        <div className="VacationCardUser">
            <Card sx={{ height: 410, width: 345 }} >
                <CardMedia
                    sx={{ height: '35%' }}
                    image={props.vacation.imageUrl}
                    children={<CardActions sx={{}} >
                        {(props.vacation.iAmFollowing === Boolean.FALSE) && <Button className="not_following" startDecorator={<FaHeart />} sx={{ borderRadius: 20 }} onClick={followUnfollow}>Like {props.vacation.numberOfFollowers}</Button>}
                        {(props.vacation.iAmFollowing === Boolean.TRUE) && <Button className="following" startDecorator={<FcLike />} sx={{ borderRadius: 20 }} onClick={followUnfollow}>Like {props.vacation.numberOfFollowers}</Button>}
                    </CardActions>}
                />
                <CardContent className="cardContent" sx={{ height: '60%' }}>
                    <Typography sx={{ textAlign: 'left' }} gutterBottom variant="h5" component="div">
                        {props.vacation.destination}
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }} paragraph variant="body2" color="text.secondary">
                        {<IoCalendar />}  {format(props.vacation.startDate!, "dd.MM.yyyy")} - {format(props.vacation.endDate!, "dd.MM.yyyy")}
                    </Typography>
                    <Typography sx={{ height: '35%', overflow: 'auto', textAlign: 'left' }} paragraph variant="body2" color="text.secondary">
                        {props.vacation.description}
                    </Typography>
                    <Typography className="price" paragraph variant="body2" color="text.secondary">
                        {formatPrice(props.vacation.price)}
                    </Typography>
                </CardContent>
            </Card>
        </div >
    );
}

export default VacationCardUser;




