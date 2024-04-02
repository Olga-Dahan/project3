import { UploadedFile } from "express-fileupload";

export default interface DTO {
    id: number,
    destination: string,
    description:string,
    startDate: Date,
    endDate: Date,
    price: number,
    numberOfFollowers: number,
    iAmFollowing: boolean,
    image: UploadedFile,
    imageName: string

}