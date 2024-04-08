class AppConfig {
    public baseUrl = 'http://localhost:8080/api';
    public vacationsUrl = `${this.baseUrl}/vacations`;
    public vacationsAdminUrl = `${this.baseUrl}/vacations-admin`;
    public signupUrl = `${this.baseUrl}/register`;
    public loginUrl = `${this.baseUrl}/login`;
    public limit_pages = 10;
    public successNotificationDuration = 2000;
    public errorNotificationDuration = 6000;
}

const appConfig = new AppConfig();
export default appConfig;