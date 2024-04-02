import { UploadedFile } from "express-fileupload";

export default interface DTO_PARAMS {
    isFollowing: boolean;
    didntStart: boolean;
    onGoing: boolean;
    offset: number;
}