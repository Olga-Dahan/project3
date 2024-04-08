class Vacation {
    public id?: number;
    public destination?: string;
    public description?:string;
    public startDate?: Date;
    public endDate?: Date;
    public price?: number;
    public numberOfFollowers?: number;
    public iAmFollowing?: number;
    public image?: File;
    public imageUrl?: string;
}

export default Vacation;